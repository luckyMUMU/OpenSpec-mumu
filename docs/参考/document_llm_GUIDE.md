---
version: v1.5.0
updated: 2026-02-11
scope: 文档规范（对齐 docs/参考/sop）
---

# 基于分层文档与伪代码的文档规范

本文档定义项目在 AI 协作场景下的“文档分层、放置、命名、引用、SSOT（唯一来源）”规范；不描述流程执行细节。

相关 SSOT（以其内容为准）：
- 文档目录映射：`sop/04_reference/document_directory_mapping.md`（本仓库参考位置：`docs/参考/sop/04_reference/document_directory_mapping.md`）
- 来源与依赖声明格式：`sop/04_reference/interaction_formats/source_dependency.md`（本仓库参考位置：`docs/参考/sop/04_reference/interaction_formats/source_dependency.md`）
- RAG 与知识沉淀：`sop/04_reference/knowledge_management.md`（本仓库参考位置：`docs/参考/sop/04_reference/knowledge_management.md`）
- 状态字典：`sop/05_constraints/state_dictionary.md`（本仓库参考位置：`docs/参考/sop/05_constraints/state_dictionary.md`）
- 命令字典：`sop/05_constraints/command_dictionary.md`（本仓库参考位置：`docs/参考/sop/05_constraints/command_dictionary.md`）

---

## 1. 渐进式披露分层（L1-L4）与核心目录

项目文档按披露深度分层组织，避免把所有信息堆在单一 README 中。

```text
docs/
├── 01_concept_overview.md            # L1: 概念层（极简）
├── 01_requirements/                  # L1-L3: 需求分层（PRD/MRD/FRD/原型）
├── 02_logical_workflow/              # L2: 逻辑工作流（Markdown + pseudo 伪代码）
├── 03_technical_spec/                # L3: 技术规格（接口/数据/测试资产）
├── 04_context_reference/             # L4: ADR + RAG + 决策记录
└── 参考/                             # SOP 参考文档（非指定不变更）
```

---

## 2. 逻辑目录 ↔ 仓库落地目录映射

为避免“参考 SOP 的目录结构”和“实际项目目录结构”不一致导致的断链与误放置，所有文档/产物路径在表达时遵循：

1. Prompts / Skills 输出路径以“逻辑目录（SOP 约定）”为准。
2. 若项目采用不同目录结构，必须维护映射表，并要求所有产出引用该表。
3. 跨文档链接优先使用“逻辑目录 + 文件名”的表达，并在需要时通过映射表落地到实际路径。

映射表（逻辑 → 建议落地）：

| 逻辑目录（SOP 约定） | 用途 | 默认落地目录（建议） |
|---|---|---|
| `sop/` | SOP 配置（约束/工作流/Prompts/Skills/模板/审查标准） | `sop/` |
| `docs/01_requirements/` | 需求文档（PRD/MRD/FRD、原型） | `docs/01_requirements/` |
| `docs/01_requirements/frontend/` | 前端需求文档与原型 | `docs/01_requirements/frontend/` |
| `docs/01_requirements/backend/` | 后端需求文档 | `docs/01_requirements/backend/` |
| `docs/02_logical_workflow/` | L2 逻辑工作流（技术无关） | `docs/02_logical_workflow/` |
| `docs/02_logical_workflow/frontend/` | L2 前端逻辑工作流（技术无关） | `docs/02_logical_workflow/frontend/` |
| `docs/02_logical_workflow/backend/` | L2 后端逻辑工作流（技术无关） | `docs/02_logical_workflow/backend/` |
| `docs/03_technical_spec/` | L3 技术规格、测试资产（CSV 等） | `docs/03_technical_spec/` |
| `docs/03_technical_spec/frontend/` | L3 前端技术规格与测试资产 | `docs/03_technical_spec/frontend/` |
| `docs/03_technical_spec/backend/` | L3 后端技术规格与测试资产 | `docs/03_technical_spec/backend/` |
| `docs/04_context_reference/` | ADR + RAG + 决策记录 | `docs/04_context_reference/` |
| `src/**/design.md` | 目录级实现设计（L3） | `src/**/design.md` |
| `src/frontend/**/design.md` | 前端目录级实现设计（L3） | `src/frontend/**/design.md` |
| `src/backend/**/design.md` | 后端目录级实现设计（L3） | `src/backend/**/design.md` |
| `tests/acceptance/` | 分层验收测试（代码与设计） | `tests/acceptance/` |
| `.temp/` | 临时产物/报告（非持久化） | `.temp/` |

---

## 3. 文档放置规则（含“参考文档”约束）

1. `/docs` 用于项目文档与设计资产，允许随项目演进增删改。
2. `/docs/参考/` 为 SOP 参考文档，除非明确指定，否则不对其做结构性改动（避免漂移）。
3. 需求、设计、测试、决策必须按层级目录放置，不得混放。

---

## 4. 各层内容规范（应写什么 / 禁止写什么）

### 4.1 L1 概念层（01_concept_overview.md）

存放位置：`docs/01_concept_overview.md`

必须包含：
- 一句话定义（模块/系统是什么）
- 核心痛点（解决什么问题）
- 关键术语表（必要时）

禁止包含：
- 任何代码片段
- 任何实现细节（框架/库/具体函数）
- 具体文件路径与配置细节

### 4.2 L1-L3 需求分层（docs/01_requirements/）

存放位置（推荐结构）：

```text
docs/01_requirements/
├── project_prd.md                    # L1: 项目级需求
├── modules/
│   ├── [module]_mrd.md               # L2: 模块级需求
│   └── [module]/
│       └── [feature]_frd.md          # L3: 功能级需求
└── prototypes/                       # L3: 原型与交互补充
    └── [module]/
        └── [feature]_interaction.md
```

约束：
- 需求文档只描述业务目标、边界、规则、交互与验收，不写实现方案。
- 需求分层必须保持引用链：FRD 引用 MRD，MRD 引用 PRD（以“来源与依赖声明”体现）。

前后端拆分（可选，推荐用于全栈项目）：

```text
docs/01_requirements/
├── project_prd.md
├── modules/
│   └── [module]_mrd.md
├── frontend/
│   ├── modules/
│   │   └── [module]/
│   │       └── [feature]_frd.md
│   └── prototypes/
│       └── [module]/
│           └── [feature]_interaction.md
└── backend/
    └── modules/
        └── [module]/
            └── [feature]_frd.md
```

### 4.3 L2 逻辑工作流（docs/02_logical_workflow/*.md）

存放位置：`docs/02_logical_workflow/`

前后端拆分（可选）：`docs/02_logical_workflow/frontend/`、`docs/02_logical_workflow/backend/`

编写原则：技术无关，使用结构化伪代码表达业务逻辑。

伪代码规范（强制）：
1. 原子操作命名：`UPPER_SNAKE_CASE`（例：`VALIDATE_INPUT`）
2. 函数命名：`lower_snake_case`（例：`process_order`）
3. 缩进：4 空格
4. 注释：解释“为什么需要该分支/约束”，不解释语法
5. 伪代码代码块语言标记必须为 `pseudo`

禁止：
- 具体编程语言语法（如 JS/Python 语法糖）
- 具体实现调用（如 `db.connect()`、`redis.get()`、`logger.info`、`import`）

示例：

```pseudo
FUNCTION main(input):
    VALIDATE_INPUT input

    IF input.type == "A":
        result = PROCESS_TYPE_A(input)
    ELSE:
        RAISE_ERROR "Invalid type"
    END IF

    RETURN result
END FUNCTION
```

### 4.4 L3 技术规格（docs/03_technical_spec/ 与 src/**/design.md）

存放位置：
- `src/**/design.md`：目录级实现设计（推荐作为实现设计主载体）
- 前后端拆分（可选）：`src/frontend/**/design.md`、`src/backend/**/design.md`
- `docs/03_technical_spec/`：跨目录或全局可复用的技术规格（如 OpenAPI、共享数据模型、测试资产等）
- 前后端拆分（可选）：`docs/03_technical_spec/frontend/`、`docs/03_technical_spec/backend/`

必须包含（以实现设计模板为准）：
- 技术选型表（语言/框架/存储/版本/理由）
- L2 → L3 映射表（将 L2 原子操作映射到 L3 实现构件）
- 接口契约（输入/输出/错误/异常）
- 数据模型（表/结构/索引等）
- 测试策略与验收清单（与需求/设计一致）

禁止：
- 重复叙述 L2 已定义的业务逻辑（除非为“映射解释”所必需）
- 把大段业务流程写进技术规格（业务流程应留在 L2）

### 4.5 L4 决策参考层（docs/04_context_reference/）

存放位置：`docs/04_context_reference/`

包含范围：
- ADR：`adr_[module]_[topic].md`
- RAG：`rag/`（用户输入、外部资料、项目沉淀）
- 决策记录：`decisions/`（当触发用户决策点时落盘）

L4 只记录：
- Why：为何选择 A 而不是 B
- 约束与风险：哪些条件下可能失效
- 历史：替代方案与废弃原因

禁止：
- 重写 L2 的业务流程
- 把实现细节当作决策理由（实现细节应在 L3）

---

## 5. 来源与依赖声明（强制）

以下产物必须包含 `## 来源与依赖声明` 章节并按统一格式填写：
- 需求文档（PRD/MRD/FRD）
- L2 逻辑工作流文档
- L3 实现设计（design.md / 技术规格）
- 测试设计与测试代码（若以文档形式交付）
- 代码审查报告（若以文档形式交付）

格式 SSOT：`sop/04_reference/interaction_formats/source_dependency.md`

硬性约束：
- 后续阶段必须声明其依赖的前置产出（路径 + 摘要），不得“隐式依赖”。
- 当出现来源缺失、依赖缺口、信息冲突、不可复核外部资料时，必须在文档中显式标记 `[USER_DECISION]`，并落盘决策记录到 `docs/04_context_reference/decisions/`。

---

## 6. RAG 与知识沉淀（引用与命名）

RAG 与知识沉淀的目录结构、命名与引用方式以 `sop/04_reference/knowledge_management.md` 为准。

最小要求：
- RAG 必须区分：`rag/user_input/`、`rag/external/`、`rag/project/`
- 文件命名格式：`[YYYYMMDD]_[source]_[brief].[ext]`
- 在 L2/L3/ADR 中引用 RAG 时，必须提供“来源/类型/摘要/链接”的表格（参见 SSOT）

---

## 7. SSOT 与一致性约束（禁止自造）

1. 状态标记必须引用 `sop/05_constraints/state_dictionary.md`，禁止在文档中自造新状态或使用历史别名混用。
2. 命令字典（如需在文档中表达流程的命令序列）必须引用 `sop/05_constraints/command_dictionary.md`，禁止自造命令语义。
3. 目录结构与路径表达必须遵循 `sop/04_reference/document_directory_mapping.md`，避免跨仓库结构变更导致文档失效。

---

## 8. 模板（可复用，不在本文复制）

建议直接复用以下模板（以 SOP 为准）：
- L2 架构设计模板：`sop/04_reference/document_templates/architecture_design.md`
- L3 实现设计模板：`sop/04_reference/document_templates/implementation_design.md`
- ADR 模板：`sop/04_reference/document_templates/adr.md`
