---
version: v2.11.0
updated: 2026-02-25
scope: docs/参考/sop
---

# SOP 命令字典（Command DSL）

目的：用最少 token 表达 SOP 步骤；流程文档优先用“命令序列”替代叙述。

---

## 语法

- 单条命令：`CMD <NAME>(<args>) -> <out> | pre:<STATE> | post:<STATE>`
- 命令序列：`CMD A -> CMD B -> CMD C`
- 状态标记以 05_constraints/state_dictionary.md 为准。

---

## 类型定义

### 基础类型

| 类型名 | 描述 | 示例 |
|--------|------|------|
| `string` | 字符串 | `"user request"` |
| `string[]` | 字符串数组 | `["file1.ts", "file2.ts"]` |
| `object` | 对象 | `{key: "value"}` |
| `boolean` | 布尔值 | `true` / `false` |
| `int` | 整数 | `30` |
| `path` | 文件路径 | `"src/utils/helper.ts"` |

### 复合类型

#### TaskDescription
```yaml
TaskDescription:
  description: "任务描述对象"
  properties:
    description: { type: "string", required: true, description: "任务描述" }
    scope: { type: "string[]", required: false, default: [], description: "变更范围（文件列表）" }
    constraints: { type: "string[]", required: false, default: [], description: "约束条件" }
```

#### ChangeScope
```yaml
ChangeScope:
  description: "变更范围"
  format: "string[] (file paths)"
  example: ["src/utils/helper.ts", "tests/unit/helper.test.ts"]
```

#### ReviewResult
```yaml
ReviewResult:
  description: "审查结果"
  properties:
    status: { type: "string", enum: ["pass", "fail", "deadlock"], required: true }
    issues: { type: "object[]", required: false, default: [] }
    suggestions: { type: "string[]", required: false, default: [] }
```

#### AuditReport
```yaml
AuditReport:
  description: "审计报告"
  properties:
    scope: { type: "ChangeScope", required: true }
    impact: { type: "string", required: true }
    dependencies: { type: "string[]", required: false, default: [] }
    risks: { type: "string[]", required: false, default: [] }
```

---

## 命令

### 分诊/审计

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `ROUTE(task: TaskDescription)` | sop-workflow-orchestrator | task: TaskDescription | path: string, call_chain: string[] | - | - |
| `FAST_PATH_CHECK(change: ChangeScope)` | sop-workflow-orchestrator | change: ChangeScope | result: "allow"\|"spec_upgrade"\|"deep_path" | - | - |
| `TDD_CHECK(scope: ChangeScope)` | sop-workflow-orchestrator | scope: ChangeScope | result: "on"\|"off" | - | - |
| `AUDIT(scope: ChangeScope)` | sop-code-explorer | scope: ChangeScope | audit_report: AuditReport | - | - |
| `LIST_DESIGN_MD(root: path)` | sop-code-explorer | root: path | design_list: {path: path, depth: int}[] | - | - |
| `TRACE_SOURCES(inputs: (path\|string)[])` | 任意 | inputs: (path\|string)[] | source_dependency: object | - | - |
| `RECORD_DECISION(topic: string, decision: string)` | 任意 | topic: string, decision: string | decision_record: path | - | - |

### 极速路径（Micro Path）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `MICRO_PATH_CHECK(change: ChangeScope)` | sop-workflow-orchestrator | change: ChangeScope | result: "allow"\|"upgrade_fast"\|"upgrade_deep" | - | - |
| `DIRECT_EXECUTE(file: path, change: object)` | sop-code-implementation | file: path, change: object | code_changes: object | - | `[AUTO_VERIFY]` |
| `AUTO_VERIFY(files: path[])` | sop-code-implementation | files: path[] | verify_result: object | `[AUTO_VERIFY]` | `[AUTO_SYNC]` / `[DIR_WORKING]` |
| `AUTO_SYNC(files: path[])` | sop-document-sync | files: path[] | sync_result: object | `[AUTO_SYNC]` | `[已完成]` |

**极速路径判定条件**：

```yaml
micro_path_conditions:
  all_must_be_true:
    - condition: "单文件修改"
      check: "file_count == 1"
    - condition: "行数变化 ≤ 5行"
      check: "delta_lines <= 5"
    - condition: "仅涉及格式/注释/命名调整"
      check: "change_type in ['format', 'comment', 'rename']"
    - condition: "无测试依赖"
      check: "test_required == false"
    - condition: "无文档依赖"
      check: "doc_required == false"

  execution_flow: |
    [DIRECT_EXECUTE] → EXECUTE() → [AUTO_VERIFY]
                                    ↓
                              lint + 语法检查
                                    ↓
                              [AUTO_SYNC] → 仅更新索引 → [已完成]

  state_transitions: |
    [DIRECT_EXECUTE] → EXECUTE() → [AUTO_VERIFY] → [AUTO_SYNC] → [已完成]

  upgrade_conditions:
    - condition: "检测到隐藏的接口依赖"
      action: "升级到快速路径"
    - condition: "变更影响超出预估范围"
      action: "升级到快速路径或深度路径"
    - condition: "发现需要用户决策的点"
      action: "进入[USER_DECISION]"
```

### 轻量深度路径（Light Deep Path）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `LIGHT_DEEP_CHECK(change: ChangeScope)` | sop-workflow-orchestrator | change: ChangeScope | result: "allow"\|"upgrade_deep" | - | - |
| `LIGHT_REQ_ANALYZE(input: string)` | sop-requirement-analyst | input: string | light_prd: path | - | `[WAITING_FOR_REQUIREMENTS]` |
| `LIGHT_IMPL_DESIGN(scope: ChangeScope, constraints: string[])` | sop-implementation-designer | scope, constraints | light_design: path | - | `[WAITING_FOR_DESIGN]` |
| `SIMPLIFIED_REVIEW(diff: string, design_refs: path[])` | sop-code-review | diff, design_refs | review_report: ReviewResult | `[WAITING_FOR_CODE_REVIEW]` | `[DIFF_APPROVAL]` / `[DIR_WORKING]` |

**轻量深度路径判定条件**：

```yaml
light_deep_path_conditions:
  any_must_be_true:
    - condition: "跨文件修改（但影响范围可界定）"
      check: "file_count > 1 and file_count <= 3"
    - condition: "行数变化 30-100行"
      check: "delta_lines >= 30 and delta_lines <= 100"
    - condition: "存在接口变更（但影响范围可界定）"
      check: "interface_change == true and impact_scope == 'defined'"
    - condition: "存在逻辑变更（但可局部验证）"
      check: "logic_change == true and local_verify == true"

  execution_flow: |
    sop-requirement-analyst (轻量版)
        ↓
    sop-implementation-designer (轻量版)
        ↓
    sop-code-implementation
        ↓
    sop-code-review (简化审查)
        ↓
    sop-document-sync

  light_version_features:
    requirement:
      - 简化模板（仅核心需求点）
      - 不要求完整文档产出
      - 支持单轮快速确认
    design:
      - 简化设计文档
      - 仅关注变更影响范围
      - 快速确认流程
    review:
      - 简化审查清单
      - 聚焦变更区域
      - 快速反馈

  state_transitions: |
    [ROUTE_LIGHT_DEEP] → LIGHT_REQ_ANALYZE() → [WAITING_FOR_REQUIREMENTS]
                     → LIGHT_IMPL_DESIGN() → [WAITING_FOR_DESIGN]
                     → IMPLEMENT() → [WAITING_FOR_CODE_REVIEW]
                     → SIMPLIFIED_REVIEW() → [DIFF_APPROVAL]
                     → DOC_SYNC() → [已完成]

  upgrade_conditions:
    - condition: "检测到复杂依赖关系"
      action: "升级到标准深度路径"
    - condition: "影响范围超出预估"
      action: "升级到标准深度路径"
    - condition: "需要完整架构设计"
      action: "升级到标准深度路径"
```

### 路径选择矩阵

| 条件 | 极速路径 | 快速路径 | 轻量深度路径 | 标准深度路径 |
|------|----------|----------|--------------|--------------|
| 文件数 | 1 | 1 | 1-3 | >3 |
| 行数变化 | ≤5 | <30 | 30-100 | >100 |
| 接口变更 | 无 | 无 | 可界定 | 复杂 |
| 控制流变更 | 无 | 无 | 可局部验证 | 复杂 |
| 测试需求 | 无 | 必须 | 必须 | 必须 |
| 审查要求 | 自动验证 | 完整审查 | 简化审查 | 完整审查 |

### 需求（L1-L3）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `REQ_ANALYZE(input: string)` | sop-requirement-analyst | user_input: string | doc_path: path (PRD/MRD/FRD) | - | `[WAITING_FOR_REQUIREMENTS]` |
| `REQ_CONFIRM()` | 用户 | - | result: "approved"\|"revise" | `[WAITING_FOR_REQUIREMENTS]` | - |

### 架构（L2）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `ARCH_DESIGN(prd: path)` | sop-architecture-design | prd: path | L2_arch: path, ADR_refs: path[] | - | `[WAITING_FOR_ARCHITECTURE]` |
| `ARCH_REVIEW(l2: path)` | sop-architecture-reviewer | l2: path | review_report: ReviewResult | `[WAITING_FOR_ARCHITECTURE]` | `[ARCHITECTURE_PASSED]` / `[ARCHITECTURE_FAILED]` |
| `ARCH_REPAIR(reason: string)` | sop-architecture-design | reason: string | repair_report: object | `[ARCHITECTURE_FAILED]` | `[WAITING_FOR_ARCHITECTURE]` |
| `ARCH_ROLLBACK(reason: string)` | sop-architecture-design | reason: string | rollback_report: object | `[ARCHITECTURE_FAILED]` | `[WAITING_FOR_REQUIREMENTS]` |

### 实现设计（L3 / 目录）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `IMPL_DESIGN(l2: path, dir: path)` | sop-implementation-designer | l2: path, dir: path | design_md: path | `[ARCHITECTURE_PASSED]` | `[WAITING_FOR_DESIGN]` |
| `DESIGN_CONFIRM()` | 用户 | - | result: "approved"\|"revise" | `[WAITING_FOR_DESIGN]` | - |

### 调度（目录并行）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `DIR_SCOPE(dir_with_design_md: path)` | sop-code-implementation | dir: path | scope: ChangeScope | - | - |
| `SCHEDULE_DIRS(design_list: path[])` | sop-progress-supervisor | design_list: path[] | dir_map: object | - | `[SCHEDULING]` |
| `RUN_DIR_BATCH(depth_desc: string)` | sop-progress-supervisor | depth_desc: string | started_scopes: ChangeScope[] | `[SCHEDULING]` | `[DIR_WORKING]` |
| `WAIT_DEP(dir: path, deps: path[])` | sop-code-implementation | dir: path, deps: path[] | waiting: boolean | - | `[DIR_WAITING_DEP]` |
| `COMPLETE_DIR(dir: path)` | sop-code-implementation | dir: path | done: boolean | - | `[DIR_COMPLETED]` |

### 实现（代码）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `IMPLEMENT(dir: path, design: path)` | sop-code-implementation | dir: path, design: path | code_changes: object | - | `[WAITING_FOR_CODE_REVIEW]` |
| `REQUEST_CROSS_DIR(dir: path, target_dir: path, change: object)` | sop-code-implementation | dir: path, target_dir: path, change: object | appended_request: boolean | - | `[DIR_WAITING_DEP]` |

### 代码审查

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `CODE_REVIEW(diff: string, design_refs: path[])` | sop-code-review | diff: string, design_refs: path[] | review_report: ReviewResult | `[WAITING_FOR_CODE_REVIEW]` / `[WAITING_FOR_TEST_IMPLEMENTATION]` | `[DIFF_APPROVAL]`(通过) / `[DIR_WORKING]`（需修改） / `[USER_DECISION]`（僵局或>=3轮） |

### 第二意见审查（Second Opinion Review）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `PARALLEL_REVIEW(diff: string, design_refs: path[], focus_1: string, focus_2: string)` | sop-code-review | diff, design_refs, focus_1, focus_2 | parallel_reports: object | `[WAITING_FOR_CODE_REVIEW]` | `[DIFF_APPROVAL]` / `[REVIEW_CONFLICT]` |
| `SEQUENTIAL_REVIEW(diff: string, design_refs: path[], prev_report: object)` | sop-code-review | diff, design_refs, prev_report | combined_report: object | 主审完成 | `[DIFF_APPROVAL]` |
| `SPECIALIST_REVIEW(diff: string, design_refs: path[], specialty: string)` | sop-code-review | diff, design_refs, specialty: "security"\|"performance"\|"compliance" | specialist_report: object | 主审完成 | `[DIFF_APPROVAL]` |
| `MERGE_REVIEWS(report_1: object, report_2: object)` | sop-code-review | report_1, report_2 | merged_report: object | 多审完成 | `[DIFF_APPROVAL]` / `[REVIEW_CONFLICT]` |
| `RESOLVE_CONFLICT(conflict_report: object, resolution: string)` | sop-code-review | conflict_report, resolution | resolved_report: object | `[REVIEW_CONFLICT]` | `[DIFF_APPROVAL]` |

**第二意见审查模式说明**：

```yaml
# 模式A：并行双审
parallel_review:
  flow: |
    sop-code-implementation → [WAITING_FOR_CODE_REVIEW]
                             ↓
                   ┌─────────┴─────────┐
                   ↓                   ↓
           审查流1 (主审)        审查流2 (第二意见)
           focus:               focus:
           - 设计一致性          - 安全性
           - 正确性              - 性能风险
           - 测试覆盖            - 架构合规
                   ↓                   ↓
                   └─────────┬─────────┘
                             ↓
                   [审查对比报告] → [DIFF_APPROVAL]

# 模式B：顺序复核
sequential_review:
  flow: |
    sop-code-review (主审) → 审查报告v1
                               ↓
               sop-code-review (复核) → 审查报告v2
                                             ↓
                               [综合审查结论] → [DIFF_APPROVAL]

# 模式C：专项审查
specialist_review:
  specialties:
    - security: ["认证与授权", "输入验证", "敏感数据", "依赖安全"]
    - performance: ["算法复杂度", "数据库查询", "资源使用", "并发安全"]
    - compliance: ["许可证合规", "数据合规", "API合规"]

# 触发条件
auto_trigger:
  - condition: "变更涉及认证/授权模块"
    mode: "specialist_review"
    specialty: "security"
  - condition: "变更涉及数据库查询"
    mode: "specialist_review"
    specialty: "performance"
  - condition: "变更文件数超过10个"
    mode: "parallel_review"
  - condition: "架构审查标记为高风险"
    mode: "parallel_review"
```

### 测试（分层验收 / 可选 TDD）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `TEST_DESIGN_CSV(design: path, criteria: string[])` | sop-test-design-csv | design: path, criteria: string[] | test_cases_csv: path | - | `[WAITING_FOR_TEST_DESIGN]` |
| `TEST_DESIGN(design: path, format: string = "csv")` | sop-test-design-csv | design: path, format: string (default: "csv") | test_cases: path | - | `[WAITING_FOR_TEST_DESIGN]` |
| `TEST_IMPLEMENT(csv: path, design_refs: path[])` | sop-test-implementation | csv: path, design_refs: path[] | test_code: path | - | `[WAITING_FOR_TEST_IMPLEMENTATION]` |
| `RUN_ACCEPTANCE(level: "L1"\|"L2"\|"L3"\|"L4")` | sop-code-implementation | level: "L1"\|"L2"\|"L3"\|"L4" | test_result: object | - | `[WAITING_FOR_ACCEPTANCE_REVIEW]` / `[DIFF_APPROVAL]` |
| `REVIEW_ACCEPTANCE(level: "L1"\|"L2"\|"L3"\|"L4")` | sop-code-review | level: "L1"\|"L2"\|"L3"\|"L4" | result: "pass"\|"fail"\|"deadlock" | `[WAITING_FOR_ACCEPTANCE_REVIEW]` | `pass:- / fail:[DIR_WORKING] / deadlock:[USER_DECISION]` |

### 文档维护

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `DOC_SYNC(scope: ChangeScope)` | sop-document-sync | scope: ChangeScope | updated_docs: path[] | - | `[已完成]` |

### 治理

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `STRIKE(record: object)` | sop-progress-supervisor | record: object | strike_count: int | - | - |
| `FUSE(reason: string)` | sop-progress-supervisor | reason: string | report: object | - | `[FUSION_TRIGGERED]` |
| `ASK_USER_DECISION(topic: string, options: string[])` | 任意→用户 | topic: string, options: string[] | decision: string | `[USER_DECISION]` | - |
| `GATE_CHECK(doc: path, gate: string)` | 各阶段Skill | doc: path, gate: string | result: "pass"\|"fail" | - | `[GATE_PASSED]` / `[GATE_FAILED]` |
| `GATE_RETRY(fix_description: string)` | sop-code-implementation | fix_description: string | retry_result: object | `[GATE_FAILED]` | 重新执行门控检查 |
| `GATE_ROLLBACK(reason: string)` | sop-code-implementation | reason: string | rollback_report: object | `[GATE_FAILED]` | 回滚到上一阶段 |
| `DIR_RETRY()` | sop-code-implementation | - | retry_result: object | `[DIR_FAILED]` | 重新执行当前目录 |
| `DIR_SKIP(reason: string)` | sop-progress-supervisor | reason: string | skip_report: object | `[DIR_FAILED]` | 跳过当前目录 |
| `FUSION_RESET()` | sop-progress-supervisor | - | reset_result: object | `[FUSION_TRIGGERED]` | 重置熔断计数器 |
| `BREAK_CYCLE(point: string)` | sop-progress-supervisor | point: string | break_result: object | `[CYCLE_DETECTED]` | 打破循环依赖 |
| `MANUAL_INTERVENTION()` | sop-progress-supervisor | - | wait_status: string | `[FUSION_TRIGGERED]` / `[CYCLE_DETECTED]` | 等待人工处理 |

### 任务管理

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `TASK_START(task_id: string)` | sop-code-implementation | task_id: string | task_status: "[-]" | - | `[-]` (进行中) |
| `TASK_COMPLETE(task_id: string)` | sop-code-implementation | task_id: string | task_status: "[x]" | 验证通过 | `[x]` (已完成) |
| `TASK_BLOCK(task_id: string, reason: string)` | sop-code-implementation | task_id: string, reason: string | task_status: "[!]" | - | `[!]` (已阻塞) |
| `TASK_UNBLOCK(task_id: string)` | sop-code-implementation | task_id: string | task_status: "[-]" | 依赖解决 | `[-]` (进行中) |
| `TASK_ARCHIVE(dir: path)` | sop-document-sync | dir: path | archived_tasks: path[] | `[DIR_COMPLETED]` | 归档清单更新 |
| `TASK_SPEC_CREATE(dir: path, spec_name: string)` | sop-implementation-designer | dir: path, spec_name: string | spec_md: path, tasks_md: path, checklist_md: path | - | `[WAITING_FOR_DESIGN]` |
| `TASK_SPEC_SYNC(dir: path)` | sop-code-implementation | dir: path | updated_tasks_md: path | 任务状态变更 | - |

### 调度增强

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `CYCLE_CHECK(design_list: path[])` | sop-progress-supervisor | design_list: path[] | cycle_report: object | - | `[CYCLE_DETECTED]` / 通过 |
| `ITERATION_COUNT(state: string)` | sop-progress-supervisor | state: string | iteration_count: int | - | - |
| `ITERATION_RESET(state: string)` | sop-progress-supervisor | state: string | reset: boolean | 用户决策 | - |

### Skills分层加载

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `LOAD_SKILL(skill_name: string, reason: string)` | sop-workflow-orchestrator | skill_name: string, reason: string | load_result: object | - | `[SKILL_LOADED]` |
| `UNLOAD_SKILL(skill_name: string)` | sop-workflow-orchestrator | skill_name: string | unload_result: object | - | - |
| `CONTEXT_STATUS()` | sop-workflow-orchestrator | - | context_report: object | - | - |
| `CHECK_DEPENDENCIES()` | sop-workflow-orchestrator | - | dep_report: object | - | - |

**Skills分层加载说明**：

```yaml
# 第一层：核心Skills（Always Loaded）
tier_1_skills:
  - sop-workflow-orchestrator
  - sop-code-explorer
  - sop-progress-supervisor
  - sop-code-review

# 第二层：阶段Skills（Context-Dependent）
tier_2_skills:
  need_analysis: ["sop-requirement-analyst"]
  architecture: ["sop-architecture-design", "sop-architecture-reviewer"]
  implementation_design: ["sop-implementation-designer"]
  code_implementation: ["sop-code-implementation"]
  test: ["sop-test-design-csv", "sop-test-implementation"]
  document: ["sop-document-sync"]

# 第三层：增强Skills（On-Demand）
tier_3_skills:
  - sop-capability-reuse
  - sop-design-placement
  - sop-fast-path
  - sop-deep-path
  - sop-tdd-workflow
```

### 指标采集（Metrics Collection）

| CMD | 主体（Skill/用户） | args | out | pre | post |
|---|---|---|---|---|---|
| `RECORD_METRIC(metric_name: string, value: object, tags: object)` | sop-progress-supervisor | metric_name, value, tags | metric_id: string | - | - |
| `GET_METRICS(metric_names: string[], period: string)` | sop-progress-supervisor | metric_names, period | metrics_report: object | - | - |
| `GENERATE_HEALTH_REPORT()` | sop-progress-supervisor | - | health_report: object | - | - |
| `CHECK_ALERTS()` | sop-progress-supervisor | - | alerts: object[] | - | - |

**指标采集机制说明**：

```yaml
# 阶段级指标
stage_metrics:
  - name: "stage_execution_time"
    description: "从进入状态到离开状态的耗时"
    collection: "状态机timestamp记录"
    purpose: "识别慢阶段"
  
  - name: "stage_wait_time"
    description: "从上一阶段完成到本阶段开始的等待"
    collection: "状态机timestamp记录"
    purpose: "识别人工等待"
  
  - name: "stage_pass_rate"
    description: "首次执行即通过的比例"
    collection: "状态机状态计数"
    purpose: "评估阶段难度"
  
  - name: "stage_retry_rate"
    description: "需要重试执行的比例"
    collection: "状态转移计数"
    purpose: "识别问题阶段"

# Skill级指标
skill_metrics:
  - name: "skill_call_frequency"
    description: "单位时间内被调用的次数"
    collection: "日志计数"
    purpose: "识别高频Skills"
  
  - name: "skill_execution_time"
    description: "单次执行的平均耗时"
    collection: "计时器"
    purpose: "评估Skill效率"
  
  - name: "skill_failure_rate"
    description: "执行失败的比例"
    collection: "结果状态统计"
    purpose: "识别问题Skills"
  
  - name: "skill_output_rate"
    description: "按时产出交付物的比例"
    collection: "交付物检查"
    purpose: "评估Skill可靠性"

# 路径级指标
path_metrics:
  - name: "path_selection_distribution"
    description: "各路径被选择的次数"
    collection: "路径决策日志"
    purpose: "评估路径适用性"
  
  - name: "path_upgrade_rate"
    description: "执行中升级到更高级路径的比例"
    collection: "升级事件统计"
    purpose: "评估路径选择准确性"
  
  - name: "path_total_time"
    description: "从入口到完成的完整耗时"
    collection: "入口-出口timestamp"
    purpose: "评估整体效率"

# 事件日志格式
event_log_format:
  event_id: "evt_001"
  event_type: "PATH_UPGRADE | STAGE_COMPLETE | SKILL_CALL | ERROR"
  timestamp: "2026-02-25T10:30:00Z"
  session_id: "ses_xxx"
  data:
    from_path: "fast"
    to_path: "deep"
    trigger: "检测到跨文件依赖"

# 告警规则
alert_rules:
  - name: "execution_timeout"
    condition: "单阶段执行超过2小时"
    level: "warning"
    action: "检查是否卡住"
  
  - name: "fusion_triggered"
    condition: "发生熔断事件"
    level: "critical"
    action: "立即处理"
  
  - name: "review_failure"
    condition: "连续3次审查不通过"
    level: "warning"
    action: "检查设计质量"
  
  - name: "path_frequent_upgrade"
    condition: "周升级率超过30%"
    level: "warning"
    action: "优化路径选择"
  
  - name: "user_decision_backlog"
    condition: "等待超过1小时"
    level: "info"
    action: "提醒用户"
```
