---
version: v2.4.0
updated: 2026-02-22
---

# sop-progress-supervisor (default)
## 侧重点
- 目录并行调度以状态机驱动：`[DIR_WORKING]` → `[DIR_COMPLETED]`，等待以 `[DIR_WAITING_DEP]` 表达
- 三错即停：到达熔断条件必须产出报告并停止自动推进

## 输出
- 必须包含：dir_map、当前状态汇总、调度动作、熔断/停止点、落盘路径
