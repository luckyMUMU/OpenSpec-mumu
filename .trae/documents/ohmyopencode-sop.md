## 目标产物
- 生成一份中文 Markdown《oh-my-opencode：实现扫描 + Agent 调用/Prompt SOP》并写入 [ohmyopencode.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/ohmyopencode.md)
- 重点：基于仓库“具体实现代码”的机制解释（插件入口、配置加载、agent/skill/hook/MCP 注册、触发逻辑、prompt 拼装与任务闭环）
- 图表：Mermaid（架构图/流程图/时序图/状态机），用于表达调用链与触发点

## 已确认的实现关键点（来自代码扫描）
- 插件入口在 src/index.ts：启动时加载配置、计算 disabled_hooks、创建 managers/tools/hooks，最终返回 pluginInterface；并额外实现 experimental.session.compacting：在会话压缩前 capture TODO 并注入压缩用上下文。
- 配置加载在 src/plugin-config.ts：
  - 用户级：OpenCode 配置目录下的 oh-my-opencode(.json/.jsonc)
  - 项目级：<project>/.opencode/oh-my-opencode(.json/.jsonc)
  - merge 策略：agents/categories 深度合并；disabled_* 列表去重；claude_code 深度合并。
- Agent prompt 拼装在 src/agents/agent-builder.ts：
  - category 可提供默认 model/temperature/variant
  - skills 会被 resolve 后“前置拼接”到 base.prompt（skillContent + "\n\n" + base.prompt）。
- Hook 组装在 src/create-hooks.ts：core hooks + continuation hooks + skill hooks 三部分组合；并由 isHookEnabled / safeHookEnabled 控制是否启用与安全创建。

## 需要“完整扫描实现”的范围（将覆盖）
- src/
  - 入口与装配：index.ts、create-tools.ts、create-managers.ts、plugin-interface.ts、plugin-handlers/*
  - agent 定义：src/agents/*（Sisyphus/Hephaestus/Oracle/Librarian/Explore/Prometheus/Metis/Momus 等）
  - hooks：src/hooks/* + plugin/hooks/*（续跑/ralph loop/todo enforcer/comment checker/rules injector/keyword detector/compaction 等）
  - mcp：src/mcp/*（Exa/Context7/Grep.app 等的注册与路由）
  - tools：src/tools/*（LSP/AstGrep/终端/tmux 相关能力入口）
  - features：src/features/*（background-agent、opencode-skill-loader、session tools 等）
- .opencode/
  - command/*、skills/*、background-tasks.json：用于理解“内置命令/技能/后台任务”的 prompt 与调用契约
- .sisyphus/
  - rules/*：用于理解默认规则/约束如何塑造 Sisyphus 的行为
- packages/
  - 若存在独立包（CLI/插件协议/构建脚本等），按依赖关系补齐调用链

## 扫描方法（保证“基于具体实现”）
- 使用 GitHub Contents API（ref=dev）递归列目录树，记录每个模块的职责边界与依赖关系。
- 对关键源码文件（.ts/.md/.json）通过 API 返回的 base64 content 解码成可读文本（已验证可解码 src/index.ts、src/plugin-config.ts、src/create-hooks.ts、src/agents/agent-builder.ts）。
- 以“调用链”为线索抽取：
  - 启动/加载链：Plugin(ctx) → loadPluginConfig → createManagers → createTools → createHooks → createPluginInterface
  - 会话链：UserPromptSubmit/PreToolUse/PostToolUse/Stop 等 hook 触发点（由代码实际注册为准）
  - agent 链：Sisyphus 如何委派 Explore/Librarian/Oracle/Frontend 等（由 agents/*.ts 的 prompt/handler 实现提炼）

## 文档结构（围绕实现与调用逻辑）
1. 仓库结构总览（实现层面的模块地图）
2. 插件启动与注册机制（以 src/index.ts 为主线，给出调用链）
3. 配置系统（文件位置、merge 规则、disabled_* 生效点、JSONC 解析/迁移）
4. Agent 构建与 Prompt 拼装
   - category 默认值注入
   - skills 的 resolve 与 prompt 前置拼接
5. Hook 系统（按“触发时机”组织，而不是按文件名堆列表）
   - 上下文注入（AGENTS/README/规则）
   - 续跑与闭环（todo-continuation-enforcer/ralph-loop/stop-continuation-guard 等）
   - 输出治理（tool-output-truncator/comment-checker 等）
   - 压缩/恢复（compaction-* / session-recovery 等）
6. 多 Agent 编排机制（Sisyphus/Hephaestus/Prometheus/Metis/Oracle/Librarian/Explore）
   - 任务类型→选择子 agent→并行/串行→汇总→验证
7. MCP 与外部能力接入（websearch/context7/grep_app 等的路由与使用约束）
8. 可复用 SOP + Prompt 模板（每个模板都绑定“实现机制”，给出推荐 agent/hook 依赖）
9. 风险边界（简短）：冒充站点、第三方 OAuth/ToS 风险

## Mermaid 图表清单（全部来源于代码调用链）
- flowchart：插件启动装配链（loadConfig → managers/tools/hooks/pluginInterface）
- sequenceDiagram：一次用户输入触发的 Hook 时序（UserPromptSubmit→…→Stop/Resume）
- flowchart：Agent 编排决策树（Sisyphus 委派 Explore/Librarian/Oracle 的规则）
- stateDiagram：任务闭环状态机（Plan/Explore/Implement/Verify/Resume/Done）
- flowchart：配置生效路径（user config vs project config、disabled_* 如何影响注册）

## 用户确认后执行的工作
1. 继续补齐扫描：对 src/agents、src/plugin/hooks、src/create-tools、src/plugin-interface、src/mcp、.opencode/command、.opencode/skills 等关键实现做逐文件解码与要点摘录
2. 将“实现要点 → SOP/prompt 模板 → Mermaid 图”整合成一篇可执行文档
3. 写入目标文件并做最终校验：目录、代码引用、Mermaid 语法、Windows 路径提示、示例 prompt 可复制
