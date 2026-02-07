# AI Agent SOP (v5.6)

> AI Agent专用 | 命令式指令 | 最小Token

---

## 核心约束

1. 先标记`[进行中]`,再改代码
2. 父目录只保留摘要+链接
3. `[进行中]`→`[已完成]`
4. 各角色只操作授权范围
5. 先复用已有能力→优先改进→新建后清理过时/相似代码

---

## 路径选择

```
接收任务 → Router分诊 → 选择路径 → 执行 → 完成
```

| 路径 | 条件 |
|------|------|
| 快速 | 单文件+<30行+无逻辑变更 |
| 深度 | 其他所有情况 |

---

## 角色指令

| 角色 | 指令 | 输入 | 输出 | 下一步 |
|------|------|------|------|--------|
| Router | 任务分诊 | 用户请求 | 路径选择+角色分配 | 调用对应角色 |
| Explorer | 代码审计 | 目标文件 | 影响范围报告 | Router重分配 |
| Analyst | 需求分析 | 用户描述 | PRD | `[WAITING_FOR_REQUIREMENTS]` |
| Prometheus | 架构设计 | PRD | 架构设计文档 | `[WAITING_FOR_ARCHITECTURE]` |
| Skeptic | 架构审查 | 架构设计 | 审查报告 | `[ARCHITECTURE_PASSED]` |
| Oracle | 实现设计 | 架构设计 | 实现设计文档 | `[WAITING_FOR_DESIGN]` |
| Worker | 编码实现 | 实现设计 | 代码+测试 | `[已完成]` |
| Librarian | 文档管理 | 设计文档 | 索引更新 | - |
| Supervisor | 进度监管 | 执行状态 | 熔断决策 | - |

---

## 工作流

### 深度路径
```
新项目/大重构: Analyst → Prometheus ↔ Skeptic → Oracle → Worker → Librarian
功能迭代:      Analyst → Oracle → Worker → Librarian
```

### 快速路径
```
Explorer → Worker → Librarian
```

---

## 停止点

| 标记 | 触发条件 | 等待 |
|------|----------|------|
| `[WAITING_FOR_REQUIREMENTS]` | Analyst完成 | 用户确认PRD |
| `[WAITING_FOR_ARCHITECTURE]` | Prometheus完成 | 架构审批 |
| `[ARCHITECTURE_PASSED]` | Skeptic通过 | - |
| `[WAITING_FOR_DESIGN]` | Oracle完成 | 设计审批 |
| Diff展示 | Worker完成 | 用户审批代码 |

---

## 三错即停

| Strike | 条件 | 行动 |
|--------|------|------|
| 1 | Worker失败 | 自动修正 |
| 2 | 再次失败 | @Explorer+@Oracle审计+微调 |
| 3 | 第三次失败 | **熔断**,生成FAILURE_REPORT |

---

## 文档位置

| 类型 | 位置 | 创建者 |
|------|------|--------|
| PRD | `docs/01_requirements/*.md` | Analyst |
| 架构设计 | `docs/02_logical_workflow/*.pseudo` | Prometheus |
| 实现设计 | `src/**/design.md` 或 `docs/**/design.md` | Oracle |

**约束**: `/docs/参考/` **非指定不变更**

---

## design.md规则

- 基于模块划分: 每个独立模块根目录创建
- 基于复杂度:
  - 低(<100行): 省略,代码注释
  - 中(100-500行): 简要design.md+接口契约
  - 高(>500行): 完整design.md+详细契约
- 必须包含: 输入/输出/依赖接口定义

---

## 快速导航

| 层级 | 文档 |
|------|------|
| L1 | [核心概念](./01_concept_overview.md) |
| L2 | [角色矩阵](./02_role_matrix/index.md) |
| L3 | [工作流](./03_workflow/index.md) |
| L4 | [参考文档](./04_reference/index.md) |

---

## 完整索引

```
sop/
├── AGENT_SOP.md / AGENT_SOP_COMPACT.md
├── ROLE_CHEATSHEET.md
├── 01_concept_overview.md
├── 02_role_matrix/
├── 03_workflow/
├── 04_reference/
├── prompts/
└── skills/
```
