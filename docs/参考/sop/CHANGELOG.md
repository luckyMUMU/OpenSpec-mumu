---
version: v2.7.0
updated: 2026-02-23
---

# SOP 版本变更历史

---

## 版本号规则

```
v[主版本].[次版本].[修订版本]
```

| 版本位 | 变更类型 | 示例 |
|--------|----------|------|
| **主版本** | 体系重大变更（Skill/Prompt Pack/SSOT 重构） | v1→v2 |
| **次版本** | 新增/调整 Skill、工作流、文档类型 | v2.0→v2.1 |
| **修订版本** | 文档修正、错误修复、格式统一 | v2.0.0→v2.0.1 |

---

## 版本历史

### v2.7.0 (2026-02-23)

**文档精简与整合** - 消除重复内容，建立清晰的引用层次

#### 关键变更

- **文档整合**：
  - 合并 `spec_design_questioning.md`、`conflict_detection_rules.md`、`questioning_checklist.md` 为 `spec_interactive_guide.md`（184行）
  - 合并 `design_decision_rules.md`、`design_directory_strategy.md` 为 `design_guide.md`（284行）
  - 精简 `document_directory_mapping.md`（119行→82行）
- **ADR 整理**：
  - ADR-Spec-003 标记为"历史决策记录"
  - ADR-Spec-004 更新引用关系
- **引用关系优化**：
  - 核心决策引用 ADR 作为唯一真源
  - 参考文档精简为操作指南
  - 消除循环引用

#### 删除文件

- `04_reference/spec_design_questioning.md`（已合并）
- `04_reference/conflict_detection_rules.md`（已合并）
- `04_reference/questioning_checklist.md`（已合并）
- `04_reference/design_decision_rules.md`（已合并）
- `04_reference/design_directory_strategy.md`（已合并）

#### 主要更新文件

- 新增：`04_reference/spec_interactive_guide.md`
- 新增：`04_reference/design_guide.md`
- 精简：`04_reference/document_directory_mapping.md`
- 更新：`04_context_reference/adr_Spec_003_version_sync.md`
- 更新：`04_context_reference/adr_Spec_004_interactive_questioning.md`
- 更新：`AGENT_SOP.md`、`04_reference/index.md`、`05_constraints/constraint_matrix.md`

---

### v2.6.0 (2026-02-22)

**审查改进实施** - 根据系统性审查报告实施改进，完善 Skill 合约与 ADR 模板

#### 关键变更

- **Skill 合约 Spec 约束**：
  - 为全部 17 个 Skill 合约添加 Spec 模式约束章节
  - 包含：规划阶段只读、交互式提问、冲突检测、决策记录、ADR 引用
  - sop-fast-path 新增 Spec 模式升级规则
- **ADR 模板完善**：
  - 合并"决策变更记录"和"决策记录"为统一的"决策记录"章节
  - 完善用户确认机制，扩展为四个选项：更新现有 ADR、创建新 ADR、请求讨论、跳过更新
- **快速路径与 Spec 模式交互**：
  - 明确升级触发条件（用户决策、跨文件影响、ADR 冲突、复杂度超限）
  - 定义升级目标（Spec 模式交互式提问 / 深度路径）
  - 规范升级流程

#### 主要更新文件

- ADR 模板：`04_reference/document_templates/adr.md`
- 入口文档：`AGENT_SOP.md`
- Skill 合约（17个）：
  - 核心：`sop-fast-path`、`sop-deep-path`、`sop-architecture-design`、`sop-implementation-designer`、`sop-code-implementation`
  - 辅助：`sop-code-review`、`sop-architecture-reviewer`、`sop-test-design-csv`、`sop-test-implementation`、`sop-tdd-workflow`
  - 协调：`sop-workflow-orchestrator`、`sop-progress-supervisor`、`sop-document-sync`、`sop-design-placement`
  - 探索：`sop-code-explorer`、`sop-requirement-analyst`、`sop-capability-reuse`

---

### v2.4.0 (2026-02-22)

**Spec 生命周期与版本同步** - 定义 Spec 产物生命周期、建立版本同步机制

#### 关键变更

- **Spec 产物生命周期**：
  - 定义执行期→归档期→清理三阶段
  - 明确归档判断标准
  - 设计先行原则：持久化设计 vs 临时规范
- **Spec 与 design.md 映射关系**：
  - 任务划分原则：单目录任务 = 单个 design.md
  - 执行顺序：自底向上（depth_desc）
  - 任务声明字段：design_path、depth、dependencies、scope
- **版本同步机制**：
  - 批量更新 22+ 文件版本号
  - 建立版本一致性检查流程
- **ADR 记录**：
  - 新增 `adr_Spec_001_lifecycle.md`：Spec 生命周期管理
  - 新增 `adr_Spec_002_design_relation.md`：Spec 与 design.md 关系定义

#### 主要更新文件

- 目录映射：`04_reference/document_directory_mapping.md`
- 目录策略：`04_reference/design_directory_strategy.md`
- 决策规则：`04_reference/design_decision_rules.md`
- ADR：`04_context_reference/adr_Spec_001_lifecycle.md`（新增）
- ADR：`04_context_reference/adr_Spec_002_design_relation.md`（新增）
- 全部 Skill 合约：版本同步更新
- 全部参考文档：版本同步更新

---

### v2.2.0 (2026-02-21)

**基于审查结果的系统性改进** - 统一术语、增强任务管理、补充缺失机制

#### 关键变更

- **术语统一**：
  - 状态图 `DONE` 改为 `[已完成]`
  - `Diff展示` 改为 `[DIFF_APPROVAL]`
  - 新增 `RESUME` 伪状态说明
- **任务管理机制重构**：
  - 新增 `TASK_SPEC_CREATE`、`TASK_SPEC_SYNC` 命令
  - design.md 支持与 trae spec 对齐的 spec/tasks/checklist 结构
  - 新增任务粒度指导（单任务建议不超过 4 小时）
- **目录依赖表**：implementation_design.md 模板新增"目录依赖"章节
- **决策记录规范**：
  - 新增决策记录模板 `decision_record.md`
  - 明确决策记录路径规范 `docs/04_context_reference/decisions/YYYY-MM-DD_[topic].md`
- **依赖循环检测**：
  - 新增 `CYCLE_CHECK` 命令
  - 新增 `[CYCLE_DETECTED]` 状态
  - sop-progress-supervisor 增加循环检测步骤
- **迭代反馈机制**：
  - 新增 `ITERATION_COUNT`、`ITERATION_RESET` 命令
  - 定义迭代阈值（正常≤3，警告=4，熔断≥5）
- **快速路径量化**：新增 AST 变化检测说明和量化判断标准表
- **覆盖率阈值**：补充 L2-L4 覆盖率建议（L2≥70%，L3≥60%，L4 关键路径 100%）

#### 主要更新文件

- 状态机：`sop_state_machine.md`
- 状态字典：`05_constraints/state_dictionary.md`
- 命令字典：`05_constraints/command_dictionary.md`
- 模板：`04_reference/document_templates/implementation_design.md`
- 模板：`04_reference/document_templates/decision_record.md`（新增）
- 目录映射：`04_reference/document_directory_mapping.md`
- 快速路径：`03_workflow/fast_path.md`
- 验收标准：`05_constraints/acceptance_criteria.md`
- Skill合约：`skills/sop-progress-supervisor/SKILL.md`

---

### v2.1.0 (2026-02-12)

**入口统一与任务管理增强** - 合并入口文档，增强 design.md 任务管理能力

#### 关键变更

- **入口统一**：合并 `LLM_INDEX.md` 到 `AGENT_SOP.md` 作为唯一入口
- **角色定位**：`sop_for_human.md` 标记为仅供参考
- **任务状态管理**：新增任务状态（待处理/进行中/已完成/已阻塞/已归档）
- **任务命令**：新增 `TASK_START`、`TASK_COMPLETE`、`TASK_BLOCK`、`TASK_ARCHIVE` 命令
- **归档机制**：`sop-document-sync` 支持目录归档时自动清除已完成任务

#### 主要更新文件

- 入口：`AGENT_SOP.md`（合并原 `LLM_INDEX.md`）
- 模板：`04_reference/document_templates/implementation_design.md`
- 状态字典：`05_constraints/state_dictionary.md`
- 命令字典：`05_constraints/command_dictionary.md`
- Skill合约：`skills/sop-document-sync/SKILL.md`

#### 删除文件

- `LLM_INDEX.md`（已合并至 `AGENT_SOP.md`）

---

### v2.0.0 (2026-02-12)

**Skill-first 体系上线** - 以 Skill 作为唯一执行单元，Prompt Pack 作为偏好层，SSOT 收敛

#### 关键变更

- **Skill 矩阵 SSOT**：新增/完善 `02_skill_matrix/index.md`，作为 Skill 清单与边界唯一真源
- **Prompt Pack 规范化**：Prompts 以 `prompts/packs/<pack>/skills/<skill>.md` 组织，默认 pack 为 `default`
- **测试资产隔离**：引入 `sop-test-design-csv` 与 `sop-test-implementation`，并在约束中固化 CSV 与测试代码隔离规则
- **字典与约束收敛**：状态/命令/红线统一以 `05_constraints/*` 为准，工作流直接引用 SSOT
- **交付物模板统一**：交互格式与文档模板统一引用 `04_reference/*`，便于审查与落盘

#### 主要更新文件（摘要）

- SSOT：`02_skill_matrix/index.md`
- 工作流：`03_workflow/*`
- 约束：`05_constraints/*`
- 模板与标准：`04_reference/*`
- Prompt Pack：`prompts/packs/default/*`
- Skill 合约：`skills/*/SKILL.md`

---

## 备注

- 若需要追溯 v1.x 版本历史，请以版本控制系统中的历史记录为准。
