---
name: "sop-architecture-design"
description: "Architecture design workflow for creating technology-agnostic designs. Invoke when requirements are confirmed and ready for architecture design."
---

# Architecture Design Workflow

> **版本**: v1.4.0

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

### Step 4: Decision Records (ADR)

**Purpose**: Document key architecture decisions in L4

**Actions**:
1. **Identify decisions requiring ADR**:
   - Technology stack selection
   - Architecture pattern changes
   - Major interface design decisions
   - Performance optimization strategies
   - Security scheme decisions
   - Any decision with >2 alternatives

2. **Create ADR for each key decision**:
   - Location: `docs/04_context_reference/adr_[module]_[topic].md`
   - Use template from `04_reference/document_templates/adr.md`
   - Link to L2 pseudo code

3. **Document in pseudo code**:
   - Add ADR reference comment
   - Example: `-- ADR-001: Authentication scheme`

4. **Check RAG references**:
   - Review `docs/04_context_reference/rag/` for relevant info
   - Reference external knowledge in ADR
   - Mark `[USER_DECISION_REQUIRED]` if conflict found

**ADR Required When**:
| Decision Type | Example | ADR Required |
|--------------|---------|--------------|
| Technology choice | Use PostgreSQL vs MongoDB | ✅ Yes |
| Architecture pattern | Microservices vs Monolith | ✅ Yes |
| Interface design | REST vs GraphQL | ✅ Yes |
| Security | OAuth2 vs JWT | ✅ Yes |
| Implementation detail | Function naming | ❌ No |
| Bug fix | Patch version | ❌ No |

## Output

```markdown
## Architecture Design Complete

### Document
- Location: `docs/02_logical_workflow/[name].md`
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
