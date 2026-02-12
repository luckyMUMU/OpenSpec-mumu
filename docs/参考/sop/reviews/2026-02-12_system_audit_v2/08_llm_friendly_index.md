---
version: v2.0.0
updated: 2026-02-12
artifact: LLM Friendly Index
---

# LLM 友好入口与渐进式披露

## 单入口

- 入口文件：[AGENT_SOP.md](../../AGENT_SOP.md)（v2.1.0 合并原 LLM_INDEX.md）

## 设计要点

- 仅提供分诊规则 + 每模块最小摘要 + 直达链接，不复制正文。
- “是否需要加载”可以仅根据标题与摘要判断；需要细节时再按链接下钻。
- 通过补齐模块索引与 review 索引保证：从入口到任意 SOP 文档最短跳数 ≤3。
