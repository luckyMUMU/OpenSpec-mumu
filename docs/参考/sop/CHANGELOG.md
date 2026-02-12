---
version: v2.1.0
updated: 2026-02-12
---

# SOP 版本变更历史

---

## 版本号规则

```
v[主版本].[次版本].[修订版本]
```

| 版本位 | 变更类型 | 示例 |
|--------|----------|------|
| **主版本** | 体系重大变更（Skill/Prompt Pack/SSOT 重构） | v1→v2 |
| **次版本** | 新增/调整 Skill、工作流、文档类型 | v2.0→v2.1 |
| **修订版本** | 文档修正、错误修复、格式统一 | v2.0.0→v2.0.1 |

---

## 版本历史

### v2.1.0 (2026-02-12)

**入口统一与任务管理增强** - 合并入口文档，增强 design.md 任务管理能力

#### 关键变更

- **入口统一**：合并 `LLM_INDEX.md` 到 `AGENT_SOP.md` 作为唯一入口
- **角色定位**：`sop_for_human.md` 标记为仅供参考
- **任务状态管理**：新增任务状态（待处理/进行中/已完成/已阻塞/已归档）
- **任务命令**：新增 `TASK_START`、`TASK_COMPLETE`、`TASK_BLOCK`、`TASK_ARCHIVE` 命令
- **归档机制**：`sop-document-sync` 支持目录归档时自动清除已完成任务

#### 主要更新文件

- 入口：`AGENT_SOP.md`（合并原 `LLM_INDEX.md`）
- 模板：`04_reference/document_templates/implementation_design.md`
- 状态字典：`05_constraints/state_dictionary.md`
- 命令字典：`05_constraints/command_dictionary.md`
- Skill合约：`skills/sop-document-sync/SKILL.md`

#### 删除文件

- `LLM_INDEX.md`（已合并至 `AGENT_SOP.md`）

---

### v2.0.0 (2026-02-12)

**Skill-first 体系上线** - 以 Skill 作为唯一执行单元，Prompt Pack 作为偏好层，SSOT 收敛

#### 关键变更

- **Skill 矩阵 SSOT**：新增/完善 `02_skill_matrix/index.md`，作为 Skill 清单与边界唯一真源
- **Prompt Pack 规范化**：Prompts 以 `prompts/packs/<pack>/skills/<skill>.md` 组织，默认 pack 为 `default`
- **测试资产隔离**：引入 `sop-test-design-csv` 与 `sop-test-implementation`，并在约束中固化 CSV 与测试代码隔离规则
- **字典与约束收敛**：状态/命令/红线统一以 `05_constraints/*` 为准，工作流直接引用 SSOT
- **交付物模板统一**：交互格式与文档模板统一引用 `04_reference/*`，便于审查与落盘

#### 主要更新文件（摘要）

- SSOT：`02_skill_matrix/index.md`
- 工作流：`03_workflow/*`
- 约束：`05_constraints/*`
- 模板与标准：`04_reference/*`
- Prompt Pack：`prompts/packs/default/*`
- Skill 合约：`skills/*/SKILL.md`

---

## 备注

- 若需要追溯 v1.x 版本历史，请以版本控制系统中的历史记录为准。
