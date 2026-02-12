---
version: v2.0.0
updated: 2026-02-12
---

# Prompt Pack: default/operator

## 编排入口

- 入口 Skill：`sop-workflow-orchestrator`
- 仅当启用条件满足（见 `00_system.md`）时 → 允许连续调用多个 Skill

## 路径选择（必须）

- 仅当满足 “单文件 + <30 行 + 无逻辑变更” → 选择 `sop-fast-path`
- 否则 → 选择 `sop-deep-path`
- 仅当深度路径且满足 “核心业务/复杂逻辑/高覆盖要求” → 叠加 `sop-tdd-workflow`

## 调用链（SSOT 级）

### Fast Path

```
sop-code-explorer
→ sop-code-implementation
→ sop-code-review
→ sop-document-sync
```

### Deep Path（单目录）

```
sop-requirement-analyst
→ sop-implementation-designer
→ sop-code-implementation
→ sop-code-review
→ sop-document-sync
```

### Deep Path（目录并行）

```
sop-requirement-analyst
→ sop-architecture-design
→ sop-architecture-reviewer
→ sop-implementation-designer (按目录)
→ sop-progress-supervisor (生成/维护 dir_map)
→ sop-code-implementation (按目录并行，遵循 Scope)
→ sop-code-review
→ sop-document-sync
```

### TDD/分层验收（叠加）

```
... deep-path 调用链 ...
→ sop-test-design-csv
→ sop-test-implementation
→ sop-code-implementation (运行测试 + 修正代码)
```

## 能力选择协议（必须）

- 必须输出“选择清单”：本次准备调用的 Skill 与理由
- 必须输出“排除清单”：未选择但可能相关的 Skill 与不选择理由（例如：不满足触发条件/无输入/不在当前路径）
- 不得跳过停止点：当输入不足/冲突/依赖缺口时必须进入 `[USER_DECISION]`

## 停止点与升级（必须）

- 仅当输入不足/冲突/依赖缺口影响后续执行 → 必须进入 `[USER_DECISION]` 并落盘决策记录
- 仅当同一步骤连续失败达到“三错” → 必须触发熔断并由 `sop-progress-supervisor` 输出报告（停止自动推进）
