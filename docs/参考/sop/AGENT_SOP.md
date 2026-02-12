---
version: v2.1.0
updated: 2026-02-12
---

# SOP（Skill-first / Agent 执行版）

> **唯一入口**：本文档是 SOP 的唯一入口，包含快速分诊、核心约束、工作流和导航。
> 
> **人类阅读版**：如需更叙述化的说明，请参考 [sop_for_human.md](sop_for_human.md)（仅供参考）。

---

## 使用方式

- **目标**：不加载引用正文也能判断"是否需要继续加载"，并保证从本入口到任意 SOP 文档最短跳数 ≤3。
- **规则**：本页只提供最小摘要 + 直达链接，不复制正文。

---

## 快速分诊

| 需求 | 目标文档 |
|------|----------|
| 直接执行任务（约束/停止点/权限） | 继续阅读本文档 |
| 理解体系概念（L1-L4、渐进披露、SSOT） | [01_concept_overview.md](01_concept_overview.md) |
| 查看 Skill 清单与边界（唯一真源） | [02_skill_matrix/index.md](02_skill_matrix/index.md) |
| 选择路径与执行流程（fast/deep/TDD） | [03_workflow/index.md](03_workflow/index.md) |
| 状态机速查（状态/转移/子流程图） | [sop_state_machine.md](../sop_state_machine.md) |
| 模板/交互格式/审查标准入口 | [04_reference/index.md](04_reference/index.md) |
| 全局约束/红线/状态与命令字典 | [05_constraints/index.md](05_constraints/index.md) |

### 工程质量速查

| 需求 | 目标文档 |
|------|----------|
| 基础编码原则（六大原则 + 方法层级一致性） | [coding_principles.md](05_constraints/coding_principles.md) |
| 代码审查格式（报告模板） | [code_review.md](04_reference/interaction_formats/code_review.md) |
| 代码 Diff 审查标准（硬门槛） | [code_diff.standard.md](04_reference/review_standards/code_diff.standard.md) |

### 合约与偏好

| 需求 | 目标文档 |
|------|----------|
| Skill 合约（SKILL.md）索引 | [skills/index.md](skills/index.md) |
| 默认 Prompt Pack（表达与偏好层）索引 | [prompts/packs/default/index.md](prompts/packs/default/index.md) |

### 审查归档

| 需求 | 目标文档 |
|------|----------|
| 审查归档入口 | [reviews/index.md](reviews/index.md) |
| SOP 审查报告（汇总） | [SOP_REVIEW_REPORT.md](SOP_REVIEW_REPORT.md) |
| Prompt/Skill 一致性报告（汇总） | [PROMPT_SKILL_CONSISTENCY_REPORT.md](PROMPT_SKILL_CONSISTENCY_REPORT.md) |

---

## 核心约束

1. 先标记`[DIR_WORKING]`，再改代码
2. 父目录只保留摘要+链接
3. `[DIR_WORKING]`→`[DIR_COMPLETED]`
4. 各 Skill 只操作合约范围（Scope）
5. 先复用→改进→新建→清理
6. **实现类 Skill 按目录工作**: 以 design.md 所在目录为工作范围
7. **自底向上并行**: 按目录深度从深到浅并行执行

**禁止项矩阵**: [查看完整黑白名单](05_constraints/constraint_matrix.md)

---

## 路径选择

| 路径 | 条件 |
|------|------|
| 快速 | 单文件+<30行+无逻辑变更 |
| 深度 | 其他所有情况 |
| TDD | 深度+启用TDD(可选) |

---

## Skill 指令（SSOT）

以 [Skill 矩阵（SSOT）](02_skill_matrix/index.md) 为准（Skill 清单、触发条件、输入/输出、停止点、落盘交付物、默认 Prompt Pack 映射）。

---

## 目录维度工作范围

### 实现类 Skill 工作范围定义

实现类 Skill（如 `sop-code-implementation`）以 `design.md` 所在目录为工作边界：

CMD: `DIR_SCOPE(dir_with_design_md) = dir/** - {subdir/** | subdir contains design.md}`

参见：04_reference/design_directory_strategy.md + 05_constraints/command_dictionary.md

### 目录层级处理顺序

CMD: `LIST_DESIGN_MD(root) -> design_list`
CMD: `SCHEDULE_DIRS(design_list) -> dir_map`
CMD: `RUN_DIR_BATCH(depth_desc)`（同 depth 并行；父目录等待子目录 `DIR_COMPLETED`）

👉 [目录维度工作策略详情](04_reference/design_directory_strategy.md)

---

## 工作流

### 目录维度深度路径

**核心流程** (带并行执行)
```
sop-requirement-analyst
→ sop-architecture-design
→ sop-architecture-reviewer
→ sop-implementation-designer (按目录)
→ sop-progress-supervisor (dir_map)
→ sop-code-implementation (按目录并行)
→ sop-code-review
→ sop-document-sync
```

**目录并行执行流程**
```
1. `sop-code-explorer` 扫描目录结构，识别所有 design.md
2. `sop-progress-supervisor` 按目录深度排序，创建 dir_map
3. `sop-progress-supervisor` 按深度降序分批调度 `sop-code-implementation`（同深度并行）
4. `sop-code-implementation` 在 Scope 内执行；遇到跨目录依赖则进入 `[DIR_WAITING_DEP]`
5. `sop-progress-supervisor` 监控状态并唤醒等待依赖的目录批次
6. `sop-code-review` 审查 Diff（只输出报告）；失败则回到 `sop-code-implementation` 返工
7. 全部目录完成且审查放行后，`sop-document-sync` 更新文档与索引并归档已完成任务
```

### 标准深度路径（单目录）
```
新项目:
sop-requirement-analyst → sop-architecture-design → sop-architecture-reviewer
→ sop-implementation-designer → sop-code-implementation → sop-code-review → sop-document-sync

功能迭代:
sop-requirement-analyst → sop-implementation-designer → sop-code-implementation
→ sop-code-review → sop-document-sync
```

### 分层验收深度路径 (推荐)
```
sop-requirement-analyst
→ sop-architecture-design
→ sop-architecture-reviewer
→ sop-implementation-designer
→ sop-test-design-csv
→ sop-test-implementation
→ sop-progress-supervisor (dir_map)
→ sop-code-implementation (运行验收 + 修正代码)
→ sop-code-review
→ sop-document-sync
```

**验收流程** (由实现类 Skill 驱动)
CMD: `RUN_ACCEPTANCE(L1) -> [WAITING_FOR_L1_REVIEW] -> REVIEW_ACCEPTANCE(L1)`
CMD: `RUN_ACCEPTANCE(L2) -> [WAITING_FOR_L2_REVIEW] -> REVIEW_ACCEPTANCE(L2)`
CMD: `RUN_ACCEPTANCE(L3) -> [WAITING_FOR_L3_REVIEW] -> REVIEW_ACCEPTANCE(L3)`
CMD: `RUN_ACCEPTANCE(L4) -> [WAITING_FOR_L4_REVIEW] -> REVIEW_ACCEPTANCE(L4)`

参见：05_constraints/acceptance_criteria.md + 05_constraints/command_dictionary.md

**快速路径**
```
sop-code-explorer → sop-code-implementation → sop-code-review → sop-document-sync
```

适用条件与升级红线参见：[快速路径](03_workflow/fast_path.md)

---

## 三错即停

| Strike | 条件 | 行动 |
|--------|------|------|
| 1 | 同一 Skill 同一步骤失败 | 自动修正（同 Skill 内） |
| 2 | 再失败 | 调用 `sop-code-explorer` + 设计类 Skill 复核并微调设计/实现策略 |
| 3 | 再失败 | **熔断**：由 `sop-progress-supervisor` 生成报告并停止自动推进 |

---

## 文档位置

参见 [document_directory_mapping.md](04_reference/document_directory_mapping.md)（逻辑目录 → 项目实际目录映射）。

### 需求文档
| 类型 | 位置 | 层级 | 产出 Skill |
|------|------|------|--------|
| 项目PRD | `docs/01_requirements/project_prd.md` | L1 | sop-requirement-analyst |
| 模块MRD | `docs/01_requirements/modules/[module]_mrd.md` | L2 | sop-requirement-analyst |
| 功能FRD | `docs/01_requirements/modules/[module]/[feature]_frd.md` | L3 | sop-requirement-analyst |
| 原型 | `docs/01_requirements/prototypes/[module]/` | L3 | sop-requirement-analyst |

### 设计文档
| 类型 | 位置 | 层级 | 产出 Skill |
|------|------|------|--------|
| 架构设计 | `docs/02_logical_workflow/*.md` | L2 | sop-architecture-design |
| 实现设计 | `src/**/design.md` | L3 | sop-implementation-designer |
| 测试用例 | `docs/03_technical_spec/test_cases/*.csv` | L3 | sop-test-design-csv |
| 测试代码 | `tests/*.test.[ext]` | L3 | sop-test-implementation |

**约束**: `/docs/参考/` **非指定不变更**

---

## 需求分层（sop-requirement-analyst）

| 层级 | 文档 | 内容 | 触发条件 |
|------|------|------|----------|
| L1 | Project PRD | 项目愿景、模块清单 | 新项目 |
| L2 | Module MRD | 模块功能、边界 | 新模块 |
| L3 | Feature FRD | 功能详情、交互 | 新功能 |
| L3 | Prototype | 界面原型 | UI项目 |

👉 [需求分层详情](04_reference/index.md#l1-l3-需求分层-analyst)

---

## design.md规则

| 复杂度 | 行数 | 要求 |
|--------|------|------|
| 低 | <100 | 创建极简design.md（仅接口契约），快速路径可省略 |
| 中 | 100-500 | 简要design.md+接口契约+任务清单 |
| 高 | >500 | 完整design.md+详细契约+全部章节 |

### 任务管理

design.md 中的任务清单支持以下状态：

| 状态 | 标记 | 含义 |
|------|------|------|
| 待处理 | `[ ]` | 任务尚未开始 |
| 进行中 | `[-]` | 任务正在执行 |
| 已完成 | `[x]` | 任务已完成并通过验证 |
| 已阻塞 | `[!]` | 任务被阻塞，需外部依赖 |
| 已归档 | `[archived]` | 任务已归档，不在活跃清单显示 |

**归档规则**：当目录状态变为 `[DIR_COMPLETED]` 时，`sop-document-sync` 自动将已完成任务移入归档章节。

👉 [design.md模板详情](04_reference/document_templates/implementation_design.md)

---

## TDD规则 (可选)

**启用条件**: 核心业务/复杂逻辑/高覆盖要求

**测试用例来源**: 仅基于设计文档 (L2+L3)，不参考代码

**测试代码来源**: 主要基于CSV，仅参考代码接口

👉 [TDD工作流详情](skills/sop-tdd-workflow/SKILL.md)

---

## 版本号管理

### 格式
```
v[主版本].[次版本].[修订版本]
```

### 规则
| 版本位 | 变更类型 | 示例 |
|--------|----------|------|
| 主版本 | 架构重大变更、Skill/Prompt Pack 体系重构 | v1→v2 |
| 次版本 | 新增 Skill、新增工作流、新增文档类型 | v2.0→v2.1 |
| 修订版本 | 文档修正、错误修复、格式统一 | v2.0.0→v2.0.1 |

### 当前版本
以 [CHANGELOG.md](CHANGELOG.md) 为准。

👉 [查看版本历史](CHANGELOG.md)

---

## 导航

| 层级 | 文档 |
|------|------|
| L1 | [核心概念](01_concept_overview.md) |
| L2 | [Skill矩阵](02_skill_matrix/index.md) |
| L3 | [工作流](03_workflow/index.md) |
| L4 | [参考文档](04_reference/index.md) |
| L4-ADR | [架构决策](04_reference/document_templates/adr.md) |
| L4-RAG | [参考资料管理](04_reference/knowledge_management.md) |
| Prompts | [prompts/packs/](prompts/packs/) |
| Skills | [skills/](skills/) |
| 版本历史 | [CHANGELOG.md](CHANGELOG.md) |
