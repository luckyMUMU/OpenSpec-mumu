---
version: v3.0.0
updated: 2026-03-01
---

# 基于 Spec-First 的 LLM 技术规范

> **相关文档**：本规范与 SOP v3.0.0 体系配合使用，详见 [sop_GUIDE.md](sop_GUIDE.md)

---

## 一、分级存储架构 (Storage Hierarchy)

文档不再是一个巨大的 `README.md`，而是根据"披露深度"拆分为不同的文件/文件夹：

```text
docs/
├── 01_requirements/         # L1: 需求文档（PRD/MRD/FRD）
│   ├── project_prd.md       # 项目级需求
│   └── modules/             # 模块级需求
├── 02_logical_workflow/     # L2: 逻辑工作流（架构设计）
│   └── [module].md          # 模块架构设计
├── 03_technical_spec/       # L3: 技术规格（实现设计）
│   ├── test_cases/          # 测试用例 CSV
│   └── [module]_spec.md     # 技术规格文档
└── 04_context_reference/    # L4: 决策背景与参考资料
    ├── adr_*.md             # 架构决策记录 (ADR)
    ├── decisions/           # 决策记录
    └── rag/                 # RAG 参考资料
```

### SOP v3.0.0 目录映射

| LLM 文档层级 | SOP v3.0.0 目录 | 说明 |
|-------------|----------|------|
| L1 需求层 | `docs/01_requirements/` | PRD/MRD/FRD |
| L2 架构层 | `docs/02_logical_workflow/` | 技术无关的架构设计 |
| L3 实现层 | `src/**/design.md` | 目录级实现设计 |
| L4 决策层 | `docs/04_context_reference/` | ADR + 决策记录 |
| Spec 执行期 | `.trae/specs/<change-id>/` | 临时规范（spec.md/tasks.md/checklist.md） |

---

## 二、每一层的内容分配规范

### L1: 核心概念层 (Concept Layer)

- **存放位置：** `docs/01_requirements/`
- **内容：**
  - 一句话定义该模块
  - 解决的核心痛点
  - **禁止：** 出现任何代码、路径或配置

### L2: 逻辑流转层 (Logic Layer) —— **核心改进点**

- **存放位置：** `docs/02_logical_workflow/`
- **编写原则：使用"结构化伪代码"**
- **规范：**
  - **忽略语法：** 不使用特定的编程语言，使用 `IF`, `THEN`, `FOR EACH`, `TRY-CATCH` 等通用描述
  - **屏蔽实现：** 不要写 `db.connect()`，而是写 `CONNECT_TO_DATABASE`
  - **示例：**

    ```pseudo
    // 伪代码示例：用户意图识别流程
    FUNCTION identify_intent(user_input):
        INITIALIZE context_buffer
        PRE_PROCESS user_input (remove_noise, normalize)

        IF user_input contains "urgent":
            SET priority = HIGH
        ELSE:
            SET priority = NORMAL

        RETURN CALL_LLM_MODEL(prompt_template, user_input)
    END FUNCTION
    ```

### L3: 技术规格层 (Spec Layer)

- **存放位置：** `src/**/design.md` 或 `docs/03_technical_spec/`
- **内容：**
  - **数据合同：** 定义输入/输出的具体字段、类型
  - **状态码定义：** 逻辑流转中可能出现的错误代码及其含义
  - **禁止：** 描述业务逻辑，只定义数据边界

### L4: 决策参考层 (Context Layer)

- **存放位置：** `docs/04_context_reference/`
- **内容：**
  - **Why：** 为什么选择伪代码中的逻辑 A 而不是 B？
  - **限制：** 当前逻辑在并发超过 1000 时可能失效
  - **历史：** 旧版本逻辑的废弃原因

---

## 三、伪代码编写的三项准则

为了确保伪代码既能被人读懂，也能被 LLM 精准解析，建议遵循以下标准：

1. **原子化操作命名：** 使用 `UPPER_SNAKE_CASE` 表示底层原子操作（如 `FETCH_USER_PROFILE`），这些操作在实际代码中可能对应一个复杂的函数。

2. **缩进体现分层：** 严格使用 4 空格缩进，表示逻辑的嵌套关系，这有助于 LLM 构建抽象语法树。

3. **注释意图而非步骤：** 注释应说明"为什么这里需要分支"，而不是解释"这是一个 If 语句"。

---

## 四、这种规范的优势

1. **架构与实现解耦：** 即使你的项目从 Python 迁移到了 Go，`02_logical_workflow` 下的伪代码文档完全不需要修改。

2. **降低 LLM 的 Token 噪音：** LLM 在学习你的技术文档时，不需要被大量的 `import`, `try...except`, `logger.info` 干扰，能更直接地捕获业务逻辑。

3. **渐进式认知：**
   - 开发者想看逻辑？去 L2 看伪代码
   - 开发者要写代码？去 L3 看字段定义
   - 开发者遇到 Bug？去 L4 看设计背景

---

## 五、技术栈描述规范 (Technology Stack)

技术描述遵循分层结构，提供完整的技术选型参考框架：

### 核心技术选型 (Core Technology)

**语言与运行时：**
- **编程语言** - 系统级性能与内存安全
- **异步运行时** - 支持高并发执行
- **版本要求** - 最低语言版本要求

### 构建与开发 (Build & Development)

**标准构建流程：**
```bash

```

**特性标志管理：**

### 架构设计原则 (Architecture Principles)

**模块组织规范：**
- 设计文档完整性要求
- 模块组织结构标准
- 测试策略覆盖范围
- 示例代码组织方式

### 性能与质量保障 (Performance & Quality)

**性能基准指标：**
- 并发处理能力指标
- 响应延迟性能要求
- 可靠性机制保障

**代码质量规范：**
- 代码格式化标准
- 静态分析检查要求
- 文档完整性规范
- 日志记录最佳实践

### 配置与环境 (Configuration)

**配置管理体系：**
- 主配置文件位置
- 环境配置覆盖机制
- 环境变量管理规范

**项目开发约定：**
- 命名规范标准
- 文件组织结构
- 版本控制策略

---

## 六、SOP v3.0.0 体系映射

本规范与 SOP v3.0.0 体系紧密配合，以下是关键映射关系：

### Spec-First 架构

SOP v3.0.0 采用 **Spec-First 架构**，规范是第一性产物，Skill 是规范的执行工具：

| 层级 | 内容 | 位置 |
|------|------|------|
| P0 工程宪章 | 项目章程、架构原则、质量红线、安全基线 | `sop/01_constitution/` |
| P1 系统规范 | 跨模块约束、系统级规范 | `sop/02_specifications/` |
| P2 模块规范 | 单模块约束、实现规范 | `sop/02_specifications/` |
| P3 实现规范 | 自动化验证、代码规范 | `sop/05_constraints/` |

### 5 阶段工作流

| 阶段 | 名称 | 契约文件 | 输出物 |
|------|------|----------|--------|
| Stage 0 | 权重选择 | `stage-0-contract.yaml` | 路径决策（Deep/Fast） |
| Stage 1 | 设计 | `stage-1-contract.yaml` | 设计文档（design.md） |
| Stage 2 | 实现 | `stage-2-contract.yaml` | 代码变更 + 测试 |
| Stage 3 | 交付 | `stage-3-contract.yaml` | 验收报告 + 文档 |
| Stage 4 | 归档 | `stage-4-contract.yaml` | 归档文件 |

### Skill 分类与文档层级

| Skill 类别 | 职责 | 输出文档层级 |
|-----------|------|-------------|
| 编排类 (Orchestration) | 任务调度、状态管理 | Stage 契约 |
| 规范类 (Specification) | 需求分析、架构设计 | L1-L2 文档 |
| 实现类 (Implementation) | 代码实现、测试 | L3 代码 + 测试 |
| 验证类 (Verification) | 质量审查、验收 | 审查报告 + 验收报告 |

### 质量门控机制（P0 级约束）

每个阶段完成后必须执行门控检查，确保质量：

| 阶段 | 门控检查项 | 通过条件 | 失败处理 |
|------|-----------|----------|----------|
| Stage 0 权重选择 | 路径选择合理、复杂度评估准确 | 全部通过 | 重新评估路径 |
| Stage 1 设计 | 设计文档完整、接口定义清晰、无架构冲突 | 全部通过 | 返回设计修正 |
| Stage 2 实现 | 代码规范、测试通过、契约满足 | 全部通过 | 返回实现修正 |
| Stage 3 交付 | 验收通过、文档同步、无遗留问题 | 全部通过 | 返回交付修正 |
| Stage 4 归档 | 归档完整、状态清理、知识沉淀 | 全部通过 | 返回归档修正 |

**门控失败约束（P0 级）**：
- 门控失败触发熔断机制
- 每次失败必须记录到契约文件
- 用户决策：修复后重试、回滚到上一阶段、终止任务
- 与三错即停机制独立（门控失败不累计到三错计数）

### 契约驱动执行

每个阶段通过契约文件（YAML）进行通信，契约包含：
- **前置条件（Preconditions）**：阶段启动前必须满足的条件
- **后置条件（Postconditions）**：阶段完成后必须达成的状态
- **不变式（Invariants）**：整个执行过程中必须保持的约束
- **隔离上下文（Isolated Context）**：阶段间不共享状态，仅通过契约通信

### 目录调度状态机

多目录并行执行时，目录状态按以下状态机流转：

```
[DIR_WAITING_DEP] ←── 依赖未就绪 ──┐
       │                          │
       ↓ 依赖就绪（自动触发）       │
[DIR_WORKING] ──→ 处理完成 ──→ [DIR_COMPLETED]
       │                          │
       ↓ 处理失败                 │
[DIR_FAILED] ─────────────────────┘
```

**调度状态保存格式**（JSON）：
```json
{
  "version": "1.0",
  "timestamp": "2026-02-24T10:30:00Z",
  "directories": [
    {
      "path": "src/module-a",
      "state": "DIR_COMPLETED",
      "design_md": "src/module-a/design.md",
      "completed_at": "2026-02-24T10:00:00Z"
    }
  ],
  "current_batch": 1,
  "total_batches": 3
}
```
保存位置：`.trae/scheduler_state.json`

### 文档模板位置（v3.0.0）

| 文档类型 | 模板位置 |
|----------|----------|
| PRD/MRD/FRD | `sop/06_templates/documents/proposal.md` |
| 架构设计 | `sop/06_templates/documents/design.md` |
| 实现设计 | `src/**/design.md` (目录级) |
| ADR | `docs/04_context_reference/adr_*.md` |
| Stage 契约 | `sop/03_workflow/contracts/stage-{0-4}-contract.yaml` |
| 归档文档 | `sop/06_templates/documents/archive.md` |
| 确认文档 | `sop/06_templates/documents/confirmation.md` |
| 审查报告 | `sop/06_templates/reports/review-report.md` |
| 约束报告 | `sop/06_templates/reports/constraint-report.md` |

### 相关文档

- [SOP 入口](sop/AGENT_SOP.md) - Spec-First 架构入口
- [SOP 审查指南](sop_GUIDE.md) - SOP 文档审查规范
- [工程宪章](sop/01_constitution/) - P0 级规范
- [系统规范](sop/02_specifications/) - P1-P2 级规范
- [工作流](sop/03_workflow/) - 5 阶段工作流
- [Skill 定义](sop/04_skills/) - 4 类 Skill
- [约束体系](sop/05_constraints/) - P0-P3 约束
- [模板体系](sop/06_templates/) - 契约/文档/报告模板
- [参考资料](sop/07_reference/) - 参考材料
