import fg from 'fast-glob';
import { readFileSync } from 'node:fs';
import { existsSync } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

export const REPO_ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
export const SOP_ROOT = path.join(REPO_ROOT, 'docs', '参考', 'sop');

export function readText(filePath) {
  return readFileSync(filePath, 'utf-8');
}

export function toGlobPattern(p) {
  return String(p).replaceAll('\\', '/');
}

export async function listSopTextFiles() {
  const patterns = [
    toGlobPattern(path.join(SOP_ROOT, '**', '*.md')),
    toGlobPattern(path.join(SOP_ROOT, '**', '*.txt')),
    toGlobPattern(path.join(SOP_ROOT, '**', '*.json')),
  ];
  return fg(patterns, { dot: true, onlyFiles: true });
}

export function stripFragment(link) {
  const i = link.indexOf('#');
  return i >= 0 ? link.slice(0, i) : link;
}

export function isExternalLink(link) {
  const s = String(link).trim().toLowerCase();
  return (
    s === '' ||
    s.startsWith('#') ||
    s.startsWith('http://') ||
    s.startsWith('https://') ||
    s.startsWith('mailto:') ||
    s.startsWith('tel:')
  );
}

export function fileUrlToPathSafe(link) {
  try {
    const u = new URL(link);
    if (u.protocol !== 'file:') return null;
    return url.fileURLToPath(u);
  } catch {
    return null;
  }
}

export function normalizeWindowsDrive(p) {
  const m = String(p).match(/^([a-zA-Z]):[\\/]/);
  if (!m) return p;
  return `${m[1].toUpperCase()}:${p.slice(2)}`;
}

export function resolveLinkTarget(fromFilePath, rawLink) {
  const link = String(rawLink).trim();
  if (isExternalLink(link)) return null;

  const fileUrlPath = fileUrlToPathSafe(link);
  if (fileUrlPath) return path.normalize(normalizeWindowsDrive(fileUrlPath));

  if (/^[a-zA-Z]:[\\/]/.test(link)) return path.normalize(normalizeWindowsDrive(link));

  if (link.startsWith('/')) return path.join(REPO_ROOT, link.replace(/^[\\/]+/, ''));

  return path.resolve(path.dirname(fromFilePath), link);
}

export function extractMarkdownLinks(markdownText) {
  const rawText = String(markdownText);
  const lines = rawText.split(/\r?\n/);
  const kept = [];
  let inFence = false;
  let fence = null;

  for (const line of lines) {
    const trimmed = line.trimStart();
    const fenceStart = trimmed.startsWith('```') ? '```' : trimmed.startsWith('~~~') ? '~~~' : null;
    if (!inFence && fenceStart) {
      inFence = true;
      fence = fenceStart;
      continue;
    }
    if (inFence && fence && trimmed.startsWith(fence)) {
      inFence = false;
      fence = null;
      continue;
    }
    if (!inFence) kept.push(line);
  }

  const text = kept.join('\n');
  const links = [];

  const re = /!?\[[^\]]*?\]\(([^)]+)\)/g;
  for (const m of text.matchAll(re)) {
    const raw = m[1].trim();
    if (!raw) continue;
    const firstSpace = raw.indexOf(' ');
    const target = firstSpace >= 0 ? raw.slice(0, firstSpace) : raw;
    const unquoted = target.replace(/^<(.+)>$/, '$1').replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
    links.push(unquoted);
  }

  return links;
}

export function buildLinkGraph(files) {
  const nodes = new Map();
  const edges = [];

  for (const filePath of files) {
    const fromAbs = path.normalize(filePath);
    const text = readText(fromAbs);
    const rawLinks = extractMarkdownLinks(text);
    const resolved = [];

    for (const raw of rawLinks) {
      const withoutFragment = stripFragment(raw);
      const abs = resolveLinkTarget(fromAbs, withoutFragment);
      if (!abs) continue;
      const toAbs = path.normalize(abs);
      resolved.push(toAbs);
      edges.push({
        from: fromAbs,
        to: toAbs,
        raw,
      });
    }

    nodes.set(fromAbs, {
      path: fromAbs,
      links: resolved,
    });
  }

  return { nodes, edges };
}

export function classifyTarget(absPath) {
  const n = path.normalize(absPath);
  if (!existsSync(n)) return { kind: 'missing', normalized: n };
  if (n.startsWith(SOP_ROOT + path.sep) || n === SOP_ROOT) return { kind: 'sop', normalized: n };
  if (n.startsWith(REPO_ROOT + path.sep) || n === REPO_ROOT) return { kind: 'repo', normalized: n };
  return { kind: 'external-file', normalized: n };
}

export function computeShortestHopDistances(entryAbsPath, graph, opts) {
  const maxDepth = opts?.maxDepth ?? Infinity;
  const inScope = opts?.inScope ?? (() => true);

  const dist = new Map();
  const prev = new Map();
  const q = [];

  dist.set(entryAbsPath, 0);
  q.push(entryAbsPath);

  while (q.length > 0) {
    const cur = q.shift();
    const curDist = dist.get(cur);
    if (curDist == null) continue;
    if (curDist >= maxDepth) continue;
    const node = graph.nodes.get(cur);
    if (!node) continue;

    for (const next of node.links) {
      if (!inScope(next)) continue;
      const nextNorm = path.normalize(next);
      if (!dist.has(nextNorm)) {
        dist.set(nextNorm, curDist + 1);
        prev.set(nextNorm, cur);
        q.push(nextNorm);
      }
    }
  }

  return { dist, prev };
}

export function buildPathTo(entryAbsPath, targetAbsPath, prev) {
  const pathNodes = [];
  let cur = targetAbsPath;
  while (cur && cur !== entryAbsPath) {
    pathNodes.push(cur);
    cur = prev.get(cur);
  }
  if (cur === entryAbsPath) pathNodes.push(entryAbsPath);
  pathNodes.reverse();
  return pathNodes;
}

export function toDot(graph, opts) {
  const filterNode = opts?.filterNode ?? (() => true);
  const labelOf = opts?.labelOf ?? ((p) => path.relative(REPO_ROOT, p).replaceAll('\\', '/'));

  const lines = [];
  lines.push('digraph sop_links {');
  lines.push('  rankdir=LR;');
  lines.push('  node [shape=box, fontsize=10];');

  const nodeSet = new Set();
  for (const e of graph.edges) {
    if (!filterNode(e.from) || !filterNode(e.to)) continue;
    nodeSet.add(e.from);
    nodeSet.add(e.to);
  }

  for (const n of [...nodeSet].sort()) {
    const label = labelOf(n).replaceAll('"', '\\"');
    lines.push(`  "${n}" [label="${label}"];`);
  }

  for (const e of graph.edges) {
    if (!filterNode(e.from) || !filterNode(e.to)) continue;
    lines.push(`  "${e.from}" -> "${e.to}";`);
  }

  lines.push('}');
  return lines.join('\n') + '\n';
}

export function toMermaid(graph, opts) {
  const filterNode = opts?.filterNode ?? (() => true);
  const labelOf = opts?.labelOf ?? ((p) => path.relative(REPO_ROOT, p).replaceAll('\\', '/'));
  const idOf = opts?.idOf ?? ((p) => labelOf(p).replaceAll(/[^a-zA-Z0-9_]/g, '_'));

  const edges = [];
  const nodes = new Map();

  for (const e of graph.edges) {
    if (!filterNode(e.from) || !filterNode(e.to)) continue;
    const fromId = idOf(e.from);
    const toId = idOf(e.to);
    nodes.set(fromId, labelOf(e.from));
    nodes.set(toId, labelOf(e.to));
    edges.push([fromId, toId]);
  }

  const lines = [];
  lines.push('flowchart LR');
  for (const [id, label] of [...nodes.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const safeLabel = String(label).replaceAll('"', '\\"');
    lines.push(`  ${id}["${safeLabel}"]`);
  }
  for (const [fromId, toId] of edges) {
    lines.push(`  ${fromId} --> ${toId}`);
  }
  return lines.join('\n') + '\n';
}
