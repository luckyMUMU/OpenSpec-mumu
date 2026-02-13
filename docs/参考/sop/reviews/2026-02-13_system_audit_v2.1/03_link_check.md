---
version: v2.1.0
updated: 2026-02-13
artifact: Link Check
---

# 链接/引用检查结果

## 1. 索引与模板可达性（步骤 3）

| 检查项 | 结论 | 说明 |
|--------|------|------|
| Skill 必须落盘交付物在 04_reference/index 中的入口 | 通过 | 矩阵所列交付物（router_triage、code_audit_report、document_templates/*、design_review、test_case_csv、test_code.standard、worker_execution_result、code_review、supervisor_report、continuation_request、manual_mode_templates、source_dependency、design_directory_strategy、knowledge_management、fast_path、deep_path、acceptance_criteria）均在 04_reference/index 的模板/交互格式/规范与策略 中有链接或通过 review_standards/index 可达 |
| interaction_formats 下文件在 index 中可引用 | 通过 | 全部 10 个格式均在 04_reference/index 交互格式表中列出 |
| review_standards 下文件可引用 | 通过 | 04_reference/index 审查标准表链接 context_handoff、index、source_dependency、test_code；其余标准通过 [标准索引](review_standards/index.md) 可达 |

---

## 2. 核心文档链接检查（步骤 6）

| 来源文件 | 链接文本 | 目标 | 结果 | 修复动作（命令式） |
|----------|----------|------|------|---------------------|
| 03_workflow/index.md | 状态机 | `../../参考/sop_state_machine.md` | 已修复 | 已更新为 `../../sop_state_machine.md` |
| 04_reference/index.md | document_directory_mapping | document_directory_mapping.md | OK | - |
| 04_reference/index.md | 各 document_templates/* | document_templates/*.md | OK | - |
| 04_reference/index.md | 规范与策略 | design_decision_rules 等 | OK | - |
| 04_reference/index.md | 编码原则 | ../05_constraints/coding_principles.md | OK | - |
| 04_reference/index.md | 交互格式 / 审查标准 | interaction_formats/*, review_standards/* | OK | - |
| 05_constraints/index.md | 各约束文档 | constraint_matrix.md 等 | OK | - |
| 05_constraints/constraint_matrix.md | Skill矩阵 | ../02_skill_matrix/index.md | OK | - |
| 05_constraints/acceptance_criteria.md | 禁止项矩阵等 | constraint_matrix.md 等 | OK | - |
| 03_workflow/index.md | 目录维度工作策略 | ../04_reference/design_directory_strategy.md | OK | - |
| 03_workflow/index.md | 续跑与恢复请求 | ../04_reference/interaction_formats/continuation_request.md | OK | - |
| 03_workflow/index.md | state_dictionary | ../05_constraints/state_dictionary.md#... | OK | - |
| 03_workflow/three_strike_rule.md | 02_skill_matrix | ../02_skill_matrix/index.md | OK | - |
| AGENT_SOP.md | sop_state_machine | ../sop_state_machine.md | OK | - |
| AGENT_SOP.md | 02_skill_matrix / 04_reference / 05_constraints 等 | 各相对路径 | OK | - |

---

## 3. 结果摘要

| 项 | 结论 |
|----|------|
| 索引可达性 | 通过 |
| 核心文档链接 | 1 处已修复：03_workflow/index.md → sop_state_machine.md 路径已改为 `../../sop_state_machine.md` |
| 当前状态 | 链接检查通过 |
