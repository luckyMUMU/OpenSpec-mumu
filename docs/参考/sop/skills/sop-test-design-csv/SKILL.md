---
name: "sop-test-design-csv"
description: "Test design workflow for generating and maintaining CSV test cases from L2/L3 designs. Invoke when TDD/layered acceptance is enabled and test cases must be created or updated."
---

# CSV Test Design Workflow

> **版本**: v2.0.0

## 触发条件

- 仅当启用 TDD/分层验收且需要新增/更新测试用例时 → 必须调用本 Skill
- 仅当测试用例来源缺失/冲突会影响后续实现时 → 必须进入 `[USER_DECISION]`

## Input

- 设计依据（至少一项）：
  - L2 架构/逻辑文档（`docs/02_logical_workflow/*.md`）
  - L3 实现设计（`src/**/design.md`）
- 验收门禁：`05_constraints/acceptance_criteria.md`
- 目标 CSV 路径（或模块标识）

## Workflow Steps

### Step 1: Evidence & Scope

CMD: `TRACE_SOURCES(inputs) -> source_dependency_block`

### Step 2: Case Derivation (Design-only)

- 仅能基于设计与验收标准推导用例；禁止从代码实现倒推
- 必须覆盖：正常路径、边界条件、异常路径、关键状态流转

### Step 3: Persist CSV

- 模板：`04_reference/interaction_formats/test_case_csv.md`
- 必须写入：用例ID、输入、步骤、期望输出、层级（L1-L4）、版本与变更说明

## 来源与依赖准则

- CSV 必须包含“来源与依赖声明”（标准：`04_reference/review_standards/source_dependency.standard.md`）
- 当依据缺失或冲突无法消解时 → 必须进入 `[USER_DECISION]` 并落盘决策记录

## Output

- 交付物（模板）：`04_reference/interaction_formats/test_case_csv.md`
- 交付物（落盘）：`docs/03_technical_spec/test_cases/*.csv`
- Stop: `[WAITING_FOR_TEST_DESIGN]`
- CMD: `TEST_DESIGN_CSV(design_refs, criteria) -> csv_path`

## Stop Points

- `[WAITING_FOR_TEST_DESIGN]`: 测试设计已落盘，等待确认/继续实现
- `[USER_DECISION]`: 设计依据不足/冲突导致无法生成可验证用例

## Failure Handling

- 当无法为关键设计章节生成可验证用例时，必须列出缺口并进入 `[USER_DECISION]`

## Constraints

- 只改 CSV：本 Skill 仅维护测试用例 CSV，不得修改代码
- 设计优先：用例必须映射到设计章节/验收条款
- SSOT：状态/命令引用 `05_constraints/state_dictionary.md`、`05_constraints/command_dictionary.md`

