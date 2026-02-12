---
name: "sop-fast-path"
description: "Fast path workflow for single-file, small changes. Invoke when task is triaged as fast path (single file, <30 lines, no logic change)."
version: v2.0.0
updated: 2026-02-12
---

# Fast Path Workflow

## 触发条件

- 仅当满足 fast 判定（单文件 + <30 行 + 无逻辑变更）时 → 才能调用本 Skill
- 仅当无法证明无行为变化或存在跨文件/跨目录影响时 → 必须升级到 `sop-deep-path`

## Input

- Task: [desc]
- Target: file/path + delta_lines + type

## Workflow Steps

### Step 1: Code Audit

**Purpose**: Quick impact assessment

**Actions**:
CMD: `AUDIT(file) -> audit_report`

**Note**: Fast path does not involve directory-based parallel execution as it targets a single file.

### Step 2: Code Modification

**Purpose**: Implement the change

**Actions**:
CMD: `IMPLEMENT(dir, audit) -> [WAITING_FOR_CODE_REVIEW]`

**Stop Point**: `[WAITING_FOR_CODE_REVIEW]`

### Step 3: Code Review

**Purpose**: Validate changes against design and common practices

**Actions**:
CMD: `CODE_REVIEW(diff, design_refs) -> Diff展示`

### Step 4: Document Sync

**Purpose**: Update related docs

**Actions**:
CMD: `DOC_SYNC(scope) -> [已完成]`

## 来源与依赖准则

- 关键产物（审计报告/执行结果/审查报告）必须包含“来源与依赖声明”（标准：04_reference/review_standards/source_dependency.standard.md），并优先用 `TRACE_SOURCES(inputs)` 固化
- 当关键来源/依赖缺口无法消解时，必须进入 `[USER_DECISION]`，并使用 `RECORD_DECISION(topic, decision)` 落盘决策记录

## Output

- 状态：`[已完成]`
- 模板：04_reference/interaction_formats/worker_execution_result.md

## Constraints

- Single file only
- <30 lines changed
- No logic changes
- Must pass tests
- **No directory-based execution needed**
