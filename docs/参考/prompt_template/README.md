# SOP Prompt 模板

## SOP 路径

**获取 SOP 文件**: 从项目根目录的 `sop/AGENT_SOP.md` 开始，所有引用路径相对于 `sop/` 目录。

## 模式标签

| 标签 | 模式 | 适用场景 |
|------|------|----------|
| `[sop-mode]` | [sop-prompt-wrapper.md](sop-prompt-wrapper.md) | 通用入口 |
| `[fast-path]` | [fast-path-prompt.md](fast-path-prompt.md) | 单文件小改动 |
| `[deep-path]` | [deep-path-prompt.md](deep-path-prompt.md) | 复杂任务 |
| `[tdd-path]` | [tdd-path-prompt.md](tdd-path-prompt.md) | 测试驱动 |

## 使用方式

将模板内容作为系统提示词，用户输入放在 `[USER_INPUT]` 处。

## 详细文档 (relative to sop/)

- SOP入口: AGENT_SOP.md
- Skill目录: skills/
- 状态字典: 05_constraints/state_dictionary.md
- 命令字典: 05_constraints/command_dictionary.md
