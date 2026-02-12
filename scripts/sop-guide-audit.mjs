#!/usr/bin/env node
import fg from 'fast-glob';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import url from 'node:url';
import {
  REPO_ROOT,
  SOP_ROOT,
  buildLinkGraph,
  classifyTarget,
  listSopTextFiles,
} from './sop-links.mjs';

const GUIDE_PATH = path.join(REPO_ROOT, 'docs', '参考', 'sop_GUIDE.md');

function toPosix(p) {
  return String(p).replaceAll('\\', '/');
}

function relFromSop(p) {
  return toPosix(path.relative(SOP_ROOT, p));
}

function relFromRepo(p) {
  return toPosix(path.relative(REPO_ROOT, p));
}

function todayYYYYMMDD(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

function readText(filePath) {
  return readFileSync(filePath, 'utf-8');
}

function readBuffer(filePath) {
  return readFileSync(filePath);
}

function parseArgs(argv) {
  const args = { date: todayYYYYMMDD(), outDir: null };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--date') args.date = String(argv[++i] ?? '').trim();
    else if (a === '--outDir') args.outDir = String(argv[++i] ?? '').trim();
  }
  if (!/^\d{8}$/.test(args.date)) throw new Error(`Invalid --date (expect YYYYMMDD): ${args.date}`);
  return args;
}

function parseFrontmatter(text) {
  const s = String(text);
  if (!s.startsWith('---')) return null;
  const end = s.indexOf('\n---', 3);
  if (end < 0) return null;
  const block = s.slice(3, end).trim();
  const map = new Map();
  for (const line of block.split(/\r?\n/)) {
    const m = line.match(/^\s*([^:#]+?)\s*:\s*(.*?)\s*$/);
    if (!m) continue;
    map.set(m[1].trim(), m[2].trim());
  }
  return { map, endIndex: end + '\n---'.length };
}

function parseDeclaredVersion(text) {
  const fm = parseFrontmatter(text);
  if (fm?.map?.get('version')) return fm.map.get('version');
  const bq = text.match(/^\s*>\s*\*\*版本\*\*:\s*(v\d+\.\d+\.\d+)/m);
  if (bq) return bq[1];
  return null;
}

function parseDeclaredUpdated(text) {
  const fm = parseFrontmatter(text);
  if (fm?.map?.get('updated')) return fm.map.get('updated');
  const bq = text.match(/^\s*>\s*\*\*更新日期\*\*:\s*(\d{4}-\d{2}-\d{2})/m);
  if (bq) return bq[1];
  return null;
}

function toMajorMinor(version) {
  const m = String(version).match(/^(v\d+\.\d+)\.\d+$/);
  return m ? m[1] : null;
}

function parseChangelogBaseline() {
  const text = readText(path.join(SOP_ROOT, 'CHANGELOG.md'));
  const v = parseDeclaredVersion(text);
  if (!v) throw new Error('CHANGELOG.md missing version');
  const mm = toMajorMinor(v);
  if (!mm) throw new Error(`CHANGELOG.md invalid version: ${v}`);
  return { full: v, majorMinor: mm };
}

function detectUtf8(buffer) {
  const hasBom = buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf;
  try {
    const dec = new TextDecoder('utf-8', { fatal: true });
    dec.decode(buffer);
    return { ok: true, hasBom };
  } catch {
    return { ok: false, hasBom };
  }
}

function isTextLikeExt(ext) {
  return ['.md', '.txt', '.json', '.csv', '.yml', '.yaml'].includes(ext);
}

function isAttachmentExt(ext) {
  return ['.csv', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.pdf', '.drawio', '.fig', '.zip'].includes(ext);
}

function hasWeirdFileName(name) {
  if (/\s/.test(name)) return true;
  if (/[\u0000-\u001F]/.test(name)) return true;
  return false;
}

function collectGuideRequiredRefs() {
  const guide = readText(GUIDE_PATH);
  const lines = guide.split(/\r?\n/);
  const required = [];
  let inSection = false;
  for (const line of lines) {
    if (line.trim() === '## 2. SSOT（唯一真源）') {
      inSection = true;
      continue;
    }
    if (inSection && line.trim() === '---') break;
    if (!inSection) continue;
    const m = line.match(/`sop\/([^`]+)`/);
    if (!m) continue;
    const p = String(m[1]).trim();
    if (p.includes('*')) continue;
    if (p.endsWith('/')) continue;
    required.push(p);
  }
  return [...new Set(required)].sort();
}

function collectDefinedStates() {
  const text = readText(path.join(SOP_ROOT, '05_constraints', 'state_dictionary.md'));
  const states = new Set();
  for (const m of text.matchAll(/\[(?:[A-Z0-9_]+)\]/g)) states.add(m[0]);
  states.add('Diff展示');
  return states;
}

function collectDefinedCmds() {
  const text = readText(path.join(SOP_ROOT, '05_constraints', 'command_dictionary.md'));
  const cmds = new Set();
  for (const m of text.matchAll(/`([A-Z_]+)\(/g)) cmds.add(m[1]);
  return cmds;
}

function scanCmdUses(text) {
  const found = new Set();
  const s = String(text);
  for (const m of s.matchAll(/`([A-Z_]+)\(/g)) found.add(m[1]);
  for (const m of s.matchAll(/\bCMD\s+([A-Z_]+)\(/g)) found.add(m[1]);
  return found;
}

function scanStateUses(text) {
  const found = new Set();
  const s = String(text);
  for (const m of s.matchAll(
    /\[(?:WAITING_FOR_[A-Z0-9_]+|DIR_[A-Z0-9_]+|USER_DECISION(?:_REQUIRED)?|ARCHITECTURE_PASSED|SCHEDULING|PARALLEL_EXECUTING|WAITING_DEPENDENCY|ALL_COMPLETED|FUSION_TRIGGERED)\]/g,
  )) {
    found.add(m[0]);
  }
  return found;
}

function classifyMarkdownFile(filePath) {
  const rel = relFromSop(filePath);
  if (rel.endsWith('/SKILL.md') || rel.includes('/skills/') && rel.endsWith('/SKILL.md')) return 'skill';
  if (rel.startsWith('prompts/packs/')) return 'prompt';
  if (rel.startsWith('03_workflow/')) return 'workflow';
  if (rel.startsWith('05_constraints/')) return 'constraint';
  if (rel.startsWith('04_reference/')) return 'reference';
  if (rel.startsWith('02_skill_matrix/')) return 'ssot-skill-matrix';
  return 'other';
}

function checkTemplateConformance(kind, relPath, text) {
  const lines = [];
  const required = [];
  const forbidden = [];

  if (kind === 'skill') {
    required.push('## 触发条件|## Trigger');
    required.push('## Input|## 输入');
    required.push('## Workflow Steps|## Workflow|## 步骤|## Step');
    required.push('## Output|## 输出');
    required.push('## Stop Points|## Stop Point|## 停止点');
    required.push('## Constraints|## 约束');
  } else if (kind === 'prompt') {
    if (relPath.endsWith('/00_system.md')) {
      required.push('## 启用条件');
      required.push('## 全局不变量');
      required.push('## 禁止项');
    } else if (relPath.endsWith('/01_operator.md')) {
      required.push('## 编排入口');
      required.push('## 路径选择');
      required.push('## 调用链');
      required.push('## 能力选择协议');
      required.push('## 停止点');
    } else if (relPath.endsWith('/index.md')) {
      required.push('## 入口');
      required.push('## Skill');
    } else {
      required.push('## 侧重点');
      required.push('## 输出');
      forbidden.push('## Input');
      forbidden.push('## Workflow Steps');
      forbidden.push('## Stop Points');
      forbidden.push('## Constraints');
      forbidden.push('## 触发条件');
    }
  } else if (kind === 'workflow') {
    required.push('# ');
    required.push('## ');
  } else if (kind === 'constraint' || kind === 'reference' || kind === 'ssot-skill-matrix') {
    required.push('# ');
  } else {
    required.push('# ');
  }

  for (const r of required) {
    const ok = r.includes('|')
      ? r.split('|').some((x) => String(text).includes(x))
      : String(text).includes(r);
    lines.push({ rule: `required:${r}`, ok });
  }

  for (const f of forbidden) {
    lines.push({ rule: `forbidden:${f}`, ok: !String(text).includes(f) });
  }

  const failed = lines.filter((x) => !x.ok).map((x) => x.rule);
  return { checks: lines, failed };
}

function gradeIssue(code) {
  const map = new Map([
    ['MISSING_GUIDE_REF', '🔴'],
    ['MISSING_INTERNAL_LINK', '🔴'],
    ['VERSION_MISSING', '🟠'],
    ['UPDATED_MISSING', '🟡'],
    ['VERSION_MM_MISMATCH', '🔴'],
    ['STATE_UNDEFINED', '🔴'],
    ['CMD_UNDEFINED', '🟡'],
    ['TEMPLATE_MISSING', '🟠'],
    ['PROMPT_REPEATS_CONTRACT', '🟠'],
    ['ENCODING_NOT_UTF8', '🔴'],
    ['FILENAME_WEIRD', '🟡'],
    ['STANDARD_GAP', '🟡'],
  ]);
  return map.get(code) ?? '🟡';
}

function csvEscape(v) {
  const s = String(v ?? '');
  if (/[\",\n\r]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function toCsv(rows, headers) {
  const lines = [];
  lines.push(headers.map(csvEscape).join(','));
  for (const r of rows) lines.push(headers.map((h) => csvEscape(r[h])).join(','));
  return lines.join('\n') + '\n';
}

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const outDirAbs = args.outDir
    ? path.isAbsolute(args.outDir)
      ? args.outDir
      : path.join(REPO_ROOT, args.outDir)
    : path.join(SOP_ROOT, 'Review', args.date);

  ensureDir(outDirAbs);

  const baseline = parseChangelogBaseline();
  const requiredRefs = collectGuideRequiredRefs();
  const definedStates = collectDefinedStates();
  const definedCmds = collectDefinedCmds();

  const filePaths = await fg([toPosix(path.join(SOP_ROOT, '**', '*'))], {
    dot: true,
    onlyFiles: true,
    ignore: [toPosix(path.join(SOP_ROOT, 'Review', '**'))],
  });

  const inventoryRows = [];
  const templateRows = [];
  const referenceRows = [];
  const issues = [];

  let seq = 0;
  const nextId = () => `REV-${args.date}-${String(++seq).padStart(4, '0')}`;

  for (const fp of filePaths.map((x) => path.normalize(x))) {
    const st = statSync(fp);
    const rel = relFromSop(fp);
    const depth = rel === '' ? 0 : rel.split('/').length;
    const ext = path.extname(fp).toLowerCase();
    const base = path.basename(fp);

    const inv = {
      path: rel,
      type: ext || '(none)',
      size_bytes: st.size,
      depth,
      is_attachment: isAttachmentExt(ext) ? 'yes' : 'no',
      encoding: '',
      bom: '',
    };

    if (hasWeirdFileName(base)) {
      issues.push({
        id: nextId(),
        severity: gradeIssue('FILENAME_WEIRD'),
        code: 'FILENAME_WEIRD',
        file: rel,
        evidence: base,
        fix: '必须移除文件名中的空格或控制字符，并更新所有引用方。',
      });
    }

    if (isTextLikeExt(ext)) {
      const buf = readBuffer(fp);
      const enc = detectUtf8(buf);
      inv.encoding = enc.ok ? 'utf-8' : 'not-utf8';
      inv.bom = enc.hasBom ? 'bom' : '';
      if (!enc.ok) {
        issues.push({
          id: nextId(),
          severity: gradeIssue('ENCODING_NOT_UTF8'),
          code: 'ENCODING_NOT_UTF8',
          file: rel,
          evidence: 'decode utf-8 fatal failed',
          fix: '必须将文件转换为 UTF-8 编码（必要时去除 BOM），并保持内容语义不变。',
        });
      }
    }

    inventoryRows.push(inv);

    if (ext === '.md') {
      const text = readText(fp);
      const kind = classifyMarkdownFile(fp);
      const version = parseDeclaredVersion(text);
      const updated = parseDeclaredUpdated(text);

      if (!version) {
        issues.push({
          id: nextId(),
          severity: gradeIssue('VERSION_MISSING'),
          code: 'VERSION_MISSING',
          file: rel,
          evidence: 'missing version',
          fix: '必须补齐 YAML frontmatter 的 version: vX.Y.Z，并与 CHANGELOG 主/次版本对齐。',
        });
      }
      if (!updated) {
        issues.push({
          id: nextId(),
          severity: gradeIssue('UPDATED_MISSING'),
          code: 'UPDATED_MISSING',
          file: rel,
          evidence: 'missing updated',
          fix: '必须补齐 YAML frontmatter 的 updated: YYYY-MM-DD。',
        });
      }

      const mm = version ? toMajorMinor(version) : null;
      const shouldMatchMajorMinor = relFromSop(fp).startsWith('skills/') || relFromSop(fp) === '01_concept_overview.md' || relFromSop(fp) === 'LLM_INDEX.md' || relFromSop(fp).startsWith('0');
      if (mm && shouldMatchMajorMinor && mm !== baseline.majorMinor) {
        issues.push({
          id: nextId(),
          severity: gradeIssue('VERSION_MM_MISMATCH'),
          code: 'VERSION_MM_MISMATCH',
          file: rel,
          evidence: `baseline=${baseline.majorMinor}.x, found=${mm}.x`,
          fix: `必须将主/次版本更新为 ${baseline.majorMinor}.x，并在必要时记录到 CHANGELOG。`,
        });
      }

      const tmpl = checkTemplateConformance(kind, rel, text);
      templateRows.push({
        path: rel,
        kind,
        version: version ?? '',
        updated: updated ?? '',
        failed_rules: tmpl.failed.join('; '),
      });
      if (tmpl.failed.length > 0) {
        issues.push({
          id: nextId(),
          severity: gradeIssue('TEMPLATE_MISSING'),
          code: 'TEMPLATE_MISSING',
          file: rel,
          evidence: tmpl.failed.join('; '),
          fix: '必须补齐模板要求的关键章节，并保证输入/输出/停止点/落盘交付物可执行。',
        });
      }

      if (kind === 'prompt') {
        const repeats = ['## Input', '## Workflow Steps', '## Stop Points', '## Constraints'].filter((x) => text.includes(x));
        if (repeats.length > 0) {
          issues.push({
            id: nextId(),
            severity: gradeIssue('PROMPT_REPEATS_CONTRACT'),
            code: 'PROMPT_REPEATS_CONTRACT',
            file: rel,
            evidence: repeats.join(','),
            fix: '必须删除 Prompt Pack 中重复的合约正文，只保留偏好/侧重点/输出风格。',
          });
        }
      }

      const usedStates = scanStateUses(text);
      for (const s of usedStates) {
        if (definedStates.has(s)) continue;
        issues.push({
          id: nextId(),
          severity: gradeIssue('STATE_UNDEFINED'),
          code: 'STATE_UNDEFINED',
          file: rel,
          evidence: s,
          fix: '必须将状态标记改为 state_dictionary.md 已定义项；若确需新增，先更新 state_dictionary，再更新引用方。',
        });
      }

      const usedCmds = scanCmdUses(text);
      for (const c of usedCmds) {
        if (definedCmds.has(c)) continue;
        issues.push({
          id: nextId(),
          severity: gradeIssue('CMD_UNDEFINED'),
          code: 'CMD_UNDEFINED',
          file: rel,
          evidence: c,
          fix: '必须将命令改为 command_dictionary.md 已定义项；若确需新增，先更新 command_dictionary，再更新引用方。',
        });
      }
    }
  }

  for (const ref of requiredRefs) {
    const abs = path.join(SOP_ROOT, ref);
    const exists = existsSync(abs);
    referenceRows.push({
      source: 'sop_GUIDE.md',
      ref: `sop/${ref}`,
      target: `sop/${ref}`,
      result: exists ? 'OK' : 'FAIL',
      fix: exists ? '' : '必须补齐该 SSOT/参考文件，或更新 GUIDE 的引用列表以匹配当前体系。',
    });
    if (!exists) {
      issues.push({
        id: nextId(),
        severity: gradeIssue('MISSING_GUIDE_REF'),
        code: 'MISSING_GUIDE_REF',
        file: 'sop_GUIDE.md',
        evidence: `sop/${ref}`,
        fix: '必须保证 GUIDE 的 SSOT 清单引用可达。',
      });
    }
  }

  const sopTextFiles = await listSopTextFiles();
  const linkGraph = buildLinkGraph(sopTextFiles);
  for (const e of linkGraph.edges) {
    const cls = classifyTarget(e.to);
    if (cls.kind !== 'missing') continue;
    referenceRows.push({
      source: relFromSop(e.from),
      ref: e.raw,
      target: relFromRepo(cls.normalized),
      result: 'FAIL',
      fix: '必须修复为可达路径（相对链接优先），或删除无效引用。',
    });
    issues.push({
      id: nextId(),
      severity: gradeIssue('MISSING_INTERNAL_LINK'),
      code: 'MISSING_INTERNAL_LINK',
      file: relFromSop(e.from),
      evidence: e.raw,
      fix: '必须修复为可达路径（相对链接优先），并保持引用语义一致。',
    });
  }

  const standardGap = {
    id: nextId(),
    severity: gradeIssue('STANDARD_GAP'),
    code: 'STANDARD_GAP',
    file: 'sop_GUIDE.md',
    evidence: '缺陷等级表/命名规范/目录深度阈值/附件命名规范未显式给出',
    fix: '建议在 GUIDE 中补齐上述规范，以便形成可验证的发布门禁。',
  };
  issues.push(standardGap);

  const invCsv = toCsv(inventoryRows, ['path', 'type', 'size_bytes', 'depth', 'is_attachment', 'encoding', 'bom']);
  const tmplCsv = toCsv(templateRows, ['path', 'kind', 'version', 'updated', 'failed_rules']);
  const refCsv = toCsv(referenceRows, ['source', 'ref', 'target', 'result', 'fix']);

  writeFileSync(path.join(outDirAbs, '01_inventory.csv'), invCsv, 'utf-8');
  writeFileSync(path.join(outDirAbs, '02_template_conformance.csv'), tmplCsv, 'utf-8');
  writeFileSync(path.join(outDirAbs, '03_reference_diff.csv'), refCsv, 'utf-8');

  issues.sort((a, b) => String(a.severity).localeCompare(String(b.severity)) || String(a.id).localeCompare(String(b.id)));

  const bySeverity = new Map();
  for (const it of issues) {
    const key = it.severity;
    const arr = bySeverity.get(key) ?? [];
    arr.push(it);
    bySeverity.set(key, arr);
  }

  const md = [];
  md.push('# 缺陷清单（分级：🔴🟠🟡🟢）');
  md.push('');
  md.push(`- 基线版本：${baseline.full}`);
  md.push(`- 输出目录：${relFromRepo(outDirAbs)}`);
  md.push('');
  for (const sev of ['🔴', '🟠', '🟡', '🟢']) {
    const arr = bySeverity.get(sev) ?? [];
    md.push(`## ${sev}（${arr.length}）`);
    md.push('');
    if (arr.length === 0) continue;
    md.push('| 索引号 | code | 文件 | 证据 | 修复动作（命令式） |');
    md.push('|---|---|---|---|---|');
    for (const it of arr) {
      md.push(`| ${it.id} | ${it.code} | ${it.file} | ${String(it.evidence).replaceAll('\n', ' ')} | ${String(it.fix).replaceAll('\n', ' ')} |`);
    }
    md.push('');
  }
  writeFileSync(path.join(outDirAbs, '04_issues.md'), md.join('\n') + '\n', 'utf-8');

  const idx = [];
  idx.push('# 审查证据索引');
  idx.push('');
  idx.push(`- 日期：${args.date}`);
  idx.push(`- 证据目录：${relFromRepo(outDirAbs)}`);
  idx.push('');
  idx.push('## 证据文件');
  idx.push('');
  idx.push('- 01_inventory.csv：资产清单（含深度、编码、附件标记）');
  idx.push('- 02_template_conformance.csv：模板对照表（按文件类型）');
  idx.push('- 03_reference_diff.csv：引用/链接比对表（GUIDE 引用 + 内部链接可达性）');
  idx.push('- 04_issues.md：缺陷分级与整改动作');
  idx.push('- 05_review_report.md：审查报告（后续生成）');
  idx.push('- 06_quality_gate.md：质量门禁（后续生成）');
  idx.push('- signoff.md：签字页（后续生成）');
  idx.push('');
  idx.push('## 缺陷索引号');
  idx.push('');
  idx.push('缺陷索引号格式：`REV-YYYYMMDD-####`，在 `04_issues.md` 中可追溯到证据表行与修复动作。');
  writeFileSync(path.join(outDirAbs, 'index.md'), idx.join('\n') + '\n', 'utf-8');

  const exitCode = (bySeverity.get('🔴')?.length ?? 0) > 0 || (bySeverity.get('🟠')?.length ?? 0) > 0 ? 2 : 0;
  process.exit(exitCode);
}

main().catch((err) => {
  console.error(err.stack || err.message || String(err));
  process.exit(1);
});
