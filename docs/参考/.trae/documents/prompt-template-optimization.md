# Prompt 模板优化计划（修订版）

## 核心理念

**Prompt 只做引导，Skill 提供详情**

- Prompt 模板：最小化引导，告诉 AI "做什么"和"去哪里查"
- Skill 文件：详细规则，告诉 AI "怎么做"

## 问题分析

### 当前问题

1. **内容重复**：Prompt 中重复了 Skill 文件已有的内容
2. **过度描述**：详细步骤、命令列表等应在 Skill 中查阅
3. **Token 浪费**：大量信息可通过引用获取

### 优化原则

| 内容类型 | 放置位置 |
|----------|----------|
| 核心原则摘要 | Prompt |
| 路径选择条件 | Prompt（精简） |
| Skill 调用链 | Prompt（仅列出） |
| 详细步骤/命令 | Skill 文件（引用） |
| 状态/约束详情 | Skill 文件（引用） |

## 优化方案

### 文件结构

```
prompt_template/
├── README.md              # 说明文件
├── sop-prompt-wrapper.md  # 主模板（极简）
├── fast-path-prompt.md    # 快速路径（极简）
├── deep-path-prompt.md    # 深度路径（极简）
└── tdd-path-prompt.md     # TDD路径（极简）
```

### Prompt 模板结构（极简版）

每个 Prompt 文件仅包含：

```
# [路径名称]

## 适用条件
[精简的条件列表]

## Skill 调用链
[Skill 名称序列，带文件链接]

## 核心约束
[仅列出关键约束，引用 SOP 文档]

## 参考
- SOP入口: ../sop/AGENT_SOP.md
- Skill目录: ../sop/skills/
```

### 各文件优化内容

#### 1. sop-prompt-wrapper.md（极简版）

```markdown
# SOP 执行模式

## 核心原则
1. 准度>速度 - 严禁跳步
2. 文档先行 - 先标记状态再改代码
3. 无出处不决断 - 用 ASK_USER_DECISION 询问

## 路径选择
执行 FAST_PATH_CHECK(change):
- 快速路径: 单文件 + <30行 + 无逻辑变更
- 深度路径: 其他情况
- TDD路径: 深度路径 + 核心业务/复杂逻辑

## 状态管理
- 执行前标记 [DIR_WORKING]
- 遇冲突进入 [USER_DECISION]

## 参考
- SOP入口: ../sop/AGENT_SOP.md
- 状态字典: ../sop/05_constraints/state_dictionary.md
- 命令字典: ../sop/05_constraints/command_dictionary.md

[USER_INPUT]
```

#### 2. fast-path-prompt.md（极简版）

```markdown
# 快速路径

## 适用条件
单文件 + <30行 + 无逻辑变更

## Skill 调用链
sop-code-explorer → sop-code-implementation → sop-code-review → sop-document-sync

## 升级红线
跨文件/接口变更/控制流变更/需要用户决策 → 升级深度路径

## 参考
- Skill详情: ../sop/skills/sop-fast-path/SKILL.md
- 快速路径规范: ../sop/03_workflow/fast_path.md

[USER_INPUT]
```

#### 3. deep-path-prompt.md（极简版）

```markdown
# 深度路径

## 适用条件
跨文件/新功能/重构/API变更/架构调整

## Skill 调用链
新项目: sop-requirement-analyst → sop-architecture-design → sop-architecture-reviewer → sop-implementation-designer → sop-code-explorer → sop-progress-supervisor → sop-code-implementation → sop-code-review → sop-document-sync

功能迭代: sop-requirement-analyst → [架构评估] → sop-implementation-designer → ...

## 参考
- Skill目录: ../sop/skills/
- 深度路径规范: ../sop/03_workflow/deep_path.md
- 目录策略: ../sop/04_reference/design_guide.md

[USER_INPUT]
```

#### 4. tdd-path-prompt.md（极简版）

```markdown
# TDD 深度路径

## 适用条件
深度路径 + 核心业务/复杂逻辑/高覆盖要求

## Skill 调用链
深度路径前置 → sop-test-design-csv → sop-test-implementation → sop-code-implementation(分层验收) → sop-code-review → sop-document-sync

## 分层验收
L1单元测试 → L2集成测试 → L3系统测试 → L4验收测试

## 参考
- TDD Skill: ../sop/skills/sop-tdd-workflow/SKILL.md
- 验收标准: ../sop/05_constraints/acceptance_criteria.md

[USER_INPUT]
```

#### 5. README.md

```markdown
# SOP Prompt 模板

## 模板清单
| 模板 | 适用场景 |
|------|----------|
| sop-prompt-wrapper.md | 通用入口 |
| fast-path-prompt.md | 单文件小改动 |
| deep-path-prompt.md | 复杂任务 |
| tdd-path-prompt.md | 测试驱动 |

## 使用方式
将模板内容作为系统提示词，用户输入放在 [USER_INPUT] 处。

## 详细文档
- SOP入口: ../sop/AGENT_SOP.md
- Skill目录: ../sop/skills/
```

## 执行步骤

1. 创建 README.md 说明文件
2. 重写 sop-prompt-wrapper.md（极简版）
3. 重写 fast-path-prompt.md（极简版）
4. 重写 deep-path-prompt.md（极简版）
5. 重写 tdd-path-prompt.md（极简版）
6. 删除 index.md

## 预期效果

| 文件 | 当前行数 | 优化后行数 |
|------|----------|------------|
| sop-prompt-wrapper.md | 193 | ~25 |
| fast-path-prompt.md | 168 | ~15 |
| deep-path-prompt.md | 321 | ~20 |
| tdd-path-prompt.md | 293 | ~20 |
| README.md | 新建 | ~20 |
| **总计** | ~1000 | ~100 |

**Token 节省: ~90%**
