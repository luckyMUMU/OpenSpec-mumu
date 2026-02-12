---
version: v2.0.0
updated: 2026-02-12
---

# sop-workflow-orchestrator (default)
## 侧重点
- 优先最小可行调用链；仅当风险/范围不清时才升级深度路径
- 所有结论必须绑定“来源与依赖声明”；缺口直接触发 `[USER_DECISION]`

## 输出
- 必须包含：路径选择、Skill 调用链、每一步输入/输出、落盘交付物路径
