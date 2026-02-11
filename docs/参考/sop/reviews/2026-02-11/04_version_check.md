---
date: 2026-02-11
baseline: v1.5.x
---

# 04 版本一致性核对

## 目标

- 核对 `sop/` 主/次版本一致
- 核对 `CHANGELOG.md` 当前版本与核心文档一致
- 核对 skills 主/次版本与 SOP 一致

## 核对结论

- 主版本：一致（v1）
- 次版本：一致（.5）

## 抽样核对（代表性文件）

| 文件 | 声明版本 | 是否符合 v1.5.x | 备注 |
|------|----------|------------------|------|
| `sop/CHANGELOG.md` | v1.5.0 | ✅ | 当前版本基线 |
| `sop/AGENT_SOP.md` | v1.5.0 | ✅ | 核心 SSOT 之一 |
| `sop/03_workflow/index.md` | v1.5.0 | ✅ | 工作流索引 |
| `sop/05_constraints/state_dictionary.md` | v1.5.0 | ✅ | 状态 SSOT |
| `sop/05_constraints/command_dictionary.md` | v1.5.0 | ✅ | 命令 SSOT |
| `sop/skills/*/SKILL.md` | v1.5.0 | ✅ | skills 主/次版本一致 |

## 处理规则

- 若发现某文件主/次版本不一致：必须按 `sop/sop_GUIDE.md` 的版本管理规则进行批量修复，并补齐 `CHANGELOG.md`。
