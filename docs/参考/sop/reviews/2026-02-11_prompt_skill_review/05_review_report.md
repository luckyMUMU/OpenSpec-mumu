# Prompt/Skill 合规审查报告

## 审查信息
- **审查日期**: 2026-02-11
- **审查范围**:
  - `docs/参考/sop/prompts/*.md`
  - `docs/参考/sop/skills/*/SKILL.md`
- **审查基线**: `docs/参考/sop_GUIDE.md` (v1.5.0)

## 审查结果
- **结论**: ✅ 通过 (Pass)

## 检查项与结果

### 1) 来源与依赖合规
- Prompts：✅ 12/12 文件均包含 `TRACE_SOURCES(inputs)` 与 `RECORD_DECISION(topic, decision)` 要求
- Skills：✅ 15/15 文件均包含 `TRACE_SOURCES(inputs)` 与 `RECORD_DECISION(topic, decision)` 要求，并统一引用 `04_reference/review_standards/source_dependency.standard.md`

### 2) SSOT 对齐（状态/命令）
- Skills：✅ 未再出现状态字典未定义的状态（已清理 `[进行中]` / `[待审批]` / `[已归档]` / `[in_progress]`）
- Prompts：✅ 增补了“SSOT 引用声明”（`05_constraints/state_dictionary.md` + `05_constraints/command_dictionary.md`）

### 3) 简洁性与一致性
- ✅ 清理了 `sop-implementation-designer` 中重复输入项

## 修复摘要（本轮已落盘）

### Prompts（12 files）
- 补齐/统一“来源与依赖准则”：`TRACE_SOURCES(inputs)` + `[USER_DECISION]` + `RECORD_DECISION(topic, decision)`
- 在 Output 增补 SSOT 引用声明（适用处）

### Skills（15 files）
- 增加最小合规模块：来源与依赖准则（含 `TRACE_SOURCES` / `RECORD_DECISION`）+ 引用 `source_dependency.standard.md`
- 修复未定义状态：
  - `sop-document-sync`: 移除 `[进行中]` / `[待审批]` / `[已归档]`，保留 `[已完成]` / `[USER_DECISION]`
  - `sop-code-implementation`: 移除 `[in_progress]`

## 后续建议
- 在下一次真实任务执行中要求产物显式包含“来源与依赖声明”章节（模板：`04_reference/interaction_formats/source_dependency.md`），用于验证规则在端到端流程中的可执行性。
