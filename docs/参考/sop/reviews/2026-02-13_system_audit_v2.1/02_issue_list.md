---
version: v2.1.0
updated: 2026-02-13
artifact: Issue List
---

# 问题分级与修复动作

## 分级说明

- 🔴 高：必须修复（主/次版本、SSOT 漂移、不可达链接）
- 🟠 中：应修复（索引缺失、表达规范影响可执行性）
- 🟡 低：建议修复（含混词、表述优化）
- 🟢 已解决/无需修复

---

## 🔴 高优先级

### 1. 主/次版本未统一为 v2.1.0

| 项 | 说明 | 修复动作（命令式） |
|----|------|---------------------|
| 核心文档 | 02_skill_matrix/index、04_reference/index、05_constraints/constraint_matrix、01_concept_overview、03_workflow/*、04_reference 下多数文档及 05_constraints 部分仍为 v2.0.0 | 必须将上述文档 frontmatter 中 `version` 更新为 `v2.1.0`（以 CHANGELOG 为准） |
| Skill 合约 | 除 sop-document-sync 外，其余 16 个 skills/*/SKILL.md 均为 v2.0.0 | 必须将各 SKILL.md frontmatter 中 `version` 更新为 `v2.1.0` |
| Prompt Pack | prompts/packs/default/ 下 00_system、01_operator、index 及 skills/*.md 均为 v2.0.0 | 必须将各文件 frontmatter 中 `version` 更新为 `v2.1.0` |

详见 [04_version_check.md](04_version_check.md)。

---

## 🟠 中优先级

### 2. 核心文档链接错误（已修复）

| 项 | 说明 | 修复动作（命令式） |
|----|------|---------------------|
| 03_workflow/index.md | 状态机链接 `../../参考/sop_state_machine.md` 指向错误路径 | 必须将链接更新为 `../../sop_state_machine.md`（**本次审查已执行修复**） |

详见 [03_link_check.md](03_link_check.md)。

---

## 🟡 低优先级（表达规范）

### 3. 含混词与可执行性

| 来源 | 现象 | 修复动作（命令式） |
|------|------|---------------------|
| skills/sop-tdd-workflow/SKILL.md | “建议落地到”“建议: 补充”“建议启用 TDD”等表述 | 将“建议”改为命令式或明确条件（如“仅当项目启用 TDD 时 → 必须…”）；或保留为“可选推荐”并注明非强制 |
| skills/sop-capability-reuse/SKILL.md | “如可能，优先改进” | 改为“当满足改进条件时 → 必须优先改进；否则 → …” |
| skills/sop-code-review/SKILL.md | “只输出审查结论与建议” | “建议”为名词（审查建议），可接受；若需严格合规可改为“只输出审查结论与可操作修改项” |

指南 §5.5：禁止使用含混词（建议/尽量/可能/一般/视情况/差不多）；每条规则须包含触发条件、动作、输出。

---

## 🟢 无需修复或已满足

| 项 | 说明 |
|----|------|
| SSOT 漂移 | 状态/命令/禁止项均以字典与矩阵为准，未发现未定义引用 |
| 索引可达性 | 各 Skill 必须落盘交付物、interaction_formats、review_standards 均在 04_reference/index 或 review_standards/index 可达 |
| Prompt Pack 重复合约 | 未发现 Prompt Pack 重复 SKILL.md 合约正文 |
| 等待类状态与续跑 | state_dictionary 与 03_workflow 已规定可恢复检查点及 continuation_request 模板；Skill 合约引用停止点即可 |

---

## 修复优先级建议（与 05_review_report 一致）

1. **高**：统一主/次版本为 v2.1.0（批量更新 frontmatter）。
2. **中**：链接已修复；后续新增模板/标准须在 04_reference/index 或 review_standards/index 增加入口。
3. **低**：按需优化含混词与表述，使规则满足“触发条件 → 动作 → 输出”。
