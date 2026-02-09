---
version: v1.4.0
updated: 2026-02-10
scope: docs/参考/sop
---

# SOP 命令字典（Command DSL）

目的：用最少 token 表达 SOP 步骤；流程文档优先用“命令序列”替代叙述。

---

## 语法

- 单条命令：`CMD <NAME>(<args>) -> <out> | pre:<STATE> | post:<STATE>`
- 命令序列：`CMD A -> CMD B -> CMD C`
- 状态标记以 05_constraints/state_dictionary.md 为准。

---

## 命令

### 分诊/审计

| CMD | 角色 | args | out | pre | post |
|---|---|---|---|---|---|
| `ROUTE(task)` | Router | task | path, roles | - | - |
| `FAST_PATH_CHECK(change)` | Router | change | allow/upgrade | - | - |
| `TDD_CHECK(scope)` | Router | scope | on/off | - | - |
| `AUDIT(scope)` | Explorer | scope(paths) | audit_report | - | - |
| `LIST_DESIGN_MD(root)` | Explorer | root | design_list(path,depth) | - | - |

### 需求（L1-L3）

| CMD | 角色 | args | out | pre | post |
|---|---|---|---|---|---|
| `REQ_ANALYZE(input)` | Analyst | user_input | PRD/MRD/FRD | - | `[WAITING_FOR_REQUIREMENTS]` |
| `REQ_CONFIRM()` | 用户 | - | approved/revise | `[WAITING_FOR_REQUIREMENTS]` | - |

### 架构（L2）

| CMD | 角色 | args | out | pre | post |
|---|---|---|---|---|---|
| `ARCH_DESIGN(prd)` | Prometheus | PRD | L2_arch(.md), ADR_refs | - | `[WAITING_FOR_ARCHITECTURE]` |
| `ARCH_REVIEW(l2)` | Skeptic | L2_arch | review_report | `[WAITING_FOR_ARCHITECTURE]` | `[ARCHITECTURE_PASSED]` / `[USER_DECISION]` |

### 实现设计（L3 / 目录）

| CMD | 角色 | args | out | pre | post |
|---|---|---|---|---|---|
| `IMPL_DESIGN(l2, dir)` | Oracle | L2_arch, dir | design.md | `[ARCHITECTURE_PASSED]` | `[WAITING_FOR_DESIGN]` |
| `DESIGN_CONFIRM()` | 用户 | - | approved/revise | `[WAITING_FOR_DESIGN]` | - |

### 调度（目录并行）

| CMD | 角色 | args | out | pre | post |
|---|---|---|---|---|---|
| `WorkerScope(dir_with_design_md)` | Worker | dir | scope(paths) | - | - |
| `SCHEDULE_DIRS(design_list)` | Supervisor | design_list | dir_map | - | `[SCHEDULING]` |
| `RUN_DIR_BATCH(depth)` | Supervisor | depth | started_workers | `[SCHEDULING]` | `[DIR_WORKING]` |
| `WAIT_DEP(dir, deps)` | Worker | dir,deps | waiting | - | `[DIR_WAITING_DEP]` |
| `COMPLETE_DIR(dir)` | Worker | dir | done | - | `[DIR_COMPLETED]` |

### 实现（代码）

| CMD | 角色 | args | out | pre | post |
|---|---|---|---|---|---|
| `IMPLEMENT(dir, design)` | Worker | dir, design.md | code_changes | - | Diff展示 |
| `REQUEST_CROSS_DIR(dir, target_dir, change)` | Worker | target_dir, change | appended_request | - | `[DIR_WAITING_DEP]` |

### 测试（分层验收 / 可选 TDD）

| CMD | 角色 | args | out | pre | post |
|---|---|---|---|---|---|
| `TEST_DESIGN(design)` | Tester | design.md | test_design/CSV | - | `[WAITING_FOR_TEST_DESIGN]` |
| `TEST_IMPLEMENT(test_design)` | TestWorker | test_design | test_code | - | `[WAITING_FOR_TEST_IMPLEMENTATION]` |
| `RUN_ACCEPTANCE(level)` | Worker | L1/L2/L3/L4 | test_result | - | `[WAITING_FOR_Lx_REVIEW]` / Diff展示 |
| `REVIEW_ACCEPTANCE(level)` | Oracle/Analyst/Prometheus | Lx_result | pass/fail | `[WAITING_FOR_Lx_REVIEW]` | - |

### 文档维护

| CMD | 角色 | args | out | pre | post |
|---|---|---|---|---|---|
| `DOC_SYNC(scope)` | Librarian | indexes/links | updated_docs | - | `[已完成]` |

### 治理

| CMD | 角色 | args | out | pre | post |
|---|---|---|---|---|---|
| `STRIKE(record)` | Supervisor | failure | strike_count | - | - |
| `FUSE(reason)` | Supervisor | reason | report | - | `[FUSION_TRIGGERED]` |
| `ASK_USER_DECISION(topic, options)` | 任意→用户 | topic, options | decision | `[USER_DECISION]` | - |
