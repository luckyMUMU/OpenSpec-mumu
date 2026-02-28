# SOP v3.0.0 技术规范文档

> **版本**: v3.0.0  
> **核心架构**: Spec-First（规范优先）  
> **更新日期**: 2026-03-01  
> **文档性质**: 完整技术规范，便于人类阅读的单一文件版本

---

## 目录

1. [SOP 概述](#1-sop-概述)
2. [Spec-First 架构](#2-spec-first-架构)
3. [规范分层体系](#3-规范分层体系)
4. [5 阶段工作流](#4-5-阶段工作流)
5. [契约驱动执行](#5-契约驱动执行)
6. [Skill 分类体系](#6-skill-分类体系)
7. [约束体系](#7-约束体系)
8. [模板体系](#8-模板体系)
9. [文档层级架构](#9-文档层级架构)
10. [质量门控机制](#10-质量门控机制)
11. [熔断机制](#11-熔断机制)
12. [目录调度](#12-目录调度)
13. [相关文档](#13-相关文档)

---

## 1. SOP 概述

### 1.1 核心原则

SOP (Standard Operating Procedure) v3.0.0 是 AI Agent 执行任务的标准化操作流程。v3.0.0 版本采用 **Spec-First 架构**，以规范为核心组织原则。

**五大核心原则**：

| 原则 | 描述 |
|------|------|
| **Spec-First** | 规范是第一性产物，Skill 是规范的执行工具 |
| **契约驱动** | 阶段间通过契约文件通信，不共享状态 |
| **规范分层** | P0-P3 四级规范体系，层层约束 |
| **质量门禁** | 每个阶段完成后必须通过质量检查才能继续 |
| **熔断保护** | 三击熔断机制防止无限循环 |

### 1.2 文档结构

```
sop/
├── AGENT_SOP.md          # 主入口文档（Spec-First 架构）
├── 01_constitution/      # P0 级工程宪章
│   ├── project-charter.md
│   ├── architecture-principles.md
│   ├── quality-redlines.md
│   └── security-baseline.md
├── 02_specifications/    # P1-P2 级系统规范
│   ├── index.md
│   ├── system-spec.md
│   └── [module-specs]/
├── 03_workflow/          # 5 阶段工作流
│   ├── index.md
│   ├── stage-0-weight.md
│   ├── stage-1-design.md
│   ├── stage-2-implement.md
│   ├── stage-3-deliver.md
│   ├── stage-4-archive.md
│   ├── deep_path.md
│   ├── fast_path.md
│   ├── three_strike_rule.md
│   └── contracts/        # Stage 契约模板
│       ├── stage-0-contract.yaml
│       ├── stage-1-contract.yaml
│       ├── stage-2-contract.yaml
│       ├── stage-3-contract.yaml
│       └── stage-4-contract.yaml
├── 04_skills/            # Skill 分类定义
│   ├── index.md
│   ├── orchestration/    # 编排类 Skill
│   ├── specification/    # 规范类 Skill
│   ├── implementation/   # 实现类 Skill
│   └── verification/     # 验证类 Skill
├── 05_constraints/       # P0-P3 约束体系
│   ├── index.md
│   ├── p0-constraints.md
│   ├── p1-constraints.md
│   ├── p2-constraints.md
│   ├── p3-constraints.md
│   ├── command-dictionary.md
│   └── state-dictionary.md
├── 06_templates/         # 模板体系
│   ├── index.md
│   ├── contracts/        # 契约模板
│   ├── documents/        # 文档模板
│   └── reports/          # 报告模板
└── 07_reference/         # 参考资料
    └── index.md
```

### 1.3 Skill 分类总览

SOP v3.0.0 定义了 **4 大类 Skill**，每类 Skill 职责明确：

| 类别 | 职责范围 | 主要输出 |
|------|----------|----------|
| **编排类 (Orchestration)** | 任务调度、状态管理、流程控制 | Stage 契约、状态报告 |
| **规范类 (Specification)** | 需求分析、架构设计、任务分解 | L1-L2 文档、design.md |
| **实现类 (Implementation)** | 代码实现、测试编写 | 源代码、测试代码 |
| **验证类 (Verification)** | 质量审查、验收确认 | 审查报告、验收报告 |

---

## 2. Spec-First 架构

### 2.1 核心理念

**Spec-First（规范优先）** 是 SOP v3.0.0 的核心架构理念：

- **规范是第一性产物**：规范是系统的"宪法"，是唯一真理源
- **Skill 是规范的执行工具**：Skill 是规范的"翻译器"，负责执行规范
- **契约驱动执行**：阶段间通过契约文件通信，不共享状态

### 2.2 与 Skill-first 的区别

| 维度 | Skill-first (v2.x) | Spec-First (v3.0) |
|------|-------------------|------------------|
| **核心** | Skill 是能力入口 | 规范是核心，Skill 是执行工具 |
| **SSOT** | Skill 矩阵 | 工程宪章 + 规范分层 + 契约模板 |
| **架构** | 17 个 Skill 驱动 | P0-P3 规范分层 + 4 类 Skill |
| **工作流** | 路径选择驱动 | 5 阶段契约驱动 |
| **约束** | 约束矩阵 | P0-P3 四级约束体系 |

### 2.3 架构优势

1. **规范性更强**：P0 级工程宪章不可打破，确保核心原则
2. **扩展性更好**：P1-P3 规范分层，便于增量扩展
3. **可验证性更高**：契约文件明确定义前置/后置条件
4. **可维护性更强**：规范与实现分离，便于独立演进

---

## 3. 规范分层体系

### 3.1 P0-P3 规范分层

| 层级 | 名称 | 强制级别 | 熔断机制 | 示例 |
|------|------|----------|----------|------|
| **P0** | 工程宪章 | 不可打破 | 立即熔断 | 项目章程、架构原则、质量红线、安全基线 |
| **P1** | 系统规范 | 强制 | 记录并继续 | 跨模块约束、系统级规范 |
| **P2** | 模块规范 | 强制 | 记录并继续 | 单模块约束、实现规范 |
| **P3** | 实现规范 | 推荐 | 自动化验证 | 代码规范、命名约定、自动化检查 |

### 3.2 P0 级工程宪章（4 个文件）

**project-charter.md** - 项目章程
- 项目愿景与目标
- 核心价值主张
- 关键干系人
- 成功标准

**architecture-principles.md** - 架构原则
- 系统设计原则
- 技术选型原则
- 演进原则
- 架构决策记录规范

**quality-redlines.md** - 质量红线
- 不可妥协的质量标准
- 质量门禁要求
- 质量违规处理

**security-baseline.md** - 安全基线
- 安全编码规范
- 数据保护要求
- 密钥管理规范
- 安全审计要求

### 3.3 P1-P2 级系统规范

**P1 系统规范**（跨模块约束）：
- API 接口规范
- 数据模型规范
- 通信协议规范
- 错误处理规范

**P2 模块规范**（单模块约束）：
- 模块内部结构
- 实现细节规范
- 测试策略
- 性能要求

---

## 4. 5 阶段工作流

### 4.1 阶段定义

SOP v3.0.0 定义 5 个标准阶段，每个阶段有独立的契约文件：

| 阶段 | 名称 | 契约文件 | 主要活动 | 输出物 |
|------|------|----------|----------|--------|
| **Stage 0** | 权重选择 | `stage-0-contract.yaml` | 路径选择、复杂度评估 | 路径决策（Deep/Fast） |
| **Stage 1** | 设计 | `stage-1-contract.yaml` | 需求分析、架构设计 | design.md、API 契约 |
| **Stage 2** | 实现 | `stage-2-contract.yaml` | 代码实现、测试编写 | 源代码、测试代码 |
| **Stage 3** | 交付 | `stage-3-contract.yaml` | 验收测试、文档同步 | 验收报告、文档更新 |
| **Stage 4** | 归档 | `stage-4-contract.yaml` | 知识沉淀、状态清理 | 归档文件、经验总结 |

### 4.2 阶段流转

```
Stage 0 (权重选择)
    │
    ▼
Stage 1 (设计)
    │
    ▼
Stage 2 (实现)
    │
    ▼
Stage 3 (交付)
    │
    ▼
Stage 4 (归档)
    │
    ▼
[COMPLETE]
```

### 4.3 路径选择

**Stage 0** 阶段进行路径选择：

**快速路径（Fast Path）**：
- 适用：单文件修改、<30 行、无逻辑变更
- 跳过：Stage 1 详细设计
- 直接：Stage 2 实现

**深度路径（Deep Path）**：
- 适用：跨文件/新功能/重构/API 变更/架构调整
- 完整：Stage 0 → Stage 1 → Stage 2 → Stage 3 → Stage 4

---

## 5. 契约驱动执行

### 5.1 契约文件结构

每个 Stage 契约文件（YAML 格式）包含：

```yaml
version: "3.0.0"
stage: 0|1|2|3|4
timestamp: ISO-8601

# 前置条件（启动前必须满足）
preconditions:
  - condition_1
  - condition_2

# 后置条件（完成后必须达成）
postconditions:
  - condition_1
  - condition_2

# 不变式（整个执行过程必须保持）
invariants:
  - invariant_1
  - invariant_2

# 隔离上下文（阶段间不共享状态）
isolated_context:
  inputs: [...]
  outputs: [...]
  
# 质量门禁
quality_gates:
  - gate_1
  - gate_2

# 状态
status: pending|in_progress|completed|failed
```

### 5.2 契约执行流程

```
1. 读取契约文件
2. 验证前置条件
3. 执行阶段活动
4. 验证后置条件
5. 检查质量门禁
6. 更新契约状态
7. 传递给下一阶段
```

### 5.3 上下文隔离

**核心原则**：阶段间不共享状态，仅通过契约文件通信

```
Stage 0 Context    Stage 1 Context    Stage 2 Context
      ↓                  ↓                  ↓
  [契约文件]  →    [契约文件]  →    [契约文件]
      ↓                  ↓                  ↓
  路径决策            设计文档            源代码
```

---

## 6. Skill 分类体系

### 6.1 编排类 Skill (Orchestration)

**职责**：任务调度、状态管理、流程控制

**主要 Skill**：
- 路径选择器：评估复杂度，选择路径
- 状态管理器：管理契约状态
- 流程控制器：协调阶段流转

### 6.2 规范类 Skill (Specification)

**职责**：需求分析、架构设计、任务分解

**主要 Skill**：
- 需求分析师：分析需求，生成 PRD
- 架构设计师：设计架构，生成 design.md
- 任务分解师：分解任务，生成 task_list

### 6.3 实现类 Skill (Implementation)

**职责**：代码实现、测试编写

**主要 Skill**：
- 代码实现师：编写源代码
- 测试编写师：编写测试代码
- 文档同步师：同步文档

### 6.4 验证类 Skill (Verification)

**职责**：质量审查、验收确认

**主要 Skill**：
- 代码审查师：审查代码质量
- 质量验证师：验证质量门禁
- 验收确认师：最终验收

---

## 7. 约束体系

### 7.1 P0-P3 约束

**P0 约束**（不可打破）：
- 禁止跳过质量门禁
- 禁止绕过契约执行
- 禁止修改工程宪章
- 禁止忽略安全基线

**P1 约束**（跨模块）：
- API 接口规范
- 数据模型规范
- 错误处理规范

**P2 约束**（单模块）：
- 模块内部规范
- 实现细节约束

**P3 约束**（自动化）：
- 代码风格规范
- 命名约定
- 自动化检查

### 7.2 命令字典

| 命令 | 用途 |
|------|------|
| `/plan` | 进入 Plan 模式，制定计划 |
| `/spec` | 进入 Spec 模式，创建规范 |
| `/agent` | 进入 Agent 模式，自动执行 |
| `/status` | 查询当前状态 |
| `/help` | 查询帮助信息 |

### 7.3 状态字典

| 状态 | 描述 |
|------|------|
| `pending` | 等待执行 |
| `in_progress` | 执行中 |
| `completed` | 已完成 |
| `failed` | 执行失败 |
| `blocked` | 被阻塞 |

---

## 8. 模板体系

### 8.1 契约模板

位置：`sop/03_workflow/contracts/`

- `stage-0-contract.yaml` - Stage 0 权重选择契约
- `stage-1-contract.yaml` - Stage 1 设计契约
- `stage-2-contract.yaml` - Stage 2 实现契约
- `stage-3-contract.yaml` - Stage 3 交付契约
- `stage-4-contract.yaml` - Stage 4 归档契约

### 8.2 文档模板

位置：`sop/06_templates/documents/`

- `proposal.md` - 提案文档模板
- `design.md` - 设计文档模板
- `confirmation.md` - 确认文档模板
- `archive.md` - 归档文档模板

### 8.3 报告模板

位置：`sop/06_templates/reports/`

- `review-report.md` - 审查报告模板
- `constraint-report.md` - 约束报告模板

---

## 9. 文档层级架构

### 9.1 L1-L4 文档分层

| 层级 | 名称 | 内容 | 位置 |
|------|------|------|------|
| **L1** | 需求层 | PRD/MRD/FRD | `docs/01_requirements/` |
| **L2** | 架构层 | 技术无关的架构设计 | `docs/02_logical_workflow/` |
| **L3** | 实现层 | 目录级实现设计 | `src/**/design.md` |
| **L4** | 决策层 | ADR + 决策记录 | `docs/04_context_reference/` |

### 9.2 Spec 执行期文档

位置：`.trae/specs/<change-id>/`

- `spec.md` - 规范定义（Why/What/Impact）
- `tasks.md` - 任务列表（可验证的工作项）
- `checklist.md` - 检查清单（验证点）

**生命周期**：
- 创建：任务开始时
- 执行：任务执行期
- 归档：重要任务完成后归档到 `docs/04_context_reference/archived_specs/`
- 清理：简单任务完成后直接删除

---

## 10. 质量门控机制

### 10.1 门控定义

每个阶段完成后必须执行门控检查：

| 阶段 | 门控检查项 | 通过条件 |
|------|-----------|----------|
| Stage 0 | 路径选择合理、复杂度评估准确 | 全部通过 |
| Stage 1 | 设计文档完整、接口定义清晰 | 全部通过 |
| Stage 2 | 代码规范、测试通过、契约满足 | 全部通过 |
| Stage 3 | 验收通过、文档同步 | 全部通过 |
| Stage 4 | 归档完整、状态清理 | 全部通过 |

### 10.2 门控失败处理

- 门控失败触发熔断机制
- 记录失败原因到契约文件
- 用户决策：修复后重试、回滚、终止
- 与三错即停机制独立

---

## 11. 熔断机制

### 11.1 三错即停规则

**定义**：同一 Skill 同一步骤连续失败 3 次时触发熔断

**触发条件**：
- 连续失败 3 次
- 失败原因相同或相似

**熔断效果**：
- 停止自动执行
- 生成错误报告
- 请求人工干预

### 11.2 恢复选项

| 选项 | 描述 |
|------|------|
| **重试** | 使用相同参数重试 |
| **降级** | 降级到更简单的路径 |
| **跳过** | 跳过当前任务 |
| **人工** | 请求人工处理 |
| **终止** | 终止整个流程 |

---

## 12. 目录调度

### 12.1 目录状态机

```
[DIR_WAITING_DEP] ←── 依赖未就绪 ──┐
       │                          │
       ↓ 依赖就绪（自动触发）       │
[DIR_WORKING] ──→ 处理完成 ──→ [DIR_COMPLETED]
       │                          │
       ↓ 处理失败                 │
[DIR_FAILED] ─────────────────────┘
```

### 12.2 并行执行规则

1. **依赖分析**：分析目录间的依赖关系
2. **拓扑排序**：按依赖关系排序
3. **分组并行**：无依赖的目录并行执行
4. **顺序保证**：有依赖的目录按顺序执行

---

## 13. 相关文档

### 13.1 核心文档

- [AGENT_SOP.md](sop/AGENT_SOP.md) - Spec-First 架构入口
- [sop_GUIDE.md](sop_GUIDE.md) - SOP 文档审查指南
- [document_llm_GUIDE.md](document_llm_GUIDE.md) - LLM 技术规范
- [user_guide.md](user_guide.md) - 用户指南

### 13.2 规范文档

- [工程宪章](sop/01_constitution/) - P0 级规范
- [系统规范](sop/02_specifications/) - P1-P2 级规范
- [工作流](sop/03_workflow/) - 5 阶段工作流
- [Skill 定义](sop/04_skills/) - 4 类 Skill
- [约束体系](sop/05_constraints/) - P0-P3 约束
- [模板体系](sop/06_templates/) - 契约/文档/报告模板
- [参考资料](sop/07_reference/) - 参考材料

### 13.3 版本历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| v3.0.0 | 2026-03-01 | Spec-First 架构重构，5 阶段工作流，契约驱动执行 |
| v2.12.0 | 2026-02-25 | Skill-first 最终版本，系统性审查与版本同步 |
| v2.0.0 | 2026-02-12 | Skill-first 体系上线 |

---

*文档结束*
