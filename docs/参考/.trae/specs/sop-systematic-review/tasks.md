# Tasks

## 阶段一：核心文档审查

- [ ] Task 1: 审查AGENT_SOP.md入口文档
  - [ ] SubTask 1.1: 检查内容是否与子文档重复
  - [ ] SubTask 1.2: 验证所有引用链接是否有效
  - [ ] SubTask 1.3: 检查版本号是否为最新
  - [ ] SubTask 1.4: 验证核心约束是否与constraint_matrix.md一致

- [ ] Task 2: 审查01_concept_overview.md概念文档
  - [ ] SubTask 2.1: 检查概念定义是否与状态字典/命令字典重复
  - [ ] SubTask 2.2: 验证引用路径正确性
  - [ ] SubTask 2.3: 检查版本号一致性

- [ ] Task 3: 审查CHANGELOG.md版本历史
  - [ ] SubTask 3.1: 验证版本号演进逻辑
  - [ ] SubTask 3.2: 检查变更记录完整性
  - [ ] SubTask 3.3: 确认最新版本号

## 阶段二：约束文档审查

- [ ] Task 4: 审查state_dictionary.md状态字典
  - [ ] SubTask 4.1: 检查状态定义完整性
  - [ ] SubTask 4.2: 验证状态转移逻辑一致性
  - [ ] SubTask 4.3: 检查弃用状态是否被使用
  - [ ] SubTask 4.4: 验证术语表定义

- [ ] Task 5: 审查command_dictionary.md命令字典
  - [ ] SubTask 5.1: 检查命令定义完整性
  - [ ] SubTask 5.2: 验证命令参数类型定义
  - [ ] SubTask 5.3: 检查命令别名是否一致

- [ ] Task 6: 审查constraint_matrix.md约束矩阵
  - [ ] SubTask 6.1: 检查约束规则是否与其他文档重复
  - [ ] SubTask 6.2: 验证禁止项定义完整性
  - [ ] SubTask 6.3: 检查违反后果等级定义

- [ ] Task 7: 审查其他约束文档
  - [ ] SubTask 7.1: 审查coding_principles.md
  - [ ] SubTask 7.2: 审查acceptance_criteria.md
  - [ ] SubTask 7.3: 审查05_constraints/index.md

## 阶段三：Skill矩阵与合约审查

- [ ] Task 8: 审查02_skill_matrix/index.md
  - [ ] SubTask 8.1: 检查Skill定义是否与SKILL.md重复
  - [ ] SubTask 8.2: 验证停止点定义与状态字典一致
  - [ ] SubTask 8.3: 检查版本依赖声明

- [ ] Task 9: 审查所有SKILL.md文件（17个）
  - [ ] SubTask 9.1: 检查版本号一致性
  - [ ] SubTask 9.2: 验证停止点与状态字典一致
  - [ ] SubTask 9.3: 检查输入输出定义格式统一
  - [ ] SubTask 9.4: 验证约束与constraint_matrix.md一致
  - [ ] SubTask 9.5: 检查层级标注正确性

## 阶段四：工作流文档审查

- [ ] Task 10: 审查03_workflow/index.md
  - [ ] SubTask 10.1: 检查工作流描述是否与子文档重复
  - [ ] SubTask 10.2: 验证调用链完整性
  - [ ] SubTask 10.3: 检查门控机制定义

- [ ] Task 11: 审查fast_path.md和deep_path.md
  - [ ] SubTask 11.1: 检查路径描述是否与Skill矩阵一致
  - [ ] SubTask 11.2: 验证停止点定义正确
  - [ ] SubTask 11.3: 检查升级条件定义

- [ ] Task 12: 审查three_strike_rule.md
  - [ ] SubTask 12.1: 检查三错即停规则是否与其他文档重复
  - [ ] SubTask 12.2: 验证熔断状态定义一致

## 阶段五：参考文档审查

- [ ] Task 13: 审查04_reference/index.md
  - [ ] SubTask 13.1: 检查模板引用完整性
  - [ ] SubTask 13.2: 验证交互格式引用正确
  - [ ] SubTask 13.3: 检查审查标准引用

- [ ] Task 14: 审查design_guide.md和spec_interactive_guide.md
  - [ ] SubTask 14.1: 检查内容是否与核心文档重复
  - [ ] SubTask 14.2: 验证引用路径正确性

## 阶段六：模拟编程场景验证

- [ ] Task 15: 快速路径场景模拟验证
  - [ ] SubTask 15.1: 模拟单文件小修改任务，验证入口导航流畅性
  - [ ] SubTask 15.2: 验证sop-code-explorer → sop-code-implementation → sop-code-review调用链
  - [ ] SubTask 15.3: 验证状态转移流程（`[WAITING_FOR_CODE_REVIEW]` → `[DIFF_APPROVAL]`）
  - [ ] SubTask 15.4: 验证模板引用正确性（code_audit_report.md、worker_execution_result.md、code_review.md）

- [ ] Task 16: 深度路径场景模拟验证
  - [ ] SubTask 16.1: 模拟新功能开发任务，验证入口导航流畅性
  - [ ] SubTask 16.2: 验证完整调用链（sop-requirement-analyst → sop-architecture-design → ...）
  - [ ] SubTask 16.3: 验证每个阶段的停止点定义清晰
  - [ ] SubTask 16.4: 验证门控检查流程可执行
  - [ ] SubTask 16.5: 验证文档模板引用链完整

- [ ] Task 17: 多目录并行场景模拟验证
  - [ ] SubTask 17.1: 模拟多design.md目录任务
  - [ ] SubTask 17.2: 验证目录调度流程（LIST_DESIGN_MD → SCHEDULE_DIRS → RUN_DIR_BATCH）
  - [ ] SubTask 17.3: 验证跨目录依赖处理流程
  - [ ] SubTask 17.4: 验证`[DIR_WAITING_DEP]`状态唤醒机制
  - [ ] SubTask 17.5: 验证sop-progress-supervisor职责边界

- [ ] Task 18: 审查失败场景模拟验证
  - [ ] SubTask 18.1: 模拟代码审查失败场景
  - [ ] SubTask 18.2: 验证三错即停机制可执行
  - [ ] SubTask 18.3: 验证`[FUSION_TRIGGERED]`状态处理流程
  - [ ] SubTask 18.4: 验证`[USER_DECISION]`选项明确
  - [ ] SubTask 18.5: 验证决策记录模板可用

- [ ] Task 19: 门控失败场景模拟验证
  - [ ] SubTask 19.1: 模拟门控检查失败场景
  - [ ] SubTask 19.2: 验证`[GATE_FAILED]`状态处理流程
  - [ ] SubTask 19.3: 验证用户决策选项（修复后重试/回滚/终止）
  - [ ] SubTask 19.4: 验证GATE_RETRY和GATE_ROLLBACK命令定义

- [ ] Task 20: Spec模式交互场景模拟验证
  - [ ] SubTask 20.1: 模拟Spec模式交互式提问场景
  - [ ] SubTask 20.2: 验证冲突检测触发条件清晰
  - [ ] SubTask 20.3: 验证ADR确认更新机制可执行
  - [ ] SubTask 20.4: 验证决策分级记录规则明确

- [ ] Task 21: 中断恢复场景模拟验证
  - [ ] SubTask 21.1: 模拟任务中断后恢复场景
  - [ ] SubTask 21.2: 验证可恢复检查点列表完整
  - [ ] SubTask 21.3: 验证continuation_request模板可用
  - [ ] SubTask 21.4: 验证恢复所需最小输入明确

- [ ] Task 22: 引用流畅性验证
  - [ ] SubTask 22.1: 验证入口到详情的引用流畅性（L1→L2→L3→L4）
  - [ ] SubTask 22.2: 验证跨文档引用正确性和无循环引用
  - [ ] SubTask 22.3: 验证模板引用路径正确、内容完整

## 阶段七：问题汇总与清理

- [ ] Task 23: 生成审查报告
  - [ ] SubTask 23.1: 汇总所有发现的问题
  - [ ] SubTask 23.2: 按优先级分类问题
  - [ ] SubTask 23.3: 提供修复建议
  - [ ] SubTask 23.4: 包含场景模拟验证结果

- [ ] Task 24: 执行内容清理
  - [ ] SubTask 24.1: 清理重复内容，改为引用
  - [ ] SubTask 24.2: 修复断裂引用
  - [ ] SubTask 24.3: 移除过时内容
  - [ ] SubTask 24.4: 同步版本号
  - [ ] SubTask 24.5: 修复场景模拟中发现的问题

# Task Dependencies

- Task 4, Task 5 必须先完成，其他任务依赖状态字典和命令字典的定义
- Task 8 依赖 Task 4, Task 5（需要状态和命令定义作为基准）
- Task 9 依赖 Task 8（Skill矩阵是SKILL.md的摘要）
- Task 15-22 依赖 Task 1-14（场景模拟需要先完成文档审查）
- Task 23 依赖 Task 1-22（需要所有审查和模拟结果）
- Task 24 依赖 Task 23（需要审查报告指导清理）
