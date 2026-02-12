---
version: v2.0.0
updated: 2026-02-12
---

# Prompt Pack 规范（Standard）

---

## 1. 定义

**Prompt Pack** 是一组可组合的提示词模块，用于驱动一组 Skill 的稳定执行。Prompt Pack 的职责是：

- 固化执行不变量（命令式表达、停止点、落盘交付物、SSOT 引用）
- 为每个 Skill 提供可覆写的“执行风格/偏好/侧重点”
- 允许按项目或用户偏好切换 pack，而不改 Skill 合约（SKILL.md）

---

## 2. 目录结构（SSOT）

默认约定：

```
docs/参考/sop/prompts/packs/<pack-name>/
  00_system.md
  01_operator.md
  skills/
    <skill-name>.md
```

规则：

- `00_system.md`：必须声明全局不变量与禁止项；禁止写长背景，必须命令式。
- `01_operator.md`：必须声明“编排口径”，包括路径选择、调用链组织、停止点触发与落盘要求。
- `skills/<skill-name>.md`：仅允许写该 Skill 的“差异化指令/偏好”；禁止重复 SKILL.md 的合约正文。

---

## 3. 覆盖机制（Override）

覆盖优先级（从高到低）：

1. 用户显式指定的 pack（或单技能覆盖）
2. 项目级默认 pack（若存在）
3. `default` pack

仅当满足任一条件时才允许覆盖：

- 需要更严格/更宽松的质量门禁
- 需要不同的输出风格（但必须保留固定小标题与必含字段）
- 需要更强的安全/合规侧重点

禁止覆盖：

- 停止点语义
- 落盘交付物路径与模板
- 05_constraints/state_dictionary.md / command_dictionary.md 的 SSOT 约束

---

## 4. 输出与落盘（强制）

Prompt Pack 必须确保每次 Skill 调用满足：

- 仅当/当…时 → 必须/禁止/仅能 → 输出（交付物/路径）
- 输出必须绑定模板（interaction_formats 或 document_templates）
- 当输入不足/冲突/依赖缺口时 → 必须进入 `[USER_DECISION]` 并落盘决策记录

来源与依赖标准：`04_reference/review_standards/source_dependency.standard.md`

---

## 5. 与 Skill 合约的关系

- SKILL.md 是“可审查的骨架合约”（SSOT），Prompt Pack 是“可替换的运行时风格”。
- Prompt Pack 只能收敛“怎么说/怎么呈现/怎么偏好”，不能改变“做什么/做到什么程度”。

---

## 6. 手动模式模板（推荐）

Prompt Pack 不依赖任何运行时自动注入机制。仅当需要表达“强闭环/并行探索/续跑交接”等意图时，推荐在用户请求中手动粘贴模板块：

- 模式与路径模板：`04_reference/interaction_formats/manual_mode_templates.md`
- 续跑与恢复请求：`04_reference/interaction_formats/continuation_request.md`
