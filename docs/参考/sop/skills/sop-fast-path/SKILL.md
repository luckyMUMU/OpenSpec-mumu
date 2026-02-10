---
name: "sop-fast-path"
description: "Fast path workflow for single-file, small changes. Invoke when task is triaged as fast path (single file, <30 lines, no logic change)."
---

# Fast Path Workflow

> **版本**: v1.4.0

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
CMD: `IMPLEMENT(dir, audit)`

**Stop Point**: Show diff for review

### Step 3: Document Sync

**Purpose**: Update related docs

**Actions**:
CMD: `DOC_SYNC(scope) -> [已完成]`

## Output

- 状态：`[已完成]`
- 模板：04_reference/interaction_formats/worker_execution_result.md

## Constraints

- Single file only
- <30 lines changed
- No logic changes
- Must pass tests
- **No directory-based execution needed**
