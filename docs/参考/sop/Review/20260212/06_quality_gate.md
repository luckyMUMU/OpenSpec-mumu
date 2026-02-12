---
version: v2.0.0
updated: 2026-02-12
artifact: Quality Gate
---

# 质量门禁（20260212）

## 门禁项

| 门禁 | 判定 | 证据 |
|---|---|---|
| GUIDE 合规审查（🔴/🟠=0） | PASS | `node scripts/sop-guide-audit.mjs --date 20260212` → [04_issues.md](04_issues.md) |
| SOP lint | PASS | `npm run check:sop` 输出：`✅ sop-lint: OK` |
| 内部链接可达性 | PASS | `npm test -- --run test/sop/sop-links.test.ts` |
| 单入口 ≤3 跳可达 | PASS | `npm test -- --run test/sop/sop-links.test.ts` |

## 执行记录（摘要）

### check:sop

```
✅ sop-lint: OK
```

### sop-links.test.ts

```
✓ docs/参考/sop link graph > has no missing internal link targets
✓ docs/参考/sop link graph > keeps max shortest-link depth <= 3 from AGENT_SOP.md (v2.1.0 合并原 LLM_INDEX.md)
```
