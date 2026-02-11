# AI Agent SOP

> **版本**: v1.5.0  
> **更新日期**: 2026-02-11  
> AI Agent专用 | 命令式 | 最小Token

---

## 核心约束

1. 先标记`[进行中]`，再改代码
2. 父目录只保留摘要+链接
3. `[进行中]`→`[已完成]`
4. 各角色只操作授权范围
5. 先复用→改进→新建→清理
6. **Worker 按目录工作**: 以 design.md 所在目录为工作范围
7. **自底向上并行**: 按目录深度从深到浅并行执行

**禁止项矩阵**: [查看完整黑白名单](05_constraints/constraint_matrix.md)

---

## 路径选择

| 路径 | 条件 |
|------|------|
| 快速 | 单文件+<30行+无逻辑变更 |
| 深度 | 其他所有情况 |
| TDD | 深度+启用TDD(可选) |

---

## 角色指令

| 角色 | 职责 | 输入 | 输出 | 停止点 | 工作范围 |
|------|------|------|------|--------|----------|
| Router | 任务分诊 | 用户请求 | 路径+角色分配 | - | 全局 |
| Explorer | 代码审计 | 目标文件 | 审计报告 | - | 全局 |
| Analyst | 需求分析 | 用户描述 | **多级需求** | `[WAITING_FOR_REQUIREMENTS]` | 全局 |
| Prometheus | 架构设计 | PRD | 架构设计 | `[WAITING_FOR_ARCHITECTURE]` | 全局 |
| Skeptic | 架构审查 | 架构设计 | 审查报告 | `[ARCHITECTURE_PASSED]` | 全局 |
| Oracle | 实现设计 | 架构设计 | 实现设计 | `[WAITING_FOR_DESIGN]` | 按目录 |
| Tester | CSV测试用例唯一维护者，分层验收测试设计者 | 实现设计 | L1-L4测试设计 | `[WAITING_FOR_TEST_DESIGN]` | 按目录 |
| **Worker** | **编码实现** | **design.md** | **代码** | **`[WAITING_FOR_CODE_REVIEW]`** | **design.md 所在目录** |
| **TestWorker** | **实现验收测试代码** | **测试设计** | **L1-L4测试代码** | **`[WAITING_FOR_TEST_IMPLEMENTATION]`** | **design.md 所在目录** |
| **CodeReviewer** | **代码审查** | **Diff+设计文档** | **审查报告** | **`[WAITING_FOR_CODE_REVIEW]`** | **全局(只读代码/可写审查)** |
| Librarian | 文档维护 | 设计文档 | 索引更新 | `[已完成]` | 全局 |
| **Supervisor** | **进度监管+并行协调** | **执行状态** | **熔断决策** | **`[FUSION_TRIGGERED]`** | **全局协调** |

---

## 目录维度工作范围

### Worker 工作范围定义

Worker 以 `design.md` 所在目录为工作边界：

CMD: `WorkerScope(dir_with_design_md) = dir/** - {subdir/** | subdir contains design.md}`

参见：04_reference/design_directory_strategy.md + 05_constraints/command_dictionary.md

### 目录层级处理顺序

CMD: `LIST_DESIGN_MD(root) -> design_list`
CMD: `SCHEDULE_DIRS(design_list) -> dir_map`
CMD: `RUN_DIR_BATCH(depth_desc)`（同 depth 并行；父目录等待子目录 `DIR_COMPLETED`）

👉 [目录维度工作策略详情](04_reference/design_directory_strategy.md)

---

## 工作流

### 目录维度深度路径

**核心流程** (带并行执行)
```
Analyst → Prometheus ↔ Skeptic → Oracle → Supervisor → [多 Worker 并行] → CodeReviewer → Librarian
                                              ↓
                                    按目录深度调度 Worker
```

**目录并行执行流程**
```
1. Explorer 扫描目录结构，识别所有 design.md
2. Supervisor 按目录深度排序，创建目录-Worker 映射表
3. 按深度降序分批启动 Worker（同深度并行）
4. Worker 处理当前目录，遇到依赖则标记等待
5. Supervisor 监控进度，唤醒等待依赖的 Worker
6. Worker 完成实现后进入代码审查回路（CodeReviewer 驱动返工或放行）
7. 所有目录完成且代码审查通过后，Librarian 更新文档
```

### 标准深度路径（单目录）
```
新项目: Analyst → Prometheus ↔ Skeptic → Oracle → Worker → CodeReviewer → Librarian
功能迭代: Analyst → Oracle → Worker → CodeReviewer → Librarian
```

### 分层验收深度路径 (推荐)
```
Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Supervisor → [多 Worker 并行] → CodeReviewer → Librarian
                                    ↓           ↓
                              设计验收测试    实现验收测试
```

**验收流程** (Worker执行)
CMD: `RUN_ACCEPTANCE(L1) -> [WAITING_FOR_L1_REVIEW] -> REVIEW_ACCEPTANCE(L1)`
CMD: `RUN_ACCEPTANCE(L2) -> [WAITING_FOR_L2_REVIEW] -> REVIEW_ACCEPTANCE(L2)`
CMD: `RUN_ACCEPTANCE(L3) -> [WAITING_FOR_L3_REVIEW] -> REVIEW_ACCEPTANCE(L3)`
CMD: `RUN_ACCEPTANCE(L4) -> [WAITING_FOR_L4_REVIEW] -> REVIEW_ACCEPTANCE(L4)`

参见：05_constraints/acceptance_criteria.md + 05_constraints/command_dictionary.md

**快速路径**
```
Explorer → Worker → CodeReviewer → Librarian
```

适用条件与升级红线参见：[快速路径](03_workflow/fast_path.md)

---

## 三错即停

| Strike | 条件 | 行动 |
|--------|------|------|
| 1 | Worker失败 | 自动修正 |
| 2 | 再失败 | @Explorer+@Oracle审计+微调 |
| 3 | 再失败 | **熔断**，生成报告 |

---

## 文档位置

参见 [document_directory_mapping.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/document_directory_mapping.md)（逻辑目录 → 项目实际目录映射）。

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
| 架构设计 | `docs/02_logical_workflow/*.md` | L2 | Prometheus |
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
| 低 | <100 | 创建极简design.md（仅接口契约），快速路径可省略 |
| 中 | 100-500 | 简要design.md+接口契约+任务清单 |
| 高 | >500 | 完整design.md+详细契约+全部章节 |

---

## TDD规则 (可选)

**启用条件**: 核心业务/复杂逻辑/高覆盖要求

**测试用例来源**: 仅基于设计文档 (L2+L3)，不参考代码

**测试代码来源**: 主要基于CSV，仅参考代码接口

👉 [TDD工作流详情](skills/sop-tdd-workflow/SKILL.md)

---

## 版本号管理

### 格式
```
v[主版本].[次版本].[修订版本]
```

### 规则
| 版本位 | 变更类型 | 示例 |
|--------|----------|------|
| 主版本 | 架构重大变更、角色体系重构 | v5→v6 |
| 次版本 | 新增角色、新增工作流、新增文档类型 | v6.0→v6.1 |
| 修订版本 | 文档修正、错误修复、格式统一 | v6.0.0→v6.0.1 |

### 当前版本
**v1.5.0**

👉 [查看版本历史](CHANGELOG.md)

---

## 导航

| 层级 | 文档 |
|------|------|
| L1 | [核心概念](01_concept_overview.md) |
| L2 | [角色矩阵](02_role_matrix/index.md) |
| L3 | [工作流](03_workflow/index.md) |
| L4 | [参考文档](04_reference/index.md) |
| L4-ADR | [架构决策](04_reference/document_templates/adr.md) |
| L4-RAG | [参考资料管理](04_reference/knowledge_management.md) |
| Prompts | [prompts/](prompts/) |
| Skills | [skills/](skills/) |
| 版本历史 | [CHANGELOG.md](CHANGELOG.md) |
