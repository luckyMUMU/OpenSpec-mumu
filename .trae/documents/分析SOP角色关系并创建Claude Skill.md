## 目标
分析 `d:\Code\AI\OpenSpec-mumu\docs\参考\sop` 中全部9个角色的关系，并参考 `d:\Code\AI\OpenSpec-mumu\docs\参考\skills` 的格式创建符合 Claude Skill 格式的 skill 描述文件。

## 角色关系分析

### 9个角色及其关系

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              AI 工作流角色关系图                               │
└─────────────────────────────────────────────────────────────────────────────┘

【入口】
    │
    ▼
┌──────────────┐
│   Router     │  ← 任务分诊，选择路径
│  (任务分诊)   │
└──────┬───────┘
       │
       ├──────────────┬──────────────┐
       ▼              ▼              ▼
┌──────────┐   ┌──────────┐   ┌──────────┐
│ Explorer │   │ Analyst  │   │  Worker  │
│ (代码审计) │   │ (需求分析) │   │ (快速模式) │
└────┬─────┘   └────┬─────┘   └──────────┘
     │              │
     │              ▼
     │         ┌──────────┐
     │         │   PRD    │  ← 需求文档
     │         │  需求文档  │
     │         └────┬─────┘
     │              │
     │              ▼
     │         ┌──────────┐
     │         │Prometheus│  ← 架构设计
     │         │ (架构设计) │
     │         └────┬─────┘
     │              │
     │              ▼
     │         ┌──────────┐
     │         │ Skeptic  │  ← 架构审查（多轮循环）
     │         │ (架构审查) │
     │         └────┬─────┘
     │              │
     └──────────────┼──────────────┐
                    ▼              ▼
              ┌──────────┐   ┌──────────┐
              │  Oracle  │   │  Worker  │  ← 实现设计/编码
              │ (实现设计) │   │ (编码实现) │
              └────┬─────┘   └────┬─────┘
                   │              │
                   └──────────────┘
                                  │
                                  ▼
                           ┌──────────┐
                           │Librarian │  ← 文档维护
                           │ (文档管理) │
                           └──────────┘
                                  │
                                  ▼
                           ┌──────────┐
                           │Supervisor│  ← 进度监管（全局）
                           │ (进度监管) │
                           └──────────┘
```

### 角色层级

| 层级 | 角色 | 职责 | 输入 | 输出 |
|------|------|------|------|------|
| **规划层** | Router | 任务分诊 | 用户请求 | 路径选择 |
| | Explorer | 代码审计 | 代码库 | 审计报告 |
| **需求层** | Analyst | 需求分析 | 用户对话 | PRD文档 |
| **设计层** | Prometheus | 架构设计 | PRD/需求 | 架构文档 |
| | Skeptic | 架构审查 | 架构文档 | 审查报告 |
| | Oracle | 实现设计 | 架构文档 | 实现设计文档 |
| **实现层** | Worker | 编码实现 | 设计文档 | 代码 |
| **监管层** | Supervisor | 进度监管 | 全局状态 | 报告/决策 |
| | Librarian | 文档管理 | 各类文档 | 索引/归档 |

### 数据流向

```
用户需求 → Analyst → PRD → Prometheus → 架构设计 → Skeptic → 审查通过 → Oracle → 实现设计 → Worker → 代码
                ↓           ↓              ↓
           多维度分析   技术无关设计   多轮挑刺-回复
```

## 需要创建的 Skill 文件

基于角色关系，创建以下 Skill 文件：

1. **sop-workflow-orchestrator** - 工作流编排器（对应 Router）
2. **sop-requirement-analyst** - 需求分析师（对应 Analyst）
3. **sop-architecture-reviewer** - 架构审查员（对应 Skeptic）
4. **sop-progress-supervisor** - 进度监管员（对应 Supervisor）
5. **sop-document-sync** - 文档同步员（对应 Librarian，专注文档同步）

## 文件创建计划

在 `d:\Code\AI\OpenSpec-mumu\docs\参考\skills\` 下创建：

1. `sop-workflow-orchestrator/SKILL.md`
2. `sop-requirement-analyst/SKILL.md`
3. `sop-architecture-reviewer/SKILL.md`
4. `sop-progress-supervisor/SKILL.md`
5. `sop-document-sync/SKILL.md`

## Skill 格式参考

参考现有 skill 格式：
- frontmatter: name, description
- body: 详细说明、工作流程、输入输出格式