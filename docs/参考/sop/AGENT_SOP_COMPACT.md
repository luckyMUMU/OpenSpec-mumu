# AI Agent SOP 核心指令集

> **使用对象**: AI Agent | **目标**: 最小Token消耗 | **版本**: v5.6-compact

---

## 快速开始

```
接收任务 → Router分诊 → 选择路径 → 执行 → 完成
```

**路径选择**:
- 快速路径: 单文件 + <30行 + 无逻辑变更
- 深度路径: 其他所有情况

---

## 角色总览（9个）

| 角色 | 层级 | 职责 | 详情 |
|------|------|------|------|
| Router | 规划 | 任务分诊 | [→ 详情](prompts/router_prompt.md) |
| Explorer | 规划 | 代码审计 | [→ 详情](02_role_matrix/explorer.md) |
| Analyst | 需求 | 需求分析 | [→ 详情](prompts/analyst_prompt.md) |
| Prometheus | 设计 | 架构设计 | [→ 详情](prompts/prometheus_prompt.md) |
| Skeptic | 设计 | 架构审查 | [→ 详情](prompts/skeptic_prompt.md) |
| Oracle | 设计 | 实现设计 | [→ 详情](prompts/oracle_prompt.md) |
| Worker | 实现 | 编码实现 | [→ 详情](prompts/worker_prompt.md) |
| Librarian | 监管 | 文档维护 | [→ 详情](02_role_matrix/librarian.md) |
| Supervisor | 监管 | 进度监管 | [→ 详情](02_role_matrix/supervisor.md) |

**完整角色卡**: [ROLE_CHEATSHEET.md](ROLE_CHEATSHEET.md)

---

## 工作流概览

### 深度路径
```
新项目/大重构: Analyst → Prometheus ↔ Skeptic → Oracle → Worker → Librarian
功能迭代:      Analyst → Oracle → Worker → Librarian
```

### 快速路径
```
Explorer → Worker → Librarian
```

**详细流程**: [03_workflow/](03_workflow/)

---

## 停止点速查

| 阶段 | 停止点标记 | 等待内容 |
|------|-----------|----------|
| Analyst | `[WAITING_FOR_REQUIREMENTS]` | 用户确认PRD |
| Prometheus | `[WAITING_FOR_ARCHITECTURE]` | 架构审批 |
| Skeptic | `[ARCHITECTURE_PASSED]` | 审查通过 |
| Oracle | `[WAITING_FOR_DESIGN]` | 设计审批 |
| Worker | Diff展示 | 用户审批代码 |

---

## 三错即停

| Strike | 触发条件 | 行动 |
|--------|----------|------|
| 1 | Worker失败 | 自动修正 |
| 2 | 再次失败 | @Explorer+@Oracle |
| 3 | 第三次失败 | **熔断**,生成FAILURE_REPORT |

**详细规则**: [03_workflow/three_strike_rule.md](03_workflow/three_strike_rule.md)

---

## 文档位置

| 文档类型 | 位置 | 创建者 |
|----------|------|--------|
| PRD | `docs/01_requirements/*.md` | Analyst |
| 架构设计 | `docs/02_logical_workflow/*.pseudo` | Prometheus |
| 实现设计 | `src/**/design.*` | Oracle |

**文档模板**: [04_reference/document_templates/](04_reference/document_templates/)

---

## 关键约束

1. **文档先行**: 先标记`[进行中]`,再改代码
2. **渐进披露**: 父目录只保留摘要+链接
3. **状态标记**: `[进行中]`→`[已完成]`
4. **权限隔离**: 各角色只操作授权范围

---

**完整文档**: [AGENT_SOP.md](AGENT_SOP.md)
