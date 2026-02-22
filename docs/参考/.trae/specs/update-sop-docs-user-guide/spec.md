# SOP 文档同步与用户指南规范

## Why

当前存在以下文档需要更新和创建：
1. `document_llm_GUIDE.md` 版本落后，需要与 sop 目录结构保持一致
2. `sop_for_human.md` 版本落后（v2.1.0），需要更新到 v2.4.0
3. 缺少面向编码项目的用户指南 `user_guide.md`

## What Changes

### 1. 更新 document_llm_GUIDE.md
- 与 sop 目录结构保持一致
- 更新版本到 v2.4.0
- 增加与 SOP 体系的映射关系

### 2. 更新 sop_for_human.md
- 版本更新到 v2.4.0
- 增加 Spec 生命周期说明
- 增加 Spec 与 design.md 映射关系说明
- 增加版本同步机制说明

### 3. 新增 user_guide.md
- 面向编码项目的用户指南
- 指导如何在编码项目中使用 SOP 进行 AI 编程
- 包含快速入门、工作流程、最佳实践

## Impact

- Affected specs: 
  - document_llm_GUIDE.md
  - sop_for_human.md
  - user_guide.md（新增）
- Affected code: 无代码变更，仅文档更新

## ADDED Requirements

### Requirement: 用户指南文档

系统 SHALL 提供面向 AGENT 的用户指南，指导如何使用 SOP 进行复杂项目的编程。

#### Scenario: 快速入门
- **WHEN** AGENT 首次使用 SOP
- **THEN** 系统应提供清晰的快速入门指南

#### Scenario: 复杂项目编程
- **WHEN** AGENT 需要执行复杂项目编程任务
- **THEN** 系统应提供完整的工作流程指导

### Requirement: 文档版本一致性

所有 SOP 相关文档 SHALL 与 CHANGELOG 版本保持一致。

## MODIFIED Requirements

### Requirement: document_llm_GUIDE.md 更新

文档 SHALL 与 sop 目录结构保持一致：
- 更新分级存储架构说明
- 增加 SOP 体系映射
- 更新版本到 v2.4.0

### Requirement: sop_for_human.md 更新

文档 SHALL 包含最新的 SOP 体系说明：
- 版本更新到 v2.4.0
- 增加 Spec 生命周期说明
- 增加版本同步机制说明

## REMOVED Requirements

无移除的需求。
