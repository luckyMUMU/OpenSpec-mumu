---
version: v1.4.0
updated: 2026-02-10
---

# Router 分诊输出格式

```markdown
## 任务分诊结果

### 路径
- Path: [fast/deep/deep+tdd]

### 需求层级
- L: [L1/L2/L3]

### 角色分配
| Stage | Role | Output |
|---|---|---|
| 1 | Analyst | PRD/MRD/FRD |
| 2 | Prometheus | L2(.md) |
| 3 | Skeptic | Review |
| 4 | Oracle | design.md |
| 5 | (optional) Tester | test design / CSV |
| 6 | Worker | code + diff |
| 6 | (optional) TestWorker | test code |
| 7 | Librarian | indexes |
| * | (optional) Supervisor | scheduling / fuse |

### 文档位置
参见 04_reference/document_directory_mapping.md

### 下一步
@Analyst: CMD REQ_ANALYZE(input)
```

