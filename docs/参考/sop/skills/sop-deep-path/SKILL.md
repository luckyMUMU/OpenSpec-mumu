---
name: "sop-deep-path"
description: "Deep path workflow for complex changes. Invoke when task is triaged as deep path (cross-file, new feature, refactor, API change)."
---

# Deep Path Workflow

> **版本**: v1.5.1

## Input

- Task: [desc]
- Context: type/scope/constraints

## Workflow Steps

### Step 1: Requirement Analysis

**Purpose**: Clarify requirements

CMD: `REQ_ANALYZE(input) -> [WAITING_FOR_REQUIREMENTS]`

**Stop Point**: `[WAITING_FOR_REQUIREMENTS]`

### Step 2: Code Audit (Optional)

**Purpose**: Impact assessment

CMD: `AUDIT(scope)` / `LIST_DESIGN_MD(root)`

### Step 3: Architecture Design

**Purpose**: Technology-agnostic design

CMD: `ARCH_DESIGN(prd) -> [WAITING_FOR_ARCHITECTURE]`

**Stop Point**: `[WAITING_FOR_ARCHITECTURE]`

### Step 4: Architecture Review

**Purpose**: Quality assurance

CMD: `ARCH_REVIEW(l2) -> [ARCHITECTURE_PASSED] | [USER_DECISION]`

**Max**: 3 rounds

**Stop Points**:
- Pass: `[ARCHITECTURE_PASSED]`
- Deadlock: `[USER_DECISION]`

### Step 5: Implementation Design (Directory-based)

**Purpose**: Project-specific design

CMD: `IMPL_DESIGN(l2, dir) -> [WAITING_FOR_DESIGN]`

**Stop Point**: `[WAITING_FOR_DESIGN]`

### Step 6: Directory Scheduling

**Purpose**: Create parallel execution plan

CMD: `SCHEDULE_DIRS(design_list) -> [SCHEDULING]`

**Stop Point**: `[SCHEDULING]`

### Step 7: Code Implementation (Parallel)

**Purpose**: Physical coding with directory-based parallel execution

CMD: `RUN_DIR_BATCH(depth_desc) -> IMPLEMENT(dir, design) -> [WAITING_FOR_CODE_REVIEW]`

**Stop Point**: `[WAITING_FOR_CODE_REVIEW]`

### Step 8: Code Review

**Purpose**: Validate changes against design docs and common practices

CMD: `CODE_REVIEW(diff, design_refs) -> Diff展示`

### Step 9: Document Maintenance

**Purpose**: Sync docs

CMD: `DOC_SYNC(scope) -> [已完成]`

## 来源与依赖准则

- 各阶段产物必须包含“来源与依赖声明”（标准：04_reference/review_standards/source_dependency.standard.md），并优先用 `TRACE_SOURCES(inputs)` 固化
- 当任一阶段出现关键来源/依赖缺口时必须中断：进入 `[USER_DECISION]`，并使用 `RECORD_DECISION(topic, decision)` 落盘决策记录

## Output

- 状态：`[已完成]`
- 产物：PRD / L2 / design.md / code / indexes
- 参考：05_constraints/command_dictionary.md

## Constraints

- Must follow all stages
- Must pass reviews
- 3-strike rule applies
- Document must sync

## 3-Strike Rule

| Strike | Condition | Action |
|--------|-----------|--------|
| 1 | Implementation fails | Auto-fix |
| 2 | Fails again | Audit + redesign |
| 3 | Fails again | **Break**, user decision |
