---
name: "sop-progress-supervisor"
description: "Progress monitoring workflow for tracking execution and triggering circuit breakers. Invoke when monitoring task execution or detecting anomalies."
---

# Progress Monitoring Workflow

> **版本**: v1.5.0

**位置**: `sop/skills/sop-progress-supervisor/SKILL.md`

## 触发条件

- 进入目录并行执行，需要创建/更新调度映射并监督执行
- 任意 Worker 出现阻塞、重复失败、依赖死锁、跨目录冲突等异常

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
CMD: `SCHEDULE_DIRS(design_list) -> dir_map`（必须持久化 `temp/scheduler_state.md`）

### Step 2: Worker Launch Scheduling

**Purpose**: Launch Workers by directory depth

**Actions**:
CMD: `RUN_DIR_BATCH(depth_desc)`（deps 全部 `[DIR_COMPLETED]` 才可启动）

### Step 3: State Collection

**Purpose**: Gather current status from all Workers

**Actions**:
CMD: collect worker_status -> update dir_map -> persist `temp/scheduler_state.md`

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

- 交付物（模板）：04_reference/interaction_formats/supervisor_report.md
- 交付物：`temp/scheduler_state.md`（目录-Worker映射、目录状态、依赖、批次）
- CMD: `STRIKE(record)` / `FUSE(reason)` / `ASK_USER_DECISION(topic, options)`

## Stop Points

- `[SCHEDULING]`: 生成目录-Worker映射与调度计划
- `[PARALLEL_EXECUTING]`: 多 Worker 并行执行中
- `[WAITING_DEPENDENCY]`: 存在目录依赖等待
- `[ALL_COMPLETED]`: 所有目录进入完成态
- `[FUSION_TRIGGERED]`: 连续失败触发熔断，必须停止推进并进入用户决策

## Constraints

- Read all: code, docs, status
- Write status only
- Trigger `[FUSION_TRIGGERED]` when needed
- No implementation
- Must reference SSOT when using states/commands: 05_constraints/state_dictionary.md, 05_constraints/command_dictionary.md
- **Maintain directory-Worker mapping table**
- **Coordinate cross-directory dependencies**
- **Schedule parallel execution by depth**

## Failure Handling

- 失败计数到达阈值时必须执行 `STRIKE(record)`，并在第 3 次失败触发 `FUSE(reason)` 与 `[FUSION_TRIGGERED]`

## 3-Strike Rule

| Strike | Condition | Action |
|--------|-----------|--------|
| 1 | Implementation fails | Log, allow retry |
| 2 | Fails again | Audit + redesign |
| 3 | Fails again | **Break**, `[FUSION_TRIGGERED]` |
