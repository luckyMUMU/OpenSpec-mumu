---
name: "sop-code-explorer"
description: "Code audit workflow for impact assessment and risk identification. Invoke before implementation to understand existing code and assess change impact."
---

# Code Audit Workflow

> **版本**: v1.4.0

## Input

- Audit Target: files/dirs + change scope
- Context: project type + constraints

## Workflow Steps

### Step 1: Directory Structure Scan

**Purpose**: Map directory structure and identify all design.md files

**Actions**:
1. Scan project directory structure
2. Identify all design.md files
3. Calculate directory depth for each
4. Build directory tree

CMD: `LIST_DESIGN_MD(root) -> design_list`

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

输出：directory_dependencies（写入 audit_report）

### Step 4: Impact Assessment (Directory-level)

**Purpose**: Evaluate change scope at directory level

**Actions**:
1. Identify affected directories
2. Assess impact level per directory
3. Estimate effort per directory
4. Identify cascade effects

输出：directory_impact（写入 audit_report）

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

- 模板：04_reference/interaction_formats/code_audit_report.md
- CMD: `AUDIT(scope)` / `LIST_DESIGN_MD(root)`

## Constraints

- Read-only
- No modifications
- Objective analysis
- Clear risk levels
- **Directory-level impact assessment**
- **Map all design.md locations**
- **Identify cross-directory dependencies**
