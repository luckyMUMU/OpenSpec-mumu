## 目标（不移动本仓库文件）
- **不调整本项目中的文件位置**（`docs/参考/sop` 仍作为本仓库参考实现）。
- 将 SOP 文档中“配置/约定/映射”的 **默认落地位置**改为：
  - SOP 配置根：`sop/`（仓库根目录）
  - 临时/非持久化产物：`temp/`（仓库根目录）

## 需要修改的内容类型
1. **目录映射（SSOT 级别）**：把 SOP 的“逻辑目录/默认落地目录”更新为 `sop/`；把原 `.temp/` 改为 `temp/`。
2. **临时产物落盘约定**：所有技能/提示词里涉及 `.temp/*` 的落盘路径全部改为 `temp/*`。
3. **文档中的硬编码提示路径**：将“位置：docs/参考/sop/…”这类“参考仓库路径提示”调整为“默认落地 sop/…”，并在需要时保留“本仓库参考位置仍在 docs/参考/sop/…”的说明。

## 具体实施步骤
### 1) 更新目录映射表（核心）
- 编辑 [document_directory_mapping.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/document_directory_mapping.md)：
  - 新增/更新一行：SOP 配置根目录（逻辑：`sop/`；默认落地：`sop/`；本仓库参考位置：`docs/参考/sop/`）。
  - 将 `.temp/` 行改为 `temp/`（逻辑目录与默认落地目录都改为 `temp/`）。
  - 将文内“避免在 `docs/参考/sop` 内使用会断链的相对路径”改为不绑定本仓库路径的表述（例如“避免在 SOP 文档目录内…”）。

### 2) 全量替换临时产物路径
- 在 `docs/参考/sop/**` 内把以下路径语义更新：
  - `.temp/code_audit_report.md` → `temp/code_audit_report.md`
  - `.temp/scheduler_state.md` → `temp/scheduler_state.md`
  - `.temp/capability_reuse_decision.md` → `temp/capability_reuse_decision.md`
  - `.temp/architecture_review.md` → `temp/architecture_review.md`
- 涉及文件（已定位到命中点）：
  - `skills/sop-progress-supervisor/SKILL.md`
  - `skills/sop-code-explorer/SKILL.md`
  - `skills/sop-capability-reuse/SKILL.md`
  - `skills/sop-architecture-reviewer/SKILL.md`
  - `prompts/supervisor_prompt.md`

### 3) 更新审查/指南/标准中引用的“默认 SOP 根”
- 将 `docs/参考/sop_GUIDE.md` 中的“审查目录模板”等从 `docs/参考/sop/reviews/...` 改为 `sop/reviews/...`（强调这是默认落地位置）。
- 将 `04_reference/review_standards/*` 中出现的 `docs/参考/sop/...` 改为 `sop/...`（作为默认落地路径）。

### 4) 回归校验
- 全仓扫描并确认：
  - `temp/` 替换后不再出现 `.temp/`（除非作为历史说明出现且明确标注）。
  - “默认落地路径”不再指向 `docs/参考/sop`，而是指向 `sop/`。
  - 现存“本仓库参考位置”若保留，必须明确它只是参考实现路径。

## 交付物
- 更新后的 `document_directory_mapping.md`
- 更新后的 skills/prompts 临时产物路径约定
- 更新后的 sop_GUIDE 与 review_standards 中的默认落地路径说明
- 一份回归扫描结果摘要（列出仍残留的旧路径命中，若有）