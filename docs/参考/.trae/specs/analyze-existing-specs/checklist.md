# Checklist

## 伪代码规范优化 (optimize-pseudocode-spec)

- [x] architecture_design.md 使用标准 Markdown 代码块格式（`text` 或无标识符）
- [x] architecture_design.md 包含分层级描述结构说明（模块层/流程层/操作层）
- [x] architecture_design.md 的控制结构示例保持结构化语法（IF/END IF、FOR/END FOR 等）
- [x] architecture_design.md 的命名规范明确语言无关性要求
- [x] architecture_design.md 包含完整的伪代码示例
- [x] architecture_design.standard.md 包含伪代码格式审查项（Markdown 兼容性）
- [x] architecture_design.standard.md 包含分层级描述完整性检查
- [x] architecture_design.standard.md 包含结构化语法规范性检查
- [x] SKILL.md 的 Pseudocode 章节已更新输出格式说明
- [x] SKILL.md 包含分层级描述和结构化语法的使用指导

## SOP Prompt 模板系统 (create-sop-prompt-template)

- [x] `sop-prompt-wrapper.md` 包含SOP核心原则摘要
- [x] `sop-prompt-wrapper.md` 包含路径选择引导模块
- [x] `sop-prompt-wrapper.md` 包含状态管理引导模块
- [x] `sop-prompt-wrapper.md` 包含约束检查引导模块
- [x] `sop-prompt-wrapper.md` 包含命令式指令引导模块
- [x] `sop-prompt-wrapper.md` 包含来源与依赖声明模块
- [x] `fast-path-prompt.md` 包含快速路径判定条件（单文件+<30行+无逻辑变更）
- [x] `fast-path-prompt.md` 包含Skill调用链（sop-code-explorer → sop-code-implementation → sop-code-review → sop-document-sync）
- [x] `fast-path-prompt.md` 包含升级红线（跨文件影响/需要用户决策）
- [x] `deep-path-prompt.md` 包含深度路径判定条件
- [x] `deep-path-prompt.md` 包含新项目Skill调用链
- [x] `deep-path-prompt.md` 包含功能迭代Skill调用链
- [x] `deep-path-prompt.md` 包含目录并行执行引导
- [x] `tdd-path-prompt.md` 包含TDD启用条件（核心业务/复杂逻辑/高覆盖要求）
- [x] `tdd-path-prompt.md` 包含TDD Skill调用链
- [x] `tdd-path-prompt.md` 包含分层验收引导（L1-L4）
- [x] `README.md` 列出所有模板及其用途
- [x] `README.md` 提供使用指南

## 架构设计流程完整性

- [x] sop-architecture-design/SKILL.md 包含概念设计阶段（Step 1）
- [x] sop-architecture-design/SKILL.md 包含接口定义阶段（Step 2）
- [x] sop-architecture-design/SKILL.md 包含伪代码编写阶段（Step 3）
- [x] sop-architecture-design/SKILL.md 包含决策记录阶段（Step 4）
- [x] sop-architecture-design/SKILL.md 包含质量门控检查清单
- [x] sop-architecture-reviewer/SKILL.md 包含多轮审查机制（最多3轮）
- [x] sop-architecture-reviewer/SKILL.md 包含明确的通过标准
- [x] state_dictionary.md 定义完整的全局停止点
- [x] state_dictionary.md 定义完整的目录执行状态
- [x] state_dictionary.md 定义用户决策点
- [x] command_dictionary.md 定义完整的命令 DSL
- [x] deep_path.md 和 fast_path.md 工作流文档与 Skill 定义一致
