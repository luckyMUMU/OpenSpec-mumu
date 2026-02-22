# SOP 文件引用路径统一规范

## Why

当前 `sop` 目录下文件引用路径不一致，需要统一为基于 `sop` 目录的相对路径，以便于文档的可移植性和一致性。同时，Skill 中的引用需要优先从 AGENT_SOP.md 获取 SOP 路径。

## What Changes

### 1. 在 AGENT_SOP.md 中标明 SOP 文件夹路径
- 添加 SOP 文件夹路径说明，作为所有引用的基准

### 2. 审查 sop 目录下所有文件的引用路径
- 检查所有 .md 文件的引用路径
- 统一为基于 `sop` 目录的相对路径

### 3. Skill 引用机制
- Skill 中的引用优先读取 AGENT_SOP.md 获取 SOP 路径
- 根据获取的路径计算相对路径

## Impact

- Affected specs: 
  - sop/AGENT_SOP.md（添加路径声明）
  - sop 目录下所有 .md 文件
- Affected code: 无代码变更，仅文档引用路径修正

## ADDED Requirements

### Requirement: SOP 文件夹路径声明

AGENT_SOP.md SHALL 包含当前 SOP 文件夹路径的声明，作为所有引用的基准。

#### Scenario: 路径声明格式
- **WHEN** 查看 AGENT_SOP.md
- **THEN** 必须能看到当前 SOP 文件夹路径的说明

### Requirement: Skill 引用机制

Skill 文件中的引用 SHALL 优先读取 AGENT_SOP.md 获取 SOP 路径，然后根据相对路径获取目标文件。

#### Scenario: Skill 引用流程
- **WHEN** Skill 需要引用其他文件
- **THEN** 首先读取 AGENT_SOP.md 获取 SOP 路径，再计算相对路径

### Requirement: SOP 文件引用路径规范

所有 `sop` 目录下的文档文件 SHALL 使用基于 `sop` 目录的相对路径进行引用。

#### Scenario: 文件引用路径格式
- **WHEN** sop 目录下的文档需要引用其他文件
- **THEN** 必须使用相对于 `sop` 目录的路径格式

## MODIFIED Requirements

### Requirement: 引用路径一致性

所有 sop 目录下文档的引用路径 SHALL 保持一致的格式：
- 使用正斜杠 `/` 作为路径分隔符
- 不使用 `./` 前缀
- 不使用 `../` 返回上级目录
- 路径基于 `sop` 目录计算

## REMOVED Requirements

无移除的需求。
