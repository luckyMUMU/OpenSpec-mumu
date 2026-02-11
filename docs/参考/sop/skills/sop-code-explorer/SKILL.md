---
name: "sop-code-explorer"
description: "Code audit workflow for impact assessment and risk identification. Invoke before implementation to understand existing code and assess change impact."
---

# Code Audit Workflow

> **版本**: v1.5.0

**位置**: `sop/skills/sop-code-explorer/SKILL.md`

## 触发条件

- 开始实现前，需要理解现有代码并评估变更影响面
- 涉及跨目录改动、重构、API变更，需要先做风险识别与依赖扫描

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

- 交付物（模板）：04_reference/interaction_formats/code_audit_report.md
- 交付物（落盘）：`temp/code_audit_report.md`
- CMD: `AUDIT(scope)` / `LIST_DESIGN_MD(root)`

## Stop Points

- `[USER_DECISION]`: 风险评估为 Critical 且存在不可接受的代价/不确定性

## Constraints

- Read-only
- No modifications
- Objective analysis
- Clear risk levels
- Must reference SSOT when using states/commands: 05_constraints/state_dictionary.md, 05_constraints/command_dictionary.md
- **Directory-level impact assessment**
- **Map all design.md locations**
- **Identify cross-directory dependencies**

## Failure Handling

- 当审计范围/目标不清晰导致无法评估影响面时，必须停止并进入 `[USER_DECISION]` 要求补全输入
