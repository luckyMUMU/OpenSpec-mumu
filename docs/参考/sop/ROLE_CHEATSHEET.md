# 角色速查

> **版本**: v1.0.0

---

## 角色索引

| 角色 | 层级 | 职责 | 停止点 |
|------|------|------|--------|
| Router | 规划 | 任务分诊 | - |
| Explorer | 规划 | 代码审计 | - |
| Analyst | 需求 | 需求分析，多级PRD生成 | `[WAITING_FOR_REQUIREMENTS]` |
| Prometheus | 设计 | 架构设计 | `[WAITING_FOR_ARCHITECTURE]` |
| Skeptic | 设计 | 架构审查 | `[ARCHITECTURE_PASSED]` |
| Oracle | 设计 | 实现设计 | `[WAITING_FOR_DESIGN]` |
| **Tester** | **设计** | **CSV测试用例唯一维护者** | **`[WAITING_FOR_TEST_REVIEW]`** |
| Worker | 实现 | 编码实现 | Diff展示 |
| **TestWorker** | **实现** | **编写测试代码（只读CSV）** | **-** |
| Librarian | 监管 | 文档维护 | `[已完成]` |
| Supervisor | 监管 | 进度监管，熔断 | `[FUSION_TRIGGERED]` |

---

## 路径

### 快速路径
```
Explorer → Worker → Librarian
```

### 深度路径
```
新项目: Analyst → Prometheus ↔ Skeptic → Oracle → Worker → Librarian
功能迭代: Analyst → Oracle → Worker → Librarian
```

### TDD深度路径 (可选)
```
Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Worker + TestWorker → Librarian
                                    ↓
                              生成CSV测试用例
```

---

## 文档类型

| 类型 | 位置 | 创建者 |
|------|------|--------|
| Project PRD | `docs/01_requirements/project_prd.md` | Analyst |
| Module MRD | `docs/01_requirements/modules/[module]_mrd.md` | Analyst |
| Feature FRD | `docs/01_requirements/modules/[module]/[feature]_frd.md` | Analyst |
| **原型** | **`docs/01_requirements/prototypes/[module]/`** | **Analyst** |
| 架构设计 | `docs/02_logical_workflow/*.pseudo` | Prometheus |
| 实现设计 | `src/**/design.md` | Oracle |
| **测试用例** | **`docs/03_technical_spec/test_cases/*.csv`** | **Tester** |
| **测试代码** | **`tests/*.test.[ext]`** | **TestWorker** |

---

## 三错即停

| Strike | 条件 | 行动 |
|--------|------|------|
| 1 | Worker失败 | 自动修正 |
| 2 | 再失败 | @Explorer+@Oracle审计+微调 |
| 3 | 再失败 | **熔断**，Supervisor介入 |

---

## 版本号速查

### 格式
```
v[主版本].[次版本].[修订版本]
```

### 规则
| 版本位 | 变更类型 | 示例 |
|--------|----------|------|
| 主版本 | 架构重大变更、角色体系重构 | v5→v6 |
| 次版本 | 新增角色、新增工作流、新增文档类型 | v6.0→v6.1 |
| 修订版本 | 文档修正、错误修复、格式统一 | v6.0.0→v6.0.1 |

### 当前版本
**v6.0.0** - 引入TDD工作流、需求分层、测试独立性

👉 [查看版本历史](CHANGELOG.md)
