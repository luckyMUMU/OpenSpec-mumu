# 工作流规范

> **版本**: v1.2.0

## 路径选择

| 路径 | 条件 |
|------|------|
| 快速 | 单文件+<30行+无逻辑变更 |
| 深度 | 其他所有情况 |
| TDD | 深度+启用TDD(可选) |

---

## 目录维度执行

### 核心原则

Worker 以 `design.md` 所在目录为工作范围，按目录深度自底向上并行执行：

```
1. Explorer 分析目录结构，识别所有 design.md
2. Supervisor 按目录深度排序，创建目录-Worker 映射
3. 同深度目录并行启动 Worker
4. Worker 处理完当前目录后通知 Supervisor
5. Supervisor 唤醒等待依赖的 Worker
```

### 并行执行规则

| 场景 | 执行方式 | 说明 |
|------|----------|------|
| 同深度无依赖 | **并行** | 多个 Worker 同时执行 |
| 同深度有依赖 | 串行 | 按依赖顺序执行 |
| 父子目录 | 串行 | 子目录完成后父目录才能开始 |
| 跨模块依赖 | 协调 | 通过 Supervisor 协调 |

👉 [目录维度工作策略详情](../04_reference/design_directory_strategy.md)

---

## 快速路径

```
Explorer → Worker → Librarian
```

| 阶段 | 输入 | 输出 | 停止点 |
|------|------|------|--------|
| Explorer | 目标文件 | 审计报告 | - |
| Worker | 审计报告 | 代码修改 | Diff展示 |
| Librarian | 代码修改 | 文档更新 | `[已完成]` |

**注意**：快速路径不涉及多目录并行，单文件修改直接执行。

👉 [快速路径详情](fast_path.md)

---

## 深度路径

### 新项目/大重构（目录维度）

```
Analyst → Prometheus ↔ Skeptic → Oracle → Supervisor → [多 Worker 并行] → Librarian
                                              ↓
                                    按目录深度调度 Worker
```

### 功能迭代（目录维度）

```
Analyst → Oracle → Supervisor → [多 Worker 并行] → Librarian
                          ↓
                    按目录深度调度 Worker
```

| 阶段 | 输入 | 输出 | 停止点 | 工作范围 |
|------|------|------|--------|----------|
| Analyst | 用户描述 | PRD | `[WAITING_FOR_REQUIREMENTS]` | 全局 |
| Prometheus | PRD | 架构设计 | `[WAITING_FOR_ARCHITECTURE]` | 全局 |
| Skeptic | 架构设计 | 审查报告 | `[ARCHITECTURE_PASSED]` | 全局 |
| Oracle | 架构设计 | 实现设计 | `[WAITING_FOR_DESIGN]` | 按目录 |
| **Supervisor** | **实现设计** | **目录-Worker 映射** | **调度执行** | **全局协调** |
| **Worker** | **design.md** | **代码** | **Diff展示** | **design.md 所在目录** |
| Librarian | 代码 | 文档更新 | `[已完成]` | 全局 |

👉 [深度路径详情](deep_path.md)

---

## TDD深度路径 (可选)

```
Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Worker + TestWorker → Librarian
                                    ↓
                              生成CSV测试用例
```

| 阶段 | 输入 | 输出 | 停止点 |
|------|------|------|--------|
| Tester | L2+L3设计 | CSV测试用例 | `[WAITING_FOR_TEST_REVIEW]` |
| Worker | 实现设计 | 代码 | Diff展示 |
| TestWorker | CSV+代码 | 测试代码 | - |

**启用条件**: 核心业务/复杂逻辑/高覆盖要求

**测试用例来源**: 仅基于设计文档，不参考代码

**测试代码来源**: 主要基于CSV，仅参考代码接口

👉 [TDD工作流详情](../skills/sop-tdd-workflow/SKILL.md)

---

## 三错即停

| Strike | 条件 | 行动 |
|--------|------|------|
| 1 | Worker失败 | 自动修正 |
| 2 | 再失败 | @Explorer+@Oracle审计+微调 |
| 3 | 再失败 | **熔断**，生成报告 |

👉 [三错即停详情](three_strike_rule.md)

---

## 停止点

### 常规停止点

| 标记 | 触发 | 等待 |
|------|------|------|
| `[WAITING_FOR_REQUIREMENTS]` | Analyst完成 | 用户确认PRD |
| `[WAITING_FOR_ARCHITECTURE]` | Prometheus完成 | 架构审批 |
| `[ARCHITECTURE_PASSED]` | Skeptic通过 | - |
| `[WAITING_FOR_DESIGN]` | Oracle完成 | 设计审批 |
| `[WAITING_FOR_TEST_REVIEW]` | Tester完成 | 人工审核CSV |
| Diff展示 | Worker完成 | 用户审批代码 |

### 目录维度状态标记

| 标记 | 触发 | 说明 |
|------|------|------|
| `[DIR_WORKING]` | Worker 开始处理 | 当前目录正在处理中 |
| `[DIR_WAITING_DEP]` | Worker 遇到依赖 | 等待依赖目录完成 |
| `[DIR_COMPLETED]` | Worker 完成 | 当前目录处理完成 |
| `[DIR_FAILED]` | Worker 失败 | 当前目录处理失败 |

### Supervisor 协调标记

| 标记 | 触发 | 说明 |
|------|------|------|
| `[SCHEDULING]` | Supervisor 开始调度 | 正在创建目录-Worker 映射 |
| `[PARALLEL_EXECUTING]` | 多 Worker 并行 | 同深度目录并行执行中 |
| `[WAITING_DEPENDENCY]` | 依赖等待 | 有 Worker 等待依赖完成 |
| `[ALL_COMPLETED]` | 全部完成 | 所有目录处理完成 |
