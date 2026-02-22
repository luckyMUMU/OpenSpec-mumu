---
version: v2.4.0
updated: 2026-02-22
---

# SOP for Human（Skill-first 人类阅读版）

> **⚠️ 仅供参考**
> 
> 本文档为人类用户提供叙述化的 SOP 说明，便于理解体系设计。
> 
> **执行入口**：AI Agent 执行任务时，请使用 [AGENT_SOP.md](sop/AGENT_SOP.md) 作为唯一入口。

---

## 1. 概述

本 SOP 定义了一套 AI 辅助软件工程的标准化流程。核心思想是：**一切执行以 Skill 为单位**，通过"调用 Skill + 选择/覆盖 Prompt Pack"完成全流程，并以可落盘交付物形成可审计闭环。

### 核心理念

- **文档驱动**：先落盘需求/设计，再改代码
- **命令式交互**：规则与步骤必须可验证
- **分层与并行**：支持目录维度并行执行
- **来源可追溯**：所有产出必须声明来源与依赖，缺口必须决策落盘

---

## 2. Skill 体系（SSOT）

Skill 的定义、触发条件、输入输出、停止点、落盘交付物与默认 Prompt Pack 映射，以 [Skill 矩阵（SSOT）](sop/02_skill_matrix/index.md) 为准。

### Skill 与 Prompt Pack 的关系

- **SKILL.md**：可审查的"做事骨架合约"（触发条件/步骤顺序/输出格式/质量门槛/停止点/落盘）
- **Prompt Pack**：运行时的"表达与偏好层"（风格/侧重点/输出排版），不得改变 Skill 合约语义

Prompt Pack 规范：`sop/04_reference/prompt_pack.standard.md`，默认 pack：`sop/prompts/packs/default/`。

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

## 5. Spec 生命周期

### 5.1 Spec 产物定义

Spec 是任务执行期间的临时规范文件，包含：
- **spec.md**：规范定义
- **tasks.md**：任务列表
- **checklist.md**：检查清单

### 5.2 生命周期阶段

| 阶段 | 目录 | 说明 |
|------|------|------|
| **执行期** | `.trae/specs/<change-id>/` | 任务执行期间的临时规范 |
| **归档期** | `docs/04_context_reference/archived_specs/YYYY-MM-DD_<change-id>/` | 重要任务完成后的归档位置 |
| **清理** | （删除） | 简单任务完成后直接删除 |

### 5.3 归档判断标准

- **需要归档**：涉及架构决策、流程变更、多模块影响的任务
- **直接删除**：简单修复、文档更新、单模块小改动

### 5.4 设计先行原则

- **持久化设计**：`src/**/design.md`、`docs/04_context_reference/adr_*.md`
- **临时规范**：`.trae/specs/` 下的 spec/tasks/checklist
- **原则**：需要长期保留的设计内容应迁移至 design 目录或 ADR

---

## 6. Spec 与 design.md 的映射关系

### 6.1 任务划分原则

| Spec 任务 | design.md 目录 | 说明 |
|-----------|----------------|------|
| 单目录任务 | 单个 design.md | 任务粒度 = DIR_SCOPE |
| 跨目录任务 | 多个 design.md | 拆分为多个子任务 |

### 6.2 执行顺序

| 顺序 | 条件 | 说明 |
|------|------|------|
| 自底向上 | depth_desc | 从最深目录开始执行 |
| 并行执行 | same_depth AND no_dependency | 同深度无依赖可并行 |
| 等待执行 | parent_dir OR has_dependency | 父目录或依赖目录完成后执行 |

### 6.3 任务声明字段

| 字段 | 说明 | 示例 |
|------|------|------|
| design_path | 对应的 design.md 路径 | `src/auth/login/design.md` |
| depth | design.md 的深度 | `3` |
| dependencies | 依赖的其他 design.md | `["src/auth/design.md"]` |
| scope | 任务范围 (DIR_SCOPE) | `src/auth/login/**` |

---

## 7. 核心约束

1. **状态先行**：仅当进入 `[DIR_WORKING]` 后才能改代码（SSOT：`sop/05_constraints/state_dictionary.md`）
2. **目录隔离**：父目录只保留摘要+链接
3. **闭环交付**：目录任务必须流转到 `[DIR_COMPLETED]`
4. **Scope 最小化**：每个 Skill 只能操作其合约范围
5. **复用优先**：先复用→改进→新建→清理
6. **三错即停**：同一步骤连续失败 3 次必须熔断并落盘报告

---

## 8. 文档规范

### 8.1 需求分层

- L1：Project PRD
- L2：Module MRD
- L3：Feature FRD / Prototype

### 8.2 设计文档

- L2：架构设计（`docs/02_logical_workflow/`）
- L3：实现设计（`src/**/design.md`）

---

## 9. 来源与依赖合规

所有分析与设计类文档必须包含"来源与依赖声明"。当来源缺失/冲突/依赖不足时：

- 必须中断并进入 `[USER_DECISION]`
- 必须落盘决策记录到 `docs/04_context_reference/decisions/`

声明模板：`sop/04_reference/interaction_formats/source_dependency.md`。

---

## 10. 验收与质量

- **验收标准**：以 `sop/05_constraints/acceptance_criteria.md` 的 L1-L4 门禁为准
- **代码审查**：由 `sop-code-review` 输出可追溯审查报告（不得改代码）
- **文档同步**：由 `sop-document-sync` 同步索引、导航与版本一致性

---

## 11. 版本同步机制

### 11.1 版本格式

```
v[主版本].[次版本].[修订版本]
```

### 11.2 版本定义

| 版本位 | 更新规则 | 影响范围 |
|--------|----------|----------|
| 主版本 | Skill-first 体系/SSOT 边界发生架构级变化 | 全局统一 |
| 次版本 | 新增/调整 Skill、路径、约束、模板类型 | 全局统一 |
| 修订版本 | 修正文档错误、格式、链接、表述优化 | 允许差异化 |

### 11.3 版本同步流程

当 CHANGELOG 版本更新时，必须执行以下同步流程：

1. **确认版本基线**：读取 `sop/CHANGELOG.md` 确认目标版本
2. **批量更新版本号**：更新所有 Skill 合约和核心文档
3. **更新 updated 日期**：所有更新文件的 updated 字段改为当前日期
4. **验证一致性**：执行版本核对，确认无版本超前或落后文件

### 11.4 版本超前处理

当发现文件版本超前于 CHANGELOG 时：

1. **审查变更内容**：确认超前版本的变更是否为预期变更
2. **决策**：
   - 如为预期变更 → 更新 CHANGELOG 到超前版本
   - 如为非预期变更 → 回退文件版本到 CHANGELOG 版本
3. **记录决策**：在 ADR 中记录版本超前处理决策

---

## 12. Prompt Pack 使用

- 默认 pack：`sop/prompts/packs/default/`
- 仅当用户请求包含 `ultrawork` 或明确要求全自动时 → 允许连续调用多个 Skill
- 仅当需要覆盖单个 Skill 的表达风格时 → 覆盖 `sop/prompts/packs/<pack>/skills/<skill>.md`

---

## 13. 相关文档

- [AGENT_SOP.md](sop/AGENT_SOP.md) - AI Agent 执行入口
- [sop_GUIDE.md](sop_GUIDE.md) - SOP 审查指南
- [CHANGELOG.md](sop/CHANGELOG.md) - 版本变更历史
- [document_directory_mapping.md](sop/04_reference/document_directory_mapping.md) - 目录映射表
