# 角色矩阵

> **版本**: v1.5.1

## 角色总览

| 角色 | 层级 | 职责 | 权限 | 工作范围 | 停止点 |
|------|------|------|------|----------|--------|
| Router | 规划 | 任务分诊 | 全局Read，分发指令 | 全局 | - |
| Explorer | 规划 | 代码审计 | 仅Read | 全局 | - |
| Analyst | 需求 | 需求分析，PRD生成 | 读写需求文档 | 全局 | `[WAITING_FOR_REQUIREMENTS]` |
| Prometheus | 设计 | 架构设计 | 读写架构文档 | 全局 | `[WAITING_FOR_ARCHITECTURE]` |
| Skeptic | 设计 | 架构审查 | 写入审查意见 | 全局 | `[ARCHITECTURE_PASSED]` |
| Oracle | 设计 | 实现设计 | 读写实现文档 | 按目录 | `[WAITING_FOR_DESIGN]` |
| **Tester** | **设计** | **CSV测试用例唯一维护者，分层验收测试设计者** | **读写测试设计** | 按目录 | `[WAITING_FOR_TEST_DESIGN]` |
| Worker | 实现 | 编码实现 | Full-Write | **design.md 所在目录** | Diff展示 |
| CodeReviewer | 监管 | 代码审查 | 写入审查意见（不改代码） | 全局 | `[WAITING_FOR_CODE_REVIEW]` |
| **TestWorker** | **实现** | **分层验收测试实现者** | **读写测试代码，只读设计** | **design.md 所在目录** | `[WAITING_FOR_TEST_IMPLEMENTATION]` |
| Librarian | 监管 | 文档维护（SOP/ADR/RAG/索引/链接） | 仅文档文件 | 全局 | `[已完成]` |
| Supervisor | 监管 | 进度监管，熔断决策，**并行协调** | 状态更新 | 全局 | `[FUSION_TRIGGERED]` |

---

## 前后端分离约定（目录与产物）

为确保职责边界清晰、避免在同一设计/代码目录内混合前后端实现，SOP 引入前后端分流的逻辑目录（以 `04_reference/document_directory_mapping.md` 为准）：
- 前端：`docs/01_requirements/frontend/`、`docs/02_logical_workflow/frontend/`、`docs/03_technical_spec/frontend/`、`src/frontend/**/design.md`
- 后端：`docs/01_requirements/backend/`、`docs/02_logical_workflow/backend/`、`docs/03_technical_spec/backend/`、`src/backend/**/design.md`

角色影响（要点）：
- Analyst：同一业务功能同时涉及前端与后端时，拆分为前端 FRD + 后端 FRD，并互相引用。
- Prometheus：前端/后端逻辑分别落盘到对应 L2 目录，保持技术无关。
- Oracle：前端与后端各自产出 design.md，不得用同一份 design.md 覆盖两端实现。
- Worker/TestWorker：严格遵守 design.md 所在目录边界，不跨目录修改他端实现。

---

## Librarian 管理边界（ADR / 知识沉淀）

- ADR：维护状态、索引、交叉引用与断链修复；保障 ADR 仅回答 Why，不展开实现细节。
- RAG（知识沉淀）：负责分类入库、命名、来源记录、索引维护、去重与过期标记；保障设计文档引用可追溯。
- 冲突：发现 ADR/RAG/设计之间冲突时，输出冲突报告并标记 `[USER_DECISION]`，等待决策后回写相关文档与索引。

## 目录维度工作范围

### Worker 工作范围定义

Worker 以 `design.md` 所在目录为工作边界：

```
Worker 工作范围 = design.md 所在目录及其子目录（不含嵌套 design.md 的子目录）
```

**示例**：
```
src/
├── frontend/
│   ├── app/
│   │   └── design.md      ← Worker FE-App 负责
│   └── ui/
│       └── design.md      ← Worker FE-UI 负责
└── backend/
    ├── api/
    │   └── design.md      ← Worker BE-API 负责
    └── core/
        └── design.md      ← Worker BE-Core 负责
```

### 目录层级处理顺序

```
1. 扫描所有 design.md 文件，记录路径和深度
2. 按深度降序排序（深度大的优先）
3. 同深度目录可并行处理
4. 父目录等待所有子目录完成后才能开始
```

**处理顺序示例**：
```
深度 3: src/core/utils/design.md      → 第一批并行
深度 3: src/core/helpers/design.md    → 第一批并行
深度 2: src/core/design.md            → 第二批（等待第一批）
深度 2: src/api/design.md             → 第二批并行
深度 1: src/design.md                 → 第三批（等待第二批）
```

👉 [目录维度工作策略详情](../04_reference/design_directory_strategy.md)

---

## 权限矩阵

### 代码与需求

| 操作 | Router | Explorer | Analyst | Prometheus | Skeptic | Oracle | Tester | Librarian | Worker | CodeReviewer | TestWorker | Supervisor |
|------|--------|----------|---------|------------|---------|--------|--------|-----------|--------|------------|------------|------------|
| 读代码 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 改代码 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| 读需求 | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 改需求 | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |

### 架构与设计

| 操作 | Router | Explorer | Analyst | Prometheus | Skeptic | Oracle | Tester | Librarian | Worker | CodeReviewer | TestWorker | Supervisor |
|------|--------|----------|---------|------------|---------|--------|--------|-----------|--------|------------|------------|------------|
| 读架构 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 改架构 | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| 写审查 | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| 读实现 | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 改实现 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |

### 测试（关键隔离）

| 操作 | Router | Explorer | Analyst | Prometheus | Skeptic | Oracle | **Tester** | Librarian | Worker | CodeReviewer | **TestWorker** | Supervisor |
|------|--------|----------|---------|------------|---------|--------|------------|-----------|--------|------------|----------------|------------|
| 读CSV测试用例 | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| **改CSV测试用例** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | **✅ 唯一** | ❌ | ❌ | ❌ | **❌ 禁止** | ❌ |
| 读测试代码 | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 改测试代码 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ |
| 触发熔断 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 测试文件权限详解

### CSV测试用例文件

**位置**: `docs/03_technical_spec/test_cases/*.csv`

| 角色 | 权限 | 说明 |
|------|------|------|
| **Tester** | **读写** | **唯一维护者**，创建、修改、版本管理 |
| TestWorker | **只读** | 仅读取用例，禁止修改 |
| Worker | **禁止** | 不可访问 |
| 其他角色 | 只读 | 可查看，不可修改 |

### 测试代码文件

**位置**: `tests/*.test.[ext]`

| 角色 | 权限 | 说明 |
|------|------|------|
| **TestWorker** | **读写** | **唯一维护者**，编写、修改测试代码 |
| Tester | 只读 | 可查看测试代码实现 |
| Worker | 只读 | 了解测试，不修改 |
| 其他角色 | 只读 | 可查看 |

---

## 测试独立性原则

1. **Tester 独立**: 唯一维护CSV，不参考代码实现
2. **TestWorker 独立**: 只读CSV，基于用例写测试代码
3. **单向依赖**: 测试代码 → CSV → 设计文档，不反向依赖
4. **版本同步**: CSV版本变更时，TestWorker需同步更新测试代码

---

## 工作流

👉 [查看工作流详情](../03_workflow/index.md)

---

## 停止点

👉 [查看停止点定义](../03_workflow/index.md#停止点)
