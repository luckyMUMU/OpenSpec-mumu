# 模式工作流：端到端分析

本文档分析了在 OpenSpec 中使用模式的完整用户体验，识别差距，并提出分阶段解决方案。

---

## 当前状态

### 现有组件

| 组件 | 状态 |
|-----------|--------|
| 模式解析 (XDG) | 2级：用户覆盖 → 包内置 |
| 内置模式 | `spec-driven`, `tdd` |
| 构件工作流命令 | `status`, `next`, `instructions`, `templates` 带 `--schema` 标志 |
| 变更创建 | `openspec new change <name>` — 无模式绑定 |

### 缺失组件

| 组件 | 状态 |
|-----------|--------|
| 绑定到变更的模式 | 未存储 — 每次必须传递 `--schema` |
| 项目本地模式 | 不支持 — 无法与仓库版本控制 |
| 模式管理 CLI | 无 — 需要手动路径发现 |
| 项目默认模式 | 无 — 硬编码为 `spec-driven` |

---

## 用户旅程分析

### 场景1：使用非默认模式

**目标：** 用户希望对新功能使用 TDD 工作流。

**当前体验：**
```bash
openspec new change add-auth
# 创建目录，未存储模式信息

openspec status --change add-auth
# 显示 spec-driven 构件 (错误 - 用户想要 TDD)

# 用户意识到错误...
openspec status --change add-auth --schema tdd
# 正确，但必须记住每次使用 --schema

# 6个月后...
openspec status --change add-auth
# 再次错误 - 没人记得这是 TDD
```

**问题：**
- 模式是运行时参数，不是持久化存储的
- 容易忘记 `--schema` 并得到错误结果
- 没有未来参考的预期模式记录

---

### 场景2：自定义模式

**目标：** 用户希望在 "proposal" 之前添加一个 "research" 构件。

**当前体验：**
```bash
# 步骤1：弄清楚在哪里放置覆盖
# 必须知道 XDG 约定:
#   macOS/Linux: ~/.local/share/openspec/schemas/
#   Windows: %LOCALAPPDATA%\openspec\schemas/

# 步骤2：创建目录结构
mkdir -p ~/.local/share/openspec/schemas/my-workflow/templates

# 步骤3：查找 npm 包以复制默认值
npm list -g openspec --parseable
# 输出因包管理器而异:
#   npm: /usr/local/lib/node_modules/openspec
#   pnpm: ~/.local/share/pnpm/global/5/node_modules/openspec
#   volta: ~/.volta/tools/image/packages/openspec/...
#   yarn: ~/.config/yarn/global/node_modules/openspec

# 步骤4：复制文件
cp -r <package-path>/schemas/spec-driven/* \
      ~/.local/share/openspec/schemas/my-workflow/

# 步骤5：编辑 schema.yaml 和模板
# 无法验证覆盖是否激活
# 无法与原始版本进行差异比较
```

**问题：**
- 必须知道 XDG 路径约定
- 查找 npm 包路径因安装方法而异
- 没有工具来搭建或验证
- 升级 openspec 时没有差异比较功能

---

### 场景3：团队共享自定义工作流

**目标：** 团队希望每个人使用相同的自定义模式。

**当前选项：**
1. 每个人手动设置 XDG 覆盖 — 容易出错，漂移风险
2. 在 README 中记录设置 — 仍然是手动的，容易遗漏
3. 发布单独的 npm 包 — 对大多数团队来说过于复杂
4. 将模式检入仓库 — **不支持** (无项目本地解析)

**问题：**
- 无项目本地模式解析
- 无法与代码库一起版本控制自定义模式
- 团队工作流无单一事实来源

---

## 差距总结

| 差距 | 影响 | 解决方案 |
|-----|--------|------------|
| 模式未绑定到变更 | 错误结果，遗忘上下文 | 记住传递 `--schema` |
| 无项目本地模式 | 无法通过仓库共享 | 每台机器手动 XDG 设置 |
| 无模式管理 CLI | 手动路径查找 | 了解 XDG + 查找 npm 包 |
| 无项目默认模式 | 每次必须指定 | 始终传递 `--schema` |
| 无初始化时模式选择 | 错过设置机会 | 手动配置 |

---

## 提议的架构

### 新文件结构

```
openspec/
├── config.yaml                 # 项目配置 (新增)
├── schemas/                    # 项目本地模式 (新增)
│   └── my-workflow/
│       ├── schema.yaml
│       └── templates/
│           ├── research.md
│           ├── proposal.md
│           └── ...
└── changes/
    └── add-auth/
        ├── change.yaml         # 变更元数据 (新增)
        ├── proposal.md
        └── ...
```

### config.yaml (项目配置)

```yaml
# openspec/config.yaml
defaultSchema: spec-driven
```

设置项目范围的默认模式。使用时机：
- 创建没有 `--schema` 的新变更时
- 在没有 `change.yaml` 的变更上运行命令时

### change.yaml (变更元数据)

```yaml
# openspec/changes/add-auth/change.yaml
schema: tdd
created: 2025-01-15T10:30:00Z
description: Add user authentication system
```

将特定模式绑定到变更。由 `openspec new change` 自动创建。

### 模式解析顺序

```
1. ./openspec/schemas/<name>/                    # 项目本地
2. ~/.local/share/openspec/schemas/<name>/       # 用户全局 (XDG)
3. <npm-package>/schemas/<name>/                 # 内置
```

项目本地优先，支持版本控制的自定义模式。

### 模式选择顺序 (每个命令)

```
1. --schema CLI 标志                    # 显式覆盖
2. change.yaml 中的变更目录      # 变更特定绑定
3. openspec/config.yaml defaultSchema   # 项目默认
4. "spec-driven"                        # 硬编码回退
```

---

## 理想用户体验

### 创建变更

```bash
# 使用项目默认 (来自 config.yaml, 或 spec-driven)
openspec new change add-auth
# 创建 openspec/changes/add-auth/change.yaml:
#   schema: spec-driven
#   created: 2025-01-15T10:30:00Z

# 为这个变更显式指定模式
openspec new change add-auth --schema tdd
# 使用 schema: tdd 创建 change.yaml
```

### 处理变更

```bash
# 自动从 change.yaml 读取模式 — 无需 --schema
openspec status --change add-auth
# 输出: "Change: add-auth (schema: tdd)"
# 显示哪些构件已准备/被阻塞/完成

# 显式覆盖仍然有效 (带信息消息)
openspec status --change add-auth --schema spec-driven
# "注意: change.yaml 指定 'tdd', 根据 --schema 标志使用 'spec-driven'"
```

### 自定义模式

```bash
# 查看可用内容
openspec schema list
# 内置:
#   spec-driven    proposal → specs → design → tasks
#   tdd            spec → tests → implementation → docs
# 项目: (无)
# 用户: (无)

# 复制到项目进行自定义
openspec schema copy spec-driven my-workflow
# 创建 ./openspec/schemas/my-workflow/
# 编辑 schema.yaml 和 templates/ 进行自定义

# 复制到全局 (用户级别覆盖)
openspec schema copy spec-driven --global
# 创建 ~/.local/share/openspec/schemas/spec-driven/

# 查看模式解析来源
openspec schema which spec-driven
# ./openspec/schemas/spec-driven/ (项目)
# 或: ~/.local/share/openspec/schemas/spec-driven/ (用户)
# 或: /usr/local/lib/node_modules/openspec/schemas/spec-driven/ (内置)

# 比较覆盖与内置版本
openspec schema diff spec-driven
# 显示用户/项目版本与包内置的差异

# 删除覆盖，恢复到内置
openspec schema reset spec-driven
# 删除 ./openspec/schemas/spec-driven/ (或 --global 用于用户目录)
```

### 项目设置

```bash
openspec init
# ? 选择默认工作流模式:
#   > spec-driven (proposal → specs → design → tasks)
#     tdd (spec → tests → implementation → docs)
#     (检测到的自定义模式)
#
# 写入 openspec/config.yaml:
#   defaultSchema: spec-driven
```

---

## 实施阶段

### 第一阶段：变更元数据 (change.yaml)

**优先级：** 高
**解决：** "忘记 --schema"，丢失上下文，错误结果

**范围：**
- 运行 `openspec new change` 时创建 `change.yaml`
- 存储 `schema`, `created` 时间戳
- 修改工作流命令以从 `change.yaml` 读取模式
- `--schema` 标志覆盖 (带信息消息)
- 向后兼容：缺少 `change.yaml` → 使用默认值

**change.yaml 格式：**
```yaml
schema: tdd
created: 2025-01-15T10:30:00Z
```

**迁移：**
- 没有 `change.yaml` 的现有变更继续工作
- 默认为 `spec-driven` (当前行为)
- 可选：`openspec migrate` 为现有变更添加 `change.yaml`

---

### 第二阶段：项目本地模式

**优先级：** 高
**解决：** 团队共享，版本控制，无需 XDG 知识

**范围：**
- 将 `./openspec/schemas/` 添加到解析顺序 (第一优先级)
- `openspec schema copy <name> [new-name]` 默认在项目中创建
- `--global` 标志用于用户级 XDG 目录
- 团队可以将 `openspec/schemas/` 提交到仓库

**解析顺序：**
```
1. ./openspec/schemas/<name>/           # 项目本地 (新增)
2. ~/.local/share/openspec/schemas/<name>/  # 用户全局
3. <npm-package>/schemas/<name>/        # 内置
```

---

### 第三阶段：模式管理 CLI

**优先级：** 中
**解决：** 路径发现，脚手架，调试

**命令：**
```bash
openspec schema list              # 显示可用模式及其来源
openspec schema which <name>      # 显示解析路径
openspec schema copy <name> [to]  # 复制以进行自定义
openspec schema diff <name>       # 与内置版本比较
openspec schema reset <name>      # 删除覆盖
openspec schema validate <name>   # 验证 schema.yaml 结构
```

---

### 第四阶段：项目配置 + 初始化增强

**优先级：** 低
**解决：** 项目范围默认值，简化设置

**范围：**
- 添加 `openspec/config.yaml` 带 `defaultSchema` 字段
- `openspec init` 提示选择模式
- 在 `config.yaml` 中存储选择
- 命令在没有 `change.yaml` 存在时用作回退

**config.yaml 格式：**
```yaml
defaultSchema: spec-driven
```

---

## 向后兼容性

| 场景 | 行为 |
|----------|----------|
| 没有 `change.yaml` 的现有变更 | 使用 `--schema` 标志或项目默认或 `spec-driven` |
| 没有 `config.yaml` 的现有项目 | 回退到 `spec-driven` |
| 提供了 `--schema` 标志 | 覆盖 `change.yaml` (带信息消息) |
| 无项目本地模式目录 | 在解析中跳过，检查用户/内置 |

所有现有功能继续工作。新功能是附加的。

---

## 相关文档

- [模式自定义](./schema-customization.md) — 手动覆盖过程和 CLI 差距的详细信息
- [构件概念验证](./artifact_poc.md) — 核心构件图架构

## 相关代码

| 文件 | 用途 |
|------|---------|
| `src/core/artifact-graph/resolver.ts` | 模式解析逻辑 |
| `src/core/artifact-graph/instruction-loader.ts` | 模板加载 |
| `src/core/global-config.ts` | XDG 路径辅助函数 |
| `src/commands/artifact-workflow.ts` | CLI 命令 |
| `src/utils/change-utils.ts` | 变更创建工具 |