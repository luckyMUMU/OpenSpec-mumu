# Artifact POC (概念验证)

## 术语

- **Schema**: 定义一组 artifacts 及其依赖关系的规范 (例如: `spec-driven`, `tdd`, `prototype-first`)
- **Artifact**: 一个需要创建的文件或文件集合 (例如: `proposal.md`, `specs/*.md`)
- **Change**: 一个工作单元，包含一组 artifacts 的实例 (例如: `openspec/changes/add-auth/`)
- **Dependency**: artifact 依赖于另一个 artifact (例如: `design.md` 依赖于 `proposal.md`)

## 核心组件

### 1. ArtifactGraph (核心逻辑)

纯函数式依赖图，用于状态检测和拓扑排序。

```typescript
// src/core/artifact-graph/types.ts
const ArtifactSchema = z.object({
  id: z.string().min(1),
  generates: z.string().min(1),      // e.g., "proposal.md" or "specs/*.md"
  description: z.string(),
  template: z.string(),              // path to template file
  requires: z.array(z.string()).default([]),
});

const SchemaYamlSchema = z.object({
  name: z.string().min(1),
  version: z.number().int().positive(),
  description: z.string().optional(),
  artifacts: z.array(ArtifactSchema).min(1),
});

// src/core/artifact-graph/graph.ts
class ArtifactGraph {
  artifacts: Artifact[];              // 从 schema.yaml 解析
  dependencies: Map<ArtifactId, ArtifactId[]>;  // 邻接表表示法
  topoSort(): ArtifactId[];          // 拓扑排序 - 没有循环依赖
  getDependencies(artifactId: string): ArtifactId[];
  getDependents(artifactId: string): ArtifactId[];  // 依赖此 artifact 的 artifacts
}
```

### 2. Change Utilities (变更工具)

用于程序化创建和管理 changes 的工具函数。

```typescript
// src/core/change-utils.ts
function createChange(projectRoot: string, name: string, description?: string): Promise<void>;
function validateChangeName(name: string): boolean;  // 强制使用 kebab-case 模式
```

### 3. InstructionLoader (指令加载器)

模板解析 + 依赖状态注入。

```typescript
// src/core/instruction-loader.ts
class InstructionLoader {
  async getInstructions(changePath: string, schemaName: string, artifactId: string): Promise<string>;
  // 1. 加载 schema (XDG 优先级: 用户覆盖 → 内置)
  // 2. 构建 ArtifactGraph
  // 3. 扫描 changePath 以确定完成状态
  // 4. 解析模板 (XDG 优先级: 用户覆盖 → 内置)
  // 5. 注入上下文 (依赖状态: ✓/✗, 输出路径等)
}
```

### 4. CLI Commands (命令行工具)

新命令，建立在现有 CLI 基础之上。

```typescript
// src/commands/artifact.ts
class StatusCommand {
  execute(changeId: string): void;  // 显示 artifact 完成状态
}
class NextCommand {
  execute(changeId: string): void;  // 显示准备创建的 artifacts
}
class InstructionsCommand {
  execute(artifactId: string, changeId: string): void;  // 获取富模板
}
```

### 5. Claude Commands (Claude 指令)

AI 助手集成。

```markdown
# .claude/commands/artifacts.md
/openspec-status <change-id>     # 显示 artifact 完成状态
/openspec-next <change-id>       # 显示下一个要创建的 artifacts
/openspec-instructions <artifact-id> <change-id>  # 获取创建 artifact 的指令
```

## 核心设计模式

### 1. 文件系统作为数据库

没有 SQLite，没有 JSON 状态文件。`proposal.md` 的存在意味着提案已完成。

```
// 状态检测只是文件存在性检查
if (exists(artifactPath)) {
  completed.add(artifactId)
}
```

### 2. 确定性 CLI，推断型 Agent

**CLI 层：** 始终确定 - 需要显式的 `--change` 参数。

```
openspec status --change add-auth     # 显式，有效
openspec status                        # 错误: "未指定变更"
```

**Agent 层：** 从对话中推断，在不确定时确认，传递显式 `--change`。

这种分离意味着：
- CLI 是纯的，可测试的，没有状态会被损坏
- Agent 处理所有"智能"
- 没有跟踪"活动变更"的 config.yaml

### 3. 符合 XDG 的 Schema 解析

```
${XDG_DATA_HOME}/openspec/schemas/<name>/schema.yaml   # 用户覆盖
    ↓ (未找到)
<package>/schemas/<name>/schema.yaml                    # 内置
    ↓ (未找到)
错误 (未找到 schema)
```

### 4. 两级模板回退

```
${XDG_DATA_HOME}/openspec/schemas/<schema>/templates/<artifact>.md  # 用户覆盖
    ↓ (未找到)
<package>/schemas/<schema>/templates/<artifact>.md                   # 内置
    ↓ (未找到)
错误 (无静默回退以避免混淆)
```

### 5. Glob 模式支持

`specs/*.md` 允许多个文件满足单个 artifact：

```
if (artifact.generates.includes("*")) {
  const parentDir = changeDir / patternParts[0]
  if (exists(parentDir) && hasFiles(parentDir)) {
    completed.add(artifactId)
  }
}
```

### 6. 无状态状态检测

每个命令重新扫描文件系统。没有可能损坏的缓存状态。

---

## Artifact 管道 (默认 Schema)

默认的 `spec-driven` schema:

```
┌──────────┐
│ proposal │  (无依赖)
└────┬─────┘
     │
     ▼
┌──────────┐
│  specs   │  (需要: proposal)
└────┬─────┘
     │
     ├──────────────┐
     ▼              ▼
┌──────────┐   ┌──────────┐
│  design  │   │          │
│          │◄──┤ proposal │
└────┬─────┘   └──────────┘
     │         (需要: proposal, specs)
     ▼
┌──────────┐
│  tasks   │  (需要: design)
└──────────┘
```

其他 schemas (TDD, prototype-first) 将有不同的图。

---
## 实现顺序

结构化为**垂直切片** - 每个切片可独立测试。

---

### 切片 1: "什么准备好了？" (核心查询) ✅ 完成

**交付：** 类型 + 图 + 状态检测 + Schema 解析

**实现：** `src/core/artifact-graph/`
- `types.ts` - Zod schemas 和派生的 TypeScript 类型
- `schema.ts` - 带 Zod 验证的 YAML 解析
- `graph.ts` - 带拓扑排序的 ArtifactGraph 类
- `state.ts` - 基于文件系统的状态检测
- `resolver.ts` - 符合 XDG 的 schema 解析
- `builtin-schemas.ts` - 包捆绑的默认 schemas

**关键决策：**
- Zod 用于 schema 验证 (与项目一致)
- XDG 用于全局 schema 覆盖
- `Set<string>` 用于完成状态 (不可变，函数式)
- `inProgress` 和 `failed` 状态推迟 (需要外部跟踪)

---

### 切片 2: "变更创建工具"

**交付：** 程序化变更创建的工具函数

**范围：**
- `createChange(projectRoot, name, description?)` → 创建目录 + README
- `validateChangeName(name)` → kebab-case 模式强制

**不在范围内 (CLI 命令中已存在)：**
- `listChanges()` → 存在于 `ListCommand` 和 `ChangeCommand.getActiveChanges()` 中
- `getChangePath()` → 简单的 `path.join()` 内联
- `changeExists()` → 简单的 `fs.access()` 内联
- `isInitialized()` → 简单目录检查内联

**为什么简化：** 提取现有的 CLI 逻辑到一个类中需要类似重构 `SpecCommand` 以保持一致性。现有代码工作良好 (~15 行每个)。唯一真正的新功能是 `createChange()` + 名称验证。

---

### 切片 3: "获取指令" (增强)

**交付：** 模板解析 + 上下文注入

**可测试行为：**
- 模板回退: schema 特定 → 共享 → 内置 → 错误
- 上下文注入: 完成的依赖显示 ✓, 缺失的显示 ✗
- 基于变更目录的输出路径正确显示

---

### 切片 4: "CLI + 集成"

**交付：** 新的 artifact 图命令 (建立在现有 CLI 基础上)

**新命令：**
- `status --change <id>` - 显示 artifact 完成状态
- `next --change <id>` - 显示准备创建的 artifacts
- `instructions <artifact> --change <id>` - 获取富模板
- `templates --change <id>` - 显示解析的路径
- `new <name>` - 创建变更 (对 `createChange()` 的包装)

**已存在 (不在范围内)：**
- `openspec change list/show/validate` - 变更管理
- `openspec list --changes/--specs` - 列出
- `openspec view` - 仪表板
- `openspec init` - 初始化

**可测试行为：**
- 每个新命令产生预期输出
- 命令组合正确 (status → next → instructions 流程)
- 缺失变更、无效 artifacts 等的错误处理

---

## 目录结构

```
# 全局 (XDG 路径 - 用户覆盖)
~/.local/share/openspec/           # Unix/macOS ($XDG_DATA_HOME/openspec/)
%LOCALAPPDATA%/openspec/           # Windows
└── schemas/                       # Schema 覆盖
    └── custom-workflow/           # 用户定义的 schema 目录
        ├── schema.yaml            # Schema 定义
        └── templates/             # 共位置模板
            └── proposal.md

# 包 (内置默认值)
<package>/
└── schemas/                       # 内置 schema 定义
    ├── spec-driven/               # 默认: proposal → specs → design → tasks
    │   ├── schema.yaml
    │   └── templates/
    │       ├── proposal.md
    │       ├── design.md
    │       ├── spec.md
    │       └── tasks.md
    └── tdd/                       # TDD: tests → implementation → docs
        ├── schema.yaml
        └── templates/
            ├── test.md
            ├── implementation.md
            ├── spec.md
            └── docs.md

# 项目 (变更实例)
openspec/
└── changes/                       # 变更实例
    ├── add-auth/
    │   ├── README.md              # 创建时自动生成
    │   ├── proposal.md            # 创建的 artifacts
    │   ├── design.md
    │   └── specs/
    │       └── *.md
    ├── refactor-db/
    │   └── ...
    └── archive/                   # 完成的变更
        └── 2025-01-01-add-auth/

.claude/
├── settings.local.json            # 权限
└── commands/                      # 斜杠命令
    └── *.md
```

---

## Schema YAML 格式

```yaml
# 内置: <package>/schemas/spec-driven/schema.yaml
# 或用户覆盖: ~/.local/share/openspec/schemas/spec-driven/schema.yaml
name: spec-driven
version: 1
description: Specification-driven development

artifacts:
  - id: proposal
    generates: "proposal.md"
    description: "创建项目提案文档"
    template: "proposal.md"          # 从共位置 templates/ 目录解析
    requires: []

  - id: specs
    generates: "specs/*.md"          # glob 模式
    description: "创建技术规范文档"
    template: "specs.md"
    requires:
      - proposal

  - id: design
    generates: "design.md"
    description: "创建设计文档"
    template: "design.md"
    requires:
      - proposal
      - specs

  - id: tasks
    generates: "tasks.md"
    description: "创建任务分解文档"
    template: "tasks.md"
    requires:
      - design
```

---

## 总结

| 层 | 组件 | 职责 | 状态 |
|-------|-----------|----------------|--------|
| 核心 | ArtifactGraph | 纯依赖逻辑 + XDG schema 解析 | ✅ 切片 1 完成 |
| 工具 | change-utils | 仅变更创建 + 名称验证 | 切片 2 (仅新功能) |
| 核心 | InstructionLoader | 模板解析 + 增强 | 切片 3 (全部新功能) |
| 表示层 | CLI | 新的 artifact 图命令 | 切片 4 (仅新命令) |
| 集成 | Claude Commands | AI 助手胶水 | 切片 4 |

**已存在 (不在此提案中)：**
- `getActiveChangeIds()` in `src/utils/item-discovery.ts` - 列出变更
- `ChangeCommand.list/show/validate()` in `src/commands/change.ts`
- `ListCommand.execute()` in `src/core/list.ts`
- `ViewCommand.execute()` in `src/core/view.ts` - 仪表板
- `src/core/init.ts` - 初始化
- `src/core/archive.ts` - 归档

**关键原则：**
- **文件系统即数据库** - 无状态，版本控制友好
- **依赖是推动者** - 显示可能的，不强制顺序
- **确定性 CLI，推断型 agent** - CLI 需要显式 `--change`，agent 从上下文推断
- **符合 XDG 的路径** - schemas 和 templates 使用标准用户数据目录
- **2级继承** - 用户覆盖 → 包内置 (无更深层)
- **Schemas 有版本** - 支持不同哲学、版本、语言的变体