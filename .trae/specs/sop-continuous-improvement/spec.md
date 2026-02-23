# SOP 持续改进计划 Spec

## Why

根据 2026-02-23 全面审查结果，SOP 体系已通过审查，但存在以下改进机会：
1. 缺乏自动化检查机制，依赖人工审查
2. 版本同步流程未固化，易遗漏
3. SSOT 漂移监控缺乏系统性方法

## What Changes

### 短期改进（v2.8.x）

- 新增版本更新检查清单到 `05_constraints/` 目录
- 在 CHANGELOG.md 中增加版本同步检查模板引用
- 更新 sop_GUIDE.md 增加审查触发条件

### 长期改进（v2.9.0+）

- **BREAKING**: 新增自动化检查脚本（如项目有技术条件）
- 建立 SSOT 漂移监控机制
- 建立定期审查日历

## Impact

- Affected specs: `docs/参考/sop/**`
- Affected code: 无代码变更，仅文档变更

## ADDED Requirements

### Requirement: 版本更新检查清单

系统必须提供版本更新检查清单，确保所有文件同步更新。

#### Scenario: 版本更新前检查
- **WHEN** 准备发布新版本
- **THEN** 必须按检查清单核对所有文件版本号
- **AND** 确认主/次版本一致性

### Requirement: SSOT 漂移监控

系统必须提供 SSOT 漂移检测方法。

#### Scenario: 状态引用检查
- **WHEN** 文档引用状态标记
- **THEN** 必须在 `state_dictionary.md` 中存在定义
- **AND** 否则记录为漂移问题

#### Scenario: 命令引用检查
- **WHEN** 文档引用命令
- **THEN** 必须在 `command_dictionary.md` 中存在定义
- **AND** 否则记录为漂移问题

### Requirement: 审查触发条件

系统必须明确定义审查触发条件。

#### Scenario: 强制审查触发
- **WHEN** 主版本或次版本更新
- **THEN** 必须执行全面审查

#### Scenario: 可选审查触发
- **WHEN** 仅修订版本更新
- **THEN** 建议执行链接检查

## MODIFIED Requirements

### Requirement: sop_GUIDE.md 审查流程

在原有审查流程基础上，增加：
- 审查触发条件定义
- 版本同步检查清单引用
- SSOT 漂移监控方法

## REMOVED Requirements

无删除项。

---

## 改进优先级

| 优先级 | 改进项 | 目标版本 | 预期收益 |
|--------|--------|----------|----------|
| P0 | 版本更新检查清单 | v2.8.1 | 防止版本不一致 |
| P1 | 审查触发条件定义 | v2.8.1 | 规范审查流程 |
| P2 | SSOT 漂移监控方法 | v2.8.2 | 早期发现漂移 |
| P3 | 自动化检查脚本 | v2.9.0 | 减少人工审查成本 |
