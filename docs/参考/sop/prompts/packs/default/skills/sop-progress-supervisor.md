# sop-progress-supervisor (default pack)

> **版本**: v2.0.0

## 侧重点

- 目录并行调度以状态机驱动：`[DIR_WORKING]` → `[DIR_COMPLETED]`，等待以 `[DIR_WAITING_DEP]` 表达
- 三错即停：到达熔断条件必须产出报告并停止自动推进

## 输出风格（固定）

- 必须输出：dir_map、当前状态汇总、调度动作、熔断/停止点、落盘路径

