---
version: v2.0.0
updated: 2026-02-12
---

# SOP 核心概念

**定义**: AI辅助开发工作流标准

**核心原则**:
1. 准度>速度 - 严禁跳步，失败熔断
2. 文档先行 - 先标记`[DIR_WORKING]`，再改代码
3. 渐进披露 - 按需获取信息
4. 少即是多 - 先复用→改进→新建→清理
5. 测试独立 - 测试用例与代码分离，专人维护
6. 目录维度 - 实现类 Skill 按 design.md 目录并行执行
7. **无出处不决断** - 无法追溯到既定依据的判断/决策须标注“无出处”，给出建议选项与理由，以 `ASK_USER_DECISION` 询问用户，待用户选择或补充后再继续
8. **审查须确认** - 需求/架构/设计/代码/验收等审查结论须通过对用户的明确提问完成确认（如是否通过、是否修订、选 A/B/C），审查输出须包含可操作确认项

---

## 渐进披露 (L1-L4)

| 层级 | 内容 | 位置 |
|------|------|------|
| L1 | 概念 | 本页 |
| L2 | Skill | [Skill矩阵](02_skill_matrix/index.md) |
| L3 | 流程 | [工作流](03_workflow/index.md) |
| L4 | 模板 | [参考文档](04_reference/index.md) |

---

## Skill 概览（SSOT）

本 SOP 以 Skill 为唯一执行单元，Skill 清单、触发条件与合约边界以 [Skill矩阵](02_skill_matrix/index.md) 为准。

👉 [Skill矩阵（SSOT）](02_skill_matrix/index.md)

---

## 目录维度工作范围

### 实现类 Skill 工作范围定义

实现类 Skill（如 `sop-code-implementation`）以 `design.md` 所在目录为工作边界：

```
Scope 工作范围 = design.md 所在目录及其子目录（不含嵌套 design.md 的子目录）
```

**示例**：
```
src/
├── module_a/
│   ├── design.md          ← Scope A
│   ├── src/
│   └── utils/
├── module_b/
│   ├── design.md          ← Scope B
│   └── src/
└── shared/
    └── design.md          ← Scope C
```

### 目录层级处理顺序

```
1. 扫描所有 design.md 文件，记录路径和深度
2. 按深度降序排序（深度大的优先）
3. 同深度目录可并行处理
4. 父目录等待所有子目录完成后才能开始
```

**处理顺序示例**：
```
深度 3: src/core/utils/design.md      → 第一批并行
深度 3: src/core/helpers/design.md    → 第一批并行
深度 2: src/core/design.md            → 第二批（等待第一批）
深度 2: src/api/design.md             → 第二批并行
深度 1: src/design.md                 → 第三批（等待第二批）
```

👉 [目录维度工作策略详情](04_reference/design_directory_strategy.md)

---

## 三错即停

| Strike | 条件 | 行动 |
|--------|------|------|
| 1 | 失败 | 自动修正 |
| 2 | 再失败 | 审计+微调 |
| 3 | 再失败 | **熔断** |

---

## 路径选择

| 路径 | 条件 | 说明 |
|------|------|------|
| **快速** | 单文件+<30行+无逻辑变更 | 简单任务快速处理 |
| **深度** | 其他所有情况 | 复杂任务完整流程 |
| **TDD深度** | 深度+核心业务/复杂逻辑 | 测试驱动开发模式 |

### 三种路径对比

```
快速路径:   sop-code-explorer → sop-code-implementation → sop-code-review → sop-document-sync

深度路径:   sop-requirement-analyst → sop-implementation-designer → sop-code-implementation → sop-code-review → sop-document-sync

TDD深度:    ... 深度路径 ... → sop-test-design-csv → sop-test-implementation → sop-code-implementation
```

---

## 版本号管理

### 版本号格式
```
v[主版本].[次版本].[修订版本]
```

### 版本号规则
| 版本位 | 变更类型 | 示例 |
|--------|----------|------|
| 主版本 | 架构重大变更、Skill/Prompt Pack 体系重构 | v1→v2 |
| 次版本 | 新增 Skill、新增工作流、新增文档类型 | v2.0→v2.1 |
| 修订版本 | 文档修正、错误修复、格式统一 | v2.0.0→v2.0.1 |

### 当前版本
以 [CHANGELOG.md](CHANGELOG.md) 为准。

👉 [查看版本历史](CHANGELOG.md)

---

## 导航

| 文档 | 用途 |
|------|------|
| [AGENT_SOP.md](AGENT_SOP.md) | 入口：约束+指令+导航 |
| [ROLE_CHEATSHEET.md](ROLE_CHEATSHEET.md) | 速查：Skill+路径+规则 |
| [02_skill_matrix](02_skill_matrix/index.md) | SSOT：Skill 清单与边界 |
| [CHANGELOG.md](CHANGELOG.md) | 版本历史 |
| [Prompts](prompts/packs/) | Prompt Pack（定制化 prompt） |
| [Skills](skills/) | Skill 合约定义 |
