# 差异矩阵 (AGENT vs 人类)

## 元信息
- **日期**: 2026-02-11
- **SOP版本基线**: v1.5.0
- **对比范围**: `AGENT_SOP.md` vs `sop_for_human.md`

## 关键差异

| 主题 | AGENT位置 | 人类位置 | 差异描述（命令式） | 结论（保留/修复/删除） | 交付物 |
|------|----------|----------|--------------------|------------------------|--------|
| **文档缺失** | `AGENT_SOP.md` | `sop_for_human.md` | **严重错误**: `sop_for_human.md` 文件不存在 | **必须修复**: 根据 `AGENT_SOP.md` 和 `sop_GUIDE.md` 重新创建 `sop_for_human.md` | `sop_for_human.md` |
| **来源与依赖** | `AGENT_SOP.md` (隐含) | N/A | AGENT版本通过Prompts和Skills强制执行，人类版本缺失对应章节 | **必须添加**: 在重建的 `sop_for_human.md` 中增加“来源与依赖合规”章节 | `sop_for_human.md` |

## 详细对比 (基于 AGENT_SOP.md 现状)

由于 `sop_for_human.md` 缺失，以下仅列出 AGENT_SOP.md 中定义的核心逻辑，作为重建人类版本的基准：

1.  **核心约束**: 7条核心约束 + 禁止项矩阵
2.  **角色体系**: 12个角色 (Router, Explorer, Analyst, Prometheus, Skeptic, Oracle, Tester, Worker, TestWorker, CodeReviewer, Librarian, Supervisor)
3.  **工作流**:
    - 快速路径
    - 深度路径 (核心流程, 目录并行流程)
    - TDD路径
    - 分层验收路径 (L1-L4)
4.  **需求分层**: L1(Project) -> L2(Module) -> L3(Feature/Prototype)
5.  **三错即停**: 3 strikes rule
6.  **来源与依赖**: 必须声明来源，缺失时触发 User Decision
