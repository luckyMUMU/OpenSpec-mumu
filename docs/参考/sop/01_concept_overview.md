# SOP 核心概念

> **版本**: v1.4.0  
> **更新日期**: 2026-02-09

**定义**: AI辅助开发工作流标准

**核心原则**:
1. 准度>速度 - 严禁跳步，失败熔断
2. 文档先行 - 先标记`[进行中]`，再改代码
3. 渐进披露 - 按需获取信息
4. 少即是多 - 先复用→改进→新建→清理
5. 测试独立 - 测试用例与代码分离，专人维护
6. 目录维度 - Worker 按 design.md 目录并行执行

---

## 渐进披露 (L1-L4)

| 层级 | 内容 | 位置 |
|------|------|------|
| L1 | 概念 | 本页 |
| L2 | 角色 | [角色矩阵](02_role_matrix/index.md) |
| L3 | 流程 | [工作流](03_workflow/index.md) |
| L4 | 模板 | [参考文档](04_reference/index.md) |

---

## 角色概览 (11个角色)

| 角色 | 层级 | 核心职责 | 工作范围 |
|------|------|----------|----------|
| Router | 规划 | 任务分诊、路径选择 | 全局 |
| Explorer | 规划 | 代码审计、影响评估 | 全局 |
| Analyst | 需求 | 需求挖掘、多级PRD生成 | 全局 |
| Prometheus | 设计 | 架构设计、伪代码编写 | 全局 |
| Skeptic | 设计 | 架构审查、质量把控 | 全局 |
| Oracle | 设计 | 实现设计、技术选型 | 按目录 |
| **Tester** | **设计** | **CSV测试用例唯一维护者** | 按目录 |
| **Worker** | **实现** | **物理编码、质量检查** | **design.md 所在目录** |
| **TestWorker** | **实现** | **基于CSV编写测试代码** | **design.md 所在目录** |
| Librarian | 监管 | 文档维护、索引更新 | 全局 |
| **Supervisor** | **监管** | **进度监管、熔断决策、并行协调** | **全局协调** |

👉 [详细角色定义](02_role_matrix/index.md)

---

## 目录维度工作范围

### Worker 工作范围定义

Worker 以 `design.md` 所在目录为工作边界：

```
Worker 工作范围 = design.md 所在目录及其子目录（不含嵌套 design.md 的子目录）
```

**示例**：
```
src/
├── module_a/
│   ├── design.md          ← Worker A 负责
│   ├── src/
│   └── utils/
├── module_b/
│   ├── design.md          ← Worker B 负责
│   └── src/
└── shared/
    └── design.md          ← Worker C 负责
```

### 目录层级处理顺序

```
1. 扫描所有 design.md 文件，记录路径和深度
2. 按深度降序排序（深度大的优先）
3. 同深度目录可并行处理
4. 父目录等待所有子目录完成后才能开始
```

**处理顺序示例**：
```
深度 3: src/core/utils/design.md      → 第一批并行
深度 3: src/core/helpers/design.md    → 第一批并行
深度 2: src/core/design.md            → 第二批（等待第一批）
深度 2: src/api/design.md             → 第二批并行
深度 1: src/design.md                 → 第三批（等待第二批）
```

👉 [目录维度工作策略详情](04_reference/design_directory_strategy.md)

---

## 三错即停

| Strike | 条件 | 行动 |
|--------|------|------|
| 1 | 失败 | 自动修正 |
| 2 | 再失败 | 审计+微调 |
| 3 | 再失败 | **熔断** |

---

## 路径选择

| 路径 | 条件 | 说明 |
|------|------|------|
| **快速** | 单文件+<30行+无逻辑变更 | 简单任务快速处理 |
| **深度** | 其他所有情况 | 复杂任务完整流程 |
| **TDD深度** | 深度+核心业务/复杂逻辑 | 测试驱动开发模式 |

### 三种路径对比

```
快速路径:   Explorer → Worker → Librarian

深度路径:   Analyst → Prometheus ↔ Skeptic → Oracle → Worker → Librarian

TDD深度:    Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Worker + TestWorker → Librarian
                                    ↓
                              生成CSV测试用例
```

---

## 版本号管理

### 版本号格式
```
v[主版本].[次版本].[修订版本]
```

### 版本号规则
| 版本位 | 变更类型 | 示例 |
|--------|----------|------|
| 主版本 | 架构重大变更、角色体系重构 | v5→v6 |
| 次版本 | 新增角色、新增工作流、新增文档类型 | v6.0→v6.1 |
| 修订版本 | 文档修正、错误修复、格式统一 | v6.0.0→v6.0.1 |

### 当前版本
**v6.0.0** - 引入TDD工作流、需求分层、测试独立性

👉 [查看版本历史](CHANGELOG.md)

---

## 导航

| 文档 | 用途 |
|------|------|
| [AGENT_SOP.md](AGENT_SOP.md) | 入口：约束+指令+导航 |
| [ROLE_CHEATSHEET.md](ROLE_CHEATSHEET.md) | 速查：角色+路径+规则 |
| [CHANGELOG.md](CHANGELOG.md) | 版本历史 |
| [Prompts](prompts/) | AI角色指令 |
| [Skills](skills/) | 流程定义 |
