# 审查范围

## 元信息

- **审查日期**: 2026-02-23
- **审查类型**: 全面系统性审查
- **审查依据**: `docs/参考/sop_GUIDE.md` v2.4.0
- **版本基线**: v2.8.0（以 `sop/CHANGELOG.md` 为准）

---

## 审查范围

### 核心文档

| 目录 | 文件数 | 说明 |
|------|--------|------|
| `sop/` | 1 | CHANGELOG.md |
| `sop/02_skill_matrix/` | 1 | Skill 清单与边界 SSOT |
| `sop/03_workflow/` | 4 | 工作流定义 |
| `sop/04_context_reference/` | 4 | ADR 决策记录 |
| `sop/04_reference/` | 25+ | 参考文档、模板、标准 |
| `sop/05_constraints/` | 6 | 约束、字典、红线 |
| `sop/skills/` | 17 | Skill 合约定义 |

### SSOT 清单

| SSOT 类型 | 文件路径 | 用途 |
|-----------|----------|------|
| Skill 清单 | `02_skill_matrix/index.md` | Skill 边界唯一来源 |
| 状态字典 | `05_constraints/state_dictionary.md` | 状态标记唯一来源 |
| 命令字典 | `05_constraints/command_dictionary.md` | 命令 DSL 唯一来源 |
| 约束矩阵 | `05_constraints/constraint_matrix.md` | 禁止项与红线 |
| 参考索引 | `04_reference/index.md` | 模板与标准入口 |

---

## 审查目标

根据 `sop_GUIDE.md` 第4节，审查必须同时满足：

1. **SSOT 一致性**：任何规则/状态/命令/路径/交付物引用必须可追溯到 SSOT
2. **流程闭环**：每个 Skill 都有清晰输入/输出/停止点/落盘交付物
3. **表达可执行**：规则满足"仅当/当…时 → 必须/禁止/仅能 → 输出"
4. **手动可操作**：模式切换/并行探索/续跑交接有模板支撑
5. **简洁且可审计**：信息不重复，长内容下沉并可按需引用

---

## 核心变更

本次审查伴随重大架构变更：

### 🔴 BREAKING：删除 prompts 目录

- 删除 `prompts/` 整个目录（20个文件）
- 全局不变量合并到 `05_constraints/constraint_matrix.md`
- 编排规则合并到 `03_workflow/index.md`
- 侧重点合并到各 `skills/*/SKILL.md`

### 变更原因

- 消除内容重复，符合 SSOT 原则
- Prompt Pack 与 Skill 合约存在大量重合
- 维护成本高，易产生不一致

---

## 排除范围

- `docs/参考/sop/reviews/` 历史审查报告（仅供参考）
- `.trae/specs/` 临时任务目录
