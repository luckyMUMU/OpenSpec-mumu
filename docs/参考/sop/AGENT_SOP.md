# AI 项目通用规约 (Minimalist v5.6)

**一句话定义**：一套用于规范 AI 辅助开发的通用工作流标准，采用渐进式披露的信息架构。

**核心原则**：
- **准度 > 速度**：严禁跳步，重复失败立即熔断
- **文档先行**：先变更文档（标记变更），再修改代码
- **渐进披露**：按需获取信息，避免信息过载

👉 [查看核心概念详解](./01_concept_overview.md)

---

## 快速导航

| 层级 | 内容 | 适用场景 |
|------|------|----------|
| **L1** | [核心概念与价值](./01_concept_overview.md) | 快速了解规约全貌 |
| **L2** | [角色矩阵](./02_role_matrix/index.md) | 了解各角色职责与权限 |
| **L3** | [工作流规范](./03_workflow/index.md) | 执行具体开发任务 |
| **L4** | [参考文档](./04_reference/index.md) | 查阅模板和技术细节 |

---

## 角色总览（9个）

👉 [查看完整角色矩阵](./02_role_matrix/index.md)

| 角色 | 层级 | 一句话职责 |
|------|------|-----------|
| **Router** | 规划 | 任务分诊与调度 |
| **Explorer** | 规划 | 代码审计与影响评估 |
| **Analyst** | 需求 | 需求分析与 PRD 生成 |
| **Prometheus** | 设计 | 架构设计与伪代码编写 |
| **Skeptic** | 设计 | 架构审查与质疑 |
| **Oracle** | 设计 | 实现设计与方案对比 |
| **Worker** | 实现 | 物理编码与质量检查 |
| **Librarian** | 监管 | 文档索引与渐进披露维护 |
| **Supervisor** | 监管 | 进度监管与熔断决策 |

---

## 工作流概览

👉 [查看工作流详情](./03_workflow/index.md)

### 快速路径 (Fast Path)
**适用**：单文件、小范围、无逻辑变更

```
Explorer → Worker → Librarian
```

### 深度路径 (Deep Path)
**适用**：跨文件、新功能、重构、API 变更

```
新项目/大重构：
Analyst → Prometheus ↔ Skeptic (多轮审查) → Oracle → Worker → Librarian

功能迭代：
Analyst → Oracle → Worker → Librarian
```

---

## 三错即停

👉 [查看三错即停详情](./03_workflow/three_strike_rule.md)

- **Strike 1**: 分析报错，执行修正
- **Strike 2**: 停止编码，审计环境，微调方案
- **Strike 3**: **熔断** - Supervisor 介入，生成报告，等待用户决策

---

## 文档类型

👉 [查看文档模板](./04_reference/index.md)

| 文档类型 | 位置 | 创建者 | 特点 |
|----------|------|--------|------|
| PRD | `docs/01_requirements/*.md` | Analyst | 业务导向 |
| 架构设计 | `docs/02_logical_workflow/*.pseudo` | Prometheus | 技术无关 |
| 实现设计 | `src/**/design.*` | Oracle | 项目特定 |

---

## 开始使用

### 新用户
1. 阅读 [L1: 核心概念](./01_concept_overview.md) 了解全貌
2. 查看 [L2: 角色矩阵](./02_role_matrix/index.md) 了解分工
3. 根据任务类型选择 [L3: 工作流](./03_workflow/index.md)

### 老用户
- 直接跳转到需要的层级查阅细节
- 使用 [L4: 参考文档](./04_reference/index.md) 查找模板

---

## 版本信息

- **当前版本**: v5.6
- **最后更新**: 2026-02-07
- **主要变更**: 重构为渐进式披露结构

---

## 完整文档索引

```
docs/参考/sop/
├── AGENT_SOP.md                    # 本文件：入口和导航
├── AGENT_SOP_COMPACT.md            # 紧凑版：AI Agent核心指令
├── ROLE_CHEATSHEET.md              # 角色速查卡
├── 01_concept_overview.md          # L1: 核心概念与价值
├── 02_role_matrix/                 # L2: 角色定义与职责
│   ├── index.md                   # 角色矩阵总览
│   ├── router.md                  # 任务分诊角色
│   ├── explorer.md                # 代码审计角色
│   ├── analyst.md                 # 需求分析角色
│   ├── prometheus.md              # 架构设计角色
│   ├── skeptic.md                 # 架构审查角色
│   ├── oracle.md                  # 实现设计角色
│   ├── worker.md                  # 编码实现角色
│   ├── supervisor.md              # 进度监管角色
│   └── librarian.md               # 文档管理角色
├── 03_workflow/                    # L3: 工作流详细规范
│   ├── index.md                   # 工作流总览
│   ├── fast_path.md               # 快速路径
│   ├── deep_path.md               # 深度路径
│   └── three_strike_rule.md       # 三错即停机制
├── 04_reference/                   # L4: 参考文档与模板
│   ├── index.md                   # 参考文档首页
│   └── document_templates/        # 文档模板
│       ├── prd.md
│       ├── architecture_design.md
│       └── implementation_design.md
└── prompts/                        # AI Agent提示词
    ├── router_prompt.md
    ├── analyst_prompt.md
    ├── prometheus_prompt.md
    ├── skeptic_prompt.md
    ├── oracle_prompt.md
    └── worker_prompt.md
```
