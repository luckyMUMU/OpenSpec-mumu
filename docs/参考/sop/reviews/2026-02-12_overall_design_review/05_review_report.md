# SOP 整体设计审查报告

## 审查信息
- **审查日期**: 2026-02-12
- **审查范围**: `docs/参考/sop`（SOP 参考库）
- **审查基线**: `docs/参考/sop_GUIDE.md` (v1.5.0)
- **当前版本**: 以 `docs/参考/sop/CHANGELOG.md` 为准（v1.5.1）

## 审查结论
- [x] **有条件通过** - 框架可用，但需持续用校验门禁抑制漂移
- [ ] 通过
- [ ] 不通过

## 亮点（可复用的架构能力）
- **目录维度并行执行**：以 `design.md` 作为目录边界 + Supervisor 调度，具备可扩展并行能力
- **SSOT（状态/命令）**：用 `state_dictionary.md` + `command_dictionary.md` 提供统一术语与 DSL 契约
- **来源与依赖合规**：用 `TRACE_SOURCES` / `RECORD_DECISION` 把可追溯性内建到流程里

## 发现的问题与处置

### 高优先级（已修复）
| 问题 | 位置 | 描述 | 处理 |
|------|------|------|------|
| 版本治理不一致 | `01_concept_overview.md` / `ROLE_CHEATSHEET.md` | 存在“当前版本”残留导致版本自相矛盾 | 统一为“以 CHANGELOG 为准”，并对变更文件补齐 v1.5.1 版本头 |
| SSOT 重复维护点过多 | `03_workflow/index.md` / `04_reference/index.md` | 多处重复列出停止点/状态，漂移风险高 | 收敛为 SSOT 引用（state_dictionary/command_dictionary） |
| 审查回路语义不够硬 | `command_dictionary.md` / `constraint_matrix.md` / `code_review.md` | `CODE_REVIEW` 结论语义与“最多3轮”缺少硬约束表达 | 明确 `Diff展示(通过)/[DIR_WORKING](需改)/[USER_DECISION](僵局或>=3轮)`，并将“第3轮仍阻塞→USER_DECISION”提升为约束 |

### 中优先级（已修复）
| 问题 | 位置 | 描述 | 处理 |
|------|------|------|------|
| 决策记录目录治理缺口 | `document_directory_mapping.md` / `knowledge_management.md` | `decisions/` 未作为一等目录治理入口，易出现落盘后不可检索 | 补齐映射规则与治理说明，并新增 `docs/04_context_reference/decisions/README.md` |

### 中优先级（新增门禁，持续执行）
| 问题 | 位置 | 描述 | 处理 |
|------|------|------|------|
| 缺少自动化校验闭环 | 仓库级 | 仅靠人工审查难以抑制规模化漂移 | 新增 `scripts/sop-lint.mjs`，并在 CI lint job 中执行 |

## 校验结果（本轮）
- `node scripts/sop-lint.mjs`：✅ OK

## 后续建议
- 在真实任务中强制验证端到端闭环：`TRACE_SOURCES` → 触发 `[USER_DECISION]` → `RECORD_DECISION` 落盘 → 后续产物引用回链。
- 若后续需要把“审查未通过/返工/复审”做成可机读状态机，建议在 `state_dictionary.md` 增补标准状态并同步 DSL 与模板（将触发 minor 升级）。
