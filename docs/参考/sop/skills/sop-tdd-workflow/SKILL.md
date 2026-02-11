---
name: "sop-tdd-workflow"
description: "TDD工作流定义。Invoke when 用户启用TDD测试驱动开发流程。"
---

# TDD 工作流 (可选)

> **版本**: v1.5.1

**类型**: 可选项  
**触发**: Router判断启用TDD时  
**位置**: `sop/skills/sop-tdd-workflow/SKILL.md`

---

## 概述

TDD (测试驱动开发) 作为深度路径的可选增强，在编码前先生成测试用例，确保测试覆盖所有设计场景。

**核心原则**: 测试独立，角色隔离，版本管理

---

## 工作流对比

### 标准深度路径
```
Analyst → Prometheus ↔ Skeptic → Oracle → Worker → Librarian
```

### TDD深度路径
```
Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Supervisor → Worker + TestWorker → Librarian
                                    ↓                 ↓
                              生成CSV测试用例      并行调度与依赖协调
```

---

## 角色职责与权限

| 角色 | 层级 | 职责 | 输出 | 权限 |
|------|------|------|------|------|
| **Tester** | L3 | **CSV唯一维护者**，基于L2/L3生成测试用例 | CSV测试用例 | **读写CSV** |
| **TestWorker** | L3 | **测试代码维护者**，基于CSV编写测试代码 | 测试代码 | **只读CSV，读写测试代码** |

### 权限隔离（关键）

| 文件 | Tester | TestWorker | 其他角色 |
|------|--------|------------|----------|
| CSV测试用例 | **✅ 读写（唯一）** | **❌ 只读** | 只读 |
| 测试代码 | 只读 | **✅ 读写（唯一）** | 只读 |

---

## 测试用例位置

`docs/03_technical_spec/test_cases/[module]_test_cases.csv`

与分层验收的关系（参见 05_constraints/acceptance_criteria.md）：
- CSV 是 **测试设计载体**（TDD 路径下的唯一用例来源）
- TestWorker 将 CSV 用例实现为验收测试代码（建议落地到 `tests/acceptance/l1-l4/`）
- Worker 仅运行测试，不创建/修改测试

---

## CSV格式
模板：04_reference/interaction_formats/test_case_csv.md

---

## 关键约束

### 测试用例来源
- **仅基于设计文档** (L2 `.md` + L3 `design.md`)
- **不参考代码实现**
- Tester不查看任何代码文件

### 测试代码来源
- **主要基于CSV测试用例**
- 仅参考代码实现获取接口细节
- **TestWorker禁止修改CSV**

### 追溯关系
```
L2原子操作 ←→ CSV测试用例 ←→ 测试代码
```

### 版本管理
- CSV必须包含版本号
- 每次变更更新版本号和日期
- 变更记录写在CSV头部注释

---

## 测试用例变更流程

当测试用例需要变更时：

```
发现需求 → Tester评估 → 更新CSV → 版本+1 → 通知TestWorker → TestWorker同步测试代码
```

### 变更场景

| 场景 | 处理流程 |
|------|----------|
| 设计变更 | Tester根据新设计更新CSV → 版本+1 → 通知TestWorker |
| 发现遗漏 | Tester补充用例 → 版本+1 → 通知TestWorker |
| 用例错误 | Tester修正 → 版本+1 → 通知TestWorker |
| TestWorker发现问题 | TestWorker报告Tester → Tester评估 → 如确认则更新CSV |

### 问题报告模板

```markdown
@Tester

**CSV问题报告**

**位置**: TC001, 输入数据字段
**问题**: 输入数据缺少必要字段"user_id"
**建议**: 补充"user_id"字段
**影响**: 测试代码无法正确执行
```

---

## 来源与依赖准则

- TDD 路径下的关键产物（CSV测试用例/测试代码/审查报告）必须包含“来源与依赖声明”（标准：04_reference/review_standards/source_dependency.standard.md），并优先用 `TRACE_SOURCES(inputs)` 固化
- 当关键来源/依赖缺口无法消解时，必须进入 `[USER_DECISION]`，并使用 `RECORD_DECISION(topic, decision)` 落盘决策记录

## 停止点

| 标记 | 触发 | 等待 |
|------|------|------|
| `[WAITING_FOR_TEST_DESIGN]` | Tester完成 | 用户确认测试设计 |
| `[WAITING_FOR_TEST_IMPLEMENTATION]` | TestWorker完成 | CodeReviewer进行测试代码审查 |

---

## 启用条件

Router在以下场景建议启用TDD:
- 核心业务模块
- 复杂逻辑场景
- 需要高测试覆盖度
- 团队有TDD实践

---

## 与标准路径的差异

| 方面 | 标准路径 | TDD路径 |
|------|----------|---------|
| 测试时机 | 编码后 | 编码前 |
| 测试来源 | 代码实现 | 设计文档 |
| 审核环节 | 无 | CSV人工审核 |
| 额外角色 | 无 | Tester + TestWorker（由 Supervisor 协调并行执行） |
| 权限隔离 | 无 | Tester/CSV, TestWorker/测试代码 |

---

## Prompts

- [Tester Prompt](../../prompts/tester_prompt.md) - CSV唯一维护者
- [TestWorker Prompt](../../prompts/test_worker_prompt.md) - 只读CSV，编写测试代码

---

## 模板

- [测试用例CSV模板](../../04_reference/document_templates/test_cases.csv)
