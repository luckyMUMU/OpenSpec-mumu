---
version: v3.0.2
updated: 2026-03-01
---

# 基于 Spec-First 的 LLM 技术规范

## 一、分级存储架构 (Storage Hierarchy)

```yaml
docs_structure:
  01_requirements:
    level: L1
    content: [PRD, MRD, FRD]
    examples: [project_prd.md, modules/]
  02_logical_workflow:
    level: L2
    content: 架构设计(技术无关)
    examples: [module.md]
  03_technical_spec:
    level: L3
    content: [技术规格, 测试用例]
    examples: [test_cases/, module_spec.md]
  04_context_reference:
    level: L4
    content: [ADR, 决策记录, RAG参考资料]
    examples: [adr_*.md, decisions/, rag/]
```

### SOP v3.0.2 目录映射

```yaml
mapping:
  L1_需求层:
    path: docs/01_requirements/
    content: PRD/MRD/FRD
  L2_架构层:
    path: docs/02_logical_workflow/
    content: 技术无关的架构设计
  L3_实现层:
    path: src/**/design.md
    content: 目录级实现设计
  L4_决策层:
    path: docs/04_context_reference/
    content: ADR + 决策记录
  Spec执行期:
    path: .trae/specs/<change-id>/
    content: [spec.md, tasks.md, checklist.md]
```

---

## 二、每一层的内容分配规范

### L1: 核心概念层 (Concept Layer)

```yaml
location: docs/01_requirements/
content:
  - 一句话定义该模块
  - 解决的核心痛点
prohibited:
  - 代码
  - 路径
  - 配置
```

### L2: 逻辑流转层 (Logic Layer)

```yaml
location: docs/02_logical_workflow/
principle: 使用"结构化伪代码"
rules:
  - 忽略语法: 使用 IF, THEN, FOR EACH, TRY-CATCH 等通用描述
  - 屏蔽实现: 不要写 db.connect()，而是写 CONNECT_TO_DATABASE
```

**伪代码示例**：

```pseudo
FUNCTION identify_intent(user_input):
    INITIALIZE context_buffer
    PRE_PROCESS user_input (remove_noise, normalize)

    IF user_input contains "urgent":
        SET priority = HIGH
    ELSE:
        SET priority = NORMAL

    RETURN CALL_LLM_MODEL(prompt_template, user_input)
END FUNCTION
```

### L3: 技术规格层 (Spec Layer)

```yaml
location: src/**/design.md 或 docs/03_technical_spec/
content:
  - 数据合同: 定义输入/输出的具体字段、类型
  - 状态码定义: 逻辑流转中可能出现的错误代码及其含义
prohibited:
  - 描述业务逻辑
```

### L4: 决策参考层 (Context Layer)

```yaml
location: docs/04_context_reference/
content:
  - Why: 为什么选择伪代码中的逻辑 A 而不是 B？
  - 限制: 当前逻辑在并发超过 1000 时可能失效
  - 历史: 旧版本逻辑的废弃原因
```

---

## 三、伪代码编写的三项准则

```yaml
rules:
  - name: 原子化操作命名
    desc: 使用 UPPER_SNAKE_CASE 表示底层原子操作
    example: FETCH_USER_PROFILE
  - name: 缩进体现分层
    desc: 严格使用 4 空格缩进，表示逻辑的嵌套关系
    purpose: 有助于 LLM 构建抽象语法树
  - name: 注释意图而非步骤
    desc: 注释应说明"为什么这里需要分支"，而不是解释"这是一个 If 语句"
```

---

## 四、这种规范的优势

```yaml
advantages:
  - 架构与实现解耦: 项目从 Python 迁移到 Go，伪代码文档完全不需要修改
  - 降低LLM的Token噪音: 不被 import, try...except, logger.info 干扰
  - 渐进式认知:
      - 开发者想看逻辑: 去L2看伪代码
      - 开发者要写代码: 去L3看字段定义
      - 开发者遇到Bug: 去L4看设计背景
```

---

## 五、技术栈描述规范 (Technology Stack)

### 核心技术选型 (Core Technology)

```yaml
language_runtime:
  - 编程语言: 系统级性能与内存安全
  - 异步运行时: 支持高并发执行
  - 版本要求: 最低语言版本要求
```

### 架构设计原则 (Architecture Principles)

```yaml
module_organization:
  - 设计文档完整性要求
  - 模块组织结构标准
  - 测试策略覆盖范围
  - 示例代码组织方式
```

### 性能与质量保障 (Performance & Quality)

```yaml
performance:
  - 并发处理能力指标
  - 响应延迟性能要求
  - 可靠性机制保障

quality:
  - 代码格式化标准
  - 静态分析检查要求
  - 文档完整性规范
  - 日志记录最佳实践
```

---

## 六、SOP v3.0.2 体系映射

### Spec-First 架构

```yaml
core_principle: 规范是核心，Skill是实现方式

layers:
  P0:
    name: 工程宪章
    path: sop/01_constitution/
    content: [project-charter, quality-redlines, architecture-principles, security-baseline]
    constraint: 不可违背，违反即熔断
  P1:
    name: 系统规范
    path: sop/02_specifications/
    content: [system-spec]
    constraint: 跨模块约束，技术负责人审批
  P2:
    name: 模块规范
    path: sop/02_specifications/
    content: [api-contract, data-model, domain-model]
    constraint: 单模块约束，模块负责人审批
  P3:
    name: 实现规范
    path: sop/05_constraints/p3-constraints.md
    content: [coding-standards, testing-standards]
    constraint: 自动化工具验证
```

### 5 阶段工作流

```yaml
stages:
  - id: 0
    name: 规范重量选择
    actions: [评估需求复杂度, 推荐规范重量]
    output: 规范重量决策JSON
  - id: 1
    name: 理解与设计
    actions: [多轮次多维度提问, 需求分析BDD, 架构设计DDD, 实现设计]
    output: [clarification.md, spec.md, architecture-design.md, design.md]
  - id: 2
    name: 实现与验证
    actions: [TDD循环, 约束验证P0-P3, 代码审查]
    output: [代码变更, 审查报告, 测试报告]
  - id: 3
    name: 交付与同步
    actions: [文档同步, 索引更新]
    output: [完成通知, 变更摘要]
  - id: 4
    name: 归档与演化
    actions: [创建归档记录, 升级评估, 更新CHANGELOG]
    output: [归档记录, CHANGELOG]
```

### Skill 分类与文档层级

```yaml
skill_categories:
  specification:
    duty: 生成规范文档
    output_level: L1-L2文档
    examples: [sop-requirement-analyst, sop-architecture-design]
  implementation:
    duty: 将规范翻译为代码
    output_level: L3代码+测试
    examples: [sop-code-implementation, sop-test-implementation]
  verification:
    duty: 验证规范是否被满足
    output_level: 审查报告+验收报告
    examples: [sop-architecture-reviewer, sop-code-review]
  orchestration:
    duty: 管理规范版本和流程
    output_level: Stage契约
    examples: [sop-workflow-orchestrator, sop-document-sync]
```

### 质量门控机制（P0 级约束）

```yaml
quality_gates:
  stage_0:
    checks: [需求描述清晰, 复杂度评估合理]
    pass: 全部通过
    fail: 返回需求澄清
  stage_1:
    checks: [需求澄清完成, 长期短期区分, 用户意图确认, 设计文档完整, 符合P0约束, 通过审查]
    pass: 全部通过
    fail: 返回需求澄清或设计修正
  stage_2:
    checks: [代码规范, 测试通过, 约束验证通过]
    pass: 全部通过
    fail: 返回实现修正
  stage_3:
    checks: [文档同步完成, 索引更新正确]
    pass: 全部通过
    fail: 返回同步修正
  stage_4:
    checks: [归档记录完整, CHANGELOG更新]
    pass: 全部通过
    fail: 返回归档修正

gate_failure:
  - 每次失败需用户决策
  - 可选: 修复后重试/回滚/终止
```

### 契约驱动执行

```yaml
contract_structure:
  precondition: 输入必须满足的条件
  logic: 独立的上下文空间
  postcondition: 输出必须满足的条件
  invariant: 环节内部必须保持的性质

principles:
  - 各环节独立上下文
  - 仅通过契约传递(JSON/YAML文件)
  - 禁止共享内存/状态/缓存
  - 禁止隐式依赖
  - 上下文版本化
```

### 目录保护机制（v3.0.2 新增）

```yaml
protected_directories:
  sop:
    protected: true
    reason: SOP规范文件
  docs/参考:
    protected: true
    reason: 参考文档

allow_modify_protected: false
change_requires_user_auth: true

document_output_paths:
  spec: docs/specs/{name}-spec.md
  clarification: docs/specs/{name}-clarification.md
  design: docs/design/{name}-design.md
  archive: docs/archive/{name}-archive.md
  contract: docs/contracts/{stage}-contract.yaml
```

### 需求澄清流程（v3.0.2 新增）

```yaml
clarification_rounds:
  - name: 业务背景与目标
    questions:
      - q: 这个需求要解决什么业务问题？
        purpose: 理解问题本质
      - q: 谁会使用这个功能？
        purpose: 明确用户画像
      - q: 如何衡量这个功能的成功？
        purpose: 定义验收标准
      - q: 这个需求的优先级如何？
        purpose: 评估优先级
  - name: 长期目标与短期实现
    questions:
      - q: 这个功能最终要达到什么状态？
        purpose: 理解终极目标
      - q: 第一期需要交付哪些核心能力？
        purpose: 定义MVP范围
      - q: 从短期到长期的演进路径是什么？
        purpose: 规划迭代路线
      - q: 短期实现是否可以接受技术债务？
        purpose: 评估技术风险
  - name: 边界与约束
    questions:
      - q: 这个功能不包含什么？
        purpose: 避免范围蔓延
      - q: 是否有技术栈、性能、安全方面的约束？
        purpose: 识别技术限制
      - q: 是否需要兼容现有系统？
        purpose: 评估集成影响
      - q: 团队规模、时间预算、技术能力如何？
        purpose: 评估可行性
  - name: 风险与假设
    questions:
      - q: 这个需求最大的风险是什么？
        purpose: 提前规避风险
      - q: 我们做了哪些假设？
        purpose: 暴露隐藏假设
      - q: 如果失败，可能的失败模式是什么？
        purpose: 设计降级方案
      - q: 如果上线后出现问题，如何回滚？
        purpose: 制定应急预案
```

### P1 级需求约束（v3.0.2 新增）

```yaml
P1-REQ-001:
  name: 需求澄清完整性
  desc: 阶段1必须完成多轮次多维度提问，记录用户真实意图
  verify: 检查specs/{name}-clarification.md文档完整性
  handle: 警告，建议补充澄清
  required_dimensions:
    - 业务背景与目标
    - 长期目标与短期实现
    - 边界与约束
    - 风险与假设

P1-REQ-002:
  name: 长期短期区分
  desc: 需求必须明确区分长期目标与短期实现
  verify: 检查澄清记录中是否包含"长期愿景"和"短期目标"
  handle: 警告，建议补充区分
```

### 路径选择

```yaml
paths:
  heavy:
    scenarios: [从0到1核心系统, 跨团队大型功能, 安全金融高风险模块, 长期演进基础设施]
    flow: stage_0 -> stage_1(完整设计) -> stage_2 -> stage_3 -> stage_4
    outputs: [工程宪章文档, 系统规范文档, 约束矩阵]
  light:
    scenarios: [小功能增量需求, UI接口配置改动, 试验性功能, Bug修复, 性能优化]
    flow: stage_0 -> stage_1(简化设计) -> stage_2 -> stage_3 -> stage_4
    outputs: [proposal.md, confirmation.md, archive.md]
  fast:
    scenarios: [单文件, <30行, 无逻辑变更]
    flow: stage_2(跳过设计) -> stage_3
```

### 文档模板位置（v3.0.2）

```yaml
templates:
  PRD_MRD_FRD:
    path: sop/06_templates/documents/proposal.md
  架构设计:
    path: sop/06_templates/documents/design.md
  实现设计:
    path: src/**/design.md
  ADR:
    path: docs/04_context_reference/adr_*.md
  Stage契约:
    path: sop/03_workflow/contracts/stage-{0-4}-contract.yaml
  归档文档:
    path: sop/06_templates/documents/archive.md
  确认文档:
    path: sop/06_templates/documents/confirmation.md
  审查报告:
    path: sop/06_templates/reports/review-report.md
  约束报告:
    path: sop/06_templates/reports/constraint-report.md
```

### 相关文档

```yaml
related_docs:
  - sop/AGENT_SOP.md: Spec-First 架构入口
  - sop_GUIDE.md: SOP 文档审查规范
  - sop/01_constitution/: P0 级规范
  - sop/02_specifications/: P1-P2 级规范
  - sop/03_workflow/: 5 阶段工作流
  - sop/04_skills/: 4 类 Skill
  - sop/05_constraints/: P0-P3 约束
  - sop/06_templates/: 契约/文档/报告模板
  - sop/07_reference/: 参考材料
```
