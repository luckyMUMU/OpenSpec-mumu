---
date: 2026-02-11
baseline: v1.5.0
---

# 01 差异矩阵（规范 vs 现状）

## 元信息

- 规范来源：`sop/sop_GUIDE.md`
- 现状来源：`sop/`（以 SSOT 文件为准）

## 差异矩阵

| 主题 | 规范位置 | 现状位置 | 差异描述（命令式） | 结论（保留/修复/删除） | 交付物 |
|------|----------|----------|--------------------|------------------------|--------|
| 审查指南内容边界 | sop_GUIDE.md | - | 指南必须仅保留审查规范；禁止写死角色数量、流程串、当前版本状态表 | 修复 | `sop/sop_GUIDE.md` |
| 测试代码审查 | sop_GUIDE.md（应以 SSOT 为准） | `05_constraints/*`、`03_workflow/index.md`、`prompts/test_worker_prompt.md` | 测试代码必须进入 CodeReviewer 审查回路；停止点含义必须在 SSOT 中一致 | 保留 | `05_review_report.md` |
