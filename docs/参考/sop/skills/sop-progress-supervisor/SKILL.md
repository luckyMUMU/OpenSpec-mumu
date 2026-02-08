---
name: "sop-progress-supervisor"
description: "Progress monitoring workflow for tracking execution and triggering circuit breakers. Invoke when monitoring task execution or detecting anomalies."
---

# Progress Monitoring Workflow

> **版本**: v1.1.0

## Input

```markdown
## Monitor Task
[ID/name]

## Current State
- Stage: [current]
- Role: [current]
- Start: [time]
- Elapsed: [duration]

## Directory Mapping
| Directory | Depth | Worker | Status | Dependencies |
|-----------|-------|--------|--------|--------------|
| [dir1] | 3 | Worker-1 | [DIR_COMPLETED] | - |
| [dir2] | 2 | Worker-2 | [DIR_WORKING] | [dir1] |
| [dir3] | 2 | Worker-3 | [DIR_WAITING_DEP] | [dir2] |

## Latest Feedback
[Role feedback]

## Failures
- Count: [0/1/2/3]
- Reason: [reason]
```

## Workflow Steps

### Step 1: Directory Mapping Creation

**Purpose**: Create directory-Worker mapping for parallel execution

**Actions**:
1. Scan all design.md files in project
2. Calculate directory depth for each
3. Sort by depth (descending)
4. Create mapping table
5. Mark `[SCHEDULING]`

**Directory Depth Calculation**:
```
Depth 0: ./
Depth 1: src/
Depth 2: src/module/          ← design.md here = depth 2
Depth 3: src/module/utils/
```

### Step 2: Worker Launch Scheduling

**Purpose**: Launch Workers by directory depth

**Actions**:
1. Group directories by depth
2. For each depth level (from deepest):
   - Check if dependencies are completed
   - Launch Workers for directories with no pending dependencies
3. Mark `[PARALLEL_EXECUTING]`

**Launch Rules**:
| Condition | Action |
|-----------|--------|
| No dependencies | Launch immediately |
| All dependencies [DIR_COMPLETED] | Launch immediately |
| Has pending dependencies | Wait |
| Same depth, no cross-dependency | Launch in parallel |

### Step 3: State Collection

**Purpose**: Gather current status from all Workers

**Actions**:
1. Read each Worker's status mark
2. Update directory mapping table
3. Note any blockers

### Step 4: Deviation Detection

**Purpose**: Identify issues

**Actions**:
1. Compare to planned schedule
2. Check for delays
3. Identify dependency deadlocks
4. Detect cross-directory conflicts

### Step 5: Dependency Coordination

**Purpose**: Handle cross-directory dependencies

**Actions**:
1. When Worker reports `[DIR_WAITING_DEP]`:
   - Identify target dependency directory
   - Check if target has Worker assigned
   - If no Worker, create new Worker for target
   - If has Worker, check its status
2. When dependency completes:
   - Notify waiting Worker to continue
   - Update mapping table

### Step 6: Risk Assessment

**Purpose**: Evaluate severity

**Severity**:
- 🔴 Critical: Blocked, needs immediate action
- 🟡 Warning: Delayed, needs attention
- 🟢 Normal: On track

### Step 7: Decision

**Purpose**: Determine next action

**Options**:
- Continue: Normal progress
- Alert: Warning, notify stakeholders
- Break: Critical, trigger circuit breaker

## Output

### Progress Update
```markdown
## Progress Update

### State
- Task: [name]
- Stage: [stage]
- Status: [in_progress/done/blocked]
- Overall Progress: [N/M directories completed]

### Directory Mapping
| Directory | Depth | Worker | Status | Dependencies |
|-----------|-------|--------|--------|--------------|
| src/core/utils/ | 3 | Worker-1 | [DIR_COMPLETED] | - |
| src/core/ | 2 | Worker-2 | [DIR_WORKING] | src/core/utils/ |
| src/api/ | 2 | Worker-3 | [DIR_WAITING_DEP] | src/core/ |

### Progress by Depth
| Depth | Total | Completed | In Progress | Waiting |
|-------|-------|-----------|-------------|---------|
| 3 | 2 | 2 | 0 | 0 |
| 2 | 3 | 0 | 1 | 2 |
| 1 | 1 | 0 | 0 | 1 |

### Risks
- 🟡 [warning]: [description] → [suggestion]
- 🔴 [critical]: [description] → [suggestion]

### Next Actions
- Launch Worker for: [directory]
- Notify: [Worker] to continue
- Wait for: [directory] to complete
```

### Circuit Breaker
```markdown
## Circuit Breaker Triggered

### Reason
- Type: [3 strikes/deadlock/high risk/cross-directory conflict]
- Detail: [description]

### Current State
- Failures: [count]/3
- Involved Workers: [list]
- Blocked directories: [list]
- Last operation: [description]

### Problem Analysis
- **Root cause**: [description]
- **Affected directories**: [list]
- **Impact scope**: [description]

### Suggestions
- A: [description] → [expected result]
- B: [description] → [expected result]
- C: [description] → [expected result]

### Decision Request
`[USER_DECISION]` - Please select a solution or provide a new one

Mark: `[FUSION_TRIGGERED]`
```

## Constraints

- Read all: code, docs, status
- Write status only
- Trigger `[FUSION_TRIGGERED]` when needed
- No implementation
- **Maintain directory-Worker mapping table**
- **Coordinate cross-directory dependencies**
- **Schedule parallel execution by depth**

## 3-Strike Rule

| Strike | Condition | Action |
|--------|-----------|--------|
| 1 | Implementation fails | Log, allow retry |
| 2 | Fails again | Audit + redesign |
| 3 | Fails again | **Break**, `[FUSION_TRIGGERED]` |
