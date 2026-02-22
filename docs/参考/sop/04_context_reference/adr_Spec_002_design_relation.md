---
version: v1.0.0
created: 2026-02-22
---

# ADR-Spec-002: Spec 与 Design.md 关系定义

## 状态

- [x] 已接受
- [ ] 已废弃
- [ ] 已替代

## 0. 来源与依赖声明

| 类型 | 来源 | 说明 |
|------|------|------|
| 输入 | 用户需求 | spec和任务应当按design.md进行划分 |
| 依赖 | document_directory_mapping.md | 文档目录映射规范 |
| 依赖 | design_directory_strategy.md | 目录维度工作策略 |
| 依赖 | design_decision_rules.md | design.md 创建判断规则 |
| 关联 | adr_Spec_001_lifecycle.md | Spec 生命周期管理 |

## 背景 (Context)

### 问题描述

当前 spec 机制与 design.md 的关系不够明确，存在以下问题：

1. **任务划分不明确**：spec 任务未按照 design.md 目录边界进行划分，导致任务粒度不一致
2. **执行顺序混乱**：缺乏自底向上的执行顺序，可能导致依赖问题
3. **动态创建缺失**：未能在必要时创建新的深度更高的 design.md

### 约束条件

- 必须保持设计先行原则
- 必须支持跨目录任务的依赖管理
- 必须与现有 design.md 机制兼容

### 影响范围

- design_directory_strategy.md
- design_decision_rules.md
- document_directory_mapping.md

## 决策 (Decision)

### 选择的方案

**方案 A：定义 Spec 与 Design.md 的明确关系**

1. **任务划分原则**：
   - 每个 spec 任务对应一个 design.md 目录
   - 任务粒度 = DIR_SCOPE(dir_with_design_md)

2. **执行顺序规则**：
   - 自底向上：按 design.md 深度从深到浅
   - 同深度并行：无依赖关系的任务可并行
   - 父目录等待：父目录任务等待子目录任务完成

3. **动态创建机制**：
   - 跨目录变更时自动创建目标 design.md
   - 复杂度增加时考虑创建更深层次 design.md

### 决策理由

明确 spec 与 design.md 的关系，确保任务划分有据可依，执行顺序有章可循，同时支持动态扩展设计深度。

## 选项对比 (Options Considered)

| 选项 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| **方案A: 明确关系定义** (已选择) | 边界清晰、执行有序、可扩展 | 需要更新多个文档 | 正式项目 |
| 方案B: 保持现状 | 无需变更 | 任务混乱、依赖问题 | 不推荐 |
| 方案C: 完全独立 | spec 与 design.md 无关 | 灵活 | 小型项目 |

## 影响 (Consequences)

### 正面影响

- 任务划分有明确边界
- 执行顺序有明确规则
- 支持动态扩展设计深度
- 保持设计先行原则

### 负面影响/风险

- 需要更新多个文档 → 通过任务分解缓解
- 增加任务创建复杂度 → 通过模板和规则简化

### 技术债务

- 无

## 关系定义

### 任务划分原则

```
spec 任务边界 = design.md 目录边界
任务粒度 = DIR_SCOPE(dir_with_design_md)
```

### 执行顺序规则

```
执行顺序 = depth_desc (从深到浅)
并行条件 = same_depth AND no_dependency
等待条件 = parent_dir OR has_dependency
```

### 动态创建条件

```
创建 design.md 条件:
1. 跨目录变更 AND 目标目录无 design.md
2. 任务复杂度 > 当前 design.md 粒度
```

## 任务声明格式

每个 spec 任务应声明：

| 字段 | 类型 | 说明 |
|------|------|------|
| design_path | string | 对应的 design.md 路径 |
| depth | int | design.md 的深度 |
| dependencies | string[] | 依赖的其他 design.md 路径 |
| scope | string | 任务范围 (DIR_SCOPE) |

## 示例

### 示例 1：单目录任务

```
任务: 实现用户登录功能
design_path: src/auth/login/design.md
depth: 3
dependencies: []
scope: src/auth/login/** (不含子目录)
```

### 示例 2：跨目录任务

```
任务: 实现订单支付功能
design_path: src/order/design.md
depth: 2
dependencies: [src/payment/design.md]
scope: src/order/** (不含子目录)
```

### 示例 3：动态创建

```
任务: 添加新的支付网关
design_path: src/payment/gateway/design.md (新建)
depth: 3
dependencies: [src/payment/design.md]
scope: src/payment/gateway/**
```

## 决策记录

| 日期 | 决策人 | 动作 | 说明 |
|------|--------|------|------|
| 2026-02-22 | sop-implementation-designer | 创建 | 定义 spec 与 design.md 的关系 |

## 相关文档

- **文档目录映射**: [document_directory_mapping.md](../document_directory_mapping.md)
- **目录策略**: [design_directory_strategy.md](../design_directory_strategy.md)
- **设计规则**: [design_decision_rules.md](../design_decision_rules.md)
- **Spec 生命周期**: [adr_Spec_001_lifecycle.md](adr_Spec_001_lifecycle.md)
