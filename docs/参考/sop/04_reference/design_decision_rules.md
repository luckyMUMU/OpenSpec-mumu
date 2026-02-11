# design.md 创建判断规则

> **版本**: v1.5.0  
> **关联文档**: AGENT_SOP.md, design_directory_strategy.md, skills/sop-design-placement/SKILL.md  

本文档定义 Oracle 角色在创建 design.md 时的统一判断逻辑，整合目录层级和代码复杂度两个维度的判断标准。

---

## 1. 判断维度

design.md 的创建需要综合两个维度进行判断：

| 维度 | 判断依据 | 优先级 | 说明 |
|------|----------|--------|------|
| **目录层级** | 目录结构、子目录存在性 | 高 | 决定是否需要独立 design.md |
| **代码复杂度** | 行数、依赖数、功能数 | 低 | 决定 design.md 的详细程度 |

**核心原则**：目录层级优先，复杂度决定粒度。

---

## 2. 决策流程

```
开始
  ↓
【判断1】是否存在子目录？
  ├─ 是 → 为每个子目录递归执行本流程
  │       当前目录创建 design.md（汇总子目录接口）
  │
  └─ 否 → 【判断2】当前目录代码复杂度？
            ├─ 低（<100行）→ 创建极简 design.md 或合并到父目录
            ├─ 中（100-500行）→ 创建简要 design.md
            └─ 高（>500行）→ 创建完整 design.md
  ↓
结束
```

### 决策节点说明

| 节点 | 判断条件 | 输出 |
|------|----------|------|
| 判断1 | 目录下是否存在子目录 | 是否需要拆分设计 |
| 判断2 | 代码行数/功能复杂度 | design.md 详细程度 |

---

## 3. 统一判断标准

### 3.1 复杂度分级

| 复杂度 | 代码行数 | 功能特点 | 依赖关系 | design.md 要求 |
|--------|----------|----------|----------|----------------|
| **低** | <100行 | 单一功能，纯工具函数 | 无外部依赖 | 极简 design.md（仅接口契约）或合并到父目录 |
| **中** | 100-500行 | 多函数，有业务逻辑 | 有外部依赖 | 简要 design.md（接口契约 + 任务清单） |
| **高** | >500行 | 多模块交互，复杂逻辑 | 多模块依赖 | 完整 design.md（全部章节） |

### 3.2 复杂度评估指标

**必须评估**（至少满足一项即按该级别）：
- 代码行数：统计 `.js/.ts/.py` 等实现文件总行数
- 功能数量：对外暴露的函数/类/接口数量
- 依赖数量：import/require 的外部模块数量

**辅助评估**（参考指标）：
- 逻辑分支数：条件判断、循环复杂度
- 外部调用：API 调用、数据库操作、文件 IO

---

## 4. 目录层级策略

### 4.1 目录边界定义

```
项目根目录 (depth 0)
  └── src/ (depth 1)
        ├── utils/ (depth 2) ← design.md
        │     ├── string.ts
        │     └── date.ts
        ├── auth/ (depth 2) ← design.md
        │     ├── login/ (depth 3) ← design.md
        │     │     └── index.ts
        │     └── register/ (depth 3) ← design.md
        │           └── index.ts
        └── payment/ (depth 2) ← design.md
              └── processor.ts
```

### 4.2 目录与 design.md 的对应关系

| 场景 | 处理方式 | 示例 |
|------|----------|------|
| 叶子目录（无子目录） | 根据复杂度创建对应粒度 design.md | `src/utils/design.md` |
| 中间目录（有子目录） | 必须创建 design.md，汇总子目录接口 | `src/auth/design.md` |
| 单文件目录 | 按文件复杂度判断 | `src/payment/` |

### 4.3 Worker 工作范围

Worker 以 design.md 所在目录为工作边界：

```
WorkerScope(dir_with_design_md) = dir/** - {subdir/** | subdir contains design.md}
```

**说明**：
- Worker 负责当前目录下所有代码文件
- Worker 不跨越子目录的 design.md 边界
- 子目录由独立的 Worker 处理

---

## 5. 冲突处理规则

### 5.1 常见冲突场景

| 场景 | 冲突描述 | 处理规则 |
|------|----------|----------|
| **场景A** | 深度3子目录，代码<100行 | 创建极简 design.md，不合并到父目录（保持目录边界清晰） |
| **场景B** | 深度2目录，代码>500行但为单文件 | 创建完整 design.md，不拆分子目录 |
| **场景C** | 工具函数分散在多个文件，总计<100行 | 合并到一个 design.md，不拆分子目录 |
| **场景D** | 快速路径任务，代码<30行 | 可省略 design.md，直接编码 |

### 5.2 优先级规则

```
快速路径 > 目录层级 > 代码复杂度
```

**解释**：
1. **快速路径**：单文件+<30行+无逻辑变更 → 可省略 design.md
2. **目录层级**：存在子目录 → 必须创建 design.md
3. **代码复杂度**：无子目录时 → 按复杂度决定 design.md 粒度

---

## 6. 示例场景

### 场景1：深度为3的子目录，50行代码

```
src/auth/login/
  ├── index.ts (30行)
  └── utils.ts (20行)
```

**判断**：
- 无子目录 → 进入复杂度判断
- 总行数 50 < 100 → 低复杂度

**处理**：
- 创建 `src/auth/login/design.md`（极简版）
- 包含：接口契约、简要说明
- 不合并到父目录（保持 Worker 边界清晰）

### 场景2：深度为2的模块，300行代码

```
src/payment/
  ├── processor.ts (150行)
  ├── validator.ts (100行)
  └── types.ts (50行)
```

**判断**：
- 无子目录 → 进入复杂度判断
- 总行数 300，在 100-500 之间 → 中复杂度

**处理**：
- 创建 `src/payment/design.md`（简要版）
- 包含：技术选型、接口契约、任务清单

### 场景3：深度为2的模块，800行代码

```
src/order/
  ├── service.ts (300行)
  ├── repository.ts (250行)
  ├── controller.ts (200行)
  └── types.ts (50行)
```

**判断**：
- 无子目录 → 进入复杂度判断
- 总行数 800 > 500 → 高复杂度

**处理**：
- 创建 `src/order/design.md`（完整版）
- 包含：全部章节（技术选型、L2→L3映射、领域模型、接口契约、数据模型、任务清单、测试策略）
- 考虑是否拆分为子目录（如业务继续增长）

### 场景4：有子目录的中间节点

```
src/auth/
  ├── design.md ← 必须创建
  ├── login/
  │     ├── design.md
  │     └── index.ts
  └── register/
        ├── design.md
        └── index.ts
```

**判断**：
- 存在子目录 → 必须创建 design.md
- 当前目录可能有少量代码（如公共类型定义）

**处理**：
- 创建 `src/auth/design.md`
- 内容重点：子目录接口汇总、跨子目录依赖声明
- 子目录的 design.md 按各自复杂度判断

---

## 7. 与现有文档的引用关系

### 7.1 文档依赖图

```
design_decision_rules.md (本文档)
  ├── AGENT_SOP.md (design.md规则章节)
  ├── design_directory_strategy.md (目录维度工作策略)
  ├── skills/sop-design-placement/SKILL.md (设计文档放置指南)
  └── skills/sop-implementation-designer/SKILL.md (实现设计者)
```

### 7.2 关键引用

| 本文档章节 | 引用文档 | 引用内容 |
|------------|----------|----------|
| 3.1 复杂度分级 | AGENT_SOP.md | design.md规则表格 |
| 4.3 Worker 工作范围 | design_directory_strategy.md | WorkerScope 定义 |
| 5.2 优先级规则 | AGENT_SOP.md | 快速路径条件 |
| 设计模板 | implementation_design.md | L3实现设计模板 |

### 7.3 更新同步

当以下文档更新时，需同步检查本文档：
- AGENT_SOP.md 的 design.md 规则章节
- design_directory_strategy.md 的 Worker 范围定义
- sop-design-placement/SKILL.md 的复杂度判断标准

---

## 8. 快速参考

### 8.1 决策检查清单

Oracle 在创建 design.md 前，按以下顺序检查：

- [ ] **步骤1**：确认当前目录是否为快速路径（单文件+<30行）
  - 是 → 可省略 design.md
  - 否 → 继续

- [ ] **步骤2**：确认当前目录是否存在子目录
  - 是 → 必须创建 design.md（汇总子目录接口）
  - 否 → 继续

- [ ] **步骤3**：评估代码复杂度
  - 统计代码行数
  - 统计功能/接口数量
  - 统计依赖数量

- [ ] **步骤4**：根据复杂度确定 design.md 粒度
  - 低（<100行）→ 极简版
  - 中（100-500行）→ 简要版
  - 高（>500行）→ 完整版

- [ ] **步骤5**：创建 design.md 并声明目录依赖

### 8.2 CMD 命令映射

| 操作 | CMD 命令 |
|------|----------|
| 列出所有 design.md | `LIST_DESIGN_MD(root) -> design_list` |
| 调度目录执行 | `SCHEDULE_DIRS(design_list) -> dir_map` |
| 创建实现设计 | `IMPL_DESIGN(l2, dir) -> design.md` |
| 运行目录批次 | `RUN_DIR_BATCH(depth_desc)` |

---

## 9. 约束

1. **目录边界**：Worker 不跨越 design.md 边界修改代码
2. **层级优先**：目录层级判断优先于复杂度判断
3. **快速路径例外**：快速路径可跳过 design.md 创建
4. **依赖声明**：所有 design.md 必须声明目录依赖
5. **渐进式披露**：复杂度越高，设计文档越详细
