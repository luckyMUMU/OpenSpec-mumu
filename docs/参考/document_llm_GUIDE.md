---
version: v2.12.0
updated: 2026-02-25
---

# 基于伪代码逻辑与分级目录的 LLM 技术规范

> **相关文档**：本规范与 SOP 体系配合使用，详见 [sop_GUIDE.md](sop_GUIDE.md)

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

### SOP 目录映射

| LLM 文档层级 | SOP 目录 | 说明 |
|-------------|----------|------|
| L1 需求层 | `docs/01_requirements/` | PRD/MRD/FRD |
| L2 架构层 | `docs/02_logical_workflow/` | 技术无关的架构设计 |
| L3 实现层 | `src/**/design.md` | 目录级实现设计 |
| L4 决策层 | `docs/04_context_reference/` | ADR + 决策记录 |

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

## 六、SOP 体系映射

本规范与 SOP 体系紧密配合，以下是关键映射关系：

### Skill 与文档层级

| Skill | 输出文档层级 | 说明 |
|-------|-------------|------|
| sop-requirement-analyst | L1 | 需求文档 |
| sop-architecture-design | L2 | 架构设计 |
| sop-implementation-designer | L3 | 实现设计 |
| sop-code-implementation | 代码 | 代码实现 |

### 质量门控机制

每个阶段完成后必须执行门控检查，确保质量：

| 阶段 | 门控检查项 | 通过条件 | 失败处理 |
|------|-----------|----------|----------|
| 需求阶段 | 需求边界清晰、技术方案对齐、验收标准具体、关键假设确认 | 全部通过 | 返回需求分析修正 |
| 架构阶段 | 架构图清晰、接口定义完整、与现有系统无冲突、设计可行 | 全部通过 | 返回架构设计修正 |
| 实现设计阶段 | 任务覆盖完整、依赖无循环、每个任务可独立验证 | 全部通过 | 返回实现设计修正 |
| 代码实现阶段 | 代码规范、测试通过、文档同步 | 全部通过 | 返回代码实现修正 |
| 文档同步阶段 | 需求实现、验收满足、质量达标 | 全部通过 | 返回相应阶段修正 |

**门控失败约束**：
- 门控失败不累计，每次失败都需要用户决策
- 用户可选择：修复后重试、回滚到上一阶段、终止任务
- 不与三错即停机制关联

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

### 文档模板位置

| 文档类型 | 模板位置 |
|----------|----------|
| PRD/MRD/FRD | `sop/04_reference/document_templates/` |
| 架构设计 | `sop/04_reference/document_templates/architecture_design.md` |
| 实现设计 | `sop/04_reference/document_templates/implementation_design.md` |
| ADR | `sop/04_reference/document_templates/adr.md` |

### 相关文档

- [SOP 入口](sop/AGENT_SOP.md)
- [SOP 审查指南](sop_GUIDE.md)
- [目录映射表](sop/04_reference/document_directory_mapping.md)
- [状态字典](sop/05_constraints/state_dictionary.md)
- [命令字典](sop/05_constraints/command_dictionary.md)
- [约束矩阵](sop/05_constraints/constraint_matrix.md)
