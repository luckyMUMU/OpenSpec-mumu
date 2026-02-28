# SOP 体系分析报告

**分析时间**: 2026-02-28  
**SOP 版本**: v2.12.0  
**分析范围**: 完整 SOP 体系架构、核心机制、工作流程

---

## 一、SOP 体系概览

### 1.1 核心定位

**SOP (Standard Operating Procedure)** 是 AI 辅助开发工作流的标准规范体系，以**Skill-first**为核心理念，通过标准化的执行单元（Skill）和严格的工作流程确保开发质量。

**核心原则**：
1. **准度 > 速度** - 严禁跳步，失败熔断
2. **文档先行** - 先标记 `[DIR_WORKING]`，再改代码
3. **渐进披露** - 按需获取信息（L1-L4）
4. **少即是多** - 先复用→改进→新建→清理
5. **测试独立** - 测试用例与代码分离
6. **目录维度** - 实现类 Skill 按 design.md 目录并行执行
7. **无出处不决断** - 无法追溯依据时必须询问用户
8. **审查须确认** - 所有审查结论必须通过用户确认

### 1.2 文档结构

```
sop/
├── AGENT_SOP.md                 # 唯一入口，包含快速分诊、核心约束、工作流导航
├── 01_concept_overview.md       # L1: 核心概念
├── 02_skill_matrix/
│   └── index.md                 # L2: Skill 矩阵（SSOT）
├── 03_workflow/
│   ├── index.md                 # L3: 工作流规范
│   ├── fast_path.md             # 快速路径
│   ├── deep_path.md             # 深度路径
│   └── three_strike_rule.md     # 三错即停机制
├── 04_reference/                # L4: 参考文档
│   ├── document_templates/      # 文档模板
│   ├── interaction_formats/     # 交互格式
│   └── review_standards/        # 审查标准
├── 05_constraints/              # 约束规范
│   ├── constraint_matrix.md     # 禁止项矩阵
│   ├── coding_principles.md     # 编码原则
│   ├── command_dictionary.md    # 命令字典
│   ├── state_dictionary.md      # 状态字典
│   └── security_supply_chain.md # 安全红线
└── skills/                      # Skill 合约定义
    └── [skill-name]/SKILL.md    # 各 Skill 的详细合约
```

---

## 二、核心机制

### 2.1 渐进披露机制 (L1-L4)

SOP 采用**渐进披露**设计，信息按层级组织，避免一次性加载过多内容：

| 层级 | 内容 | 位置 | 获取方式 |
|------|------|------|----------|
| **L1** | 核心概念 | 01_concept_overview.md | 初始加载 |
| **L2** | Skill 矩阵 | 02_skill_matrix/index.md | 需要时加载 |
| **L3** | 工作流程 | 03_workflow/index.md | 执行时加载 |
| **L4** | 模板规范 | 04_reference/* | 具体操作时加载 |

**设计目标**：
- 不加载引用正文也能判断"是否需要继续加载"
- 从入口到任意 SOP 文档最短跳数 ≤3

### 2.2 Skill 执行机制

**Skill 是 SOP 的唯一执行单元**，每个 Skill 有明确的：
- **触发条件**：何时被调用
- **输入/输出**：契约化接口
- **停止点**：必须暂停等待确认的状态
- **落盘交付物**：必须生成的文档
- **工作范围 (Scope)**：操作边界

**核心 Skill 分类**：

| 类别 | Skill | 职责 |
|------|------|------|
| **编排类** | sop-workflow-orchestrator | 分诊、路径选择、调用链编排 |
| | sop-code-explorer | 代码库检索/审计/上下文提取 |
| | sop-progress-supervisor | 目录并行调度、等待/唤醒、熔断 |
| **需求类** | sop-requirement-analyst | L1-L3 需求分层与落盘 |
| **设计类** | sop-architecture-design | L2 架构设计与技术选型 |
| | sop-architecture-reviewer | L2 架构审查 |
| | sop-implementation-designer | 目录级 L3 design.md 设计 |
| **测试类** | sop-test-design-csv | 基于设计生成 CSV 测试用例 |
| | sop-test-implementation | 基于 CSV 实现测试代码 |
| **实现类** | sop-code-implementation | 按 design.md 目录边界改代码 |
| **质量类** | sop-code-review | 基于证据的代码审查 |
| **文档类** | sop-document-sync | 更新索引/导航/CHANGELOG |
| **路径宏** | sop-fast-path | 快速路径调用链 |
| | sop-deep-path | 深度路径调用链 |
| | sop-tdd-workflow | TDD 增强调用链 |

### 2.3 状态机机制

SOP 使用**状态字典**管理流程状态，核心状态包括：

**目录状态**：
- `[DIR_WORKING]` - 目录正在处理
- `[DIR_COMPLETED]` - 目录处理完成
- `[DIR_WAITING_DEP]` - 等待依赖
- `[DIR_FAILED]` - 目录处理失败

**停止点状态**：
- `[USER_DECISION]` - 等待用户决策
- `[WAITING_FOR_REQUIREMENTS]` - 等待需求确认
- `[WAITING_FOR_ARCHITECTURE]` - 等待架构确认
- `[WAITING_FOR_DESIGN]` - 等待设计确认
- `[WAITING_FOR_CODE_REVIEW]` - 等待代码审查
- `[DIFF_APPROVAL]` - 等待 Diff 审批
- `[FUSION_TRIGGERED]` - 熔断触发

**状态转移规则**：
```
[DIR_WAITING_DEP] ←── 依赖未就绪 ──┐
       │                          │
       ↓ 依赖就绪（自动触发）       │
[DIR_WORKING] ──→ 处理完成 ──→ [DIR_COMPLETED]
       │                          │
       ↓ 处理失败                 │
[DIR_FAILED] ─────────────────────┘
```

### 2.4 门控机制

每个阶段完成后必须执行**质量门控检查**：

| 阶段 | 门控检查项 | 通过条件 | 失败处理 |
|------|-----------|----------|----------|
| 需求阶段 | 需求边界清晰、技术方案对齐、验收标准具体、关键假设确认 | 全部通过 | 返回需求分析修正 |
| 架构阶段 | 架构图清晰、接口定义完整、与现有系统无冲突、设计可行 | 全部通过 | 返回架构设计修正 |
| 实现设计阶段 | 任务覆盖完整、依赖无循环、每个任务可独立验证 | 全部通过 | 返回实现设计修正 |
| 代码实现阶段 | 代码规范、测试通过、文档同步 | 全部通过 | 返回代码实现修正 |
| 文档同步阶段 | 需求实现、验收满足、质量达标 | 全部通过 | 返回相应阶段修正 |

**门控失败约束**：
- 最多 3 次门控重试
- 3 次失败后进入 `[USER_DECISION]`
- 必须记录失败原因和检查项

### 2.5 三错即停机制

同一 Skill 同一步骤失败时的处理机制：

| Strike | 条件 | 行动 |
|--------|------|------|
| 1 | 第一次失败 | 自动修正（同 Skill 内） |
| 2 | 第二次失败 | 调用 `sop-code-explorer` + 设计类 Skill 复核并微调 |
| 3 | 第三次失败 | **熔断**：由 `sop-progress-supervisor` 生成报告并停止自动推进 |

### 2.6 目录维度并行执行

**核心原则**：实现类 Skill 以 `design.md` 所在目录为工作边界，按目录深度**自底向上并行执行**。

**执行流程**：
```
1. sop-code-explorer 扫描目录结构，识别所有 design.md，产出 design_list
2. sop-progress-supervisor 接收 design_list，按目录深度排序，创建 dir_map
3. sop-progress-supervisor 按深度降序分批调度 sop-code-implementation（同深度并行）
4. sop-code-implementation 在 Scope 内执行；遇到跨目录依赖则进入 [DIR_WAITING_DEP]
5. sop-progress-supervisor 监控状态并唤醒等待依赖的目录批次
6. sop-code-review 审查 Diff（只输出报告）；失败则回到 sop-code-implementation 返工
7. 全部目录完成且审查放行后，sop-document-sync 更新文档与索引并归档已完成任务
```

**示例**：
```
深度 3: src/core/utils/design.md      → 第一批并行
深度 3: src/core/helpers/design.md    → 第一批并行
深度 2: src/core/design.md            → 第二批（等待第一批）
深度 2: src/api/design.md             → 第二批并行
深度 1: src/design.md                 → 第三批（等待第二批）
```

---

## 三、工作流路径

### 3.1 路径选择矩阵

| 路径 | 适用条件 | 流程 |
|------|----------|------|
| **快速路径** | 单文件 + <30 行 + 无逻辑变更 | sop-code-explorer → sop-code-implementation → sop-code-review → sop-document-sync |
| **深度路径** | 其他所有情况 | sop-requirement-analyst → sop-architecture-design → sop-architecture-reviewer → sop-implementation-designer → sop-code-implementation → sop-code-review → sop-document-sync |
| **TDD 路径** | 深度路径 + 核心业务/复杂逻辑/高覆盖要求 | 深度路径 + sop-test-design-csv + sop-test-implementation |

### 3.2 快速路径 (Fast Path)

**适用场景**：
- 单文件修改
- 修改行数 < 30 行
- 无逻辑变更（如配置调整、文案修改）

**流程**：
```
sop-code-explorer 
  → sop-code-implementation 
  → sop-code-review 
  → sop-document-sync
```

**特点**：
- 不涉及多目录并行
- 跳过需求和架构阶段
- 直接基于现有代码修改

### 3.3 深度路径 (Deep Path)

**适用场景**：
- 新功能开发
- 多文件/多目录修改
- 涉及逻辑变更

**标准流程**（目录维度）：
```
sop-requirement-analyst
  → sop-architecture-design
  → sop-architecture-reviewer
  → sop-implementation-designer (按目录)
  → sop-code-explorer (LIST_DESIGN_MD → design_list)
  → sop-progress-supervisor (SCHEDULE_DIRS(design_list) → dir_map)
  → sop-code-implementation (按目录并行)
  → sop-code-review
  → sop-document-sync
```

**功能迭代流程**（带架构影响评估）：
```
sop-requirement-analyst
  → [架构影响评估检查点]
  → sop-implementation-designer (按目录)
  → sop-code-explorer (LIST_DESIGN_MD → design_list)
  → sop-progress-supervisor (SCHEDULE_DIRS(design_list) → dir_map)
  → sop-code-implementation (按目录并行)
  → sop-code-review
  → sop-document-sync
```

**架构影响评估检查点**：
- 评估项：接口变更、数据模型变更、跨模块依赖、性能影响
- 仅当评估结果显示架构影响 → 必须插入 `sop-architecture-design` 和 `sop-architecture-reviewer` 阶段

### 3.4 TDD 路径 (可选)

**启用条件**：
- 核心业务逻辑
- 复杂算法/数据处理
- 高测试覆盖要求

**流程**：
```
sop-requirement-analyst
  → sop-architecture-design
  → sop-architecture-reviewer
  → sop-implementation-designer
  → sop-test-design-csv          ← 新增
  → sop-test-implementation      ← 新增
  → sop-progress-supervisor (dir_map)
  → sop-code-implementation (运行验收 + 修正代码)
  → sop-code-review
  → sop-document-sync
```

**测试用例来源**：
- **仅基于设计文档**（L2+L3），不参考代码
- 避免测试偏见

**测试代码来源**：
- 主要基于 CSV 测试用例
- 仅参考代码接口

### 3.5 分层验收路径 (推荐)

**核心流程**：
```
sop-requirement-analyst
  → sop-architecture-design
  → sop-architecture-reviewer
  → sop-implementation-designer
  → sop-test-design-csv
  → sop-test-implementation
  → sop-progress-supervisor (dir_map)
  → sop-code-implementation (运行验收 + 修正代码)
  → sop-code-review
  → sop-document-sync
```

**验收层级**：
- **L1 验收**：单元测试级别
- **L2 验收**：集成测试级别
- **L3 验收**：系统测试级别
- **L4 验收**：验收测试级别

**验收流程**：
```
RUN_ACCEPTANCE(L1) -> [WAITING_FOR_L1_REVIEW] -> REVIEW_ACCEPTANCE(L1)
RUN_ACCEPTANCE(L2) -> [WAITING_FOR_L2_REVIEW] -> REVIEW_ACCEPTANCE(L2)
RUN_ACCEPTANCE(L3) -> [WAITING_FOR_L3_REVIEW] -> REVIEW_ACCEPTANCE(L3)
RUN_ACCEPTANCE(L4) -> [WAITING_FOR_L4_REVIEW] -> REVIEW_ACCEPTANCE(L4)
```

---

## 四、需求分层体系

### 4.1 需求层级 (L1-L3)

| 层级 | 文档 | 位置 | 内容 | 产出 Skill |
|------|------|------|------|----------|
| **L1** | **Project PRD** | `docs/01_requirements/project_prd.md` | 项目愿景、模块清单 | sop-requirement-analyst |
| **L2** | **Module MRD** | `docs/01_requirements/modules/[module]_mrd.md` | 模块功能、边界 | sop-requirement-analyst |
| **L3** | **Feature FRD** | `docs/01_requirements/modules/[module]/[feature]_frd.md` | 功能详情、交互 | sop-requirement-analyst |
| **L3** | **Prototype** | `docs/01_requirements/prototypes/[module]/` | 界面原型 | sop-requirement-analyst |

### 4.2 需求文档结构

```
docs/01_requirements/
├── project_prd.md              # L1: 项目级
├── modules/
│   ├── [module]_mrd.md         # L2: 模块级
│   └── [module]/
│       └── [feature]_frd.md    # L3: 功能级
└── prototypes/                 # L3: 原型设计
    └── [module]/
        ├── [feature]_wireframe.drawio
        ├── [feature]_mockup.fig
        └── [feature]_interaction.md
```

### 4.3 设计文档层级

| 层级 | 文档 | 位置 | 内容 | 产出 Skill |
|------|------|------|------|----------|
| **L2** | 架构设计 | `docs/02_logical_workflow/*.md` | 技术无关逻辑设计 | sop-architecture-design |
| **L3** | 实现设计 | `src/**/design.md` | 目录级详细设计 | sop-implementation-designer |
| **L3** | 测试用例 | `docs/03_technical_spec/test_cases/*.csv` | CSV 测试用例 | sop-test-design-csv |
| **L3** | 测试代码 | `tests/*.test.[ext]` | 验收测试代码 | sop-test-implementation |
| **L4** | ADR | `docs/04_context_reference/adr_*.md` | 架构决策记录 | sop-architecture-design |

---

## 五、design.md 规则

### 5.1 复杂度分级

| 复杂度 | 行数 | 要求 |
|--------|------|------|
| **低** | <100 | 创建极简 design.md（仅接口契约），快速路径可省略 |
| **中** | 100-500 | 简要 design.md + 接口契约 + 任务清单 |
| **高** | >500 | 完整 design.md + 详细契约 + 全部章节 |

### 5.2 任务管理

design.md 中的任务清单支持以下状态：

| 状态 | 标记 | 含义 |
|------|------|------|
| 待处理 | `[ ]` | 任务尚未开始 |
| 进行中 | `[-]` | 任务正在执行 |
| 已完成 | `[x]` | 任务已完成并通过验证 |
| 已阻塞 | `[!]` | 任务被阻塞，需外部依赖 |
| 已归档 | `[archived]` | 任务已归档，不在活跃清单显示 |

**归档规则**：当目录状态变为 `[DIR_COMPLETED]` 时，`sop-document-sync` 自动将已完成任务移入归档章节。

### 5.3 工作范围定义

实现类 Skill（如 `sop-code-implementation`）以 `design.md` 所在目录为工作边界：

```
Scope 工作范围 = design.md 所在目录及其子目录（不含嵌套 design.md 的子目录）
```

**示例**：
```
src/
├── module_a/
│   ├── design.md          ← Scope A
│   ├── src/
│   └── utils/
├── module_b/
│   ├── design.md          ← Scope B
│   └── src/
└── shared/
    └── design.md          ← Scope C
```

---

## 六、Spec 模式交互式提问

### 6.1 提问触发时机

Spec 编写过程中，在以下章节级检测点触发冲突检测：

| 检测点 | 检测内容 | 触发条件 |
|--------|----------|----------|
| 架构章节 | 与现有 ADR 冲突 | 技术选型、架构模式变更 |
| 接口章节 | 与现有设计文档冲突 | 接口签名、数据结构变更 |
| 约束章节 | 与约束矩阵冲突 | 权限、安全、性能约束 |
| 依赖章节 | 与模块边界冲突 | 跨模块依赖、循环依赖 |

### 6.2 冲突优先级处理

| 优先级 | 影响范围 | 处理方式 |
|--------|----------|----------|
| **P0-阻断** | 架构决策、安全合规 | 立即暂停，必须用户确认 |
| **P1-高** | 跨模块影响、性能边界 | 暂停并提问，建议解决方案 |
| **P2-中** | 单模块内设计变更 | 提示用户，可继续推进 |
| **P3-低** | 风格、命名等非关键 | 记录到 spec.md，不暂停 |

### 6.3 ADR 确认更新机制

当检测到与 ADR 相关的冲突时：

1. **暂停当前编写**：标记当前章节状态为 `[WAITING_ADR_CONFIRM]`
2. **展示冲突详情**：列出冲突的 ADR 条目、当前设计、冲突点
3. **提问用户决策**：
   - 选项 A：遵循现有 ADR，调整当前设计
   - 选项 B：更新 ADR，记录变更理由
   - 选项 C：创建新 ADR，记录新决策
4. **执行用户选择**：更新相关文档后继续

### 6.4 决策分级记录

| 决策类型 | 记录位置 | 模板 |
|----------|----------|------|
| 架构变更、技术选型 | ADR | adr.md |
| 接口设计、数据结构 | spec.md | 设计章节 |
| 实现细节、代码风格 | spec.md | 实现说明章节 |
| 临时决策、待定事项 | spec.md | 待办/备注章节 |

**ADR 记录触发条件**：
- 涉及架构层面的技术选型变更
- 影响多个模块的接口变更
- 安全、性能、可用性等非功能性决策
- 与既有 ADR 存在冲突的决策

---

## 七、核心约束

### 7.1 五大核心约束

| 约束 | 说明 | 违反后果 |
|------|------|----------|
| **先标记状态** | 先标记 `[DIR_WORKING]`，再执行操作 | 状态混乱 |
| **父目录摘要** | 父目录只保留摘要 + 链接 | 破坏渐进披露 |
| **各 Skill 权限** | 只操作合约范围内的文件 | 权限混乱 |
| **先复用** | 先复用→改进→新建→清理 | 重复造轮子 |
| **测试独立** | 测试用例与代码分离 | 测试偏见 |

### 7.2 关键禁止项

#### 全局禁止
- ❌ 未标记状态直接修改文件
- ❌ 非 `sop-document-sync` 修改 `/docs/参考/`
- ❌ 跳过必要的审查阶段
- ❌ 绕过停止点继续
- ❌ 提交密钥/敏感信息、关闭安全校验

#### Skill 特定禁止
- ❌ **sop-code-explorer**: 修改任何代码/文档（只读证据输出）
- ❌ **sop-test-design-csv**: 从代码倒推用例（用例仅基于设计/验收标准）
- ❌ **sop-test-implementation**: 修改 CSV（测试资产隔离）
- ❌ **sop-code-review**: 修改任何代码（只输出审查报告）

#### 阶段特定禁止
- ❌ 需求阶段：禁止编码
- ❌ 架构阶段：禁止技术绑定
- ❌ 测试用例阶段：禁止参考代码
- ❌ 编码阶段：禁止偏离设计

### 7.3 编码原则

**六大设计原则**：
1. SOLID 原则
2. DRY (Don't Repeat Yourself)
3. KISS (Keep It Simple, Stupid)
4. YAGNI (You Aren't Gonna Need It)
5. 最小知识原则
6. 关注点分离

**方法逻辑层级一致性**：
- 同一方法内保持抽象层级一致
- 不允许混合高层业务逻辑和底层实现细节

**CRUD 分层复用**：
- 数据访问层、业务逻辑层、表示层严格分离
- 禁止跨层调用

---

## 八、中断与再执行

### 8.1 中断点

流程支持在任意停止点中断：
- `[USER_DECISION]` - 等待用户决策
- `[FUSION_TRIGGERED]` - 熔断触发
- `[DIR_WAITING_DEP]` - 等待依赖

### 8.2 重建

用户决策 + 方案调整 + 可选 Scope/设计/验收变更 + 重置计数器（熔断恢复时）

### 8.3 再执行

从可恢复检查点继续，使用 [续跑与恢复请求](04_reference/interaction_formats/continuation_request.md) 交接。

**可恢复检查点**：允许作为再执行起点的状态及所需最小输入见 state_dictionary.md。

**续跑格式**：
```json
{
  "checkpoint": "[DIR_WORKING]",
  "context": {
    "completed_dirs": ["src/module-a"],
    "waiting_dirs": ["src/module-b"],
    "dependencies": {...}
  },
  "next_action": "continue_implementation"
}
```

---

## 九、Skill 边界与协作

### 9.1 核心 Skill 边界

#### sop-code-explorer vs sop-requirement-analyst

| 方面 | sop-code-explorer | sop-requirement-analyst |
|------|-------------------|-------------------------|
| **核心职责** | 代码库检索、上下文提取、依赖分析 | 需求整理与文档化、需求澄清 |
| **禁止行为** | 不做需求分析、不产出 PRD/MRD/FRD | 不做代码检索（由 explorer 负责） |
| **协作场景** | 当需要分析现有代码以理解需求时：先调用 sop-code-explorer 提取上下文，再调用 sop-requirement-analyst 进行需求分析 |

#### sop-architecture-design vs sop-implementation-designer

| 方面 | sop-architecture-design | sop-implementation-designer |
|------|-------------------------|------------------------------|
| **设计层级** | L2（项目级架构设计） | L3（目录级实现设计） |
| **设计范围** | 跨模块、跨目录的技术决策 | 单目录内的详细实现设计 |
| **产出物** | 架构设计文档、ADR | design.md |
| **依赖关系** | 依赖需求文档 | 依赖架构设计文档 |

#### sop-code-review vs sop-architecture-reviewer

| 方面 | sop-code-review | sop-architecture-reviewer |
|------|-----------------|---------------------------|
| **审查对象** | 代码 Diff | 架构设计文档 |
| **审查时机** | 实现阶段 | 设计阶段 |
| **审查重点** | 设计一致性、正确性、测试覆盖 | 架构合理性、技术选型、扩展性 |
| **输出** | 审查报告（通过/需修改/僵局） | 审查报告（Pass/Fail） |

### 9.2 路径宏 Skills

| Skill | 类型 | 组成 |
|-------|------|------|
| sop-fast-path | 编排宏 | sop-code-explorer → sop-code-implementation → sop-code-review → sop-document-sync |
| sop-deep-path | 编排宏 | sop-requirement-analyst → sop-architecture-design → sop-architecture-reviewer → sop-implementation-designer → sop-progress-supervisor → sop-code-implementation → sop-code-review → sop-document-sync |
| sop-tdd-workflow | 编排宏 | sop-deep-path + sop-test-design-csv + sop-test-implementation |

**特点**：
- 不是独立技能，而是多个 Skills 的有序组合
- 通过预定义的调用链简化常见工作流
- 可根据实际需求动态调整调用链

---

## 十、文档管理

### 10.1 文档放置规则

| 目录 | 用途 | 权限 |
|------|------|------|
| `/docs` | 项目设计文档 | 动态创建更新 |
| `/docs/参考/` | SOP 参考文档 | **非指定不变更** |
| `/docs/01_requirements/` | **需求文档 (L1-L3)** | **sop-requirement-analyst 产出** |
| `/docs/02_logical_workflow/` | 架构设计 (L2) | sop-architecture-design 产出 |
| `/docs/03_technical_spec/` | 技术规格 (L3) | sop-implementation-designer 产出 |
| `/docs/03_technical_spec/test_cases/` | **测试用例** | **sop-test-design-csv 产出** |
| `/docs/04_context_reference/` | 决策参考 (L4) | sop-architecture-design / sop-implementation-designer 产出 |
| `src/**/design.md` | 实现设计 (L3) | sop-implementation-designer 产出 |
| `tests/` | **测试代码** | **sop-test-implementation 产出** |

### 10.2 版本号管理

**版本号格式**：`v[主版本].[次版本].[修订号]`

- **主版本**：不兼容的变更
- **次版本**：向后兼容的功能性变更
- **修订号**：向后兼容的问题修复

**版本依赖声明**：
```yaml
---
name: "sop-code-implementation"
version: "v2.12.0"
depends_on:
  sop_components:
    state_dictionary: ">=v2.12.0"
    command_dictionary: ">=v2.12.0"
  skills:
    sop-code-explorer: ">=v2.12.0"
    sop-implementation-designer: ">=v2.12.0"
---
```

---

## 十一、快速路径与 Spec 模式交互

### 11.1 升级触发条件

当快速路径任务执行过程中出现以下情况时，必须升级处理：
1. 检测到需要用户决策
2. 发现跨文件/跨目录影响
3. 存在与现有 ADR/设计文档的冲突
4. 任务复杂度超出快速路径限制

### 11.2 升级目标

- 优先升级到 Spec 模式交互式提问
- 复杂任务升级到深度路径

### 11.3 升级流程

1. 记录当前任务状态
2. 通过 AskUserQuestion 向用户说明升级原因
3. 等待用户确认后切换模式

---

## 十二、总结

### 12.1 SOP 核心优势

1. **质量保障**：通过门控机制、审查机制、三错即停确保质量
2. **可追溯性**：所有决策、变更、依赖都有文档记录
3. **并行效率**：目录维度并行执行，最大化效率
4. **灵活性**：支持快速路径、深度路径、TDD 路径多种模式
5. **熔断保护**：失败时及时停止，避免错误扩大

### 12.2 关键成功因素

1. **严格遵守停止点**：不绕过任何确认环节
2. **文档先行**：先设计后实现
3. **测试独立**：测试用例基于设计而非代码
4. **渐进披露**：按需获取信息，避免信息过载
5. **无出处不决断**：不确定时及时询问用户

### 12.3 适用场景

- ✅ 中大型项目开发
- ✅ 复杂系统重构
- ✅ 多模块协作开发
- ✅ 高质量要求的商业项目
- ❌ 简单脚本/一次性任务（适合快速路径）

---

**文档版本**: v1.0  
**分析完成时间**: 2026-02-28  
**SOP 版本**: v2.12.0
