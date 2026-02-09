---
name: "sop-code-implementation"
description: "Code implementation workflow for physical coding. Invoke when implementation design is approved and ready for coding."
---

# Code Implementation Workflow

> **版本**: v1.4.0

## Input

```markdown
## Implementation Design
[Design document link]

## Directory Scope
- Target directory: [path to design.md directory]
- Depth: [directory depth]
- Dependencies: [dependent directories]

## Context
- Tech stack: [stack]
- Test command: [command]
- Lint command: [command]
```

## Workflow Steps

### Step 1: Directory Scope Check

**Purpose**: Confirm Worker work boundary

**Actions**:
1. Read design.md in target directory
2. Confirm directory boundary (current dir + subdirs without nested design.md)
3. Check dependency directory status
4. Mark `[DIR_WORKING]`

**Dependency Check**:
```markdown
| Dependency Directory | Status | Action |
|---------------------|--------|--------|
| src/core/ | [DIR_COMPLETED] | Continue |
| src/utils/ | [DIR_WORKING] | Wait |
```

### Step 2: Checkpoint

**Purpose**: Create rollback point

**Actions**:
1. Mark `[in_progress]`
2. Note current state
3. Prepare rollback plan

### Step 3: Code Development (Within Directory Boundary)

**Purpose**: Implement by design within directory scope

**Actions**:
1. Follow design doc strictly
2. **Only modify files within current directory scope**
3. **Do NOT modify files in other design.md directories**
4. Add code comments

**Cross-Directory Change Handling**:
- If need to modify other directory → **Do NOT update target design.md directly**
- **Record Request**: Add "External Dependency Request" to **CURRENT** directory's `design.md`
- **Content**: Include target directory, change description, and interface contract
- Notify Supervisor to route request
- Mark `[DIR_WAITING_DEP]` and wait

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

**Purpose**: Mark directory complete

**Actions**:
1. Mark `[DIR_COMPLETED]`
2. Notify Supervisor
3. Generate diff for review

## Output

```markdown
## Implementation Complete

### Directory
- Path: [target directory]
- Status: [DIR_COMPLETED]

### Changes
- Files: [N]
- Lines: [+N/-M]

### Tests
- Unit: [pass/fail]
- Integration: [pass/fail]

### Quality
- Lint: [pass/fail]
- Type check: [pass/fail]

### Dependencies
| Directory | Status |
|-----------|--------|
| [dep1] | [DIR_COMPLETED] |
| [dep2] | [DIR_COMPLETED] |

### Diff
[diff]

### Status
Waiting for review
```

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
