---
version: v1.5.0
updated: 2026-02-11
---

# 文档目录映射表

本文件用于解决“逻辑目录（SOP 约定）”与“实际仓库目录（项目落地）”可能不一致的问题。

原则：
- Prompts / Skills 输出的路径以“逻辑目录”为准
- 具体项目如采用不同目录结构，必须在此处提供映射，并要求 Router 产出路径时引用本表
- 任何跨文档的链接优先使用“逻辑目录 + 文件名”，避免在 SOP 文档目录内使用会断链的相对路径

---

## 目录映射

| 逻辑目录（SOP 约定） | 用途 | 默认落地目录（建议） | 本仓库参考位置 |
|---|---|---|---|
| `sop/` | SOP 配置（约束/工作流/Prompts/Skills/模板/审查标准） | `sop/` | `docs/参考/sop/` |
| `docs/01_requirements/` | 需求文档（PRD/MRD/FRD、原型） | `docs/01_requirements/` | `docs/参考/sop/04_reference/document_templates/` |
| `docs/01_requirements/frontend/` | 前端需求文档（PRD/MRD/FRD、原型） | `docs/01_requirements/frontend/` | `docs/参考/sop/04_reference/document_templates/` |
| `docs/01_requirements/backend/` | 后端需求文档（PRD/MRD/FRD） | `docs/01_requirements/backend/` | `docs/参考/sop/04_reference/document_templates/` |
| `docs/02_logical_workflow/` | L2 架构设计（技术无关） | `docs/02_logical_workflow/` | `docs/参考/sop/04_reference/document_templates/architecture_design.md` |
| `docs/02_logical_workflow/frontend/` | L2 前端逻辑工作流（技术无关） | `docs/02_logical_workflow/frontend/` | `docs/参考/sop/04_reference/document_templates/architecture_design.md` |
| `docs/02_logical_workflow/backend/` | L2 后端逻辑工作流（技术无关） | `docs/02_logical_workflow/backend/` | `docs/参考/sop/04_reference/document_templates/architecture_design.md` |
| `docs/03_technical_spec/` | L3 技术规格、测试用例资产（CSV 等） | `docs/03_technical_spec/` | `docs/参考/sop/04_reference/document_templates/implementation_design.md` |
| `docs/03_technical_spec/frontend/` | L3 前端技术规格与测试资产 | `docs/03_technical_spec/frontend/` | `docs/参考/sop/04_reference/document_templates/implementation_design.md` |
| `docs/03_technical_spec/backend/` | L3 后端技术规格与测试资产 | `docs/03_technical_spec/backend/` | `docs/参考/sop/04_reference/document_templates/implementation_design.md` |
| `docs/04_context_reference/` | ADR + RAG（决策与参考资料） | `docs/04_context_reference/` | `docs/参考/sop/04_reference/knowledge_management.md` |
| `src/**/design.md` | 目录级实现设计（Oracle 输出） | `src/**/design.md` | `docs/参考/sop/AGENT_SOP.md` |
| `src/frontend/**/design.md` | 前端目录级实现设计（Oracle 输出） | `src/frontend/**/design.md` | `docs/参考/sop/AGENT_SOP.md` |
| `src/backend/**/design.md` | 后端目录级实现设计（Oracle 输出） | `src/backend/**/design.md` | `docs/参考/sop/AGENT_SOP.md` |
| `tests/acceptance/` | 分层验收测试代码与设计 | `tests/acceptance/` | `docs/参考/sop/05_constraints/acceptance_criteria.md` |
| `temp/` | 临时产物/调度状态/报告（非持久化） | `.temp/` | （无） |

---

## 关键文件约定（逻辑路径）

- ADR：`docs/04_context_reference/adr_[模块]_[决策主题].md`
- RAG：
  - 用户输入：`docs/04_context_reference/rag/user_input/`
  - 外部资料：`docs/04_context_reference/rag/external/`
  - 项目沉淀：`docs/04_context_reference/rag/project/`
- TDD CSV：`docs/03_technical_spec/test_cases/[module]_test_cases.csv`
- FE/BE 拆分时：
  - 前端用例：`docs/03_technical_spec/frontend/test_cases/[module]_test_cases.csv`（或 `docs/03_technical_spec/test_cases/frontend_[module]_test_cases.csv`）
  - 后端用例：`docs/03_technical_spec/backend/test_cases/[module]_test_cases.csv`（或 `docs/03_technical_spec/test_cases/backend_[module]_test_cases.csv`）

---

## Router 输出要求

Router 在输出“文档位置”时：
- 必须引用本表，不得硬编码相对路径（避免在 SOP 文档目录内出现断链链接）
- 若项目中对应目录不存在，需在输出中注明“需要创建目录”，并交由 Worker/Librarian 在后续步骤创建

