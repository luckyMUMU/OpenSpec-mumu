---
version: v2.0.0
updated: 2026-02-12
---

# sop-tdd-workflow (default pack)

## 侧重点

- 测试必须先于实现资产落盘：先 `sop-test-design-csv`，再 `sop-test-implementation`
- 分层验收门禁必须可执行、可复现（参考 `05_constraints/acceptance_criteria.md`）

## 输出风格（固定）

- 必须输出：启用条件、叠加调用链、验收门禁、落盘路径
