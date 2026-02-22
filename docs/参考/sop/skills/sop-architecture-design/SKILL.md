---
name: "sop-architecture-design"
description: "Architecture design workflow for creating technology-agnostic designs. Invoke when requirements are confirmed and ready for architecture design."
version: v2.4.0
updated: 2026-02-22
---

# Architecture Design Workflow

## 触发条件

- 仅当需求已确认且需要产出 L2 架构设计时 → 必须调用本 Skill
- 仅当关键技术选型/约束存在缺口或冲突影响架构决策时 → 必须进入 `[USER_DECISION]`

## Input

- PRD（link 或内容）
- 关键约束（含安全/性能/合规）
- 目录结构（来自 `sop-code-explorer` 的 audit_report，可选）

## Workflow Steps

### Step 1: Concept Design (Directory-aware)

**Purpose**: Define system concepts with directory structure in mind

**Actions**:
1. Identify core concepts
2. Define boundaries aligned with directories
3. Map concepts to directory structure
4. Define relationships

### Step 2: Interface Definition

**Purpose**: Define system interfaces

**Actions**:
1. Define input/output
2. Specify data structures
3. Document error handling
4. Define cross-directory interfaces

### Step 3: Pseudocode

**Purpose**: Describe logic

**Actions**:
1. Write algorithm pseudocode
2. Define control flow
3. Document edge cases

### Step 4: Decision Records (ADR)

**Purpose**: Document key architecture decisions in L4

**Actions**:
1. **Identify decisions requiring ADR**:
   - Technology stack selection
   - Architecture pattern changes
   - Major interface design decisions
   - Performance optimization strategies
   - Security scheme decisions
   - Any decision with >2 alternatives

2. **Option survey (before deciding)**:
   - For each key decision, collect >=2 options
   - Compare: constraints, risks, cost, operational complexity, maintainability
   - If using external docs/best practices, save to RAG and reference in ADR（参见 04_reference/knowledge_management.md）

3. **Create ADR for each key decision**:
   - Location: `docs/04_context_reference/adr_[module]_[topic].md`（参见 04_reference/document_directory_mapping.md）
   - Use template from `04_reference/document_templates/adr.md`
   - Link to L2 pseudo code

4. **Document in pseudo code**:
   - Add ADR reference comment
   - Example: `-- ADR-001: Authentication scheme`

5. **Check RAG references**:
   - Review `docs/04_context_reference/rag/` for relevant info（参见 04_reference/document_directory_mapping.md）
   - Reference external knowledge in ADR
   - Mark `[USER_DECISION]` if conflict found

ADR 触发规则（任一满足即需要 ADR）：技术选型 / 架构模式 / 关键接口 / 安全方案 / 性能策略 / >2 个可选项

## 来源与依赖准则

- 必须声明输入来源与依赖（PRD/约束/参考资料等），并优先用 `TRACE_SOURCES(inputs)` 固化“来源与依赖声明”
- 当关键来源缺失或冲突无法消解时，必须进入 `[USER_DECISION]`，并使用 `RECORD_DECISION(topic, decision)` 落盘决策记录
- 标准：04_reference/review_standards/source_dependency.standard.md

## Output

- 模板：04_reference/document_templates/architecture_design.md
- ADR 模板：04_reference/document_templates/adr.md
- Stop: `[WAITING_FOR_ARCHITECTURE]`
- CMD: `ARCH_DESIGN(prd)`

## Stop Points

- `[WAITING_FOR_ARCHITECTURE]`: 架构设计已落盘，等待确认或进入审查
- `[USER_DECISION]`: 关键技术选型/约束依据不足或冲突不可消解

## Constraints

- Technology-agnostic
- Reusable across projects
- Clear interfaces
- Documented decisions
- **Directory-aware design**
- **Concept-to-directory mapping**
