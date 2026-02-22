---
version: v2.4.0
updated: 2026-02-22
---

# 状态字典

---

## 目的

本文件定义 SOP 全部状态标记的**唯一来源**（Single Source of Truth）。

约束：
- 文档、Prompt、技能说明中的状态标记必须引用本字典
- 新增/变更状态必须先更新本字典，再更新引用方

---

## 全局停止点（Global Stop Points）

| 状态 | 触发者 | 含义 | 继续条件 |
|------|--------|------|----------|
| `[WAITING_FOR_REQUIREMENTS]` | sop-requirement-analyst | 需求文档已完成，等待确认 | 用户确认需求 |
| `[WAITING_FOR_ARCHITECTURE]` | sop-architecture-design | 架构设计已完成，等待确认 | 用户确认架构 |
| `[WAITING_FOR_DESIGN]` | sop-implementation-designer | 实现设计已完成，等待确认 | 用户确认设计 |

多目录场景下 **设计确认粒度**：默认**整批确认**（所有目录的 design.md 产出后，进行一次 `DESIGN_CONFIRM()`，用户确认后进入 SCHEDULE_DIRS）。若项目需每目录或仅关键目录确认，在实现设计中约定并执行对应停止点。

---

## 架构审查结果（Architecture Review Result）

| 状态 | 触发者 | 含义 | 后续动作 |
|------|--------|------|----------|
| `[ARCHITECTURE_PASSED]` | sop-architecture-reviewer | 架构审查通过 | 进入实现设计阶段（sop-implementation-designer） |

---

## 代码审查停止点（Code Review Stop Points）

| 状态 | 触发者 | 含义 | 继续条件 |
|------|--------|------|----------|
| `[WAITING_FOR_CODE_REVIEW]` | sop-code-implementation | 代码变更已就绪，等待代码审查 | sop-code-review 输出审查结论（通过/需修改/僵局→用户决策） |

---

## 测试相关停止点（Test Stop Points）

| 状态 | 触发者 | 含义 | 继续条件 |
|------|--------|------|----------|
| `[WAITING_FOR_TEST_DESIGN]` | sop-test-design-csv | 测试设计（用例）已完成，等待确认 | 用户确认测试设计 |
| `[WAITING_FOR_TEST_IMPLEMENTATION]` | sop-test-implementation | 测试代码已完成，等待审查 | sop-code-review 输出审查结论（通过/需修改/僵局→用户决策） |
| `[WAITING_FOR_TEST_CREATION]` | sop-code-implementation → 用户 | 测试不充分，暂停实现等待决策 | 用户选择：补充测试/继续/暂停 |

兼容性：
- `[WAITING_FOR_TEST_REVIEW]` 视为 `[WAITING_FOR_TEST_DESIGN]` 的历史别名；新文档统一使用 `[WAITING_FOR_TEST_DESIGN]`

---

## 分层验收审查点（L1-L4 Review Points）

| 状态 | 触发者 | 含义 | 审查者 |
|------|--------|------|--------|
| `[WAITING_FOR_L1_REVIEW]` | sop-code-implementation | L1 验收测试通过，等待审查 | sop-code-review |
| `[WAITING_FOR_L2_REVIEW]` | sop-code-implementation | L2 验收测试通过，等待审查 | sop-code-review |
| `[WAITING_FOR_L3_REVIEW]` | sop-code-implementation | L3 验收测试通过，等待审查 | sop-code-review |
| `[WAITING_FOR_L4_REVIEW]` | sop-code-implementation | L4 验收测试通过，等待审查 | sop-code-review |

---

## 目录执行状态（Directory Execution States）

| 状态 | 触发者 | 含义 | 典型场景 |
|------|--------|------|----------|
| `[DIR_WORKING]` | sop-code-implementation | 正在处理当前目录 | 开始执行当前目录任务 |
| `[DIR_WAITING_DEP]` | sop-code-implementation | 等待依赖目录完成 | 依赖目录尚未 `[DIR_COMPLETED]` |
| `[DIR_COMPLETED]` | sop-code-implementation | 当前目录处理完成 | 变更完成并通过必要验证 |
| `[DIR_FAILED]` | sop-code-implementation | 当前目录处理失败 | 失败无法恢复或熔断前置 |

---

## 跨目录依赖请求状态（Dependency Request States）

| 状态 | 触发者 | 含义 | 继续条件 |
|------|--------|------|----------|
| `[WAITING_FOR_WORKER]` | sop-progress-supervisor | 依赖请求已发出，等待目标目录完成处理 | 目标目录完成处理并回报 |

---

## 调度协调状态（Scheduling Coordination States）

| 状态 | 触发者 | 含义 | 继续条件 |
|------|--------|------|----------|
| `[SCHEDULING]` | sop-progress-supervisor | 正在创建目录-skill 映射与调度计划 | 进入并行执行或依赖等待 |
| `[PARALLEL_EXECUTING]` | sop-progress-supervisor | 多目录并行执行中 | 所有目录进入完成/等待 |
| `[WAITING_DEPENDENCY]` | sop-progress-supervisor | 存在目录依赖等待中 | 依赖目录完成后继续 |
| `[ALL_COMPLETED]` | sop-progress-supervisor | 所有目录处理完成 | 进入收尾/文档同步 |

---

## 人工确认点（Manual Approval Points）

| 标记 | 触发者 | 含义 | 继续条件 |
|------|--------|------|----------|
| `[DIFF_APPROVAL]` | sop-code-implementation / sop-code-review | 展示变更 Diff（经审查通过后），等待人工审批 | 用户审批通过 |

---

## 伪状态（Pseudo States）

伪状态用于状态机图中表示控制流，不作为实际执行状态：

| 标记 | 含义 | 用途 |
|------|------|------|
| `RESUME` | 从检查点续跑的元状态 | 表示从可恢复检查点恢复执行的入口点，实际执行时需选择具体检查点 |

---

## 用户决策点（User Decision Points）

| 状态 | 触发者 | 含义 | 继续条件 |
|------|--------|------|----------|
| `[USER_DECISION]` | 任意 Skill → 用户 | 当前存在冲突/风险/分歧，需要用户做出决策 | 用户选择方案或给出新方案 |
| `[USER_DECISION_REQUIRED]` | 任意 Skill → 用户 | `[USER_DECISION]` 的历史别名；新文档统一使用 `[USER_DECISION]` | 同上 |

决策记录要求：
- 当触发原因是“找不到来源或依赖”（例如 SOURCE_MISSING / DEPENDENCY_MISSING / CONFLICT）时，必须同时：
  - 使用 `ASK_USER_DECISION(topic, options)` 输出选项
  - 使用 `RECORD_DECISION(topic, decision)` 落盘决策记录文件
  - 在后续产物中引用该决策记录路径

---

## 熔断状态（Fusion State）

| 状态 | 触发者 | 含义 | 恢复条件 |
|------|--------|------|----------|
| `[FUSION_TRIGGERED]` | sop-progress-supervisor | 连续失败触发熔断，停止执行 | 用户决策 + 方案调整 + 重置计数器 |

---

## 循环检测状态（Cycle Detection States）

| 状态 | 触发者 | 含义 | 处理方式 |
|------|--------|------|----------|
| `[CYCLE_DETECTED]` | sop-progress-supervisor | 检测到目录依赖循环 | 进入 `[USER_DECISION]` 并报告循环路径 |

---

## 迭代监控（Iteration Monitoring）

| 阈值 | 说明 | 触发动作 |
|------|------|----------|
| 迭代次数 ≤ 3 | 正常范围 | 继续执行 |
| 迭代次数 = 4 | 警告阈值 | 输出警告，建议检查收敛性 |
| 迭代次数 ≥ 5 | 熔断阈值 | 进入 `[USER_DECISION]`，提供收敛建议 |

**迭代计数规则**：
- 同一状态的转移计为一次迭代
- 用户决策后重置迭代计数器
- CMD: `ITERATION_COUNT(state)` 查询当前迭代次数
- CMD: `ITERATION_RESET(state)` 重置迭代计数器

---

## 任务状态（Task States）

| 状态 | 标记 | 触发者 | 含义 | 继续条件 |
|------|------|--------|------|----------|
| `[TASK_PENDING]` | `[ ]` | sop-implementation-designer | 任务待处理 | 任务开始 |
| `[TASK_IN_PROGRESS]` | `[-]` | sop-code-implementation | 任务执行中 | 任务完成或阻塞 |
| `[TASK_COMPLETED]` | `[x]` | sop-code-implementation | 任务已完成 | 自动进入下一任务或归档 |
| `[TASK_BLOCKED]` | `[!]` | sop-code-implementation | 任务被阻塞 | 依赖解决后手动解除 |
| `[TASK_ARCHIVED]` | `[archived]` | sop-document-sync | 任务已归档 | - |

### 任务状态转移

```
[TASK_PENDING] → TASK_START() → [TASK_IN_PROGRESS]
[TASK_IN_PROGRESS] → TASK_COMPLETE() → [TASK_COMPLETED]
[TASK_IN_PROGRESS] → TASK_BLOCK() → [TASK_BLOCKED]
[TASK_BLOCKED] → TASK_UNBLOCK() → [TASK_IN_PROGRESS]
[TASK_COMPLETED] → TASK_ARCHIVE() → [TASK_ARCHIVED]
```

---

## 全局终态（Global Terminal State）

| 状态 | 触发者 | 含义 | 备注 |
|------|--------|------|------|
| `[已完成]` | sop-document-sync / sop-progress-supervisor | 全流程收尾完成 | 用于对用户声明任务结束（非目录级别）；不作为再执行起点 |

---

## 可恢复检查点（Recoverable Checkpoints）

以下状态可作为“再执行”的起点；再执行前须具备对应最小输入/落盘物，并由 continuation_request 声明（模板：04_reference/interaction_formats/continuation_request.md）。

| 检查点状态 | 再执行所需最小输入/落盘物 | 建议下一步 Skill |
|------------|---------------------------|------------------|
| `[WAITING_FOR_REQUIREMENTS]` | PRD/MRD/FRD 草稿路径、用户确认结论或决策记录 | sop-requirement-analyst（修订）或进入下一阶段 |
| `[WAITING_FOR_ARCHITECTURE]` | PRD/MRD 路径、架构设计草稿路径、用户确认结论 | sop-architecture-design（修订）或 sop-architecture-reviewer |
| `[ARCHITECTURE_PASSED]` | L2 架构文档路径（已审查通过） | sop-implementation-designer |
| `[WAITING_FOR_DESIGN]` | L2 架构路径、各目录 design.md 路径、用户确认结论 | sop-implementation-designer（修订）或 sop-code-explorer + sop-progress-supervisor |
| `[SCHEDULING]` | design_list（path + depth）、dir_map 草稿 | sop-progress-supervisor |
| `[PARALLEL_EXECUTING]` / `[WAITING_DEPENDENCY]` | dir_map、temp/scheduler_state.md、各目录状态 | sop-progress-supervisor |
| `[DIR_WAITING_DEP]` | 当前目录 scope、依赖目录列表、依赖目录完成情况 | sop-progress-supervisor 唤醒后 sop-code-implementation |
| `[WAITING_FOR_CODE_REVIEW]` | Diff、design/验收依据路径、当前目录 scope | sop-code-review |
| `[DIR_COMPLETED]`（单目录） | dir_map、已完成目录列表、剩余目录 | sop-progress-supervisor 调度下一批或 sop-code-review / sop-document-sync |
| `[WAITING_FOR_TEST_DESIGN]` | 测试设计 CSV/文档路径、用户确认结论 | sop-test-design-csv（修订）或 sop-test-implementation |
| `[WAITING_FOR_TEST_IMPLEMENTATION]` | CSV 路径、测试代码路径、审查结论 | sop-code-review（测试代码审查）或 sop-code-implementation |
| `[WAITING_FOR_L1_REVIEW]` / `[WAITING_FOR_L2_REVIEW]` / `[WAITING_FOR_L3_REVIEW]` / `[WAITING_FOR_L4_REVIEW]` | 对应层级验收结果、design/验收依据路径 | sop-code-review（REVIEW_ACCEPTANCE） |
| `[USER_DECISION]` / `[FUSION_TRIGGERED]` | 决策记录路径、方案调整说明、重置计数器 | 选择：重新分诊（ROUTE）或从本表上述某一检查点续跑 |

说明：从 `[USER_DECISION]` / `[FUSION_TRIGGERED]` 续跑时，须在 continuation_request 中写明“建议下一步”对应的检查点及上表所列最小输入。
