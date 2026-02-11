---
name: "sop-code-implementation"
description: "Code implementation workflow for physical coding. Invoke when implementation design is approved and ready for coding."
---

# Code Implementation Workflow

> **版本**: v1.5.1

## Input

- Implementation Design（design.md / link）
- Directory Scope（dir + depth + deps）
- 可执行命令契约（test/lint/typecheck；参见 05_constraints/acceptance_criteria.md）

## Workflow Steps

### Step 1: Directory Scope Check

**Purpose**: Confirm Worker work boundary

**Actions**:
1. Read design.md in target directory
2. Confirm directory boundary (current dir + subdirs without nested design.md)
3. Check dependency directory status
4. Mark `[DIR_WORKING]`
CMD: `WAIT_DEP(dir,deps)` / `COMPLETE_DIR(dir)`

### Step 2: Checkpoint

**Purpose**: Create rollback point

**Actions**:
1. Note current state
2. Prepare rollback plan

### Step 3: Code Development (Within Directory Boundary)

**Purpose**: Implement by design within directory scope

**Actions**:
1. Follow design doc strictly
2. **Only modify files within current directory scope**
3. **Do NOT modify files in other design.md directories**
4. Add code comments

**Cross-Directory Change Handling**:
CMD: `REQUEST_CROSS_DIR(src_dir, target_dir, change) -> appended_request`

### Step 4: Testing

**Purpose**: Verify correctness

**Actions**:
1. Run unit tests within directory
2. Run integration tests
3. Fix failures

### Step 5: Quality Check

**Purpose**: Ensure code quality

**Actions**:
1. Run linter
2. Run type checker
3. Fix issues

### Step 6: Completion

**Purpose**: Prepare for code review and completion

**Actions**:
1. Generate diff for review
2. Mark `[WAITING_FOR_CODE_REVIEW]`
3. Wait CodeReviewer review result
4. If passed: mark `[DIR_COMPLETED]` and notify Supervisor

## 来源与依赖准则

- 必须声明输入来源与依赖（design.md/验收标准/红线约束等），并优先用 `TRACE_SOURCES(inputs)` 固化“来源与依赖声明”
- 当找不到来源或依赖时必须中断：进入 `[USER_DECISION]`，并使用 `RECORD_DECISION(topic, decision)` 落盘决策记录
- 标准：04_reference/review_standards/source_dependency.standard.md

## Output

- 模板：04_reference/interaction_formats/worker_execution_result.md
- CMD: `IMPLEMENT(dir, design)`

## Constraints

- **Directory Boundary**: Only modify files within current design.md directory
- **No Cross-Directory Changes**: **Strictly Prohibited** to modify other design.md files
- **Dependency Wait**: Must wait for dependencies to complete
- **Follow design strictly**: No design changes during implementation
- **Must pass tests**: All tests must pass
- **Must pass quality checks**: Lint and type check must pass

## 3-Strike Rule

| Strike | Condition | Action |
|--------|-----------|--------|
| 1 | Test/quality fail | Auto-fix |
| 2 | Fail again | Audit + redesign |
| 3 | Fail again | **Break**, user decision |
