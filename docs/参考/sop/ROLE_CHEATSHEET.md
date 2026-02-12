---
version: v2.0.0
updated: 2026-02-12
---

# Skill 速查

---

## Skill 索引

以 [Skill 矩阵（SSOT）](02_skill_matrix/index.md) 为准。本节仅列出最常用的入口与核心 Skill：

| Skill | 层级 | 职责 | 典型停止点 |
|------|------|------|------------|
| sop-workflow-orchestrator | 编排 | 分诊与调用链编排 | `[USER_DECISION]` |
| sop-code-explorer | 编排 | 代码检索/审计/上下文 | `[USER_DECISION]` |
| sop-requirement-analyst | 需求 | L1-L3 需求分层与落盘 | `[WAITING_FOR_REQUIREMENTS]` |
| sop-implementation-designer | 实现设计 | L3 design.md 设计 | `[WAITING_FOR_DESIGN]` |
| sop-code-implementation | 实现 | 按 Scope 改代码与验证 | `[DIR_WAITING_DEP]` / `[WAITING_FOR_CODE_REVIEW]` |
| sop-code-review | 质量 | 只输出审查报告 | `[USER_DECISION]` |
| sop-document-sync | 文档 | 索引/版本/链接同步 | `[USER_DECISION]` |
| sop-progress-supervisor | 监管 | 并行调度与熔断 | `[FUSION_TRIGGERED]` |

---

## 路径

### 目录维度深度路径（推荐）
```
sop-requirement-analyst
→ sop-architecture-design
→ sop-architecture-reviewer
→ sop-implementation-designer (按目录)
→ sop-progress-supervisor (dir_map)
→ sop-code-implementation (按目录并行)
→ sop-code-review
→ sop-document-sync
```

### 快速路径
```
sop-code-explorer → sop-code-implementation → sop-code-review → sop-document-sync
```

### 深度路径（单目录）
```
新项目:
sop-requirement-analyst → sop-architecture-design → sop-architecture-reviewer
→ sop-implementation-designer → sop-code-implementation → sop-code-review → sop-document-sync

功能迭代:
sop-requirement-analyst → sop-implementation-designer → sop-code-implementation
→ sop-code-review → sop-document-sync
```

### TDD深度路径 (可选)
```
... deep path ...
→ sop-test-design-csv
→ sop-test-implementation
→ sop-code-implementation (运行验收 + 修正代码)
```

---

## 文档类型

| 类型 | 位置 | 产出 Skill |
|------|------|--------|
| Project PRD | `docs/01_requirements/project_prd.md` | sop-requirement-analyst |
| Module MRD | `docs/01_requirements/modules/[module]_mrd.md` | sop-requirement-analyst |
| Feature FRD | `docs/01_requirements/modules/[module]/[feature]_frd.md` | sop-requirement-analyst |
| 原型 | `docs/01_requirements/prototypes/[module]/` | sop-requirement-analyst |
| 架构设计 | `docs/02_logical_workflow/*.md` | sop-architecture-design |
| 实现设计 | `src/**/design.md` | sop-implementation-designer |
| 测试用例 | `docs/03_technical_spec/test_cases/*.csv` | sop-test-design-csv |
| 测试代码 | `tests/*.test.[ext]` | sop-test-implementation |

---

## 三错即停

| Strike | 条件 | 行动 |
|--------|------|------|
| 1 | 同一 Skill 同一步骤失败 | 自动修正（同 Skill 内） |
| 2 | 再失败 | 调用 `sop-code-explorer` + 设计类 Skill 复核并微调 |
| 3 | 再失败 | **熔断**：`sop-progress-supervisor` 介入并落盘报告 |

---

## 版本号速查

### 格式
```
v[主版本].[次版本].[修订版本]
```

### 规则
| 版本位 | 变更类型 | 示例 |
|--------|----------|------|
| 主版本 | 架构重大变更、Skill/Prompt Pack 体系重构 | v1→v2 |
| 次版本 | 新增 Skill、新增工作流、新增文档类型 | v2.0→v2.1 |
| 修订版本 | 文档修正、错误修复、格式统一 | v2.0.0→v2.0.1 |

### 当前版本
以 [CHANGELOG.md](CHANGELOG.md) 为准。

👉 [查看版本历史](CHANGELOG.md)

---

## 禁止项速查（黑白名单）

### 核心禁止

| 约束 | 禁止操作 | 违反后果 |
|------|----------|----------|
| **先标记状态** | ❌ 未标记`[DIR_WORKING]`直接修改 | 状态混乱 |
| **父目录摘要** | ❌ 在父目录放详细内容 | 破坏渐进披露 |
| **参考目录** | ❌ 非`sop-document-sync`修改`/docs/参考/` | SOP被破坏 |

### Skill 特定禁止

| Skill | 核心禁止 | 说明 |
|------|----------|------|
| sop-code-explorer | ❌ 修改任何代码/文档 | 只读检索与证据输出 |
| sop-test-design-csv | ❌ 从代码推导用例 | 用例仅基于设计与验收标准 |
| sop-test-implementation | ❌ 修改 CSV | 测试设计与测试实现隔离 |
| sop-code-review | ❌ 修改代码 | 只输出审查报告 |
| sop-code-implementation | ❌ 跨 Scope 直接修改 | 跨目录依赖必须进入 `[DIR_WAITING_DEP]` |

### 阶段特定禁止

| 阶段 | 核心禁止 | 说明 |
|------|----------|------|
| **需求** | ❌ 开始编码 | 先确认需求 |
| **架构** | ❌ 技术绑定 | 保持无关 |
| **测试用例** | ❌ 参考代码 | 基于设计 |
| **编码** | ❌ 偏离设计 | 严格按设计 |

### 违反后果等级

| 等级 | 违规类型 | 处理方式 |
|------|----------|----------|
| 🟡 轻微 | 格式不规范 | 提醒修正 |
| 🟠 中度 | 跳过停止点 | 强制停止 |
| 🔴 严重 | 修改SOP/破坏测试独立 | **熔断** |

👉 [查看完整禁止项矩阵](05_constraints/constraint_matrix.md)

---

## 分层验收速查

### 验收层级

| 层级 | 对象 | 类型 | 测试设计 Skill | 测试实现 Skill | 运行 Skill | 审查 Skill |
|------|------|------|--------|--------|--------|--------|
| **L1** | 单元/函数 | 单元测试 | sop-test-design-csv | sop-test-implementation | sop-code-implementation | sop-code-review |
| **L2** | 模块 | 集成测试 | sop-test-design-csv | sop-test-implementation | sop-code-implementation | sop-code-review |
| **L3** | 功能 | 验收测试 | sop-test-design-csv | sop-test-implementation | sop-code-implementation | sop-code-review |
| **L4** | 系统 | E2E测试 | sop-test-design-csv | sop-test-implementation | sop-code-implementation | sop-code-review |

### 验收流程

```
L1验收 → [WAITING_FOR_L1_REVIEW] → sop-code-review
  ↓
L2验收 → [WAITING_FOR_L2_REVIEW] → sop-code-review
  ↓
L3验收 → [WAITING_FOR_L3_REVIEW] → sop-code-review（必要时回到 sop-implementation-designer）
  ↓
L4验收 → [WAITING_FOR_L4_REVIEW] → sop-code-review（必要时回到 sop-architecture-reviewer）
```

### 新增停止点

| 停止点 | 触发时机 | 等待内容 |
|--------|----------|----------|
| `[WAITING_FOR_TEST_DESIGN]` | `sop-test-design-csv` 完成测试设计 | 用户确认设计充分 |
| `[WAITING_FOR_TEST_IMPLEMENTATION]` | `sop-test-implementation` 完成测试实现 | `sop-code-review` 审查测试代码 |
| `[WAITING_FOR_L1_REVIEW]` | L1 测试通过后 | `sop-code-review` 审查 |
| `[WAITING_FOR_L2_REVIEW]` | L2 测试通过后 | `sop-code-review` 审查 |
| `[WAITING_FOR_L3_REVIEW]` | L3 测试通过后 | `sop-code-review` 审查 |
| `[WAITING_FOR_L4_REVIEW]` | L4 测试通过后 | `sop-code-review` 审查 |
| `[WAITING_FOR_TEST_CREATION]` | 测试不充分时 | 用户决策 |

### 审查依据

| 层级 | 审查依据 |
|------|----------|
| L1 | design.md接口定义 |
| L2 | design.md模块设计 |
| L3 | design.md功能设计 + FRD |
| L4 | 架构设计 + design.md整体设计 |

👉 [分层验收标准详情](05_constraints/acceptance_criteria.md)
