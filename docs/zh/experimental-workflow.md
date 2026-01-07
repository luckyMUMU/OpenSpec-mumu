# 实验性工作流 (OPSX)

> **状态:** 实验性。可能会出错。欢迎在 [Discord](https://discord.gg/BYjPaKbqMt) 上提供反馈。
>
> **兼容性:** 仅 Claude Code (目前)

## 它是什么？

OPSX 是使用 OpenSpec 变更的新方法。不是一大型提案，而是逐步构建**artifacts**:

```
proposal → specs → design → tasks → implementation → archive
```

每个 artifact 都有依赖。在有 specs 之前不能写 tasks。在有 tasks 之前不能实现。系统跟踪什么是准备好的，什么是被阻止的。

## 设置

```bash
# 1. 确保你已安装并初始化 openspec
openspec init

# 2. 生成实验性技能
openspec artifact-experimental-setup
```

这在 Claude Code 自动检测的 `.claude/skills/` 中创建技能。

## 命令

| 命令 | 作用 |
|---------|--------------|
| `/opsx:new` | 开始新变更 |
| `/opsx:continue` | 创建下一个 artifact |
| `/opsx:ff` | 快进 (一次创建所有 artifacts) |
| `/opsx:apply` | 实现任务 |
| `/opsx:sync` | 同步 delta specs 到主 specs |
| `/opsx:archive` | 完成时归档 |

## 使用

### 开始新变更
```
/opsx:new
```
将询问你想要构建什么以及使用哪个工作流 schema。

### 逐步构建 artifacts
```
/opsx:continue
```
一次创建一个 artifact。适合审查每个步骤。

### 或快进
```
/opsx:ff add-dark-mode
```
一次创建所有 artifacts。当你知道想要什么时很好。

### 实现
```
/opsx:apply
```
处理任务，完成时打勾。

### 同步 specs 和归档
```
/opsx:sync      # 用你的 delta specs 更新主 specs
/opsx:archive   # 完成时移动到归档
```

## 有什么不同？

**标准工作流** (`/openspec:proposal`):
- 一大型提案文档
- 线性阶段: plan → implement → archive
- 全有或全无的 artifact 创建

**实验性工作流** (`/opsx:*`):
- 有依赖的离散 artifacts
- 流动操作 (不是阶段) - 随时更新 artifacts
- 逐步或快进
- Schema 驱动 (可自定义工作流)

关键见解: 工作不是线性的。你实现，意识到设计错误，更新它，继续。OPSX 支持这个。

## Schemas

Schemas 定义存在哪些 artifacts 及其依赖。目前可用:

- **spec-driven** (默认): proposal → specs → design → tasks
- **tdd**: tests → implementation → docs

运行 `openspec schemas` 查看可用 schemas。

## 提示

- 当你有清晰想法时使用 `/opsx:ff`，探索时使用 `/opsx:continue`
- 任务通过 `tasks.md` 中的复选框跟踪进度
- Delta specs (在 `specs/` 中) 用 `/opsx:sync` 同步到主 specs
- 如果卡住，状态命令显示被阻止的内容: `openspec status --change "name"`

## 反馈

这很粗糙。这是有意的 - 我们在学习什么有效。

发现错误？有想法？加入我们的 [Discord](https://discord.gg/BYjPaKbqMt) 或在 [GitHub](https://github.com/Fission-AI/openspec/issues) 上开问题。