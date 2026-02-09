---
name: "sop-workflow-orchestrator"
description: "Workflow orchestration for task triage and path selection. Invoke when receiving a new task request to analyze complexity, select path (fast/deep/TDD), and assign roles."
---

# Workflow Orchestration

> **版本**: v1.4.0

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

### Step 3: Directory Structure Analysis (Deep Path)

**Purpose**: Prepare for directory-based parallel execution

**Actions**:
1. Scan project directory structure
2. Identify existing design.md files
3. Calculate directory depths
4. Map directory dependencies

**Output**:
```markdown
## Directory Structure
| Directory | Depth | Has design.md | Dependencies |
|-----------|-------|---------------|--------------|
| src/core/ | 2 | ✅ | - |
| src/core/utils/ | 3 | ✅ | - |
| src/api/ | 2 | ❌ | src/core/ |
```

### Step 4: Assign Roles

**Fast Path Flow**:
```
Explorer → Worker → Librarian
```

**Deep Path Flow (Directory-based)**:
```
New project: Analyst → Prometheus ↔ Skeptic → Oracle → Supervisor → [多 Worker 并行] → Librarian
Feature:      Analyst → Oracle → Supervisor → [多 Worker 并行] → Librarian
```

**TDD Deep Path Flow (Directory-based)**:
```
Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Supervisor → [多 Worker 并行] → Librarian
                                    ↓
                              生成CSV测试用例
```

**Role Assignment with Directory Scope**:

| Stage | Role | Task | Scope |
|-------|------|------|-------|
| 1 | Analyst | 需求分析 | 全局 |
| 2 | Prometheus | 架构设计 | 全局 |
| 3 | Skeptic | 架构审查 | 全局 |
| 4 | Oracle | 实现设计 | 按目录 |
| 5 | Tester | 测试设计 | 按目录 |
| 6 | **Supervisor** | **调度协调** | **全局** |
| 7 | **Worker** | **编码实现** | **design.md 所在目录** |
| 7 | **TestWorker** | **测试实现** | **design.md 所在目录** |
| 8 | Librarian | 文档维护 | 全局 |

### Step 5: Parallel Execution Plan

**Purpose**: Define directory-based parallel execution strategy

**Actions**:
1. Group directories by depth
2. Identify parallelizable directories
3. Map dependencies
4. **Perform topological sort within same depth** (handle same-depth dependencies)
5. Create execution batches

**Execution Plan Template**:
```markdown
## Parallel Execution Plan

### Batch 1 (Depth 3)
| Directory | Worker | Dependencies |
|-----------|--------|--------------|
| src/core/utils/ | Worker-1 | None |
| src/core/helpers/ | Worker-2 | None |

### Batch 2 (Depth 2)
| Directory | Worker | Dependencies |
|-----------|--------|--------------|
| src/core/ | Worker-3 | Batch 1 |
| src/api/ | Worker-4 | Batch 1 |

### Batch 3 (Depth 1)
| Directory | Worker | Dependencies |
|-----------|--------|--------------|
| src/ | Worker-5 | Batch 2 |
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

### Directory Analysis
| Directory | Depth | Status | Action |
|-----------|-------|--------|--------|
| [dir1] | 3 | Existing | Assign Worker |
| [dir2] | 2 | New | Create design.md + Worker |

### Role Assignment
| Stage | Role | Task | Scope |
|-------|------|------|-------|
| 1 | Analyst | 需求分析 | 全局 |
| ... | ... | ... | ... |
| 6 | Supervisor | 调度协调 | 全局 |
| 7 | Worker | 编码实现 | design.md 所在目录 |

### Parallel Execution Plan
| Batch | Depth | Directories | Execution |
|-------|-------|-------------|-----------|
| 1 | 3 | [dirs] | 并行 |
| 2 | 2 | [dirs] | 并行（依赖Batch 1） |
| 3 | 1 | [dirs] | 并行（依赖Batch 2） |

### Next
@[Role]: [Specific task]
```

## Constraints

- Must accurately judge complexity
- Must consider dependencies
- Must provide clear next steps
- Must check TDD conditions
- **Must analyze directory structure for parallel execution**
- **Must create directory-based execution plan**
- **Must assign directory scope to Workers**
