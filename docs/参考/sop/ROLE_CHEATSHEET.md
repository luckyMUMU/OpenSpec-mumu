# 角色速查

> **版本**: v1.5.0

---

## 角色索引

| 角色 | 层级 | 职责 | 停止点 | 工作范围 |
|------|------|------|--------|----------|
| Router | 规划 | 任务分诊 | - | 全局 |
| Explorer | 规划 | 代码审计 | - | 全局 |
| Analyst | 需求 | 需求分析，多级PRD生成 | `[WAITING_FOR_REQUIREMENTS]` | 全局 |
| Prometheus | 设计 | 架构设计 | `[WAITING_FOR_ARCHITECTURE]` | 全局 |
| Skeptic | 设计 | 架构审查 | `[ARCHITECTURE_PASSED]` | 全局 |
| Oracle | 设计 | 实现设计 | `[WAITING_FOR_DESIGN]` | 按目录 |
| **Tester** | **设计** | **CSV测试用例唯一维护者，分层验收测试设计者** | **`[WAITING_FOR_TEST_DESIGN]`** | 按目录 |
| **Worker** | **实现** | **编码实现** | **Diff展示** | **design.md 所在目录** |
| **TestWorker** | **实现** | **编写测试代码（只读CSV）** | **-** | **design.md 所在目录** |
| **CodeReviewer** | **监管** | **代码审查** | **`[WAITING_FOR_CODE_REVIEW]`** | **全局** |
| Librarian | 监管 | 文档维护 | `[已完成]` | 全局 |
| **Supervisor** | **监管** | **进度监管，熔断，并行协调** | **`[FUSION_TRIGGERED]`** | **全局协调** |

---

## 路径

### 目录维度深度路径（推荐）
```
Analyst → Prometheus ↔ Skeptic → Oracle → Supervisor → [多 Worker 并行] → CodeReviewer → Librarian
                                              ↓
                                    按目录深度调度 Worker
```

### 快速路径
```
Explorer → Worker → CodeReviewer → Librarian
```

### 深度路径（单目录）
```
新项目: Analyst → Prometheus ↔ Skeptic → Oracle → Worker → CodeReviewer → Librarian
功能迭代: Analyst → Oracle → Worker → CodeReviewer → Librarian
```

### TDD深度路径 (可选)
```
Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Supervisor → [多 Worker 并行] → CodeReviewer → Librarian
                                    ↓           ↓
                              生成CSV测试用例    实现测试代码
```

---

## 文档类型

| 类型 | 位置 | 创建者 |
|------|------|--------|
| Project PRD | `docs/01_requirements/project_prd.md` | Analyst |
| Module MRD | `docs/01_requirements/modules/[module]_mrd.md` | Analyst |
| Feature FRD | `docs/01_requirements/modules/[module]/[feature]_frd.md` | Analyst |
| **原型** | **`docs/01_requirements/prototypes/[module]/`** | **Analyst** |
| 架构设计 | `docs/02_logical_workflow/*.md` | Prometheus |
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
**v1.4.0** - L2架构文档Markdown化

👉 [查看版本历史](CHANGELOG.md)

---

## 禁止项速查（黑白名单）

### 核心禁止

| 约束 | 禁止操作 | 违反后果 |
|------|----------|----------|
| **先标记状态** | ❌ 未标记`[进行中]`直接修改 | 状态混乱 |
| **父目录摘要** | ❌ 在父目录放详细内容 | 破坏渐进披露 |
| **参考目录** | ❌ 非Librarian修改`/docs/参考/` | SOP被破坏 |

### 角色特定禁止

| 角色 | 核心禁止 | 说明 |
|------|----------|------|
| **Explorer** | ❌ 修改任何代码 | 只读角色 |
| **Tester** | ❌ 查看代码实现 | 保持独立 |
| **TestWorker** | ❌ 修改CSV | 权限隔离 |
| **Worker** | ❌ 修改设计内容 | 按设计实现，仅可追加“待处理变更” |

### 阶段特定禁止

| 阶段 | 核心禁止 | 说明 |
|------|----------|------|
| **需求** | ❌ 开始编码 | 先确认需求 |
| **架构** | ❌ 技术绑定 | 保持无关 |
| **测试用例** | ❌ 参考代码 | 基于设计 |
| **编码** | ❌ 偏离设计 | 严格按设计 |

### 违反后果等级

| 等级 | 违规类型 | 处理方式 |
|------|----------|----------|
| 🟡 轻微 | 格式不规范 | 提醒修正 |
| 🟠 中度 | 跳过停止点 | 强制停止 |
| 🔴 严重 | 修改SOP/破坏测试独立 | **熔断** |

👉 [查看完整禁止项矩阵](05_constraints/constraint_matrix.md)

---

## 分层验收速查

### 验收层级

| 层级 | 对象 | 类型 | 设计者 | 实现者 | 运行者 | 审查者 |
|------|------|------|--------|--------|--------|--------|
| **L1** | 单元/函数 | 单元测试 | Tester | TestWorker | Worker | Oracle |
| **L2** | 模块 | 集成测试 | Tester | TestWorker | Worker | Oracle |
| **L3** | 功能 | 验收测试 | Tester | TestWorker | Worker | Analyst+Oracle |
| **L4** | 系统 | E2E测试 | Tester | TestWorker | Worker | Prometheus+Analyst+Oracle |

### 验收流程

```
编码完成
  ↓
L1验收 → [WAITING_FOR_L1_REVIEW] → Oracle审查
  ↓
L2验收 → [WAITING_FOR_L2_REVIEW] → Oracle审查
  ↓
L3验收 → [WAITING_FOR_L3_REVIEW] → Analyst+Oracle审查
  ↓
L4验收 → [WAITING_FOR_L4_REVIEW] → Prometheus+Analyst+Oracle审查
```

### 新增停止点

| 停止点 | 触发时机 | 等待内容 |
|--------|----------|----------|
| `[WAITING_FOR_TEST_DESIGN]` | Tester完成测试设计 | 用户确认设计充分 |
| `[WAITING_FOR_TEST_IMPLEMENTATION]` | TestWorker完成测试实现 | CodeReviewer审查测试代码 |
| `[WAITING_FOR_L1_REVIEW]` | L1测试通过后 | Oracle审查 |
| `[WAITING_FOR_L2_REVIEW]` | L2测试通过后 | Oracle审查 |
| `[WAITING_FOR_L3_REVIEW]` | L3测试通过后 | Analyst+Oracle审查 |
| `[WAITING_FOR_L4_REVIEW]` | L4测试通过后 | Prometheus+Analyst+Oracle审查 |
| `[WAITING_FOR_TEST_CREATION]` | 测试不充分时 | 用户决策 |

### 审查依据

| 层级 | 审查依据 |
|------|----------|
| L1 | design.md接口定义 |
| L2 | design.md模块设计 |
| L3 | design.md功能设计 + FRD |
| L4 | 架构设计 + design.md整体设计 |

👉 [分层验收标准详情](05_constraints/acceptance_criteria.md)
