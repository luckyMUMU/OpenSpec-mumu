# 工作流规范

> **版本**: v1.5.1  
> **更新日期**: 2026-02-12

## 路径选择

| 路径 | 条件 |
|------|------|
| 快速 | 单文件+<30行+无逻辑变更 |
| 深度 | 其他所有情况 |
| TDD | 深度+启用TDD(可选) |

---

## 目录维度执行

### 核心原则

Worker 以 `design.md` 所在目录为工作范围，按目录深度自底向上并行执行：

CMD: `LIST_DESIGN_MD(root) -> design_list`
CMD: `SCHEDULE_DIRS(design_list) -> dir_map`
CMD: `RUN_DIR_BATCH(depth_desc)`（同 depth 并行）
CMD: `WAIT_DEP(dir,deps)` / `COMPLETE_DIR(dir)`

参见：05_constraints/command_dictionary.md

### 并行执行规则

| 场景 | 执行方式 | 说明 |
|------|----------|------|
| 同深度无依赖 | **并行** | 多个 Worker 同时执行 |
| 同深度有依赖 | 串行 | 按依赖顺序执行 |
| 父子目录 | 串行 | 子目录完成后父目录才能开始 |
| 跨模块依赖 | 协调 | 通过 Supervisor 协调 |

👉 [目录维度工作策略详情](../04_reference/design_directory_strategy.md)

---

## 快速路径

```
Explorer → Worker → CodeReviewer → Librarian
```

| 阶段 | 输入 | 输出 | 停止点 |
|------|------|------|--------|
| Explorer | 目标文件 | 审计报告 | - |
| Worker | 审计报告 | 代码修改 | `[WAITING_FOR_CODE_REVIEW]` |
| CodeReviewer | Diff+设计文档 | 审查报告 | Diff展示 |
| Librarian | 代码修改 | 文档更新 | `[已完成]` |

来源与依赖准则：
- Worker/CodeReviewer 必须声明来源与依赖（模板：`04_reference/interaction_formats/source_dependency.md`）
- 当找不到来源或依赖时，必须进入 `[USER_DECISION]` 并落盘决策记录

**注意**：快速路径不涉及多目录并行，单文件修改直接执行。

👉 [快速路径详情](fast_path.md)

---

## 深度路径

### 新项目/大重构（目录维度）

```
Analyst → Prometheus ↔ Skeptic → Oracle → Supervisor → [多 Worker 并行] → CodeReviewer → Librarian
                                              ↓
                                    按目录深度调度 Worker
```

### 功能迭代（目录维度）

```
Analyst → Oracle → Supervisor → [多 Worker 并行] → CodeReviewer → Librarian
                          ↓
                    按目录深度调度 Worker
```

| 阶段 | 输入 | 输出 | 停止点 | 工作范围 |
|------|------|------|--------|----------|
| Analyst | 用户描述 | PRD | `[WAITING_FOR_REQUIREMENTS]` | 全局 |
| Prometheus | PRD | 架构设计 | `[WAITING_FOR_ARCHITECTURE]` | 全局 |
| Skeptic | 架构设计 | 审查报告 | `[ARCHITECTURE_PASSED]` | 全局 |
| Oracle | 架构设计 | 实现设计 | `[WAITING_FOR_DESIGN]` | 按目录 |
| **Supervisor** | **实现设计** | **目录-Worker 映射** | **调度执行** | **全局协调** |
| **Worker** | **design.md** | **代码** | **`[WAITING_FOR_CODE_REVIEW]`** | **design.md 所在目录** |
| CodeReviewer | Diff+设计文档 | 审查报告 | Diff展示 | 全局 |
| Librarian | 代码 | 文档更新 | `[已完成]` | 全局 |

👉 [深度路径详情](deep_path.md)

---

## TDD深度路径 (可选)

```
Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Supervisor → Worker + TestWorker → CodeReviewer → Librarian
                                    ↓                 ↓
                              生成CSV测试用例      并行调度与依赖协调
```

| 阶段 | 输入 | 输出 | 停止点 |
|------|------|------|--------|
| Tester | L2+L3设计 | CSV测试用例 | `[WAITING_FOR_TEST_DESIGN]` |
| Supervisor | 实现设计+测试设计 | 目录-Worker 映射+调度状态 | `[SCHEDULING]` |
| Worker | 实现设计 | 代码 | `[WAITING_FOR_CODE_REVIEW]` |
| TestWorker | CSV+代码 | 测试代码 | - |
| CodeReviewer | Diff+设计文档 | 审查报告 | Diff展示 |

**启用条件**: 核心业务/复杂逻辑/高覆盖要求

**测试用例来源**: 仅基于设计文档，不参考代码

**测试代码来源**: 主要基于CSV，仅参考代码接口

👉 [TDD工作流详情](../skills/sop-tdd-workflow/SKILL.md)

---

## 三错即停

| Strike | 条件 | 行动 |
|--------|------|------|
| 1 | Worker失败 | 自动修正 |
| 2 | 再失败 | @Explorer+@Oracle审计+微调 |
| 3 | 再失败 | **熔断**，生成报告 |

👉 [三错即停详情](three_strike_rule.md)

---

## 停止点

- SSOT: 05_constraints/state_dictionary.md（所有状态标记与停止点定义以该文件为准）
- 命令契约: 05_constraints/command_dictionary.md
- 人工审批点: Diff 展示（代码审查通过后，展示变更 Diff 等待用户审批）
