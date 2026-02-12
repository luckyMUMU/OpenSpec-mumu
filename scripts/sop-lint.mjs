#!/usr/bin/env node
import fg from 'fast-glob';
import { readFileSync } from 'fs';
import path from 'path';
import process from 'process';
import url from 'url';

const REPO_ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const SOP_ROOT = path.join(REPO_ROOT, 'docs', '参考', 'sop');

function toGlobPattern(p) {
  return String(p).replaceAll('\\', '/');
}

/**
 * @param {string} filePath
 * @returns {string}
 */
function readText(filePath) {
  return readFileSync(filePath, 'utf-8');
}

/**
 * @param {string} message
 * @returns {never}
 */
function fatal(message) {
  throw new Error(message);
}

/**
 * @param {string} version
 * @returns {string}
 */
function toMajorMinor(version) {
  const m = String(version).trim().match(/^v?(\d+)\.(\d+)\.(\d+)$/);
  if (!m) fatal(`Invalid semver: ${version}`);
  return `${m[1]}.${m[2]}`;
}

/**
 * @param {string} changelogText
 * @returns {{ full: string; majorMinor: string }}
 */
function parseChangelogCurrentVersion(changelogText) {
  const m = changelogText.match(/^\s*>\s*\*\*当前版本\*\*:\s*(v\d+\.\d+\.\d+)/m);
  const v = m?.[1] ?? parseDeclaredVersion(changelogText);
  if (!v) fatal('CHANGELOG.md missing current version line');
  return { full: v, majorMinor: toMajorMinor(v) };
}

/**
 * Extracts version declared in either:
 * - blockquote header: `> **版本**: vX.Y.Z`
 * - YAML frontmatter:  `version: vX.Y.Z`
 *
 * @param {string} fileText
 * @returns {string | null}
 */
function parseDeclaredVersion(fileText) {
  const blockquote = fileText.match(/^\s*>\s*\*\*版本\*\*:\s*(v\d+\.\d+\.\d+)/m);
  if (blockquote) return blockquote[1];
  const fm = fileText.match(/^\s*version:\s*(v\d+\.\d+\.\d+)\s*$/m);
  if (fm) return fm[1];
  return null;
}

/**
 * Ensures prompt pack markdown files have version+updated in YAML frontmatter.
 *
 * @returns {Promise<string[]>}
 */
async function lintPromptPackMetadata() {
  const errors = [];
  const promptPackFiles = await fg(
    [
      toGlobPattern(path.join(SOP_ROOT, 'prompts', 'packs', '**', '00_system.md')),
      toGlobPattern(path.join(SOP_ROOT, 'prompts', 'packs', '**', '01_operator.md')),
      toGlobPattern(path.join(SOP_ROOT, 'prompts', 'packs', '**', 'skills', '*.md')),
    ],
    { onlyFiles: true },
  );

  for (const filePath of promptPackFiles) {
    const text = readText(filePath);
    const version = parseDeclaredVersion(text);
    const hasUpdated = /^\s*updated:\s*\d{4}-\d{2}-\d{2}\s*$/m.test(text);
    if (!version) errors.push(`${path.relative(REPO_ROOT, filePath)}: missing version`);
    if (!hasUpdated) errors.push(`${path.relative(REPO_ROOT, filePath)}: missing updated`);
  }

  return errors;
}

/**
 * @returns {Promise<string[]>}
 */
async function listSopMarkdownFiles() {
  const patterns = [toGlobPattern(path.join(SOP_ROOT, '**', '*.md'))];
  const ignore = [
    toGlobPattern(path.join(SOP_ROOT, 'reviews', '**')),
    toGlobPattern(path.join(SOP_ROOT, 'SOP_REVIEW_REPORT.md')),
  ];
  return fg(patterns, { ignore, dot: true, onlyFiles: true });
}

/**
 * @param {string} stateDictionaryText
 * @returns {Set<string>}
 */
function collectAllowedStates(stateDictionaryText) {
  const set = new Set();
  const re = /\[(?:[A-Z0-9_]+|已完成)\]/g;
  for (const m of stateDictionaryText.matchAll(re)) {
    set.add(m[0]);
  }
  return set;
}

/**
 * @param {string[]} mdFiles
 * @param {{ majorMinor: string }} baseline
 * @returns {string[]}
 */
function lintDeclaredVersions(mdFiles, baseline) {
  const errors = [];
  for (const filePath of mdFiles) {
    const text = readText(filePath);
    const declared = parseDeclaredVersion(text);
    if (!declared) continue;
    const mm = toMajorMinor(declared);
    if (mm !== baseline.majorMinor) {
      errors.push(`${path.relative(REPO_ROOT, filePath)}: version ${declared} mismatches baseline v${baseline.majorMinor}.x`);
    }
  }
  return errors;
}

/**
 * Blocks stale “当前版本 **vX.Y.Z**” sections (those must defer to CHANGELOG).
 *
 * @param {string[]} mdFiles
 * @returns {string[]}
 */
function lintStaleCurrentVersionSections(mdFiles) {
  const errors = [];
  const re = /###\s*当前版本\s*[\s\S]*?\*\*v\d+\.\d+\.\d+\*\*/m;
  for (const filePath of mdFiles) {
    const rel = path.relative(REPO_ROOT, filePath);
    if (rel.endsWith(path.join('CHANGELOG.md'))) continue;
    const text = readText(filePath);
    if (re.test(text)) {
      errors.push(`${rel}: contains a hardcoded “当前版本 **vX.Y.Z**” section`);
    }
  }
  return errors;
}

/**
 * Ensures skills require TRACE_SOURCES and RECORD_DECISION.
 *
 * @returns {Promise<string[]>}
 */
async function lintTraceSourcesRequirements() {
  const errors = [];
  const skillFiles = await fg([toGlobPattern(path.join(SOP_ROOT, 'skills', '*', 'SKILL.md'))], { onlyFiles: true });

  for (const filePath of skillFiles) {
    const text = readText(filePath);
    if (!text.includes('TRACE_SOURCES(')) errors.push(`${path.relative(REPO_ROOT, filePath)}: missing TRACE_SOURCES(`);
    if (!text.includes('RECORD_DECISION(')) errors.push(`${path.relative(REPO_ROOT, filePath)}: missing RECORD_DECISION(`);
  }
  return errors;
}

/**
 * Ensures all state-like tokens used in SOP docs are defined in state_dictionary.md.
 *
 * @param {string[]} mdFiles
 * @param {Set<string>} allowedStates
 * @returns {string[]}
 */
function lintStateTokenUsage(mdFiles, allowedStates) {
  const errors = [];
  const tokenRe =
    /\[(?:WAITING_[A-Z0-9_]+|DIR_[A-Z0-9_]+|ARCHITECTURE_[A-Z0-9_]+|FUSION_[A-Z0-9_]+|USER_DECISION(?:_[A-Z0-9_]+)?|SCHEDULING|PARALLEL_EXECUTING|WAITING_DEPENDENCY|ALL_COMPLETED|已完成)\]/g;

  for (const filePath of mdFiles) {
    const rel = path.relative(REPO_ROOT, filePath);
    if (rel.endsWith(path.join('05_constraints', 'state_dictionary.md'))) continue;
    const text = readText(filePath);
    for (const m of text.matchAll(tokenRe)) {
      const tok = m[0];
      if (!allowedStates.has(tok)) {
        errors.push(`${rel}: uses undefined state ${tok}`);
      }
    }
  }
  return errors;
}

/**
 * @returns {Promise<void>}
 */
async function main() {
  const changelogPath = path.join(SOP_ROOT, 'CHANGELOG.md');
  const baseline = parseChangelogCurrentVersion(readText(changelogPath));

  const mdFiles = await listSopMarkdownFiles();
  const errors = [];

  errors.push(...(await lintPromptPackMetadata()));
  errors.push(...lintDeclaredVersions(mdFiles, baseline));
  errors.push(...lintStaleCurrentVersionSections(mdFiles));
  errors.push(...(await lintTraceSourcesRequirements()));

  const allowedStates = collectAllowedStates(readText(path.join(SOP_ROOT, '05_constraints', 'state_dictionary.md')));
  errors.push(...lintStateTokenUsage(mdFiles, allowedStates));

  if (errors.length > 0) {
    console.error('❌ sop-lint: FAILED');
    for (const e of errors) console.error(`- ${e}`);
    process.exit(1);
  }

  console.log('✅ sop-lint: OK');
}

main().catch((err) => {
  console.error(`❌ sop-lint: ${err.message}`);
  process.exit(1);
});
