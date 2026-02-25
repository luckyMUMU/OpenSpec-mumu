# SOP 体系全面健康检查 Spec

## Why

用户要求对整个 SOP 体系进行全面分析，判断其是否能实现目标。基于网络调研，需要重点检查：
1. **架构一致性**：Skill 定义、三层架构模式、SSOT 机制
2. **可执行性**：路径判定条件、停止点、状态机完整性
3. **可观测性**：决策记录、来源依赖声明、审计追踪

## What Changes

- 不进行代码修改，仅进行只读分析
- 产出详细分析报告，识别问题和改进建议
- 全面检查所有发现的问题

## Impact

- Affected specs: 无（只读分析）
- Affected code: 无

## 调研依据

基于 2025 年业界最佳实践：
- AI Agent vs Workflow 核心区别
- Skill-first 三层架构模式
- SSOT 单一数据源管理
- AgentOps 可观测性要求

## ADDED Requirements

### Requirement: 架构一致性检查
The system SHALL verify architecture consistency across the SOP system.

#### Scenario: Skill 定义完整性
- **WHEN** 检查每个 SKILL.md
- **THEN** 应包含：name、description、version、触发条件、输入、输出、停止点、约束

#### Scenario: 三层架构模式
- **WHEN** 检查整体架构
- **THEN** 应符合 Agent(编排) → Skills(执行单元) → Tools(MCP) 三层模式

#### Scenario: SSOT 机制
- **WHEN** 检查状态/命令引用
- **THEN** 应与 state_dictionary.md 和 command_dictionary.md 一致，无漂移

### Requirement: 可执行性检查
The system SHALL verify workflow executability.

#### Scenario: 路径判定条件
- **WHEN** 检查快速路径/深度路径/TDD路径
- **THEN** 应有明确的判定条件和升级红线

#### Scenario: 停止点完整性
- **WHEN** 检查每个停止点
- **THEN** 应有明确的触发者、含义、继续条件

#### Scenario: 状态机完整性
- **WHEN** 检查状态流转
- **THEN** 应有完整的状态转移规则，无孤立状态

### Requirement: 可观测性检查
The system SHALL verify observability capabilities.

#### Scenario: 决策记录机制
- **WHEN** 检查决策点
- **THEN** 应有 ADR 或决策记录模板

#### Scenario: 来源与依赖声明
- **WHEN** 检查关键产物
- **THEN** 应声明来源与依赖

#### Scenario: 审计追踪能力
- **WHEN** 检查执行过程
- **THEN** 应有可追溯的记录机制

### Requirement: 问题识别与改进建议
The system SHALL identify issues and provide improvement suggestions.

#### Scenario: 问题分级
- **WHEN** 发现问题
- **THEN** 应按严重程度分级（🔴严重/🟠中等/🟡轻微）

#### Scenario: 改进建议
- **WHEN** 提出改进建议
- **THEN** 应具体可行，引用业界最佳实践
