# SOP 简化审查报告

**版本**: v1.0  
**日期**: 2026-02-28  
**审查目标**: 识别过于固定、可由 LLM 自主决策的部分，提出简化建议

---

## 执行摘要

本次审查对整个 SOP 体系进行了全面分析，发现以下关键问题：

### 核心问题
1. **过度规范化的路径选择**：路径判定条件过于机械，LLM 可根据上下文自主判断
2. **冗余的门控检查**：部分门控检查与现有审查机制重复
3. **过于细粒度的状态定义**：部分状态标记可合并或简化
4. **命令字典复杂度**：存在大量场景特定的命令变体，可简化为参数化命令
5. **Skill 边界过于刚性**：部分 Skill 可合并或简化协作流程

### 简化潜力评估
- **高潜力区域**: 路径选择机制、命令字典、状态字典
- **中潜力区域**: 门控检查、Skill 协作流程
- **低潜力区域**: 核心约束、测试独立性、文档分层结构

---

## 1. 路径选择机制简化

### 1.1 当前问题

**现状**：
```yaml
# 当前路径选择矩阵 (command_dictionary.md L202-210)
路径选择矩阵:
  文件数: 1 | 1 | 1-3 | >3
  行数变化: ≤5 | <30 | 30-100 | >100
  接口变更: 无 | 无 | 可界定 | 复杂
  控制流变更: 无 | 无 | 可局部验证 | 复杂
```

**问题**：
- 判定条件过于机械（如"≤5 行"、"<30 行"）
- LLM 完全可以根据变更语义自主判断复杂度
- 4 层路径（极速/快速/轻量深度/标准深度）过于复杂

### 1.2 简化建议

**建议方案**：简化为 2 层路径

```yaml
# 简化后的路径选择
路径选择:
  快速路径:
    条件: "LLM 根据变更语义自主判断"
    特征:
      - "单文件或少量文件（通常 1-3 个）"
      - "逻辑变更简单或无逻辑变更"
      - "影响范围可局部验证"
      - "无复杂依赖关系"
    流程: "sop-code-explorer → sop-code-implementation → sop-code-review → sop-document-sync"
  
  深度路径:
    条件: "不满足快速路径条件"
    特征:
      - "跨多文件/多目录变更"
      - "复杂逻辑变更"
      - "需要需求分析或架构设计"
      - "存在复杂依赖关系"
    流程: "完整深度路径流程（含 TDD 可选）"
  
  决策机制: "LLM 自主判断 + 不确定时 ASK_USER_DECISION"
```

**优势**：
- 减少 LLM 机械判断，提升决策效率
- 路径选择更符合实际工程场景
- 简化状态转移逻辑

**影响范围**：
- 修改：`command_dictionary.md`（路径选择矩阵）
- 修改：`workflow/index.md`（路径选择章节）
- 修改：`state_dictionary.md`（简化路径相关状态）

---

## 2. 命令字典简化

### 2.1 当前问题

**现状**：命令字典包含过多场景特定命令

```yaml
# 当前命令示例（过于细粒度）
CODE_REVIEW(diff, design_refs)
SIMPLIFIED_REVIEW(diff, design_refs)  # 与 CODE_REVIEW 功能重复
PARALLEL_REVIEW(diff, design_refs, focus_1, focus_2)  # 可通过参数实现
SEQUENTIAL_REVIEW(diff, design_refs, prev_report)  # 可通过参数实现
SPECIALIST_REVIEW(diff, design_refs, specialty)  # 可通过参数实现
```

**问题**：
- 命令数量过多（超过 60 个命令）
- 功能重复的命令变体
- 可通过参数化的场景使用了独立命令

### 2.2 简化建议

**建议方案**：参数化命令设计

```yaml
# 简化后的审查命令
CODE_REVIEW(
  diff: string,
  design_refs: path[],
  mode: "standard" | "simplified" | "parallel" | "specialist",
  options: {
    focus_areas?: string[],
    specialty?: "security" | "performance" | "compliance",
    prev_report?: object
  }
) -> review_report: ReviewResult

# 简化后的路径命令
ROUTE(
  task: TaskDescription,
  path_hint?: "fast" | "deep"  # 可选提示，LLM 可自主调整
) -> path: string, call_chain: string[]

# 简化后的门控命令
GATE_CHECK(
  doc: path,
  gate: string,
  auto_fix?: boolean  # 是否自动修复小问题
) -> result: "pass" | "fail"
```

**命令合并清单**：

| 原命令 | 简化为 | 说明 |
|--------|--------|------|
| `SIMPLIFIED_REVIEW` | `CODE_REVIEW(mode="simplified")` | 参数化 |
| `PARALLEL_REVIEW` | `CODE_REVIEW(mode="parallel", options)` | 参数化 |
| `SEQUENTIAL_REVIEW` | `CODE_REVIEW(mode="sequential", options)` | 参数化 |
| `SPECIALIST_REVIEW` | `CODE_REVIEW(mode="specialist", options)` | 参数化 |
| `MERGE_REVIEWS` | `CODE_REVIEW(mode="merge", options)` | 参数化 |
| `TEST_DESIGN_CSV` | `TEST_DESIGN(format="csv")` | 已存在，统一使用 |
| `LIGHT_REQ_ANALYZE` | `REQ_ANALYZE(mode="light")` | 参数化 |
| `LIGHT_IMPL_DESIGN` | `IMPL_DESIGN(mode="light")` | 参数化 |
| `GATE_LEVEL_CHECK` | `GATE_CHECK(level)` | 已存在，统一使用 |
| `MICRO_PATH_CHECK` | `ROUTE(path_hint="micro")` | 参数化 |
| `LIGHT_DEEP_CHECK` | `ROUTE(path_hint="light")` | 参数化 |

**预期效果**：
- 命令数量减少 40%+（60+ → 35-40）
- 命令语义更清晰
- 扩展性更好（新增场景只需加参数）

**影响范围**：
- 修改：`command_dictionary.md`（命令定义）
- 修改：所有 Skill 的 SKILL.md（命令调用）
- 修改：`workflow/index.md`（流程描述）

---

## 3. 状态字典简化

### 3.1 当前问题

**现状**：状态字典包含过多细粒度状态

```yaml
# 当前状态示例（过于细粒度）
[WAITING_FOR_L1_REVIEW]
[WAITING_FOR_L2_REVIEW]
[WAITING_FOR_L3_REVIEW]
[WAITING_FOR_L4_REVIEW]
[WAITING_FOR_ACCEPTANCE_REVIEW]  # 统一状态，与上面 4 个重复

[WAITING_FOR_CODE_REVIEW]
[WAITING_FOR_TEST_IMPLEMENTATION]
[WAITING_FOR_REVIEW]  # 统一状态，与上面 2 个重复

[GATE_REQUIREMENTS]
[GATE_ARCHITECTURE]
[GATE_DESIGN]
[GATE_IMPLEMENTATION]
[GATE_SYNC]
[GATE_FAILED]  # 统一失败状态，与上面 5 个检查点重复
```

**问题**：
- 状态数量过多（70+ 个状态标记）
- 存在多层别名和兼容性状态
- 部分状态可通过参数表达

### 3.2 简化建议

**建议方案**：核心状态 + 参数化

```yaml
# 核心状态（精简至 30 个以内）
## 等待类状态
[WAITING_FOR_REQUIREMENTS]      # 等待需求确认
[WAITING_FOR_ARCHITECTURE]      # 等待架构确认
[WAITING_FOR_DESIGN]            # 等待设计确认
[WAITING_FOR_REVIEW]            # 等待审查（含代码/测试/验收）
  - 参数：review_type: "code" | "test" | "acceptance"
  - 参数：level: "L1" | "L2" | "L3" | "L4"（仅验收审查）
[WAITING_FOR_USER_DECISION]     # 等待用户决策

## 执行类状态
[DIR_WORKING]                   # 目录执行中
[DIR_WAITING_DEP]               # 等待依赖
[DIR_COMPLETED]                 # 目录完成
[DIR_FAILED]                    # 目录失败

## 审查结果状态
[DIFF_APPROVAL]                 # 等待 Diff 审批
[REVIEW_CONFLICT]               # 审查冲突

## 门控状态
[GATE_PASSED]                   # 门控通过
[GATE_FAILED]                   # 门控失败

## 异常状态
[FUSION_TRIGGERED]              # 熔断触发
[CYCLE_DETECTED]                # 循环依赖

## 终态
[已完成]                        # 全流程完成
```

**状态合并清单**：

| 原状态 | 简化为 | 参数 |
|--------|--------|------|
| `[WAITING_FOR_L1_REVIEW]` ~ `[L4]` | `[WAITING_FOR_REVIEW]` | `review_type="acceptance", level="L1-L4"` |
| `[WAITING_FOR_CODE_REVIEW]` | `[WAITING_FOR_REVIEW]` | `review_type="code"` |
| `[WAITING_FOR_TEST_IMPLEMENTATION]` | `[WAITING_FOR_REVIEW]` | `review_type="test"` |
| `[GATE_REQUIREMENTS]` ~ `[GATE_SYNC]` | `[GATE_PASSED]` / `[GATE_FAILED]` | `gate_stage: string` |
| `[ARCHITECTURE_PASSED]` | `[GATE_PASSED]` | `gate_stage="architecture"` |
| `[ARCHITECTURE_FAILED]` | `[GATE_FAILED]` | `gate_stage="architecture"` |
| `[WAITING_FOR_TEST_DESIGN]` | `[WAITING_FOR_DESIGN]` | `design_type="test"` |
| `[WAITING_FOR_CODE_REVIEW]` | `[WAITING_FOR_REVIEW]` | `review_type="code"` |

**优势**：
- 状态数量减少 60%+（70+ → 25-30）
- 状态机更清晰易懂
- 减少状态转移复杂度

**影响范围**：
- 修改：`state_dictionary.md`（状态定义）
- 修改：所有 Skill 的 SKILL.md（状态使用）
- 修改：`workflow/index.md`（状态转移描述）

---

## 4. 门控检查简化

### 4.1 当前问题

**现状**：门控检查与现有审查机制重复

```yaml
# 当前门控检查（workflow/index.md L8-18）
阶段 | 门控检查项
需求阶段 | 需求边界清晰、技术方案对齐、验收标准具体、关键假设确认
架构阶段 | 架构图清晰、接口定义完整、与现有系统无冲突、设计可行
实现设计阶段 | 任务覆盖完整、依赖无循环、每个任务可独立验证
代码实现阶段 | 代码规范、测试通过、文档同步
文档同步阶段 | 需求实现、验收满足、质量达标
```

**问题**：
- 门控检查与各阶段审查内容重复
- 增加流程复杂度
- LLM 可在各阶段审查时自动完成检查

### 4.2 简化建议

**建议方案**：门控检查融入阶段审查

```yaml
# 简化后的门控机制
门控检查:
  原则: "门控检查不作为独立环节，融入各阶段审查"
  
  实现方式:
    - 需求审查：包含需求门控检查项
    - 架构审查：包含架构门控检查项
    - 设计审查：包含设计门控检查项
    - 代码审查：包含代码门控检查项
    - 文档同步：自动验证检查项
  
  失败处理:
    - 审查失败自动触发门控失败流程
    - 不单独设立 [GATE_FAILED] 状态
    - 统一使用审查失败处理机制
  
  检查清单:
    作为各审查模板的附录，不单独设立检查环节
```

**优势**：
- 减少流程环节
- 避免重复检查
- LLM 可自主完成检查

**影响范围**：
- 修改：`workflow/index.md`（门控机制章节）
- 修改：各审查模板（增加检查清单附录）
- 修改：`state_dictionary.md`（门控状态简化）

---

## 5. Skill 协作流程简化

### 5.1 当前问题

**现状**：Skill 边界过于刚性，协作流程复杂

```yaml
# 当前 Skill 协作（过于复杂）
sop-code-explorer → sop-requirement-analyst → sop-architecture-design 
→ sop-architecture-reviewer → sop-implementation-designer 
→ sop-code-explorer → sop-progress-supervisor 
→ sop-code-implementation → sop-code-review → sop-document-sync
```

**问题**：
- Skill 数量过多（17 个）
- 部分 Skill 职责重叠
- 协作流程链条过长

### 5.2 简化建议

**建议方案**：Skill 合并与流程简化

```yaml
# 简化后的 Skill 体系（12 个核心 Skill）
核心 Skill:
  1. sop-workflow-orchestrator    # 编排（不变）
  2. sop-context-manager          # 合并 explorer + capability-reuse
  3. sop-requirement-analyst      # 需求（不变）
  4. sop-architect                # 合并 design + reviewer
  5. sop-implementation-designer  # 实现设计（不变）
  6. sop-code-implementation      # 代码实现（不变）
  7. sop-code-reviewer            # 代码审查（不变）
  8. sop-test-engineer            # 合并 test-design + test-implementation
  9. sop-progress-supervisor      # 进度监管（不变）
  10. sop-document-sync           # 文档同步（不变）
  
路径宏 Skill:
  11. sop-fast-path               # 快速路径（不变）
  12. sop-deep-path               # 深度路径（不变，含 TDD）

合并说明:
  sop-context-manager:
    职责: "代码检索、上下文提取、能力复用"
    合并: "sop-code-explorer + sop-capability-reuse"
  
  sop-architect:
    职责: "架构设计与审查"
    合并: "sop-architecture-design + sop-architecture-reviewer"
    说明: "内部包含设计 - 审查循环，对外表现为单一 Skill"
  
  sop-test-engineer:
    职责: "测试设计与实现"
    合并: "sop-test-design-csv + sop-test-implementation"
    说明: "保持测试独立性，但由同一 Skill 负责全流程"
```

**流程简化**：

```yaml
# 简化后的深度路径
sop-workflow-orchestrator
→ sop-context-manager (如果需要)
→ sop-requirement-analyst
→ sop-architect
→ sop-implementation-designer
→ sop-progress-supervisor
→ sop-code-implementation
→ sop-code-reviewer
→ sop-document-sync

# 简化后的 TDD 路径
sop-deep-path + sop-test-engineer (在实现设计后介入)
```

**优势**：
- Skill 数量减少 30%（17 → 12）
- 协作流程更简洁
- 减少 Skill 加载/卸载开销

**影响范围**：
- 修改：`skill_matrix/index.md`（Skill 矩阵）
- 修改：所有 SKILL.md 文件（合并 Skill）
- 修改：`workflow/index.md`（流程描述）

---

## 6. 设计文档复杂度分级简化

### 6.1 当前问题

**现状**：design.md 复杂度分级过于机械

```yaml
# 当前分级（AGENT_SOP.md L325-330）
复杂度 | 行数 | 要求
低 | <100 | 创建极简 design.md（仅接口契约），快速路径可省略
中 | 100-500 | 简要 design.md+ 接口契约 + 任务清单
高 | >500 | 完整 design.md+ 详细契约 + 全部章节
```

**问题**：
- 以行数判断复杂度不准确
- LLM 可根据变更语义自主判断
- 分级标准过于机械

### 6.2 简化建议

**建议方案**：LLM 自主判断 + 最小设计原则

```yaml
# 简化后的设计文档规则
design.md 规则:
  原则: "最小必要设计 + LLM 自主判断"
  
  决策因素:
    - 变更影响范围（文件数、目录数）
    - 逻辑复杂度（算法、状态机、并发）
    - 依赖关系（跨模块、跨系统）
    - 风险等级（核心业务、安全相关）
  
  设计深度:
    极简设计:
      适用: "单文件、简单逻辑、无依赖"
      内容: "接口契约（如有）+ 关键决策说明"
      可省略: "快速路径下可省略 design.md"
    
    标准设计:
      适用: "跨文件、中等复杂度、有依赖"
      内容: "接口契约 + 任务清单 + 依赖说明"
    
    详细设计:
      适用: "复杂逻辑、高风险、跨系统"
      内容: "完整 design.md 所有章节"
  
  决策机制: "LLM 自主判断 + 不确定时 ASK_USER_DECISION"
```

**优势**：
- 更符合实际工程场景
- 减少机械判断
- 提升 LLM 自主性

**影响范围**：
- 修改：`AGENT_SOP.md`（design.md 规则）
- 修改：`design_guide.md`（设计指南）
- 修改：`implementation_design.md` 模板

---

## 7. 三错即停机制简化

### 7.1 当前问题

**现状**：三错即停机制复杂，计数器管理繁琐

```yaml
# 当前机制（workflow/index.md L167-174）
Strike 1: 同一 Skill 同一步骤失败 → 自动修正
Strike 2: 再失败 → 调用 explorer + 设计类 Skill 复核
Strike 3: 再失败 → 熔断
```

**问题**：
- 计数器管理复杂
- "同一 Skill 同一步骤"判定困难
- 与门控失败机制混淆

### 7.2 简化建议

**建议方案**：简化为失败升级机制

```yaml
# 简化后的失败处理机制
失败处理:
  原则: "快速失败、快速升级、用户决策"
  
  失败分级:
    可恢复失败:
      处理: "自动重试 1 次"
      示例: "语法错误、拼写错误"
    
    设计缺陷:
      处理: "标记设计问题，进入用户决策"
      示例: "设计不可行、依赖缺失"
    
    方向错误:
      处理: "立即熔断，进入用户决策"
      示例: "需求理解错误、架构冲突"
  
  升级机制:
    同一任务连续失败 2 次 → 自动升级到更高级路径
    同一任务连续失败 3 次 → 熔断 + 用户决策
  
  简化措施:
    - 不区分"同一 Skill 同一步骤"
    - 不维护复杂计数器
    - 失败 2 次自动升级路径
    - 失败 3 次直接熔断
```

**优势**：
- 机制更简单直观
- 减少状态管理开销
- LLM 可自主判断失败类型

**影响范围**：
- 修改：`workflow/index.md`（三错即停章节）
- 修改：`state_dictionary.md`（熔断状态简化）
- 修改：`supervisor_report.md`（失败报告格式）

---

## 8. 外部文档保护机制简化

### 8.1 当前问题

**现状**：外部文档保护机制复杂

```yaml
# 当前机制（constraint_matrix.md）
- EXTERNAL_前缀文档：只读，禁止修改
- /docs/参考/目录：仅 sop-document-sync 可写
- 需要 CHECK_EXTERNAL_DOC 命令检测
- 需要 PROTECT_REFERENCE 命令保护
```

**问题**：
- 前缀检测机制复杂
- 命令调用增加开销
- LLM 可自主识别参考文档

### 8.2 简化建议

**建议方案**：约定 + LLM 自主识别

```yaml
# 简化后的外部文档保护
外部文档保护:
  原则: "约定优先 + LLM 自主识别"
  
  保护规则:
    1. 路径约定:
       - `/docs/参考/` 目录下文件默认只读
       - `EXTERNAL_` 前缀文件默认只读
       - LLM 应自主识别并遵守
    
    2. 修改授权:
       - 如需修改，必须通过 ASK_USER_DECISION 获取授权
       - 说明修改原因和影响范围
    
    3. 自动检测:
       - 不设立专门命令检测
       - LLM 在文件操作前自主检查路径
  
  违规处理:
    - 审查阶段发现违规 → 审查失败
    - 故意违规 → 熔断机制
```

**优势**：
- 减少命令调用
- 提升 LLM 自主性
- 简化实现复杂度

**影响范围**：
- 修改：`constraint_matrix.md`（约束矩阵）
- 修改：`command_dictionary.md`（移除检测命令）
- 修改：所有 SKILL.md（移除命令调用）

---

## 9. 临时文件管理简化

### 9.1 当前问题

**现状**：临时文件管理需要专门命令

```yaml
# 当前机制
- CREATE_TEMP_FILE 命令创建临时文件
- CLEANUP_TEMP_FILES 命令清理临时文件
- GET_TEMP_DIR 命令获取临时目录
```

**问题**：
- 命令调用增加开销
- LLM 可自主管理临时文件

### 9.2 简化建议

**建议方案**：约定 + 自主管理

```yaml
# 简化后的临时文件管理
临时文件管理:
  原则: "路径约定 + LLM 自主管理"
  
  管理规则:
    1. 路径约定:
       - 所有临时文件必须创建在 `.temp/` 目录
       - 临时文件不纳入版本控制
       - 任务完成后应清理临时文件
    
    2. 自主管理:
       - LLM 自主创建/清理临时文件
       - 不需要专门命令调用
       - 审查阶段检查临时文件清理情况
  
  违规处理:
    - 在项目目录创建临时文件 → 审查失败
    - 未清理临时文件 → 文档同步前清理
```

**优势**：
- 减少命令调用
- 提升 LLM 自主性
- 简化实现复杂度

**影响范围**：
- 修改：`constraint_matrix.md`（约束矩阵）
- 修改：`command_dictionary.md`（移除临时文件命令）
- 修改：所有 SKILL.md（移除命令调用）

---

## 10. 简化实施路线图

### 10.1 分阶段实施

**阶段 1：核心简化（高优先级）**
- 简化路径选择机制（4 层 → 2 层）
- 简化命令字典（参数化）
- 简化状态字典（核心状态 + 参数）
- 预计减少复杂度：40%

**阶段 2：流程简化（中优先级）**
- 简化门控检查（融入审查）
- 简化 Skill 协作（合并 Skill）
- 简化设计文档分级（LLM 自主）
- 预计减少复杂度：30%

**阶段 3：机制简化（低优先级）**
- 简化三错即停（失败升级）
- 简化外部文档保护（约定 + 自主）
- 简化临时文件管理（约定 + 自主）
- 预计减少复杂度：20%

### 10.2 兼容性处理

**向后兼容**：
- 保留旧状态/命令的兼容性支持（6 个月）
- 提供迁移指南
- 自动转换工具（旧 → 新）

**渐进迁移**：
- 新文档使用新机制
- 旧文档逐步迁移
- 不影响现有流程

---

## 11. 简化效果评估

### 11.1 量化指标

| 指标 | 简化前 | 简化后 | 减少比例 |
|------|--------|--------|----------|
| 路径数量 | 4 层 | 2 层 | 50% |
| 命令数量 | 60+ | 35-40 | 35-40% |
| 状态数量 | 70+ | 25-30 | 60% |
| Skill 数量 | 17 | 12 | 30% |
| 门控检查点 | 5 个独立环节 | 融入审查 | 80% |
| 设计文档分级 | 3 级（机械） | 3 级（自主） | - |

### 11.2 质量影响

**正面影响**：
- ✅ 提升 LLM 自主决策能力
- ✅ 减少机械判断，提升效率
- ✅ 简化流程，降低学习成本
- ✅ 增强灵活性和适应性

**风险控制**：
- ⚠️ 需要 LLM 更强的上下文理解
- ⚠️ 需要更清晰的审查标准
- ⚠️ 需要更好的用户决策支持

**缓解措施**：
- 提供详细的简化指南
- 加强审查标准建设
- 优化用户决策支持机制

---

## 12. 结论与建议

### 12.1 核心结论

1. **SOP 存在过度规范化问题**：大量规则过于机械，LLM 完全可自主决策
2. **简化潜力巨大**：整体复杂度可减少 40-50%
3. **质量风险可控**：通过加强审查标准和用户决策支持，可保证质量

### 12.2 优先建议

**立即实施**（高优先级）：
1. 简化路径选择机制（4 层 → 2 层）
2. 简化命令字典（参数化）
3. 简化状态字典（核心状态 + 参数）

**近期实施**（中优先级）：
1. 简化门控检查（融入审查）
2. 简化 Skill 协作（合并 Skill）

**远期实施**（低优先级）：
1. 简化三错即停（失败升级）
2. 简化外部文档保护（约定 + 自主）

### 12.3 实施建议

1. **渐进式迁移**：不破坏现有流程，逐步迁移
2. **兼容性保障**：保留旧机制支持，提供迁移工具
3. **培训与文档**：提供详细的简化指南和培训
4. **反馈与优化**：收集使用反馈，持续优化

---

## 附录 A：简化前后对比

### A.1 路径选择对比

**简化前**：
```
用户请求 → 机械判断（文件数、行数） → 4 层路径选择 → 执行
```

**简化后**：
```
用户请求 → LLM 语义判断 → 2 层路径选择 → 执行
```

### A.2 命令使用对比

**简化前**：
```
CODE_REVIEW(diff, design_refs)
SIMPLIFIED_REVIEW(diff, design_refs)
PARALLEL_REVIEW(diff, design_refs, focus_1, focus_2)
SPECIALIST_REVIEW(diff, design_refs, specialty)
```

**简化后**：
```
CODE_REVIEW(diff, design_refs, mode="standard")
CODE_REVIEW(diff, design_refs, mode="simplified")
CODE_REVIEW(diff, design_refs, mode="parallel", options={focus_areas})
CODE_REVIEW(diff, design_refs, mode="specialist", options={specialty})
```

### A.3 状态转移对比

**简化前**：
```
[WAITING_FOR_L1_REVIEW] → [WAITING_FOR_L2_REVIEW] → [WAITING_FOR_L3_REVIEW] → [WAITING_FOR_L4_REVIEW]
```

**简化后**：
```
[WAITING_FOR_REVIEW](level="L1") → [WAITING_FOR_REVIEW](level="L2") → 
[WAITING_FOR_REVIEW](level="L3") → [WAITING_FOR_REVIEW](level="L4")
```

---

## 附录 B：迁移指南

### B.1 命令迁移

| 旧命令 | 新命令 | 迁移说明 |
|--------|--------|----------|
| `SIMPLIFIED_REVIEW(a, b)` | `CODE_REVIEW(a, b, mode="simplified")` | 直接替换 |
| `PARALLEL_REVIEW(a, b, c, d)` | `CODE_REVIEW(a, b, mode="parallel", options={focus_areas: [c, d]})` | 参数重组 |
| `SPECIALIST_REVIEW(a, b, c)` | `CODE_REVIEW(a, b, mode="specialist", options={specialty: c})` | 参数重组 |

### B.2 状态迁移

| 旧状态 | 新状态 | 迁移说明 |
|--------|--------|----------|
| `[WAITING_FOR_Lx_REVIEW]` | `[WAITING_FOR_REVIEW](level="Lx")` | 添加参数 |
| `[GATE_XXX]` | `[GATE_PASSED/FAILED](stage="xxx")` | 添加参数 |
| `[ARCHITECTURE_XXX]` | `[GATE_XXX](stage="architecture")` | 合并 |

### B.3 Skill 迁移

| 旧 Skill | 新 Skill | 迁移说明 |
|----------|----------|----------|
| `sop-code-explorer` | `sop-context-manager` | 合并 |
| `sop-capability-reuse` | `sop-context-manager` | 合并 |
| `sop-architecture-design` | `sop-architect` | 合并 |
| `sop-architecture-reviewer` | `sop-architect` | 合并 |
| `sop-test-design-csv` | `sop-test-engineer` | 合并 |
| `sop-test-implementation` | `sop-test-engineer` | 合并 |

---

**文档结束**
