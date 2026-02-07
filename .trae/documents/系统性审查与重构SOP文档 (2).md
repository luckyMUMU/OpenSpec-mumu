## 审查目标

根据 `sop_GUIDE.md` v1.0（含"少即是多"原则）中规定的标准和最佳实践，对 `sop/` 目录下的所有文件进行系统性审查与重构。

## 审查标准（基于 sop_GUIDE.md）

### 核心原则
1. **渐进式披露**: L1-L4 层级清晰，父文档只保留摘要+链接
2. **单一来源**: 每个概念只在权威文档中详细定义
3. **信息密度**: 优先使用表格、列表、代码块
4. **少即是多**: 
   - 删除修饰性文字、背景介绍
   - 模板 > 示例（禁止具体业务示例，使用占位符）
5. **格式规范**: 标题层级、链接、标记符合规范

### Skill/Prompt 规范
- Skill 必须包含 frontmatter (name, description)
- Skill description 必须包含 "Invoke when"
- Prompt 必须以 "你现在是 **[Role]** 角色" 开头
- Prompt 必须包含 "当前任务" 占位符
- 使用 `[PLACEHOLDER]` 格式定义变量

## 审查文件清单（37个文件）

### 根级文档（4个）
- `AGENT_SOP.md` - 入口文档
- `AGENT_SOP_COMPACT.md` - 紧凑版
- `ROLE_CHEATSHEET.md` - 角色速查卡
- `sop_GUIDE.md` - 编写指南（标准来源）

### L1 概念层（1个）
- `01_concept_overview.md`

### L2 角色层（11个）
- `02_role_matrix/index.md`（权威来源）
- `02_role_matrix/*.md`（10个角色文档）

### L3 流程层（4个）
- `03_workflow/index.md`（权威来源）
- `03_workflow/fast_path.md`
- `03_workflow/deep_path.md`
- `03_workflow/three_strike_rule.md`（权威来源）

### L4 参考层（6个）
- `04_reference/index.md`（权威来源）
- `04_reference/document_templates/*.md`（3个）
- `04_reference/interaction_formats/*.md`（2个）

### Prompts（6个）
- `prompts/*.md`

### Skills（5个）
- `skills/*/SKILL.md`

## 审查维度

1. **渐进披露**: 是否符合 L1-L4 层级规范
2. **单一来源**: 是否存在重复定义
3. **少即是多**: 是否存在冗余描述、具体示例
4. **信息密度**: 是否优先使用结构化格式
5. **格式规范**: 标题、表格、链接、标记是否符合规范
6. **Skill/Prompt**: 是否符合编写规范

## 预期重构操作

### 需要修改的文件（预估）
1. **角色文档**: 删除冗余描述，精简为模板格式
2. **工作流文档**: 删除具体示例，保留抽象模板
3. **Prompts**: 检查占位符格式，确保使用 `[PLACEHOLDER]`
4. **参考模板**: 确保使用占位符而非具体示例

### 需要删除的内容
1. 修饰性文字（"很好地"、"非常重要"等）
2. 背景介绍（已在 L1 定义）
3. 具体业务示例（改为占位符模板）
4. 重复的概念解释

### 保留的文件
- 所有 Skills（符合规范）
- 所有 Prompts（可能需要微调格式）

## 输出

1. **审查报告** - 记录发现的问题和修改
2. **修改后的文件** - 符合"少即是多"等最新标准
3. **删除内容清单** - 说明删除依据