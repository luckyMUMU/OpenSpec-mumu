# 工作流规范

## 路径选择

| 路径 | 条件 |
|------|------|
| 快速 | 单文件+<30行+无逻辑变更 |
| 深度 | 其他所有情况 |

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

---

## 三错即停

| Strike | 条件 | 行动 |
|--------|------|------|
| 1 | Worker失败 | 自动修正 |
| 2 | 再失败 | @Explorer+@Oracle审计+微调 |
| 3 | 再失败 | **熔断**，生成报告 |

---

## 场景速查

| 场景 | 路径 | 预计时间 |
|------|------|----------|
| 修复拼写 | 快速 | 5分钟 |
| 添加日志 | 快速 | 10分钟 |
| 新增功能 | 深度 | 1-3天 |
| 重构代码 | 深度 | 2-5天 |
| 架构调整 | 深度 | 1-2周 |
