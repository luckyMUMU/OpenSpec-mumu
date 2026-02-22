# SOP 文件架构整理规范

## Why

当前 SOP 目录存在以下问题：
- 多个审查报告类文件已过时（版本落后、问题已在后续版本修复）
- `ROLE_CHEATSHEET.md` 已标记为 deprecated 但未删除
- `.trae/specs/` 下存在 6 个已完成的任务目录
- 部分核心约束文件版本号落后于 CHANGELOG（v2.4.0 vs v2.7.0）

## What Changes

- **删除过时审查报告**：SOP_REVIEW_REPORT.md、SKILL_REVIEW_REPORT.md、PROMPT_SKILL_CONSISTENCY_REPORT.md
- **删除已废弃文件**：ROLE_CHEATSHEET.md
- **清理已完成 specs**：删除 `.trae/specs/` 下已完成的任务目录
- **更新版本号**：同步 command_dictionary.md 和 state_dictionary.md 到 v2.7.0
- **更新 CHANGELOG**：记录本次架构整理

## Impact

- Affected specs: 无
- Affected code: 无代码影响，仅文档变更

## ADDED Requirements

### Requirement: 文件清理原则

系统 SHALL 遵循以下文件清理原则：

#### Scenario: 过时审查报告处理
- **WHEN** 审查报告中的问题已在后续版本修复
- **THEN** 应删除该报告，避免混淆

#### Scenario: 已废弃文件处理
- **WHEN** 文件已标记为 deprecated 且内容有替代
- **THEN** 应删除该文件

#### Scenario: 已完成 specs 清理
- **WHEN** specs 目录下的任务已全部完成
- **THEN** 应删除该目录，释放空间

## MODIFIED Requirements

### Requirement: 版本号同步

更新以下文件的版本号：

**文件**：
1. `05_constraints/command_dictionary.md` (v2.4.0 → v2.7.0)
2. `05_constraints/state_dictionary.md` (v2.4.0 → v2.7.0)

**目标**：
- 版本号与 CHANGELOG.md 保持一致
- 更新 updated 日期

## REMOVED Requirements

### Requirement: 删除过时和废弃文件

**删除文件**：
- `SOP_REVIEW_REPORT.md`（v2.0.0 审查报告，内容已过时）
- `SKILL_REVIEW_REPORT.md`（v2.2.0 审查报告，问题已修复）
- `PROMPT_SKILL_CONSISTENCY_REPORT.md`（v2.0.0 审查报告，内容已过时）
- `ROLE_CHEATSHEET.md`（已标记 deprecated）

**删除目录**：
- `.trae/specs/sop-consolidation-review/`（已完成）
- `.trae/specs/sop-review-improvements/`（已完成）
- `.trae/specs/sop-systematic-review/`（已完成）
- `.trae/specs/spec-design-interactive-questioning/`（已完成）
- `.trae/specs/unify-file-reference-paths/`（已完成）
- `.trae/specs/update-sop-docs-user-guide/`（已完成）

**Reason**: 内容过时或任务已完成，不再需要保留
**Migration**: CHANGELOG 已记录相关变更历史
