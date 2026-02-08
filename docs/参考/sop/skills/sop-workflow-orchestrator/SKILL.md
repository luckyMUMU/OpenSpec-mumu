---
name: "sop-workflow-orchestrator"
description: "Workflow orchestration for task triage and path selection. Invoke when receiving a new task request to analyze complexity, select path (fast/deep/TDD), and assign roles."
---

# Workflow Orchestration

> **版本**: v1.0.0

## Input

```markdown
## Task Request
[User request]

## Context
- Project type: [new/feature/refactor]
- Related files: [list]
- Urgency: [high/medium/low]
- Constraints: [constraints]
```

## Workflow Steps

### Step 1: Analyze Task Complexity

Check conditions:
| Condition | Fast Path | Deep Path | TDD Path |
|-----------|-----------|-----------|----------|
| Single file | ✅ Yes | ❌ No | ❌ No |
| Lines < 30 | ✅ Yes | ❌ No | ❌ No |
| No logic change | ✅ Yes | ❌ No | ❌ No |
| Cross-file | ❌ No | ✅ Yes | ✅ Yes |
| New feature | ❌ No | ✅ Yes | ✅ Yes |
| Refactor | ❌ No | ✅ Yes | ✅ Yes |
| API change | ❌ No | ✅ Yes | ✅ Yes |
| Core business | ❌ No | ❌ No | ✅ Yes |
| Complex logic | ❌ No | ❌ No | ✅ Yes |

### Step 2: Select Path

**Fast Path** (all conditions met):
- Single file + <30 lines + no logic change

**Deep Path** (any condition met):
- Cross-file / new feature / refactor / API change / architecture

**TDD Deep Path** (deep path + any condition):
- Core business / complex logic / high coverage requirement

### Step 3: Assign Roles

**Fast Path Flow**:
```
Explorer → Worker → Librarian
```

**Deep Path Flow**:
```
New project: Analyst → Prometheus ↔ Skeptic → Oracle → Worker → Librarian
Feature:      Analyst → Oracle → Worker → Librarian
```

**TDD Deep Path Flow**:
```
Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Worker + TestWorker → Librarian
                                    ↓
                              生成CSV测试用例
```

## Output

```markdown
## Orchestration Result

### Path Selection
- [ ] Fast Path
- [ ] Deep Path
- [x] TDD Deep Path

### Reason
[Why this path]

### Role Assignment
| Stage | Role | Task |
|-------|------|------|
| 1 | [Role] | [Task] |

### Next
@[Role]: [Specific task]
```

## Constraints

- Must accurately judge complexity
- Must consider dependencies
- Must provide clear next steps
- Must check TDD conditions
