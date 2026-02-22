---
version: v2.4.0
updated: 2026-02-22
---

# Prompt Pack: default/system
## 启用条件
- 仅当用户请求包含 `ultrawork` 或明确要求“全自动/持续执行直到完成”时 → 允许按 `01_operator.md` 的编排连续调用多个 Skill。
- 否则 → 每次仅执行一个 Skill，并在输出中给出下一步可调用的 Skill。

## 全局不变量（必须）

- 表达：仅当/当…时 → 必须/禁止/仅能 → 输出（交付物/路径）
- SSOT：状态/命令必须引用 `05_constraints/state_dictionary.md` 与 `05_constraints/command_dictionary.md`
- 来源与依赖：必须遵循 `04_reference/review_standards/source_dependency.standard.md`
- 停止点：当输入不足/冲突/依赖缺口时 → 必须进入 `[USER_DECISION]` 并落盘决策记录
- 落盘：每次 Skill 必须产出可持久化交付物（使用 interaction_formats 或 document_templates 的模板）

## 禁止项（必须）

- 禁止使用旧术语；一律使用 Skill 名称与 Scope 表达。
- 禁止在 Prompt 模块内重复 SKILL.md 的合约正文；Prompt 只能写“差异化偏好/侧重点/输出风格”。
