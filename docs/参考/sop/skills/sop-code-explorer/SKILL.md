---
name: "sop-code-explorer"
description: "Code audit workflow for impact assessment and risk identification. Invoke before implementation to understand existing code and assess change impact."
---

# Code Audit Workflow

> **版本**: v1.1.0

## Input

```markdown
## Audit Target
- Files: [paths]
- Scope: [change description]

## Context
- Project type: [new/existing]
- Related modules: [list]
- Constraints: [constraints]
```

## Workflow Steps

### Step 1: Directory Structure Scan

**Purpose**: Map directory structure and identify all design.md files

**Actions**:
1. Scan project directory structure
2. Identify all design.md files
3. Calculate directory depth for each
4. Build directory tree

**Directory Tree Output**:
```
src/
├── core/
│   ├── design.md          (depth: 2)
│   ├── utils/
│   │   └── design.md      (depth: 3)
│   └── helpers/
├── api/
│   └── design.md          (depth: 2)
└── web/
    └── design.md          (depth: 2)
```

### Step 2: Code Reading

**Purpose**: Understand current implementation

**Actions**:
1. Read target files
2. Identify key logic
3. Note dependencies

### Step 3: Dependency Analysis (Directory-based)

**Purpose**: Map relationships between directories

**Actions**:
1. Identify imports/requires between directories
2. Map directory-level dependencies
3. Find coupling points
4. Identify shared dependencies

**Dependency Map Output**:
```markdown
## Directory Dependencies

| Directory | Depends On | Used By |
|-----------|------------|---------|
| src/core/ | - | src/api/, src/web/ |
| src/core/utils/ | - | src/core/ |
| src/api/ | src/core/ | - |
| src/web/ | src/core/ | - |
```

### Step 4: Impact Assessment (Directory-level)

**Purpose**: Evaluate change scope at directory level

**Actions**:
1. Identify affected directories
2. Assess impact level per directory
3. Estimate effort per directory
4. Identify cascade effects

**Impact Analysis Output**:
```markdown
## Directory Impact Analysis

| Directory | Impact Level | Changes Required | Dependencies Affected |
|-----------|--------------|------------------|---------------------|
| src/core/ | High | Interface changes | src/api/, src/web/ |
| src/api/ | Medium | Update calls | - |
| src/web/ | Medium | Update calls | - |
```

### Step 5: Risk Identification

**Purpose**: Find potential issues

**Severity**:
- 🔴 Critical: Breaking changes across directories
- 🟡 Warning: High risk dependencies
- 🟢 Suggestion: Improvements

**Risk Categories**:
- Cross-directory coupling
- Circular dependencies
- Deep dependency chains
- Shared state between directories

## Output

```markdown
## Code Audit Report

### Directory Structure
```
[Directory tree with depths]
```

### Target
- Files: [paths]
- Lines: [count]
- Directories affected: [N]

### Directory Impact Analysis
| Directory | Level | Description | Dependencies |
|-----------|-------|-------------|--------------|
| [name] | [H/M/L] | [desc] | [list] |

### Directory Dependencies
```
[Dependency graph]
```

### Dependency Matrix
| Source | Target | Type | Strength |
|--------|--------|------|----------|
| [dir1] | [dir2] | [import/interface] | [strong/weak] |

### Risks
- 🔴 [Critical]: [desc] → Affects [directories]
- 🟡 [Warning]: [desc] → Affects [directories]
- 🟢 [Suggestion]: [desc]

### Recommendations
1. [rec] - Priority: [H/M/L]
2. [rec] - Priority: [H/M/L]

### Parallel Execution Suggestions
| Batch | Directories | Reason |
|-------|-------------|--------|
| 1 | [dirs] | Deepest depth, no dependencies |
| 2 | [dirs] | Next depth, dependencies in batch 1 |
| 3 | [dirs] | Final layer |
```

## Constraints

- Read-only
- No modifications
- Objective analysis
- Clear risk levels
- **Directory-level impact assessment**
- **Map all design.md locations**
- **Identify cross-directory dependencies**
