# prompts 目录删除与合并记录

## 元信息

- **执行日期**: 2026-02-23
- **变更类型**: 🔴 BREAKING
- **影响范围**: 全局

---

## 删除原因

根据 SSOT 原则，`prompts/` 目录存在以下问题：

1. **内容重复**：Prompt Pack 与 Skill 合约内容大量重合
2. **维护成本高**：两套文档需同步维护，易产生不一致
3. **违反 SSOT**：同一信息存在多个来源

---

## 删除文件清单

### 系统级文件

| 文件路径 | 处理方式 |
|----------|----------|
| `prompts/packs/default/00_system.md` | 已合并到 `05_constraints/constraint_matrix.md` |
| `prompts/packs/default/01_operator.md` | 已合并到 `03_workflow/index.md` |
| `prompts/packs/default/index.md` | 已删除 |

### Skill 级文件

| 文件路径 | 处理方式 |
|----------|----------|
| `prompts/packs/default/skills/sop-workflow-orchestrator.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-fast-path.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-deep-path.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-code-explorer.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-requirement-analyst.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-architecture-design.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-architecture-reviewer.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-implementation-designer.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-design-placement.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-progress-supervisor.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-code-implementation.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-code-review.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-document-sync.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-capability-reuse.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-tdd-workflow.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-test-design-csv.md` | 已合并到对应 SKILL.md |
| `prompts/packs/default/skills/sop-test-implementation.md` | 已合并到对应 SKILL.md |

**删除文件总数**: 20 个

---

## 内容合并详情

### 1. 00_system.md → constraint_matrix.md

合并内容：
- 全局不变量（表达规范、SSOT 引用、来源与依赖、停止点、落盘要求）
- 禁止项（旧术语禁止、重复禁止）
- 后果等级定义

合并位置：`05_constraints/constraint_matrix.md` 新增"全局不变量"章节

### 2. 01_operator.md → 03_workflow/index.md

合并内容：
- 启用条件（ultrawork 标记说明）
- 能力选择协议（选择清单、排除清单）
- 停止点与升级规则

合并位置：`03_workflow/index.md` 新增"编排入口"和"能力选择协议"章节

### 3. skills/*.md → skills/*/SKILL.md

合并内容：
- 侧重点描述
- 输出要求补充

合并位置：各 `skills/*/SKILL.md` 新增"侧重点"章节

---

## 后续处理

### prompt_pack.standard.md

- **状态**: 已标记为废弃
- **处理**: 保留文件作为历史参考，在 `04_reference/index.md` 中标注"已废弃"

### 02_skill_matrix/index.md

- **变更**: 删除"默认 Prompt 模块"列
- **原因**: 不再需要 Prompt Pack 映射

---

## 验证结果

| 验证项 | 结果 |
|--------|------|
| prompts 目录已删除 | ✅ 通过 |
| 内容已合并到 SSOT 位置 | ✅ 通过 |
| 无孤立引用 | ✅ 通过 |
| 版本号已更新 | ✅ 通过 |

---

## 结论

`prompts/` 目录已成功删除，内容已合并到 SSOT 位置。SOP 体系现在符合单一真源原则。
