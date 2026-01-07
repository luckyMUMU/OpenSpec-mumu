# OpenSpec 实验性发布计划

本文档概述了发布新的实验性 artifact 工作流系统以供用户测试的计划。

## 概述

目标是允许用户在现有 OpenSpec 命令旁边测试新的 artifact 驱动工作流系统。这个实验性系统 (`opsx`) 提供了更细粒度的、逐步创建变更 artifact 的方法。

## 三种工作流模式

### 1. 旧工作流 (当前生产环境)
- **命令**: `/openspec:proposal`, `/openspec:apply`, `/openspec:archive`
- **行为**: 硬编码的斜杠命令，一个命令生成所有 artifacts
- **状态**: 生产环境，不变

### 2. 新 Artifact 系统 - 批处理模式 (未来)
- **命令**: 使用 schemas 重构的 `/openspec:proposal`
- **行为**: Schema 驱动但一次生成所有 artifacts (像旧版)
- **状态**: 不在此实验性发布范围内
- **注意**: 这是未来统一旧系统和 schemas 的重构

### 3. 新 Artifact 系统 - 细粒度模式 (实验性)
- **命令**: `/opsx:new`, `/opsx:continue`
- **行为**: 一次一个 artifact，依赖驱动，迭代式
- **状态**: 此实验性发布的目标

---

## 工作项目

### 1. 将 AWF 重命名为 OPSX

**当前状态:**
- 命令: `/awf:start`, `/awf:continue`
- 文件: `.claude/commands/awf/start.md`, `.claude/commands/awf/continue.md`

**目标状态:**
- 命令: `/opsx:new`, `/opsx:continue`
- 文件: `.claude/commands/opsx/new.md`, `.claude/commands/opsx/continue.md`

**任务:**
- [x] 创建 `.claude/commands/opsx/` 目录
- [x] 重命名 `start.md` → `new.md` 并更新内容
- [x] 复制 `continue.md` 并更新引用
- [x] 在命令内容中更新所有从 "awf" 到 "opsx" 的引用
- [x] 更新 frontmatter (name, description) 以使用 "opsx" 命名
- [x] 删除 `.claude/commands/awf/` 目录

**CLI 命令:**
底层 CLI 命令 (`openspec status`, `openspec instructions` 等) 保持不变。只有斜杠命令名称改变。

---

### 2. 移除 WF 技能文件

**当前状态:**
- `.claude/commands/wf/start.md` - 引用不存在的 `openspec wf` 命令
- `.claude/commands/wf/continue.md` - 引用不存在的 `openspec wf` 命令

**目标状态:**
- 目录和文件删除

**任务:**
- [x] 删除 `.claude/commands/wf/start.md`
- [x] 删除 `.claude/commands/wf/continue.md`
- [x] 删除 `.claude/commands/wf/` 目录

---

### 3. 为实验性工作流添加 Agent 技能

**目的:**
使用 [Agent Skills](https://agentskills.io/specification) 开放标准生成实验性工作流技能。

**为什么使用技能而不是斜杠命令:**
- **跨编辑器兼容性**: 技能在 Claude Code、Cursor、Windsurf 和其他兼容编辑器中自动工作
- **更简单的实现**: 单个目录 (`.claude/skills/`) 而不是 18+ 个编辑器特定的配置器
- **标准格式**: 开放标准，带有简单的 YAML frontmatter + markdown
- **用户调用**: 用户在想要使用时明确调用技能

**行为:**
1. 如果不存在则创建 `.claude/skills/` 目录
2. 使用 Agent Skills 规范生成两个技能:
   - `openspec-new-change/SKILL.md` - 使用 artifact 工作流开始新变更
   - `openspec-continue-change/SKILL.md` - 继续处理变更 (创建下一个 artifact)
3. 技能与现有的 `/openspec:*` 命令一起添加 (不替换)

**支持的编辑器:**
- Claude Code (原生支持)
- Cursor (通过 Settings → Rules → Import Settings 原生支持)
- Windsurf (导入 `.claude` 配置)
- Cline、Codex 和其他 Agent Skills 兼容编辑器

**任务:**
- [x] 为 `openspec-new-change` 创建技能模板内容 (基于当前的 opsx:new)
- [x] 为 `openspec-continue-change` 创建技能模板内容 (基于当前的 opsx:continue)
- [x] 在 CLI 中添加临时的 `artifact-experimental-setup` 命令
- [x] 实现技能文件生成 (YAML frontmatter + markdown body)
- [x] 添加成功消息和使用说明

**注意:** `artifact-experimental-setup` 命令是临时的，一旦实验性工作流提升为稳定版，将合并到 `openspec init` 中。

**技能格式:**
每个技能都是一个目录，包含一个 `SKILL.md` 文件:
```
.claude/skills/
├── openspec-new-change/
│   └── SKILL.md          # name, description, instructions
├── openspec-continue-change/
│   └── SKILL.md          # name, description, instructions
└── openspec-apply-change/
    └── SKILL.md          # name, description, instructions
```

**CLI 接口:**
```bash
openspec artifact-experimental-setup

# 输出:
# 🧪 实验性 Artifact 工作流技能已创建
#
#   ✓ .claude/skills/openspec-new-change/SKILL.md
#   ✓ .claude/skills/openspec-continue-change/SKILL.md
#   ✓ .claude/skills/openspec-apply-change/SKILL.md
#
# 📖 使用:
#
#   技能在兼容编辑器中自动工作:
#   • Claude Code - 自动检测，准备使用
#   • Cursor - 在 Settings → Rules → Import Settings 中启用
#   • Windsurf - 从 .claude 目录自动导入
#
#   自然地询问 Claude:
#   • "我想开始一个新的 OpenSpec 变更来添加 <feature>"
#   • "继续处理这个变更"
#
#   Claude 将自动使用适当的技能。
#
# 💡 这是一个实验性功能。
#    欢迎反馈: https://github.com/Fission-AI/OpenSpec/issues
```

**实现说明:**
- 简单文件写入: 创建目录并写入模板化的 `SKILL.md` 文件 (无复杂逻辑)
- 使用现有的 `FileSystemUtils.writeFile()` 模式，如斜杠命令配置器
- 模板结构: YAML frontmatter + markdown body
- 保留现有的 `/opsx:*` 斜杠命令 (手动清理以后)
- 技能使用调用模型 (用户明确要求 Claude 使用它们)
- 技能 `description` 字段指导 Claude 何时建议使用技能
- 每个 `SKILL.md` 有必需字段: `name` (匹配目录) 和 `description`

---

### 4. 更新 `/opsx:new` 命令内容

**当前行为 (awf:start):**
1. 询问用户想要构建什么 (如果没有输入)
2. 创建变更目录
3. 显示 artifact 状态
4. 显示准备好的内容
5. 获取提案的指令
6. 停止并等待

**新行为 (opsx:new):**
相同流程但使用更新的命名:
- "awf" 的引用 → "opsx"
- `/awf:continue` 的引用 → `/opsx:continue`
- 更新 frontmatter name/description

**任务:**
- [x] 更新所有 "awf" 引用为 "opsx"
- [x] 更新提示文本中的命令引用
- [x] 验证 CLI 命令仍然工作 (它们使用 `openspec`，不是 `awf`)

---

### 5. 更新 `/opsx:continue` 命令内容

**当前行为 (awf:continue):**
1. 提示选择变更 (如果没有提供)
2. 检查当前状态
3. 基于准备好的内容创建一个 artifact
4. 显示进度和解锁的内容
5. 停止

**新行为 (opsx:continue):**
相同流程使用更新的命名。

**任务:**
- [x] 更新所有 "awf" 引用为 "opsx"
- [x] 更新提示文本中的命令引用

---

### 6. 端到端测试

**目标:**
使用新技能与 Claude 运行完整工作流来创建真实功能，验证整个流程工作。

**测试场景:**
使用真实 OpenSpec 功能作为测试用例 (dog-fooding)。

**测试流程:**
1. 运行 `openspec artifact-experimental-setup` 创建技能
2. 验证 `.claude/skills/openspec-new-change/SKILL.md` 已创建
3. 验证 `.claude/skills/openspec-continue-change/SKILL.md` 已创建
4. 验证 `.claude/skills/openspec-apply-change/SKILL.md` 已创建
5. 询问 Claude: "我想开始一个新的 OpenSpec 变更来添加功能 X"
6. 验证 Claude 调用 `openspec-new-change` 技能
7. 验证变更目录在 `openspec/changes/add-feature-x/` 创建
8. 验证提案模板显示
9. 询问 Claude: "继续处理这个变更"
10. 验证 Claude 调用 `openspec-continue-change` 技能
11. 验证 `proposal.md` 用内容创建
12. 询问 Claude: "继续" (创建 specs)
13. 验证 `specs/*.md` 创建
14. 询问 Claude: "继续" (创建 design)
15. 验证 `design.md` 创建
16. 询问 Claude: "继续" (创建 tasks)
17. 验证 `tasks.md` 创建
18. 验证状态显示 4/4 完成
19. 基于任务实现功能
20. 运行 `/openspec:archive` 归档变更

**验证检查清单:**
- [ ] `openspec artifact-experimental-setup` 创建正确的目录结构
- [ ] 技能在 Claude Code 中自动检测
- [ ] 技能描述触发适当的调用
- [ ] 技能创建变更目录并显示提案模板
- [ ] 技能正确识别准备好的 artifacts
- [ ] 技能创建带有有意义内容的 artifacts
- [ ] 依赖检测工作 (specs 需要 proposal，等等)
- [ ] 进度跟踪准确
- [ ] 模板内容有用且结构良好
- [ ] 错误处理工作 (无效名称，缺少变更，等等)
- [ ] 与不同 schemas 工作 (spec-driven, tdd)
- [ ] 在 Cursor 中测试 (Settings → Rules → Import Settings)

**记录结果:**
- 创建测试日志记录工作和不工作的内容
- 注意任何摩擦点或令人困惑的 UX
- 识别用户发布前需要的错误或改进

---

### 7. 用户文档

**创建面向用户的文档解释:**

1. **什么是实验性工作流？**
   - 使用 Agent Skills 逐步创建 OpenSpec 变更的新方法
   - 一次一个 artifact，依赖跟踪
   - 比批处理方法更交互和迭代
   - 在 Claude Code、Cursor、Windsurf 和其他兼容编辑器中工作

2. **如何设置实验性工作流**
   ```bash
   openspec artifact-experimental-setup
   ```

   注意: 这是一个临时命令，一旦提升为稳定版将集成到 `openspec init` 中。

3. **可用技能**
   - `openspec-new-change` - 使用 artifact 工作流开始新变更
   - `openspec-continue-change` - 继续处理 (创建下一个 artifact)

4. **如何使用**
   - **Claude Code**: 技能自动检测，只需自然地询问 Claude
     - "我想开始一个新的 OpenSpec 变更来添加 X"
     - "继续处理这个变更"
   - **Cursor**: 在 Settings → Rules → Import Settings 中启用
   - **Windsurf**: 自动导入 `.claude` 目录

5. **示例工作流**
   - 逐步演练自然语言交互
   - 显示 Claude 如何基于用户请求调用技能

6. **反馈机制**
   - GitHub 问题模板用于反馈
   - 报告什么 (错误，UX 问题，建议)

**任务:**
- [ ] 创建 `docs/experimental-workflow.md` 用户指南
- [ ] 添加 GitHub 问题模板用于实验性反馈
- [ ] 更新 README 以提及实验性功能

---

## 依赖图

```
1. 移除 WF 技能文件
   └── (无依赖)

2. 重命名 AWF 为 OPSX
   └── (无依赖)

3. 添加 Agent 技能
   └── 依赖于: 重命名 AWF 为 OPSX (使用 opsx 内容作为模板)

4. 更新 opsx:new 内容
   └── 依赖于: 重命名 AWF 为 OPSX

5. 更新 opsx:continue 内容
   └── 依赖于: 重命名 AWF 为 OPSX

6. 端到端测试
   └── 依赖于: 添加 Agent 技能 (测试技能工作流)

7. 用户文档
   └── 依赖于: 端到端测试 (需要了解最终行为)
```

---

## 范围外

以下明确不是此实验性发布的一部分:

1. **批处理模式重构** - 使旧的 `/openspec:proposal` 使用 schemas
2. **新 schemas** - 仅随现有的 `spec-driven` 和 `tdd` 发布
3. **Schema 自定义 UI** - 没有 `openspec schema list` 或类似功能
4. **CLI 中的多编辑器支持** - 技能通过 `.claude/skills/` 自动跨编辑器工作
5. **替换现有命令** - 技能是附加的，不替换 `/openspec:*` 或 `/opsx:*`

---

## 成功标准

实验性发布准备就绪时:

1. `openspec-new-change`、`openspec-continue-change` 和 `openspec-apply-change` 技能端到端工作
2. `openspec artifact-experimental-setup` 在 `.claude/skills/` 中创建技能
3. 技能在 Claude Code 中工作并与 Cursor/Windsurf 兼容
4. 至少一个完整工作流已手动测试
5. 用户文档存在解释如何生成和使用技能
6. 反馈机制就位
7. WF 技能文件已删除
8. 用户面向内容中没有 "awf" 的引用

---

## 开放问题

1. **Schema 选择** - `opsx:new` 是否应该允许选择 schema，还是始终使用 `spec-driven`？
   - 当前: 始终使用 `spec-driven` 作为默认
   - 考虑: 添加 `--schema tdd` 选项或提示

2. **CLI 中的命名空间** - 实验性 CLI 命令是否应该命名空间化？
   - 当前: `openspec status`、`openspec instructions` (无命名空间)
   - 替代: `openspec opsx status` (明确的实验性命名空间)
   - 建议: 保持当前，用户输入更少

3. **弃用路径** - 如果 opsx 成为默认，我们如何迁移？
   - 实验性发布不需要
   - 记录命令名称可能会改变

---

## 预估工作分解

| 项目 | 复杂度 | 注释 |
|------|--------|------|
| 移除 WF 文件 | 微不足道 | 只需删除 2 个文件 + 目录 |
| 重命名 AWF → OPSX | 低 | 文件重命名 + 内容更新 |
| 添加 Agent 技能 | **低** | **简单: 3-4 个文件，单输出目录，标准格式** |
| 更新 opsx:new 内容 | 低 | 文本替换 |
| 更新 opsx:continue 内容 | 低 | 文本替换 |
| 端到端测试 | 中 | 手动测试，记录结果 |
| 用户文档 | 中 | 新文档，问题模板 |

**关键改进:** 切换到 Agent 技能显著降低复杂度:
- **之前:** 20+ 个文件 (类型定义，18+ 个编辑器配置器，编辑器选择 UI)
- **之后:** 3-4 个文件 (技能模板，简单 CLI 命令)
- **跨编辑器:** 在 Claude Code、Cursor、Windsurf 中自动工作，无需额外代码

---

## 端到端测试的用户反馈

### 工作良好的内容

1. **清晰的依赖图** ⭐ 高优先级 - 保留
   - 状态命令显示被阻止/未被阻止的 artifacts 很直观:
     ```
     [x] proposal
     [ ] design
     [-] tasks (被阻止 by: design, specs)
     ```
   - 用户总是知道下一步可以做什么
   - **相关性**: 要保留的核心 UX 优势

2. **结构化指令输出** ⭐ 高优先级 - 保留
   - `openspec instructions <artifact>` 在一次调用中给出模板、输出路径和上下文
   - 对于理解要创建什么非常有帮助
   - **相关性**: 代理驱动工作流的关键

3. **简单的脚手架** ✅ 工作良好
   - `openspec new change "name"` 就能工作 - 创建目录结构而不麻烦
   - **相关性**: 良好的基线，改进空间 (见痛点)

---

### 痛点和困惑

1. **冗余的 CLI 调用** ⚠️ 中优先级
   - 用户每次调用都调用 `status` 和 `next`，但它们显著重叠
   - `status` 已经显示被阻止的内容
   - **建议**: 考虑合并或使 `next` 提供超出仅列出名称的操作指导
   - **相关性**: 减少迭代工作流中的摩擦

2. **Specs 目录结构模糊** 🔥 高优先级 - 修复
   - 指令说: `Write to: .../specs/**/*.md`
   - 用户必须猜测: `specs/spec.md`? `specs/game/spec.md`? `specs/tic-tac-toe/spec.md`?
   - 用户最终手动执行 `mkdir -p .../specs/tic-tac-toe` 然后在内部写入 `spec.md`
   - **建议**: CLI 应该自动搭建此目录结构
   - **相关性**: 关键代理 UX - 模糊路径导致工作流摩擦

3. **重复的 --change 标志** ⚠️ 中优先级
   - 每个命令需要 `--change "tic-tac-toe-game"`
   - 10+ 次调用后，这感觉冗长
   - **建议**: `openspec use "tic-tac-toe-game"` 设置上下文，然后后续命令假设该变更
   - **相关性**: 迭代会话的生活质量改进

4. **无验证反馈** 🔥 高优先级 - 添加
   - 写入每个 artifact 后，用户只是运行 `status` 希望它显示 `[x]`
   - 提出的问题:
     - 它如何知道 artifact "完成"？文件存在？
     - 如果 spec 格式错误怎么办 (例如，错误的标题级别)？
   - **建议**: 添加 `openspec validate --change "name"` 检查内容质量
   - **相关性**: 用户信心和早期捕获错误的关键

5. **查询重，操作轻 CLI** 🔥 高优先级 - 增强
   - 大多数命令检索信息。唯一"操作"是 `new change`
   - Artifact 创建是手动写入猜测的路径
   - **建议**: `openspec create proposal --change "name"` 可以搭建带有预填充模板的文件，然后用户只是编辑
   - **相关性**: 直接影响代理生产力 - 减少手动文件写入

6. **指令输出冗长** ⚠️ 低优先级
   - XML 风格输出 (`<artifact>`, `<template>`, `<instruction>`) 可解析但长
   - 关键信息 (输出路径，模板) 埋在 ~50 行中
   - **建议**: 为代理添加紧凑模式或结构化 JSON 输出
   - **相关性**: 代理解析效率的不错功能

---

### 工作流摩擦

1. **显示提案模板后的强制"停止和等待"** ⚠️ 中优先级
   - 技能在显示提案模板后说"停止和等待"
   - 当用户已经提供了足够上下文时 (例如，"井字游戏，单玩家 vs AI，最小美学")，这感觉过于谨慎
   - **建议**: 使暂停可选或基于上下文清晰度条件
   - **相关性**: 减少代理对话中的不必要往返

2. **无连接到实现** 🔥 高优先级 - 路线图项目
   - 4/4 artifacts 完成后，然后呢？工作流在规划结束
   - 没有 `openspec apply` 或关于如何执行任务的指导
   - 用户询问"你想要我实现吗？"但这目前超出了 OpenSpec 的范围
   - **建议**: 添加实现桥梁 - 要么:
     - `openspec apply` 命令开始执行阶段
     - 清晰交接到现有的 `/openspec:apply` 工作流
     - 关于规划完成后的下一步文档
   - **相关性**: 关键缺失部分 - 用户期望端到端工作流

---

### 优先级摘要

**必须修复 (高优先级):**
1. Specs 目录结构模糊 (#2)
2. 添加验证反馈 (#4)
3. 使 CLI 更操作导向 (#5)
4. 连接到实现阶段 (#2 在工作流摩擦)
5. 保持清晰的依赖图 (#1 在工作良好)
6. 保持结构化指令 (#2 在工作良好)

**应该修复 (中优先级):**
1. 减少冗余 CLI 调用 (#1)
2. 重复的 `--change` 标志 (#3)
3. 强制 STOP 行为 (#1 在工作流摩擦)

**锦上添花 (低优先级):**
1. 紧凑指令输出模式 (#6)

---

## 设计决策 (来自端到端测试反馈)

基于开发测试和代理工作流摩擦分析，我们确定了三个实验性发布阻止项并做出了以下决策。

### 确定的阻止项

从端到端测试的痛点中，三个问题阻止实验性发布:

1. **Specs 目录模糊性** - 代理不知道在哪里写入 spec 文件或如何命名功能
2. **CLI 查询重** - 大多数命令检索信息，artifact 创建是手动的
3. **应用集成缺失** - 4/4 artifacts 完成后，没有关于实现阶段的指导

### 决策 1: 提案中的功能发现 (已解决)

**问题:** specs artifact 指令说"在 `specs/<name>/spec.md` 中为每个功能创建一个 spec 文件"但:
- 代理不知道 `<name>` 应该是什么
- 功能识别需要研究 (现有 specs，代码库)
- 提案模板询问"受影响的 specs"但不结构化
- 研究隐式发生，输出未捕获

**决策:** 丰富提案模板以明确捕获功能发现。

**当前提案模板:**
```markdown
## Why
## What Changes
## Impact
- Affected specs: List capabilities...  ← 模糊，容易跳过
- Affected code: ...
```

**新提案模板:**
```markdown
## Why
## What Changes
## Capabilities

### New Capabilities
<!-- Capabilities being introduced (will create new specs/<name>/spec.md) -->