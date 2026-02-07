## 审视结果

经过对 `d:\Code\AI\OpenSpec-mumu\docs\参考\sop` 目录中文档的审视，发现以下可以优化的问题：

### 当前问题

1. **文档冗余**：角色文档（如 analyst.md, prometheus.md 等）内容过长，包含大量重复的描述性文字
2. **信息密度低**：AI Agent 需要的是精确的指令，而非解释性内容
3. **重复内容**：多个文档中重复描述相同概念（如渐进式披露、三错即停等）
4. **层级混乱**：部分文档混合了概念层(L1)和流程层(L3)内容

### 优化原则（针对AI Agent）

1. **指令优先**：用命令式语言替代描述性语言
2. **结构化数据**：使用表格、列表、代码块替代段落
3. **去冗余**：每个概念只在一个地方详细定义，其他地方用链接引用
4. **关键词提取**：保留关键决策点，删除解释性内容
5. **模板化**：为每个角色提供最小可用指令集

---

## 具体优化计划

### Phase 1: 创建精简版核心文档

#### 1.1 创建 `AGENT_SOP_COMPACT.md`（核心指令集）
**目标**：将所有核心信息压缩到单文件，供AI Agent快速加载

**内容结构**：
```markdown
# AI Agent SOP 核心指令集

## 角色速查（9个）
| 角色 | 触发条件 | 输入 | 输出 | 下一步 |
|------|----------|------|------|--------|
| Router | 接收任务 | 用户请求 | 路径选择 | @对应角色 |
| Analyst | 需求不清 | 用户对话 | PRD | @Prometheus |
| ... | ... | ... | ... | ... |

## 工作流速查
- 深度路径: Analyst→Prometheus↔Skeptic→Oracle→Worker→Librarian
- 快速路径: Explorer→Worker→Librarian

## 停止点速查
| 阶段 | 停止点标记 |
|------|-----------|
| Analyst | [WAITING_FOR_REQUIREMENTS] |
| ... | ... |

## 三错即停
Strike 1: 自动修正
Strike 2: @Explorer+@Oracle
Strike 3: 熔断,生成FAILURE_REPORT
```

#### 1.2 创建 `ROLE_CHEATSHEET.md`（角色速查卡）
**目标**：每个角色一页，只保留关键指令

**内容结构**：
```markdown
# 角色速查卡

## Analyst
职责: 需求分析→PRD
输入: 用户对话
输出: docs/01_requirements/*.md
关键动作:
1. 多轮对话澄清需求
2. 6维度分析(业务/用户/功能/技术/风险/验收)
3. 生成PRD
4. 用户确认
停止点: [WAITING_FOR_REQUIREMENTS]

## Prometheus
职责: 架构设计
输入: PRD
输出: docs/02_logical_workflow/*.pseudo
关键动作:
1. 技术无关设计
2. 编写伪代码
3. 定义接口
停止点: [WAITING_FOR_ARCHITECTURE]

## Skeptic
职责: 架构审查
输入: 架构设计文档
输出: 审查报告
关键动作:
1. 6维度审查(完整性/一致性/可实现性/性能/安全/扩展性)
2. 提出问题
3. 评估回复
循环: 最多3轮
停止点: [ARCHITECTURE_PASSED]/[USER_DECISION]

## Oracle
职责: 实现设计
输入: 架构设计
输出: src/**/design.*
关键动作:
1. 技术选型
2. 任务分解
3. 风险评估
停止点: [WAITING_FOR_DESIGN]

## Worker
职责: 编码实现
输入: 实现设计
输出: 代码
关键动作:
1. 按设计编码
2. 运行测试
3. 质量检查
约束: 三错即停
停止点: 展示Diff

## Librarian
职责: 文档维护
输入: 各类文档
输出: 更新索引
关键动作:
1. 更新父级索引
2. 维护链接
3. 渐进披露

## Supervisor
职责: 进度监管
输入: 全局状态
输出: 报告/决策
关键动作:
1. 监控进度
2. 检测异常
3. 触发熔断

## Explorer
职责: 代码审计
输入: 代码库
输出: 审计报告
关键动作:
1. 分析代码
2. 评估影响
3. 识别风险

## Router
职责: 任务分诊
输入: 用户请求
输出: 路径选择
决策:
- 单文件+<30行+无逻辑变更 → 快速路径
- 否则 → 深度路径
```

---

### Phase 2: 优化现有文档结构

#### 2.1 简化角色文档
**目标**：将每个角色文档从~300行压缩到~100行

**优化策略**：
- 删除"常见误区"、"质量标准"等解释性章节
- 保留"职责"、"输入/输出"、"关键动作"、"停止点"
- 将详细说明移到参考文档，角色文档只保留链接

#### 2.2 合并重复内容
**目标**：每个概念只定义一次

**优化策略**：
- 将"渐进式披露"定义移到 `01_concept_overview.md`
- 将"三错即停"定义移到 `03_workflow/three_strike_rule.md`
- 其他文档用链接引用，不再重复描述

#### 2.3 优化工作流文档
**目标**：流程图+表格，减少文字描述

**优化策略**：
- `deep_path.md`: 保留流程图、阶段表格、停止点表格，删除详细说明
- `fast_path.md`: 同上

---

### Phase 3: 创建AI专用模板

#### 3.1 创建 `templates/agent_instruction_template.md`
**目标**：供AI Agent直接使用的指令模板

**内容**：
```markdown
# Agent指令模板

## 当前任务
{{task_type}}: {{task_description}}

## 你的角色
{{role_name}}

## 你的职责
{{role_responsibilities}}

## 输入
{{input_format}}

## 输出
{{output_format}}

## 停止点
{{stop_point}}

## 下一步
{{next_step}}
```

#### 3.2 创建 `prompts/` 目录
**目标**：预定义的提示词，减少重复生成

**文件列表**：
- `router_prompt.md` - Router角色提示词
- `analyst_prompt.md` - Analyst角色提示词
- `prometheus_prompt.md` - Prometheus角色提示词
- `skeptic_prompt.md` - Skeptic角色提示词
- `oracle_prompt.md` - Oracle角色提示词
- `worker_prompt.md` - Worker角色提示词
- `supervisor_prompt.md` - Supervisor角色提示词

---

### Phase 4: 删除或归档冗余文件

#### 4.1 删除/归档内容
- `skills/` 目录下的详细skill文件（已提取核心内容到速查卡）
- 角色文档中的示例章节（保留一个示例文件即可）
- 重复的模板定义

#### 4.2 保留的核心文件
```
sop/
├── AGENT_SOP_COMPACT.md      # 新增：核心指令集（单文件）
├── ROLE_CHEATSHEET.md        # 新增：角色速查卡
├── 01_concept_overview.md    # 保留：概念定义
├── 02_role_matrix/
│   ├── index.md              # 优化：精简版角色矩阵
│   ├── router.md             # 优化：精简版
│   ├── analyst.md            # 优化：精简版
│   ├── prometheus.md         # 优化：精简版
│   ├── skeptic.md            # 优化：精简版
│   ├── oracle.md             # 优化：精简版
│   ├── worker.md             # 优化：精简版
│   └── ...                   # 其他角色同理
├── 03_workflow/
│   ├── index.md              # 优化：精简版
│   ├── deep_path.md          # 优化：精简版
│   ├── fast_path.md          # 优化：精简版
│   └── three_strike_rule.md  # 保留：三错即停定义
├── 04_reference/
│   └── templates/            # 保留：文档模板
└── prompts/                  # 新增：预定义提示词
    ├── router_prompt.md
    ├── analyst_prompt.md
    └── ...
```

---

## Token优化预估

| 文档 | 当前行数 | 优化后行数 | 减少比例 |
|------|----------|------------|----------|
| AGENT_SOP.md | ~175 | ~80 | 54% |
| 02_role_matrix/index.md | ~115 | ~60 | 48% |
| analyst.md | ~300 | ~80 | 73% |
| prometheus.md | ~160 | ~60 | 63% |
| deep_path.md | ~320 | ~120 | 63% |
| **总计** | **~2000** | **~800** | **60%** |

---

## 实施优先级

1. **P0**: 创建 `AGENT_SOP_COMPACT.md`（核心指令集）
2. **P1**: 创建 `ROLE_CHEATSHEET.md`（角色速查卡）
3. **P2**: 简化现有角色文档
4. **P3**: 创建 `prompts/` 预定义提示词
5. **P4**: 归档冗余文件