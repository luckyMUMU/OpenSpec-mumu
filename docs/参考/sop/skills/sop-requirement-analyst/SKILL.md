---
name: "sop-requirement-analyst"
description: "Requirement analysis workflow for multi-level requirements (L1 PRD / L2 MRD / L3 FRD). Invoke when starting a new project, module, or feature, or when requirements need clarification."
---

# Requirement Analysis Workflow

> **版本**: v1.4.0

## Input

- user_request
- background/constraints/related_docs
- project_type（new project/module/feature）

## Workflow Steps

### Step 1: Requirement Level Identification

**Determine level**:
| Level | Condition | Output |
|-------|-----------|--------|
| L1 | New project | Project PRD |
| L2 | New module | Module MRD |
| L3 | New feature | Feature FRD |

### Step 2: Dialogue Elicitation

**Purpose**: Clarify user needs

Rounds: core → clarify → confirm

### Step 3: Multi-Level PRD Generation
模板：04_reference/document_templates/{project_prd.md,module_mrd.md,feature_frd.md,prototype_guide.md}
目录：04_reference/document_directory_mapping.md

### Step 4: Multi-Dimension Analysis
维度：Business/User/Function/Tech/Risk/Acceptance（每项输出：结论+风险）

### Step 5: User Confirmation

**Purpose**: Validate requirements

**Checklist**:
- [ ] Requirements correct?
- [ ] Scope accurate?
- [ ] Priority reasonable?
- [ ] Any missing?

**Stop Point**: `[WAITING_FOR_REQUIREMENTS]`

## Output

- Stop: `[WAITING_FOR_REQUIREMENTS]`
- CMD: `REQ_ANALYZE(input)`

## Constraints

- Must have multi-round dialogue
- Must cover 6 dimensions
- Must get user confirmation
- Must define clear boundaries
- Must support multi-level requirements
- Must create prototypes for UI projects
