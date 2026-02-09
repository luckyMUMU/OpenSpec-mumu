---
name: "sop-design-placement"
description: "指导AI Agent正确放置设计文档和创建design.md。Invoke when creating design documents or design.md files, to determine the correct placement based on module division and complexity."
---

# 设计文档放置指南

> **版本**: v1.4.0

## 目录结构规范

### 文档放置位置

| 目录 | 用途 | 变更权限 | 示例 |
|------|------|----------|------|
| `/docs` | 项目设计文档根目录 | 项目开发过程中动态创建 | `docs/README.md` |
| `/docs/01_requirements/` | PRD 需求文档 | Analyst 创建 | `docs/01_requirements/feature-x.md` |
| `/docs/02_logical_workflow/` | 架构设计文档 | Prometheus 创建 | `docs/02_logical_workflow/core.md` |
| `/docs/参考/` | SOP 参考文档、模板 | **非指定不变更** | `docs/参考/sop/...` |
| `src/**/` | 源代码目录 | Worker 修改 | `src/module/design.md` |
| `docs/**/` | 模块设计文档 | Oracle 创建 | `docs/module/design.md` |

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
```
模块根目录/
├── design.md          # 模块设计文档
├── src/               # 源代码
├── tests/             # 测试代码
└── README.md          # 模块说明
```

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
```
评估模块复杂度
    │
    ├─ 低 → 代码注释说明，不创建独立 design.md
    │
    ├─ 中 → 创建简要 design.md（接口契约 + 任务清单）
    │
    └─ 高 → 创建完整 design.md（完整设计 + 详细契约）
```

### 3. 目录层级与并行执行

**目录深度与执行顺序**:
```
深度 3: src/core/utils/design.md      → 第一批并行（最深，无依赖）
深度 3: src/core/helpers/design.md    → 第一批并行
深度 2: src/core/design.md            → 第二批（依赖第一批）
深度 2: src/api/design.md             → 第二批并行
深度 1: src/design.md                 → 第三批（依赖第二批）
```

**Worker 分配**:
- 每个 design.md 目录分配一个 Worker
- 同深度无依赖的目录并行执行
- 父目录等待子目录完成后才能开始

### 4. 接口契约规范

每个 design.md 必须包含接口契约章节：

```markdown
## 接口契约

### 输入
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| [param1] | [type] | 是 | [description] |
| [param2] | [type] | 否 | [description] |

### 输出
| 返回值 | 类型 | 说明 |
|--------|------|------|
| [return1] | [type] | [description] |
| [error] | [Error] | [error description] |

### 目录依赖
| 目录 | 接口 | 用途 |
|------|------|------|
| [dir_path] | [interface] | [purpose] |

### 被依赖接口
| 目录 | 接口 | 用途 |
|------|------|------|
| [dir_path] | [interface] | [purpose] |
```

### 5. 跨目录依赖声明

在 design.md 中声明跨目录依赖：

```markdown
## 目录依赖声明

### 依赖的目录
| 目录路径 | 依赖类型 | 说明 |
|----------|----------|------|
| src/core/ | 接口依赖 | 使用 CoreService |
| src/utils/ | 工具依赖 | 使用 helper 函数 |

### 被依赖的目录
| 目录路径 | 用途 |
|----------|------|
| src/api/ | API 层调用本模块 |
| src/web/ | Web 层调用本模块 |
```

## 工作流程

### Step 1: 确定文档类型

| 文档类型 | 创建者 | 放置位置 |
|----------|--------|----------|
| PRD | Analyst | `docs/01_requirements/*.md` |
| 架构设计 | Prometheus | `docs/02_logical_workflow/*.md` |
| 实现设计 | Oracle | `src/**/design.md` 或 `docs/**/design.md` |

### Step 2: 评估模块复杂度

**检查项**:
- [ ] 估算代码行数
- [ ] 识别外部依赖数量
- [ ] 评估功能复杂度
- [ ] 判断是否需要独立模块

### Step 3: 确定放置位置

**决策树**:
```
创建 design.md？
    │
    ├─ 是 → 模块位置？
    │       │
    │       ├─ src/ 下 → `src/module/design.md`
    │       │
    │       └─ 顶层模块 → `docs/module/design.md`
    │
    └─ 否 → 代码注释说明
```

### Step 4: 创建接口契约

**必须包含**:
- 输入参数定义
- 输出返回值定义
- 依赖目录列表
- 被依赖目录列表
- 目录深度信息

## 输入

```markdown
## 模块信息
- **模块名称**: [name]
- **模块路径**: [path]
- **目录深度**: [depth]
- **功能描述**: [description]

## 复杂度评估
- [ ] 低（<100行）
- [ ] 中（100-500行）
- [ ] 高（>500行）

## 依赖分析
- 依赖目录: [list]
- 被依赖目录: [list]
```

## 输出

### 场景 1: 省略 design.md
```markdown
## 决策结果
- **创建 design.md**: 否
- **原因**: 复杂度低，代码注释即可
- **建议**: 在代码文件中添加详细注释
```

### 场景 2: 创建简要 design.md
```markdown
## 决策结果
- **创建 design.md**: 是
- **位置**: `src/module/design.md`
- **深度**: 2
- **复杂度**: 中
- **内容**: 接口契约 + 简要任务清单
```

### 场景 3: 创建完整 design.md
```markdown
## 决策结果
- **创建 design.md**: 是
- **位置**: `docs/module/design.md`
- **深度**: 2
- **复杂度**: 高
- **内容**: 完整设计 + 详细接口契约 + 任务清单 + 测试策略
```

## 约束

1. **禁止修改 `/docs/参考/`** - 仅 Librarian 可维护
2. **基于目录划分** - 每个独立目录创建独立 design.md
3. **基于复杂度判断** - 低复杂度可省略，中高复杂度必须创建
4. **必须包含接口契约** - 输入/输出/依赖必须明确定义
5. **渐进式披露** - 复杂度越高，设计文档越详细
6. **目录深度标记** - 记录目录深度用于并行执行调度
7. **跨目录依赖声明** - 必须声明与其他目录的依赖关系

## 快速参考

| 场景 | 决策 | 位置 | 内容 | 深度 |
|------|------|------|------|------|
| 简单工具函数（<100行） | 不创建 | - | 代码注释 | - |
| 中等模块（100-500行） | 创建 | `src/module/design.md` | 接口契约 + 任务清单 | 按实际 |
| 复杂模块（>500行） | 创建 | `docs/module/design.md` | 完整设计 + 详细契约 | 按实际 |
| 子模块 | 创建 | `src/parent/child/design.md` | 按需 | depth+1 |
