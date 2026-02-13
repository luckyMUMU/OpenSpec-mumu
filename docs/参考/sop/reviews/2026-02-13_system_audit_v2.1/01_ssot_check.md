---
version: v2.1.0
updated: 2026-02-13
artifact: SSOT Check
---

# SSOT 核对结果

## 核对项（指南 §5.1）

- Skill 清单与边界：`02_skill_matrix/index.md`
- 状态/命令：`05_constraints/state_dictionary.md`、`05_constraints/command_dictionary.md`
- 约束矩阵：`05_constraints/constraint_matrix.md`
- 参考索引与交付物入口：`04_reference/index.md`
- Prompt Pack 规范与合规：`04_reference/prompt_pack.standard.md` + `prompts/packs/default/**`

---

## 1. 状态/命令 SSOT 一致性

| 项 | 结论 | 说明 |
|----|------|------|
| 状态标记引用 | 通过 | 全库检索 `[STATE]` 形式，所有引用均在 state_dictionary 中有定义或为已声明别名（如 `[WAITING_FOR_TEST_REVIEW]`→`[WAITING_FOR_TEST_DESIGN]`、`[USER_DECISION_REQUIRED]`→`[USER_DECISION]`） |
| 命令引用 | 通过 | 文档与 SKILL 中使用的 CMD（如 ROUTE、REQ_ANALYZE、ARCH_REVIEW、TASK_* 等）均在 command_dictionary 中定义 |
| 禁止项与后果 | 通过 | constraint_matrix 为唯一来源，未发现其它文档改写禁止项或后果等级 |

**修复动作**：无。保持“新增/变更状态或命令必须先更新字典再更新引用方”。

---

## 2. Skill 矩阵与边界

| 项 | 结论 | 说明 |
|----|------|------|
| Skill 清单唯一来源 | 通过 | 02_skill_matrix/index.md 为 Skill 总览与必须落盘交付物唯一来源 |
| 交付物与矩阵一致 | 通过 | 各 Skill 的 必须落盘交付物 与矩阵表一致，且路径均在 04_reference 下可达 |
| 目录边界与测试隔离 | 通过 | Scope 规则、DIR_WAITING_DEP、CSV/测试代码隔离与矩阵及 constraint_matrix 一致 |

**修复动作**：无。

---

## 3. 约束矩阵一致性

| 项 | 结论 | 说明 |
|----|------|------|
| 禁止项唯一来源 | 通过 | 禁止项与后果以 constraint_matrix 为准，其它文档未重复定义或冲突 |
| 阶段/Skill 特定禁止项 | 通过 | 与 constraint_matrix §2、§3 一致 |

**修复动作**：无。

---

## 4. Prompt Pack 合规性（指南 §5.2）

| 项 | 结论 | 说明 |
|----|------|------|
| 仅表达偏好/侧重点 | 通过 | 抽查 prompts/packs/default/00_system.md、01_operator.md 及部分 skills/*.md：为全局不变量、编排口径与差异化指令，未发现整段复制 SKILL.md 合约正文 |
| 未引入平台实现细节 | 通过 | 未发现自动注入、hook、会话系统等平台实现描述 |
| 覆盖机制 | 通过 | 与 prompt_pack.standard.md 一致（用户/项目/default 优先级；仅允许偏好/风格覆盖） |

**修复动作**：无。后续若有新增 pack 或 skills/*.md，必须遵守“禁止重复 SKILL.md 合约正文、禁止平台实现细节”。

---

## 5. 结果摘要

| 维度 | 结论 |
|------|------|
| SSOT 文件存在性 | 通过 |
| 状态/命令引用来自字典 | 通过 |
| 禁止项以约束矩阵为准 | 通过 |
| Skill 清单与边界以矩阵为准 | 通过 |
| Prompt Pack 合规性 | 通过 |
| 参考索引可达性 | 见 03_link_check.md |
