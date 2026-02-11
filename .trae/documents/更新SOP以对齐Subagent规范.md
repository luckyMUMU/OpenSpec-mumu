## 背景修正（按你的要求）
- 在本仓库语义里：`prompts/*.md` 实际上对应“子智能体（Subagent）”的核心资产（至少等价于 subagent 里的 `systemPrompt`）。
- 因此本次优化的关键不是“再引入一个新概念”，而是：
  - 把 SOP 里“Prompt/Role”的关系讲清楚：Role 是流程职责标签；Prompt 是可被 Task 调用的 Subagent 配置（或其 systemPrompt 载体）。
  - 让 SOP 的 prompts 能被无歧义地包装/索引为符合 `subagent_GUIDE.md` 的三字段 JSON 规格。

## 目标
- 让 `docs/参考/sop` 在概念/入口/索引层面完整对齐 `docs/参考/subagent_GUIDE.md`：
  - Subagent 交付物 = 仅含 `identifier / whenToUse / systemPrompt` 的有效 JSON 对象。
  - `identifier` 命名规则、`whenToUse` 以 “Use this agent when...” 开头且含示例、`systemPrompt` 为完整操作手册。
- 建立 prompts → subagent-spec 的“可检索映射”，避免后续人/模型把 prompts 当成普通说明文档。
- 消除 `task` 术语与 “Task 工具/子智能体调用” 的歧义。

## 具体修改点（按文件）
### 1) 概念层：明确 Prompt=Subagent
- `docs/参考/sop/01_concept_overview.md`
  - 新增 `## 子智能体（Subagent）与 Prompt`：
    - Role：流程角色/职责；Skill：编排流程；Subagent：可被 Task 调用的专用智能体配置；Prompt：Subagent 的 systemPrompt 载体（当前落盘在 `sop/prompts/`）。
    - 给出“同一 Role ↔ 一个 Prompt/Subagent”的默认映射原则（可扩展多个 subagent）。
    - 明确 subagent JSON 三字段与 SSOT 链接到 `docs/参考/subagent_GUIDE.md`。

### 2) 入口层：把 subagent 规范挂到 AGENT_SOP
- `docs/参考/sop/AGENT_SOP.md`
  - 新增 `## 子智能体（Subagent）规范（Prompt即Subagent）`：
    - 触发条件：需要新建/优化某个 Role 的 Prompt，或需要新增专用能力（例如 code-reviewer、test-generator）。
    - 约束：Subagent 规格必须遵循 `subagent_GUIDE.md`（三字段 JSON、identifier 规则、whenToUse 示例规则）。
    - 说明：现有 `sop/prompts/*.md` 是 systemPrompt 内容；真正可被调用/发布的“Subagent 规格”建议以 JSON 形式落盘（见下面的索引与模板）。

### 3) 索引层：把 subagent_GUIDE 纳入 SOP reference，并提供映射入口
- `docs/参考/sop/04_reference/index.md`
  - 新增引用条目：`Subagent 规格（JSON）规范：docs/参考/subagent_GUIDE.md`。
  - 增加一条“Prompt/子智能体目录”索引：指向 `sop/prompts/`（systemPrompt 载体）与（可选新增的）`sop/subagents/`（JSON 规格）。

### 4) 命令/路由层：术语消歧 + 何时路由到“生成 Subagent 规格”
- `docs/参考/sop/05_constraints/command_dictionary.md`
  - 在“语法”处增加术语澄清：`ROUTE(task)` 的 `task`=用户请求体/任务描述，不是 Task 工具。
- `docs/参考/sop/prompts/router_prompt.md`
  - 在 Output/约束处补充：
    - Router 的“机器可读输出”是 `router_triage.md` 工件。
    - 当用户请求目标是“创建/更新 subagent（即 Prompt）”，Router 应分诊到“产出 subagent JSON 规格 + 更新对应 prompt(systemPrompt)”的流程，并引用 `subagent_GUIDE.md`。
- `docs/参考/sop/skills/sop-workflow-orchestrator/SKILL.md`
  - 同步补充 `task` 术语澄清与 subagent_GUIDE 引用。
  - 增加分支：当 user_request 命中“子智能体/Prompt 维护”时，输出必须包含对 subagent_GUIDE 的指向。

### 5) 人类阅读版：补齐最小说明
- `docs/参考/sop/sop_for_human.md`
  - 新增 `## 子智能体（Subagent）与 Prompt`：说明为什么 prompts 是可复用能力、交付物是 JSON 规格（链接到 subagent_GUIDE），避免读者把 prompts 当普通文档。

### 6)（可选但推荐）新增“Subagent 规格”落盘与模板
- 新增目录：`docs/参考/sop/subagents/`
  - 为每个现有角色 prompt 生成一个对应 JSON：
    - `sop-router.json`, `sop-explorer.json`, `sop-analyst.json` ...（identifier 以小写/连字符）。
    - `systemPrompt` 字段内容直接来源对应 `prompts/*_prompt.md`（原文内嵌为字符串）。
    - `whenToUse` 按 subagent_GUIDE 要求：以 “Use this agent when...” 开头，并至少包含 1 个 <example>，示例里明确“使用 Task 工具启动该 subagent”。
- 或者新增一个模板文件（方便手工创建更多 subagent）：
  - `docs/参考/sop/04_reference/interaction_formats/subagent_spec.md`：展示 JSON 三字段骨架 + 校验要点（强调最终交付必须是纯 JSON）。

## 版本与一致性
- 对所有被修改的 SOP 文档统一做 patch 级版本升级（例如 `v1.5.1`）并更新日期。
- 在 `docs/参考/sop/CHANGELOG.md` 增加一条：对齐 subagent_GUIDE、明确 Prompt=Subagent、补齐索引与术语澄清。

## 验证与自检
- 全局检索 `Task`/`task`：确认每处 `ROUTE(task)` 都有“不是 Task 工具”的澄清。
- 检查 `04_reference/index.md` 新增导航链接无断链。
- 抽查 1-2 个 subagent JSON（若新增 `sop/subagents/`）：验证为严格 JSON 且仅三字段，whenToUse 含示例且以指定句式开头。