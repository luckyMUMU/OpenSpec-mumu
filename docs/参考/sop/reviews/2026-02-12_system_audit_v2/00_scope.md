---
version: v2.0.0
updated: 2026-02-12
artifact: System Audit v2
---

# SOP 系统性审查（文件→模块→系统）

## 审查范围

- 根目录：`docs/参考/sop/`
- 文件类型：`.md`（当前目录内未发现 `.txt/.json`）
- 入口定义（单一入口）：`LLM_INDEX.md`
- 深度约束：从入口出发的最短引用跳数 ≤3

## 审查维度

- 事实准确性：是否存在明显自相矛盾、示例错误、未闭合结构（例如未闭合代码块）
- 流程闭环性：是否具备可落盘交付物、停止点与索引可达性
- 层级边界清晰度：父级只摘要+链接；避免双源 SSOT；跨模块引用是否可解释
- 引用可达性：Markdown 链接（相对/绝对/file-url）目标是否存在、是否可移植

## 工具与产物

- 静态分析脚本：`scripts/sop-link-graph.mjs`（输出可达性/深度/拓扑）
- 拓扑图：`06_link_topology.dot` / `06_link_topology.mmd`
- 链接检查：`03_link_check.md`
