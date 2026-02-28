# 外部引用文档保护 Spec

## Why

需要建立外部引用文档的保护机制，确保标记为 `EXTERNAL_` 前缀的文档和 `/docs/参考/` 目录下的文件被视为不可变更的参考资料，防止在开发过程中被意外修改，保证参考文档的完整性和权威性。

同时需要规范临时文件和过渡文件的存放位置，避免污染项目目录结构。

## What Changes

- 在约束矩阵中新增外部引用文档的禁止项
- 在约束矩阵中新增临时文件存放目录规则
- 在命令字典中新增外部文档保护的命令定义
- 在状态字典中新增相关状态标记（如需要）
- 明确 `/docs/参考/` 目录的只读属性
- 明确 `.temp/` 目录为临时文件和过渡文件的唯一存放位置

## Impact

- **Affected specs**: constraint_matrix.md, command_dictionary.md, state_dictionary.md
- **Affected code**: 所有实现类 Skill（sop-code-implementation, sop-document-sync 等）

## ADDED Requirements

### Requirement: 外部引用文档保护

The system SHALL provide 外部引用文档的保护机制：

#### Scenario: EXTERNAL_前缀文档保护
- **WHEN** Skill 尝试修改以 `EXTERNAL_` 开头的文档文件
- **THEN** 系统必须阻止该操作并报告错误，提示该文件为外部引用文档，仅供参考

#### Scenario: /docs/参考/目录保护
- **WHEN** 非 `sop-document-sync` 的 Skill 尝试修改 `/docs/参考/` 目录下的文件
- **THEN** 系统必须阻止该操作并报告错误，提示该目录为 SOP 参考目录，仅限维护 Skill 修改

#### Scenario: 外部文档识别
- **WHEN** Skill 需要读取文档作为参考
- **THEN** 系统应能识别 `EXTERNAL_` 前缀文档和 `/docs/参考/` 目录文件为只读参考资料

### Requirement: 例外情况

The system SHALL allow 以下例外情况：

#### Scenario: sop-document-sync 维护参考目录
- **WHEN** `sop-document-sync` 需要更新 `/docs/参考/` 目录
- **THEN** 允许执行，但必须记录变更原因和版本信息

#### Scenario: 显式用户授权
- **WHEN** 用户明确要求修改某个外部引用文档
- **THEN** 必须通过 `ASK_USER_DECISION` 确认，并记录决策后方可执行

### Requirement: 临时文件存放目录

The system SHALL provide 临时文件统一存放机制：

#### Scenario: 临时文件创建
- **WHEN** Skill 需要创建临时文件、过渡文件或中间产物
- **THEN** 必须将文件存放到 `.temp/` 目录下

#### Scenario: 临时文件清理
- **WHEN** 任务完成或会话结束
- **THEN** 应清理 `.temp/` 目录下的临时文件

#### Scenario: 临时文件识别
- **WHEN** 文件存放在 `.temp/` 目录下
- **THEN** 该文件被视为临时文件，不纳入版本控制

## MODIFIED Requirements

### Requirement: 文件类型禁止项（constraint_matrix.md）

在 4.1 按文件类型 表格中新增：

| 文件类型 | 白名单 Skill | 禁止操作（❌） |
|----------|-------------|---------------|
| **EXTERNAL_前缀文档** | 无（只读） | 任何修改操作 |
| **/docs/参考/目录文件** | sop-document-sync | 非 `sop-document-sync` 的任何修改 |

### Requirement: 目录位置禁止项（constraint_matrix.md）

在 4.2 按目录位置 表格中新增：

| 目录 | 白名单 Skill | 禁止操作（❌） |
|------|-------------|---------------|
| `/docs/参考/` | sop-document-sync | 非 `sop-document-sync` 的任何修改 |
| `.temp/` | 所有 Skill | 在非 `.temp/` 目录创建临时文件 |

### Requirement: 全局不变量（constraint_matrix.md）

在 1.2 文件操作约束 表格中新增：

| 约束项 | 白名单（✅ 允许） | 黑名单（❌ 禁止） | 违反后果 |
|--------|------------------|------------------|----------|
| **外部文档识别** | 识别 `EXTERNAL_` 前缀为只读 | 修改外部引用文档 | 参考资料污染 |
| **参考目录保护** | `sop-document-sync` 维护参考目录 | 非指定 Skill 修改参考目录 | SOP 标准被破坏 |
| **临时文件管理** | 在 `.temp/` 目录创建临时文件 | 在项目目录创建临时文件 | 项目结构污染 |

## REMOVED Requirements

无

---

## 实现说明

### 1. EXTERNAL_前缀检测

所有文件操作前必须检查文件名是否以 `EXTERNAL_` 开头：

```yaml
check_external_prefix:
  condition: "file_path starts with 'EXTERNAL_'"
  action: "mark as read-only reference"
  error_message: "文件 {file_path} 为外部引用文档，仅供参考，禁止修改"
```

### 2. /docs/参考/目录检测

所有文件操作前必须检查路径是否在 `/docs/参考/` 目录下：

```yaml
check_reference_directory:
  condition: "file_path starts with '/docs/参考/' or contains '/docs/参考/'"
  action: "verify skill permission"
  allowed_skill: "sop-document-sync"
  error_message: "目录 /docs/参考/ 为 SOP 参考目录，仅限 sop-document-sync 维护"
```

### 3. 例外处理流程

```yaml
exception_flow:
  - step: "检测外部引用文档"
  - step: "检查是否为 sop-document-sync"
    if_yes: "允许执行，记录变更"
    if_no: "进入下一步"
  - step: "检查是否有用户显式授权"
    if_yes: "记录决策，允许执行"
    if_no: "阻止操作，报告错误"
```

### 4. 错误报告格式

```yaml
error_report:
  type: "EXTERNAL_DOCUMENT_PROTECTED"
  file_path: "{path}"
  reason: "外部引用文档，仅供参考"
  suggestion: "如需修改，请通过 ASK_USER_DECISION 获取用户授权"
```

### 5. 临时文件管理

```yaml
temp_file_management:
  location: ".temp/"
  purpose: "存放临时文件、过渡文件、中间产物"
  rules:
    - "所有临时文件必须存放在 .temp/ 目录"
    - "临时文件不纳入版本控制"
    - "任务完成后应清理临时文件"
    - "禁止在项目其他目录创建临时文件"
  
  cleanup_policy:
    - trigger: "任务完成"
      action: "清理相关临时文件"
    - trigger: "会话结束"
      action: "清理所有临时文件"
```
