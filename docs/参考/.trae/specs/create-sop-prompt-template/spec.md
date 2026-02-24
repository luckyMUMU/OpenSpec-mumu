# SOP Prompt 模板系统 Spec

## Why
当前SOP体系完善但缺乏对AI Agent的直接引导机制。用户输入可能不符合SOP规范，需要一个prompt模板系统来包裹用户输入，确保AI Agent正确按照SOP执行。

## What Changes
- 创建prompt模板文件，用于包裹用户输入
- 模板包含路径选择、Skill调用、状态管理等核心引导
- 支持快速路径、深度路径、TDD路径三种模式

## Impact
- Affected specs: 无（新增功能）
- Affected code: `d:\code\AI\openspec-mumu\docs\参考\prompt_template\`

## ADDED Requirements

### Requirement: Prompt模板系统
The system SHALL provide prompt templates that wrap user input to ensure correct SOP execution.

#### Scenario: 快速路径任务
- **WHEN** 用户输入简单任务（单文件+<30行+无逻辑变更）
- **THEN** AI Agent 应使用快速路径模板，执行 `sop-code-explorer → sop-code-implementation → sop-code-review → sop-document-sync`

#### Scenario: 深度路径任务
- **WHEN** 用户输入复杂任务（跨文件/新功能/重构/API变更）
- **THEN** AI Agent 应使用深度路径模板，执行完整Skill调用链

#### Scenario: TDD深度路径任务
- **WHEN** 用户输入核心业务/复杂逻辑任务
- **THEN** AI Agent 应使用TDD深度路径模板，包含测试设计阶段

### Requirement: 路径选择引导
The system SHALL provide path selection guidance in the prompt template.

#### Scenario: 路径自动判断
- **WHEN** 用户输入任务
- **THEN** AI Agent 应根据 `FAST_PATH_CHECK(change)` 命令判断路径类型

#### Scenario: 路径升级
- **WHEN** 快速路径任务发现跨文件影响或需要用户决策
- **THEN** AI Agent 应升级到深度路径或进入交互式提问

### Requirement: 状态管理引导
The system SHALL provide state management guidance in the prompt template.

#### Scenario: 状态标记
- **WHEN** AI Agent 开始执行任务
- **THEN** 应先标记 `[DIR_WORKING]` 状态

#### Scenario: 停止点处理
- **WHEN** 任务遇到冲突/风险/分歧
- **THEN** AI Agent 应进入 `[USER_DECISION]` 状态并使用 `ASK_USER_DECISION(topic, options)`

### Requirement: 约束检查引导
The system SHALL provide constraint checking guidance in the prompt template.

#### Scenario: 核心约束遵守
- **WHEN** AI Agent 执行任何操作
- **THEN** 应遵守五大核心约束：先标记状态、父目录摘要、各Skill权限、先复用、测试独立

#### Scenario: 禁止项检查
- **WHEN** AI Agent 执行操作前
- **THEN** 应检查禁止项矩阵，避免违规操作

### Requirement: 命令式指令引导
The system SHALL provide command-style instruction guidance in the prompt template.

#### Scenario: 命令格式
- **WHEN** AI Agent 描述执行步骤
- **THEN** 应使用 `CMD <NAME>(<args>) -> <out>` 格式

#### Scenario: 命令序列
- **WHEN** AI Agent 描述工作流
- **THEN** 应使用命令序列格式 `CMD A -> CMD B -> CMD C`

### Requirement: 来源与依赖声明
The system SHALL provide source and dependency declaration guidance.

#### Scenario: 来源声明
- **WHEN** AI Agent 产出关键结论
- **THEN** 应声明来源与依赖，使用 `TRACE_SOURCES(inputs)` 固化

#### Scenario: 来源缺失处理
- **WHEN** 无法找到来源或依赖
- **THEN** 应进入 `[USER_DECISION]` 并使用 `RECORD_DECISION(topic, decision)` 落盘
