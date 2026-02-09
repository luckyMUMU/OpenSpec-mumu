---
name: "sop-workflow-orchestrator"
description: "Workflow orchestration for task triage and path selection. Invoke when receiving a new task request to analyze complexity, select path (fast/deep/TDD), and assign roles."
---

# Workflow Orchestration

> **版本**: v1.4.0

## Input

- user_request
- context(project_type/related_files/urgency/constraints)

## Workflow Steps

### Step 1: Analyze Task Complexity
CMD: `FAST_PATH_CHECK(change) -> allow|upgrade`
CMD: `TDD_CHECK(scope) -> on|off`

### Step 2: Select Path

**Fast Path** (all conditions met):
- Single file + <30 lines + no logic change

**Deep Path** (any condition met):
- Cross-file / new feature / refactor / API change / architecture

**TDD Deep Path** (deep path + any condition):
- Core business / complex logic / high coverage requirement

### Step 3: Directory Structure Analysis (Deep Path)

**Purpose**: Prepare for directory-based parallel execution

CMD: `LIST_DESIGN_MD(root) -> design_list`

### Step 4: Assign Roles

**Fast Path Flow**:
```
Explorer → Worker → Librarian
```

**Deep Path Flow (Directory-based)**:
```
New project: Analyst → Prometheus ↔ Skeptic → Oracle → Supervisor → [多 Worker 并行] → Librarian
Feature:      Analyst → Oracle → Supervisor → [多 Worker 并行] → Librarian
```

**TDD Deep Path Flow (Directory-based)**:
```
Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Supervisor → [多 Worker 并行] → Librarian
                                    ↓
                              生成CSV测试用例
```

**Role Assignment with Directory Scope**:

| Stage | Role | Task | Scope |
|-------|------|------|-------|
| 1 | Analyst | 需求分析 | 全局 |
| 2 | Prometheus | 架构设计 | 全局 |
| 3 | Skeptic | 架构审查 | 全局 |
| 4 | Oracle | 实现设计 | 按目录 |
| 5 | Tester | 测试设计 | 按目录 |
| 6 | **Supervisor** | **调度协调** | **全局** |
| 7 | **Worker** | **编码实现** | **design.md 所在目录** |
| 7 | **TestWorker** | **测试实现** | **design.md 所在目录** |
| 8 | Librarian | 文档维护 | 全局 |

### Step 5: Parallel Execution Plan

**Purpose**: Define directory-based parallel execution strategy

CMD: `SCHEDULE_DIRS(design_list) -> dir_map`

## Output

- 模板：04_reference/interaction_formats/router_triage.md
- CMD: `ROUTE(task)`

## Constraints

- Must accurately judge complexity
- Must consider dependencies
- Must provide clear next steps
- Must check TDD conditions
- **Must analyze directory structure for parallel execution**
- **Must create directory-based execution plan**
- **Must assign directory scope to Workers**
