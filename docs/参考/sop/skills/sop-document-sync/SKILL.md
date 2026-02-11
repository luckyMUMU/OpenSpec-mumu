---
name: "sop-document-sync"
description: "Document synchronization workflow for index updates and progressive disclosure. Invoke when documents need synchronization or status updates."
---

# Document Synchronization Workflow

> **版本**: v1.5.0

**位置**: `sop/skills/sop-document-sync/SKILL.md`

## 触发条件

- 任意文档发生新增/更新/状态变更/归档，需要同步父级索引与交叉引用
- 发现链接断裂、索引缺失、状态标记不一致，需要执行文档修复与同步

## Input

- type(add/update/status/archive)
- target(path)
- change(brief)
- parent/related(paths)

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

- 交付物：目标文档内容更新（落盘至 target/path）
- 交付物：父级索引与相关文档链接/状态更新（落盘至 parent/related paths）
- 状态：`[已完成]`
- CMD: `DOC_SYNC(scope)`

## Stop Points

- `[已完成]`: 本次同步结束
- `[USER_DECISION]`: 同步导致的结构/命名冲突需要人工选择

## Constraints

- Parent docs: summary + links only
- Progressive disclosure
- Valid links required
- Status marks: `[进行中]` / `[已完成]` / `[待审批]` / `[已归档]`

## Failure Handling

- 发现断链/缺失引用时必须修复并复查，禁止只记录不修复

## Document Levels (L1-L4)

参见 04_reference/document_directory_mapping.md（逻辑目录 → 项目实际目录映射）。

| Level | Path | Content | Creator |
|-------|------|---------|---------|
| L1 | `docs/01_requirements/` | PRD/MRD/FRD/Prototype | Analyst |
| L2 | `docs/02_logical_workflow/` | Architecture (.md) | Prometheus |
| L3 | `docs/03_technical_spec/` + `src/**/design.md` | Implementation + Test Cases | Oracle + Tester |
| L4 | `docs/04_context_reference/` | ADR + Context | Prometheus/Oracle |

## Document Types

| Type | Location | Creator |
|------|----------|---------|
| Project PRD | `docs/01_requirements/project_prd.md` | Analyst |
| Module MRD | `docs/01_requirements/modules/[module]_mrd.md` | Analyst |
| Feature FRD | `docs/01_requirements/modules/[module]/[feature]_frd.md` | Analyst |
| Prototype | `docs/01_requirements/prototypes/[module]/` | Analyst |
| Architecture | `docs/02_logical_workflow/*.md` | Prometheus |
| Implementation | `src/**/design.md` | Oracle |
| Test Cases | `docs/03_technical_spec/test_cases/*.csv` | Tester |
| Test Code | `tests/*.test.[ext]` | TestWorker |
| ADR | `docs/04_context_reference/adr_*.md` | Prometheus/Oracle |
