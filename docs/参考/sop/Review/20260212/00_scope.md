---
version: v2.0.0
updated: 2026-02-12
artifact: SOP GUIDE Audit Scope
---

# 审查范围与方法（20260212）

## 审查对象

- 目录：`docs/参考/sop/**`
- 覆盖：全部文档、子目录及附件（含 `.md/.csv/.gitkeep` 等）

## 抽样比例

- 资产级：100%（扫描全量文件清单与元信息）
- 规则级：100%（版本/引用/链接/编码/模板关键章节按规则检查）

## 审查依据（SSOT）

- 指南：`docs/参考/sop_GUIDE.md`
- 状态字典：`docs/参考/sop/05_constraints/state_dictionary.md`
- 命令字典：`docs/参考/sop/05_constraints/command_dictionary.md`
- Skill 矩阵：`docs/参考/sop/02_skill_matrix/index.md`

## 证据产物

- `01_inventory.csv`：资产清单（含深度、编码、附件标记）
- `02_template_conformance.csv`：模板对照表（按文件类型）
- `03_reference_diff.csv`：引用/链接比对表
- `04_issues.md`：缺陷分级与整改动作（带索引号）
