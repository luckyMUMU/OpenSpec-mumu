---
name: "sop-code-review"
description: "Code review workflow for validating changes against design docs and common engineering practices. Invoke after implementation diff is ready and before user approval."
---

# Code Review Workflow

> **版本**: v1.5.0

## Input

- Diff（link 或内容摘要）
- 设计依据（至少一项）：
  - L2 架构文档（docs/02_logical_workflow/*.md）
  - L3 实现设计（src/**/design.md）
  - 测试设计/验收标准（docs/03_technical_spec/test_cases/*.csv / 05_constraints/acceptance_criteria.md）
- 约束依据：
  - 安全与供应链红线（05_constraints/security_supply_chain.md）
  - 目录边界与跨目录协作规则（03_workflow/deep_path.md + 05_constraints/state_dictionary.md）

## Review Standards

- 代码 Diff：04_reference/review_standards/code_diff.standard.md
- 测试代码：04_reference/review_standards/test_code.standard.md
- 来源与依赖：04_reference/review_standards/source_dependency.standard.md
- 报告质量：04_reference/review_standards/review_report.standard.md
- 项目可覆写（可选）：04_reference/review_standards/profiles/<project>.md（模板：04_reference/review_standards/_project_profile.md）

## Workflow Steps

### Step 1: Scope & Evidence Collection

**Purpose**: Make review checkable and traceable

**Actions**:
1. Identify affected files/interfaces
2. Map changes to design sections (L2/L3)
3. Identify required tests/quality gates (lint/typecheck/acceptance)
4. Record any external references used for review into RAG when they are not already captured（参见 04_reference/knowledge_management.md）

### Step 2: Dimension Review

**Purpose**: Review with a stable checklist

**Dimensions**:
1. **设计一致性**: 接口/行为/错误码/边界与设计一致
2. **正确性**: 边界条件、异常路径、并发/幂等等关键点
3. **测试与验收**: 覆盖与受影响范围匹配；分层验收门禁满足
4. **安全与供应链**: 密钥/权限/输入校验/依赖治理满足红线
5. **可维护性**: 复杂度、可读性、重复、命名、结构清晰
6. **可观测性**: 日志/错误信息/可追踪性不泄露敏感信息
7. **性能风险**: 明显的 O(N^2)、无界循环、无超时重试策略等

### Step 3: Issue Identification & Severity

**Severity**:
- 🔴 Critical: Correctness/Security/Boundary/Contract breaking
- 🟡 Warning: Quality/Maintainability/Perf risk
- 🟢 Suggestion: Nice to have

### Step 4: Iteration

**Max**: 3 rounds

**Flow**:
```
Round 1: Identify issues → Worker fixes
Round 2: Verify fixes → New issues?
Round 3: Final check → Pass or deadlock
```

When deadlock happens:
- Mark `[USER_DECISION]` and provide options

## 来源与依赖准则

- 审查报告必须包含“来源与依赖声明”（标准：04_reference/review_standards/source_dependency.standard.md），并优先用 `TRACE_SOURCES(inputs)` 固化
- 当审查依据缺失或冲突无法消解时，必须进入 `[USER_DECISION]`，并使用 `RECORD_DECISION(topic, decision)` 落盘决策记录

## Output

- 模板：04_reference/interaction_formats/code_review.md
- CMD: `CODE_REVIEW(diff, design_refs)`（pre: `[WAITING_FOR_CODE_REVIEW]`；post: `Diff展示` / `[DIR_WORKING]` / `[USER_DECISION]`）

## Constraints

- 只审查不修改：CodeReviewer 不改代码，只输出审查结论与建议
- 证据优先：结论必须绑定到设计章节/验收标准/红线条款或 RAG 引用
- 目录边界合规：禁止建议跨越 design.md 边界的直接修改路径
- 外部规范引用必须沉淀：行业规范/最佳实践若用于决策或阻塞项，需落到 RAG 并在报告中引用
