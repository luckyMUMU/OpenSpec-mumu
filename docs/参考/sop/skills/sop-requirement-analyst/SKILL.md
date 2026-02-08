---
name: "sop-requirement-analyst"
description: "Requirement analysis workflow for multi-level requirements (L1 PRD / L2 MRD / L3 FRD). Invoke when starting a new project, module, or feature, or when requirements need clarification."
---

# Requirement Analysis Workflow

> **版本**: v1.0.0

## Input

```markdown
## User Request
[Original description]

## Context
- Background: [info]
- Constraints: [constraints]
- Related: [docs]
- Project type: [new project / new module / new feature]
```

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

**Rounds**:
1. **Core**: Understand problem and goal
2. **Clarify**: Resolve ambiguities
3. **Explore**: Discover hidden needs
4. **Confirm**: Validate understanding

### Step 3: Multi-Level PRD Generation

**L1 - Project PRD**:
- Location: `docs/01_requirements/project_prd.md`
- Content: Project vision, goals, scope, module list

**L2 - Module MRD**:
- Location: `docs/01_requirements/modules/[module]_mrd.md`
- Content: Module functions, boundaries, interfaces

**L3 - Feature FRD**:
- Location: `docs/01_requirements/modules/[module]/[feature]_frd.md`
- Content: Feature details, interaction flow, acceptance criteria

**L3 - Prototype** (UI projects):
- Location: `docs/01_requirements/prototypes/[module]/`
- Content: Wireframes, mockups, interaction specs

### Step 4: Multi-Dimension Analysis

| Dimension | Check | Output |
|-----------|-------|--------|
| Business | Goals, value, process | Conclusion + risk |
| User | Persona, scenario, pain | Conclusion + risk |
| Function | Scope, priority, dependency | Conclusion + risk |
| Tech | Feasibility, constraint, integration | Conclusion + risk |
| Risk | Uncertainty, mitigation | Conclusion + risk |
| Acceptance | Criteria, metrics | Conclusion + risk |

### Step 5: User Confirmation

**Purpose**: Validate requirements

**Checklist**:
- [ ] Requirements correct?
- [ ] Scope accurate?
- [ ] Priority reasonable?
- [ ] Any missing?

**Stop Point**: `[WAITING_FOR_REQUIREMENTS]`

## Output

```markdown
## Requirement Analysis Complete

### Documents
| Level | Type | Location |
|-------|------|----------|
| L1 | Project PRD | `docs/01_requirements/project_prd.md` |
| L2 | Module MRD | `docs/01_requirements/modules/[module]_mrd.md` |
| L3 | Feature FRD | `docs/01_requirements/modules/[module]/[feature]_frd.md` |
| L3 | Prototype | `docs/01_requirements/prototypes/[module]/` |

### Analysis Summary
| Dimension | Conclusion | Risk |
|-----------|------------|------|
| Business | [conclusion] | [H/M/L] |
| User | [conclusion] | [H/M/L] |
| Function | [conclusion] | [H/M/L] |
| Tech | [conclusion] | [H/M/L] |
| Risk | [conclusion] | [H/M/L] |
| Acceptance | [conclusion] | [H/M/L] |

### User Confirmation
- [ ] Requirements correct
- [ ] Scope accurate
- [ ] Priority reasonable
- [ ] No missing items

### Next
After confirmation → Architecture Design
```

## Constraints

- Must have multi-round dialogue
- Must cover 6 dimensions
- Must get user confirmation
- Must define clear boundaries
- Must support multi-level requirements
- Must create prototypes for UI projects
