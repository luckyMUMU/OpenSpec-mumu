---
version: v2.1.0
updated: 2026-02-12
---

# Skill 矩阵（SSOT）

---

## 1. Skill 总览

| Skill | 层级 | 职责摘要 | 默认 Prompt 模块 | 典型输入 | 典型输出 | 停止点 | 必须落盘交付物 |
|------|------|----------|------------------|----------|----------|--------|----------------|
| sop-workflow-orchestrator | 编排 | 分诊、路径选择、调用链编排 | prompts/packs/default/skills/sop-workflow-orchestrator.md | user_request + context | 路径+调用链+下一步命令式指令 | `[USER_DECISION]` | `04_reference/interaction_formats/router_triage.md` |
| sop-code-explorer | 编排 | 代码库检索/审计/上下文提取 | prompts/packs/default/skills/sop-code-explorer.md | scope + targets | 审计摘要/定位结果 | `[USER_DECISION]` | `04_reference/interaction_formats/code_audit_report.md` |
| sop-requirement-analyst | 需求 | L1-L3 需求分层与落盘 | prompts/packs/default/skills/sop-requirement-analyst.md | user_request + constraints | PRD/MRD/FRD/原型指引 | `[WAITING_FOR_REQUIREMENTS]` / `[USER_DECISION]` | `04_reference/document_templates/*prd*.md` |
| sop-architecture-design | 设计 | L2 架构设计与技术选型 | prompts/packs/default/skills/sop-architecture-design.md | PRD/MRD + constraints | 架构设计文档 | `[WAITING_FOR_ARCHITECTURE]` / `[USER_DECISION]` | `04_reference/document_templates/architecture_design.md` |
| sop-architecture-reviewer | 设计审查 | L2 架构审查与结论落盘 | prompts/packs/default/skills/sop-architecture-reviewer.md | 架构设计文档 | 审查报告（Pass/Fail） | `[USER_DECISION]` / `[ARCHITECTURE_PASSED]` | `04_reference/interaction_formats/design_review.md` |
| sop-implementation-designer | 实现设计 | 目录级 L3 design.md 设计 | prompts/packs/default/skills/sop-implementation-designer.md | L2 设计 + 目标目录 | design.md | `[WAITING_FOR_DESIGN]` / `[USER_DECISION]` | `04_reference/document_templates/implementation_design.md` |
| sop-test-design-csv | 测试设计 | 基于 L2/L3 生成 CSV 用例 | prompts/packs/default/skills/sop-test-design-csv.md | L2/L3 设计 + 验收标准 | CSV 测试用例 | `[WAITING_FOR_TEST_DESIGN]` / `[USER_DECISION]` | `04_reference/interaction_formats/test_case_csv.md` |
| sop-test-implementation | 测试实现 | 基于 CSV 实现验收测试代码 | prompts/packs/default/skills/sop-test-implementation.md | CSV 用例 + 接口信息 | L1-L4 测试代码 | `[WAITING_FOR_TEST_IMPLEMENTATION]` / `[USER_DECISION]` | `04_reference/review_standards/test_code.standard.md` |
| sop-code-implementation | 实现 | 按 design.md 目录边界改代码 | prompts/packs/default/skills/sop-code-implementation.md | design.md + dir_scope | 代码 Diff + 变更说明 | `[WAITING_FOR_CODE_REVIEW]` / `[DIR_WAITING_DEP]` / `[USER_DECISION]` | `04_reference/interaction_formats/worker_execution_result.md` |
| sop-code-review | 质量 | 基于证据的代码审查（只输出报告） | prompts/packs/default/skills/sop-code-review.md | Diff + 设计依据 | 审查报告 | `[USER_DECISION]` / `[WAITING_FOR_CODE_REVIEW]` | `04_reference/interaction_formats/code_review.md` |
| sop-progress-supervisor | 监管 | 目录并行调度、等待/唤醒、熔断 | prompts/packs/default/skills/sop-progress-supervisor.md | dir_map + statuses | 调度指令/熔断报告 | `[FUSION_TRIGGERED]` / `[USER_DECISION]` | `04_reference/interaction_formats/supervisor_report.md` |
| sop-document-sync | 文档 | 更新索引/导航/CHANGELOG 同步 | prompts/packs/default/skills/sop-document-sync.md | change_set + artifacts | 文档同步变更 | `[USER_DECISION]` | `04_reference/interaction_formats/worker_execution_result.md` |
| sop-fast-path | 路径宏 | 快速路径调用链（编排宏） | prompts/packs/default/skills/sop-fast-path.md | change_request | 调用链与门禁 | `[USER_DECISION]` | `03_workflow/fast_path.md` |
| sop-deep-path | 路径宏 | 深度路径调用链（编排宏） | prompts/packs/default/skills/sop-deep-path.md | change_request | 调用链与门禁 | `[USER_DECISION]` | `03_workflow/deep_path.md` |
| sop-tdd-workflow | 路径宏 | TDD 增强调用链（编排宏） | prompts/packs/default/skills/sop-tdd-workflow.md | deep_path_context | 调用链与门禁 | `[USER_DECISION]` | `05_constraints/acceptance_criteria.md` |
| sop-capability-reuse | 复用 | 先复用→改进→新建→清理 | prompts/packs/default/skills/sop-capability-reuse.md | target + constraints | 复用方案/改造方案 | `[USER_DECISION]` | `04_reference/knowledge_management.md` |
| sop-design-placement | 规约 | design.md 落点与目录策略 | prompts/packs/default/skills/sop-design-placement.md | scope + targets | 落点决策与路径 | `[USER_DECISION]` | `04_reference/design_directory_strategy.md` |

---

## 2. 工作范围（Scope）规则

### 2.1 目录边界（实现类 Skill）

- 仅当存在 `src/**/design.md` 时 → `sop-code-implementation` 与 `sop-test-implementation` **必须**以该 `design.md` 所在目录作为工作边界。
- 禁止跨越边界直接修改其他目录；仅当发现跨目录依赖时 → **必须**进入 `[DIR_WAITING_DEP]` 并交由 `sop-progress-supervisor` 调度。
- 目录边界算法 SSOT：`04_reference/design_directory_strategy.md`。

### 2.2 测试隔离（CSV 与测试代码）

- 仅当处于 TDD/分层验收路径且需要测试资产变更时 → **只能**通过 `sop-test-design-csv` 变更 CSV。
- `sop-test-implementation` **禁止**修改 CSV；只能读取 CSV 并产出测试代码。
- `sop-code-implementation` **禁止**创建/修改 CSV；只能运行测试并根据失败结果修正代码。

---

## 3. Prompt Pack 映射（默认）

- 默认 pack：`prompts/packs/default/`
- 仅当用户指定风格/约束（例如更严格的安全审计/更激进的重构）时 → 允许切换 pack 或覆盖单个 `skills/<skill>.md`。
- Prompt Pack 规范 SSOT：`04_reference/prompt_pack.standard.md`。
