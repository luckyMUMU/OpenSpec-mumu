## 审查结论
- 现状：SOP 的“角色体系 + 工作流路径 + SSOT(状态/命令) + 交付物模板”框架完整，可支撑端到端协作。
- 结论：整体为 **有条件通过**（架构可用），但存在 3 类“系统性断点”，会导致执行偏航与文档漂移：**版本治理失效、SSOT重复维护、闭环状态机语义不够硬/不够可机读**。

## 亮点（为什么这套设计能跑起来）
- **目录维度并行**：以 design.md 目录为工作边界，配合 Supervisor 调度，天然可扩展（参见 [sop-workflow-orchestrator/SKILL.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/skills/sop-workflow-orchestrator/SKILL.md)）。
- **SSOT 体系**：把“状态”与“命令”集中在字典，具备 DSL 化潜力（参见 [state_dictionary.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/05_constraints/state_dictionary.md)、[command_dictionary.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/05_constraints/command_dictionary.md)）。
- **来源与依赖合规**：把 trace/decision 作为跨角色共同约束，能显著降低“凭空设计/漂移”（参见 [source_dependency.standard.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/review_standards/source_dependency.standard.md)）。

## 关键问题（需要优先修）

### 1) 版本治理失效（高优先级）
- 症状：同目录内“文档头版本/文档内当前版本/CHANGELOG 当前版本”不一致，导致“版本作为契约”失去意义。
- 例：
  - [01_concept_overview.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/01_concept_overview.md#L127-L144) 内部写 `当前版本 v6.0.0`，但该文件头部版本为 `v1.5.0`。
  - [ROLE_CHEATSHEET.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/ROLE_CHEATSHEET.md#L80-L97) 内部写 `当前版本 v1.4.0`，但头部为 `v1.5.0`。
  - [CHANGELOG.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/CHANGELOG.md#L1-L6) 当前版本为 `v1.5.0`。

### 2) SSOT 声明 vs 实际“重复维护”（高优先级）
- `state_dictionary.md` 声明为唯一来源，但状态/停止点仍被多处重复列举，历史上已导致过不一致（参见 [SOP_REVIEW_REPORT.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/SOP_REVIEW_REPORT.md#L206-L219)）。
- 直接后果：任何一次状态增删，都需要多点同步，漂移概率随文档规模上升而快速上升。

### 3) 闭环状态机“语义不够硬”（中-高优先级）
- 命令字典的 `CODE_REVIEW` post 状态过宽：`Diff展示 / [DIR_WORKING] / [USER_DECISION]`（见 [command_dictionary.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/05_constraints/command_dictionary.md#L73-L78)），但缺少“未通过→返工→复审→轮次计数→熔断/用户决策”的强约束状态/事件。
- 模板中虽有“第[N]轮”，但没有机制约束 N 的上限与触发条件（见 [code_review.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/interaction_formats/code_review.md#L14-L45)）。

### 4) 产物落盘路径契约未完全闭合（中优先级）
- `source_dependency.md` 规定决策记录落盘目录（见 [source_dependency.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/interaction_formats/source_dependency.md#L79-L91)），但目录映射/知识治理对 `decisions/` 的一等治理入口不够明确，容易出现“落盘了但找不到/不被索引”的问题。

### 5) 缺少最小自动化门禁（中优先级）
- 目前主要靠人工审查；建议引入“最低成本 SOP Lint”来保证：版本一致、状态只来自 SSOT、关键章节存在、路径引用有效。
- 仓库已有 Node/脚本基础（见根目录 [scripts/](file:///d:/code/AI/openspec-mumu/scripts) 与 [package.json](file:///d:/code/AI/openspec-mumu/package.json)），适合加一个只读校验脚本。

## 建议的修复方向（不改大框架，只补齐断点）

### A. 版本治理收敛（建议优先）
- 以 `docs/参考/sop/CHANGELOG.md` 为“唯一当前版本来源”。
- 删除/替换各文档内“当前版本”段落（或改为引用 CHANGELOG 的链接而不是写死版本）。
- 依据 `sop_GUIDE.md` 触发规则决定版本号：
  - 仅清理错写/格式：`v1.5.1`（patch）
  - 若新增“校验脚本/新约束状态/新模板字段”：`v1.6.0`（minor）

### B. SSOT 去重策略
- `state_dictionary.md`、`command_dictionary.md` 保持 SSOT；其他文档仅保留：
  - “摘要 + 链接到 SSOT + 必要示例（示例也必须用 SSOT 状态）”。

### C. 闭环状态机硬化（两种强度，推荐先轻后重）
- 轻量（不加新状态）：
  - 在 `constraint_matrix.md` 明确审查最多 3 轮的强约束；
  - 在 `command_dictionary.md` 明确 `CODE_REVIEW` 的三分支语义：pass/changes_requested/deadlock 对应的 post 状态。
- 强化（加新状态，更可机读）：
  - 在 `state_dictionary.md` 增补 `CODE_REVIEW_CHANGES_REQUESTED`、`TEST_REVIEW_CHANGES_REQUESTED` 等，并在 DSL 中使用；同时全局同步引用。

### D. 决策记录目录治理闭环
- 在 `document_directory_mapping.md` 和 `knowledge_management.md` 明确 `docs/04_context_reference/decisions/` 的定位、索引方式与引用规范。

### E. 最小 SOP Lint（只读校验）
- 新增脚本校验：
  - 主/次版本一致性（跨核心文档/skills）；
  - `state_dictionary.md` 外不得出现未定义状态；
  - 必须字段/章节存在（例如来源与依赖声明）；
  - 相对链接存在性（至少对 sop 目录内）。

## 交付物（修复后）
- 新增一份整体审查报告：`docs/参考/sop/reviews/YYYY-MM-DD_overall_design_review/05_review_report.md`
- 若引入 Lint：在 `scripts/` 下新增校验脚本，并在 CI 或本地流程提供调用入口。

## 下一步执行计划（你确认后我会开始改动）
1. 修复版本治理不一致（清理“当前版本”残留，确定 v1.5.1 或 v1.6.0）。
2. 收敛 SSOT：删除/替换重复状态列表为“引用 SSOT”。
3. 硬化闭环：完善 `CODE_REVIEW`/验收复核的轮次与状态语义。
4. 补齐决策目录治理与索引入口。
5. 增加最小 SOP Lint 并跑一次全量校验。
6. 落盘整体审查报告并更新 CHANGELOG。