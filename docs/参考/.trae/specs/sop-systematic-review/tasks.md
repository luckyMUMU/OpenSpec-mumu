# Tasks

## Task 1: 审查核心约束文档适配性

审查 AGENT_SOP.md 和 constraint_matrix.md 与 Spec 机制的适配性。

- [x] SubTask 1.1: 审查 AGENT_SOP.md 中 Spec 模式交互式提问章节的完整性
- [x] SubTask 1.2: 审查 constraint_matrix.md 中 Spec 模式约束的完整性
- [x] SubTask 1.3: 确认核心约束（#10-#12）与文档定义的一致性
- [x] SubTask 1.4: 验证 Spec 模式执行流程与现有工作流的兼容性

## Task 2: 审查设计决策规则适配性

审查 design_decision_rules.md 与 Spec 机制的适配性。

- [x] SubTask 2.1: 确认 Spec 任务划分规则是否明确
- [x] SubTask 2.2: 验证任务声明格式与 design.md 的对应关系
- [x] SubTask 2.3: 检查动态创建条件是否与 ADR-Spec-002 一致
- [x] SubTask 2.4: 更新版本到 v2.5.0 并添加与 Spec 交互式提问相关的引用

## Task 3: 审查 ADR 模板与 Spec 关联

审查 adr.md 模板中与 Spec 相关的章节。

- [x] SubTask 3.1: 确认"决策变更记录"章节是否完整
- [x] SubTask 3.2: 确认"与 Spec 的关联"章节是否完整
- [x] SubTask 3.3: 验证 ADR 更新流程是否与 spec_design_questioning.md 一致
- [x] SubTask 3.4: 确认用户确认机制是否明确

## Task 4: 审查 Spec 设计提问指南

审查 spec_design_questioning.md 的完整性和适配性。

- [x] SubTask 4.1: 验证提问触发机制是否与 AGENT_SOP.md 一致
- [x] SubTask 4.2: 确认冲突优先级处理是否与 conflict_detection_rules.md 一致
- [x] SubTask 4.3: 检查 ADR 确认更新机制是否完整
- [x] SubTask 4.4: 提取核心决策用于 ADR-Spec-004

## Task 5: 审查冲突检测规则

审查 conflict_detection_rules.md 的完整性和适配性。

- [x] SubTask 5.1: 确认检测范围是否覆盖所有 Spec 相关场景
- [x] SubTask 5.2: 验证冲突类型定义是否完整
- [x] SubTask 5.3: 检查优先级规则是否与 AGENT_SOP.md 一致
- [x] SubTask 5.4: 提取核心规则用于 ADR-Spec-004

## Task 6: 审查提问角度检查清单

审查 questioning_checklist.md 的完整性。

- [x] SubTask 6.1: 确认 6 个维度的检查项是否完整
- [x] SubTask 6.2: 验证检查结果处理流程是否明确
- [x] SubTask 6.3: 确认与 spec_design_questioning.md 的一致性
- [x] SubTask 6.4: 提取核心检查项用于 ADR-Spec-004

## Task 7: 审查文档目录映射

审查 document_directory_mapping.md 的完整性。

- [x] SubTask 7.1: 确认 Spec 产物生命周期章节是否完整
- [x] SubTask 7.2: 验证 Spec 与 design.md 映射关系是否与 ADR-Spec-002 一致
- [x] SubTask 7.3: 更新版本到 v2.5.0 并添加与 Spec 交互式提问相关的引用
- [x] SubTask 7.4: 检查引用链接是否有效

## Task 8: 审查 ADR-Spec 系列文档

审查 ADR-Spec-001/002/003 的完整性和一致性。

- [x] SubTask 8.1: 确认 ADR-Spec-001 生命周期定义是否与实际流程一致
- [x] SubTask 8.2: 确认 ADR-Spec-002 任务划分规则是否与 design_decision_rules.md 一致
- [x] SubTask 8.3: 确认 ADR-Spec-003 版本同步机制是否已执行
- [x] SubTask 8.4: 验证三份 ADR 之间的引用关系是否正确

## Task 9: 审查 Skill 合约文档

审查所有 Skill 合约与 Spec 机制的适配性。

- [x] SubTask 9.1: 审查 Skill 合约中是否包含 Spec 模式相关约束
- [x] SubTask 9.2: 审查 Skill 与交互式提问机制的适配性
- [x] SubTask 9.3: 审查 Skill 合约版本与 CHANGELOG 一致性
- [x] SubTask 9.4: 审查 Skill 合约中的文档引用是否有效

## Task 10: 创建 ADR-Spec-004

创建 ADR-Spec-004 持久化交互式提问机制核心决策。

- [x] SubTask 10.1: 整合 spec_design_questioning.md 核心决策
- [x] SubTask 10.2: 整合 conflict_detection_rules.md 核心规则
- [x] SubTask 10.3: 整合 questioning_checklist.md 核心检查项
- [x] SubTask 10.4: 创建 ADR-Spec-004 文档

## Task 11: 更新版本落后文档

更新 design_decision_rules.md 和 document_directory_mapping.md。

- [x] SubTask 11.1: 更新 design_decision_rules.md 版本到 v2.5.0
- [x] SubTask 11.2: 在 design_decision_rules.md 添加与 Spec 交互式提问相关的引用
- [x] SubTask 11.3: 更新 document_directory_mapping.md 版本到 v2.5.0
- [x] SubTask 11.4: 在 document_directory_mapping.md 添加与 Spec 交互式提问相关的引用

## Task 12: 生成审查报告

汇总审查结果，生成系统性审查报告。

- [x] SubTask 12.1: 汇总各文档审查结果
- [x] SubTask 12.2: 列出版本不一致问题及修复状态
- [x] SubTask 12.3: 列出已持久化约束清单
- [x] SubTask 12.4: 提出改进建议

# Task Dependencies

- Task 2 依赖 Task 1（需要先确认核心约束）
- Task 3 依赖 Task 1（需要先确认核心约束）
- Task 4 依赖 Task 1 和 Task 3（需要确认 ADR 关联）
- Task 5 依赖 Task 1（需要先确认核心约束）
- Task 6 依赖 Task 4（需要确认提问指南）
- Task 7 依赖 Task 2（需要确认设计规则）
- Task 8 可并行执行
- Task 9 可并行执行
- Task 10 依赖 Task 4、Task 5、Task 6（需要提取核心内容）
- Task 11 可并行执行
- Task 12 依赖 Task 1-11（需要汇总所有审查结果）
