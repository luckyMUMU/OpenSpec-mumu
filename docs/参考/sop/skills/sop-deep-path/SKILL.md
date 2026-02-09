---
name: "sop-deep-path"
description: "Deep path workflow for complex changes. Invoke when task is triaged as deep path (cross-file, new feature, refactor, API change)."
---

# Deep Path Workflow

> **版本**: v1.4.0

## Input

```markdown
## Task
[Feature/Refactor description]

## Context
- Type: [new/refactor/api/architecture]
- Scope: [cross-file/modules]
- Constraints: [constraints]
```

## Workflow Steps

### Step 1: Requirement Analysis

**Purpose**: Clarify requirements

**Actions**:
1. Multi-round dialogue with user
2. Generate PRD
3. 6-dimension analysis
4. Get user confirmation

**Stop Point**: `[WAITING_FOR_REQUIREMENTS]`

### Step 2: Code Audit (Optional)

**Purpose**: Impact assessment

**Actions**:
1. Analyze existing code
2. **Scan directory structure, identify all design.md files**
3. **Map directory dependencies**
4. Assess impact scope

### Step 3: Architecture Design

**Purpose**: Technology-agnostic design

**Actions**:
1. Design system architecture
2. Write pseudocode
3. Define interfaces
4. Record decisions

**Stop Point**: `[WAITING_FOR_ARCHITECTURE]`

### Step 4: Architecture Review

**Purpose**: Quality assurance

**Actions**:
1. Review 6 dimensions
2. Identify issues
3. Multi-round iteration

**Max**: 3 rounds

**Stop Points**:
- Pass: `[ARCHITECTURE_PASSED]`
- Deadlock: `[USER_DECISION]`

### Step 5: Implementation Design (Directory-based)

**Purpose**: Project-specific design

**Actions**:
1. Map to tech stack
2. Compare options
3. **Create design.md for each module directory**
4. **Define directory-level interface contracts**
5. **Identify cross-directory dependencies**

**Stop Point**: `[WAITING_FOR_DESIGN]`

### Step 6: Directory Scheduling

**Purpose**: Create parallel execution plan

**Actions**:
1. **Scan all design.md files**
2. **Calculate directory depth for each**
3. **Create directory-Worker mapping table**
4. **Identify dependencies between directories**

**Stop Point**: `[SCHEDULING]`

### Step 7: Code Implementation (Parallel)

**Purpose**: Physical coding with directory-based parallel execution

**Actions**:
1. **Supervisor launches Workers by directory depth (deepest first)**
2. **Workers process in parallel for same depth, no dependency**
3. **Worker marks `[DIR_WORKING]` when starting**
4. **Worker implements only within its design.md directory**
5. **If cross-directory change needed, mark target design.md and notify Supervisor**
6. **Worker marks `[DIR_WAITING_DEP]` when waiting for dependency**
7. **Worker marks `[DIR_COMPLETED]` when done**
8. Run tests
9. Quality checks

**Stop Point**: Show diff for review

### Step 8: Document Maintenance

**Purpose**: Sync docs

**Actions**:
1. Update parent indexes
2. Sync cross-references
3. Mark `[completed]`

## Output

```markdown
## Deep Path Complete

### Stages Completed
- [x] Requirement Analysis
- [x] Architecture Design
- [x] Architecture Review
- [x] Implementation Design
- [x] Code Implementation
- [x] Document Maintenance

### Artifacts
- PRD: [path]
- Architecture: [path]
- Implementation: [path]
- Code: [changes]

### Status
`[completed]`
```

## Constraints

- Must follow all stages
- Must pass reviews
- 3-strike rule applies
- Document must sync

## 3-Strike Rule

| Strike | Condition | Action |
|--------|-----------|--------|
| 1 | Implementation fails | Auto-fix |
| 2 | Fails again | Audit + redesign |
| 3 | Fails again | **Break**, user decision |
