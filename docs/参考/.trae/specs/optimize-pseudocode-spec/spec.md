# 架构设计伪代码规范优化 Spec

## Why
当前架构设计模板中的伪代码规范使用非标准 `pseudo` 代码块，不符合 Markdown 标准兼容性要求，且缺乏分层级描述结构，需要优化为 Markdown 兼容、分层级描述、语言无关的规范。

## What Changes
- 将伪代码语法从 `pseudo` 代码块改为标准 Markdown 兼容格式（使用 `text` 或无标识符）
- 建立分层级描述结构（模块层/流程层/操作层）
- 保持语言无关的结构化语法（缩进、条件、循环等）
- 更新相关文档模板和审查标准

## Impact
- Affected specs: L2 架构设计规范
- Affected code: 
  - `sop/04_reference/document_templates/architecture_design.md`
  - `sop/04_reference/review_standards/architecture_design.standard.md`
  - `sop/skills/sop-architecture-design/SKILL.md`

## ADDED Requirements

### Requirement: Markdown 兼容的伪代码格式
The system SHALL provide pseudocode format that is fully compatible with standard Markdown syntax.

#### Scenario: 代码块格式
- **WHEN** 编写伪代码时
- **THEN** 应使用标准 Markdown 代码块格式，语言标识符使用 `text` 或省略

#### Scenario: 缩进规范
- **WHEN** 编写嵌套结构时
- **THEN** 应使用 4 空格缩进，保持层级清晰

### Requirement: 分层级描述结构
The system SHALL provide hierarchical description structure for pseudocode.

#### Scenario: 模块层描述
- **WHEN** 描述系统模块时
- **THEN** 应在代码块外使用 Markdown 标题标识模块名称和职责

#### Scenario: 流程层描述
- **WHEN** 描述业务流程时
- **THEN** 应在伪代码中使用函数定义包裹主流程，函数名使用 `lower_snake_case`

#### Scenario: 操作层描述
- **WHEN** 描述具体操作时
- **THEN** 应在伪代码中使用原子操作调用，原子操作名使用 `UPPER_SNAKE_CASE`

### Requirement: 语言无关的结构化语法
The system SHALL provide language-agnostic structured pseudocode syntax with proper indentation and control structures.

#### Scenario: 条件结构
- **WHEN** 描述条件判断时
- **THEN** 应使用以下格式：
```
IF condition:
    action
ELSE IF other_condition:
    other_action
ELSE:
    default_action
END IF
```

#### Scenario: 循环结构
- **WHEN** 描述循环时
- **THEN** 应使用以下格式：
```
FOR EACH item IN collection:
    process(item)
END FOR

WHILE condition:
    action
END WHILE
```

#### Scenario: 异常处理结构
- **WHEN** 描述异常处理时
- **THEN** 应使用以下格式：
```
TRY:
    operation
CATCH error_type:
    handle_error
END TRY
```

#### Scenario: 函数定义
- **WHEN** 定义函数时
- **THEN** 应使用以下格式：
```
FUNCTION function_name(param1, param2):
    // 函数体
    RETURN result
END FUNCTION
```

#### Scenario: 命名规范
- **WHEN** 定义命名时
- **THEN** 原子操作使用 `UPPER_SNAKE_CASE`，函数使用 `lower_snake_case`，常量使用 `UPPER_SNAKE_CASE`

### Requirement: 注释与说明规范
The system SHALL provide annotation and explanation standards.

#### Scenario: 意图说明
- **WHEN** 添加注释时
- **THEN** 应说明"为什么"而非"是什么"，使用 `//` 作为注释前缀

#### Scenario: 决策引用
- **WHEN** 涉及架构决策时
- **THEN** 应在注释中引用相关 ADR，格式为 `// ADR-XXX: 决策摘要`

### Requirement: 完整伪代码示例格式
The system SHALL provide complete pseudocode example format.

#### Scenario: 标准伪代码示例
- **WHEN** 编写完整流程伪代码时
- **THEN** 应遵循以下结构：
```
// 主流程：处理用户请求
FUNCTION process_request(input):
    // 输入验证是必要的前置条件
    VALIDATE_INPUT input
    
    IF input.type == "A":
        result = process_type_a(input)
    ELSE IF input.type == "B":
        result = process_type_b(input)
    ELSE:
        RAISE_ERROR "Invalid type"
    END IF
    
    RETURN result
END FUNCTION

// 子流程A：处理类型A数据
FUNCTION process_type_a(data):
    // 预处理确保数据格式统一
    normalized = PREPROCESS_DATA(data)
    
    FOR EACH item IN normalized.items:
        TRANSFORM_ITEM item
    END FOR
    
    RETURN BUILD_RESULT(normalized)
END FUNCTION
```

## MODIFIED Requirements

### Requirement: 架构设计模板更新
The architecture design template SHALL be updated to use the new pseudocode format.

**变更内容**:
- 将 `pseudo` 代码块替换为 `text` 或无标识符的标准 Markdown 格式
- 保留结构化语法（IF/ELSE/END IF、FOR/END FOR 等）
- 添加分层级描述示例
- 更新命名规范和控制结构说明

## REMOVED Requirements

### Requirement: 旧的 pseudo 代码块格式
**Reason**: 不符合 Markdown 标准兼容性要求
**Migration**: 将现有 `pseudo` 代码块内容迁移到 `text` 或无标识符格式
