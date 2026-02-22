---
version: v1.0.0
created: 2026-02-22
---

# ADR-Spec-001: Spec 产物生命周期管理

## 状态

- [x] 已接受
- [ ] 已废弃
- [ ] 已替代

## 0. 来源与依赖声明

| 类型 | 来源 | 说明 |
|------|------|------|
| 输入 | 用户需求 | 验证spec机制的正确性 |
| 依赖 | document_directory_mapping.md | 文档目录映射规范 |
| 依赖 | design_directory_strategy.md | 目录维度工作策略 |

## 背景 (Context)

### 问题描述

当前 `.trae/specs/` 目录下的 spec.md / tasks.md / checklist.md 文件在任务完成后仍然保留在原位置，存在以下问题：

1. **临时性与持久化混淆**：spec 产物本质上是任务执行期的临时规范，但长期保留导致与持久化设计文档边界不清
2. **目录膨胀**：随着任务增多，`.trae/specs/` 目录会不断膨胀
3. **设计先行原则违背**：持久化设计应放在 design 目录，临时产物应清理或归档

### 约束条件

- 必须保持设计先行原则
- 决策必须有据可查（ADR）
- 影响范围必须严格控制

### 影响范围

- `.trae/specs/` 目录
- `docs/04_context_reference/` 目录
- document_directory_mapping.md 文档

## 决策 (Decision)

### 选择的方案

**方案 A：引入 Spec 生命周期管理机制**

定义 spec 产物的三个生命周期阶段：
1. **执行期**：任务执行期间，spec 产物存在于 `.trae/specs/<change-id>/`
2. **归档期**：任务完成后，重要 spec 产物归档至 `docs/04_context_reference/archived_specs/`
3. **清理期**：简单任务完成后直接删除，复杂任务归档后删除原文件

### 决策理由

明确临时产物与持久化设计的边界，保持目录整洁，同时确保重要决策可追溯。

## 选项对比 (Options Considered)

| 选项 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| **方案A: 生命周期管理** (已选择) | 边界清晰、可追溯、目录整洁 | 需要额外归档步骤 | 正式项目 |
| 方案B: 永久保留 | 无需额外操作 | 目录膨胀、边界不清 | 不推荐 |
| 方案C: 完成即删除 | 目录最整洁 | 无法追溯历史决策 | 仅简单任务 |

## 影响 (Consequences)

### 正面影响

- 明确临时产物与持久化设计的边界
- 保持 `.trae/specs/` 目录整洁
- 重要决策可通过 ADR 追溯
- 支持设计先行原则

### 负面影响/风险

- 需要额外的归档操作 → 通过流程规范缓解
- 归档目录可能膨胀 → 通过定期清理缓解

### 技术债务

- 无

## 目录结构

```
项目根目录/
├── .trae/
│   └── specs/
│       └── <change-id>/          # 执行期：临时规范
│           ├── spec.md
│           ├── tasks.md
│           └── checklist.md
│
└── docs/
    └── 04_context_reference/
        ├── adr_*.md              # 持久化：架构决策记录
        ├── decisions/            # 持久化：决策记录
        │   └── YYYY-MM-DD_*.md
        └── archived_specs/       # 持久化：归档的 spec
            └── YYYY-MM-DD_<change-id>/
                ├── spec.md
                ├── tasks.md
                └── checklist.md
```

## 生命周期流程

```
任务开始
    │
    ▼
创建 spec 产物 ──► .trae/specs/<change-id>/
    │
    ▼
任务执行
    │
    ▼
任务完成 ──► checklist 全部通过
    │
    ├─── 简单任务 ──► 直接删除
    │
    └─── 复杂任务 ──► 归档至 docs/04_context_reference/archived_specs/
                      │
                      ▼
                  删除原文件
```

## 决策记录

| 日期 | 决策人 | 动作 | 说明 |
|------|--------|------|------|
| 2026-02-22 | sop-implementation-designer | 创建 | 定义 spec 生命周期管理机制 |

## 相关文档

- **文档目录映射**: [document_directory_mapping.md](04_reference/document_directory_mapping.md)
- **目录策略**: [design_directory_strategy.md](04_reference/design_directory_strategy.md)
- **ADR 模板**: [document_templates/adr.md](04_reference/document_templates/adr.md)
