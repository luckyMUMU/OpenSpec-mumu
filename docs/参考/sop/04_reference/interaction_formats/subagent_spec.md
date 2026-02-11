---
version: v1.5.1
updated: 2026-02-11
---

# Subagent 规格（JSON）

说明：此文件仅作为“文档模板/示例”。实际交付物必须是 **纯 JSON 对象**，并严格遵循 `docs/参考/subagent_GUIDE.md`。

```json
{
  "identifier": "sop-example-agent",
  "whenToUse": "Use this agent when ...\n\n<example>\n  上下文：...\n  用户：\"...\"\n  助理：\"我将使用 Task 工具启动 sop-example-agent 子智能体...\"\n</example>",
  "systemPrompt": "You are ...\nYou will ...\n..."
}
```
