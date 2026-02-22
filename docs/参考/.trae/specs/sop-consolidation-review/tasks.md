# Tasks

## Task 1: 创建交互式提问整合文档

将 spec_design_questioning.md、conflict_detection_rules.md、questioning_checklist.md 合并为一个精简文档。

- [x] SubTask 1.1: 创建 spec_interactive_guide.md，整合核心操作流程
- [x] SubTask 1.2: 引用 ADR-Spec-004 作为决策依据
- [x] SubTask 1.3: 保留检查清单作为快速参考表格
- [x] SubTask 1.4: 更新版本号到 v2.7.0

## Task 2: 创建设计指南整合文档

将 design_decision_rules.md、design_directory_strategy.md 合并为一个精简文档。

- [x] SubTask 2.1: 创建 design_guide.md，整合核心操作指南
- [x] SubTask 2.2: 引用 ADR-Spec-001/002 作为决策依据
- [x] SubTask 2.3: 保留示例场景和决策流程
- [x] SubTask 2.4: 更新版本号到 v2.7.0

## Task 3: 整理ADR系列文档

更新ADR文档，明确其性质和引用关系。

- [x] SubTask 3.1: 更新 ADR-Spec-003，标记为"历史决策记录"
- [x] SubTask 3.2: 更新 ADR-Spec-004 引用关系
- [x] SubTask 3.3: 确保ADR之间的引用关系清晰

## Task 4: 精简 document_directory_mapping.md

移除与ADR重复的内容，改为引用。

- [x] SubTask 4.1: 精简"Spec 产物生命周期"章节，引用 ADR-Spec-001
- [x] SubTask 4.2: 精简"Spec 与 design.md 的映射关系"章节，引用 ADR-Spec-002
- [x] SubTask 4.3: 更新版本号到 v2.7.0

## Task 5: 更新 AGENT_SOP.md 引用

更新入口文档中的引用路径。

- [x] SubTask 5.1: 更新参考文档索引中的引用
- [x] SubTask 5.2: 更新约束矩阵中的引用
- [x] SubTask 5.3: 更新版本号到 v2.7.0

## Task 6: 更新 04_reference/index.md 引用

更新参考文档入口的引用路径。

- [x] SubTask 6.1: 更新模板和规范章节的引用
- [x] SubTask 6.2: 更新版本号到 v2.7.0

## Task 7: 更新 constraint_matrix.md 引用

更新约束矩阵中的引用路径。

- [x] SubTask 7.1: 更新相关文档引用
- [x] SubTask 7.2: 更新版本号到 v2.7.0

## Task 8: 删除冗余文档

删除已合并的原始文档。

- [x] SubTask 8.1: 删除 spec_design_questioning.md
- [x] SubTask 8.2: 删除 conflict_detection_rules.md
- [x] SubTask 8.3: 删除 questioning_checklist.md
- [x] SubTask 8.4: 删除 design_decision_rules.md
- [x] SubTask 8.5: 删除 design_directory_strategy.md

## Task 9: 更新 CHANGELOG

记录本次精简变更。

- [x] SubTask 9.1: 添加 v2.7.0 版本记录
- [x] SubTask 9.2: 记录文档合并和删除
- [x] SubTask 9.3: 记录ADR整理

# Task Dependencies

- Task 1 和 Task 2 可并行执行
- Task 3 可与 Task 1、Task 2 并行执行
- Task 4 依赖 Task 3（需要确认ADR引用关系）
- Task 5、Task 6、Task 7 依赖 Task 1、Task 2（需要新的文档路径）
- Task 8 依赖 Task 1、Task 2、Task 5、Task 6、Task 7（确保引用已更新）
- Task 9 依赖 Task 1-8 全部完成
