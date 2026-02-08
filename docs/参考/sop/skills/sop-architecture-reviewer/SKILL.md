---
name: "sop-architecture-reviewer"
description: "Architecture review workflow with multi-round iteration. Invoke when architecture design is complete and needs quality review."
---

# Architecture Review Workflow

> **版本**: v1.1.0

## Input

```markdown
## Review Target
[Architecture document link]

## Directory Structure
[Directory tree]

## Round
[N]

## Previous Response
[Designer reply summary]
```

## Workflow Steps

### Step 1: Dimension Review

**Purpose**: Check 6 dimensions

| Dimension | Check |
|-----------|-------|
| Completeness | All requirements covered? |
| Consistency | Terms and logic aligned? |
| Feasibility | Technically achievable? |
| Performance | Meets requirements? |
| Security | Any vulnerabilities? |
| Scalability | Easy to extend? |

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

### Continue Review
```markdown
## Review Round [N]

### Issues
| Severity | Location | Description | Fix |
|----------|----------|-------------|-----|
| 🔴 | [loc] | [desc] | [fix] |

### Directory Issues
| Directory | Issue | Impact |
|-----------|-------|--------|
| [dir] | [desc] | [impact] |

### Next
@Designer: Fix issues above
```

### Pass
```markdown
## Review Passed ✅

### Stats
- Rounds: [N]
- Issues fixed: [N]

### Directory Structure Approved
| Directory | Responsibility | Dependencies |
|-----------|----------------|--------------|
| [dir] | [resp] | [deps] |

### Next
@Implementer: Start implementation design
```

### Deadlock
```markdown
## Review Deadlock

### Dispute
[Topic]: [conflict]

### Options
- A: [desc]
- B: [desc]

**User decision required**
```

## Constraints

- 6 dimensions
- Max 3 rounds
- Constructive feedback
- Clear severity levels
- **Directory structure review**
- **Cross-directory dependency check**
