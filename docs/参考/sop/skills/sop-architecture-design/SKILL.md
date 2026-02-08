---
name: "sop-architecture-design"
description: "Architecture design workflow for creating technology-agnostic designs. Invoke when requirements are confirmed and ready for architecture design."
---

# Architecture Design Workflow

> **版本**: v1.1.0

## Input

```markdown
## Requirements
- PRD: [link]
- Key requirements: [list]
- Constraints: [constraints]

## Directory Structure (from Explorer)
[Directory tree]
```

## Workflow Steps

### Step 1: Concept Design (Directory-aware)

**Purpose**: Define system concepts with directory structure in mind

**Actions**:
1. Identify core concepts
2. Define boundaries aligned with directories
3. Map concepts to directory structure
4. Define relationships

### Step 2: Interface Definition

**Purpose**: Define system interfaces

**Actions**:
1. Define input/output
2. Specify data structures
3. Document error handling
4. Define cross-directory interfaces

### Step 3: Pseudocode

**Purpose**: Describe logic

**Actions**:
1. Write algorithm pseudocode
2. Define control flow
3. Document edge cases

### Step 4: Decision Records

**Purpose**: Document choices

**Actions**:
1. List alternatives
2. Compare pros/cons
3. Record final decision

## Output

```markdown
## Architecture Design Complete

### Document
- Location: `docs/02_logical_workflow/[name].pseudo`
- Link: [link]

### Key Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| [topic] | [choice] | [reason] |

### Interfaces
- Input: [spec]
- Output: [spec]

### Directory Mapping
| Concept | Directory | Responsibility |
|---------|-----------|----------------|
| [concept] | [dir] | [resp] |

### Stop Point
`[WAITING_FOR_ARCHITECTURE]`
```

## Constraints

- Technology-agnostic
- Reusable across projects
- Clear interfaces
- Documented decisions
- **Directory-aware design**
- **Concept-to-directory mapping**
