---
version: v2.0.0
updated: 2026-02-12
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

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `ROUTE(task)` | sop-workflow-orchestrator | task | path, call_chain | - | - |
| `FAST_PATH_CHECK(change)` | sop-workflow-orchestrator | change | allow/upgrade | - | - |
| `TDD_CHECK(scope)` | sop-workflow-orchestrator | scope | on/off | - | - |
| `AUDIT(scope)` | sop-code-explorer | scope(paths) | audit_report | - | - |
| `LIST_DESIGN_MD(root)` | sop-code-explorer | root | design_list(path,depth) | - | - |
| `TRACE_SOURCES(inputs)` | 任意 | inputs(paths/links) | source_dependency | - | - |
| `RECORD_DECISION(topic, decision)` | 任意 | topic, decision | decision_record(path) | - | - |

### 需求（L1-L3）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `REQ_ANALYZE(input)` | sop-requirement-analyst | user_input | PRD/MRD/FRD | - | `[WAITING_FOR_REQUIREMENTS]` |
| `REQ_CONFIRM()` | 用户 | - | approved/revise | `[WAITING_FOR_REQUIREMENTS]` | - |

### 架构（L2）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `ARCH_DESIGN(prd)` | sop-architecture-design | PRD | L2_arch(.md), ADR_refs | - | `[WAITING_FOR_ARCHITECTURE]` |
| `ARCH_REVIEW(l2)` | sop-architecture-reviewer | L2_arch | review_report | `[WAITING_FOR_ARCHITECTURE]` | `[ARCHITECTURE_PASSED]` / `[USER_DECISION]` |

### 实现设计（L3 / 目录）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `IMPL_DESIGN(l2, dir)` | sop-implementation-designer | L2_arch, dir | design.md | `[ARCHITECTURE_PASSED]` | `[WAITING_FOR_DESIGN]` |
| `DESIGN_CONFIRM()` | 用户 | - | approved/revise | `[WAITING_FOR_DESIGN]` | - |

### 调度（目录并行）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `DIR_SCOPE(dir_with_design_md)` | sop-code-implementation | dir | scope(paths) | - | - |
| `SCHEDULE_DIRS(design_list)` | sop-progress-supervisor | design_list | dir_map | - | `[SCHEDULING]` |
| `RUN_DIR_BATCH(depth)` | sop-progress-supervisor | depth | started_scopes | `[SCHEDULING]` | `[DIR_WORKING]` |
| `WAIT_DEP(dir, deps)` | sop-code-implementation | dir,deps | waiting | - | `[DIR_WAITING_DEP]` |
| `COMPLETE_DIR(dir)` | sop-code-implementation | dir | done | - | `[DIR_COMPLETED]` |

### 实现（代码）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `IMPLEMENT(dir, design)` | sop-code-implementation | dir, design.md | code_changes | - | `[WAITING_FOR_CODE_REVIEW]` |
| `REQUEST_CROSS_DIR(dir, target_dir, change)` | sop-code-implementation | target_dir, change | appended_request | - | `[DIR_WAITING_DEP]` |

### 代码审查

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `CODE_REVIEW(diff, design_refs)` | sop-code-review | diff, refs(L2/L3/tests) | review_report | `[WAITING_FOR_CODE_REVIEW]` / `[WAITING_FOR_TEST_IMPLEMENTATION]` | `Diff展示(通过) / [DIR_WORKING](需修改) / [USER_DECISION](僵局或>=3轮)` |

### 测试（分层验收 / 可选 TDD）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `TEST_DESIGN_CSV(design)` | sop-test-design-csv | design.md | test_cases.csv | - | `[WAITING_FOR_TEST_DESIGN]` |
| `TEST_DESIGN(design)` | sop-test-design-csv | design.md | test_cases.csv | - | `[WAITING_FOR_TEST_DESIGN]` |
| `TEST_IMPLEMENT(test_design)` | sop-test-implementation | test_cases.csv | test_code | - | `[WAITING_FOR_TEST_IMPLEMENTATION]` |
| `RUN_ACCEPTANCE(level)` | sop-code-implementation | L1/L2/L3/L4 | test_result | - | `[WAITING_FOR_Lx_REVIEW]` / Diff展示 |
| `REVIEW_ACCEPTANCE(level)` | sop-code-review | Lx_result | pass/fail | `[WAITING_FOR_Lx_REVIEW]` | `pass:- / fail:[DIR_WORKING] / deadlock:[USER_DECISION]` |

### 文档维护

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `DOC_SYNC(scope)` | sop-document-sync | indexes/links | updated_docs | - | `[已完成]` |

### 治理

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `STRIKE(record)` | sop-progress-supervisor | failure | strike_count | - | - |
| `FUSE(reason)` | sop-progress-supervisor | reason | report | - | `[FUSION_TRIGGERED]` |
| `ASK_USER_DECISION(topic, options)` | 任意→用户 | topic, options | decision | `[USER_DECISION]` | - |
