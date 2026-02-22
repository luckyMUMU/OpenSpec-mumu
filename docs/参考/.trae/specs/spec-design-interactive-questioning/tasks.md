# Tasks

- [x] Task 1: 更新 Spec 模式执行流程文档
  - [x] SubTask 1.1: 在 AGENT_SOP.md 中添加 Spec 模式交互式提问说明
  - [x] SubTask 1.2: 更新 user_guide.md 中的 Spec 驱动开发章节
  - [x] SubTask 1.3: 创建 spec_design_questioning.md 交互式提问指南

- [x] Task 2: 创建冲突检测规则文档
  - [x] SubTask 2.1: 创建 conflict_detection_rules.md 冲突检测规则
  - [x] SubTask 2.2: 定义 ADR 冲突检测逻辑
  - [x] SubTask 2.3: 定义设计文档冲突检测逻辑
  - [x] SubTask 2.4: 定义约束矩阵冲突检测逻辑

- [x] Task 3: 更新 ADR 模板和流程
  - [x] SubTask 3.1: 更新 adr.md 模板，增加决策变更记录章节
  - [x] SubTask 3.2: 创建 ADR 更新流程说明

- [x] Task 4: 创建提问角度检查清单
  - [x] SubTask 4.1: 创建 questioning_checklist.md 提问角度检查清单
  - [x] SubTask 4.2: 定义各角度的具体检查项

- [x] Task 5: 更新约束矩阵
  - [x] SubTask 5.1: 在 constraint_matrix.md 中添加 Spec 模式交互式提问相关约束
  - [x] SubTask 5.2: 确保新约束与现有约束一致

# Task Dependencies

- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 1, Task 2]
- [Task 5] depends on [Task 1, Task 2, Task 3]
