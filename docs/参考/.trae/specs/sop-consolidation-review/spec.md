# SOP 系统性审查与精简规范

## Why

当前SOP体系存在内容重复、文档冗余和引用关系复杂的问题：
- 多个文档包含重复内容（如交互式提问机制在4个文档中重复定义）
- ADR与参考文档之间存在大量重叠
- 部分历史决策文档未明确标记其性质

## What Changes

- **合并重复文档**：将交互式提问相关的3个文档合并为1个精简参考文档
- **精简设计决策文档**：合并 design_decision_rules.md 和 design_directory_strategy.md
- **整理ADR系列**：明确ADR之间的关系，标记历史决策
- **更新引用关系**：消除循环引用，建立清晰的引用层次

## Impact

- Affected specs: spec_design_questioning.md, conflict_detection_rules.md, questioning_checklist.md, design_decision_rules.md, design_directory_strategy.md
- Affected code: 无代码影响，仅文档变更

## ADDED Requirements

### Requirement: 文档精简原则

系统 SHALL 遵循以下精简原则：

#### Scenario: ADR优先原则
- **WHEN** 核心决策已在ADR中持久化
- **THEN** 参考文档应精简为操作指南，引用ADR作为决策依据

#### Scenario: 单一真源原则
- **WHEN** 同一内容在多个文档中出现
- **THEN** 应保留最合适的单一位置，其他位置改为引用

#### Scenario: 历史决策标记
- **WHEN** ADR记录的是历史事件而非持续有效的决策
- **THEN** 应明确标记为"历史决策"或"过程记录"

## MODIFIED Requirements

### Requirement: 交互式提问文档整合

将以下文档整合为一个精简参考文档：

**原文档**：
1. `spec_design_questioning.md` (342行)
2. `conflict_detection_rules.md` (179行)
3. `questioning_checklist.md` (165行)

**目标**：
- 合并为 `spec_interactive_guide.md`（预计150-200行）
- 核心决策引用 ADR-Spec-004
- 保留操作流程和检查清单作为快速参考

### Requirement: 设计决策文档整合

将以下文档整合：

**原文档**：
1. `design_decision_rules.md` (340行)
2. `design_directory_strategy.md` (199行)

**目标**：
- 合并为 `design_guide.md`（预计200-250行）
- 移除与 ADR-Spec-001/002 重复的内容
- 保留操作指南和示例

### Requirement: ADR系列整理

**ADR-Spec-001**：保留，更新引用关系
**ADR-Spec-002**：保留，更新引用关系
**ADR-Spec-003**：标记为"历史决策记录"，说明其记录的是版本同步过程
**ADR-Spec-004**：保留作为交互式提问的核心决策唯一真源

### Requirement: document_directory_mapping.md 精简

移除与ADR重复的详细说明，改为引用ADR：
- "Spec 产物生命周期"章节 → 引用 ADR-Spec-001
- "Spec 与 design.md 的映射关系"章节 → 引用 ADR-Spec-002

## REMOVED Requirements

### Requirement: 删除冗余文档

**删除文件**：
- `spec_design_questioning.md`（内容合并到 spec_interactive_guide.md）
- `conflict_detection_rules.md`（内容合并到 spec_interactive_guide.md）
- `questioning_checklist.md`（内容合并到 spec_interactive_guide.md）
- `design_decision_rules.md`（内容合并到 design_guide.md）
- `design_directory_strategy.md`（内容合并到 design_guide.md）

**Reason**: 内容重复，合并后更易维护
**Migration**: 创建新文档后更新所有引用
