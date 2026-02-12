# SOP for Human（Skill-first 人类阅读版）

> **版本**: v2.0.0  
> **更新日期**: 2026-02-12  
> **用途**: 帮助人类理解 Skill-first 的工作流、Prompt Pack 与协作规范

---

## 1. 概述

本 SOP 定义了一套 AI 辅助软件工程的标准化流程。核心思想是：**一切执行以 Skill 为单位**，通过“调用 Skill + 选择/覆盖 Prompt Pack”完成全流程，并以可落盘交付物形成可审计闭环。

### 核心理念

- **文档驱动**：先落盘需求/设计，再改代码
- **命令式交互**：规则与步骤必须可验证
- **分层与并行**：支持目录维度并行执行
- **来源可追溯**：所有产出必须声明来源与依赖，缺口必须决策落盘

---

## 2. Skill 体系（SSOT）

Skill 的定义、触发条件、输入输出、停止点、落盘交付物与默认 Prompt Pack 映射，以 [Skill 矩阵（SSOT）](02_skill_matrix/index.md) 为准。

### Skill 与 Prompt Pack 的关系

- **SKILL.md**：可审查的“做事骨架合约”（触发条件/步骤顺序/输出格式/质量门槛/停止点/落盘）
- **Prompt Pack**：运行时的“表达与偏好层”（风格/侧重点/输出排版），不得改变 Skill 合约语义

Prompt Pack 规范：`04_reference/prompt_pack.standard.md`，默认 pack：`prompts/packs/default/`。

---

## 3. 工作流路径（Skill 调用链）

### 3.1 快速路径（Fast Path）

适用：单文件 + <30 行 + 无逻辑变更。

```
sop-code-explorer
→ sop-code-implementation
→ sop-code-review
→ sop-document-sync
```

### 3.2 深度路径（Deep Path）

适用：新功能、重构、跨文件修改、复杂逻辑变更。

```
sop-requirement-analyst
→ sop-architecture-design (可选)
→ sop-architecture-reviewer (可选)
→ sop-implementation-designer
→ sop-code-implementation
→ sop-code-review
→ sop-document-sync
```

### 3.3 分层验收/测试驱动（TDD / Layered Acceptance）

仅当深度路径且要求高覆盖时启用：

```
... deep path ...
→ sop-test-design-csv
→ sop-test-implementation
→ sop-code-implementation (运行验收 + 修正代码)
```

---

## 4. 目录维度并行策略（Skill 版）

仅当任务涉及多个包含 `design.md` 的目录时启用目录并行：

1. **扫描**：`sop-code-explorer` 识别所有包含 `design.md` 的目录
2. **调度**：`sop-progress-supervisor` 根据目录深度构建依赖与 dir_map
3. **执行**：`sop-code-implementation` 按 dir_map 并行推进（同深度并行、自底向上）
4. **依赖处理**：跨目录依赖必须进入 `[DIR_WAITING_DEP]`，由 `sop-progress-supervisor` 负责唤醒与重排

---

## 5. 核心约束

1. **状态先行**：仅当进入 `[DIR_WORKING]` 后才能改代码（SSOT：`05_constraints/state_dictionary.md`）
2. **目录隔离**：父目录只保留摘要+链接
3. **闭环交付**：目录任务必须流转到 `[DIR_COMPLETED]`
4. **Scope 最小化**：每个 Skill 只能操作其合约范围
5. **复用优先**：先复用→改进→新建→清理
6. **三错即停**：同一步骤连续失败 3 次必须熔断并落盘报告

---

## 6. 文档规范

### 6.1 需求分层

- L1：Project PRD
- L2：Module MRD
- L3：Feature FRD / Prototype

### 6.2 设计文档

- L2：架构设计（`docs/02_logical_workflow/`）
- L3：实现设计（`src/**/design.md`）

---

## 7. 来源与依赖合规

所有分析与设计类文档必须包含“来源与依赖声明”。当来源缺失/冲突/依赖不足时：

- 必须中断并进入 `[USER_DECISION]`
- 必须落盘决策记录到 `docs/04_context_reference/decisions/`

声明模板：`04_reference/interaction_formats/source_dependency.md`。

---

## 8. 验收与质量

- **验收标准**：以 `05_constraints/acceptance_criteria.md` 的 L1-L4 门禁为准
- **代码审查**：由 `sop-code-review` 输出可追溯审查报告（不得改代码）
- **文档同步**：由 `sop-document-sync` 同步索引、导航与版本一致性

---

## 9. Prompt Pack 使用

- 默认 pack：`prompts/packs/default/`
- 仅当用户请求包含 `ultrawork` 或明确要求全自动时 → 允许连续调用多个 Skill
- 仅当需要覆盖单个 Skill 的表达风格时 → 覆盖 `prompts/packs/<pack>/skills/<skill>.md`
