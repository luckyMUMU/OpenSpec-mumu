---
version: v2.0.0
updated: 2026-02-12
artifact: Issue List
---

# 问题清单与优先级

## P0（必须）

| 问题 | 位置 | 影响 | 状态 |
|---|---|---|---|
| 单入口不可达/深度超限风险 | 全局 | 无法保证“≤3跳”与渐进披露可用性 | 已修复（新增 LLM_INDEX 与索引补齐） |
| 绝对链接不可移植 | `04_reference/index.md` | 跨机器/跨路径失效 | 已修复（改为相对链接） |
| 文档结构错误（未闭合代码块） | `document_templates/implementation_design.md` | 语义解析错误，影响 LLM 与人类阅读 | 已修复 |
| 伪链接导致路径校验失败 | `05_constraints/command_dictionary.md` | 误把说明当链接，破坏静态分析 | 已修复 |

## P1（应该）

| 问题 | 位置 | 影响 | 状态 |
|---|---|---|---|
| 审查标准索引不可点击 | `review_standards/index.md` | 标准存在但不易发现/引用 | 已修复 |
| 模板占位符路径误用为链接 | `document_templates/*` | 静态检查误报，误导读者以为路径真实存在 | 已修复（改为代码路径） |
| SOP lint 的 prompts 覆盖缺口 | `scripts/sop-lint.mjs` | check:sop 覆盖不完整 | 已修复（新增 prompt pack 元数据检查） |

## P2（可选）

| 问题 | 位置 | 影响 | 状态 |
|---|---|---|---|
| Prompt 文本可读性/冗余度 | `prompts/packs/default/**` | token 消耗与可执行性权衡 | 待执行（按“准确优先”策略） |
| 引用拓扑可视化常态化 | `scripts/*` | 便于长期维护 | 已提供脚本与拓扑输出 |
