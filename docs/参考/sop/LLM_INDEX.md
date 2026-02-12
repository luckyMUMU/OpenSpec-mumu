---
version: v2.0.0
updated: 2026-02-12
---

# SOP 精简目录（LLM 友好 / 单入口）

## 使用方式

- 目标：不加载引用正文也能判断“是否需要继续加载”，并保证从本入口到任意 SOP 文档最短跳数 ≤3。
- 规则：本页只提供最小摘要 + 直达链接，不复制正文。

---

## 快速分诊

- 需要直接执行任务（Agent 执行约束/停止点/权限）：[AGENT_SOP.md](AGENT_SOP.md)
- 需要人类阅读的概要说明（更叙述化）：[sop_for_human.md](sop_for_human.md)
- 需要理解体系概念（L1-L4、渐进披露、SSOT）：[01_concept_overview.md](01_concept_overview.md)
- 需要查看 Skill 清单与边界（唯一真源）：[02_skill_matrix/index.md](02_skill_matrix/index.md)
- 需要选择路径与执行流程（fast/deep/TDD、三错即停）：[03_workflow/index.md](03_workflow/index.md)
- 需要状态机速查（状态/转移/子流程图）：[sop_state_machine.md](../sop_state_machine.md)
- 需要模板/交互格式/审查标准入口（L2/L3/L4 模板与规范）：[04_reference/index.md](04_reference/index.md)
- 需要全局约束/红线/状态与命令字典（SSOT）：[05_constraints/index.md](05_constraints/index.md)

---

## 工程质量（创建与审查代码）

- 基础编码原则（六大原则 + 方法层级一致性 + CRUD 分层复用）：[coding_principles.md](05_constraints/coding_principles.md)
- 代码审查格式（报告模板）：[code_review.md](04_reference/interaction_formats/code_review.md)
- 代码 Diff 审查标准（硬门槛）：[code_diff.standard.md](04_reference/review_standards/code_diff.standard.md)

---

## 合约与偏好

- Skill 合约（SKILL.md）索引：[skills/index.md](skills/index.md)
- 默认 Prompt Pack（表达与偏好层）索引：[default pack index](prompts/packs/default/index.md)

---

## 审查归档（reviews）

- 审查归档入口：[reviews/index.md](reviews/index.md)
- SOP 审查报告（汇总）：[SOP_REVIEW_REPORT.md](SOP_REVIEW_REPORT.md)
- Prompt/Skill 一致性报告（汇总）：[PROMPT_SKILL_CONSISTENCY_REPORT.md](PROMPT_SKILL_CONSISTENCY_REPORT.md)
