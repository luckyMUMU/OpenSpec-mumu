# SOP 系统性审查规范

## Why

当前 SOP 体系经过多轮迭代，存在以下问题需要系统性审查：

1. **Spec 与持久化设计边界模糊**：Spec 作为单次任务规范，与持久化设计文档（ADR、design.md）的边界不够清晰
2. **长期约束分散**：部分长期约束散落在 Spec 相关文档中，未持久化到 ADR 或设计文档
3. **文档适配性待确认**：新增的交互式提问机制与现有设计文档的适配性需要验证
4. **版本一致性问题**：历史版本不一致问题（ADR-Spec-003）是否彻底解决需要确认

**核心理念**：
- **文档用于持久化设计**：ADR、design.md 等文档承载长期架构决策和设计约束
- **Spec 针对单次任务**：spec.md/tasks.md/checklist.md 是任务执行期的临时规范
- **长期约束持久化**：需要长期遵守的约束应迁移至设计文档和 ADR

## What Changes

### 1. 系统性审查 SOP 文档体系
- 审查 Spec 机制与设计文档的适配性
- 确认长期约束的持久化状态
- 验证 ADR 与 Spec 的关系定义

### 2. 确认文档版本一致性
- 验证所有文档版本与 CHANGELOG 一致
- 确认版本超前/落后问题已解决

### 3. 识别待持久化的长期约束
- 从 Spec 相关文档中识别长期约束
- 确定需要迁移到 ADR/设计文档的内容

## Impact

- Affected specs: 
  - Spec 模式执行流程
  - ADR 模板
  - 约束矩阵
- Affected code: 无代码变更，仅文档审查和更新

## ADDED Requirements

### Requirement: SOP 系统性审查

系统 SHALL 对 SOP 文档体系进行系统性审查，确保 Spec 机制与设计文档的适配性。

#### Scenario: 审查范围
- **WHEN** 执行系统性审查时
- **THEN** 系统应审查以下文档：
  - AGENT_SOP.md（核心约束、Spec 模式交互式提问）
  - constraint_matrix.md（约束矩阵）
  - design_decision_rules.md（设计决策规则）
  - adr.md（ADR 模板）
  - spec_design_questioning.md（Spec 设计提问指南）
  - conflict_detection_rules.md（冲突检测规则）
  - questioning_checklist.md（提问角度检查清单）
  - document_directory_mapping.md（文档目录映射）
  - ADR-Spec-001/002/003（Spec 相关 ADR）

#### Scenario: 审查维度
- **WHEN** 审查每份文档时
- **THEN** 系统应从以下维度评估：
  - **适配性**：与 Spec 机制的适配程度
  - **持久化状态**：长期约束是否已持久化
  - **版本一致性**：版本号是否与 CHANGELOG 一致
  - **引用完整性**：文档间引用是否正确

### Requirement: 长期约束持久化识别

系统 SHALL 识别需要持久化的长期约束。

#### Scenario: 识别标准
- **WHEN** 审查文档中的约束时
- **THEN** 系统应识别以下类型的长期约束：
  - 跨任务适用的流程约束
  - 架构层面的技术选型约束
  - 安全/性能等非功能性约束
  - 与 Spec 机制相关的设计决策

#### Scenario: 持久化判断
- **WHEN** 识别到长期约束时
- **THEN** 系统应判断是否需要持久化：
  - 已持久化：约束已在 ADR 或设计文档中记录
  - 待持久化：约束仅在临时文档中，需要迁移
  - 无需持久化：约束仅适用于特定场景

### Requirement: Spec 与设计文档边界确认

系统 SHALL 明确 Spec 与设计文档的边界。

#### Scenario: 边界定义
- **WHEN** 确认边界时
- **THEN** 系统应明确：
  - **Spec 产物**：spec.md/tasks.md/checklist.md（临时）
  - **持久化设计**：ADR、design.md、架构设计文档
  - **约束文档**：constraint_matrix.md、coding_principles.md

#### Scenario: 生命周期确认
- **WHEN** 确认生命周期时
- **THEN** 系统应验证：
  - Spec 产物是否按 ADR-Spec-001 定义的生命周期管理
  - 重要决策是否按 ADR 模板记录
  - 长期约束是否持久化到设计文档

## MODIFIED Requirements

### Requirement: ADR 与 Spec 关系确认

ADR 与 Spec 的关系 SHALL 按以下原则确认：

**现有定义**（ADR-Spec-002）：
- Spec 任务边界 = design.md 目录边界
- 执行顺序 = depth_desc（从深到浅）

**需要确认**：
- [ ] ADR 更新触发条件是否明确
- [ ] Spec 决策记录到 ADR 的流程是否清晰
- [ ] 冲突检测后的 ADR 更新机制是否完善

### Requirement: 版本一致性验证

版本一致性 SHALL 按 ADR-Spec-003 定义的机制验证：

**验证范围**：
- [ ] AGENT_SOP.md 版本
- [ ] constraint_matrix.md 版本
- [ ] 所有 Skill 合约版本
- [ ] 所有参考文档版本

## REMOVED Requirements

无移除的需求。

## 审查维度详细定义

### 1. 适配性审查

| 文档 | 审查要点 | 预期状态 |
|------|----------|----------|
| AGENT_SOP.md | Spec 模式交互式提问章节是否完整 | 完整 |
| constraint_matrix.md | Spec 模式约束是否已添加 | 已添加 |
| design_decision_rules.md | Spec 任务划分规则是否明确 | 明确 |
| adr.md | ADR 与 Spec 关联章节是否完整 | 完整 |
| spec_design_questioning.md | 提问机制是否与 SOP 流程适配 | 适配 |
| conflict_detection_rules.md | 冲突检测是否覆盖 Spec 场景 | 覆盖 |
| document_directory_mapping.md | Spec 生命周期是否已定义 | 已定义 |

### 2. 持久化状态审查

| 约束类型 | 当前位置 | 持久化状态 | 需要操作 |
|----------|----------|------------|----------|
| Spec 生命周期管理 | ADR-Spec-001 | ✅ 已持久化 | 无 |
| Spec 与 design.md 关系 | ADR-Spec-002 | ✅ 已持久化 | 无 |
| 版本同步机制 | ADR-Spec-003 | ✅ 已持久化 | 无 |
| 交互式提问机制 | spec_design_questioning.md | ⚠️ 待评估 | 需确认是否需要 ADR |
| 冲突检测规则 | conflict_detection_rules.md | ⚠️ 待评估 | 需确认是否需要 ADR |
| 提问角度检查清单 | questioning_checklist.md | ⚠️ 待评估 | 需确认是否需要 ADR |

### 3. 版本一致性审查

| 文档 | 当前版本 | CHANGELOG 版本 | 状态 |
|------|----------|----------------|------|
| AGENT_SOP.md | v2.5.0 | v2.5.0 | ✅ 一致 |
| constraint_matrix.md | v2.5.0 | v2.5.0 | ✅ 一致 |
| design_decision_rules.md | v2.4.0 | v2.5.0 | ⚠️ 待确认 |
| adr.md | v2.5.0 | v2.5.0 | ✅ 一致 |
| spec_design_questioning.md | v2.5.0 | v2.5.0 | ✅ 一致 |
| conflict_detection_rules.md | v2.5.0 | v2.5.0 | ✅ 一致 |
| questioning_checklist.md | v2.5.0 | v2.5.0 | ✅ 一致 |
| document_directory_mapping.md | v2.4.0 | v2.5.0 | ⚠️ 待确认 |

### 4. 引用完整性审查

| 文档 | 引用检查 | 状态 |
|------|----------|------|
| AGENT_SOP.md | 所有链接是否有效 | 待检查 |
| constraint_matrix.md | 相关文档引用是否完整 | 待检查 |
| spec_design_questioning.md | 相关文档引用是否完整 | 待检查 |

## 决策记录

| 决策ID | 决策主题 | 决策内容 | 影响范围 | 记录位置 |
|--------|----------|----------|----------|----------|
| D001 | 审查范围 | 扩展到所有 SOP 相关文档进行全面审查 | 全局 | spec.md |
| D002 | 审查维度 | 适配性/持久化/版本/引用 | 全局 | spec.md |
| D003 | ADR 持久化 | 创建 ADR-Spec-004 持久化交互式提问机制核心决策 | 全局 | 待创建 ADR |
| D004 | 版本更新 | design_decision_rules.md 和 document_directory_mapping.md 更新到 v2.5.0 并添加引用 | 多文档 | spec.md |
| D005 | Skill 审查重点 | Spec 约束适配、交互式提问适配、引用完整性 | Skill 合约 | spec.md |

### 决策详情

#### D003: ADR 持久化决策
- **决策内容**：创建单一综合 ADR-Spec-004 涵盖交互式提问机制的所有核心决策
- **涉及文档**：spec_design_questioning.md、conflict_detection_rules.md、questioning_checklist.md
- **触发原因**：这些文档包含长期约束，需要持久化以确保可追溯性

#### D004: 版本更新决策
- **决策内容**：design_decision_rules.md 和 document_directory_mapping.md 更新版本号并添加与 Spec 交互式提问相关的引用
- **触发原因**：版本落后于 CHANGELOG v2.5.0，且需要与新增的交互式提问机制建立关联

#### D005: Skill 审查重点决策
- **决策内容**：Skill 合约审查重点关注 Spec 约束适配、交互式提问适配、引用完整性
- **触发原因**：扩展审查范围到所有 SOP 相关文档

## 相关文档

- [ADR-Spec-001: Spec 产物生命周期管理](../sop/04_context_reference/adr_Spec_001_lifecycle.md)
- [ADR-Spec-002: Spec 与 Design.md 关系定义](../sop/04_context_reference/adr_Spec_002_design_relation.md)
- [ADR-Spec-003: 版本同步机制](../sop/04_context_reference/adr_Spec_003_version_sync.md)
- [约束矩阵](../sop/05_constraints/constraint_matrix.md)
- [ADR 模板](../sop/04_reference/document_templates/adr.md)
