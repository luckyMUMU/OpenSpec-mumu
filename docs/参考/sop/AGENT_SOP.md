# AI Agent SOP

> AI Agent专用 | 命令式 | 最小Token

---

## 核心约束

1. 先标记`[进行中]`，再改代码
2. 父目录只保留摘要+链接
3. `[进行中]`→`[已完成]`
4. 各角色只操作授权范围
5. 先复用→改进→新建→清理

---

## 路径选择

| 路径 | 条件 |
|------|------|
| 快速 | 单文件+<30行+无逻辑变更 |
| 深度 | 其他所有情况 |
| TDD | 深度+启用TDD(可选) |

---

## 角色指令

| 角色 | 职责 | 输入 | 输出 | 停止点 |
|------|------|------|------|--------|
| Router | 任务分诊 | 用户请求 | 路径+角色分配 | - |
| Explorer | 代码审计 | 目标文件 | 审计报告 | - |
| Analyst | 需求分析 | 用户描述 | **多级需求** | `[WAITING_FOR_REQUIREMENTS]` |
| Prometheus | 架构设计 | PRD | 架构设计 | `[WAITING_FOR_ARCHITECTURE]` |
| Skeptic | 架构审查 | 架构设计 | 审查报告 | `[ARCHITECTURE_PASSED]` |
| Oracle | 实现设计 | 架构设计 | 实现设计 | `[WAITING_FOR_DESIGN]` |
| Tester | 生成测试用例 | 设计文档 | CSV测试用例 | `[WAITING_FOR_TEST_REVIEW]` |
| Worker | 编码实现 | 实现设计 | 代码 | Diff展示 |
| TestWorker | 编写测试代码 | CSV+代码 | 测试代码 | - |
| Librarian | 文档维护 | 设计文档 | 索引更新 | `[已完成]` |
| Supervisor | 进度监管 | 执行状态 | 熔断决策 | `[FUSION_TRIGGERED]` |

---

## 工作流

**深度路径**
```
新项目: Analyst → Prometheus ↔ Skeptic → Oracle → Worker → Librarian
功能迭代: Analyst → Oracle → Worker → Librarian
```

**TDD深度路径** (可选)
```
Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Worker + TestWorker → Librarian
                                    ↓
                              生成CSV测试用例
```

**快速路径**
```
Explorer → Worker → Librarian
```

---

## 三错即停

| Strike | 条件 | 行动 |
|--------|------|------|
| 1 | Worker失败 | 自动修正 |
| 2 | 再失败 | @Explorer+@Oracle审计+微调 |
| 3 | 再失败 | **熔断**，生成报告 |

---

## 文档位置

### 需求文档 (Analyst)
| 类型 | 位置 | 层级 | 创建者 |
|------|------|------|--------|
| 项目PRD | `docs/01_requirements/project_prd.md` | L1 | Analyst |
| 模块MRD | `docs/01_requirements/modules/[module]_mrd.md` | L2 | Analyst |
| 功能FRD | `docs/01_requirements/modules/[module]/[feature]_frd.md` | L3 | Analyst |
| 原型 | `docs/01_requirements/prototypes/[module]/` | L3 | Analyst |

### 设计文档
| 类型 | 位置 | 层级 | 创建者 |
|------|------|------|--------|
| 架构设计 | `docs/02_logical_workflow/*.pseudo` | L2 | Prometheus |
| 实现设计 | `src/**/design.md` | L3 | Oracle |
| 测试用例 | `docs/03_technical_spec/test_cases/*.csv` | L3 | Tester |
| 测试代码 | `tests/*.test.[ext]` | L3 | TestWorker |

**约束**: `/docs/参考/` **非指定不变更**

---

## 需求分层 (Analyst)

| 层级 | 文档 | 内容 | 触发条件 |
|------|------|------|----------|
| L1 | Project PRD | 项目愿景、模块清单 | 新项目 |
| L2 | Module MRD | 模块功能、边界 | 新模块 |
| L3 | Feature FRD | 功能详情、交互 | 新功能 |
| L3 | Prototype | 界面原型 | UI项目 |

👉 [需求分层详情](04_reference/index.md#l1-l3-需求分层-analyst)

---

## design.md规则

| 复杂度 | 行数 | 要求 |
|--------|------|------|
| 低 | <100 | 省略，代码注释 |
| 中 | 100-500 | 简要design.md+接口契约 |
| 高 | >500 | 完整design.md+详细契约 |

---

## TDD规则 (可选)

**启用条件**: 核心业务/复杂逻辑/高覆盖要求

**测试用例来源**: 仅基于设计文档 (L2+L3)，不参考代码

**测试代码来源**: 主要基于CSV，仅参考代码接口

👉 [TDD工作流详情](skills/sop-tdd-workflow/SKILL.md)

---

## 导航

| 层级 | 文档 |
|------|------|
| L1 | [核心概念](01_concept_overview.md) |
| L2 | [角色矩阵](02_role_matrix/index.md) |
| L3 | [工作流](03_workflow/index.md) |
| L4 | [参考文档](04_reference/index.md) |
| Prompts | [prompts/](prompts/) |
| Skills | [skills/](skills/) |
