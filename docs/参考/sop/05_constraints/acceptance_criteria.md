# 分层验收标准规范

> **版本**: v1.1.0  
> **更新日期**: 2026-02-08

---

## 概述

本文档定义 SOP 流程中的**分层验收标准**，明确 L1-L4 各层级的验收要求、测试充分性标准和审查流程。

**核心原则**:
- **Tester 设计**: 基于 design.md 设计分层验收测试
- **TestWorker 实现**: 实现验收测试代码
- **Worker 运行**: 仅运行测试，不创建测试
- **先低后高**: 必须先通过低层级，才能进行高层级
- **逐层审查**: 每层验收通过后必须审查

---

## 验收角色分工

| 角色 | 职责 | 禁止 |
|------|------|------|
| **Tester** | 设计分层验收测试（L1-L4） | 实现测试代码、运行测试 |
| **TestWorker** | 实现验收测试代码 | 设计测试、修改验收标准 |
| **Worker** | 运行验收测试 | 创建/修改测试、修改验收标准 |

---

## 分层验收体系

### 验收层级概览

| 层级 | 验收对象 | 测试类型 | 设计者 | 实现者 | 运行者 | 审查者 |
|------|----------|----------|--------|--------|--------|--------|
| **L1** | 单元/函数 | 单元测试 | Tester | TestWorker | Worker | Oracle |
| **L2** | 模块 | 集成测试 | Tester | TestWorker | Worker | Oracle |
| **L3** | 功能 | 验收测试 | Tester | TestWorker | Worker | Analyst + Oracle |
| **L4** | 系统 | E2E测试 | Tester | TestWorker | Worker | Prometheus + Analyst + Oracle |

### 验收顺序

```
L1 (单元测试)
  ↓ 通过
L1 审查 (Oracle)
  ↓ 通过
L2 (模块集成测试)
  ↓ 通过
L2 审查 (Oracle)
  ↓ 通过
L3 (功能验收测试)
  ↓ 通过
L3 审查 (Analyst + Oracle)
  ↓ 通过
L4 (系统E2E测试)
  ↓ 通过
L4 审查 (Prometheus + Analyst + Oracle)
  ↓ 通过
验收完成
```

**原则**: 任何一层失败或审查不通过，必须修复后重新从该层开始。

---

## L1 - 单元/函数级别验收

### 验收范围
- 单个函数/方法
- 单个类
- 独立工具函数

### 测试设计（Tester）

**设计输出**: `tests/acceptance/l1/[module]_l1_test_design.md`

**设计内容**:
```markdown
## L1 测试设计

### 测试目标
- 函数: `function_name`
- 位置: `src/module/file.py`

### 测试场景
1. **正常场景**
   - 输入: xxx
   - 预期输出: xxx
   
2. **边界场景**
   - 输入: xxx
   - 预期输出: xxx
   
3. **异常场景**
   - 输入: xxx
   - 预期异常: xxx

### 验收标准
- 覆盖率 >= 80%
- 所有场景通过
```

### 测试实现（TestWorker）

**实现位置**: `tests/acceptance/l1/test_[function].py`

**实现要求**:
- 基于 Tester 的设计实现
- 使用标准测试框架（pytest/jest等）
- 包含所有设计场景

### 验收标准（Worker检查）

| 检查项 | 标准 | 不充分时 |
|--------|------|----------|
| 测试存在性 | L1测试文件存在 | 中断，询问用户 |
| 覆盖率 | >= 80% | 中断，询问用户 |
| 通过率 | 100% | 修复后重试 |
| 代码质量 | 无lint/type错误 | 修复后重试 |

### 验收命令

```bash
# Python
pytest tests/acceptance/l1/ -v --cov=src --cov-report=term-missing

# JavaScript
npm run test:l1 -- --coverage

# Go
go test ./tests/acceptance/l1/ -v -cover
```

### 审查检查点（Oracle）

- [ ] 接口实现符合 design.md 定义
- [ ] 异常处理完整
- [ ] 日志记录规范
- [ ] 单元测试覆盖所有分支

---

## L2 - 模块级别验收

### 验收范围
- 模块内部组件集成
- 模块对外接口
- 模块间依赖（同层）

### 测试设计（Tester）

**设计输出**: `tests/acceptance/l2/[module]_l2_test_design.md`

**设计内容**:
```markdown
## L2 测试设计

### 测试目标
- 模块: `module_name`
- 接口: 模块对外暴露的接口

### 集成场景
1. **组件集成**
   - 组件A + 组件B 协作
   - 预期结果: xxx
   
2. **接口调用**
   - 输入: xxx
   - 预期输出: xxx

### 依赖验证
- 依赖模块: xxx
- Mock策略: xxx
```

### 测试实现（TestWorker）

**实现位置**: `tests/acceptance/l2/test_[module]_integration.py`

### 验收标准

| 检查项 | 标准 | 不充分时 |
|--------|------|----------|
| 测试存在性 | L2测试文件存在 | 中断，询问用户 |
| 模块覆盖 | 所有模块接口有测试 | 中断，询问用户 |
| 集成度 | 验证模块内组件协作 | 中断，询问用户 |
| 通过率 | 100% | 修复后重试 |

### 验收命令

```bash
# Python
pytest tests/acceptance/l2/ -v

# JavaScript
npm run test:l2

# Go
go test ./tests/acceptance/l2/ -v
```

### 审查检查点（Oracle）

- [ ] 模块设计符合 design.md
- [ ] 模块间依赖正确
- [ ] 模块边界清晰
- [ ] 接口契约满足

---

## L3 - 功能级别验收

### 验收范围
- 完整功能流程
- 用户场景
- 业务规则验证

### 测试设计（Tester）

**设计输出**: `tests/acceptance/l3/[feature]_l3_test_design.md`

**设计内容**:
```markdown
## L3 测试设计

### 测试目标
- 功能: `feature_name`
- 对应FRD: `docs/01_requirements/.../[feature]_frd.md`

### 用户场景
1. **主流程**
   - 步骤1: xxx
   - 步骤2: xxx
   - 预期结果: xxx
   
2. **替代流程**
   - 触发条件: xxx
   - 处理流程: xxx

3. **异常流程**
   - 错误场景: xxx
   - 预期处理: xxx

### 业务规则验证
- 规则1: xxx
- 规则2: xxx
```

### 测试实现（TestWorker）

**实现位置**: `tests/acceptance/l3/test_[feature].py`

### 验收标准

| 检查项 | 标准 | 不充分时 |
|--------|------|----------|
| 测试存在性 | L3测试文件存在 | 中断，询问用户 |
| 场景覆盖 | 覆盖FRD所有场景 | 中断，询问用户 |
| 业务规则 | 验证所有业务规则 | 中断，询问用户 |
| 通过率 | 100% | 修复后重试 |

### 验收命令

```bash
# Python
pytest tests/acceptance/l3/ -v

# JavaScript
npm run test:l3

# Go
go test ./tests/acceptance/l3/ -v
```

### 审查检查点（Analyst + Oracle）

- [ ] 功能实现符合 design.md
- [ ] 符合 FRD 需求
- [ ] 用户场景完整覆盖
- [ ] 业务规则正确实现

---

## L4 - 系统级别验收

### 验收范围
- 端到端流程
- 系统性能
- 架构约束验证

### 测试设计（Tester）

**设计输出**: `tests/acceptance/l4/system_l4_test_design.md`

**设计内容**:
```markdown
## L4 测试设计

### 测试目标
- 系统整体流程
- 架构约束验证

### E2E场景
1. **完整业务流程**
   - 从入口到出口的全流程
   - 涉及模块: A → B → C
   
2. **性能场景**
   - 并发用户数: xxx
   - 响应时间要求: xxx
   
3. **可靠性场景**
   - 故障恢复
   - 数据一致性

### 架构约束验证
- 约束1: xxx
- 约束2: xxx
```

### 测试实现（TestWorker）

**实现位置**: `tests/acceptance/l4/test_system_e2e.py`

### 验收标准

| 检查项 | 标准 | 不充分时 |
|--------|------|----------|
| 测试存在性 | L4测试文件存在 | 中断，询问用户 |
| E2E覆盖 | 覆盖核心业务流程 | 中断，询问用户 |
| 性能达标 | 满足性能指标 | 中断，询问用户 |
| 架构约束 | 满足架构约束 | 中断，询问用户 |
| 通过率 | 100% | 修复后重试 |

### 验收命令

```bash
# Python
pytest tests/acceptance/l4/ -v

# JavaScript
npm run test:l4

# Go
go test ./tests/acceptance/l4/ -v

# 性能测试
k6 run performance-tests.js
```

### 审查检查点（Prometheus + Analyst + Oracle）

- [ ] 符合架构设计文档
- [ ] 符合 design.md 整体设计
- [ ] 系统级约束满足
- [ ] 性能指标达标
- [ ] 可扩展性满足

---

## 测试充分性检查

### Worker 运行前检查清单

Worker 在运行每层验收测试前，必须检查：

```markdown
## 测试充分性检查

### L1 检查
- [ ] 测试文件存在: `tests/acceptance/l1/`
- [ ] 设计文档存在: `tests/acceptance/l1/*_l1_test_design.md`
- [ ] 测试代码存在: `tests/acceptance/l1/test_*.py`
- [ ] 覆盖率配置存在

**不充分**: 中断，标记 `[WAITING_FOR_TEST_CREATION]`

### L2 检查
- [ ] L1 已通过
- [ ] L1 审查已通过
- [ ] 测试文件存在: `tests/acceptance/l2/`
- [ ] 设计文档存在

**不充分**: 中断，标记 `[WAITING_FOR_TEST_CREATION]`

### L3 检查
- [ ] L2 已通过
- [ ] L2 审查已通过
- [ ] 测试文件存在: `tests/acceptance/l3/`
- [ ] 覆盖FRD场景

**不充分**: 中断，标记 `[WAITING_FOR_TEST_CREATION]`

### L4 检查
- [ ] L3 已通过
- [ ] L3 审查已通过
- [ ] 测试文件存在: `tests/acceptance/l4/`
- [ ] E2E场景完整

**不充分**: 中断，标记 `[WAITING_FOR_TEST_CREATION]`
```

---

## 停止点定义

| 停止点 | 触发时机 | 等待内容 | 处理角色 |
|--------|----------|----------|----------|
| `[WAITING_FOR_TEST_DESIGN]` | Tester完成测试设计 | 用户确认测试设计充分 | Tester |
| `[WAITING_FOR_TEST_IMPLEMENTATION]` | TestWorker完成测试实现 | 用户确认测试实现充分 | TestWorker |
| `[WAITING_FOR_L1_REVIEW]` | L1测试通过后 | Oracle审查 | Oracle |
| `[WAITING_FOR_L2_REVIEW]` | L2测试通过后 | Oracle审查 | Oracle |
| `[WAITING_FOR_L3_REVIEW]` | L3测试通过后 | Analyst + Oracle审查 | Analyst, Oracle |
| `[WAITING_FOR_L4_REVIEW]` | L4测试通过后 | Prometheus + Analyst + Oracle审查 | Prometheus, Analyst, Oracle |
| `[WAITING_FOR_TEST_CREATION]` | 测试不充分时 | 用户决策（补充测试/继续/暂停） | Worker → 用户 |

---

## 失败处理流程

### 测试失败

```
Worker运行测试
  ↓
测试失败
  ↓
Worker修复代码
  ↓
重新运行该层测试
  ↓
通过 → 进入审查
```

### 审查不通过

```
审查不通过
  ↓
返回对应设计阶段
  ↓
修复设计/代码
  ↓
从该层重新开始验收
```

### 测试不充分（Worker发现）

```
Worker检查测试充分性
  ↓
测试不充分
  ↓
标记 [WAITING_FOR_TEST_CREATION]
  ↓
停止工作
  ↓
等待用户决策
  ├─ 补充测试 → Tester设计 → TestWorker实现
  ├─ 继续（接受风险）→ 继续运行
  └─ 暂停 → 暂停任务
```

---

## 验收文档结构

### 目录结构

```
tests/
├── acceptance/
│   ├── l1/                          # L1 单元测试
│   │   ├── [module]_l1_test_design.md   # Tester设计
│   │   └── test_[function].py           # TestWorker实现
│   ├── l2/                          # L2 模块集成测试
│   │   ├── [module]_l2_test_design.md
│   │   └── test_[module]_integration.py
│   ├── l3/                          # L3 功能验收测试
│   │   ├── [feature]_l3_test_design.md
│   │   └── test_[feature].py
│   └── l4/                          # L4 系统E2E测试
│       ├── system_l4_test_design.md
│       └── test_system_e2e.py
└── ...
```

### 验收报告

每层验收完成后，Worker生成验收报告：

```markdown
## L1 验收报告

### 执行时间
2024-01-15 10:30:00

### 测试结果
- 测试用例: 15
- 通过: 15
- 失败: 0
- 覆盖率: 85%

### 通过的检查项
- [x] 测试存在性
- [x] 覆盖率 >= 80%
- [x] 100%通过率
- [x] 无lint错误

### 结论
✅ L1 验收通过，等待审查
```

---

## 相关文档

- [禁止项矩阵](constraint_matrix.md) - 黑白名单约束
- [design.md模板](../04_reference/document_templates/implementation_design.md) - 实现设计模板
- [工作流规范](../03_workflow/deep_path.md) - 深度路径流程

---

**注意**: 分层验收是质量保证的关键环节。所有角色必须严格遵守，确保每层验收通过后再进入下一层。
