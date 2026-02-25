# Tasks

- [x] Task 1: 架构一致性检查
  - [x] SubTask 1.1: 检查所有 SKILL.md 必需字段（name/description/version/触发条件/输入/输出/停止点/约束）
  - [x] SubTask 1.2: 验证 Skill 矩阵与 SKILL.md 定义一致性
  - [x] SubTask 1.3: 检查三层架构模式（编排层/执行层/工具层）
  - [x] SubTask 1.4: 验证 SSOT 机制（状态/命令字典引用一致性）

- [x] Task 2: 可执行性检查
  - [x] SubTask 2.1: 检查快速路径判定条件和升级红线
  - [x] SubTask 2.2: 检查深度路径阶段定义和停止点
  - [x] SubTask 2.3: 检查 TDD 路径分层验收标准
  - [x] SubTask 2.4: 验证状态机完整性（状态转移规则、孤立状态检测）

- [x] Task 3: 可观测性检查
  - [x] SubTask 3.1: 检查决策记录机制（ADR 模板、决策记录模板）
  - [x] SubTask 3.2: 检查来源与依赖声明规范
  - [x] SubTask 3.3: 检查审计追踪能力（continuation_request、执行结果模板）

- [x] Task 4: 问题汇总与改进建议
  - [x] SubTask 4.1: 汇总所有发现的问题
  - [x] SubTask 4.2: 按严重程度分级（🔴严重/🟠中等/🟡轻微）
  - [x] SubTask 4.3: 提出具体可行的改进建议

# Task Dependencies

- Task 2 依赖 Task 1（架构是执行的基础）
- Task 3 依赖 Task 1（可观测性依赖架构定义）
- Task 4 依赖 Task 1-3（汇总所有检查结果）
