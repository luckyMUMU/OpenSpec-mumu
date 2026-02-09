# 状态字典

> **版本**: v1.4.0  
> **更新日期**: 2026-02-09

---

## 目的

本文件定义 SOP 全部状态标记的**唯一来源**（Single Source of Truth）。

约束：
- 文档、Prompt、技能说明中的状态标记必须引用本字典
- 新增/变更状态必须先更新本字典，再更新引用方

---

## 全局停止点（Global Stop Points）

| 状态 | 触发者 | 含义 | 继续条件 |
|------|--------|------|----------|
| `[WAITING_FOR_REQUIREMENTS]` | Analyst | 需求文档已完成，等待确认 | 用户确认需求 |
| `[WAITING_FOR_ARCHITECTURE]` | Prometheus | 架构设计已完成，等待确认 | 用户确认架构 |
| `[WAITING_FOR_DESIGN]` | Oracle | 实现设计已完成，等待确认 | 用户确认设计 |

---

## 架构审查结果（Architecture Review Result）

| 状态 | 触发者 | 含义 | 后续动作 |
|------|--------|------|----------|
| `[ARCHITECTURE_PASSED]` | Skeptic | 架构审查通过 | 进入实现设计阶段（Oracle） |

---

## 测试相关停止点（Test Stop Points）

| 状态 | 触发者 | 含义 | 继续条件 |
|------|--------|------|----------|
| `[WAITING_FOR_TEST_DESIGN]` | Tester | 测试设计（用例）已完成，等待确认 | 用户确认测试设计 |
| `[WAITING_FOR_TEST_IMPLEMENTATION]` | TestWorker | 测试代码已完成，等待确认 | 用户确认测试实现 |
| `[WAITING_FOR_TEST_CREATION]` | Worker → 用户 | 测试不充分，暂停编码等待决策 | 用户选择：补充测试/继续/暂停 |

兼容性：
- `[WAITING_FOR_TEST_REVIEW]` 视为 `[WAITING_FOR_TEST_DESIGN]` 的历史别名；新文档统一使用 `[WAITING_FOR_TEST_DESIGN]`

---

## 分层验收审查点（L1-L4 Review Points）

| 状态 | 触发者 | 含义 | 审查者 |
|------|--------|------|--------|
| `[WAITING_FOR_L1_REVIEW]` | Worker | L1 验收测试通过，等待审查 | Oracle |
| `[WAITING_FOR_L2_REVIEW]` | Worker | L2 验收测试通过，等待审查 | Oracle |
| `[WAITING_FOR_L3_REVIEW]` | Worker | L3 验收测试通过，等待审查 | Analyst + Oracle |
| `[WAITING_FOR_L4_REVIEW]` | Worker | L4 验收测试通过，等待审查 | Prometheus + Analyst + Oracle |

---

## 目录执行状态（Directory Execution States）

| 状态 | 触发者 | 含义 | 典型场景 |
|------|--------|------|----------|
| `[DIR_WORKING]` | Worker | 正在处理当前目录 | 开始执行当前目录任务 |
| `[DIR_WAITING_DEP]` | Worker | 等待依赖目录完成 | 依赖目录尚未 `[DIR_COMPLETED]` |
| `[DIR_COMPLETED]` | Worker | 当前目录处理完成 | 变更完成并通过必要验证 |
| `[DIR_FAILED]` | Worker | 当前目录处理失败 | 失败无法恢复或熔断前置 |

---

## 跨目录依赖请求状态（Dependency Request States）

| 状态 | 触发者 | 含义 | 继续条件 |
|------|--------|------|----------|
| `[WAITING_FOR_WORKER]` | Supervisor | 依赖请求已发出，等待目标目录 Worker 处理 | 目标目录完成处理并回报 |

---

## Supervisor 协调状态（Supervisor Coordination States）

| 状态 | 触发者 | 含义 | 继续条件 |
|------|--------|------|----------|
| `[SCHEDULING]` | Supervisor | 正在创建目录-Worker 映射与调度计划 | 进入并行执行或依赖等待 |
| `[PARALLEL_EXECUTING]` | Supervisor | 多 Worker 并行执行中 | 所有目录进入完成/等待 |
| `[WAITING_DEPENDENCY]` | Supervisor | 存在目录依赖等待中 | 依赖目录完成后继续 |
| `[ALL_COMPLETED]` | Supervisor | 所有目录处理完成 | 进入收尾/文档同步 |

---

## 人工确认点（Manual Approval Points）

| 标记 | 触发者 | 含义 | 继续条件 |
|------|--------|------|----------|
| Diff展示 | Worker | 展示变更 Diff，等待人工审批 | 用户审批通过 |

---

## 熔断状态（Fusion State）

| 状态 | 触发者 | 含义 | 恢复条件 |
|------|--------|------|----------|
| `[FUSION_TRIGGERED]` | Supervisor | 连续失败触发熔断，停止执行 | 用户决策 + 方案调整 + 重置计数器 |
