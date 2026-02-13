---
version: v2.1.0
updated: 2026-02-12
---

# 快速路径

**适用**: 单文件+<30行+无逻辑变更

---

## 流程

```
sop-code-explorer → sop-code-implementation → sop-code-review → sop-document-sync
```

| 阶段 | 输入 | 输出 | 停止点 |
|------|------|------|--------|
| sop-code-explorer | 目标文件 | 审计报告 | `[USER_DECISION]` |
| sop-code-implementation | 审计报告 | 代码修改 | `[WAITING_FOR_CODE_REVIEW]` / `[DIR_WAITING_DEP]` |
| sop-code-review | Diff+设计依据 | 审查报告 | `[USER_DECISION]` |
| sop-document-sync | 代码修改 | 文档更新 | `[USER_DECISION]` |

---

## 步骤

### 1. sop-code-explorer 分析
CMD: `AUDIT(file) -> audit_report`（模板：04_reference/interaction_formats/code_audit_report.md）

### 2. sop-code-implementation 修改
CMD: `IMPLEMENT(dir, design|audit) -> [WAITING_FOR_CODE_REVIEW]`（模板：04_reference/interaction_formats/worker_execution_result.md）

### 3. sop-code-review 审查
CMD: `CODE_REVIEW(diff, design_refs) -> review_report`（模板：04_reference/interaction_formats/code_review.md）

### 4. sop-document-sync 更新
CMD: `DOC_SYNC(scope) -> [已完成]`

---

## 约束

- 单文件
- <30行
- 无逻辑变更
- 测试通过

---

## 变更分类与升级红线

CMD: `FAST_PATH_CHECK(change) -> allow|upgrade`

allow 条件（全满足）：
- single_file && delta_lines < 30
- no_interface_change && no_control_flow_change && no_data_model_change
- no_security_boundary_change && no_concurrency_change && no_dependency_behavior_change
- tests_passed（或可执行命令契约可复现）

upgrade 条件（任一满足）：
- cross_file_or_cross_dir
- touch_interface|control_flow|data_model|security|concurrency|deps
- uncertain（无法证明无行为变化）

参见：05_constraints/command_dictionary.md
