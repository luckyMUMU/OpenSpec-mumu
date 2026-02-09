# 深度路径

> **版本**: v1.4.0

**适用**: 跨文件/新功能/重构/API变更

---

## 目录维度深度路径

### 核心流程

```
Analyst → Prometheus ↔ Skeptic → Oracle → Supervisor → [多 Worker 并行] → Librarian
                                              ↓
                                    按目录深度调度 Worker
```

### 目录并行执行流程

```
1. Explorer 扫描目录结构，识别所有 design.md
2. Supervisor 按目录深度排序，创建目录-Worker 映射表
3. 按深度降序分批启动 Worker（同深度并行）
4. Worker 处理当前目录，遇到依赖则标记等待
5. Supervisor 监控进度，唤醒等待依赖的 Worker
6. 所有目录完成后，Librarian 更新文档
```

---

## 标准深度路径（单目录）

### 新项目/大重构
```
Analyst → Prometheus ↔ Skeptic → Oracle → Worker → Librarian
```

### 功能迭代
```
Analyst → Oracle → Worker → Librarian
```

---

## 步骤

### 全局阶段（全局执行）

| 阶段 | 输入 | 输出 | 停止点 | 执行者 |
|------|------|------|--------|--------|
| Analyst | 用户描述 | PRD/MRD/FRD | `[WAITING_FOR_REQUIREMENTS]` | 全局 |
| Prometheus | PRD | 架构设计 | `[WAITING_FOR_ARCHITECTURE]` | 全局 |
| Skeptic | 架构设计 | 审查报告 | `[ARCHITECTURE_PASSED]` | 全局 |

### 目录阶段（按目录并行执行）

| 阶段 | 输入 | 输出 | 停止点 | 执行者 |
|------|------|------|--------|--------|
| Oracle | 架构设计 | 实现设计 | `[WAITING_FOR_DESIGN]` | 按目录 |
| **Supervisor** | **实现设计** | **目录-Worker 映射** | **`[SCHEDULING]`** | **全局协调** |
| **Worker** | **design.md** | **代码** | **Diff展示** | **design.md 所在目录** |
| Librarian | 代码 | 文档更新 | `[已完成]` | 全局 |

### 目录-Worker 映射表示例

```markdown
## 目录处理状态
| 目录 | 深度 | Worker | 状态 | 依赖目录 |
|------|------|--------|------|----------|
| src/core/utils/ | 3 | Worker-1 | [DIR_COMPLETED] | - |
| src/core/helpers/ | 3 | Worker-2 | [DIR_COMPLETED] | - |
| src/core/ | 2 | Worker-3 | [DIR_WORKING] | src/core/utils/, src/core/helpers/ |
| src/api/ | 2 | Worker-4 | [DIR_WAITING_DEP] | src/core/ |
| src/web/ | 2 | Worker-5 | [DIR_WORKING] | src/core/ |
```

---

## 分层验收深度路径（推荐）

**适用场景**: 所有深度路径任务，强制分层验收

### 流程
```
Analyst → Prometheus ↔ Skeptic → Oracle → Tester → TestWorker → Worker → Librarian
                                    ↓           ↓           ↓
                              设计文档    设计验收测试    实现验收测试    运行验收测试
```

### 步骤

| 阶段 | 输入 | 输出 | 停止点 | 说明 |
|------|------|------|--------|------|
| Analyst | 用户描述 | PRD/MRD/FRD | `[WAITING_FOR_REQUIREMENTS]` | 需求分析 |
| Prometheus | PRD | 架构设计 | `[WAITING_FOR_ARCHITECTURE]` | 架构设计 |
| Skeptic | 架构设计 | 审查报告 | `[ARCHITECTURE_PASSED]` | 架构审查 |
| Oracle | 架构设计 | 实现设计 | `[WAITING_FOR_DESIGN]` | 实现设计 |
| **Tester** | **实现设计** | **L1-L4测试设计** | **`[WAITING_FOR_TEST_DESIGN]`** | **设计分层验收测试** |
| **TestWorker** | **测试设计** | **L1-L4测试代码** | **`[WAITING_FOR_TEST_IMPLEMENTATION]`** | **实现分层验收测试** |
| **Worker** | **实现设计+测试** | **代码+验收** | **见下方验收流程** | **编码+运行验收测试** |
| Librarian | 代码+测试 | 文档更新 | `[已完成]` | 文档归档 |

### 分层验收流程（Worker执行）

```
Worker编码完成
    ↓
检查L1测试充分性
    ↓
运行L1验收测试
    ↓
L1通过 → [WAITING_FOR_L1_REVIEW] → Oracle审查
    ↓
检查L2测试充分性
    ↓
运行L2验收测试
    ↓
L2通过 → [WAITING_FOR_L2_REVIEW] → Oracle审查
    ↓
检查L3测试充分性
    ↓
运行L3验收测试
    ↓
L3通过 → [WAITING_FOR_L3_REVIEW] → Analyst+Oracle审查
    ↓
检查L4测试充分性
    ↓
运行L4验收测试
    ↓
L4通过 → [WAITING_FOR_L4_REVIEW] → Prometheus+Analyst+Oracle审查
    ↓
全部验收通过
```

### 分层验收特点

| 层级 | 验收对象 | 设计者 | 实现者 | 运行者 | 审查者 |
|------|----------|--------|--------|--------|--------|
| **L1** | 单元/函数 | Tester | TestWorker | Worker | Oracle |
| **L2** | 模块 | Tester | TestWorker | Worker | Oracle |
| **L3** | 功能 | Tester | TestWorker | Worker | Analyst + Oracle |
| **L4** | 系统 | Tester | TestWorker | Worker | Prometheus + Analyst + Oracle |

### 关键原则

- **Tester设计**: 基于design.md设计L1-L4验收测试
- **TestWorker实现**: 实现验收测试代码
- **Worker运行**: 只运行测试，不创建/修改测试
- **先低后高**: 必须通过L1才能进行L2，以此类推
- **每层审查**: 每层通过后必须审查
- **测试充分性**: 测试不充分时，Worker中断询问用户

👉 [分层验收标准详情](../05_constraints/acceptance_criteria.md)

---

## 审查循环

```
Prometheus设计 → Skeptic审查 → Prometheus回复 → ...
```

**终止条件**:
- 正常: 设计完善
- 异常: 3次无法回复/僵局/需用户决策

---

## 跨模块依赖处理

### 原则

Worker **只修改当前目录的代码**，不直接修改其他目录的实现或设计内容。

跨目录协作仅允许对目标目录的 `design.md` 做一种变更：**追加“待处理变更”条目**（不得改动其他章节、不得重写既有设计）。

### 处理流程

```
Worker A 处理 Dir A 时发现需要修改 Dir B
    ↓
Worker A 在 Dir B 的 design.md 中**仅追加**“待处理变更”条目
    ↓
Worker A 通知 Supervisor
    ↓
Supervisor 检查 Dir B 状态
    ├─ Dir B 已有 Worker → 通知现有 Worker
    └─ Dir B 无 Worker → 创建 Worker B
    ↓
Worker A 标记 [DIR_WAITING_DEP] 并等待
    ↓
Worker B 完成 Dir B 的修改
    ↓
Supervisor 通知 Worker A 继续
    ↓
Worker A 完成 Dir A
```

### 待处理变更标记格式

在目标目录的 design.md 中添加：

```markdown
## 待处理变更

### 变更 1
- **来源**: Worker A (src/module_a/)
- **类型**: 接口变更
- **描述**: 需要添加 validate_input() 函数
- **影响**: 影响 module_a 的数据验证
- **状态**: [WAITING_FOR_WORKER]
- **创建时间**: 2024-01-15 10:30

### 变更 2
- **来源**: Worker C (src/module_c/)
- **类型**: 依赖变更
- **描述**: 需要修改返回值格式
- **状态**: [WAITING_FOR_WORKER]
```

---

## 并行执行示例

### 示例 1：简单并行

```
src/
├── module_a/design.md
├── module_b/design.md
└── module_c/design.md
```

**执行**：
- 三个目录深度相同（假设都是深度 2）
- 启动 Worker A、Worker B、Worker C 并行执行
- 无依赖关系，各自独立完成

### 示例 2：依赖链

```
src/
├── core/
│   ├── utils/design.md      (深度 3)
│   └── design.md            (深度 2)
└── api/
    └── design.md            (深度 2, 依赖 core)
```

**执行**：
1. **第一批**（深度 3）：Worker-1 处理 `core/utils/`
2. **第二批**（深度 2）：
   - Worker-2 处理 `core/`（等待 Worker-1）
   - Worker-3 处理 `api/`（等待 Worker-2）

### 示例 3：复杂依赖网络

```
src/
├── shared/design.md         (深度 2)
├── core/design.md           (深度 2, 依赖 shared)
├── api/design.md            (深度 2, 依赖 core)
└── web/design.md            (深度 2, 依赖 core)
```

**执行**：
1. **第一批**：Worker-1 处理 `shared/`
2. **第二批**：Worker-2 处理 `core/`（等待 Worker-1）
3. **第三批**（并行）：
   - Worker-3 处理 `api/`（等待 Worker-2）
   - Worker-4 处理 `web/`（等待 Worker-2）

---

## 约束

- 必须遵循所有阶段
- 必须通过审查
- 三错即停适用
- 文档必须同步
- TDD模式下测试用例必须人工审核
- **Worker 不跨越 design.md 边界修改代码**
- **必须等待依赖目录完成后才能继续**
- **同深度无依赖目录才能并行**
