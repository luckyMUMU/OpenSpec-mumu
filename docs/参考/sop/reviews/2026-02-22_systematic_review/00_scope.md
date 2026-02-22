# 审查范围

## 元信息

| 字段 | 值 |
|------|------|
| 审查日期 | 2026-02-22 |
| 审查者 | sop-architecture-reviewer |
| 审查依据 | sop_GUIDE.md v2.1.0 |
| 目标主/次版本 | v2.2.x（以 sop/CHANGELOG.md 为准） |

## 审查范围

### 核心文档

| 文件 | 路径 | 用途 |
|------|------|------|
| CHANGELOG.md | sop/CHANGELOG.md | 版本基线 |
| Skill矩阵 | sop/02_skill_matrix/index.md | Skill 清单 SSOT |
| 状态字典 | sop/05_constraints/state_dictionary.md | 状态标记 SSOT |
| 命令字典 | sop/05_constraints/command_dictionary.md | 命令 DSL SSOT |
| 约束矩阵 | sop/05_constraints/constraint_matrix.md | 禁止项 SSOT |
| 参考索引 | sop/04_reference/index.md | 模板/标准入口 |
| Prompt Pack 规范 | sop/04_reference/prompt_pack.standard.md | Prompt Pack 规则 |

### Skill 合约

共 17 个 Skill 合约文件：
- 编排类：sop-workflow-orchestrator, sop-code-explorer, sop-progress-supervisor
- 需求与设计类：sop-requirement-analyst, sop-architecture-design, sop-architecture-reviewer, sop-implementation-designer, sop-design-placement
- 实现与质量类：sop-code-implementation, sop-code-review, sop-document-sync, sop-capability-reuse
- 路径与测试类：sop-fast-path, sop-deep-path, sop-tdd-workflow, sop-test-design-csv, sop-test-implementation

## SSOT 清单

| SSOT 类型 | 文件路径 |
|-----------|----------|
| Skill 清单 | sop/02_skill_matrix/index.md |
| 状态定义 | sop/05_constraints/state_dictionary.md |
| 命令定义 | sop/05_constraints/command_dictionary.md |
| 禁止项定义 | sop/05_constraints/constraint_matrix.md |
| 模板入口 | sop/04_reference/index.md |
| Prompt Pack 规范 | sop/04_reference/prompt_pack.standard.md |
