# SOP 审查改进实施规范

## Why

根据 `sop-systematic-review` 审查报告，发现以下需要改进的问题：
- Skill 合约（17个）缺少 Spec 模式相关约束
- ADR 模板用户确认机制不完整（缺少"创建新 ADR"和"请求讨论"选项）
- 快速路径与 Spec 模式交互规则未明确
- ADR 模板存在重复章节（"决策变更记录"和"决策记录"）

## What Changes

- **MODIFIED**: 为 17 个 Skill 合约添加 Spec 模式相关约束章节
- **MODIFIED**: 完善 ADR 模板用户确认机制
- **MODIFIED**: 明确快速路径与 Spec 模式的交互规则
- **MODIFIED**: 合并 ADR 模板重复章节

## Impact

- Affected specs: sop-systematic-review
- Affected code: 
  - `sop/skills/*/SKILL.md` (17个文件)
  - `sop/04_reference/document_templates/adr.md`
  - `sop/AGENT_SOP.md` (快速路径章节)

## ADDED Requirements

### Requirement: Skill 合约 Spec 约束

所有 Skill 合约必须包含 Spec 模式相关约束章节，明确 Skill 在 Spec 模式下的行为规范。

#### Scenario: Skill 在 Spec 模式下执行

- **WHEN** 用户在 Spec 模式下调用 Skill
- **THEN** Skill 必须遵循 Spec 模式的约束（只读规划阶段、交互式提问等）

### Requirement: ADR 用户确认机制完整性

ADR 模板用户确认机制必须提供完整的选项，包括"更新现有 ADR"、"创建新 ADR"、"请求讨论"和"跳过更新"。

#### Scenario: 用户确认 ADR 更新

- **WHEN** 系统检测到需要更新 ADR
- **THEN** 必须向用户提供四个选项：更新现有 ADR、创建新 ADR、请求讨论、跳过更新

### Requirement: 快速路径与 Spec 模式交互

明确快速路径与 Spec 模式的交互规则，避免流程冲突。

#### Scenario: 快速路径触发 Spec 模式

- **WHEN** 快速路径任务检测到需要用户决策
- **THEN** 必须升级到深度路径或进入 Spec 模式交互式提问

## MODIFIED Requirements

### Requirement: Skill 合约结构

Skill 合约必须包含以下章节：
- 触发条件
- Input
- Workflow Steps
- 来源与依赖准则
- Output
- Stop Points
- Constraints
- **Spec 模式约束** (新增)

### Requirement: ADR 模板结构

ADR 模板必须：
- 合并"决策变更记录"和"决策记录"为统一的"决策记录"章节
- 完善用户确认机制选项

## REMOVED Requirements

### Requirement: ADR 模板重复章节

**Reason**: "决策变更记录"和"决策记录"功能重叠，造成混淆
**Migration**: 合并为统一的"决策记录"章节，保留变更追踪能力
