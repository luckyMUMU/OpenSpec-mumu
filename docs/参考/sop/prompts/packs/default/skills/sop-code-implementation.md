---
version: v2.0.0
updated: 2026-02-12
---

# sop-code-implementation (default pack)

## 侧重点

- 仅当 `design.md` 存在且 Scope 明确 → 才能进入 `[DIR_WORKING]` 并开始改代码
- 优先复用：先复用→改进→新建→清理（必要时调用 `sop-capability-reuse`）
- 跨目录依赖 → 必须进入 `[DIR_WAITING_DEP]` 并请求 `sop-progress-supervisor` 调度

## 输出风格（固定）

- 必须输出：变更摘要、Diff 证据、运行/验证结果、落盘交付物路径、下一步 Skill
