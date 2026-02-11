---
date: 2026-02-11
baseline: v1.5.0
scope: docs/参考/sop
topic: sop_vs_common_processes_sources_dependencies
---

# 10 SOP 流程对比与优化报告（来源与依赖）

## 1. 对比对象与边界

- 对比对象：`docs/参考/sop` 的 AI 编码流程 vs 常见软件开发流程（只对齐“需求/设计/实现/测试/审查”的通用部分）
- 明确不包含：发布/运维/上线治理（本 SOP 不负责）

## 2. 常见流程的共性（抽象层）

不同方法论名称各异（SDLC/敏捷/看板/TDD），但在“编码前后”通常有稳定共性：

- 需求与目标必须可追溯（来自用户/业务方/既有系统约束）
- 设计与实现必须依赖明确输入（前置产物、约束、验收标准）
- 当输入缺失或冲突无法消解时，必须显式中断并形成可追溯决策

## 3. 当前 SOP 的优势

- Gate 完整：需求/架构/设计确认 + 代码审查 + 分层验收审查点，能有效抑制 AI 漂移
- SSOT 完整：状态字典 + 命令字典，便于自动化检查与一致性回归
- 角色隔离明确：Tester/CodeReviewer/TestWorker 的权限边界可控
- 目录并行模型适配 AI：以 design.md 为边界并行，减少冲突与无序写入

## 4. 发现的问题（与常见流程相比的缺口）

### 4.1 来源与依赖未被强制结构化

- 表象：流程“隐含”后续依赖前置产出，但缺少统一字段/模板/审查门槛
- 结果：当 AI 找不到来源或依赖时，容易用“合理推断”补洞并继续推进，导致返工

### 4.2 决策记录缺少统一落盘规则

- 表象：有 `[USER_DECISION]`，但缺少“必须落盘到哪、如何在后续引用”的强约束

## 5. 优化目标（新增准则）

- 分析、设计必须明确来源与依赖
  - 除需求来源以用户为主外，后续流程必须依赖前置产出
- 找不到来源或依赖时必须中断询问用户，并记录决策
  - 进入 `[USER_DECISION]`
  - 落盘 decision record
  - 后续产物引用决策记录路径

## 6. 已落地的 SOP 变更（本次改动）

### 6.1 新增模板与审查标准

- 交互模板：`04_reference/interaction_formats/source_dependency.md`
  - 固化 Inputs / Dependencies / Gaps / User Decision
- 审查标准：`04_reference/review_standards/source_dependency.standard.md`
  - 缺少声明或缺口未决策视为 🔴

### 6.2 SSOT 增强

- 命令字典新增：`TRACE_SOURCES(inputs)`、`RECORD_DECISION(topic, decision)`
  - 用于固化来源依赖与决策记录
- 状态字典增强：明确“来源/依赖缺口必须决策并落盘记录”

### 6.3 流程/角色对齐

- 在 deep_path 与 workflow index 中补充“来源与依赖准则”
- 在 Analyst/Prometheus/Oracle/Worker Prompts 中补充相同规则
- 在 Skeptic/CodeReviewer/Tester/TestWorker 的审查标准引用中纳入 `source_dependency.standard.md`
- 在禁止项矩阵中新增“来源与依赖”强约束

## 7. 建议的后续增强（可选）

- 为 `RECORD_DECISION` 约定一个项目级目录（例如 `docs/04_context_reference/decisions/`）并在目录映射表中显式声明
- 为“来源/依赖声明”增加最小字段校验（例如：必须至少 1 个前置产物路径 + 摘要）

## 8. 回归检查项

- SOP 内不存在 `.temp/` 临时目录引用，临时产物统一用 `temp/`
- SOP 内设计/审查相关角色与技能均引用 `source_dependency.standard.md`
- 新增命令与状态引用无冲突，且仅使用 SSOT 术语
