# Prompt/Skill 合规审查报告

## 审查信息
- **审查日期**: 2026-02-12
- **审查范围**:
  - `docs/参考/sop/prompts/*.md`
  - `docs/参考/sop/skills/*/SKILL.md`
- **审查基线**: `docs/参考/sop_GUIDE.md` (v1.5.0)

## 审查结果
- **结论**: ✅ 通过 (Pass)

## 检查项与结果

### 1) 来源与依赖合规
- Prompts：✅ 12/12 文件均包含 `TRACE_SOURCES(inputs)` 与 `RECORD_DECISION(topic, decision)` 要求
- Skills：✅ 15/15 文件均包含 `TRACE_SOURCES(inputs)` 与 `RECORD_DECISION(topic, decision)` 要求，并引用 `04_reference/review_standards/source_dependency.standard.md`

### 2) SSOT 对齐（状态/命令）
- Prompts：✅ 12/12 文件在 Output 区显式声明 SSOT 引用：`05_constraints/state_dictionary.md` + `05_constraints/command_dictionary.md`
- Skills：✅ 未发现使用 `state_dictionary.md` 未定义的状态（例如 `[进行中]` / `[待审批]` / `[已归档]` / `[in_progress]`）

## 修复摘要（本轮已落盘）

### Prompts（6 files）
- 补齐 Output 区 SSOT 引用声明：
  - `prompts/worker_prompt.md`
  - `prompts/tester_prompt.md`
  - `prompts/test_worker_prompt.md`
  - `prompts/code_reviewer_prompt.md`
  - `prompts/skeptic_prompt.md`
  - `prompts/oracle_prompt.md`

### 关联文档（状态示例对齐）
- 将 SOP 文档中遗留的非 SSOT 状态示例（如 `[进行中]`）统一对齐为 `state_dictionary.md` 定义的状态（例如 `[DIR_WORKING]` / `[DIR_COMPLETED]` / `[WAITING_FOR_DESIGN]` 等）。

## 后续建议
- 在下一次真实任务执行中验证端到端可执行性：要求产物显式包含“来源与依赖声明”章节（模板：`04_reference/interaction_formats/source_dependency.md`），并在触发 `[USER_DECISION]` 时落盘决策记录后再继续推进。
