# 计划：重新生成 sop_for_human.md（完整版）

## 目标

重新生成 `d:\code\AI\openspec-mumu\docs\参考\sop_for_human.md`，作为便于人类阅读的完整版本，将 SOP 的所有核心内容整合到单一文件中，不简化任何技术细节。

## 当前状态

- 目标文件 `sop_for_human.md` 当前为空（0行）
- SOP 目录结构已完整，版本 v2.9.0
- 以 Skill 为核心的架构已确立

## 需求分析

### 关键要求

1. **不简化细节**：保留所有技术细节、约束、流程
2. **不是使用指南**：而是完整的技术规范文档
3. **单一文件**：将分散在多个文件中的内容整合
4. **便于人类阅读**：以人类友好的方式组织和呈现

### 内容来源

需要整合以下文件的内容：

| 文件 | 内容 |
|------|------|
| `AGENT_SOP.md` | 入口文档、核心约束、工作流、导航 |
| `01_concept_overview.md` | 核心概念、渐进披露、Skill 概览 |
| `02_skill_matrix/index.md` | Skill 矩阵（SSOT）、工作范围规则 |
| `03_workflow/index.md` | 工作流规范、路径选择、目录维度执行 |
| `03_workflow/fast_path.md` | 快速路径详情 |
| `03_workflow/deep_path.md` | 深度路径详情 |
| `03_workflow/three_strike_rule.md` | 三错即停规则 |
| `04_reference/index.md` | 参考文档、模板、交互格式、审查标准 |
| `05_constraints/index.md` | 约束规范、禁止项矩阵 |
| `skills/index.md` | Skills 索引 |
| `skills/*/SKILL.md` | 18个 Skill 的详细合约 |

## 执行计划

### 步骤 1：确定文档结构

创建以下章节结构：

1. **文档头部**
   - 版本信息（v2.9.0）
   - 更新日期
   - 文档说明

2. **SOP 概述**
   - 定义与核心原则
   - 渐进披露（L1-L4）
   - Skill 概览（SSOT）

3. **Skill 矩阵（完整版）**
   - Skill 总览表格
   - 工作范围规则
   - 目录边界定义

4. **核心约束**
   - 五大核心约束
   - 关键禁止项
   - 违反后果等级
   - 禁止项矩阵摘要

5. **质量门控机制**
   - 各阶段门控检查项
   - 通过条件
   - 失败处理

6. **路径选择**
   - 路径选择条件
   - 三种路径对比

7. **工作流规范**
   - 编排入口
   - 能力选择协议
   - 目录维度执行
   - 并行执行规则

8. **快速路径（完整）**
   - 调用链
   - 各阶段输入输出
   - 来源与依赖准则

9. **深度路径（完整）**
   - 新项目/大重构流程
   - 功能迭代流程
   - 架构影响评估检查点
   - 目录并行执行流程

10. **TDD 深度路径（完整）**
    - 启用条件
    - 测试用例来源
    - 验收流程

11. **三错即停**
    - 规则说明
    - 熔断机制

12. **目录调度状态机**
    - 状态流转图
    - 状态转移规则
    - 调度状态保存格式

13. **中断与再执行**
    - 中断点
    - 重建
    - 再执行
    - 可恢复检查点

14. **Spec 模式交互式提问**
    - 提问触发时机
    - 冲突优先级处理
    - ADR 确认更新机制
    - 决策分级记录

15. **文档位置**
    - 需求文档
    - 设计文档
    - 测试文档
    - 文档放置规则

16. **需求分层**
    - L1-L3 需求层级
    - 需求文档结构
    - 原型文件格式

17. **design.md 规则**
    - 复杂度与行数要求
    - 任务管理
    - 任务状态

18. **TDD 规则**
    - 启用条件
    - 测试用例来源
    - 测试代码来源

19. **Skills 详细合约**
    - 编排类 Skills（3个）
    - 需求与设计类 Skills（5个）
    - 实现与质量类 Skills（4个）
    - 路径与测试类 Skills（5个）

20. **参考文档索引**
    - 模板
    - 交互格式
    - 审查标准
    - 规范与策略

21. **约束规范索引**
    - 编码原则
    - 命令字典
    - 状态字典
    - 安全与供应链红线
    - 版本同步检查清单

22. **导航**
    - 完整文档链接

### 步骤 2：内容整合

从各源文件提取内容，保持完整性：

- **概念层**：从 `01_concept_overview.md` 提取
- **Skill 矩阵**：从 `02_skill_matrix/index.md` 提取完整表格
- **工作流**：从 `03_workflow/index.md` + `fast_path.md` + `deep_path.md` + `three_strike_rule.md` 提取
- **参考文档**：从 `04_reference/index.md` 提取索引
- **约束规范**：从 `05_constraints/index.md` 提取
- **Skills**：从 `skills/index.md` + 各 `SKILL.md` 提取关键信息

### 步骤 3：格式优化

- 使用清晰的 Markdown 格式
- 保持表格完整
- 保留所有技术细节
- 添加适当的分隔和层级

### 步骤 4：验证

- 确保版本信息正确（v2.9.0）
- 确保所有 18 个 Skill 都被覆盖
- 确保所有核心约束都包含
- 确保所有路径都详细说明
- 确保链接正确

## 预期输出

一个完整的 `sop_for_human.md` 文件，包含：
- 完整的 SOP 技术规范
- 所有 18 个 Skill 的详细合约
- 完整的工作流定义
- 完整的约束规范
- 完整的参考文档索引
- 便于人类阅读的组织结构

## 文件路径

- 目标文件：`d:\code\AI\openspec-mumu\docs\参考\sop_for_human.md`

## 已读取的源文件

已完整读取以下源文件，准备整合：

1. `AGENT_SOP.md` - 入口文档
2. `01_concept_overview.md` - 核心概念
3. `02_skill_matrix/index.md` - Skill 矩阵
4. `03_workflow/index.md` - 工作流规范
5. `03_workflow/fast_path.md` - 快速路径
6. `03_workflow/deep_path.md` - 深度路径
7. `03_workflow/three_strike_rule.md` - 三错即停
8. `04_reference/index.md` - 参考文档
9. `05_constraints/index.md` - 约束规范
10. `05_constraints/constraint_matrix.md` - 禁止项矩阵
11. `05_constraints/command_dictionary.md` - 命令字典
12. `05_constraints/state_dictionary.md` - 状态字典
13. `05_constraints/acceptance_criteria.md` - 验收标准
14. `05_constraints/coding_principles.md` - 编码原则
15. `skills/index.md` - Skills 索引
16. `skills/sop-workflow-orchestrator/SKILL.md`
17. `skills/sop-code-implementation/SKILL.md`
18. `skills/sop-deep-path/SKILL.md`
19. `skills/sop-fast-path/SKILL.md`
20. `skills/sop-requirement-analyst/SKILL.md`
21. `skills/sop-architecture-design/SKILL.md`
22. `skills/sop-implementation-designer/SKILL.md`
23. `skills/sop-code-review/SKILL.md`
