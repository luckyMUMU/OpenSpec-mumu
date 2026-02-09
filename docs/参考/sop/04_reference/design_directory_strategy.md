# 目录维度工作策略

> **版本**: v1.4.0

本文档定义 Worker 如何以 `design.md` 所在目录为维度进行工作，实现自底向上、依赖驱动的并行执行。

---

## 核心概念

### 1. 工作范围定义

Worker 的工作范围以 `design.md` 文件所在的目录为边界：

```
Worker 工作范围 = design.md 所在目录及其子目录（不含嵌套 design.md 的子目录）
```

**示例目录结构**：
```
src/
├── module_a/
│   ├── design.md          # Worker A 负责
│   ├── src/
│   └── utils/
├── module_b/
│   ├── design.md          # Worker B 负责
│   ├── src/
│   └── helpers/
└── shared/
    └── design.md          # Worker C 负责
```

### 2. 目录层级

**层级计算规则**：
- 以项目根目录为基准（深度 0）
- 每深入一级，深度 +1
- `design.md` 的深度 = 其所在目录的深度

**示例**：
```
深度 0: ./
深度 1: src/
深度 2: src/module_a/          ← design.md 深度 = 2
深度 3: src/module_a/src/
深度 2: src/module_b/          ← design.md 深度 = 2
深度 1: docs/
深度 2: docs/module_c/         ← design.md 深度 = 2
```

---

## 执行策略

### 1. 自底向上处理顺序

```
1. 扫描所有 design.md 文件，记录其路径和深度
2. 按深度降序排序（深度大的优先）
3. 同深度的目录可以并行处理
4. 父目录等待所有子目录的 design.md 完成后才能开始
```

**处理顺序示例**：
```
深度 3: src/core/utils/design.md      → 第一批并行
深度 3: src/core/helpers/design.md    → 第一批并行
深度 2: src/core/design.md            → 第二批（等待第一批）
深度 2: src/api/design.md             → 第二批并行
深度 1: src/design.md                 → 第三批（等待第二批）
```

### 2. 并行执行规则

**可以并行**：
- 同深度且无依赖关系的目录
- 不同子树的目录

**必须串行**：
- 有依赖关系的目录
- 父子目录关系

**依赖检测**：
```
依赖类型：
1. 显式依赖：design.md 中声明的依赖接口
2. 隐式依赖：代码中的 import/require
3. 父子依赖：目录层级关系
```

### 3. 跨模块改动处理

**原则**：只修改 design，不直接修改实现

**处理流程**：
```
Worker A 发现需要修改 Module B
    ↓
仅修改 Module B 的 design.md（添加变更标记）
    ↓
创建或通知负责 Module B 的 Worker B
    ↓
Worker A 等待 Worker B 完成
    ↓
Worker B 完成后，Worker A 继续
```

**变更标记格式**：
```markdown
## 待处理变更
- **来源**: [Worker A]
- **类型**: [接口变更/依赖变更/...]
- **描述**: [变更内容]
- **状态**: [WAITING_FOR_WORKER]
```

---

## Worker 职责调整

### Worker

**工作范围**：
- 负责单个 `design.md` 所在目录
- 实现该目录下的所有代码变更
- 运行该目录下的验收测试

**依赖处理**：
- 发现需要其他目录变更时，仅修改其 design.md
- 通知 Supervisor 创建或唤醒对应 Worker
- 等待依赖完成后继续

**状态标记**：
```markdown
- `[DIR_WORKING]` - 正在处理当前目录
- `[DIR_WAITING_DEP]` - 等待依赖目录完成
- `[DIR_COMPLETED]` - 当前目录完成
```

### Oracle

**工作范围**：
- 基于目录层级创建实现设计
- 识别目录间的依赖关系
- 定义目录内的接口契约

**依赖声明**：
```markdown
## 目录依赖
| 依赖目录 | 依赖类型 | 说明 |
|----------|----------|------|
| src/core/ | 接口依赖 | 使用 core 的公共接口 |
| src/utils/ | 工具依赖 | 使用工具函数 |
```

### Explorer

**工作范围**：
- 分析目录结构
- 识别目录间的依赖关系
- 评估目录层级的变更影响

**输出扩展**：
```markdown
## 目录影响分析
| 目录 | 影响级别 | 依赖关系 |
|------|----------|----------|
| src/core/ | 高 | 被 3 个目录依赖 |
| src/api/ | 中 | 依赖 core |
```

### Supervisor

**新增职责**：
- 维护目录-Worker 映射表
- 监控目录处理进度
- 协调并行执行
- 处理目录间依赖等待

**目录-Worker 映射表**：
```markdown
## 目录处理状态
| 目录 | 深度 | Worker | 状态 | 依赖 |
|------|------|--------|------|------|
| src/core/utils/ | 3 | Worker-1 | [DIR_COMPLETED] | - |
| src/core/ | 2 | Worker-2 | [DIR_WORKING] | src/core/utils/ |
| src/api/ | 2 | Worker-3 | [DIR_WAITING_DEP] | src/core/ |
```

---

## 执行流程

### 完整流程

```
1. Router 分诊
   ↓
2. Explorer 分析目录结构
   ↓ 输出：目录树 + 依赖关系
3. Supervisor 创建目录-Worker 映射
   ↓
4. 按深度降序并行启动 Worker
   ↓
5. Worker 处理（遇到依赖则标记等待）
   ↓
6. Supervisor 监控并协调
   ↓
7. 所有目录完成
   ↓
8. Librarian 更新文档索引
```

### Worker 执行细节

```
Worker 启动
    ↓
读取 design.md
    ↓
检查依赖目录状态
    ↓
依赖未完成？
    ├─ 是 → 标记 [DIR_WAITING_DEP] → 通知 Supervisor → 等待
    └─ 否 → 继续
    ↓
执行编码
    ↓
运行目录内测试
    ↓
标记 [DIR_COMPLETED]
    ↓
通知 Supervisor
    ↓
Supervisor 唤醒等待的 Worker
```

---

## 约束

1. **目录边界**：Worker 不跨越 design.md 边界修改代码
2. **依赖等待**：必须等待依赖目录完成后才能继续
3. **并行限制**：同深度无依赖才能并行
4. **变更通知**：跨目录变更必须通过 Supervisor 协调
5. **状态同步**：所有状态变更必须同步给 Supervisor

---

## 示例场景

### 场景 1：简单并行

```
src/
├── module_a/design.md
├── module_b/design.md
└── module_c/design.md
```

**处理**：三个 Worker 并行执行，无依赖关系。

### 场景 2：依赖链

```
src/
├── core/
│   ├── design.md
│   └── utils/design.md
└── api/
    └── design.md  (依赖 core)
```

**处理**：
1. Worker-1 处理 `core/utils/`（深度 3）
2. Worker-2 处理 `core/`（深度 2，等待 Worker-1）
3. Worker-3 处理 `api/`（深度 2，等待 Worker-2）

### 场景 3：跨模块变更

Worker A 处理 `module_a/` 时发现需要修改 `module_b/` 的接口。

**处理**：
1. Worker A 在 `module_b/design.md` 中仅追加“待处理变更”条目（不得改动其他章节）
2. Worker A 通知 Supervisor
3. Supervisor 创建 Worker B 处理 `module_b/`
4. Worker A 标记 `[DIR_WAITING_DEP]` 并等待
5. Worker B 完成后，Supervisor 通知 Worker A 继续
6. Worker A 完成 `module_a/`

---

## 相关文档

- [Worker Prompt](../../prompts/worker_prompt.md)
- [Supervisor Prompt](../../prompts/supervisor_prompt.md)
- [深度路径](../03_workflow/deep_path.md)
- [角色矩阵](../02_role_matrix/index.md)
