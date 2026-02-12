---
version: v2.0.0
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
