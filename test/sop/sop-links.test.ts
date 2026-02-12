import path from 'node:path';
import {
  SOP_ROOT,
  buildLinkGraph,
  classifyTarget,
  computeShortestHopDistances,
  listSopTextFiles,
} from '../../scripts/sop-links.mjs';

describe('docs/参考/sop link graph', () => {
  it('has no missing internal link targets', async () => {
    const files = await listSopTextFiles();
    const graph = buildLinkGraph(files);

    const missing: Array<{ from: string; raw: string; to: string }> = [];
    for (const e of graph.edges) {
      const cls = classifyTarget(e.to);
      if (cls.kind === 'missing') {
        missing.push({
          from: path.relative(SOP_ROOT, e.from).replaceAll('\\', '/'),
          raw: e.raw,
          to: e.to,
        });
      }
    }

    expect(missing).toEqual([]);
  });

  it('keeps max shortest-link depth <= 3 from LLM_INDEX.md', async () => {
    const files = await listSopTextFiles();
    const graph = buildLinkGraph(files);
    const entryAbs = path.join(SOP_ROOT, 'LLM_INDEX.md');

    const inScope = (p: string) => {
      const cls = classifyTarget(p);
      return cls.kind === 'sop' && cls.normalized.endsWith('.md');
    };

    const { dist } = computeShortestHopDistances(entryAbs, graph, { maxDepth: 3, inScope });

    const unreachable: string[] = [];
    for (const f of files) {
      const cls = classifyTarget(f);
      if (cls.kind !== 'sop') continue;
      if (!cls.normalized.endsWith('.md')) continue;
      if (!dist.has(path.normalize(cls.normalized))) {
        unreachable.push(path.relative(SOP_ROOT, cls.normalized).replaceAll('\\', '/'));
      }
    }

    expect(unreachable).toEqual([]);
  });
});

