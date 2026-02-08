---
name: "sop-implementation-designer"
description: "Implementation design workflow for creating detailed technical designs. Invoke when architecture is approved and ready for implementation design."
---

# Implementation Design Workflow

> **版本**: v1.1.0

## Input

```markdown
## Architecture
[Architecture document link]

## Directory Structure
[Directory tree from Explorer]

## Context
- Tech stack: [stack]
- Constraints: [constraints]
- Existing code: [files]
```

## Workflow Steps

### Step 1: Directory-based Module Design

**Purpose**: Design implementation for each directory with design.md

**Actions**:
1. Review directory structure
2. Identify each module directory (where design.md will be placed)
3. Design module boundaries per directory
4. Define directory-level responsibilities

**Directory Module Map**:
```markdown
| Directory | Module | Responsibility |
|-----------|--------|----------------|
| src/core/ | Core | Business logic |
| src/core/utils/ | Utils | Helper functions |
| src/api/ | API | HTTP handlers |
```

### Step 2: Tech Mapping

**Purpose**: Map architecture to tech stack per directory

**Actions**:
1. Identify tech options per directory
2. Compare alternatives
3. Select best fit for each directory

### Step 3: Directory-level Interface Contract

**Purpose**: Define interfaces between directories

**Actions**:
1. Define input/output for each directory
2. Specify data structures
3. Document error handling
4. **Define cross-directory interface contracts**

**Interface Contract Template**:
```markdown
## Interface Contract for [directory]

### Input
| Param | Type | Required | Desc |
|-------|------|----------|------|
| [name] | [type] | [Y/N] | [desc] |

### Output
| Return | Type | Desc |
|--------|------|------|
| [name] | [type] | [desc] |

### Directory Dependencies
| Directory | Interface | Purpose |
|-----------|-----------|---------|
| [dep_dir] | [iface] | [purpose] |

### Exposed Interfaces
| Interface | Used By | Purpose |
|-----------|---------|---------|
| [iface] | [dir1], [dir2] | [purpose] |
```

### Step 4: Cross-Directory Dependency Design

**Purpose**: Design how directories interact

**Actions**:
1. Identify dependencies between directories
2. Design interface contracts
3. Define dependency direction
4. Avoid circular dependencies

**Dependency Design Output**:
```markdown
## Cross-Directory Dependencies

```
[src/core/utils/] → [src/core/] → [src/api/]
                              → [src/web/]
```

| Source | Target | Interface | Type |
|--------|--------|-----------|------|
| src/api/ | src/core/ | CoreService | Import |
| src/web/ | src/core/ | CoreService | Import |
| src/core/ | src/core/utils/ | Helpers | Import |
```

### Step 5: Task Decomposition (Per Directory)

**Purpose**: Create executable tasks per directory

**Actions**:
1. Break down work per directory
2. Define dependencies between directory tasks
3. Estimate effort per directory
4. Identify parallelizable tasks

**Task List Template**:
```markdown
## Tasks for [directory]

- [ ] Task 1: [description]
  - Dependencies: [other tasks]
  - Estimated: [time]
- [ ] Task 2: [description]
  - Dependencies: [other tasks]
  - Estimated: [time]
```

### Step 6: Test Strategy (Per Directory)

**Purpose**: Define testing approach per directory

**Actions**:
1. Unit test scope per directory
2. Integration test scope for cross-directory
3. Coverage targets per directory

## Output

```markdown
## Implementation Design Complete

### Documents
| Directory | Document | Status |
|-----------|----------|--------|
| src/core/ | src/core/design.md | Created |
| src/api/ | src/api/design.md | Created |

### Tech Choices
| Directory | Component | Choice | Rationale |
|-----------|-----------|--------|-----------|
| [dir] | [name] | [choice] | [reason] |

### Cross-Directory Interface Contracts
| Source | Target | Interface | Contract |
|--------|--------|-----------|----------|
| [dir1] | [dir2] | [name] | [link] |

### Directory Dependencies
```
[Dependency graph]
```

### Task Lists (Per Directory)
#### src/core/
- [ ] [task 1]
- [ ] [task 2]

#### src/api/
- [ ] [task 1]
- [ ] [task 2]

### Test Strategy (Per Directory)
| Directory | Unit | Integration | Coverage |
|-----------|------|-------------|----------|
| [dir] | [scope] | [scope] | [%] |

### Stop Point
`[WAITING_FOR_DESIGN]`
```

## design.md Rules (Per Directory)

**Directory-based**:
- Create design.md in each module directory
- One design.md per independent module directory
- Include cross-directory interface contracts

**Complexity-based**:
| Complexity | Lines | Action |
|------------|-------|--------|
| Low | <100 | Skip design.md, use code comments |
| Medium | 100-500 | Brief design.md + interface contracts |
| High | >500 | Full design.md + detailed contracts |

**Required**: Interface contract with cross-directory dependencies

## Constraints

- Project-specific
- Traceable to architecture
- Clear interfaces
- Actionable tasks
- **Directory-level design**
- **Cross-directory interface contracts**
- **Dependency direction must be clear**
