# Tasks

## Task 1: 完善 ADR 模板

修复 ADR 模板中的问题，包括合并重复章节和完善用户确认机制。

- [x] SubTask 1.1: 合并"决策变更记录"和"决策记录"为统一的"决策记录"章节
- [x] SubTask 1.2: 完善用户确认机制，添加"创建新 ADR"和"请求讨论"选项
- [x] SubTask 1.3: 更新版本号到 v2.6.0

## Task 2: 为 Skill 合约添加 Spec 约束（核心 Skill）

为核心工作流 Skill 添加 Spec 模式相关约束章节。

- [x] SubTask 2.1: 更新 sop-fast-path SKILL.md - 添加 Spec 模式约束和升级规则
- [x] SubTask 2.2: 更新 sop-deep-path SKILL.md - 添加 Spec 模式约束
- [x] SubTask 2.3: 更新 sop-architecture-design SKILL.md - 添加 Spec 模式约束
- [x] SubTask 2.4: 更新 sop-implementation-designer SKILL.md - 添加 Spec 模式约束
- [x] SubTask 2.5: 更新 sop-code-implementation SKILL.md - 添加 Spec 模式约束

## Task 3: 为 Skill 合约添加 Spec 约束（辅助 Skill）

为辅助功能 Skill 添加 Spec 模式相关约束章节。

- [x] SubTask 3.1: 更新 sop-code-review SKILL.md - 添加 Spec 模式约束
- [x] SubTask 3.2: 更新 sop-architecture-reviewer SKILL.md - 添加 Spec 模式约束
- [x] SubTask 3.3: 更新 sop-test-design-csv SKILL.md - 添加 Spec 模式约束
- [x] SubTask 3.4: 更新 sop-test-implementation SKILL.md - 添加 Spec 模式约束
- [x] SubTask 3.5: 更新 sop-tdd-workflow SKILL.md - 添加 Spec 模式约束

## Task 4: 为 Skill 合约添加 Spec 约束（协调 Skill）

为协调和管理类 Skill 添加 Spec 模式相关约束章节。

- [x] SubTask 4.1: 更新 sop-workflow-orchestrator SKILL.md - 添加 Spec 模式约束
- [x] SubTask 4.2: 更新 sop-progress-supervisor SKILL.md - 添加 Spec 模式约束
- [x] SubTask 4.3: 更新 sop-document-sync SKILL.md - 添加 Spec 模式约束
- [x] SubTask 4.4: 更新 sop-design-placement SKILL.md - 添加 Spec 模式约束

## Task 5: 为 Skill 合约添加 Spec 约束（探索 Skill）

为探索和分析类 Skill 添加 Spec 模式相关约束章节。

- [x] SubTask 5.1: 更新 sop-code-explorer SKILL.md - 添加 Spec 模式约束
- [x] SubTask 5.2: 更新 sop-requirement-analyst SKILL.md - 添加 Spec 模式约束
- [x] SubTask 5.3: 更新 sop-capability-reuse SKILL.md - 添加 Spec 模式约束

## Task 6: 更新 AGENT_SOP.md 快速路径章节

明确快速路径与 Spec 模式的交互规则。

- [x] SubTask 6.1: 在快速路径章节添加与 Spec 模式的交互规则
- [x] SubTask 6.2: 添加快速路径升级到 Spec 模式的触发条件
- [x] SubTask 6.3: 更新版本号到 v2.6.0

## Task 7: 更新 CHANGELOG

记录所有改进变更。

- [x] SubTask 7.1: 在 CHANGELOG.md 添加 v2.6.0 版本记录
- [x] SubTask 7.2: 记录所有 Skill 合约更新
- [x] SubTask 7.3: 记录 ADR 模板改进

# Task Dependencies

- Task 2-5 可并行执行
- Task 6 可与 Task 2-5 并行执行
- Task 7 依赖 Task 1-6 全部完成
