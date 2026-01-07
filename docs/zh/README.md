<p align="center">
  <a href="https://github.com/Fission-AI/OpenSpec">
    <picture>
      <source srcset="assets/openspec_pixel_dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="assets/openspec_pixel_light.svg" media="(prefers-color-scheme: light)">
      <img src="assets/openspec_pixel_light.svg" alt="OpenSpec logo" height="64">
    </picture>
  </a>
  
</p>
<p align="center">面向AI编码助手的规范驱动开发。</p>
<p align="center">
  <a href="https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Fission-AI/OpenSpec/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/@fission-ai/openspec"><img alt="npm version" src="https://img.shields.io/npm/v/@fission-ai/openspec?style=flat-square" /></a>
  <a href="https://nodejs.org/"><img alt="node version" src="https://img.shields.io/node/v/@fission-ai/openspec?style=flat-square" /></a>
  <a href="./LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" /></a>
  <a href="https://conventionalcommits.org"><img alt="Conventional Commits" src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square" /></a>
  <a href="https://discord.gg/YctCnvvshC"><img alt="Discord" src="https://img.shields.io/badge/Discord-Join%20the%20community-5865F2?logo=discord&logoColor=white&style=flat-square" /></a>
</p>

<p align="center">
  <img src="assets/openspec_dashboard.png" alt="OpenSpec dashboard preview" width="90%">
</p>

<p align="center">
  关注 <a href="https://x.com/0xTab">@0xTab on X</a> 获取更新 · 加入 <a href="https://discord.gg/YctCnvvshC">OpenSpec Discord</a> 寻求帮助和问题。
</p>

# OpenSpec

OpenSpec 通过规范驱动开发将人类和AI编码助手对齐，让您在编写任何代码之前就达成一致。**无需API密钥。**

## 为什么选择OpenSpec？

AI编码助手功能强大，但当需求存在于聊天记录中时，它们会变得不可预测。OpenSpec添加了一个轻量级的规范工作流，在实现之前锁定意图，为您提供可确定、可审查的输出。

关键成果：
- 人类和AI利益相关者在工作开始前就规范达成一致。
- 结构化的变更文件夹（提案、任务和规范更新）使范围明确且可审计。
- 共享可见性，了解什么是提议的、活动的或已归档的。
- 与您已使用的AI工具配合使用：在支持的地方使用自定义斜杠命令，其他地方使用上下文规则。

## OpenSpec比较概览

- **轻量级**：简单的工作流，无需API密钥，最小化设置。
- **棕地优先**：在0→1之外表现优异。OpenSpec将事实来源与提案分开：`openspec/specs/`（当前事实）和`openspec/changes/`（提议的更新）。这使差异在功能间明确且可管理。
- **变更跟踪**：提案、任务和规范增量共存；归档将批准的更新合并回规范。
- **与spec-kit和Kiro比较**：这些在全新功能（0→1）方面表现出色。OpenSpec在修改现有行为（1→n）方面也表现出色，特别是当更新跨越多个规范时。

查看[OpenSpec比较](#how-openspec-compares)中的完整比较。

## 工作原理

```
┌────────────────────┐
│ 起草变更       │
│ 提案           │
└────────┬───────────┘
         │ 与您的AI分享意图
         ▼
┌────────────────────┐
│ 审查与对齐     │
│（编辑规范/任务）│◀──── 反馈循环 ──────┐
└────────┬───────────┘                          │
         │ 批准的计划                        │
         ▼                                      │
┌────────────────────┐                          │
│ 实现任务       │──────────────────────────┘
│（AI编写代码） │
└────────┬───────────┘
         │ 发布变更
         ▼
┌────────────────────┐
│ 归档与更新     │
│ 规范（来源）   │
└────────────────────┘

1. 起草一个捕获您想要的规范更新的变更提案。
2. 与您的AI助手审查提案，直到每个人都同意。
3. 实现引用已同意规范的任务。
4. 归档变更，将批准的更新合并回事实来源规范。
```

## 入门指南

### 支持的AI工具

<details>
<summary><strong>原生斜杠命令</strong>（点击展开）</summary>

这些工具内置了OpenSpec命令。出现提示时选择OpenSpec集成。

| 工具 | 命令 |
|------|----------|
| **Amazon Q Developer** | `@openspec-proposal`, `@openspec-apply`, `@openspec-archive` (`.amazonq/prompts/`) |
| **Antigravity** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.agent/workflows/`) |
| **Auggie (Augment CLI)** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.augment/commands/`) |
| **Claude Code** | `/openspec:proposal`, `/openspec:apply`, `/openspec:archive` |
| **Cline** | `.clinerules/workflows/`目录中的工作流(`.clinerules/workflows/openspec-*.md`) |
| **CodeBuddy Code (CLI)** | `/openspec:proposal`, `/openspec:apply`, `/openspec:archive` (`.codebuddy/commands/`) — 见[文档](https://www.codebuddy.ai/cli) |
| **Codex** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (全局: `~/.codex/prompts`, 自动安装) |
| **CoStrict** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.cospec/openspec/commands/`) — 见[文档](https://costrict.ai)|
| **Crush** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.crush/commands/openspec/`) |
| **Cursor** | `/openspec-proposal`, `/openspec:apply`, `/openspec:archive` |
| **Factory Droid** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.factory/commands/`) |
| **Gemini CLI** | `/openspec:proposal`, `/openspec:apply`, `/openspec:archive` (`.gemini/commands/openspec/`) |
| **GitHub Copilot** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.github/prompts/`) |
| **iFlow (iflow-cli)** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.iflow/commands/`) |
| **Kilo Code** | `/openspec-proposal.md`, `/openspec-apply.md`, `/openspec-archive.md` (`.kilocode/workflows/`) |
| **OpenCode** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` |
| **Qoder (CLI)** | `/openspec:proposal`, `/openspec:apply`, `/openspec:archive` (`.qoder/commands/openspec/`) — 见[文档](https://qoder.com/cli) |
| **Qwen Code** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.qwen/commands/`) |
| **RooCode** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.roo/commands/`) |
| **Windsurf** | `/openspec-proposal`, `/openspec-apply`, `/openspec-archive` (`.windsurf/workflows/`) |

Kilo Code自动发现团队工作流。将生成的文件保存在`.kilocode/workflows/`下，并使用`/openspec-proposal.md`、`/openspec-apply.md`或`/openspec-archive.md`从命令面板触发它们。

</details>

<details>
<summary><strong>AGENTS.md兼容</strong>（点击展开）</summary>

这些工具自动从`openspec/AGENTS.md`读取工作流指令。如果需要提醒，请让它们遵循OpenSpec工作流。了解更多关于[AGENTS.md约定](https://agents.md/)。

| 工具 |
|-------|
| Amp • Jules • 其他 |

</details>

### 安装与初始化

#### 先决条件
- **Node.js >= 20.19.0** - 使用`node --version`检查您的版本

#### 第1步：全局安装CLI

```bash
npm install -g @fission-ai/openspec@latest
```

验证安装：
```bash
openspec --version
```

#### 第2步：在项目中初始化OpenSpec

导航到您的项目目录：
```bash
cd my-project
```

运行初始化：
```bash
openspec init
```

**初始化期间会发生什么：**
- 系统会提示您选择任何原生支持的AI工具（Claude Code、CodeBuddy、Cursor、OpenCode、Qoder等）；其他助手始终依赖于共享的`AGENTS.md`存根
- OpenSpec自动为您选择的工具配置斜杠命令，并始终在项目根目录写入托管的`AGENTS.md`交接
- 在您的项目中创建一个新的`openspec/`目录结构

**设置后：**
- 主要AI工具可以在无需额外配置的情况下触发`/openspec`工作流
- 运行`openspec list`验证设置并查看任何活动变更
- 如果您的编码助手没有立即显示新的斜杠命令，请重新启动它。斜杠命令在启动时加载，
  因此重新启动确保它们出现

### 可选：填充项目上下文

`openspec init`完成后，您将收到一个建议提示，帮助填充您的项目上下文：

```text
填充您的项目上下文：
"请阅读openspec/project.md并帮助我填写有关我的项目、技术栈和约定的详细信息"
```

使用`openspec/project.md`定义项目级约定、标准、架构模式和应在所有变更中遵循的其他指南。

### 创建您的第一个变更

这里有一个真实示例，展示了完整的OpenSpec工作流。这适用于任何AI工具。那些具有原生斜杠命令的工具会自动识别快捷方式。

#### 1. 起草提案
首先要求您的AI创建一个变更提案：

```text
您：创建按角色和团队添加个人资料搜索过滤器的OpenSpec变更提案
     （具有斜杠命令的工具的快捷方式：/openspec:proposal 添加个人资料搜索过滤器）

AI：  我将为个人资料过滤器创建一个OpenSpec变更提案。
     *搭建openspec/changes/add-profile-filters/，包含proposal.md、tasks.md、spec deltas。*
```

#### 2. 验证与审查
检查变更是否正确创建并审查提案：

```bash
$ openspec list                             # 确认变更文件夹存在
$ openspec validate add-profile-filters     # 验证规范格式
$ openspec show add-profile-filters         # 审查提案、任务和规范增量
```

#### 3. 完善规范
迭代规范，直到它们符合您的需求：

```text
您：您能为角色和团队过滤器添加验收标准吗？

AI：  我将使用角色和团队过滤器的场景更新规范增量。
     *编辑openspec/changes/add-profile-filters/specs/profile/spec.md和tasks.md。*
```

#### 4. 实现变更
一旦规范看起来不错，就开始实现：

```text
您：规范看起来不错。让我们实现这个变更。
     （具有斜杠命令的工具的快捷方式：/openspec:apply add-profile-filters）

AI：  我将在add-profile-filters变更中处理任务。
     *实现来自openspec/changes/add-profile-filters/tasks.md的任务*
     *标记任务完成：任务1.1 ✓，任务1.2 ✓，任务2.1 ✓...*
```

#### 5. 归档已完成的变更
实现完成后，归档变更：

```text
AI：  所有任务都已完成。实现已准备就绪。

您：请归档变更
     （具有斜杠命令的工具的快捷方式：/openspec:archive add-profile-filters）

AI：  我将归档add-profile-filters变更。
    *运行：openspec archive add-profile-filters --yes*
     ✓ 变更成功归档。规范已更新。准备下一个功能！
```

或者自己在终端中运行命令：
```bash
$ openspec archive add-profile-filters --yes  # 归档已完成的变更，无需提示
```

**注意：**具有原生斜杠命令的工具（Claude Code、CodeBuddy、Cursor、Codex、Qoder、RooCode）可以使用所示的快捷方式。所有其他工具都可以使用自然语言请求来"创建OpenSpec提案"、"应用OpenSpec变更"或"归档变更"。

## 命令参考

```bash
openspec list               # 查看活动变更文件夹
openspec view               # 规范和变更的交互式仪表板
openspec show <change>      # 显示变更详细信息（提案、任务、规范更新）
openspec validate <change>  # 检查规范格式和结构
openspec archive <change> [--yes|-y]   # 将已完成的变更移动到archive/（使用--yes时非交互式）
```

## 示例：AI如何创建OpenSpec文件

当您要求您的AI助手"添加双因素认证"时，它会创建：

```
openspec/
├── specs/
│   └── auth/
│       └── spec.md           # 当前认证规范（如果存在）
└── changes/
    └── add-2fa/              # AI创建整个结构
        ├── proposal.md       # 为什么和什么变更
        ├── tasks.md          # 实现清单
        ├── design.md         # 技术决策（可选）
        └── specs/
            └── auth/
                └── spec.md   # 显示增量的增量
```

### AI生成的规范（在`openspec/specs/auth/spec.md`中创建）：

```markdown
# 认证规范

## 目的
认证和会话管理。

## 要求
### 要求：用户认证
系统应在成功登录时颁发JWT。

#### 场景：有效凭据
- 当用户提交有效凭据时
- 则返回JWT
```

### AI生成的变更增量（在`openspec/changes/add-2fa/specs/auth/spec.md`中创建）：

```markdown
# 认证增量

## 新增要求
### 要求：双因素认证
登录期间系统必须要求第二因素。

#### 场景：需要OTP
- 当用户提交有效凭据时
- 则需要OTP挑战
```

### AI生成的任务（在`openspec/changes/add-2fa/tasks.md`中创建）：

```markdown
## 1. 数据库设置
- [ ] 1.1 向用户表添加OTP密钥列
- [ ] 1.2 创建OTP验证日志表

## 2. 后端实现  
- [ ] 2.1 添加OTP生成端点
- [ ] 2.2 修改登录流程以要求OTP
- [ ] 2.3 添加OTP验证端点

## 3. 前端更新
- [ ] 3.1 创建OTP输入组件
- [ ] 3.2 更新登录流程UI
```

**重要：**您不会手动创建这些文件。您的AI助手会根据您的需求和现有代码库生成它们。

## 理解OpenSpec文件

### 增量格式

增量是显示规范如何变更的"补丁"：

- **`## 新增要求`** - 新功能
- **`## 修改要求`** - 变更行为（包含完整的更新文本）
- **`## 移除要求`** - 已弃用功能

**格式要求：**
- 在标题中使用`### 要求：<名称>`
- 每个要求至少需要一个`#### 场景：`块
- 在要求文本中使用应/必须

## OpenSpec如何比较

### 与spec-kit比较
OpenSpec的双文件夹模型（`openspec/specs/`用于当前事实，`openspec/changes/`用于提议的更新）将状态和差异分开。这在修改现有功能或触及多个规范时具有可扩展性。spec-kit在绿地/0→1方面很强，但在跨规范更新和演进功能方面提供的结构较少。

### 与Kiro.dev比较
OpenSpec将每个功能的每个变更分组在一个文件夹中（`openspec/changes/feature-name/`），使跟踪相关规范、任务和设计变得容易。Kiro将更新分散在多个规范文件夹中，这可能使功能跟踪更加困难。

### 与无规范比较
没有规范，AI编码助手会从模糊提示生成代码，经常遗漏要求或添加不需要的功能。OpenSpec通过在编写任何代码之前就期望行为达成一致来带来可预测性。

## 团队采用

1. **初始化OpenSpec** – 在您的仓库中运行`openspec init`。
2. **从新功能开始** – 要求您的AI将即将到来的工作捕获为变更提案。
3. **逐步增长** – 每个变更归档到记录您系统的活规范中。
4. **保持灵活** – 不同的队友可以使用Claude Code、CodeBuddy、Cursor或任何AGENTS.md兼容工具，同时共享相同的规范。

每当有人切换工具时运行`openspec update`，以便您的代理获取最新指令并确保最新的斜杠命令处于活动状态。

## 更新OpenSpec

1. **升级包**
   ```bash
   npm install -g @fission-ai/openspec@latest
   ```
2. **刷新代理指令**
   - 在每个项目中运行`openspec update`以重新生成AI指导，并确保最新的斜杠命令处于活动状态。

## 贡献

- 安装依赖项：`pnpm install`
- 构建：`pnpm run build`
- 测试：`pnpm test`
- 本地开发CLI：`pnpm run dev`或`pnpm run dev:cli`
- 常规提交（单行）：`type(scope): subject`

## 许可证

MIT