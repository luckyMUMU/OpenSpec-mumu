---
version: v2.1.0
updated: 2026-02-13
artifact: Version Check
---

# 版本一致性核对

## 元信息

- 日期: 2026-02-13
- 目标主/次版本: v2.1.x（以 `sop/CHANGELOG.md` 为准）

## 核对结论摘要

| 项 | 结论 | 说明 |
|---|---|---|
| CHANGELOG 基线 | 通过 | CHANGELOG.md 为 v2.1.0 |
| 核心文档主/次一致 | 失败 | 部分核心文档仍为 v2.0.0，必须统一为 v2.1.0 |
| Skill 合约主/次一致 | 失败 | 仅 sop-document-sync 为 v2.1.0，其余 16 个 SKILL 为 v2.0.0 |
| 文档页眉与内部引用 | 通过 | 未发现自相矛盾的版本引用 |

## 逐文件核对表（核心文档与 Skill 合约）

| 文件 | 声明版本 | 是否符合目标主/次版本 | 修复动作（命令式） |
|------|----------|------------------------|---------------------|
| CHANGELOG.md | v2.1.0 | 是 | - |
| AGENT_SOP.md | v2.1.0 | 是 | - |
| sop_for_human.md | v2.1.0 | 是 | - |
| 02_skill_matrix/index.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 01_concept_overview.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 03_workflow/index.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 03_workflow/deep_path.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 03_workflow/fast_path.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 03_workflow/three_strike_rule.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/index.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/prompt_pack.standard.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/design_decision_rules.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/design_directory_strategy.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/document_directory_mapping.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/knowledge_management.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/rag/README.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/document_templates/implementation_design.md | v2.1.0 | 是 | - |
| 04_reference/document_templates/architecture_design.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/document_templates/project_prd.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/document_templates/module_mrd.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/document_templates/feature_frd.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/document_templates/prd.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/document_templates/adr.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/document_templates/prototype_guide.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 04_reference/interaction_formats/*（全部） | v2.0.0 | 否 | 必须将各文件 frontmatter version 更新为 v2.1.0 |
| 04_reference/review_standards/*（全部） | v2.0.0 | 否 | 必须将各文件 frontmatter version 更新为 v2.1.0 |
| 05_constraints/state_dictionary.md | v2.1.0 | 是 | - |
| 05_constraints/command_dictionary.md | v2.1.0 | 是 | - |
| 05_constraints/constraint_matrix.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 05_constraints/acceptance_criteria.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 05_constraints/coding_principles.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 05_constraints/security_supply_chain.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| 05_constraints/index.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| prompts/packs/default/00_system.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| prompts/packs/default/01_operator.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| prompts/packs/default/index.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| prompts/packs/default/skills/*.md（全部） | v2.0.0 | 否 | 必须将各文件 frontmatter version 更新为 v2.1.0 |
| skills/sop-workflow-orchestrator/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-code-explorer/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-requirement-analyst/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-architecture-design/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-architecture-reviewer/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-implementation-designer/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-test-design-csv/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-test-implementation/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-code-implementation/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-code-review/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-progress-supervisor/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-document-sync/SKILL.md | v2.1.0 | 是 | - |
| skills/sop-fast-path/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-deep-path/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-tdd-workflow/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-capability-reuse/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/sop-design-placement/SKILL.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| skills/index.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |
| ROLE_CHEATSHEET.md | v2.0.0 | 否 | 必须将 frontmatter version 更新为 v2.1.0 |

## 说明

- 历史审查产出（reviews/2026-02-12_*、Review/20260212）不要求修改版本，保持归档时版本即可。
- 修订版本允许子文档独立递增；本表仅核对主/次版本与 CHANGELOG 一致。
