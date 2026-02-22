# 版本核对

## 元信息

| 字段 | 值 |
|------|------|
| 审查日期 | 2026-02-22 |
| 目标主/次版本 | v2.2.x（以 sop/CHANGELOG.md 为准） |
| CHANGELOG 版本 | v2.2.0 |

---

## 核心文档版本核对

| 文件 | 声明版本 | 是否符合目标主/次版本 | 修复动作（命令式） |
|------|----------|----------------------|-------------------|
| sop/CHANGELOG.md | v2.2.0 | ✅ 基准 | - |
| sop/05_constraints/state_dictionary.md | v2.2.0 | ✅ 符合 | - |
| sop/05_constraints/command_dictionary.md | v2.2.0 | ✅ 符合 | - |
| sop/02_skill_matrix/index.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/05_constraints/constraint_matrix.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/04_reference/index.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/04_reference/prompt_pack.standard.md | v2.0.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/04_reference/document_directory_mapping.md | v2.4.0 | 🟡 超前 | 版本超前，需确认是否正确 |
| sop/04_reference/design_directory_strategy.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/04_reference/design_decision_rules.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |

---

## Skill 合约版本核对

| 文件 | 声明版本 | 是否符合目标主/次版本 | 修复动作（命令式） |
|------|----------|----------------------|-------------------|
| sop/skills/sop-progress-supervisor/SKILL.md | v2.2.0 | ✅ 符合 | - |
| sop/skills/sop-workflow-orchestrator/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-code-explorer/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-requirement-analyst/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-architecture-design/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-architecture-reviewer/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-implementation-designer/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-test-design-csv/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-test-implementation/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-code-implementation/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-code-review/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-document-sync/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-fast-path/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-deep-path/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-tdd-workflow/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-capability-reuse/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |
| sop/skills/sop-design-placement/SKILL.md | v2.1.0 | 🔴 不符合 | 必须将版本更新为 v2.2.0 |

---

## 统计

| 类别 | 符合 | 不符合 | 超前 |
|------|------|--------|------|
| 核心文档 | 3 | 6 | 1 |
| Skill 合约 | 1 | 16 | 0 |
| **总计** | **4** | **22** | **1** |

---

## 修复建议

### 批量修复命令

需要将以下文件的版本号从当前版本更新为 v2.2.0：

**核心文档（6个）**:
1. sop/02_skill_matrix/index.md
2. sop/05_constraints/constraint_matrix.md
3. sop/04_reference/index.md
4. sop/04_reference/prompt_pack.standard.md
5. sop/04_reference/design_directory_strategy.md
6. sop/04_reference/design_decision_rules.md

**Skill 合约（16个）**:
1. sop/skills/sop-workflow-orchestrator/SKILL.md
2. sop/skills/sop-code-explorer/SKILL.md
3. sop/skills/sop-requirement-analyst/SKILL.md
4. sop/skills/sop-architecture-design/SKILL.md
5. sop/skills/sop-architecture-reviewer/SKILL.md
6. sop/skills/sop-implementation-designer/SKILL.md
7. sop/skills/sop-test-design-csv/SKILL.md
8. sop/skills/sop-test-implementation/SKILL.md
9. sop/skills/sop-code-implementation/SKILL.md
10. sop/skills/sop-code-review/SKILL.md
11. sop/skills/sop-document-sync/SKILL.md
12. sop/skills/sop-fast-path/SKILL.md
13. sop/skills/sop-deep-path/SKILL.md
14. sop/skills/sop-tdd-workflow/SKILL.md
15. sop/skills/sop-capability-reuse/SKILL.md
16. sop/skills/sop-design-placement/SKILL.md

### 特殊处理

- `sop/04_reference/document_directory_mapping.md` 版本为 v2.4.0，超前于 CHANGELOG。需确认：
  1. 是否应将 CHANGELOG 更新为 v2.4.0
  2. 或将该文件版本回退为 v2.2.0
