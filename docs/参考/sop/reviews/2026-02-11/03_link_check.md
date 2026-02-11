# 链接检查结果

## 元信息
- **日期**: 2026-02-11
- **检查范围**: 核心文档与工作流

| 来源文件 | 链接文本 | 目标 | 结果（OK/FAIL） | 修复动作（命令式） |
|----------|----------|------|------------------|--------------------|
| `AGENT_SOP.md` | `document_directory_mapping.md` | `file:///d:/Code/AI/OpenSpec-mumu/docs/...` | **FAIL** | 必须将绝对路径修改为相对路径 `04_reference/document_directory_mapping.md` |
| `AGENT_SOP.md` | `[查看完整黑白名单]` | `05_constraints/constraint_matrix.md` | OK | - |
| `AGENT_SOP.md` | `[快速路径]` | `03_workflow/fast_path.md` | OK | - |
| `deep_path.md` | `[分层验收标准详情]` | `../05_constraints/acceptance_criteria.md` | OK | - |
| `deep_path.md` | `[目录维度工作策略详情]` | `04_reference/design_directory_strategy.md` | **FAIL** | `deep_path.md` 在 `03_workflow/` 下，引用 `04_reference/` 需要向上两级或一级？应为 `../04_reference/design_directory_strategy.md` |

## 备注
- 绝对路径会导致在不同机器或容器中无法跳转。
- 相对路径层级必须准确（`../` vs `./`）。
