---
version: v2.7.0
updated: 2026-02-23
---

# 文档目录映射表

本文件用于解决“逻辑目录（SOP 约定）”与“实际仓库目录（项目落地）”可能不一致的问题。

原则：
- Prompts / Skills 输出的路径以“逻辑目录”为准
- 具体项目如采用不同目录结构，必须在此处提供映射，并要求 `sop-workflow-orchestrator` 产出路径时引用本表
- 任何跨文档的链接优先使用“逻辑目录 + 文件名”，避免在 SOP 文档目录内使用会断链的相对路径

---

## 目录映射

| 逻辑目录（SOP 约定） | 用途 | 默认落地目录（建议） | 本仓库参考位置 |
|---|---|---|---|
| `sop/` | SOP 配置（约束/工作流/Prompts/Skills/模板/审查标准） | `sop/` | `docs/参考/sop/` |
| `docs/01_requirements/` | 需求文档（PRD/MRD/FRD、原型） | `docs/01_requirements/` | `docs/参考/sop/04_reference/document_templates/` |
| `docs/02_logical_workflow/` | L2 架构设计（技术无关） | `docs/02_logical_workflow/` | `docs/参考/sop/04_reference/document_templates/architecture_design.md` |
| `docs/03_technical_spec/` | L3 技术规格、测试用例资产（CSV 等） | `docs/03_technical_spec/` | `docs/参考/sop/04_reference/document_templates/implementation_design.md` |
| `docs/04_context_reference/` | ADR + RAG + Decision Records（决策与参考资料） | `docs/04_context_reference/` | `docs/参考/sop/04_reference/knowledge_management.md` |
| `src/**/design.md` | 目录级实现设计（sop-implementation-designer 输出） | `src/**/design.md` | `docs/参考/sop/AGENT_SOP.md` |
| `tests/acceptance/` | 分层验收测试代码与设计 | `tests/acceptance/` | `docs/参考/sop/05_constraints/acceptance_criteria.md` |
| `temp/` | 临时产物/调度状态/报告（非持久化） | `temp/` | （无） |
| `.trae/specs/<change-id>/` | 任务执行期临时规范（spec/tasks/checklist） | `.trae/specs/<change-id>/` | （无） |
| `docs/04_context_reference/archived_specs/` | 归档的 spec 产物（持久化） | `docs/04_context_reference/archived_specs/` | （无） |

---

## 关键文件约定（逻辑路径）

- ADR：`docs/04_context_reference/adr_[模块]_[决策主题].md`
- Decision Record：`docs/04_context_reference/decisions/YYYY-MM-DD_[topic].md`
  - **命名规范**：日期使用 ISO 格式（YYYY-MM-DD），topic 使用英文小写+下划线
  - **示例**：`docs/04_context_reference/decisions/2026-02-21_database_selection.md`
  - **模板**：`04_reference/document_templates/decision_record.md`
- RAG：
  - 用户输入：`docs/04_context_reference/rag/user_input/`
  - 外部资料：`docs/04_context_reference/rag/external/`
  - 项目沉淀：`docs/04_context_reference/rag/project/`
- TDD CSV：`docs/03_technical_spec/test_cases/[module]_test_cases.csv`
- 任务规范文件：
  - spec.md：`[dir]/.spec/[spec_name]/spec.md`
  - tasks.md：`[dir]/.spec/[spec_name]/tasks.md`
  - checklist.md：`[dir]/.spec/[spec_name]/checklist.md`
  - **生命周期**：任务执行期临时产物，完成后归档或删除
- Spec 交互式提问指南：`04_reference/spec_interactive_guide.md`
  - **用途**：指导 Spec 设计阶段的交互式提问流程

---

## Spec 产物生命周期

详见 [ADR-Spec-001: Spec 产物生命周期定义](04_context_reference/adr_Spec_001_lifecycle.md)

---

## Spec 与 design.md 的映射关系

详见 [ADR-Spec-002: Spec 与 Design.md 关系定义](04_context_reference/adr_Spec_002_design_relation.md)

---

## 相关文档

- [ADR-Spec-001: Spec 产物生命周期定义](04_context_reference/adr_Spec_001_lifecycle.md)
- [ADR-Spec-002: Spec 与 Design.md 关系定义](04_context_reference/adr_Spec_002_design_relation.md)
- [design_directory_strategy.md](04_reference/design_directory_strategy.md)
- [design_decision_rules.md](04_reference/design_decision_rules.md)
- [Spec 交互式提问指南](04_reference/spec_interactive_guide.md)

---

## sop-workflow-orchestrator 输出要求

`sop-workflow-orchestrator` 在输出“文档位置”时：
- 必须引用本表，不得硬编码相对路径（避免在 SOP 文档目录内出现断链链接）
- 若项目中对应目录不存在，需在输出中注明“需要创建目录”，并交由实现/文档类 Skill 在后续步骤创建

