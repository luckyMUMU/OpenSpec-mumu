# SOP 目录全面审查与优化规范

## Why

根据 `docs/参考/sop_GUIDE.md` 的要求，对 `docs/参考/sop` 目录进行全面系统性审查，确保 SOP 体系符合 SSOT 原则、版本一致性、流程闭环、表达可执行等核心标准。

**核心决策**：完全去除 `prompts` 目录，消除内容重复，符合 SSOT 原则。

## What Changes

### 🔴 BREAKING：删除 prompts 目录

- 删除 `docs/参考/sop/prompts/` 整个目录
- 将全局不变量合并到 `05_constraints/constraint_matrix.md`
- 将编排规则合并到 `03_workflow/index.md`
- 将侧重点合并到各 `skills/*/SKILL.md`

### 其他审查与修复

- 验证版本一致性（主/次版本必须统一）
- 检查 SSOT 引用的正确性
- 检查链接可达性
- 识别并记录问题，按严重程度分级
- 更新版本号到 v2.8.0

## Impact

- Affected specs: `docs/参考/sop/**` 全部文件
- Affected code: 无代码变更，仅文档变更
- **删除文件**：`prompts/` 目录下所有文件（20个文件）

## ADDED Requirements

### Requirement: 删除 prompts 目录

系统必须删除 prompts 目录并将其内容合并到 SSOT 位置。

#### Scenario: prompts 目录删除
- **WHEN** 执行删除操作
- **THEN** 删除 `prompts/` 整个目录
- **AND** 全局不变量已合并到 `05_constraints/constraint_matrix.md`
- **AND** 编排规则已合并到 `03_workflow/index.md`
- **AND** 侧重点已合并到各 `skills/*/SKILL.md`

### Requirement: 版本一致性审查

系统必须验证所有 SOP 核心文档的主/次版本与 CHANGELOG.md 一致。

#### Scenario: 版本一致性检查
- **WHEN** 执行版本核对
- **THEN** 所有核心文档主/次版本必须与 CHANGELOG.md 声明的版本一致
- **AND** Skill 合约版本必须与 SOP 主/次版本一致

### Requirement: SSOT 一致性审查

系统必须验证所有状态/命令/约束引用来自 SSOT 定义文件。

#### Scenario: SSOT 引用检查
- **WHEN** 文档引用状态/命令/约束
- **THEN** 必须可追溯到 `05_constraints/*_dictionary.md` 或 `constraint_matrix.md`
- **AND** 禁止使用未在字典中定义的状态/命令

### Requirement: 链接可达性审查

系统必须验证所有文档内链接指向有效目标。

#### Scenario: 链接检查
- **WHEN** 文档包含链接
- **THEN** 链接目标必须存在
- **AND** 新增模板必须在 `04_reference/index.md` 中可达

### Requirement: 表达规范审查

系统必须验证文档表达符合命令式规范。

#### Scenario: 表达检查
- **WHEN** 审查文档内容
- **THEN** 禁止使用含混词（建议/尽量/可能/一般/视情况/差不多）
- **AND** 每条规则必须包含触发条件、动作、输出

## 内容合并计划

### 1. 00_system.md → constraint_matrix.md

从 `00_system.md` 提取并合并：
- 全局不变量（表达规范、SSOT 引用、来源与依赖、停止点、落盘要求）
- 禁止项（旧术语禁止、重复禁止）

### 2. 01_operator.md → 03_workflow/index.md

从 `01_operator.md` 提取并合并：
- 启用条件（ultrawork 标记说明）
- 能力选择协议（选择清单、排除清单）
- 停止点与升级规则

**注意**：路径选择和调用链已在 `03_workflow/index.md` 中定义，无需重复合并。

### 3. skills/*.md → skills/*/SKILL.md

从各 `prompts/packs/default/skills/*.md` 提取并合并：
- 侧重点描述
- 输出要求补充

## 审查交付物

审查结果必须落盘到 `docs/参考/sop/reviews/2026-02-23_comprehensive/` 目录：

| 文件 | 内容 |
|------|------|
| `00_scope.md` | 审查范围 + 版本基线 + SSOT 清单 |
| `01_ssot_check.md` | SSOT 核对结果 |
| `02_issue_list.md` | 问题分级（🔴🟠🟡🟢）+ 修复动作 |
| `03_link_check.md` | 链接/引用检查清单 |
| `04_version_check.md` | 版本核对结果 |
| `05_prompts_deletion.md` | prompts 目录删除与合并记录 |
| `06_review_report.md` | 结论 + 风险 + 建议 |
