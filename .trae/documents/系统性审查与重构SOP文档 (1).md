## 审查目标

根据 `sop_GUIDE.md` 中规定的标准和最佳实践，对 `sop/` 目录下的文件进行系统性审查与重构。

## 审查标准（基于 sop_GUIDE.md）

### 核心原则
1. **渐进式披露**: L1-L4 层级清晰，父文档只保留摘要+链接
2. **单一来源**: 每个概念只在权威文档中详细定义
3. **信息密度**: 优先使用表格、列表、代码块
4. **格式规范**: 标题层级、链接、标记符合规范

### Skill/Prompt 规范
- Skill 必须包含 frontmatter (name, description)
- Skill description 必须包含 "Invoke when"
- Prompt 必须以 "你现在是 **[Role]** 角色" 开头
- Prompt 必须包含 "当前任务" 占位符

## 审查文件清单

### 根级文档
- `AGENT_SOP.md`
- `AGENT_SOP_COMPACT.md`
- `ROLE_CHEATSHEET.md`

### L1 概念层
- `01_concept_overview.md`

### L2 角色层
- `02_role_matrix/index.md`（权威来源）
- `02_role_matrix/*.md`（10个角色文档）

### L3 流程层
- `03_workflow/index.md`（权威来源）
- `03_workflow/fast_path.md`
- `03_workflow/deep_path.md`
- `03_workflow/three_strike_rule.md`（权威来源）

### L4 参考层
- `04_reference/index.md`（权威来源）
- `04_reference/document_templates/*.md`
- `04_reference/interaction_formats/*.md`

### Skill/Prompt（保留但需审查）
- `prompts/*.md`（6个prompt）
- `skills/*/SKILL.md`（5个skill）

## 审查维度

1. **结构审查**: 是否符合渐进式披露层级
2. **内容审查**: 是否存在重复定义
3. **格式审查**: 标题、表格、链接是否符合规范
4. **Skill/Prompt审查**: 是否符合编写规范

## 预期操作

### 需要修改的文件
- 角色文档：精简与index重复的内容
- 工作流文档：确保不重复总览内容
- 部分Prompt：补充缺失的占位符

### 需要删除的文件
- 无（保留所有skills和prompts，只进行优化）

## 输出

1. **审查报告** - 记录发现的问题和修改
2. **修改后的文件** - 符合标准的版本