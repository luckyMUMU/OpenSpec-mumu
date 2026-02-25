# SOP 体系系统性审查规范

## Why

SOP体系经过多轮迭代（v2.0.0 → v2.12.0），累积了大量改进和优化，但可能存在：
- 内容重复：同一概念在多处定义
- 逻辑不贯通：文档间引用断裂或矛盾
- 过时内容：历史遗留的废弃内容未清理
- 版本不一致：部分文件版本号未同步

需要系统性审查确保SOP体系的简洁性、一致性和可维护性。

## What Changes

### 审查范围

1. **核心文档**（5个）
   - AGENT_SOP.md（入口文档）
   - 01_concept_overview.md（概念概述）
   - CHANGELOG.md（版本历史）
   - 02_skill_matrix/index.md（Skill矩阵SSOT）
   - 03_workflow/index.md（工作流规范）

2. **约束文档**（6个）
   - 05_constraints/state_dictionary.md（状态字典）
   - 05_constraints/command_dictionary.md（命令字典）
   - 05_constraints/constraint_matrix.md（约束矩阵）
   - 05_constraints/coding_principles.md（编码原则）
   - 05_constraints/acceptance_criteria.md（验收标准）
   - 05_constraints/index.md（约束索引）

3. **参考文档**（4个）
   - 04_reference/index.md（参考文档索引）
   - 04_reference/design_guide.md（设计指南）
   - 04_reference/spec_interactive_guide.md（交互规范）
   - 04_reference/document_directory_mapping.md（目录映射）

4. **Skill合约**（17个）
   - skills/*/SKILL.md（所有Skill定义文件）

5. **工作流文档**（4个）
   - 03_workflow/fast_path.md
   - 03_workflow/deep_path.md
   - 03_workflow/three_strike_rule.md
   - skills/sop-tdd-workflow/SKILL.md

### 审查维度

| 维度 | 检查内容 | 严重程度 |
|------|----------|----------|
| **内容重复** | 同一概念是否在多处重复定义 | 高 |
| **逻辑贯通** | 文档间引用是否正确、流程是否完整 | 高 |
| **过时内容** | 是否存在已废弃但未清理的内容 | 中 |
| **版本一致** | 所有文件版本号是否统一 | 中 |
| **引用完整** | 链接是否有效、路径是否正确 | 中 |
| **术语统一** | 同一概念是否使用统一术语 | 低 |

## Impact

- **Affected specs**: 所有SOP相关规范
- **Affected code**: 无代码变更，仅文档审查和清理

## ADDED Requirements

### Requirement: 内容重复检测

系统应检测以下类型的重复内容：

#### Scenario: 状态定义重复
- **WHEN** 同一状态在多处定义
- **THEN** 标记重复位置，保留状态字典中的定义，其他位置改为引用

#### Scenario: 命令定义重复
- **WHEN** 同一命令在多处定义
- **THEN** 标记重复位置，保留命令字典中的定义，其他位置改为引用

#### Scenario: 流程描述重复
- **WHEN** 同一工作流程在多处详细描述
- **THEN** 保留最权威位置的描述，其他位置改为摘要+链接引用

#### Scenario: 约束规则重复
- **WHEN** 同一约束规则在多处定义
- **THEN** 保留约束矩阵中的定义，其他位置改为引用

### Requirement: 逻辑贯通性检查

系统应验证文档间的逻辑一致性：

#### Scenario: 状态转移完整性
- **WHEN** 状态字典定义了状态转移
- **THEN** 验证所有引用该状态的Skill文档中的转移路径是否一致

#### Scenario: 命令参数一致性
- **WHEN** 命令字典定义了命令参数
- **THEN** 验证所有使用该命令的文档中的参数定义是否一致

#### Scenario: 工作流连贯性
- **WHEN** 工作流文档描述了调用链
- **THEN** 验证调用链中的Skill是否存在且停止点定义正确

#### Scenario: 引用路径正确性
- **WHEN** 文档中包含引用链接
- **THEN** 验证链接指向的文件是否存在

### Requirement: 过时内容清理

系统应识别并标记过时内容：

#### Scenario: 废弃状态识别
- **WHEN** 状态字典中标记了弃用状态
- **THEN** 检查是否有文档仍在使用弃用状态

#### Scenario: 历史别名清理
- **WHEN** 术语表中定义了历史别名
- **THEN** 检查是否有文档仍在使用历史别名

#### Scenario: 过时模板识别
- **WHEN** 模板文件被标记为不推荐
- **THEN** 检查是否有文档仍在引用过时模板

#### Scenario: 废弃命令检测
- **WHEN** 命令字典中移除了某命令
- **THEN** 检查是否有文档仍在使用该命令

### Requirement: 版本一致性检查

系统应确保版本号统一：

#### Scenario: 核心文件版本统一
- **WHEN** 执行版本检查
- **THEN** 所有核心文档的版本号应与CHANGELOG中最新版本一致

#### Scenario: Skill合约版本统一
- **WHEN** 执行版本检查
- **THEN** 所有SKILL.md的版本号应与最新版本一致

#### Scenario: 依赖版本声明
- **WHEN** Skill声明了依赖版本
- **THEN** 验证依赖版本是否满足当前版本要求

### Requirement: 术语统一性检查

系统应确保术语使用一致：

#### Scenario: 术语表对照
- **WHEN** 状态字典中定义了术语表
- **THEN** 检查所有文档是否使用标准术语而非历史别名

#### Scenario: 状态命名一致
- **WHEN** 引用状态标记
- **THEN** 使用`[STATE_NAME]`格式，不使用历史别名

#### Scenario: 命令命名一致
- **WHEN** 引用命令
- **THEN** 使用命令字典中定义的标准名称

### Requirement: 模拟编程场景验证

系统应通过模拟实际编程场景验证SOP的可用性和流畅性：

#### Scenario: 快速路径场景模拟
- **WHEN** 模拟一个单文件小修改任务（如修复一个简单的bug）
- **THEN** 验证：
  - 从AGENT_SOP.md入口能否快速找到快速路径指引
  - 跟随指引能否顺利找到sop-code-explorer、sop-code-implementation、sop-code-review的详细说明
  - 状态转移流程是否清晰（`[WAITING_FOR_CODE_REVIEW]` → `[DIFF_APPROVAL]`）
  - 所需模板（code_audit_report.md、worker_execution_result.md、code_review.md）引用是否正确

#### Scenario: 深度路径场景模拟
- **WHEN** 模拟一个新功能开发任务
- **THEN** 验证：
  - 从入口能否找到深度路径指引
  - 调用链（sop-requirement-analyst → sop-architecture-design → ...）是否完整
  - 每个阶段的停止点定义是否清晰
  - 门控检查流程是否可执行
  - 文档模板引用链是否完整

#### Scenario: 多目录并行场景模拟
- **WHEN** 模拟一个涉及多个design.md目录的复杂任务
- **THEN** 验证：
  - 目录调度流程（LIST_DESIGN_MD → SCHEDULE_DIRS → RUN_DIR_BATCH）是否清晰
  - 跨目录依赖处理流程是否可执行
  - `[DIR_WAITING_DEP]`状态的唤醒机制是否明确
  - sop-progress-supervisor的职责边界是否清晰

#### Scenario: 审查失败场景模拟
- **WHEN** 模拟代码审查失败场景
- **THEN** 验证：
  - 三错即停机制是否可执行
  - `[FUSION_TRIGGERED]`状态的处理流程是否完整
  - 用户决策点（`[USER_DECISION]`）的选项是否明确
  - 决策记录模板是否可用

#### Scenario: 门控失败场景模拟
- **WHEN** 模拟门控检查失败场景
- **THEN** 验证：
  - `[GATE_FAILED]`状态的处理流程是否完整
  - 用户决策选项（修复后重试/回滚/终止）是否明确
  - GATE_RETRY和GATE_ROLLBACK命令是否在命令字典中定义

#### Scenario: Spec模式交互场景模拟
- **WHEN** 模拟Spec模式下的交互式提问场景
- **THEN** 验证：
  - 冲突检测触发条件是否清晰
  - ADR确认更新机制是否可执行
  - 决策分级记录规则是否明确

#### Scenario: 中断恢复场景模拟
- **WHEN** 模拟任务中断后恢复场景
- **THEN** 验证：
  - 可恢复检查点列表是否完整
  - continuation_request模板是否可用
  - 恢复所需的最小输入是否明确

### Requirement: 引用流畅性验证

系统应验证文档引用链的流畅性：

#### Scenario: 入口到详情的引用流畅性
- **WHEN** 从AGENT_SOP.md入口开始导航
- **THEN** 验证：
  - 快速分诊表格中的链接能否直达目标文档
  - 目标文档是否包含返回入口的导航
  - 层级导航（L1→L2→L3→L4）是否顺畅

#### Scenario: 跨文档引用流畅性
- **WHEN** 在一个文档中需要引用另一个文档的内容
- **THEN** 验证：
  - 引用路径是否正确
  - 被引用内容是否存在于目标位置
  - 是否存在循环引用

#### Scenario: 模板引用流畅性
- **WHEN** Skill需要使用模板产出交付物
- **THEN** 验证：
  - 模板路径是否正确
  - 模板内容是否完整
  - 模板是否包含必要的字段定义

## MODIFIED Requirements

### Requirement: 审查报告输出格式

审查完成后应输出结构化报告：

```markdown
# SOP 体系审查报告

## 审查摘要
- 审查日期：YYYY-MM-DD
- 审查范围：X个文件
- 发现问题：Y个

## 问题清单

### 高优先级问题
| 问题类型 | 文件位置 | 问题描述 | 建议修复方式 |
|----------|----------|----------|--------------|
| ... | ... | ... | ... |

### 中优先级问题
| 问题类型 | 文件位置 | 问题描述 | 建议修复方式 |
|----------|----------|----------|--------------|
| ... | ... | ... | ... |

### 低优先级问题
| 问题类型 | 文件位置 | 问题描述 | 建议修复方式 |
|----------|----------|----------|--------------|
| ... | ... | ... | ... |

## 统计信息
- 内容重复：X处
- 引用断裂：Y处
- 过时内容：Z处
- 版本不一致：W处
```

## REMOVED Requirements

无移除的需求。
