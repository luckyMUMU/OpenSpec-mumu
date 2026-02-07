# 工作流规范

## 路径选择

| 路径 | 条件 |
|------|------|
| 快速 | 单文件+<30行+无逻辑变更 |
| 深度 | 其他所有情况 |
| TDD | 深度+启用TDD(可选) |

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

👉 [快速路径详情](fast_path.md)

---

## 深度路径

### 新项目/大重构
```
Analyst → Prometheus ↔ Skeptic → Oracle → Worker → Librarian
```

### 功能迭代
```
Analyst → Oracle → Worker → Librarian
```

| 阶段 | 输入 | 输出 | 停止点 |
|------|------|------|--------|
| Analyst | 用户描述 | PRD | `[WAITING_FOR_REQUIREMENTS]` |
| Prometheus | PRD | 架构设计 | `[WAITING_FOR_ARCHITECTURE]` |
| Skeptic | 架构设计 | 审查报告 | `[ARCHITECTURE_PASSED]` |
| Oracle | 架构设计 | 实现设计 | `[WAITING_FOR_DESIGN]` |
| Worker | 实现设计 | 代码 | Diff展示 |
| Librarian | 代码 | 文档更新 | `[已完成]` |

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

| 标记 | 触发 | 等待 |
|------|------|------|
| `[WAITING_FOR_REQUIREMENTS]` | Analyst完成 | 用户确认PRD |
| `[WAITING_FOR_ARCHITECTURE]` | Prometheus完成 | 架构审批 |
| `[ARCHITECTURE_PASSED]` | Skeptic通过 | - |
| `[WAITING_FOR_DESIGN]` | Oracle完成 | 设计审批 |
| `[WAITING_FOR_TEST_REVIEW]` | Tester完成 | 人工审核CSV |
| Diff展示 | Worker完成 | 用户审批代码 |
