---
version: v2.4.0
updated: 2026-02-22
---

# ADR-Spec-003: 版本同步机制

## 状态

已接受 (2026-02-22)

## 背景

在系统性审查中发现 SOP 体系存在严重的版本不一致问题：
- CHANGELOG 基准版本为 v2.2.0
- 22+ 个文件版本落后（v2.1.0 或 v2.0.0）
- 1 个文件版本超前（document_directory_mapping.md v2.4.0）

这种不一致导致版本追溯困难，影响发布基线确认。

## 决策

### 决策1: 批量版本同步

将所有落后文件版本更新到与 CHANGELOG 一致：
- Skill 合约：16 个文件从 v2.1.0 更新到 v2.4.0
- 核心文档：6 个文件从 v2.1.0 更新到 v2.4.0
- 参考文档：多个文件从 v2.0.0 更新到 v2.4.0

### 决策2: 版本超前处理

对于 document_directory_mapping.md v2.4.0：
- 审查确认其变更内容为预期变更（Spec 生命周期、Spec 与 design.md 映射关系）
- 决定更新 CHANGELOG 到 v2.4.0，而非回退文件版本

### 决策3: 建立版本同步机制

在 sop_GUIDE.md 中增加：
- 版本同步流程（3.5 节）
- 版本超前处理规范（3.6 节）

## 理由

1. **一致性优先**：所有 SOP 文件应与 CHANGELOG 版本保持一致，便于追溯和管理
2. **变更价值**：document_directory_mapping.md 的变更内容具有重要价值，值得次版本号更新
3. **流程固化**：建立版本同步机制可防止未来再次出现版本不一致问题

## 影响

- 所有 SOP 文件版本统一为 v2.4.0
- CHANGELOG 新增 v2.4.0 版本记录
- sop_GUIDE.md 增加版本同步流程

## 相关文档

- [CHANGELOG.md](CHANGELOG.md)
- [sop_GUIDE.md](sop_GUIDE.md)
- [document_directory_mapping.md](04_reference/document_directory_mapping.md)
