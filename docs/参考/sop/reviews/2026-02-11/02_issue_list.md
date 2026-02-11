# 问题清单 (Issue List)

## 元信息
- **日期**: 2026-02-11
- **审查范围**: 模板、Prompt、工作流
- **优先级**: High/Medium/Low

## 高优先级 (High)

| 问题ID | 位置 | 描述 | 建议修复 |
|--------|------|------|----------|
| H-001 | `sop_for_human.md` | **文件丢失**：SOP核心文档缺失 | 必须立即根据 `AGENT_SOP.md` 重建 |
| H-002 | `04_reference/document_templates/project_prd.md` | **缺少来源与依赖声明**：模板未包含 `Source and Dependency` 章节 | 必须在文档头部或尾部添加 `source_dependency.md` 引用或内联模板 |
| H-003 | `04_reference/document_templates/module_mrd.md` | **缺少来源与依赖声明**：模板未包含 `Source and Dependency` 章节 | 同上 |
| H-004 | `04_reference/document_templates/feature_frd.md` | **缺少来源与依赖声明**：模板未包含 `Source and Dependency` 章节 | 同上 |
| H-005 | `04_reference/document_templates/architecture_design.md` | **缺少来源与依赖声明**：模板未包含 `Source and Dependency` 章节 | 同上 |
| H-006 | `04_reference/document_templates/implementation_design.md` | **缺少来源与依赖声明**：模板未包含 `Source and Dependency` 章节 | 同上 |
| H-007 | `04_reference/document_templates/adr.md` | **缺少来源与依赖声明**：ADR模板未包含决策来源声明 | 需增加 `Context/Source` 字段明确决策依据来源 |

## 中优先级 (Medium)

| 问题ID | 位置 | 描述 | 建议修复 |
|--------|------|------|----------|
| M-001 | `prompts/*.md` | **指令一致性**：虽然 Analyst/Prometheus 已更新，需确保 Worker/TestWorker/CodeReviewer 也包含明确的 `[TRACE_SOURCES]` 指令 | 批量检查所有 Prompt，补全缺失的指令 |
| M-002 | `skills/*/SKILL.md` | **Skill输入声明**：Skill 定义中的 `input` 字段需明确引用 `Source and Dependency` 标准 | 更新 SKILL.md 的 input/output 描述 |

## 低优先级 (Low)

| 问题ID | 位置 | 描述 | 建议修复 |
|--------|------|------|----------|
| L-001 | `03_workflow/index.md` | **索引更新**：可能缺少对新准则的引用 | 在索引页提及“来源与依赖合规” |
