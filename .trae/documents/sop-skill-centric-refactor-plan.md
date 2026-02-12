# 重构目标：从“角色驱动”改为“Skill 驱动 + Prompt Pack 驱动”

## 目标与边界
- **目标**：将 `docs/参考/sop` 的 SSOT 从“角色体系/角色提示词”迁移为“Skill 目录 + Skill 合约 + Prompt Pack”，所有流程通过“调用 Skill + 选择/覆盖 Prompt Pack”完成。
- **边界**：只重构 `docs/参考/sop/**` 及其在仓库内的引用（含 `docs/参考/sop_GUIDE.md` 的相关对齐）；不引入外部依赖与可执行二进制。
- **约束对齐**：Skill 设计与文档结构必须符合 `docs/参考/sop_GUIDE.md` 的要求（命令式、可落盘交付物、停止点、失败处理、SSOT 引用、长知识下沉、重复动作脚本化）。

## 现状问题（为何必须重构）
- 当前“角色链路/交接/权限边界”被同时写在 [AGENT_SOP.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/AGENT_SOP.md#L33-L118)、[ROLE_CHEATSHEET.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/ROLE_CHEATSHEET.md) 与 `prompts/*.md` 多处，存在 **口径分叉风险**。
- `skills/*/SKILL.md` 已具备“Skill 合约”雏形，但仍包含“分配角色/角色职责”等表达，导致“Skill 与 Role 双 SSOT”。

## 总体设计（迁移后的 SSOT）
- **L2 SSOT 改为 Skill Catalog**：新增/替换 `02_role_matrix/` 为 `02_skill_matrix/`（或同级目录）作为唯一权威：
  - Skill 列表（name/触发条件/输入/输出/停止点/落盘交付物/约束）
  - Prompt Pack 映射（默认 pack + 覆盖点）
  - 目录级并行/跨目录协作规则（以“Skill 合约”而非“角色权限”表达）
- **流程描述改为 Skill 调度图**：`03_workflow/*.md` 中的 “A→B→C（角色）” 全部替换为 “skill://x → skill://y（调用链）”，并统一引用一个“Workflow SSOT”。
- **Prompt 体系改为 Prompt Pack（参考 agent harness 形式）**：
  - 引入“Prompt Pack”概念：一个 pack = 一套可组合的提示词模块（System/Operator/Skill Runner/Overrides）。
  - 约定“魔法词/信号”启用 pack（例如 `ultrawork` 风格），以及 pack 内统一的输出格式与落盘规范。

## 目录结构调整（拟定）
- 新增/调整：
  - `docs/参考/sop/02_skill_matrix/index.md`（替代原 `02_role_matrix/index.md` 的 SSOT 位置）
  - `docs/参考/sop/04_reference/prompt_pack.standard.md`（Prompt Pack 规范：组成、覆盖机制、输出格式、落盘要求、禁止项）
  - `docs/参考/sop/prompts/packs/default/`（默认 pack）
    - `00_system.md`（全局不变量：命令式、SSOT、停止点、落盘）
    - `01_operator.md`（编排口径：何时调用哪些 Skill、如何选择路径、如何触发停止点）
    - `skills/<skill-name>.md`（每个 Skill 的“定制化 prompt 模块”，只保留差异点）
- 迁移/清理：
  - `docs/参考/sop/prompts/*.md`：由“角色 prompt”迁移为“pack 模块”，不再出现角色术语。
  - `docs/参考/sop/02_role_matrix/`：迁移为 `02_skill_matrix/` 后保留一份 `DEPRECATED.md` 作为历史说明（或直接删除，取决于你偏好）。

## Skill 层改造（逐类说明）
- 统一改造所有 `skills/*/SKILL.md`：
  - 删除/替换“分配角色/角色职责/角色权限”等字眼，改为 **Skill 合约**（适用条件→步骤→输出/落盘）。
  - 补齐 `sop_GUIDE.md` 要求字段：触发条件、输入、输出、停止点、失败处理、持久化交付物、SSOT 引用（state/command dictionary）。
  - 将长说明/示例下沉到 `skills/<skill>/references/`，SKILL.md 只保留骨架。
  - 将可复用的重复动作抽到 `scripts/`（按需放在 skill 私有 scripts 或仓库根 scripts，并登记）。

## Workflow 文件改造（角色链路 → Skill 调用链）
- 改造 `03_workflow/index.md`、`fast_path.md`、`deep_path.md`、`three_strike_rule.md`：
  - 用 `skill://sop-workflow-orchestrator` 作为入口编排。
  - 将原“角色序列”替换为“Skill 调用序列”，并明确每一步的落盘交付物模板（interaction_formats）。
  - “目录并行/跨目录协作/三错即停”用 **状态机 + 命令字典** 表达，不绑定任何角色名。

## 核心文档改造（AGENT_SOP / human SOP / cheatsheet）
- [AGENT_SOP.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/AGENT_SOP.md)：
  - 改为“Skill-first 执行手册”：去掉角色表，换成“核心 Skill 列表 + 入口 Skill + 工作流图 + 关键约束（目录边界/停止点/落盘）”。
  - 导航 L2 从“角色矩阵”指向“Skill 矩阵”。
- `sop_for_human.md`：
  - 第 2 章“角色体系”替换为“Skill 体系 + Prompt Pack 体系”。
  - 将原“角色协作”解释改为“Skill 调用链 + 输出物协作”。
- `ROLE_CHEATSHEET.md`：
  - 改为 `SKILL_CHEATSHEET.md`（或保留文件名但内容改为 Skill 速查），避免继续强化角色概念。

## 约束与字典同步（去角色化）
- `05_constraints/constraint_matrix.md`、`state_dictionary.md`、`command_dictionary.md` 中涉及角色的条目：
  - 用“Skill 名称/工作范围（目录）/动作类型（读/写）”替代角色名。
  - 保留语义不变：例如“只审查不改代码”变为“sop-code-review 必须只输出报告，不得修改代码”。

## 版本策略（按 sop_GUIDE 的全局一致性规则）
- 此次属于“架构级变更（角色体系重构）”，建议 **主版本升级**：`v1.x.x → v2.0.0`。
- 执行方式：
  - `docs/参考/sop/**` 所有核心文档与所有 `skills/*/SKILL.md` 的 **主/次版本统一** 为 `v2.0.x`。
  - `docs/参考/sop_GUIDE.md` 同步到 `v2.0.0`（作为 SOP 体系规范的一部分，避免主/次版本漂移）。
  - 更新 `docs/参考/sop/CHANGELOG.md`：记录“Role→Skill+Prompt Pack”的破坏性变更。

## 落盘交付物与审查闭环
- 重构过程中新增一次 `sop/reviews/YYYY-MM-DD/`（按 sop_GUIDE 的 artifacts 规范）用于记录：范围基线、差异矩阵、问题清单、版本核对、最终报告。
- 新增一个“迁移映射表”：旧 role → 新 skill / prompt pack 模块（只落在审查目录，不作为 SSOT）。

## 验证方式（不依赖外部系统）
- 运行一次仓库内“链接有效性扫描”（基于已有 link check 产物格式），确保：
  - `AGENT_SOP.md` / `sop_for_human.md` / `03_workflow/index.md` 的导航链接全部指向新结构。
- 运行一次“版本一致性核对”：确保所有核心文档主/次版本一致。
- 抽样检查 3 个 Skill（orchestrator、code-review、deep-path）是否满足 sop_GUIDE 的 Skill 合规清单。

## 执行顺序（我会按这个顺序落地改动）
1. 建立新 SSOT：新增 `02_skill_matrix/index.md` + `04_reference/prompt_pack.standard.md` + `prompts/packs/default/**`。
2. 迁移并改写核心文档：AGENT_SOP / sop_for_human / cheatsheet / 03_workflow。
3. 批量改写所有 `skills/*/SKILL.md`：去角色化 + 补齐合规字段 + 下沉 references/scripts。
4. 同步 constraints 与 dictionaries：去角色化表达，保持约束语义。
5. 全局版本升级到 v2.0.0 + 更新 CHANGELOG + 生成一次审查 artifacts。

如果你确认这个计划，我将开始实际修改文件并提交一轮可审查的重构结果（包含目录迁移、文档替换、Skill/Prompt Pack 规范与全局版本同步）。