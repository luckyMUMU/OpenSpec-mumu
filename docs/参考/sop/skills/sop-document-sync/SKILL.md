---
name: "sop-document-sync"
description: "Document synchronization workflow for index updates and progressive disclosure. Invoke when documents need synchronization or status updates."
---

# Document Synchronization Workflow

> **版本**: v1.0.0

## Input

```markdown
## Task
- Type: [add/update/status/archive]
- Target: [document path]
- Change: [description]

## Impact
- Parent: [path]
- Related: [paths]
```

## Workflow Steps

### Step 1: Content Update

**Purpose**: Update document

**Actions**:
1. Apply changes
2. Update status
3. Mark `[进行中]` or `[已完成]`

### Step 2: Parent Index Update

**Purpose**: Maintain hierarchy

**Actions**:
1. Update parent summary
2. Add/update links
3. Ensure progressive disclosure

### Step 3: Cross-Reference Sync

**Purpose**: Maintain consistency

**Actions**:
1. Update related docs
2. Fix broken links
3. Sync status marks

### Step 4: Validation

**Purpose**: Check quality

**Actions**:
1. Validate links
2. Check structure
3. Verify format

## Output

```markdown
## Document Synchronization Complete

### Summary
- Type: [type]
- Target: [path]
- Status: [old] → [new]

### Updated
| Path | Change | Note |
|------|--------|------|
| [path] | [add/modify] | [note] |

### Validation
- Links: [valid/total]
- Structure: [pass/fail]
- Format: [pass/fail]

### Status
`[已完成]`
```

## Constraints

- Parent docs: summary + links only
- Progressive disclosure
- Valid links required
- Status marks: `[进行中]` / `[已完成]` / `[待审批]` / `[已归档]`

## Document Levels (L1-L4)

| Level | Path | Content | Creator |
|-------|------|---------|---------|
| L1 | `docs/01_requirements/` | PRD/MRD/FRD/Prototype | Analyst |
| L2 | `docs/02_logical_workflow/` | Architecture (.pseudo) | Prometheus |
| L3 | `docs/03_technical_spec/` + `src/**/design.md` | Implementation + Test Cases | Oracle + Tester |
| L4 | `docs/04_context_reference/` | ADR + Context | Prometheus/Oracle |

## Document Types

| Type | Location | Creator |
|------|----------|---------|
| Project PRD | `docs/01_requirements/project_prd.md` | Analyst |
| Module MRD | `docs/01_requirements/modules/[module]_mrd.md` | Analyst |
| Feature FRD | `docs/01_requirements/modules/[module]/[feature]_frd.md` | Analyst |
| Prototype | `docs/01_requirements/prototypes/[module]/` | Analyst |
| Architecture | `docs/02_logical_workflow/*.pseudo` | Prometheus |
| Implementation | `src/**/design.md` | Oracle |
| Test Cases | `docs/03_technical_spec/test_cases/*.csv` | Tester |
| Test Code | `tests/*.test.[ext]` | TestWorker |
| ADR | `docs/04_context_reference/adr_*.md` | Prometheus/Oracle |
