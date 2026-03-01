# Skill 文档标准化规范

## Why

当前 SOP v3.0.0 的 Skill 文档结构不符合 Trae 的 Skill 标准，导致：
1. Skill 定义分散在 README.md 中，不符合 SKILL.md 标准格式
2. 缺少 YAML frontmatter 元数据（name, description）
3. 缺少标准化的"使用场景"和"指令"章节
4. 无法被 Trae 智能体按需加载和识别

## What Changes

- **BREAKING**: 将每个 Skill 从 README.md 中拆分为独立的 SKILL.md 文件
- **BREAKING**: 重构目录结构，每个 Skill 一个独立目录
- 添加 YAML frontmatter 元数据（name, description）
- 标准化章节结构：描述、使用场景、指令、示例
- 保留原有的契约定义，但以 Trae 标准格式呈现

## Impact

- Affected specs: `sop/04_skills/` 目录下的所有 Skill 定义
- Affected code: 无代码影响，仅文档结构变更
- Affected docs: 
  - `sop/04_skills/index.md` - 更新索引结构
  - `sop/04_skills/*/README.md` - 拆分为多个 SKILL.md
  - 新增 11 个 SKILL.md 文件

## ADDED Requirements

### Requirement: Skill 文件命名标准

每个 Skill 必须包含一个 `SKILL.md` 文件，位于以 Skill ID 命名的目录中。

#### Scenario: Skill 目录结构

- **WHEN** 定义一个新的 Skill
- **THEN** 必须创建目录结构：
  ```
  04_skills/
  ├── index.md                    # Skill 索引
  ├── specification/              # 规范类 Skill 父目录
  │   ├── requirement-analyst/
  │   │   └── SKILL.md           # sop-requirement-analyst
  │   ├── architecture-design/
  │   │   └── SKILL.md           # sop-architecture-design
  │   └── implementation-designer/
  │       └── SKILL.md           # sop-implementation-designer
  ├── implementation/             # 实现类 Skill 父目录
  │   ├── code-explorer/
  │   │   └── SKILL.md           # sop-code-explorer
  │   ├── code-implementation/
  │   │   └── SKILL.md           # sop-code-implementation
  │   └── test-implementation/
  │       └── SKILL.md           # sop-test-implementation
  ├── verification/               # 验证类 Skill 父目录
  │   ├── architecture-reviewer/
  │   │   └── SKILL.md           # sop-architecture-reviewer
  │   └── code-review/
  │       └── SKILL.md           # sop-code-review
  └── orchestration/              # 编排类 Skill 父目录
      ├── workflow-orchestrator/
      │   └── SKILL.md           # sop-workflow-orchestrator
      ├── document-sync/
      │   └── SKILL.md           # sop-document-sync
      └── progress-supervisor/
          └── SKILL.md           # sop-progress-supervisor
  ```

### Requirement: SKILL.md 文件格式标准

每个 SKILL.md 文件必须遵循 Trae 标准格式。

#### Scenario: YAML frontmatter

- **WHEN** 创建 SKILL.md 文件
- **THEN** 必须包含 YAML frontmatter：
  ```yaml
  ---
  name: skill-id
  description: 简要描述这个技能的功能和使用场景（一句话）
  version: v3.0.0
  skill_type: specification|implementation|verification|orchestration
  ---
  ```

#### Scenario: 章节结构

- **WHEN** 编写 SKILL.md 内容
- **THEN** 必须包含以下章节：
  1. **描述** - 详细说明 Skill 的作用
  2. **使用场景** - 触发这个 Skill 的条件
  3. **指令** - 清晰的分步说明，告诉智能体具体怎么做
  4. **契约** - 输入/输出契约定义（保留原有内容）
  5. **示例** (可选) - 输入/输出示例

### Requirement: Skill 索引文件更新

`index.md` 必须更新为新的目录结构。

#### Scenario: 索引文件内容

- **WHEN** 更新 index.md
- **THEN** 必须包含：
  - 所有 Skill 的快速链接
  - 每个 Skill 的 name 和 description
  - 按类别分组的 Skill 列表
  - 指向各 SKILL.md 的链接

## MODIFIED Requirements

### Requirement: 规范类 Skill

将 `specification/README.md` 拆分为 3 个独立的 SKILL.md 文件。

#### Scenario: sop-requirement-analyst

- **WHEN** 用户需要分析需求
- **THEN** 加载 `specification/requirement-analyst/SKILL.md`
- **AND** 生成 P1/P2 级规范文档

#### Scenario: sop-architecture-design

- **WHEN** 用户需要进行架构设计
- **THEN** 加载 `specification/architecture-design/SKILL.md`
- **AND** 生成 P1 级架构文档

#### Scenario: sop-implementation-designer

- **WHEN** 用户需要进行实现设计
- **THEN** 加载 `specification/implementation-designer/SKILL.md`
- **AND** 生成 P2/P3 级设计文档

### Requirement: 实现类 Skill

将 `implementation/README.md` 拆分为 3 个独立的 SKILL.md 文件。

#### Scenario: sop-code-explorer

- **WHEN** 用户需要探索代码库
- **THEN** 加载 `implementation/code-explorer/SKILL.md`
- **AND** 生成代码分析报告

#### Scenario: sop-code-implementation

- **WHEN** 用户需要实现代码
- **THEN** 加载 `implementation/code-implementation/SKILL.md`
- **AND** 生成符合规范的代码变更

#### Scenario: sop-test-implementation

- **WHEN** 用户需要编写测试
- **THEN** 加载 `implementation/test-implementation/SKILL.md`
- **AND** 生成符合 BDD 场景的测试代码

### Requirement: 验证类 Skill

将 `verification/README.md` 拆分为 2 个独立的 SKILL.md 文件。

#### Scenario: sop-architecture-reviewer

- **WHEN** 用户需要审查架构
- **THEN** 加载 `verification/architecture-reviewer/SKILL.md`
- **AND** 生成 P1 级验证报告

#### Scenario: sop-code-review

- **WHEN** 用户需要审查代码
- **THEN** 加载 `verification/code-review/SKILL.md`
- **AND** 生成 P2/P3 级验证报告

### Requirement: 编排类 Skill

将 `orchestration/README.md` 拆分为 3 个独立的 SKILL.md 文件。

#### Scenario: sop-workflow-orchestrator

- **WHEN** 用户需要编排工作流
- **THEN** 加载 `orchestration/workflow-orchestrator/SKILL.md`
- **AND** 管理工作流状态

#### Scenario: sop-document-sync

- **WHEN** 用户需要同步文档
- **THEN** 加载 `orchestration/document-sync/SKILL.md`
- **AND** 更新相关文档

#### Scenario: sop-progress-supervisor

- **WHEN** 用户需要监管进度
- **THEN** 加载 `orchestration/progress-supervisor/SKILL.md`
- **AND** 生成进度报告

## REMOVED Requirements

### Requirement: README.md 作为 Skill 定义

**Reason**: 不符合 Trae 的 SKILL.md 标准，无法被智能体识别和按需加载。

**Migration**: 将所有 README.md 中的 Skill 定义迁移到独立的 SKILL.md 文件中，README.md 可保留为类别说明文件（可选）。
