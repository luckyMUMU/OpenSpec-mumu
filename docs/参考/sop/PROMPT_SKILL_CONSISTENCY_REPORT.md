---
version: v2.0.0
updated: 2026-02-12
scope: docs/参考/sop
---

# Prompt Pack 与 Skill 一致性审查报告

## 范围

- Prompt Pack：`prompts/packs/**`
- Skill 合约：`skills/**/SKILL.md`
- SSOT：`02_skill_matrix/index.md`

## 结论

- Prompt Pack 仅表达输出偏好（风格/侧重点/排版），不重写 Skill 合约语义
- 状态/命令引用统一指向约束字典：`05_constraints/state_dictionary.md`、`05_constraints/command_dictionary.md`
- 测试资产隔离规则在 Prompt 与 Skill 中一致（CSV 与测试代码分离维护）

## 抽样核对清单

- [ ] `prompts/packs/default/00_system.md` 未出现旧术语（如“分配职责”等），统一使用 Skill 名称
- [ ] `02_skill_matrix/index.md` 中每个 Skill 均存在对应 `prompts/packs/default/skills/<skill>.md`
- [ ] `skills/**/SKILL.md` 的交付物引用与 `04_reference/interaction_formats/` / `04_reference/document_templates/` 一致

