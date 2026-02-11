# 三错即停

> **版本**: v1.5.1

**定义**: Worker连续失败3次时触发的熔断机制

---

## 流程

| Strike | 条件 | 行动 | 权限 |
|--------|------|------|------|
| 1 | Worker失败 | 分析修正 | 继续编码 |
| 2 | 再失败 | @Explorer审计+@Oracle微调 | 暂停编码 |
| 3 | 再失败 | **熔断**，Supervisor生成报告 | 停止所有 |

---

## 熔断恢复

1. 用户决策
2. 方案调整
3. **知识沉淀**: 调用 `manage_core_memory` 记录教训
4. 重置计数器
5. 继续执行

---

## 知识沉淀 (Core Memory Integration)

当熔断发生时，必须将此次失败的教训写入 Project Memory，以防止未来再次发生。

**Action**: Supervisor 调用 `manage_core_memory`
- **Action**: `ADD`
- **Category**: `Experience` (经验教训)
- **Content**: 简述导致熔断的根本原因和通过此次失败学到的规则。
- **Scope**: `project`

---

## 失败报告

```markdown
## 失败分析

### 基本信息
- 任务: [描述]
- 失败次数: 3/3

### 经过
- Strike 1: [问题] → [处理] → 失败
- Strike 2: [审计] → [调整] → 失败
- Strike 3: [最终问题]

### 建议
- A: [方案]
- B: [方案]

### 决策
- [ ] 方案A
- [ ] 方案B
- [ ] 重新设计
- [ ] 暂停
```
