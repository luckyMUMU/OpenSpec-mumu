#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {
  REPO_ROOT,
  SOP_ROOT,
  buildLinkGraph,
  buildPathTo,
  classifyTarget,
  computeShortestHopDistances,
  listSopTextFiles,
  toDot,
  toMermaid,
} from './sop-links.mjs';

function parseArgs(argv) {
  const args = { maxDepth: 3, entry: '01_concept_overview.md', outDir: null };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--maxDepth') args.maxDepth = Number(argv[++i]);
    else if (a === '--entry') args.entry = argv[++i];
    else if (a === '--outDir') args.outDir = argv[++i];
  }
  return args;
}

function rel(p) {
  return path.relative(REPO_ROOT, p).replaceAll('\\', '/');
}

function isNonPortableRawLink(raw) {
  const s = String(raw).trim();
  return s.startsWith('file:///') || /^[a-zA-Z]:[\\/]/.test(s) || s.startsWith('/');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!Number.isFinite(args.maxDepth) || args.maxDepth <= 0) {
    throw new Error(`Invalid --maxDepth: ${args.maxDepth}`);
  }

  const entryAbs = path.normalize(path.resolve(SOP_ROOT, args.entry));
  const files = await listSopTextFiles();
  const graph = buildLinkGraph(files);

  const missing = [];
  const nonPortable = [];
  const edgesInRepo = [];

  for (const e of graph.edges) {
    const classified = classifyTarget(e.to);
    if (classified.kind === 'missing') {
      missing.push({
        from: rel(e.from),
        to: rel(classified.normalized),
        raw: e.raw,
      });
    }

    if (isNonPortableRawLink(e.raw)) {
      nonPortable.push({
        from: rel(e.from),
        raw: e.raw,
      });
    }

    if (classified.kind === 'sop') {
      edgesInRepo.push({ from: e.from, to: classified.normalized });
    }
  }

  const internalGraph = {
    nodes: graph.nodes,
    edges: edgesInRepo.map((e) => ({ ...e, raw: null })),
  };

  const { dist, prev } = computeShortestHopDistances(entryAbs, internalGraph, {
    maxDepth: args.maxDepth,
    inScope: (p) => classifyTarget(p).kind === 'sop',
  });

  const unreachable = [];
  for (const f of files) {
    const kind = classifyTarget(f).kind;
    if (kind !== 'sop') continue;
    if (!dist.has(path.normalize(f))) {
      unreachable.push(rel(f));
    }
  }

  const tooDeep = [];
  for (const [p, d] of dist.entries()) {
    if (d > args.maxDepth) {
      tooDeep.push({ file: rel(p), depth: d });
    }
  }

  let outDirAbs = null;
  if (args.outDir) outDirAbs = path.isAbsolute(args.outDir) ? args.outDir : path.join(REPO_ROOT, args.outDir);
  if (outDirAbs) {
    mkdirSync(outDirAbs, { recursive: true });
    const dot = toDot(internalGraph, {
      filterNode: (p) => classifyTarget(p).kind === 'sop',
      labelOf: (p) => path.relative(SOP_ROOT, p).replaceAll('\\', '/'),
    });
    const mmd = toMermaid(internalGraph, {
      filterNode: (p) => classifyTarget(p).kind === 'sop',
      labelOf: (p) => path.relative(SOP_ROOT, p).replaceAll('\\', '/'),
    });

    writeFileSync(path.join(outDirAbs, '06_link_topology.dot'), dot, 'utf-8');
    writeFileSync(path.join(outDirAbs, '06_link_topology.mmd'), mmd, 'utf-8');
    writeFileSync(
      path.join(outDirAbs, '06_link_topology.json'),
      JSON.stringify(
        {
          entry: path.relative(SOP_ROOT, entryAbs).replaceAll('\\', '/'),
          maxDepth: args.maxDepth,
          missing,
          nonPortable,
          unreachable,
          tooDeep,
        },
        null,
        2,
      ),
      'utf-8',
    );

    const summaryLines = [];
    summaryLines.push('# 链接可达性与深度检查');
    summaryLines.push('');
    summaryLines.push(`- 入口: \`${path.relative(SOP_ROOT, entryAbs).replaceAll('\\', '/')}\``);
    summaryLines.push(`- 最大允许跳数: \`${args.maxDepth}\``);
    summaryLines.push(`- 缺失引用: \`${missing.length}\``);
    summaryLines.push(`- 不可移植链接: \`${nonPortable.length}\``);
    summaryLines.push(`- 不可达文件: \`${unreachable.length}\``);
    summaryLines.push('');

    if (missing.length > 0) {
      summaryLines.push('## 缺失引用（必须修复）');
      summaryLines.push('');
      for (const m of missing) summaryLines.push(`- ${m.from} -> ${m.raw}`);
      summaryLines.push('');
    }

    if (nonPortable.length > 0) {
      summaryLines.push('## 不可移植链接（建议修复）');
      summaryLines.push('');
      for (const m of nonPortable) summaryLines.push(`- ${m.from} -> ${m.raw}`);
      summaryLines.push('');
    }

    if (unreachable.length > 0) {
      summaryLines.push('## 从入口不可达（必须修复或确认允许孤岛）');
      summaryLines.push('');
      for (const u of unreachable.sort()) summaryLines.push(`- ${u}`);
      summaryLines.push('');
    }

    if (tooDeep.length > 0) {
      summaryLines.push('## 跳数超限（必须通过补充索引缩短最短路径）');
      summaryLines.push('');
      for (const t of tooDeep.sort((a, b) => b.depth - a.depth)) {
        const abs = path.join(SOP_ROOT, t.file);
        const pth = buildPathTo(entryAbs, abs, prev)
          .map((x) => path.relative(SOP_ROOT, x).replaceAll('\\', '/'))
          .join(' -> ');
        summaryLines.push(`- ${t.file} (depth=${t.depth}): ${pth}`);
      }
      summaryLines.push('');
    }

    writeFileSync(path.join(outDirAbs, '03_link_check.md'), summaryLines.join('\n') + '\n', 'utf-8');
  }

  const hasHardFailures = missing.length > 0 || unreachable.length > 0 || tooDeep.length > 0;
  if (hasHardFailures) {
    console.error('❌ sop-link-graph: FAILED');
    if (missing.length > 0) console.error(`- missing: ${missing.length}`);
    if (unreachable.length > 0) console.error(`- unreachable: ${unreachable.length}`);
    if (tooDeep.length > 0) console.error(`- tooDeep: ${tooDeep.length}`);
    process.exit(1);
  }

  console.log('✅ sop-link-graph: OK');
  if (nonPortable.length > 0) console.log(`⚠️ nonPortable: ${nonPortable.length}`);
}

main().catch((err) => {
  console.error(`❌ sop-link-graph: ${err.message}`);
  process.exit(1);
});
