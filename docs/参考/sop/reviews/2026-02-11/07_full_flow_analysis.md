---
date: 2026-02-11
baseline: v1.5.0
scope: sop
---

# 07 SOP 全流程逐一分析

## 0. 全局约束与 SSOT

### SSOT（唯一真源）

- 角色与权限：`sop/02_role_matrix/index.md`
- 工作流索引：`sop/03_workflow/index.md`
- 状态字典：`sop/05_constraints/state_dictionary.md`
- 命令字典：`sop/05_constraints/command_dictionary.md`
- 禁止项矩阵：`sop/05_constraints/constraint_matrix.md`
- 分层验收标准：`sop/05_constraints/acceptance_criteria.md`
- 审查标准（按产物）：`sop/04_reference/review_standards/`

### 全局不变量（流程层）

- 先达到停止点，再继续下一阶段（停止点名称以状态字典为准）
- 审查与实现解耦：实现完成不等于可交付，需经过对应审查与人工审批
- 按目录边界工作：Worker/TestWorker 只能写入 design.md 所在目录范围

## 1. Router 分诊

### 目的

- 将用户请求映射到路径与角色组合，避免“错用路径导致返工”

### 关键命令

- `ROUTE(task)` → 输出 path, roles
- `FAST_PATH_CHECK(change)` → allow/upgrade
- `TDD_CHECK(scope)` → on/off

### 产物与结果

- 产物：路径选择 + 角色分配（可写入审查记录，但不是 SSOT）

## 2. Explorer 审计（可选但常用）

### 目的

- 固定变更范围与影响评估，为设计与实现提供证据

### 关键命令

- `AUDIT(scope)` → audit_report
- `LIST_DESIGN_MD(root)` → design_list(path,depth)

### 产物

- 审计报告（模板：`04_reference/interaction_formats/code_audit_report.md`）

## 3. 需求阶段（Analyst）

### 目标

- 生成 L1/L2/L3 需求文档（PRD/MRD/FRD），并在停止点等待确认

### 关键命令与停止点

- `REQ_ANALYZE(input)` → `[WAITING_FOR_REQUIREMENTS]`
- `REQ_CONFIRM()`（用户确认）

### 主要交付物

- `docs/01_requirements/project_prd.md`（L1）
- `docs/01_requirements/modules/[module]_mrd.md`（L2）
- `docs/01_requirements/modules/[module]/[feature]_frd.md`（L3）

## 4. 架构阶段（Prometheus ↔ Skeptic）

### 目标

- Prometheus 产出技术无关 L2 逻辑工作流；Skeptic 进行多轮审查直至通过或进入用户决策

### 关键命令与停止点

- `ARCH_DESIGN(prd)` → `[WAITING_FOR_ARCHITECTURE]`
- `ARCH_REVIEW(l2)` → `[ARCHITECTURE_PASSED]` / `[USER_DECISION]`

### 审查闭环

- 最多 3 轮；若仍存在关键分歧，进入 `[USER_DECISION]`

### 主要交付物

- `docs/02_logical_workflow/*.md`（L2）
- ADR（如适用）：`docs/04_context_reference/adr_[module]_[topic].md`

## 5. 实现设计（Oracle）

### 目标

- 将 L2 设计落到目录级 L3 `design.md`，明确接口契约、边界与任务拆分

### 关键命令与停止点

- `IMPL_DESIGN(l2, dir)` → `[WAITING_FOR_DESIGN]`
- `DESIGN_CONFIRM()`（用户确认）

### 边界规则

- 目录边界以 `04_reference/design_directory_strategy.md` 为准

## 6. 测试设计与测试实现（Tester / TestWorker）

### 6.1 测试设计（Tester）

- 命令：`TEST_DESIGN(design)` → `[WAITING_FOR_TEST_DESIGN]`
- 原则：测试用例仅基于设计文档；CSV 为唯一维护资产（角色矩阵约束）
- 产物：`docs/03_technical_spec/test_cases/*.csv` 或 `tests/acceptance/l*/..._test_design.md`（按路径选择）

### 6.2 测试代码实现（TestWorker）

- 命令：`TEST_IMPLEMENT(test_design)` → `[WAITING_FOR_TEST_IMPLEMENTATION]`
- 停止点含义：测试代码完成后进入代码审查（由 CodeReviewer 审查测试代码）

## 7. 目录并行调度（Supervisor）

### 目标

- 将多个 `design.md` 目录按深度分批并行执行，保证依赖顺序正确

### 关键命令与状态

- `SCHEDULE_DIRS(design_list)` → `[SCHEDULING]`
- `RUN_DIR_BATCH(depth)` → `[DIR_WORKING]`
- `WAIT_DEP(dir, deps)` → `[DIR_WAITING_DEP]`
- `COMPLETE_DIR(dir)` → `[DIR_COMPLETED]`

### 并行规则摘要

- 同深度无依赖：并行
- 父子目录：串行（父等子完成）
- 跨模块依赖：Supervisor 协调

## 8. 实现与代码审查闭环（Worker → CodeReviewer → 用户）

### 8.1 Worker 实现

- 命令：`IMPLEMENT(dir, design)` → `[WAITING_FOR_CODE_REVIEW]`
- 约束：不跨目录写入；发现跨目录需求使用 `REQUEST_CROSS_DIR(...)`

### 8.2 CodeReviewer 审查

- 命令：`CODE_REVIEW(diff, design_refs)`（pre：`[WAITING_FOR_CODE_REVIEW]` 或 `[WAITING_FOR_TEST_IMPLEMENTATION]`）
- post：`Diff展示` / `[DIR_WORKING]` / `[USER_DECISION]`
- 审查标准（按产物区分）：`04_reference/review_standards/code_diff.standard.md`、`test_code.standard.md`

### 8.3 人工审批（用户）

- 仅当代码审查通过后进入 `Diff展示`，由用户做最终审批

## 9. 分层验收（L1-L4）

### 目标

- 由 Worker 执行测试、逐层通过、逐层审查

### 关键命令与停止点

- `RUN_ACCEPTANCE(Lx)` → `[WAITING_FOR_Lx_REVIEW]`（或 Diff展示）
- `REVIEW_ACCEPTANCE(Lx)` → pass/fail

### 核心原则

- 先低后高：L1→L4
- 任一层失败或审查不通过：必须修复并从该层重新开始

## 10. 文档收尾（Librarian）

### 目标

- 同步索引与链接，声明流程终态

### 命令与终态

- `DOC_SYNC(scope)` → `[已完成]`

## 11. 治理：三错即停与熔断

### 目标

- 避免无限返工；达到阈值后进入用户决策

### 命令与状态

- `STRIKE(record)`：记录失败次数
- `FUSE(reason)` → `[FUSION_TRIGGERED]`
- `ASK_USER_DECISION(topic, options)`：进入 `[USER_DECISION]`

## 12. 审查标准（按产物可配置）

### 目标

- 同一“审查”在不同产物上使用不同门槛与证据要求，并允许项目调整

### 机制

- 标准集合：`04_reference/review_standards/*.standard.md`
- 项目覆写：`04_reference/review_standards/profiles/<project>.md`（模板：`_project_profile.md`）
- 覆写范围：仅允许覆写标准文件声明的 Project knobs
