---
name: "sop-design-placement"
description: "指导AI Agent正确放置设计文档和创建design.md。Invoke when creating design documents or design.md files, to determine the correct placement based on module division and complexity."
---

# 设计文档放置指南

> **版本**: v1.5.0

**位置**: `sop/skills/sop-design-placement/SKILL.md`

## 触发条件

- 需要创建/更新设计文档，且需要判断正确放置位置
- 需要决定是否创建 design.md 以及 design.md 的深度与拆分粒度

## 目录结构规范

### 文档放置位置

参见：04_reference/document_directory_mapping.md

### 重要约束

⚠️ **`/docs/参考/` 非指定不变更**
- 该目录包含 SOP 标准文档
- 仅 Librarian 角色维护
- 其他角色**禁止**修改此目录

## design.md 创建规则

### 1. 基于目录层级划分

**目录层级定义**:
- 以项目根目录为基准（深度 0）
- 每深入一级，深度 +1
- `design.md` 的深度 = 其所在目录的深度

**放置位置**:
`<module_dir>/design.md`

**路径选择**:
| 模块位置 | design.md 位置 | 深度示例 |
|----------|----------------|----------|
| `src/module/` | `src/module/design.md` | depth 2 |
| `packages/package/` | `packages/package/design.md` | depth 2 |
| 顶层模块 | `docs/module/design.md` | depth 2 |
| 子模块 | `src/module/sub/design.md` | depth 3 |

### 2. 基于复杂度判断

**复杂度评估**:

| 复杂度 | 代码行数 | 功能特点 | design.md 要求 |
|--------|----------|----------|----------------|
| **低** | <100行 | 单一功能，无外部依赖 | 可省略，代码注释说明 |
| **中** | 100-500行 | 多函数，有外部依赖 | 创建简要 design.md，含接口契约 |
| **高** | >500行 | 多模块交互，复杂逻辑 | 创建完整 design.md，含详细设计 |

**决策流程**:
参见：AGENT_SOP.md（design.md 规则）+ skills/sop-implementation-designer/SKILL.md

### 3. 目录层级与并行执行

**目录深度与执行顺序**:
参见：04_reference/design_directory_strategy.md + 05_constraints/command_dictionary.md

**Worker 分配**:
- 每个 design.md 目录分配一个 Worker
- 同深度无依赖的目录并行执行
- 父目录等待子目录完成后才能开始

### 4. 接口契约规范

每个 design.md 必须包含接口契约章节：
模板：04_reference/document_templates/implementation_design.md

### 5. 跨目录依赖声明

在 design.md 中声明跨目录依赖：
写入位置：design.md 的“目录依赖”章节

## 工作流程

### Step 1: 确定文档类型

| 文档类型 | 创建者 | 放置位置 |
|----------|--------|----------|
| PRD | Analyst | `docs/01_requirements/*.md` |
| 架构设计 | Prometheus | `docs/02_logical_workflow/*.md` |
| 实现设计 | Oracle | `src/**/design.md` 或 `docs/**/design.md` |

CMD: `IMPL_DESIGN(l2, dir) -> design.md`

## 输入
- module_name/path
- depth(optional)
- complexity(low/medium/high)
- deps / used_by

## 输出
- 交付物：design.md 路径（落盘至 `<module_dir>/design.md`）
- 交付物：design.md 必备章节（接口契约/目录依赖/任务清单）
- 交付物（模板）：04_reference/document_templates/implementation_design.md

## Stop Points

- `[USER_DECISION]`: 文档放置存在争议（目录边界/模块划分不确定）

## 约束

1. **禁止修改 `/docs/参考/`** - 仅 Librarian 可维护
2. **基于目录划分** - 每个独立目录创建独立 design.md
3. **基于复杂度判断** - 低复杂度可省略，中高复杂度必须创建
4. **必须包含接口契约** - 输入/输出/依赖必须明确定义
5. **渐进式披露** - 复杂度越高，设计文档越详细
6. **目录深度标记** - 记录目录深度用于并行执行调度
7. **跨目录依赖声明** - 必须声明与其他目录的依赖关系
8. 必须引用SSOT：05_constraints/state_dictionary.md、05_constraints/command_dictionary.md

## Failure Handling

- 当发现需要修改 `/docs/参考/` 且非 Librarian 场景时，必须停止并转为 `[USER_DECISION]` 或交由 Librarian 处理

## 快速参考
参见：AGENT_SOP.md（design.md 规则）+ 04_reference/design_directory_strategy.md
