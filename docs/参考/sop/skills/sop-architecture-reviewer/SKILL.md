---
name: "sop-architecture-reviewer"
description: "Architecture review workflow with multi-round iteration. Invoke when architecture design is complete and needs quality review."
---

# Architecture Review Workflow

> **版本**: v1.5.0

**位置**: `sop/skills/sop-architecture-reviewer/SKILL.md`

## 触发条件

- 架构设计已完成，需要进行质量审查并给出可执行的修复清单
- 进入多轮审查迭代（最多 3 轮），直至通过或进入用户决策

## Input

- L2 架构文档（link 或内容）
- 目录结构（可选）
- 当前轮次 N（1-3）
- 上轮回复摘要（可选）

## Review Standards

- 标准：04_reference/review_standards/architecture_design.standard.md
- 报告质量：04_reference/review_standards/review_report.standard.md
- 项目可覆写（可选）：04_reference/review_standards/profiles/<project>.md（模板：04_reference/review_standards/_project_profile.md）

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

- 交付物（模板）：04_reference/interaction_formats/design_review.md
- 交付物（落盘）：`temp/architecture_review.md`
- CMD: `ARCH_REVIEW(l2)`（post: `[ARCHITECTURE_PASSED]` / `[USER_DECISION]`）

## Stop Points

- `[ARCHITECTURE_PASSED]`: 审查通过
- `[USER_DECISION]`: 审查僵局/冲突无法在 3 轮内收敛

## Constraints

- 6 dimensions
- Max 3 rounds
- Constructive feedback
- Clear severity levels
- Must reference SSOT when using states/commands: 05_constraints/state_dictionary.md, 05_constraints/command_dictionary.md
- **Directory structure review**
- **Cross-directory dependency check**

## Failure Handling

- 当达到最大轮次仍存在 Critical 且无法形成一致修复方案时，必须进入 `[USER_DECISION]`
