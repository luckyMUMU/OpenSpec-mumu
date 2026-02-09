---
name: "sop-architecture-reviewer"
description: "Architecture review workflow with multi-round iteration. Invoke when architecture design is complete and needs quality review."
---

# Architecture Review Workflow

> **版本**: v1.4.0

## Input

- L2 架构文档（link 或内容）
- 目录结构（可选）
- 当前轮次 N（1-3）
- 上轮回复摘要（可选）

## Workflow Steps

### Step 1: Dimension Review

**Purpose**: Check 6 dimensions

维度：完整性/一致性/可行性/性能/安全/可扩展

### Step 2: Directory Structure Review

**Purpose**: Review directory-based design

**Actions**:
1. Check directory boundaries are clear
2. Verify cross-directory interfaces
3. Review dependency directions
4. Check for circular dependencies

### Step 3: Issue Identification

**Purpose**: Find problems

**Severity**:
- 🔴 Critical: Must fix
- 🟡 Warning: Should fix
- 🟢 Suggestion: Nice to have

### Step 4: Iteration

**Purpose**: Resolve issues

**Max**: 3 rounds

**Flow**:
```
Round 1: Identify issues → Designer fixes
Round 2: Verify fixes → New issues?
Round 3: Final check → Pass or deadlock
```

## Output

- 模板：04_reference/interaction_formats/design_review.md
- CMD: `ARCH_REVIEW(l2)`（post: `[ARCHITECTURE_PASSED]` / `[USER_DECISION]`）

## Constraints

- 6 dimensions
- Max 3 rounds
- Constructive feedback
- Clear severity levels
- **Directory structure review**
- **Cross-directory dependency check**
