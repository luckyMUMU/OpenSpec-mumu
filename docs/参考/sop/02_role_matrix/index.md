# 角色矩阵

## 角色总览

| 角色 | 层级 | 职责 | 权限 |
|------|------|------|------|
| Router | 规划 | 任务分诊 | 全局Read，分发指令 |
| Explorer | 规划 | 代码审计 | 仅Read |
| Analyst | 需求 | 需求分析，PRD生成 | 读写需求文档 |
| Prometheus | 设计 | 架构设计 | 读写架构文档 |
| Skeptic | 设计 | 架构审查 | 写入审查意见 |
| Oracle | 设计 | 实现设计 | 读写实现文档 |
| Worker | 实现 | 编码实现 | Full-Write |
| Librarian | 监管 | 文档维护 | 仅文档文件 |
| Supervisor | 监管 | 进度监管，熔断决策 | 状态更新 |

---

## 权限矩阵

| 操作 | Router | Explorer | Analyst | Prometheus | Skeptic | Oracle | Librarian | Worker | Supervisor |
|------|--------|----------|---------|------------|---------|--------|-----------|--------|------------|
| 读代码 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 改代码 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| 读需求 | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ |
| 改需求 | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| 读架构 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 改架构 | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| 写审查 | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| 读实现 | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ |
| 改实现 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| 触发熔断 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 工作流

### 深度路径
```
新项目: Analyst → Prometheus ↔ Skeptic → Oracle → Worker → Librarian
功能迭代: Analyst → Oracle → Worker → Librarian
```

### 快速路径
```
Explorer → Worker → Librarian
```

---

## 停止点

| 标记 | 触发 | 等待 |
|------|------|------|
| `[WAITING_FOR_REQUIREMENTS]` | Analyst完成 | 用户确认PRD |
| `[WAITING_FOR_ARCHITECTURE]` | Prometheus完成 | 架构审批 |
| `[ARCHITECTURE_PASSED]` | Skeptic通过 | - |
| `[WAITING_FOR_DESIGN]` | Oracle完成 | 设计审批 |
| Diff展示 | Worker完成 | 用户审批代码 |
