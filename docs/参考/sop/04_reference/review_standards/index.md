---
version: v1.5.0
updated: 2026-02-11
---

# 审查规范（Review Standards）

## 定位

- 本目录定义 **审查标准**：审查什么、通过门槛、证据要求、严重等级与闭环规则
- 本目录不定义流程与状态，流程/状态/命令必须引用 SSOT（见下）

## SSOT（单一真源）

- 角色与权限：`sop/02_role_matrix/index.md`
- 工作流：`sop/03_workflow/index.md`
- 状态：`sop/05_constraints/state_dictionary.md`
- 命令：`sop/05_constraints/command_dictionary.md`
- 安全与供应链红线：`sop/05_constraints/security_supply_chain.md`

## 使用方式

- 审查角色（如 Skeptic / CodeReviewer / Oracle / Tester）必须在审查报告中声明：
  - 本次审查适用的标准文件（standard）
  - 是否启用项目 Profile（可选）
  - 任何豁免必须记录为显式条目，并给出风险与回滚策略

## 标准清单

- L2 架构审查标准：`architecture_design.standard.md`
- L3 实现设计审查标准：`implementation_design.standard.md`
- ADR 审查标准：`adr.standard.md`
- 来源与依赖合规标准：`source_dependency.standard.md`
- 代码 Diff 审查标准：`code_diff.standard.md`
- 测试设计审查标准：`test_design.standard.md`
- 测试代码审查标准：`test_code.standard.md`
- 审查报告质量标准：`review_report.standard.md`

## 项目可配置（Profile）

- 模板：`_project_profile.md`
- 建议位置：`profiles/<project>.md`
- 规则：Profile 只能覆写标准文件中声明的“项目可配置项（Project knobs）”；禁止在 Profile 内重写标准全文。
