# SOP v3.0.0 完全重构执行计划

> **版本**: v2.0.0  
> **创建时间**: 2026-02-28  
> **目标**: 完全重构 SOP 为 Spec-first 架构（不考虑向后兼容）

---

## 一、重构概述

### 1.1 核心理念转变

| 维度 | v2.x（旧） | v3.0.0（新） |
|------|-----------|-------------|
| **第一性** | Skill 是核心 | **规范是核心** |
| **驱动方式** | Skill 驱动流程 | **规范驱动 Skill** |
| **协作模式** | 共享上下文 | **契约式协作**（独立上下文） |
| **规范层级** | 无分层 | **P0-P3 四层** |
| **流程阶段** | 3 阶段 | **5 阶段**（0-4） |
| **文档体系** | 单一轨道 | **重规范 + 轻规范** |

### 1.2 重构原则

1. **规范优先**：所有内容围绕规范展开
2. **契约隔离**：各环节独立上下文，通过契约协作
3. **分层约束**：P0 不可违背，P1-P3 渐进放宽
4. **极简主义**：删除冗余，保留核心
5. **完全重构**：不保留旧结构，重新组织

### 1.3 新目录结构

```
sop/
├── AGENT_SOP.md                  # 唯一入口（Spec-first 架构）
├── 01_constitution/               # P0 级：工程宪章（必须）
│   ├── project-charter.md         # 项目宪章
│   ├── quality-redlines.md        # 质量红线
│   ├── architecture-principles.md # 架构原则
│   └── security-baseline.md       # 安全基线
│
├── 02_specifications/             # P1-P2 级：系统/模块规范
│   ├── index.md                   # 规范索引
│   ├── system-spec.md             # 系统规范（P1）
│   ├── api-contracts/             # API 契约（P2）
│   ├── data-models/               # 数据模型（P2）
│   └── domain-models/             # 领域模型（P2）
│
├── 03_workflow/                   # 工作流（5 阶段）
│   ├── index.md                   # 流程入口
│   ├── stage-0-weight.md          # 阶段 0：规范重量选择
│   ├── stage-1-design.md          # 阶段 1：理解与设计
│   ├── stage-2-implement.md       # 阶段 2：实现与验证
│   ├── stage-3-deliver.md         # 阶段 3：交付与同步
│   ├── stage-4-archive.md         # 阶段 4：归档与演化
│   └── contracts/                 # 阶段契约模板
│
├── 04_skills/                     # Skill 定义（规范驱动）
│   ├── index.md                   # Skill 索引
│   ├── specification/             # 规范类 Skill
│   ├── implementation/            # 实现类 Skill
│   ├── verification/              # 验证类 Skill
│   └── orchestration/             # 编排类 Skill
│
├── 05_constraints/                # 约束定义
│   ├── index.md                   # 约束索引
│   ├── p0-constraints.md          # P0 级约束
│   ├── p1-constraints.md          # P1 级约束
│   ├── p2-constraints.md          # P2 级约束
│   ├── p3-constraints.md          # P3 级约束
│   ├── state-dictionary.md        # 状态字典
│   └── command-dictionary.md      # 命令字典
│
├── 06_templates/                  # 模板与格式
│   ├── documents/                 # 文档模板
│   ├── contracts/                 # 契约模板
│   └── reports/                   # 报告模板
│
├── 07_reference/                  # 参考资料
│   ├── ddd-guide.md               # DDD 指南
│   ├── tdd-guide.md               # TDD 指南
│   └── bdd-guide.md               # BDD 指南
│
├── CHANGELOG.md                   # 版本历史
└── README.md                      # SOP 说明
```

---

## 二、执行任务清单

### 阶段 1：清理旧结构（P0 级）

#### 任务 1.1：删除冗余文件

**删除清单**：
- `sop/01_concept_overview.md` → 内容合并到 `AGENT_SOP.md`
- `sop/02_skill_matrix/` → 重构为 `04_skills/`
- `sop/04_reference/` → 重构为 `06_templates/` + `07_reference/`
- `sop/skills/` → 重构到 `04_skills/` 子目录

**操作**：
```powershell
# 备份旧结构
# 创建新目录结构
# 迁移必要内容
# 删除旧文件
```

**验收标准**：
- [ ] 旧目录结构清理完成
- [ ] 新目录结构创建完成

---

### 阶段 2：创建工程宪章（P0 级）

#### 任务 2.1：创建项目宪章

**文件**：`sop/01_constitution/project-charter.md`

**内容**：
```markdown
# 项目宪章

## 愿景
[项目愿景]

## 核心价值主张
1. [价值 1]
2. [价值 2]

## 关键干系人
- 产品负责人
- 技术负责人
- 架构师

## 技术愿景
[技术愿景]

## 成功标准
- [标准 1]
- [标准 2]
```

#### 任务 2.2：创建质量红线

**文件**：`sop/01_constitution/quality-redlines.md`

**内容**：
- P0-SEC-001: 禁止硬编码密钥
- P0-SEC-002: 禁止使用已知漏洞库
- P0-QUAL-001: 核心模块测试覆盖率 100%
- P0-QUAL-002: 禁止强制解包
- P0-COMP-001: 数据隐私保护

#### 任务 2.3：创建架构原则

**文件**：`sop/01_constitution/architecture-principles.md`

**内容**：
- 分层架构原则
- 依赖方向原则
- 模块边界原则
- 技术选型边界

#### 任务 2.4：创建安全基线

**文件**：`sop/01_constitution/security-baseline.md`

**内容**：
- 身份验证要求
- 数据加密要求
- 输入验证要求
- 日志与审计要求

**验收标准**：
- [ ] 4 个宪章文档创建完成
- [ ] 每个文档包含 P0 级约束定义

---

### 阶段 3：创建规范体系（P1 级）

#### 任务 3.1：创建规范索引

**文件**：`sop/02_specifications/index.md`

**内容**：
- P0-P3 规范层级说明
- 规范创建指南
- 规范演化规则

#### 任务 3.2：创建系统规范模板

**文件**：`sop/02_specifications/system-spec.md`

**内容**：
- 系统功能边界
- 核心业务流程
- 外部接口定义
- 性能指标

#### 任务 3.3：创建契约目录结构

**目录**：
- `sop/02_specifications/api-contracts/`
- `sop/02_specifications/data-models/`
- `sop/02_specifications/domain-models/`

**验收标准**：
- [ ] 规范索引创建完成
- [ ] 系统规范模板创建完成

---

### 阶段 4：重构工作流（P0 级）

#### 任务 4.1：创建工作流入口

**文件**：`sop/03_workflow/index.md`

**内容**：
- 5 阶段流程总览
- 质量门控机制
- 契约式协作说明
- 路径选择（重规范/轻规范）

#### 任务 4.2：创建阶段 0 文档

**文件**：`sop/03_workflow/stage-0-weight.md`

**内容**：
- 规范重量评估流程
- 重规范/轻规范选择标准
- 输入输出契约定义

#### 任务 4.3：创建阶段 1 文档

**文件**：`sop/03_workflow/stage-1-design.md`

**内容**：
- 理解与设计流程
- BDD 场景描述
- DDD 战术映射
- 输入输出契约定义

#### 任务 4.4：创建阶段 2 文档

**文件**：`sop/03_workflow/stage-2-implement.md`

**内容**：
- 实现与验证流程
- TDD 循环执行
- 约束验证
- 输入输出契约定义

#### 任务 4.5：创建阶段 3 文档

**文件**：`sop/03_workflow/stage-3-deliver.md`

**内容**：
- 交付与同步流程
- 文档同步规则
- 输入输出契约定义

#### 任务 4.6：创建阶段 4 文档

**文件**：`sop/03_workflow/stage-4-archive.md`

**内容**：
- 归档与演化流程
- 轻规范升级重规范机制
- CHANGELOG 更新规则

#### 任务 4.7：创建契约模板

**目录**：`sop/03_workflow/contracts/`

**文件**：
- `stage-0-contract.yaml`
- `stage-1-contract.yaml`
- `stage-2-contract.yaml`
- `stage-3-contract.yaml`
- `stage-4-contract.yaml`

**验收标准**：
- [ ] 5 阶段文档创建完成
- [ ] 契约模板创建完成

---

### 阶段 5：重构 Skill 体系（P1 级）

#### 任务 5.1：创建 Skill 索引

**文件**：`sop/04_skills/index.md`

**内容**：
- Skill 分类（规范类/实现类/验证类/编排类）
- 规范驱动 Skill 的工作机制
- Skill 与规范层级映射

#### 任务 5.2：创建规范类 Skill

**目录**：`sop/04_skills/specification/`

**Skill**：
- `sop-requirement-analyst` - 需求分析 → 生成 P1/P2 级规范
- `sop-architecture-design` - 架构设计 → 生成 P1 级规范
- `sop-implementation-designer` - 实现设计 → 生成 P2/P3 级规范

#### 任务 5.3：创建实现类 Skill

**目录**：`sop/04_skills/implementation/`

**Skill**：
- `sop-code-explorer` - 探索代码 → 验证规范是否被遵循
- `sop-code-implementation` - 代码实现 → 将规范翻译为代码
- `sop-test-implementation` - 测试实现 → 将规范翻译为测试

#### 任务 5.4：创建验证类 Skill

**目录**：`sop/04_skills/verification/`

**Skill**：
- `sop-architecture-reviewer` - 架构审查 → 验证实现是否符合 P1 级规范
- `sop-code-review` - 代码审查 → 验证实现是否符合 P2/P3 级规范

#### 任务 5.5：创建编排类 Skill

**目录**：`sop/04_skills/orchestration/`

**Skill**：
- `sop-workflow-orchestrator` - 流程编排 → 管理规范的版本和演化
- `sop-document-sync` - 文档同步 → 确保规范与实现同步
- `sop-progress-supervisor` - 进度监管 → 目录并行调度

**验收标准**：
- [ ] Skill 索引创建完成
- [ ] 4 类 Skill 目录创建完成
- [ ] 核心 Skill 定义迁移完成

---

### 阶段 6：重构约束体系（P0 级）

#### 任务 6.1：创建约束索引

**文件**：`sop/05_constraints/index.md`

**内容**：
- P0-P3 约束层级说明
- 约束验证方法
- 违反处理规则

#### 任务 6.2：创建 P0 级约束

**文件**：`sop/05_constraints/p0-constraints.md`

**内容**：
- 安全红线约束
- 质量红线约束
- 合规红线约束
- 违反即熔断

#### 任务 6.3：创建 P1-P3 级约束

**文件**：
- `sop/05_constraints/p1-constraints.md` - 系统级约束
- `sop/05_constraints/p2-constraints.md` - 模块级约束
- `sop/05_constraints/p3-constraints.md` - 实现级约束

#### 任务 6.4：迁移状态字典

**文件**：`sop/05_constraints/state-dictionary.md`

**变更**：
- 添加新阶段状态
- 添加契约相关状态
- 添加规范验证状态

#### 任务 6.5：迁移命令字典

**文件**：`sop/05_constraints/command-dictionary.md`

**变更**：
- 添加新命令（/spec-weight, /propose, /confirm, /archive）
- 添加契约相关命令

**验收标准**：
- [ ] 约束索引创建完成
- [ ] P0-P3 约束定义完成
- [ ] 状态/命令字典迁移完成

---

### 阶段 7：创建模板体系（P2 级）

#### 任务 7.1：创建文档模板

**目录**：`sop/06_templates/documents/`

**模板**：
- `proposal.md` - 需求提案模板
- `confirmation.md` - 技术确认模板
- `archive.md` - 归档记录模板
- `design.md` - 实现设计模板

#### 任务 7.2：创建契约模板

**目录**：`sop/06_templates/contracts/`

**模板**：
- `stage-contract.yaml` - 阶段契约模板
- `api-contract.yaml` - API 契约模板
- `data-model.yaml` - 数据模型模板

#### 任务 7.3：创建报告模板

**目录**：`sop/06_templates/reports/`

**模板**：
- `review-report.md` - 审查报告模板
- `constraint-report.md` - 约束验证报告模板

**验收标准**：
- [ ] 模板目录创建完成
- [ ] 核心模板创建完成

---

### 阶段 8：更新入口文档（P0 级）

#### 任务 8.1：更新唯一入口

**文件**：`sop/AGENT_SOP.md`

**变更**：完全重写为 Spec-first 架构入口

**内容**：
```markdown
# SOP（Spec-first 架构）

> **版本**: v3.0.0
> **核心理念**: 规范是核心，Skill 是实现方式

## 第一性原理

规范是第一性产物：
- 规范是系统的"宪法"
- 规范是唯一真理源
- 规范驱动整个开发流程

## 规范分层架构

[P0-P3 分层图]

## 5 阶段工作流

[阶段 0-4 流程图]

## 快速导航

| 需求 | 目标文档 |
|------|----------|
| 工程宪章（P0） | [01_constitution/](01_constitution/) |
| 系统规范（P1-P2） | [02_specifications/](02_specifications/) |
| 工作流程 | [03_workflow/](03_workflow/) |
| Skill 定义 | [04_skills/](04_skills/) |
| 约束规范 | [05_constraints/](05_constraints/) |
| 模板参考 | [06_templates/](06_templates/) |

## 核心约束

1. 规范先行 - 先写规范，后写代码
2. 契约协作 - 各环节独立上下文
3. 分层约束 - P0 不可违背
4. 验证独立 - 验证规范是否被满足
```

**验收标准**：
- [ ] 入口文档创建完成
- [ ] 包含核心理念说明
- [ ] 导航结构清晰

---

### 阶段 9：更新版本历史（P0 级）

#### 任务 9.1：更新 CHANGELOG

**文件**：`sop/CHANGELOG.md`

**内容**：
```markdown
## v3.0.0 (2026-02-28)

**架构重构** - 完全重构为 Spec-first 架构

### 核心变更

- **理念转变**：Skill-first → Spec-first
- **规范分层**：引入 P0-P3 四层规范架构
- **协作模式**：共享上下文 → 契约式协作
- **流程阶段**：3 阶段 → 5 阶段（0-4）
- **文档体系**：引入重规范 + 轻规范双轨制

### 目录结构变更

- 新增 `01_constitution/` - 工程宪章
- 新增 `02_specifications/` - 系统规范
- 重构 `03_workflow/` - 5 阶段流程
- 重构 `04_skills/` - 规范驱动 Skill
- 重构 `05_constraints/` - P0-P3 约束
- 新增 `06_templates/` - 模板体系

### 删除内容

- 删除 `01_concept_overview.md`（合并到 `AGENT_SOP.md`）
- 删除 `02_skill_matrix/`（重构为 `04_skills/`）
- 删除 `04_reference/`（重构为模板和参考）
```

**验收标准**：
- [ ] CHANGELOG 更新完成
- [ ] 变更记录完整

---

## 三、执行顺序

```
阶段 1：清理旧结构
    └── 删除冗余文件，创建新目录
           ↓
阶段 2：创建工程宪章
    ├── project-charter.md
    ├── quality-redlines.md
    ├── architecture-principles.md
    └── security-baseline.md
           ↓
阶段 3：创建规范体系
    ├── 规范索引
    └── 系统规范模板
           ↓
阶段 4：重构工作流
    ├── 工作流入口
    ├── 5 阶段文档
    └── 契约模板
           ↓
阶段 5：重构 Skill 体系
    ├── Skill 索引
    └── 4 类 Skill 目录
           ↓
阶段 6：重构约束体系
    ├── 约束索引
    ├── P0-P3 约束
    └── 状态/命令字典
           ↓
阶段 7：创建模板体系
    ├── 文档模板
    ├── 契约模板
    └── 报告模板
           ↓
阶段 8：更新入口文档
    └── AGENT_SOP.md（完全重写）
           ↓
阶段 9：更新版本历史
    └── CHANGELOG.md
```

---

## 四、文件变更清单

### 新增文件

| 文件路径 | 说明 |
|----------|------|
| `sop/AGENT_SOP.md` | 入口文档（完全重写） |
| `sop/01_constitution/project-charter.md` | 项目宪章 |
| `sop/01_constitution/quality-redlines.md` | 质量红线 |
| `sop/01_constitution/architecture-principles.md` | 架构原则 |
| `sop/01_constitution/security-baseline.md` | 安全基线 |
| `sop/02_specifications/index.md` | 规范索引 |
| `sop/02_specifications/system-spec.md` | 系统规范 |
| `sop/03_workflow/index.md` | 工作流入口 |
| `sop/03_workflow/stage-0-weight.md` | 阶段 0 |
| `sop/03_workflow/stage-1-design.md` | 阶段 1 |
| `sop/03_workflow/stage-2-implement.md` | 阶段 2 |
| `sop/03_workflow/stage-3-deliver.md` | 阶段 3 |
| `sop/03_workflow/stage-4-archive.md` | 阶段 4 |
| `sop/03_workflow/contracts/*.yaml` | 契约模板 |
| `sop/04_skills/index.md` | Skill 索引 |
| `sop/05_constraints/p0-constraints.md` | P0 约束 |
| `sop/05_constraints/p1-constraints.md` | P1 约束 |
| `sop/05_constraints/p2-constraints.md` | P2 约束 |
| `sop/05_constraints/p3-constraints.md` | P3 约束 |

### 删除文件

| 文件路径 | 说明 |
|----------|------|
| `sop/01_concept_overview.md` | 合并到 AGENT_SOP.md |
| `sop/02_skill_matrix/` | 重构为 04_skills/ |

### 重构文件

| 旧路径 | 新路径 |
|--------|--------|
| `sop/03_workflow/` | `sop/03_workflow/`（内容重构） |
| `sop/skills/` | `sop/04_skills/` |
| `sop/04_reference/` | `sop/06_templates/` + `sop/07_reference/` |
| `sop/05_constraints/` | `sop/05_constraints/`（内容重构） |

---

## 五、验收标准

### 5.1 结构验收

- [ ] 新目录结构完整
- [ ] 旧文件清理完成
- [ ] 文件迁移正确

### 5.2 内容验收

- [ ] P0-P3 规范层级定义清晰
- [ ] 5 阶段流程完整
- [ ] 契约模板完整
- [ ] Skill 分类清晰

### 5.3 质量验收

- [ ] 所有链接有效
- [ ] 版本号统一（v3.0.0）
- [ ] 导航清晰（入口到任意文档 ≤3 跳）

---

**计划版本**: v2.0.0  
**创建时间**: 2026-02-28  
**预计工作量**: 3-4 小时
