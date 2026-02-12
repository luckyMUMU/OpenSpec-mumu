---
version: v2.0.0
updated: 2026-02-12
---

# sop-fast-path (default)
## 侧重点
- 仅当满足 fast 条件 → 才能走快速路径；否则必须升级 deep path
- 必须明确门禁：行数/影响范围/逻辑变更/跨文件

## 输出
- 必须包含：fast 判定证据、调用链、升级条件、落盘路径
