# SOP v3.1.0 技术规范文档

> **版本**: v3.1.0  
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
12. [目录保护机制](#12-目录保护机制)
13. [需求澄清流程](#13-需求澄清流程)
14. [相关文档](#14-相关文档)

---

## 1. SOP 概述

### 1.1 核心原则

SOP (Standard Operating Procedure) v3.0.2 是 AI Agent 执行任务的标准化操作流程。v3.0.2 版本采用 **Spec-First 架构**，以规范为核心组织原则。

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
docs/参考/
├── .trae/
│   ├── skills/              # 11 个 Skill 定义（4 层架构）
│   │   ├── sop-requirement-analyst/
│   │   ├── sop-architecture-design/
│   │   ├── sop-implementation-designer/
│   │   ├── sop-code-explorer/
│   │   ├── sop-code-implementation/
│   │   ├── sop-test-implementation/
│   │   ├── sop-architecture-reviewer/
│   │   ├── sop-code-review/
│   │   ├── sop-workflow-orchestrator/
│   │   ├── sop-document-sync/
│   │   └── sop-progress-supervisor/
│   └── specs/               # 临时工作目录（变更完成后清理）
├── sop/                     # SOP 规范目录（7 层）
│   ├── 01_constitution/     # L1: 工程宪章（P0 级约束）
│   ├── 02_specifications/   # L2: 系统规范
│   ├── 03_workflow/         # L3: 工作流定义
│   ├── 04_skills/           # L4: Skill 定义（11 个）
│   ├── 05_constraints/      # L5: 约束字典
│   ├── 06_templates/        # L6: 文档模板
│   ├── 07_reference/        # L7: 参考资料
│   └── contracts/           # 执行产物（审查报告等）
└── 参考文档/                # 本文档等参考材料
```

### 1.3 Skill 分类总览

SOP v3.0.2 定义了 **4 大类 Skill**，每类 Skill 职责明确：

| 类别 | 职责范围 | 主要输出 |
|------|----------|----------|
| **编排类** | 任务调度、状态管理、流程控制 | Stage 契约、状态报告 |
| **规范类** | 需求分析、架构设计、任务分解 | L1-L2 文档、design.md |
| **实现类** | 代码实现、测试编写 | 源代码、测试代码 |
| **验证类** | 质量审查、验收确认 | 审查报告、验收报告 |

---

## 2. Spec-First 架构

### 2.1 核心理念

**Spec-First（规范优先）** 是 SOP v3.0.2 的核心架构理念：

- **规范是第一性产物**：规范是系统的"宪法"，是唯一真理源
- **Skill 是规范的执行工具**：Skill 是规范的"翻译器"，负责执行规范
- **契约驱动执行**：阶段间通过契约文件通信，不共享状态

### 2.2 与 Skill-first 的区别

| 维度 | Skill-first (v2.x) | Spec-First (v3.0.2) |
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
| **P1** | 系统规范 | 强制 | 记录并继续 | 跨模块约束、系统级规范、需求澄清完整性 |
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

### 3.3 P1 级系统规范

**P1 系统规范**（跨模块约束）：
- API 接口规范
- 数据模型规范
- 通信协议规范
- 错误处理规范
- **需求澄清完整性（P1-REQ-001）**
- **长期短期区分（P1-REQ-002）**

### 3.4 P2-P3 级规范

**P2 模块规范**（单模块约束）：
- 模块内部结构
- 实现细节规范
- 测试策略
- 性能要求

**P3 实现规范**（自动化验证）：
- 代码风格规范
- 命名约定
- 自动化检查

---

## 4. 5 阶段工作流

### 4.1 阶段定义

SOP v3.0.2 定义 5 个标准阶段，每个阶段有独立的契约文件：

| 阶段 | 名称 | 契约文件 | 主要活动 | 输出物 |
|------|------|----------|----------|--------|
| **Stage 0** | 规范重量选择 | `stage-0-contract.yaml` | 路径选择、复杂度评估 | 路径决策（Heavy/Light/Fast） |
| **Stage 1** | 理解与设计 | `stage-1-contract.yaml` | 多轮次多维度提问、需求分析、架构设计 | clarification.md、spec.md、design.md |
| **Stage 2** | 实现与验证 | `stage-2-contract.yaml` | 代码实现、测试编写 | 源代码、测试代码 |
| **Stage 3** | 交付与同步 | `stage-3-contract.yaml` | 验收测试、文档同步 | 验收报告、文档更新 |
| **Stage 4** | 归档 | `stage-4-contract.yaml` | 知识沉淀、状态清理 | 归档文件、经验总结 |

### 4.2 阶段流转

```
Stage 0 (规范重量选择)
    │
    ▼
Stage 1 (理解与设计)
    │
    ▼
Stage 2 (实现与验证)
    │
    ▼
Stage 3 (交付与同步)
    │
    ▼
Stage 4 (归档与演化)
    │
    ▼
[COMPLETE]
```

### 4.3 路径选择

**Stage 0** 阶段进行路径选择：

**重规范路径**：
- 适用：从0到1核心系统、跨团队大型功能、安全金融高风险模块、长期演进基础设施
- 完整：Stage 0 → Stage 1（完整设计） → Stage 2 → Stage 3 → Stage 4
- 输出：工程宪章文档、系统规范文档、约束矩阵

**轻规范路径**：
- 适用：小功能增量需求、UI接口配置改动、试验性功能、Bug修复、性能优化
- 完整：Stage 0 → Stage 1（简化设计） → Stage 2 → Stage 3 → Stage 4
- 输出：proposal.md、confirmation.md、archive.md

**快速路径**：
- 适用：单文件修改、<30 行、无逻辑变更
- 跳过：Stage 0 和 Stage 1
- 直接：Stage 2 实现 → Stage 3 交付

---

## 5. 契约驱动执行

### 5.1 契约文件结构

每个 Stage 契约文件（YAML 格式）包含：

```yaml
version: "3.0.2"
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

### 6.1 编排类 Skill

**职责**：任务调度、状态管理、流程控制

**主要 Skill**：
- `sop-workflow-orchestrator`：编排工作流程，管理规范版本和工作流状态
- `sop-document-sync`：同步文档与代码，确保规范文档与实现保持一致
- `sop-progress-supervisor`：监管工作流进度，生成进度报告

### 6.2 规范类 Skill

**职责**：需求分析、架构设计、任务分解

**主要 Skill**：
- `sop-requirement-analyst`：分析需求并生成 P1/P2 级规范文档
- `sop-architecture-design`：进行系统架构设计，生成 P1 级架构文档
- `sop-implementation-designer`：进行实现设计，生成 P2/P3 级设计文档

### 6.3 实现类 Skill

**职责**：代码实现、测试编写

**主要 Skill**：
- `sop-code-explorer`：探索代码库并生成分析报告
- `sop-code-implementation`：根据规范和设计文档实现代码
- `sop-test-implementation`：根据 BDD 场景编写测试代码

### 6.4 验证类 Skill

**职责**：质量审查、验收确认

**主要 Skill**：
- `sop-architecture-reviewer`：审查架构设计，验证是否符合 P1 级规范
- `sop-code-review`：审查代码实现，验证是否符合 P2/P3 级规范

---

## 6.5 Skill 调用规范

### 确定性调用（USE_SKILL）

当明确知道需要调用哪个 Skill 时使用：

```yaml
USE_SKILL: sop-code-implementation
INPUTS:
  design_document: src/order/design.md
  spec_document: specs/order-spec.md
EXPECTED_OUTPUTS:
  code_changes: git commit
  test_report: tests/order-test.ts
```

### 智能路由（ROUTE_TO）

当需要 AI 智能判断使用哪个 Skill 时使用：

```yaml
ROUTE_TO: 实现订单取消功能
CONTEXT: |
  需要实现订单取消功能，包括：
  - Order.cancel() 方法
  - 订单状态变更逻辑
  - 相关单元测试
CONFIDENCE: 0.8
```

### Skill 分类（11 个）

**规范层（3 个）**:
- `sop-requirement-analyst`: 需求分析，生成 BDD 场景
- `sop-architecture-design`: 架构设计，定义分层和模块
- `sop-implementation-designer`: 详细设计，定义类和方法

**实现层（3 个）**:
- `sop-code-explorer`: 探索现有代码库
- `sop-code-implementation`: 实现业务逻辑代码
- `sop-test-implementation`: 实现单元测试和集成测试

**验证层（2 个）**:
- `sop-architecture-reviewer`: 审查架构符合性
- `sop-code-review`: 审查代码质量和规范

**编排层（3 个）**:
- `sop-workflow-orchestrator`: 工作流编排核心
- `sop-document-sync`: 同步代码与文档
- `sop-progress-supervisor`: 监控进度和阻塞问题

---

## 7. 约束体系

### 7.1 P0 级约束（不可打破）

| 约束 ID | 名称 | 描述 | 验证方法 |
|--------|------|------|----------|
| P0-SEC-001 | 禁止硬编码密钥 | 禁止在代码中硬编码密钥、密码、Token | git-secrets, truffleHog |
| P0-SEC-002 | 禁止使用已知漏洞库 | 禁止使用存在已知安全漏洞的第三方库 | npm audit, Snyk |
| P0-SEC-003 | 禁止关闭安全校验 | 禁止在生产环境关闭身份验证、授权检查 | 代码审查 + 安全扫描 |
| P0-SEC-004 | 网络访问白名单 | 禁止未授权的网络访问，必须配置白名单 | 网络策略审计、防火墙日志 |
| P0-SEC-005 | 密钥安全注入 | 密钥必须通过安全渠道注入，禁止明文传输 | 密钥管理系统审计 |
| P0-QUAL-001 | 核心模块测试覆盖率 100% | 核心业务逻辑模块单元测试覆盖率必须达到 100% | istanbul, coverage.py |
| P0-QUAL-002 | 禁止强制解包 | 禁止使用 unwrap(), expect() 等强制解包操作 | ESLint, clippy |
| P0-QUAL-003 | 禁止忽略错误 | 禁止忽略函数返回的错误 | 静态分析工具 |
| P0-ARCH-001 | 禁止循环依赖 | 模块间禁止存在循环依赖 | dependency-cruiser |
| P0-ARCH-002 | 禁止跨层调用 | 禁止跳过中间层直接调用 | ArchUnit |

### 7.2 P1 级约束（跨模块）

| 约束ID | 名称 | 描述 | 验证方法 |
|--------|------|------|----------|
| P1-PERF-001 | API响应时间 | API响应时间必须<500ms(P95) | k6, JMeter |
| P1-PERF-002 | 数据库查询优化 | 禁止N+1查询问题 | 慢查询日志、APM工具 |
| P1-AVAIL-001 | 服务可用性 | 服务可用性必须>=99.9% | Prometheus, Grafana |
| P1-TECH-001 | 优先使用项目已有库 | 新功能优先使用项目已有技术栈 | 依赖审查 |
| P1-API-001 | API版本管理 | API必须有版本号，遵循SemVer | API文档审查 |
| P1-API-002 | API向后兼容 | API变更必须保持向后兼容 | API契约测试 |
| **P1-REQ-001** | **需求澄清完整性** | **阶段1必须完成多轮次多维度提问** | **检查clarification.md** |
| **P1-REQ-002** | **长期短期区分** | **需求必须明确区分长期目标与短期实现** | **检查澄清记录** |

### 7.3 P2-P3 级约束

**P2 级约束**（单模块）：
- P2-CODE-001：遵循命名约定
- P2-CODE-002：函数长度限制（不超过50行）
- P2-CODE-003：文件长度限制（不超过500行）
- P2-DOC-001：公共API必须注释
- P2-TEST-001：测试命名约定

**P3 级约束**（自动化）：
- P3-CODE-001：缩进规范
- P3-CODE-002：行长度限制（不超过100字符）
- P3-COMMENT-001：注释语言
- P3-TEST-001：测试文件位置
- P3-GIT-001：提交信息格式

### 7.4 命令字典

| 命令 | 用途 |
|------|------|
| `/start` | 启动工作流 |
| `/spec-weight` | 评估规范重量 |
| `/propose` | 创建需求提案 |
| `/design` | 生成设计文档 |
| `/implement` | 开始实现 |
| `/review` | 请求代码审查 |
| `/approve` | 批准变更 |
| `/archive` | 创建归档记录 |

### 7.5 状态字典

| 状态 | 描述 |
|------|------|
| `WORKFLOW_STARTED` | 工作流启动 |
| `STAGE_N_PASSED` | 阶段N通过 |
| `STAGE_N_FAILED` | 阶段N失败 |
| `CONSTRAINT_P0_VIOLATED` | P0级约束违反 |
| `SPEC_APPROVED` | 规范已批准 |

---

## 8. 模板体系

### 8.1 契约模板

位置：`sop/03_workflow/contracts/`

- `stage-0-contract.yaml` - Stage 0 规范重量选择契约
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

- `spec.md` - 规范定义
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
| Stage 0 | 需求描述清晰、复杂度评估合理 | 全部通过 |
| Stage 1 | 需求澄清完成、长期短期区分、用户意图确认、设计文档完整、符合P0约束、通过审查 | 全部通过 |
| Stage 2 | 代码规范、测试通过、约束验证通过 | 全部通过 |
| Stage 3 | 文档同步完成、索引更新正确 | 全部通过 |
| Stage 4 | 归档记录完整、CHANGELOG更新 | 全部通过 |

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

## 12. 目录保护机制

### 12.1 保护目录配置

```yaml
protected_directories:
  sop/:
    protected: true
    reason: SOP规范文件
  docs/参考/:
    protected: true
    reason: 参考文档

allow_modify_protected: false
change_requires_user_auth: true
```

### 12.2 文档创建位置

```yaml
output_paths:
  spec: docs/specs/{name}-spec.md
  clarification: docs/specs/{name}-clarification.md
  design: docs/design/{name}-design.md
  archive: docs/archive/{name}-archive.md
  contract: docs/contracts/{stage}-contract.yaml
```

### 12.3 保护规则

- 保护目录禁止修改
- 文档创建在 `docs/` 目录
- 变更需用户授权

---

## 13. 需求澄清流程

### 13.1 多轮次多维度提问

Stage 1 阶段必须完成 4 轮提问：

**第1轮：业务背景与目标**

| 问题 | 目的 |
|------|------|
| 这个需求要解决什么业务问题？ | 理解问题本质 |
| 谁会使用这个功能？ | 明确用户画像 |
| 如何衡量这个功能的成功？ | 定义验收标准 |
| 这个需求的优先级如何？ | 评估优先级 |

**第2轮：长期目标与短期实现**

| 问题 | 目的 |
|------|------|
| 这个功能最终要达到什么状态？ | 理解终极目标 |
| 第一期需要交付哪些核心能力？ | 定义MVP范围 |
| 从短期到长期的演进路径是什么？ | 规划迭代路线 |
| 短期实现是否可以接受技术债务？ | 评估技术风险 |

**第3轮：边界与约束**

| 问题 | 目的 |
|------|------|
| 这个功能不包含什么？ | 避免范围蔓延 |
| 是否有技术栈、性能、安全方面的约束？ | 识别技术限制 |
| 是否需要兼容现有系统？ | 评估集成影响 |
| 团队规模、时间预算、技术能力如何？ | 评估可行性 |

**第4轮：风险与假设**

| 问题 | 目的 |
|------|------|
| 这个需求最大的风险是什么？ | 提前规避风险 |
| 我们做了哪些假设？ | 暴露隐藏假设 |
| 如果失败，可能的失败模式是什么？ | 设计降级方案 |
| 如果上线后出现问题，如何回滚？ | 制定应急预案 |

### 13.2 澄清记录模板

```markdown
# 需求澄清记录

## 业务背景与目标
- 业务问题：
- 目标用户：
- 成功标准：
- 优先级：

## 长期目标与短期实现
- 长期愿景：
- 短期目标(MVP)：
- 演进路径：
- 技术债务策略：

## 边界与约束
- 功能边界(不包含)：
- 技术约束：
- 兼容性要求：
- 资源限制：

## 风险与假设
- 已识别风险：
- 关键假设：
- 失败场景：
- 回滚策略：

## 用户确认
- 确认人：
- 确认时间：
- 确认内容：
```

### 13.3 P1 级需求约束

**P1-REQ-001: 需求澄清完整性**

```yaml
name: 需求澄清完整性
desc: 阶段1必须完成多轮次多维度提问，记录用户真实意图
verify: 检查specs/{name}-clarification.md文档完整性
handle: 警告，建议补充澄清
required_dimensions:
  - 业务背景与目标
  - 长期目标与短期实现
  - 边界与约束
  - 风险与假设
```

**P1-REQ-002: 长期短期区分**

```yaml
name: 长期短期区分
desc: 需求必须明确区分长期目标与短期实现
verify: 检查澄清记录中是否包含"长期愿景"和"短期目标"
handle: 警告，建议补充区分
```

---

## 14. 相关文档

### 14.1 核心文档

- [AGENT_SOP.md](sop/AGENT_SOP.md) - Spec-First 架构入口
- [sop_GUIDE.md](sop_GUIDE.md) - SOP 文档审查指南
- [document_llm_GUIDE.md](document_llm_GUIDE.md) - LLM 技术规范
- [user_guide.md](user_guide.md) - 用户指南

### 14.2 规范文档

- [工程宪章](sop/01_constitution/) - P0 级规范
- [系统规范](sop/02_specifications/) - P1-P2 级规范
- [工作流](sop/03_workflow/) - 5 阶段工作流
- [Skill 定义](sop/04_skills/) - 4 类 Skill
- [约束体系](sop/05_constraints/) - P0-P3 约束
- [模板体系](sop/06_templates/) - 契约/文档/报告模板
- [参考资料](sop/07_reference/) - 参考材料

### 14.3 版本历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| v3.0.2 | 2026-03-01 | 新增目录保护机制、需求澄清流程、P1级需求约束、Token优化 |
| v3.0.0 | 2026-03-01 | Spec-First 架构重构，5 阶段工作流，契约驱动执行 |
| v2.12.0 | 2026-02-25 | Skill-first 最终版本，系统性审查与版本同步 |
| v2.0.0 | 2026-02-12 | Skill-first 体系上线 |

---

*文档结束*
