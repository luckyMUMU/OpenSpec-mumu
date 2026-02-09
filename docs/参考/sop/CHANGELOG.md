# SOP 版本变更历史

> **当前版本**: v1.4.0  
> **更新日期**: 2026-02-09

---

## 版本号规则

```
v[主版本].[次版本].[修订版本]
```

| 版本位 | 变更类型 | 示例 |
|--------|----------|------|
| **主版本** | 架构重大变更、角色体系重构 | v1→v2 |
| **次版本** | 新增角色、新增工作流、新增文档类型 | v1.0→v1.1 |
| **修订版本** | 文档修正、错误修复、格式统一 | v1.0.0→v1.0.1 |

---

## 版本历史

### v1.4.0 (2026-02-09)

**L2 架构文档 Markdown 化** - 全链路一致性升级

#### 版本说明
将 L2 架构设计载体统一调整为 `docs/02_logical_workflow/*.md`（Markdown 文档，伪代码用 `pseudo` 代码块），并同步模板、索引、约束矩阵、Prompts 与 Skills。

#### 新增内容
- **L2 Markdown 标准**: L2 逻辑工作流以 Markdown 表达，伪代码使用 `pseudo` 代码块
- **ADR 创建要求**: 架构设计阶段必须创建 ADR 记录关键决策（技术选型、架构模式、接口设计等）
- **RAG 参考资料管理**: 新增 `docs/04_context_reference/rag/` 目录管理用户输入和外部知识
  - `rag/user_input/`: 用户提供的需求文档、设计稿、参考资料
  - `rag/external/`: 外部获取的技术文档、API规范、最佳实践
  - `rag/project/`: 项目沉淀的设计模式、经验教训
- **知识沉淀入口**: 在参考索引中补充知识沉淀规范入口
- **冲突处理机制**: 设计时检查 ADR 和 RAG 引用，发现冲突标记 `[USER_DECISION_REQUIRED]`

#### 更新文档
| 类别 | 更新文件 |
|------|----------|
| 模板 | 04_reference/document_templates/architecture_design.md, implementation_design.md, adr.md |
| 参考 | 04_reference/index.md, 04_reference/knowledge_management.md |
| 约束 | 05_constraints/constraint_matrix.md |
| Prompt | prompts/* (L2 引用对齐) |
| Skill | skills/* (L2 引用对齐) |
| 核心 | AGENT_SOP.md, ROLE_CHEATSHEET.md |

---

### v1.3.0 (2026-02-09)

**工作流可执行性与治理补强** - 一致性与可审计性升级

#### 版本说明
补齐状态机单一真源、跨目录依赖合规载体、快速路径判定标准、多语言测试/CI 落地规范与安全供应链红线。

#### 新增内容
- **状态字典**: 增加 `05_constraints/state_dictionary.md` 作为状态标记唯一来源
- **安全与供应链红线**: 增加 `05_constraints/security_supply_chain.md`，明确密钥/权限/依赖治理
- **快速路径判定**: 增强 `03_workflow/fast_path.md` 的变更分类与升级红线
- **测试与 CI 门禁**: 增强 `05_constraints/acceptance_criteria.md` 的命令契约与 CI 建议
- **跨目录依赖合规**: 明确 Worker 仅可追加“待处理变更”条目作为跨目录协作载体

#### 更新文档
| 类别 | 更新文件 |
|------|----------|
| 核心 | AGENT_SOP.md, sop_for_human.md, ROLE_CHEATSHEET.md |
| 工作流 | 03_workflow/index.md, deep_path.md, fast_path.md, three_strike_rule.md |
| 约束 | 05_constraints/index.md, constraint_matrix.md, acceptance_criteria.md, state_dictionary.md, security_supply_chain.md |
| 参考 | 04_reference/design_directory_strategy.md |
| Skill | skills/* (版本对齐) |

---

### v1.2.0 (2026-02-08)

**目录维度并行执行** - 核心架构升级

#### 版本说明
引入目录维度工作范围定义和并行执行机制，实现 Worker 按 design.md 所在目录自底向上并行处理。

#### 新增内容
- **目录维度工作范围**: Worker 以 design.md 所在目录为工作边界
- **并行执行机制**: 按目录深度降序并行执行，同深度无依赖目录并行处理
- **依赖协调**: Supervisor 维护目录-Worker 映射表，协调跨目录依赖
- **状态标记**: 新增 `[DIR_WORKING]`, `[DIR_WAITING_DEP]`, `[DIR_COMPLETED]` 目录状态
- **跨目录变更处理**: Worker 不直接修改其他目录，通过 Supervisor 协调

#### 核心特性
- **目录边界**: Worker 只修改当前 design.md 目录内的代码
- **自底向上**: 按目录深度从深到浅处理
- **并行执行**: 同深度无依赖目录并行处理
- **依赖等待**: 父目录等待子目录完成后才能开始

#### 更新文档
| 类别 | 更新文件 |
|------|----------|
| 核心 | AGENT_SOP.md (v1.2.0) |
| 角色 | 02_role_matrix/index.md |
| 工作流 | 03_workflow/index.md, deep_path.md |
| 参考 | 04_reference/design_directory_strategy.md (新增) |
| Skill | 全部13个Skill更新至v1.1.0+ |
| Prompt | 全部9个Prompt更新 |

---

### v1.1.0 (2026-02-08)

**分层验收与约束规范** - 新增核心功能

#### 版本说明
引入分层验收机制和黑白名单约束体系，强化流程规范性和质量保证。

#### 新增内容
- **分层验收机制**: L1-L4 四级验收标准（单元/集成/功能/E2E）
- **黑白名单约束**: 完整的禁止项矩阵，明确角色权限边界
- **验收角色分工**: Tester设计、TestWorker实现、Worker运行的职责分离
- **版本管理规则**: 主/次版本全局统一，修订版本可差异化的规范
- **SOP审查指南**: sop_GUIDE.md 文档审查标准

#### 核心特性
- **分层验收**: 先低后高，逐层审查，确保质量
- **测试独立性**: Tester/TestWorker/Worker 三权分立
- **约束矩阵**: 全局禁止项 + 角色特定禁止项 + 阶段特定禁止项
- **版本管理**: 语义化版本控制，全局统一主/次版本

#### 更新文档
| 类别 | 更新文件 |
|------|----------|
| 核心 | AGENT_SOP.md (v1.1.0), sop_for_human.md (v1.1.0), ROLE_CHEATSHEET.md (v1.1.0) |
| 约束 | 05_constraints/constraint_matrix.md, acceptance_criteria.md, index.md |
| 工作流 | 03_workflow/deep_path.md (分层验收流程) |
| 指南 | sop_GUIDE.md (新增版本管理规则) |
| Skill | 全部14个Skill更新至v1.1.0 |

---

### v1.0.0 (2026-02-08)

**首个稳定版本** - SOP 正式版发布

#### 版本说明
SOP 进入稳定版本阶段，提供完整的 AI 辅助开发工作流规范。

#### 包含内容
- **11 个 AI 角色**: Router, Explorer, Analyst, Prometheus, Skeptic, Oracle, Tester, Worker, TestWorker, Librarian, Supervisor
- **3 种工作路径**: 快速路径、深度路径、TDD深度路径
- **文档层级体系**: L1 PRD / L2 MRD / L3 FRD / L3 Prototype / L4 Implementation
- **14 个 Skill 模块**: 覆盖完整开发流程
- **11 个 Prompt 指令**: 角色行为定义
- **完整模板库**: PRD、MRD、FRD、原型、测试用例等

#### 核心特性
- **测试独立性**: Tester/TestWorker 权限隔离，CSV测试用例人工审核
- **需求分层**: 三级需求文档（项目/模块/功能）+ 原型设计
- **渐进披露**: 按需获取信息，避免信息过载
- **三错即停**: Worker 连续失败 3 次触发熔断机制
- **版本管理**: 完整的版本号体系和变更记录

#### 文档清单
| 类别 | 文件 |
|------|------|
| 核心 | AGENT_SOP.md, 01_concept_overview.md, ROLE_CHEATSHEET.md |
| 工作流 | 03_workflow/index.md, fast_path.md, deep_path.md, three_strike_rule.md |
| 角色 | 02_role_matrix/index.md |
| 参考 | 04_reference/index.md, document_templates/ |
| Skill | skills/* (14个) |
| Prompt | prompts/* (11个) |

---

## 未来计划

### v1.2.0 (计划中)
- 优化分层验收自动化
- 添加更多测试模板
- 完善原型设计工具链

### v2.0.0 (规划中)
- 引入自动化测试执行
- 添加性能测试支持
- 重构角色体系

---

## 贡献者

- Librarian: 文档维护
- Router: 流程优化

---

**注意**: 本文档记录 SOP 的版本变更历史。如需查看详细规范，请参考各版本对应的文档。
