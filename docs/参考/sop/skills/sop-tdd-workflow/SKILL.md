---
name: "sop-tdd-workflow"
description: "TDD工作流定义。Invoke when 用户启用TDD测试驱动开发流程。"
---

# TDD 工作流 (可选)

> **版本**: v1.1.0

**类型**: 可选项  
**触发**: Router判断启用TDD时  
**位置**: `skills/sop-tdd-workflow/SKILL.md`

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
Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Worker + TestWorker → Librarian
                                    ↓
                              生成CSV测试用例
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

```
docs/03_technical_spec/test_cases/
├── [module]_test_cases.csv      # 测试用例 (Tester唯一维护)
└── [module]_test_plan.md        # 测试计划 (可选)
```

---

## CSV格式

```csv
# 版本: v1.0
# 更新日期: 2024-01-15
# 变更: 初始创建
# 变更人: Tester
ID,模块,功能点,测试场景,前置条件,输入数据,预期输出,优先级,类型,状态,关联L2原子操作,版本,更新日期,备注
TC001,订单,创建,正常流程,用户登录,"{product:A,qty:1}","{status:success}",P0,正向,待实现,PROCESS_ORDER,v1.0,2024-01-15,
TC002,订单,创建,库存不足,用户登录,"{product:B,qty:100}","{error:OUT_OF_STOCK}",P1,异常,待实现,VALIDATE_INVENTORY,v1.0,2024-01-15,
```

### 字段说明

| 字段 | 说明 | 示例 |
|------|------|------|
| ID | 唯一标识 | TC001 |
| 模块 | 功能模块 | 订单 |
| 功能点 | 具体功能 | 创建订单 |
| 测试场景 | 场景描述 | 正常流程-单商品 |
| 前置条件 | 执行条件 | 用户已登录 |
| 输入数据 | JSON格式 | `{"product":"A"}` |
| 预期输出 | JSON格式 | `{"status":"success"}` |
| 优先级 | P0/P1/P2 | P0 |
| 类型 | 正向/异常/边界 | 正向 |
| 状态 | 待实现/已实现/已废弃 | 待实现 |
| 关联L2原子操作 | 映射到L2 | `PROCESS_ORDER` |
| 版本 | CSV版本号 | v1.0 |
| 更新日期 | 更新日期 | 2024-01-15 |
| 备注 | 补充说明 | 需验证库存 |

---

## 关键约束

### 测试用例来源
- **仅基于设计文档** (L2 `.pseudo` + L3 `design.md`)
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

## 停止点

| 标记 | 触发 | 等待 |
|------|------|------|
| `[WAITING_FOR_TEST_REVIEW]` | Tester完成 | 人工审核CSV |
| `[TEST_CASES_APPROVED]` | 审核通过 | - |

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
| 额外角色 | 无 | Tester + TestWorker |
| 权限隔离 | 无 | Tester/CSV, TestWorker/测试代码 |

---

## Prompts

- [Tester Prompt](../../prompts/tester_prompt.md) - CSV唯一维护者
- [TestWorker Prompt](../../prompts/test_worker_prompt.md) - 只读CSV，编写测试代码

---

## 模板

- [测试用例CSV模板](../../04_reference/document_templates/test_cases.csv)
