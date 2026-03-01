# Skill 文档标准化检查清单

## 目录结构检查

- [x] 所有 Skill 子目录已创建（11 个目录）
- [x] 每个 Skill 目录包含 SKILL.md 文件
- [x] 目录命名符合规范（小写、连字符分隔）

## SKILL.md 格式检查

### YAML Frontmatter

- [x] 所有 SKILL.md 包含 YAML frontmatter
- [x] 所有 frontmatter 包含 `name` 字段
- [x] 所有 frontmatter 包含 `description` 字段
- [x] 所有 frontmatter 包含 `version` 字段（v3.0.0）
- [x] 所有 frontmatter 包含 `skill_type` 字段（specification/implementation/verification/orchestration）

### 章节结构

- [x] 所有 SKILL.md 包含"描述"章节
- [x] 所有 SKILL.md 包含"使用场景"章节
- [x] 所有 SKILL.md 包含"指令"章节
- [x] 所有 SKILL.md 包含"契约"章节（输入/输出/行为契约）
- [x] "示例"章节可选但推荐

### 内容质量

- [x] "描述"章节清晰说明 Skill 的作用
- [x] "使用场景"章节明确触发条件
- [x] "指令"章节包含清晰的分步说明
- [x] "契约"章节包含完整的输入/输出/行为契约定义
- [x] 契约定义包含 preconditions、postconditions、invariants

## 规范类 Skill 检查

- [x] sop-requirement-analyst/SKILL.md 已创建
- [x] sop-architecture-design/SKILL.md 已创建
- [x] sop-implementation-designer/SKILL.md 已创建
- [x] 所有规范类 Skill 的 skill_type 为 "specification"

## 实现类 Skill 检查

- [x] sop-code-explorer/SKILL.md 已创建
- [x] sop-code-implementation/SKILL.md 已创建
- [x] sop-test-implementation/SKILL.md 已创建
- [x] 所有实现类 Skill 的 skill_type 为 "implementation"

## 验证类 Skill 检查

- [x] sop-architecture-reviewer/SKILL.md 已创建
- [x] sop-code-review/SKILL.md 已创建
- [x] 所有验证类 Skill 的 skill_type 为 "verification"

## 编排类 Skill 检查

- [x] sop-workflow-orchestrator/SKILL.md 已创建
- [x] sop-document-sync/SKILL.md 已创建
- [x] sop-progress-supervisor/SKILL.md 已创建
- [x] 所有编排类 Skill 的 skill_type 为 "orchestration"

## 索引文件检查

- [x] index.md 已更新
- [x] index.md 包含所有 Skill 的快速链接
- [x] index.md 包含每个 Skill 的 name 和 description
- [x] index.md 按 4 个类别分组展示 Skill
- [x] index.md 的目录结构说明已更新

## 原有文件处理检查

- [x] specification/README.md 已转换为类别说明
- [x] implementation/README.md 已转换为类别说明
- [x] verification/README.md 已转换为类别说明
- [x] orchestration/README.md 已转换为类别说明

## 相关文档更新检查

- [x] sop_for_human.md 中的 Skill 引用已确认（概念性描述，无需修改）
- [x] user_guide.md 中的 Skill 引用已确认（概念性描述，无需修改）
- [x] document_llm_GUIDE.md 中的 Skill 引用已确认（无需修改）

## Trae 标准兼容性检查

- [x] 所有 SKILL.md 可被 Trae 智能体识别
- [x] 所有 SKILL.md 的 description 字段简洁明了（一句话）
- [x] 所有 SKILL.md 的 name 字段符合命名规范
- [x] 所有 Skill 可按需加载（通过 description 识别）

## 文档一致性检查

- [x] 所有 SKILL.md 版本号一致（v3.0.0）
- [x] 所有 SKILL.md 更新日期一致（2026-03-01）
- [x] 所有契约定义与原有内容一致
- [x] 所有 Skill 职责描述与原有内容一致
