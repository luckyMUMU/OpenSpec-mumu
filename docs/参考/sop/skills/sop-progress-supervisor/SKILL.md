---
name: "sop-progress-supervisor"
description: "Progress monitoring workflow for tracking execution and triggering circuit breakers. Invoke when monitoring task execution or detecting anomalies."
---

# Progress Monitoring Workflow

> **版本**: v1.4.0

## Input

- task_id/name
- stage/role/elapsed
- dir_map（目录/深度/Worker/状态/依赖）
- failures（0-3）

## Workflow Steps

### Step 1: Directory Mapping Creation

**Purpose**: Create directory-Worker mapping for parallel execution

**Actions**:
CMD: `LIST_DESIGN_MD(root) -> design_list`
CMD: `SCHEDULE_DIRS(design_list) -> dir_map`（可选：持久化 `.temp/scheduler_state.md`）

### Step 2: Worker Launch Scheduling

**Purpose**: Launch Workers by directory depth

**Actions**:
CMD: `RUN_DIR_BATCH(depth_desc)`（deps 全部 `[DIR_COMPLETED]` 才可启动）

### Step 3: State Collection

**Purpose**: Gather current status from all Workers

**Actions**:
CMD: collect worker_status -> update dir_map -> (optional) persist

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
CMD: `WAIT_DEP(dir,deps)` / notify resume

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

- 模板：04_reference/interaction_formats/supervisor_report.md
- CMD: `STRIKE(record)` / `FUSE(reason)` / `ASK_USER_DECISION(topic, options)`

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
