# 深度路径

> **版本**: v1.0.0

**适用**: 跨文件/新功能/重构/API变更

---

## 标准深度路径

### 新项目/大重构
```
Analyst → Prometheus ↔ Skeptic → Oracle → Worker → Librarian
```

### 功能迭代
```
Analyst → Oracle → Worker → Librarian
```

---

## 步骤

| 阶段 | 输入 | 输出 | 停止点 |
|------|------|------|--------|
| Analyst | 用户描述 | PRD/MRD/FRD | `[WAITING_FOR_REQUIREMENTS]` |
| Prometheus | PRD | 架构设计 | `[WAITING_FOR_ARCHITECTURE]` |
| Skeptic | 架构设计 | 审查报告 | `[ARCHITECTURE_PASSED]` |
| Oracle | 架构设计 | 实现设计 | `[WAITING_FOR_DESIGN]` |
| Worker | 实现设计 | 代码 | Diff展示 |
| Librarian | 代码 | 文档更新 | `[已完成]` |

---

## TDD深度路径（可选）

**适用场景**: 核心业务/复杂逻辑/高测试覆盖要求

### 流程
```
Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Worker + TestWorker → Librarian
                                    ↓
                              生成CSV测试用例
```

### 步骤

| 阶段 | 输入 | 输出 | 停止点 |
|------|------|------|--------|
| Analyst | 用户描述 | PRD/MRD/FRD | `[WAITING_FOR_REQUIREMENTS]` |
| Prometheus | PRD | 架构设计 | `[WAITING_FOR_ARCHITECTURE]` |
| Skeptic | 架构设计 | 审查报告 | `[ARCHITECTURE_PASSED]` |
| Oracle | 架构设计 | 实现设计 | `[WAITING_FOR_DESIGN]` |
| **Tester** | **L2+L3设计** | **CSV测试用例** | **`[WAITING_FOR_TEST_REVIEW]`** |
| Worker | 实现设计 | 代码 | Diff展示 |
| TestWorker | CSV+代码 | 测试代码 | - |
| Librarian | 代码+测试 | 文档更新 | `[已完成]` |

### TDD特点
- **Tester**: 基于设计生成CSV测试用例（不参考代码）
- **TestWorker**: 基于CSV编写测试代码（只读CSV）
- **权限隔离**: Tester唯一维护CSV，TestWorker禁止修改

👉 [TDD工作流详情](../skills/sop-tdd-workflow/SKILL.md)

---

## 审查循环

```
Prometheus设计 → Skeptic审查 → Prometheus回复 → ...
```

**终止条件**:
- 正常: 设计完善
- 异常: 3次无法回复/僵局/需用户决策

---

## 约束

- 必须遵循所有阶段
- 必须通过审查
- 三错即停适用
- 文档必须同步
- TDD模式下测试用例必须人工审核
