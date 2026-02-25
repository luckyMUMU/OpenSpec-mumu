# SOP 体系改进实施计划

## 文档概述

本文档基于健康检查报告（health_check_report.md）、优化提案（sop_optimization_proposal.md）以及现有SOP优化建议（sop_existing_optimization.md），制定综合改进方案。改进目标是在保持SOP核心设计理念（设计先行、状态机驱动、产出可验证）的基础上，解决已识别问题并引入优化机制。

---

## 一、问题与优化映射关系

### 1.1 优化方向与问题对应

| 优化方向 | 解决的问题 | 新增能力 |
|----------|-----------|----------|
| Skills机制增强 | S1(门控状态未集成)、M1(层级未标注)、M12(层级定位争议) | 分层加载、动态激活、上下文优化 |
| 第二意见审查模式 | M7(审查失败处理路径)、M8(架构评估标准) | 并行双审、专项审查、冲突整合 |
| 快速路径分层 | S3(测试阶段未集成)、S4(停止点不一致)、M4-M5(快速路径一致性) | 极速路径、轻量深度路径、动态升级 |
| 监控与度量体系 | S5(异常恢复路径)、M9(依赖唤醒)、M10(用户决策退出) | 指标采集、告警机制、健康报告 |
| 状态机优化 | O1(状态冗余)、O2(状态转移简化)、O3(检查点粒度) | 精简状态机、伪状态规范化、检查点合并 |
| 命令字典优化 | O4(命名一致性)、O5(参数标准化)、O6(命令冗余) | 统一命名规范、类型定义、命令合并 |
| 文档组织优化 | O7(模板冗余)、O8(导航困难)、O9(引用不一致) | 模板清理、分层导航、术语对照 |
| 技能边界优化 | O10(职责重叠)、O11(粒度不一致)、O12(版本同步) | 边界说明、粒度指导、依赖声明 |
| 流程效率优化 | O13(门控成本)、O14(审查循环)、O15(文档同步) | 分级门控、增量审查、同步拆分 |
| 错误处理优化 | O16(失败覆盖)、O17(三错即停)、O18(冲突检测) | 失败处理规范、熔断恢复、冲突解决 |
| 渐进披露优化 | O19(L1入口)、O20(L2矩阵)、O21(L3文档) | 精简入口、可视化矩阵、快速查阅 |

> 注：S/M开头的问题来自health_check_report.md，O开头的问题来自sop_existing_optimization.md

### 1.2 优先级矩阵

```
┌─────────────────────────────────────────────────────────┐
│                    影响范围                              │
│           高                              低            │
│    ┌─────────────────┐           ┌─────────────────┐   │
│ 高 │ S1 门控状态集成  │           │ S2 孤立状态处理  │   │
│    │ S5 异常恢复路径  │           │ O3 检查点粒度    │   │
│    │ O4 命令命名统一  │           │ L2 历史别名清理  │   │
│ 实 ├─────────────────┤           ├─────────────────┤   │
│ 施 │ M1 层级标注      │           │ O18 冲突检测    │   │
│ 复 │ M10 决策退出路径│           │ O7 模板重叠     │   │
│ 杂 │ O13 门控分级    │           │ O21 L3文档优化  │   │
│ 度 │ S4 停止点统一    │           │ O9 引用一致性   │   │
│    └─────────────────┘           └─────────────────┘   │
│                         低                              │
└─────────────────────────────────────────────────────────┘
```

---

## 二、Skills机制增强方案

### 2.1 问题修复

#### S1: 门控状态集成到SKILL流程

**现状**：状态字典定义了完整的门控机制（GATE_REQUIREMENTS ~ GATE_SYNC），但SKILL.md中未实际使用。

**修复方案**：

1. **在状态字典中新增门控状态转移规则**：

```markdown
| 状态 | 触发者 | 含义 | 后续动作 |
|------|--------|------|----------|
| `[GATE_REQUIREMENTS]` | sop-requirement-analyst | 需求门控检查 | 通过→[WAITING_FOR_REQUIREMENTS]，失败→[GATE_FAILED] |
| `[GATE_ARCHITECTURE]` | sop-architecture-design |检查 | 通过→ 架构门控[WAITING_FOR_ARCHITECTURE]，失败→[GATE_FAILED] |
| `[GATE_DESIGN]` | sop-implementation-designer | 设计门控检查 | 通过→[WAITING_FOR_DESIGN]，失败→[GATE_FAILED] |
| `[GATE_IMPLEMENTATION]` | sop-code-implementation | 实现门控检查 | 通过→[WAITING_FOR_CODE_REVIEW]，失败→[GATE_FAILED] |
| `[GATE_SYNC]` | sop-document-sync | 同步门控检查 | 通过→[已完成]，失败→[GATE_FAILED] |
```

2. **在SKILL.md中添加门控检查步骤**：

```yaml
# sop-requirement-analyst/SKILL.md 示例
workflow_steps:
  - step: 1
    action: "需求分析与文档编写"
    cmd: "ANALYZE_REQUIREMENTS(user_request, constraints)"
    output: "PRD/MRD/FRD草稿"
  
  - step: 2
    action: "门控检查"
    cmd: "GATE_CHECK(requirements_doc, gate='GATE_REQUIREMENTS')"
    on_pass: "[WAITING_FOR_REQUIREMENTS]"
    on_fail: "[GATE_FAILED]"
```

3. **定义门控失败标准处理流程**：

```markdown
[GATE_FAILED] → ASK_USER_DECISION("门控检查失败", [
  "修复后重试",
  "回滚到上一阶段",
  "终止任务"
])
```

#### M1: SKILL.md层级标注

**现状**：所有17个SKILL.md未明确标注层级属性。

**修复方案**：在所有SKILL.md的frontmatter添加层级字段：

```yaml
---
name: "sop-code-implementation"
version: "v2.9.0"
layer: "实现"  # 编排 | 需求 | 设计 | 实现设计 | 实现 | 测试 | 文档 | 工具 | 路径宏
---
```

**层级分类**：

| 层级 | Skills |
|------|--------|
| 编排 | sop-workflow-orchestrator, sop-code-explorer, sop-progress-supervisor |
| 需求 | sop-requirement-analyst |
| 设计 | sop-architecture-design, sop-architecture-reviewer, sop-implementation-designer |
| 实现 | sop-code-implementation |
| 测试 | sop-test-design-csv, sop-test-implementation |
| 文档 | sop-document-sync |
| 质量 | sop-code-review |
| 路径宏 | sop-fast-path, sop-deep-path, sop-tdd-workflow |
| 复用 | sop-capability-reuse, sop-design-placement |

#### M12: sop-code-explorer层级定位

**现状**：矩阵归类为"编排"，实际职责更符合"工具层"。

**修复方案**：保持"编排"分类，但在SKILL.md中明确说明其双重职责：

```yaml
---
name: "sop-code-explorer"
layer: "编排"
layer_note: "虽具备工具层能力（检索/审计），但主要职责是编排上下文提取流程"
---
```

### 2.2 新增能力：分层加载机制

#### 2.2.1 Skill分层定义

**第一层：核心Skills（Always Loaded）**

| Skill | 加载原因 | 上下文估算 |
|-------|----------|-----------|
| sop-workflow-orchestrator | 路径选择与编排 | 1500 tokens |
| sop-code-explorer | 代码库检索基础能力 | 2000 tokens |
| sop-progress-supervisor | 目录调度与状态管理 | 1500 tokens |
| sop-code-review | 审查是必经环节 | 2000 tokens |

**第二层：阶段Skills（Context-Dependent）**

| 阶段 | Skills | 加载触发状态 |
|------|--------|-------------|
| 需求阶段 | sop-requirement-analyst | `[ROUTE_DEEP]` |
| 架构阶段 | sop-architecture-design, sop-architecture-reviewer | `[WAITING_FOR_REQUIREMENTS]` + 确认 |
| 实现设计阶段 | sop-implementation-designer | `[ARCHITECTURE_PASSED]` |
| 代码实现阶段 | sop-code-implementation | `[WAITING_FOR_DESIGN]` + 确认 |
| 测试阶段 | sop-test-design-csv, sop-test-implementation | TDD路径或测试需求 |
| 文档阶段 | sop-document-sync | `[ALL_COMPLETED]` |

**第三层：增强Skills（On-Demand）**

| Skill | 触发条件 |
|-------|----------|
| sop-capability-reuse | 检测到可复用组件 |
| sop-design-placement | 复杂目录结构决策 |
| sop-fast-path | 快速路径选择 |
| sop-deep-path | 深度路径选择 |
| sop-tdd-workflow | TDD路径选择 |

#### 2.2.2 SKILL.md结构扩展

```yaml
---
name: "sop-code-implementation"
version: "v2.9.0"
layer: "实现"

# 加载策略
load_policy:
  tier: 2  # 1=核心, 2=阶段, 3=增强
  auto_load_states: ["[WAITING_FOR_DESIGN]"]
  depends_on: ["sop-code-explorer", "sop-implementation-designer"]

# 资源需求
resources:
  required:
    - path: "04_reference/interaction_formats/worker_execution_result.md"
      purpose: "输出模板"
    - path: "05_constraints/coding_principles.md"
      purpose: "编码规范依据"
  optional:
    - path: "04_reference/design_guide.md"
      purpose: "设计指南参考"
      when: "遇到复杂目录结构"

# 上下文估算
context_estimate:
  base_tokens: 2000
  per_file_tokens: 500
  max_context_warning: 8000
---
```

#### 2.2.3 新增命令

**CMD: LOAD_SKILL(skill_name, reason)**

```markdown
显式加载指定Skill并记录加载原因。

示例：
CMD: LOAD_SKILL(sop-security-reviewer, "检测到敏感数据处理代码")
→ 加载安全审查Skill及相关资源
→ 更新上下文状态
→ 继续执行
```

**CMD: UNLOAD_SKILL(skill_name)**

```markdown
显式卸载不再需要的Skill以释放上下文空间。

示例：
CMD: UNLOAD_SKILL(sop-requirement-analyst)
→ 保存当前进度到检查点
→ 释放相关资源
→ 加载下一阶段所需Skills
```

**CMD: CONTEXT_STATUS()**

```markdown
查询当前上下文中已加载的Skills和资源。

输出：
- 当前加载的Skills列表
- 每个Skill的资源占用
- 总上下文使用量及警告阈值
```

### 2.3 状态字典扩展

新增Skills加载相关状态：

| 状态 | 触发者 | 含义 | 后续动作 |
|------|--------|------|----------|
| `[SKILL_LOADING]` | LOAD_SKILL命令 | 正在加载Skill及资源 | 资源加载成功→[SKILL_LOADED] |
| `[SKILL_LOADED]` | 资源加载完成 | Skill加载完成 | 继续执行 |
| `[SKILL_UNLOADING]` | UNLOAD_SKILL命令 | 正在卸载Skill | 卸载完成→继续执行 |
| `[CONTEXT_WARNING]` | 上下文监控 | 上下文接近阈值 | token使用量超过80%→提示用户 |

---

## 三、第二意见审查模式方案

### 3.1 问题修复

#### M7: Code Review失败处理路径

**现状**：Strike 1/2的具体转换路径未定义。

**修复方案**：

```markdown
## 审查失败处理路径

### 单审模式
[WAITING_FOR_CODE_REVIEW] → REVIEW() → 
  ├── 通过 → [DIFF_APPROVAL]
  ├── 需修改(Strike 1) → [DIR_WORKING] (修复)
  ├── 需修改(Strike 2) → [DIR_WORKING] (修复)
  └── 需修改(Strike 3) → [USER_DECISION] (僵局处理)

### 僵局处理选项
ASK_USER_DECISION("审查僵局", [
  "采纳审查意见并修复",
  "跳过当前审查点（记录分歧）",
  "启动第二意见审查",
  "终止任务"
])
```

#### M8: 功能迭代架构评估标准

**现状**：`[架构评估]`判断点未说明评估标准。

**修复方案**：

```markdown
## 架构评估标准

### 评估维度
| 维度 | 权重 | 评估项 |
|------|------|--------|
| 影响范围 | 30% | 是否涉及核心模块、是否影响公共接口 |
| 复杂度 | 25% | 代码行数、文件数、依赖关系复杂度 |
| 风险级别 | 25% | 是否涉及安全、性能、数据一致性 |
| 复用价值 | 20% | 是否可复用现有设计、是否有通用价值 |

### 评估结果
- 总分 ≥ 70：需要完整架构设计
- 总分 40-70：需要轻量架构设计
- 总分 < 40：可直接进入实现
```

### 3.2 新增能力：第二意见审查模式

#### 3.2.1 模式分类

**模式A：并行双审**

```
sop-code-implementation → [WAITING_FOR_CODE_REVIEW]
                         ↓
              ┌─────────┴─────────┐
              ↓                   ↓
      审查流1 (主审)        审查流2 (第二意见)
      关注:                 关注:
      - 设计一致性          - 安全性
      - 正确性              - 性能风险
      - 测试覆盖            - 架构合规
              ↓                   ↓
              └─────────┬─────────┘
                        ↓
              [审查对比报告]
                        ↓
              [DIFF_APPROVAL]
```

**模式B：顺序复核**

```
sop-code-review (主审) → 审查报告v1
                              ↓
              sop-code-review (复核) → 审查报告v2
                                            ↓
                              [综合审查结论] → [DIFF_APPROVAL]
```

**模式C：专项审查**

```
sop-code-review (主审) → 审查报告
                              ↓
              专项审查（安全/性能/合规）→ 专项报告
                                            ↓
                              [综合审查结论] → [DIFF_APPROVAL]
```

#### 3.2.2 触发条件

**自动触发条件**

| 条件 | 阈值 | 审查模式 |
|------|------|----------|
| 变更涉及认证/授权模块 | 任意 | 专项（安全） |
| 变更涉及数据库查询 | 任意 | 专项（性能） |
| 变更文件数超过10个 | >10 | 模式A或B |
| 变更涉及外部API调用 | 任意 | 专项（合规） |
| 架构审查标记为高风险 | 任意 | 模式A |
| 用户明确要求 | 任意 | 任意模式 |

#### 3.2.3 审查视角定义

**主审视角（全面审查）**

- 设计一致性：接口/行为/错误码/边界与设计一致
- 正确性：边界条件、异常路径、并发/幂等等关键点
- 测试与验收：覆盖与受影响范围匹配
- 安全与供应链：密钥/权限/输入校验/依赖治理
- 可维护性：复杂度、可读性、重复、命名、结构清晰
- 可观测性：日志/错误信息/可追踪性
- 性能风险：明显的O(N^2)、无界循环、无超时重试策略等

**安全专项视角**

- 认证与授权：会话管理、权限检查、角色验证
- 输入验证：参数校验、SQL注入防护、XSS防护
- 敏感数据：密码存储、敏感信息日志、加密传输
- 依赖安全：已知漏洞检查、许可证合规

**性能专项视角**

- 算法复杂度：循环嵌套、递归深度、大数据处理
- 数据库查询：N+1问题、索引使用、批量操作
- 资源使用：内存泄漏、连接池、缓存效率
- 并发安全：锁粒度、死锁风险、线程安全

#### 3.2.4 审查结果整合

**一致性处理**

- 两份审查报告都通过：直接进入DIFF_APPROVAL
- 两份审查报告都失败：综合所有问题，进入修复流程

**冲突处理**

```
[冲突检测] → [安全审查结论优先] → 修复安全问题
                              → 再次提交审查
                              → 若仍冲突 → [USER_DECISION]
```

**分歧处理**

```
[分歧记录] → 合并到「改进建议」章节
          → 进入DIFF_APPROVAL
          → 改进建议作为可选优化项
```

---

## 四、快速路径分层方案

### 4.1 问题修复

#### S3: 深度路径测试阶段集成

**现状**：sop-deep-path的SKILL.md缺少测试步骤。

**修复方案**：在sop-deep-path/SKILL.md中添加：

```yaml
workflow_steps:
  # ... 现有步骤 ...
  
  - step: 10
    name: "测试设计（可选）"
    condition: "TDD路径或需要测试资产"
    cmd: "TEST_DESIGN_CSV(L2/L3, acceptance_criteria)"
    output: "CSV测试用例"
    stop_point: "[WAITING_FOR_TEST_DESIGN]"
  
  - step: 11
    name: "测试实现（可选）"
    condition: "有CSV测试用例"
    cmd: "TEST_IMPLEMENT(csv, interface_info)"
    output: "L1-L4测试代码"
    stop_point: "[WAITING_FOR_TEST_IMPLEMENTATION]"
```

#### S4: 停止点定义统一

**现状**：Skill矩阵与SKILL.md停止点差异过大。

**修复方案**：

1. **明确一致性原则**：以SKILL.md为准，矩阵为摘要版
2. **同步需要修复的Skills**：

| Skill | 矩阵停止点 | SKILL.md停止点 | 修复方案 |
|-------|-----------|---------------|----------|
| sop-code-review | `[USER_DECISION]` | `[USER_DECISION]`, `[WAITING_FOR_CODE_REVIEW]` | 矩阵添加`[WAITING_FOR_CODE_REVIEW]` |
| sop-progress-supervisor | `[FUSION_TRIGGERED]`, `[USER_DECISION]` | 同矩阵 | 无需修复 |
| sop-fast-path | `[USER_DECISION]` | `[WAITING_FOR_FAST_PATH]`, `[DIFF_APPROVAL]` | 矩阵添加详细停止点 |
| sop-deep-path | `[USER_DECISION]` | 多个阶段停止点 | 矩阵添加详细停止点 |
| sop-tdd-workflow | `[USER_DECISION]` | L1-L4审查点 | 矩阵添加审查点 |

#### M4-M5: 快速路径一致性问题

**现状**：
- M4: `[WAITING_FOR_CODE_REVIEW]` vs `[DIFF_APPROVAL]` 混用
- M5: fast_path.md与SKILL.md的输入输出定义格式不同

**修复方案**：

1. **停止点命名统一**：
   - 代码实现完成后：`[WAITING_FOR_CODE_REVIEW]`
   - 审查通过后等待用户确认：`[DIFF_APPROVAL]`

2. **输入输出格式统一**：
```yaml
# 统一格式
inputs:
  - name: "change_request"
    type: "string"
    description: "变更请求描述"
    required: true
  - name: "scope"
    type: "list[string]"
    description: "变更范围（文件列表）"
    required: false

outputs:
  - name: "execution_result"
    type: "object"
    description: "执行结果"
    schema_ref: "04_reference/interaction_formats/worker_execution_result.md"
```

### 4.2 新增能力：分层快速路径

#### 4.2.1 极速路径（Micro Path）

**适用条件（全部满足）**

- 单文件修改
- 行数变化 ≤ 5行
- 仅涉及格式/注释/命名调整
- 无测试依赖
- 无文档依赖

**执行流程**

```
sop-code-implementation (直接执行)
    ↓
[AUTO_VERIFY] (lint + 语法检查)
    ↓
[MINIMAL_SYNC] (仅更新索引)
    ↓
[已完成]
```

**状态转移**

```
[DIRECT_EXECUTE] → EXECUTE() → [AUTO_VERIFY] → [AUTO_SYNC] → [已完成]
```

#### 4.2.2 快速路径（Fast Path）

**适用条件（全部满足）**

- 单文件修改
- 行数变化 < 30行
- 无接口变更
- 无控制流变更
- 无数据模型变更

**执行流程**

```
sop-code-explorer → sop-code-implementation → sop-code-review → sop-document-sync
```

**状态转移**

```
[WAITING_FOR_FAST_PATH] → EXPLORER() → [AUDIT_COMPLETE]
                        → IMPLEMENT() → [WAITING_FOR_CODE_REVIEW]
                        → REVIEW() → [DIFF_APPROVAL]
                        → SYNC() → [已完成]
```

#### 4.2.3 轻量深度路径（Light Deep Path）

**适用条件（任一满足）**

- 跨文件修改（但影响范围可界定）
- 行数变化 30-100行
- 存在接口变更（但影响范围可界定）
- 存在逻辑变更（但可局部验证）

**执行流程**

```
sop-requirement-analyst (轻量版)
    ↓
sop-implementation-designer (轻量版)
    ↓
sop-code-implementation
    ↓
sop-code-review
    ↓
sop-document-sync
```

**轻量版特点**：
- 需求和设计阶段采用简化模板
- 不要求完整的文档产出
- 支持单轮快速确认

#### 4.2.4 路径选择矩阵

| 条件 | 极速路径 | 快速路径 | 轻量深度路径 | 标准深度路径 |
|------|----------|----------|--------------|--------------|
| 文件数 | 1 | 1 | 1-3 | >3 |
| 行数变化 | ≤5 | <30 | 30-100 | >100 |
| 接口变更 | 无 | 无 | 可界定 | 复杂 |
| 控制流变更 | 无 | 无 | 可局部验证 | 复杂 |
| 测试需求 | 无 | 必须 | 必须 | 必须 |
| 审查要求 | 自动验证 | 完整审查 | 简化审查 | 完整审查 |

### 4.3 动态升级机制

**升级触发条件**

- 检测到隐藏的接口依赖
- 变更影响超出预估范围
- 发现需要用户决策的点
- 遇到当前路径无法处理的情况

**升级流程**

```
[当前路径执行中] → 检测到升级条件
               → 暂停当前执行
               → 输出升级报告（已完成内容、剩余问题、建议路径）
               → [USER_DECISION] → 选择新路径继续执行
```

---

## 五、监控与度量体系方案

### 5.1 问题修复

#### S5: 状态机异常恢复路径

**现状**：`[ARCHITECTURE_FAILED]`、`[DIR_FAILED]`、`[FUSION_TRIGGERED]`缺少后续处理路径。

**修复方案**：

```markdown
## 异常恢复路径定义

### [ARCHITECTURE_FAILED]
[ARCHITECTURE_FAILED] → ASK_USER_DECISION("架构审查失败", [
  "修复架构设计",
  "回滚到需求阶段",
  "终止任务"
])
→ 用户选择后执行：ARCH_REPAIR() / ARCH_ROLLBACK(reason) / 终止

### [DIR_FAILED]
[DIR_FAILED] → ASK_USER_DECISION("目录处理失败", [
  "重试当前目录",
  "跳过当前目录",
  "终止任务"
])
→ 用户选择后执行：DIR_RETRY() / DIR_SKIP(reason) / 终止

### [FUSION_TRIGGERED]
[FUSION_TRIGGERED] → ASK_USER_DECISION("熔断触发", [
  "重置并继续",
  "人工介入",
  "终止任务"
])
→ 用户选择后执行：FUSION_RESET() / MANUAL_INTERVENTION() / 终止

### [CYCLE_DETECTED]
[CYCLE_DETECTED] → ASK_USER_DECISION("检测到循环依赖", [
  "打破循环（指定打破点）",
  "人工介入",
  "终止任务"
])
→ 用户选择后执行：BREAK_CYCLE(point) / MANUAL_INTERVENTION() / 终止
```

#### M9: 依赖唤醒机制

**现状**：sop-progress-supervisor如何检测依赖完成未详细说明。

**修复方案**：

```markdown
## 依赖唤醒机制

### 检测方式
1. **轮询检测**：每隔N秒检查依赖目录状态
2. **事件驱动**：依赖目录完成时主动通知
3. **状态订阅**：订阅依赖目录的状态变更事件

### 实现细节
```yaml
# sop-progress-supervisor/SKILL.md
dependency_wake:
  detection_method: "event_driven"  # 优先使用事件驱动
  fallback: "polling"               # 降级使用轮询
  polling_interval: 30              # 轮询间隔（秒）
  
  wake_sequence:
    - step: 1
      action: "检测依赖目录状态"
      cmd: "CHECK_DEP_STATUS(dir_list)"
    - step: 2
      action: "所有依赖已完成"
      condition: "all_deps_completed"
      cmd: "WAKE_DIR(waiting_dir)"
      output: "[DIR_WORKING]"
    - step: 3
      action: "存在依赖未完成"
      condition: "has_pending_deps"
      cmd: "WAIT_FOR_DEP(pending_list)"
      output: "[DIR_WAITING_DEP]"
```
```

#### M10: 用户决策退出路径

**现状**：`[USER_DECISION]`后如何继续执行缺乏标准路径。

**修复方案**：

```markdown
## 用户决策退出路径

### 标准退出路径
[USER_DECISION] → 用户选择继续 → 返回原状态继续执行
[USER_DECISION] → 用户选择回滚 → 返回上一阶段检查点
[USER_DECISION] → 用户选择终止 → 进入[已完成]（标记为终止）

### 决策记录要求
每次用户决策必须：
1. 使用ASK_USER_DECISION(topic, options)输出选项
2. 使用RECORD_DECISION(topic, decision)落盘决策记录
3. 在后续产物中引用该决策记录路径

### 决策记录模板
```markdown
# 决策记录

## 决策主题
{topic}

## 可选方案
{options}

## 用户选择
{selected_option}

## 决策时间
{timestamp}

## 影响范围
{affected_scope}

## 后续动作
{next_actions}
```
```

### 5.2 新增能力：指标体系

#### 5.2.1 执行效率指标

**阶段级指标**

| 指标名称 | 定义 | 采集方式 | 用途 |
|----------|------|----------|------|
| 阶段执行时间 | 从进入状态到离开状态的耗时 | 状态机timestamp记录 | 识别慢阶段 |
| 阶段等待时间 | 从上一阶段完成到本阶段开始的等待 | 状态机timestamp记录 | 识别人工等待 |
| 阶段通过率 | 首次执行即通过的比例 | 状态机状态计数 | 评估阶段难度 |
| 阶段重试率 | 需要重试执行的比例 | 状态转移计数 | 识别问题阶段 |

**Skill级指标**

| 指标名称 | 定义 | 采集方式 | 用途 |
|----------|------|----------|------|
| Skill调用频率 | 单位时间内被调用的次数 | 日志计数 | 识别高频Skills |
| Skill执行时长 | 单次执行的平均耗时 | 计时器 | 评估Skill效率 |
| Skill失败率 | 执行失败的比例 | 结果状态统计 | 识别问题Skills |
| Skill产出率 | 按时产出交付物的比例 | 交付物检查 | 评估Skill可靠性 |

**路径级指标**

| 指标名称 | 定义 | 采集方式 | 用途 |
|----------|------|----------|------|
| 路径选择分布 | 各路径被选择的次数 | 路径决策日志 | 评估路径适用性 |
| 路径升级率 | 执行中升级到更高级路径的比例 | 升级事件统计 | 评估路径选择准确性 |
| 路径总耗时 | 从入口到完成的完整耗时 | 入口-出口timestamp | 评估整体效率 |

#### 5.2.2 质量指标

**审查质量指标**

| 指标名称 | 定义 | 采集方式 | 用途 |
|----------|------|----------|------|
| 审查通过率 | 首次提交即通过的比例 | 审查结果统计 | 评估实现质量 |
| 审查问题密度 | 每100行代码发现的问题数 | 审查报告统计 | 评估审查严格度 |
| 问题遗漏率 | 后续阶段发现的前序问题比例 | 问题追溯统计 | 评估审查有效性 |
| 第二意见采纳率 | 第二意见被采纳的比例 | 审查对比统计 | 评估第二意见价值 |

**产出质量指标**

| 指标名称 | 定义 | 采集方式 | 用途 |
|----------|------|----------|------|
| 文档完整性 | 产出文档符合模板要求的程度 | 文档检查 | 评估文档规范 |
| 设计覆盖率 | 有对应design.md的代码比例 | 目录扫描 | 评估设计先行 |
| 测试覆盖率 | 有对应测试的代码比例 | 测试统计 | 评估测试覆盖 |
| 问题回归率 | 同一问题重复出现的比例 | 问题库统计 | 评估问题根因 |

#### 5.2.3 采集与存储

**状态字典扩展**

```markdown
# 状态字典增加timestamp字段
| 状态 | timestamp | 说明 |
|------|-----------|------|
| [DIR_WORKING] | start_time | 开始时间 |
| [DIR_COMPLETED] | end_time | 结束时间 |
| [DIR_FAILED] | fail_time | 失败时间 |
```

**事件日志格式**

```json
{
  "event_id": "evt_001",
  "event_type": "PATH_UPGRADE",
  "timestamp": "2026-02-25T10:30:00Z",
  "from_path": "fast",
  "to_path": "deep",
  "trigger": "检测到跨文件依赖",
  "session_id": "ses_xxx"
}
```

**指标卡片模板**

```markdown
# .trae/metrics/skill_execution_time.md
---
metric: "skill_execution_time"
skill: "sop-code-implementation"
period: "weekly"
updated: "2026-02-25"
---

## 本周统计
- 平均执行时长: 45分钟
- 中位数: 38分钟
- P95: 72分钟
- 样本数: 23

## 趋势
📈 较上周 +12%（因复杂需求增加）

## 建议
关注执行时长超过P95的案例，分析瓶颈
```

### 5.3 告警规则

| 告警类型 | 触发条件 | 告警级别 | 处理方式 |
|----------|----------|----------|----------|
| 执行超时 | 单阶段执行超过2小时 | 警告 | 检查是否卡住 |
| 熔断触发 | 发生熔断事件 | 严重 | 立即处理 |
| 审查失败 | 连续3次审查不通过 | 警告 | 检查设计质量 |
| 路径频繁升级 | 周升级率超过30% | 警告 | 优化路径选择 |
| 用户决策堆积 | 等待超过1小时 | 提示 | 提醒用户 |

---

## 六、状态机与命令字典优化方案

### 6.1 状态机优化（O1-O3）

#### O1: 状态冗余分析

**问题**：当前状态字典存在冗余或近似等价的概念。

**优化方案**：

1. **清理历史别名**：
   - `[USER_DECISION_REQUIRED]` → 统一使用 `[USER_DECISION]`
   - 搜索确认所有引用位置，更新后移除旧别名声明

2. **测试相关状态规范化**：
   - 现状：`[WAITING_FOR_TEST_REVIEW]`、`[WAITING_FOR_TEST_DESIGN]`、`[WAITING_FOR_TEST_IMPLEMENTATION]`
   - 优化为：`[TEST_DESIGN_COMPLETE]`、`[TEST_IMPLEMENTATION_COMPLETE]`、`[TEST_REVIEW_COMPLETE]`

3. **伪状态处理**：
   - `Resume` 作为伪状态，明确使用场景和限制
   - 在状态机图中标注为"伪状态"，不作为实际执行状态

#### O2: 状态转移简化

**问题**：部分状态存活时间短，状态机过于复杂。

**优化方案**：

1. **调度状态优化**：
   - `[SCHEDULING]`、`[PARALLEL_EXECUTING]` 转为伪状态
   - 实际状态转移时直接跳过，记录到调度日志

2. **简化目录状态转移**：
   - `[DIR_WAITING_DEP]` 到 `[DIR_WORKING]` 的转移依赖外部唤醒
   - 明确在状态图中标注外部依赖关系

#### O3: 可恢复检查点粒度

**问题**：检查点粒度过细，恢复流程复杂。

**优化方案**：

1. **验收审查检查点合并**：
   - 合并 `[WAITING_FOR_L1_REVIEW]`、`[WAITING_FOR_L2_REVIEW]`、`[WAITING_FOR_L3_REVIEW]`、`[WAITING_FOR_L4_REVIEW]`
   - 统一为 `[WAITING_FOR_ACCEPTANCE_REVIEW]`，通过参数指定验收级别

2. **审查类型统一**：
   - `[WAITING_FOR_CODE_REVIEW]`、`[WAITING_FOR_TEST_IMPLEMENTATION]` 统一为 `[WAITING_FOR_REVIEW]`
   - 通过审查类型参数区分

### 6.2 命令字典优化（O4-O6）

#### O4: 命令命名一致性

**问题**：命令命名风格混用（全大写/全小写、动词/名词、缩写）。

**优化方案**：

| 命令类型 | 优化前 | 优化后 |
|----------|--------|--------|
| 动作命令 | `REQ_ANALYZE`, `ARCH_DESIGN` | `ANALYZE_REQUIREMENTS`, `DESIGN_ARCHITECTURE` |
| 动作命令 | `IMPLEMENT`, `AUDIT` | `IMPLEMENT_CODE`, `AUDIT_SCOPE` |
| 流程命令 | `audit`, `record_decision` | `AUDIT_SCOPE`, `RECORD_DECISION` |
| 参数风格 | `design_refs`, `task_description` | `task_description`, `design_refs` |

#### O5: 命令参数标准化

**问题**：命令参数缺乏类型标注和默认值说明。

**优化方案**：

```yaml
# 标准命令格式
CMD: ROUTE(task: TaskDescription) -> RouteDecision
  - task: 
      type: "TaskDescription"
      required: true
      properties:
        description: "string"
        scope?: "string[]"

CMD: AUDIT_SCOPE(scope: ChangeScope) -> AuditResult
  - scope:
      type: "ChangeScope"
      required: true
      format: "string[] (file paths)"

# 标准类型定义
types:
  TaskDescription:
    description: "任务描述对象"
    properties:
      description: { type: "string", description: "任务描述" }
      scope: { type: "string[]", description: "变更范围" }
  
  ChangeScope:
    description: "变更范围"
    format: "string[]"
    example: ["src/utils/helper.ts", "tests/unit/helper.test.ts"]
```

#### O6: 命令冗余检测

**问题**：存在功能近似但命名不同的命令。

**优化方案**：

1. **TEST_DESIGN_CSV vs TEST_DESIGN**：
   - 明确区分：CSV用于L2/L3测试用例，通用用于其他场景
   - 或合并为 `TEST_DESIGN` 通过参数 `format: "csv|standard"` 区分

2. **IMPLEMENT vs DIRECT_IMPLEMENT**：
   - `IMPLEMENT`：标准实现流程
   - `DIRECT_IMPLEMENT`：仅用于极速路径，跳过门控检查

---

## 七、文档组织优化方案

### 7.1 模板文件优化（O7）

#### 问题识别

- `project_prd.md` vs `prd.md` 模板共存
- `feature_frd.md` vs `module_mrd.md` 边界模糊
- L2/L3设计文档区分不直观

#### 优化方案

1. **模板清理**：
   - 移除 `prd.md` 或移至归档目录 `.archive/deprecated/`
   - 更新 `project_prd.md` 引用说明

2. **边界指引**：
   ```markdown
   ## MRD vs FRD 选择指南
   
   | 场景 | 推荐模板 |
   |------|----------|
   | 新功能完整实现 | FRD |
   | 模块重构 | FRD |
   | 现有模块扩展 | MRD |
   | 技术方案验证 | MRD |
   ```

3. **可视化对照**：
   - 在设计文档模板中增加L2/L3对照说明
   - 使用表格展示两种设计的差异

### 7.2 参考文档导航优化（O8）

#### 问题识别

- `04_reference/index.md` 承载信息过多
- 章节内容过长，缺少分层展示

#### 优化方案

```
04_reference/
├── index.md                    # 一级导航（仅保留表格）
├── 01_documentation/          # 文档规范章节
│   ├── index.md               # 章节入口
│   ├── prd_template.md
│   ├── mrd_template.md
│   └── frd_template.md
├── 02_design/                 # 设计规范章节
│   ├── index.md
│   ├── l2_design.md
│   └── l3_design.md
├── 03_review/                 # 审查标准章节
│   ├── index.md
│   ├── code_review_criteria.md
│   └── acceptance_review.md
└── 04_interaction/            # 交互格式章节
    ├── index.md
    └── worker_execution_result.md
```

**index.md 结构**：

```markdown
# 参考文档导航

## 快速入口
| 场景 | 链接 |
|------|------|
| 我要写需求 | [需求文档模板](./01_documentation/index.md) |
| 我要做设计 | [设计文档模板](./02_design/index.md) |
| 我要审查代码 | [代码审查标准](./03_review/code_review_criteria.md) |

## 文档分层
... 导航表格 ...

## 按功能查找
... 功能查找表格 ...
```

### 7.3 跨文件引用一致性（O9）

#### 问题识别

- 相对路径与绝对路径混用
- 同一概念使用不同名称（如"设计依据"vs"设计参考"）

#### 优化方案

1. **统一路径格式**：
   - 所有SOP内部引用使用基于 `SOP_ROOT` 的绝对路径
   - 例如：`[设计依据](./05_constraints/design_refs.md)` → `[设计依据](sop/05_constraints/design_refs.md)`

2. **术语对照表**：

```markdown
# SOP 术语表

## 设计相关
| 标准名称 | 历史别名 | 使用场景 |
|----------|----------|----------|
| 设计依据 | 设计参考、设计引用 | FRD/设计文档 |
| 设计决策 | 设计选择 | 设计文档 |
| 设计约束 | 约束条件 | 全局 |

## 流程相关
| 标准名称 | 历史别名 | 使用场景 |
|----------|----------|----------|
| 代码审查 | Code Review | 全局 |
| 验收审查 | 交付审查 | L1-L4 |
```

---

## 八、技能边界与流程效率优化方案

### 8.1 技能边界优化（O10-O12）

#### O10: 技能职责重叠

**问题**：Skills之间职责重叠或边界模糊。

**优化方案**：

1. **边界说明文档**：
   ```markdown
   ## sop-code-explorer vs sop-requirement-analyst
   
   ### sop-code-explorer 职责
   - 代码库检索
   - 上下文提取
   - 依赖分析
   
   ### sop-requirement-analyst 职责
   - 需求整理与文档化
   - 需求澄清
   - 不做：代码检索（由explorer负责）
   
   ### 协作场景
   当需要分析现有代码以理解需求时：
   1. 先调用 sop-code-explorer 提取上下文
   2. 再调用 sop-requirement-analyst 进行需求分析
   ```

2. **职责合并**：
   - `sop-capability-reuse` → 整合到 `sop-design-placement`

#### O11: 技能粒度不一致

**问题**：路径宏Skills是多Skills组合，非独立技能。

**优化方案**：

1. **标注为编排宏**：
   ```yaml
   ---
   name: "sop-fast-path"
   type: "orchestration_macro"  # 独立技能/编排宏
   composed_of: 
     - "sop-code-explorer"
     - "sop-code-implementation"
     - "sop-code-review"
     - "sop-document-sync"
   ---
   ```

2. **拆分复杂Skills**：
   - 将任务管理功能从 `sop-code-implementation` 分离
   - 新增 `sop-task-manager` 处理任务状态管理

#### O12: 技能版本同步

**问题**：核心组件变更时，多Skills需要同步更新。

**优化方案**：

```yaml
# SKILL.md 增加版本声明
---
name: "sop-code-implementation"
version: "v2.9.0"
depends_on:
  sop_components:
    state_dictionary: ">=v3.0.0"
    command_dictionary: ">=v2.5.0"
    coding_principles: ">=v1.2.0"
  skills:
    sop-code-explorer: ">=v2.0.0"
    sop-implementation-designer: ">=v1.8.0"
---

# 版本兼容性检查
CMD: CHECK_DEPENDENCIES() 
→ 验证所有依赖版本
→ 报告不兼容项
→ 提示升级方案
```

### 8.2 流程效率优化（O13-O15）

#### O13: 门控检查成本

**问题**：门控检查投入产出比不合理，标准模糊。

**优化方案**：

1. **分级门控**：

| 路径类型 | 门控要求 |
|----------|----------|
| 极速路径 | 自动验证（lint+语法），跳过人工门控 |
| 快速路径 | 简化门控清单 |
| 深度路径 | 完整门控 |

2. **量化标准**：
   ```markdown
   ## 需求门控通过标准
   
   | 检查项 | 量化指标 |
   |--------|----------|
   | 需求完整性 | 覆盖所有用户故事 |
   | 需求一致性 | 无逻辑矛盾 |
   | 需求可测试 | 每个需求有对应验收标准 |
   ```

#### O14: 审查循环优化

**问题**：3轮迭代计数不清晰，增量审查缺失。

**优化方案**：

1. **明确计数规则**：
   - 3轮指"整个任务执行周期"中的3轮
   - 每轮修复后完整审查

2. **增量审查**：
   ```yaml
   CMD: INCREMENTAL_REVIEW(full_report, diff) -> ReviewResult
     - full_report: "上一轮完整审查报告"
     - diff: "本次变更差异"
     output: "仅针对变更的审查结论"
   ```

3. **部分通过机制**：
   - 关键问题：必须修复
   - 非关键问题：记录待后续处理，可临时通过

#### O15: 文档同步成本

**问题**：文档同步成为瓶颈，回滚成本高。

**优化方案**：

1. **同步分类**：

| 同步类型 | 内容 | 时机 | 自动化 |
|----------|------|------|--------|
| 强制同步 | 索引更新 | 实时 | 必须 |
| 推荐同步 | CHANGELOG | 任务完成 | 可选 |
| 可选同步 | 设计决策记录 | 手动 | 手动 |

2. **部分通过机制**：
   - 索引更新后即可标记为"同步完成"
   - CHANGELOG等可延后处理

---

## 九、错误处理与渐进披露优化方案

### 9.1 错误处理优化（O16-O18）

#### O16: 失败场景覆盖

**问题**：技能执行失败处理流程不明确。

**优化方案**：

```yaml
# 每个SKILL.md 增加失败处理章节
failure_handling:
  error_types:
    - name: "UNKNOWN_ERROR"
      description: "未知错误"
      recovery: "记录错误日志，查询用户如何处理"
    
    - name: "TOOL_UNAVAILABLE"
      description: "工具不可用"
      recovery: "尝试替代工具或降级方案"
    
    - name: "CONTEXT_OVERFLOW"
      description: "上下文溢出"
      recovery: "卸载非必要Skills，压缩上下文"

  rollback:
    enabled: true
    checkpoint_states: 
      - "[DIR_WORKING]"
      - "[WAITING_FOR_CODE_REVIEW]"
```

#### O17: 三错即停机制

**问题**：判断标准不清晰，熔断恢复流程不明确。

**优化方案**：

```markdown
## 三错即停机制详解

### 触发条件
- "同一Skill同一步骤"：相同的Skill + 相同的action
- 连续3次失败触发熔断
- 不同失败原因分别计数

### 熔断级别
| 级别 | 连续失败次数 | 影响 |
|------|-------------|------|
| 警告 | 2 | 提示即将熔断 |
| 熔断 | 3 | 暂停技能执行 |

### 恢复流程
[FUSION_TRIGGERED] → 
  1. 记录熔断详情
  2. 保存当前检查点
  3. ASK_USER_DECISION([
      "重置并继续（计数器归零）",
      "回滚到上一检查点",
      "人工介入",
      "终止任务"
    ])
```

#### O18: 冲突检测机制

**问题**：设计冲突检测时机、粒度不明确。

**优化方案**：

```markdown
## 冲突检测机制

### 触发时机
1. 每次保存设计文档时
2. 进入下一阶段前
3. 用户明确触发

### 检测粒度
- 语义冲突：接口签名变更、逻辑变更
- 依赖冲突：循环依赖、缺失依赖

### 冲突解决流程
[CONFLICT_DETECTED] →
  1. 生成冲突报告（冲突位置、冲突内容）
  2. ASK_USER_DECISION([
      "采纳当前修改",
      "保留冲突，由后续处理",
      "人工介入解决"
    ])
  3. 更新设计文档状态
```

### 9.2 渐进披露优化（O19-O21）

#### O19: L1入口优化

**问题**：`AGENT_SOP.md` 承载信息过多。

**优化方案**：

```markdown
# AGENT_SOP.md 结构优化

## 快速开始（100字内）
... 3步完成 ...

## 我是新手 → 阅读路径
1. 基础概念 → [SOP核心概念](./02_core_concepts/)
2. 快速体验 → [5分钟快速路径](./03_paths/fast_path.md)
3. 深入理解 → [完整工作流](./04_workflow/)

## 我要查询 → 快速入口
| 问题 | 链接 |
|------|------|
| 如何开始？ | [入口指南](./01_intro/) |
| 状态是什么？ | [状态字典](./06_reference/state_dictionary.md) |
| 命令怎么用？ | [命令字典](./06_reference/command_dictionary.md) |

## 详细说明
... 链接到各章节 ...
```

#### O20: L2技能矩阵优化

**问题**：表格可读性差，依赖关系不直观。

**优化方案**：

1. **可视化依赖图**：
   - 使用Mermaid图表展示Skills依赖关系
   - 按工作流阶段分组

2. **使用场景说明**：
   ```markdown
   | Skill | 适用场景 | 不适用场景 |
   |-------|----------|-----------|
   | sop-code-explorer | 理解现有代码、提取上下文 | 纯新增功能 |
   | sop-requirement-analyst | 新需求分析、需求文档编写 | 代码修改 |
   ```

#### O21: L3工作流文档优化

**问题**：快速路径与深度路径重复，缺少快速查阅版本。

**优化方案**：

1. **提取共同步骤**：
   ```markdown
   # 工作流公共步骤
   
   ## 阶段1：上下文提取
   所有路径都需要此阶段，详见 [公共流程](./common/context_extraction.md)
   
   ## 阶段2：执行阶段
   - 极速/快速路径：简化执行
   - 深度路径：完整执行
   ```

2. **流程图版本**：
   - 为每个路径增加Mermaid流程图
   - 常见场景的快速决策树

---

## 十、实施路线图

### 10.1 第一阶段：基础能力建设（1-2周）

**目标**：修复严重问题，建立基础框架

**任务清单**：

| 任务 | 优先级 | 预计工时 | 依赖 | 来源 |
|------|--------|----------|------|------|
| S1: 门控状态集成到SKILL流程 | P0 | 4h | 无 | M |
| S2: 孤立状态处理 | P0 | 2h | 无 | M |
| S4: 停止点定义统一 | P0 | 3h | 无 | M |
| S5: 状态机异常恢复路径 | P0 | 3h | 无 | M |
| O1: 状态冗余清理 | P0 | 2h | 无 | O |
| O2: 伪状态规范化 | P1 | 2h | 无 | O |
| M1: SKILL.md层级标注 | P1 | 2h | 无 | M |
| M10: 用户决策退出路径 | P1 | 2h | 无 | M |
| O4: 命令命名统一 | P1 | 3h | 无 | O |

**产出**：
- 更新后的state_dictionary.md（增加门控状态转移、异常恢复路径、清理冗余）
- 更新后的17个SKILL.md（添加层级标注、门控检查步骤）
- 更新后的command_dictionary.md（统一命名规范）
- 更新后的Skill矩阵（同步停止点定义）

### 10.2 第二阶段：核心功能实现（2-4周）

**目标**：实现优化方案的核心功能

**任务清单**：

| 任务 | 优先级 | 预计工时 | 依赖 | 来源 |
|------|--------|----------|------|------|
| S3: 深度路径测试阶段集成 | P0 | 3h | 第一阶段 | M |
| O3: 检查点合并 | P0 | 2h | 第一阶段 | O |
| O5: 命令参数标准化 | P1 | 4h | O4 | O |
| M4-M5: 快速路径一致性修复 | P1 | 2h | 第一阶段 | M |
| Skills分层加载机制 | P1 | 8h | M1 | M |
| 第二意见审查模式（模式A） | P2 | 6h | M7 | M |
| 极速路径实现 | P2 | 4h | S4 | M |
| 轻量深度路径实现 | P2 | 4h | S3 | M |
| O7: 模板文件清理 | P2 | 2h | 无 | O |
| O8: 文档导航重构 | P2 | 3h | 无 | O |
| 基础指标采集机制 | P2 | 4h | 无 | M |

**产出**：
- 更新后的sop-deep-path/SKILL.md（包含测试阶段）
- 更新后的快速路径文档（分层设计）
- 新的命令定义（LOAD_SKILL、CONTEXT_STATUS等）
- sop-code-review的多流审查支持
- 基础指标卡片模板
- 模板清理后的目录结构

### 10.3 第三阶段：优化与完善（持续）

**目标**：基于实际使用反馈持续优化

**任务清单**：

| 任务 | 优先级 | 预计工时 | 依赖 | 来源 |
|------|--------|----------|------|------|
| O6: 命令冗余合并 | P2 | 2h | O5 | O |
| M2-M3: 输入输出描述统一、版本同步 | P2 | 3h | 第二阶段 | M |
| M6: 分层验收集成 | P2 | 2h | 第二阶段 | M |
| M7-M9: 审查失败路径、依赖唤醒 | P2 | 4h | 第二阶段 | M |
| O9: 跨文件引用一致性 | P2 | 2h | 无 | O |
| O10-O12: 技能边界优化 | P2 | 4h | 无 | O |
| O13-O15: 流程效率优化 | P2 | 4h | 无 | O |
| O16-O18: 错误处理优化 | P2 | 4h | 无 | O |
| O19-O21: 渐进披露优化 | P2 | 3h | 无 | O |
| 第二意见智能触发 | P3 | 4h | 第二阶段 | M |
| 监控仪表盘 | P3 | 6h | 第二阶段 | M |
| SOP健康报告机制 | P3 | 4h | 第二阶段 | M |

**产出**：
- 持续迭代的优化版本
- 月度SOP健康报告
- 基于数据的流程改进建议

---

## 十一、风险与对策

| 风险 | 影响 | 概率 | 对策 |
|------|------|------|------|
| Skills机制增加复杂度 | 可能降低SOP的可维护性 | 中 | 采用渐进式引入，保持核心简洁 |
| 第二意见增加执行时间 | 可能影响效率 | 中 | 设置超时机制，并行执行 |
| 指标采集增加存储开销 | 可能产生大量数据 | 低 | 设置数据保留策略，定期清理 |
| 快速路径过度简化 | 可能降低质量保障 | 中 | 严格的触发条件，自动升级机制 |
| 版本漂移问题复发 | 可能导致不一致 | 低 | 建立版本同步检查机制 |
| 命令字典重构 | 可能导致现有脚本不兼容 | 中 | 提供向后兼容层，逐步迁移 |
| 状态机简化 | 可能遗漏边界场景 | 中 | 充分测试，保留详细日志 |

---

## 十二、验收标准

### 12.1 第一阶段验收标准

- [ ] 所有SKILL.md包含层级标注
- [ ] 门控状态在至少3个SKILL.md中实际使用
- [ ] 孤立状态被使用或移除
- [ ] Skill矩阵与SKILL.md停止点一致
- [ ] 异常恢复路径在状态字典中明确定义
- [ ] 状态冗余别名已清理
- [ ] 伪状态使用说明已添加
- [ ] 命令命名规范已统一

### 12.2 第二阶段验收标准

- [ ] 深度路径包含完整的测试阶段
- [ ] 快速路径输入输出格式统一
- [ ] LOAD_SKILL/CONTEXT_STATUS命令可用
- [ ] 并行双审模式可执行
- [ ] 极速路径判定条件明确
- [ ] 基础指标可采集
- [ ] 检查点已合并（验收审查、审查类型）
- [ ] 模板文件已清理
- [ ] 文档导航已重构

### 12.3 第三阶段验收标准

- [ ] 所有输入输出描述格式统一
- [ ] 所有文件版本一致
- [ ] 第二意见智能触发可用
- [ ] 监控仪表盘可访问
- [ ] 月度健康报告可生成
- [ ] 技能边界说明完整
- [ ] 门控分级机制可用
- [ ] 增量审查机制可用

---

## 十三、总结

本改进方案综合了健康检查报告、优化提案以及现有SOP优化建议的问题，制定了分阶段的实施路线图：

1. **第一阶段**聚焦于修复严重问题（状态机、命令字典），确保流程可正确执行
2. **第二阶段**实现核心优化功能，提升灵活性和效率
3. **第三阶段**持续优化，建立数据驱动的改进机制

通过本方案的实施，SOP体系将具备：

- **更强的架构一致性**：门控机制集成、层级标注统一、状态精简
- **更好的可执行性**：测试阶段集成、路径分层、异常恢复完善
- **更高的可维护性**：命令规范、文档组织、技能边界清晰
- **更好的可观测性**：指标采集、告警机制、健康报告

---

**文档版本**：v2.0.0  
**创建时间**：2026-02-25  
**基于文档**：health_check_report.md, sop_optimization_proposal.md, sop_existing_optimization.md
