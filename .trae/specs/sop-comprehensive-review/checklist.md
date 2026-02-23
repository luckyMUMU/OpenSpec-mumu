# SOP 全面审查与优化检查清单

## prompts 目录删除与合并

- [x] 已合并 00_system.md 内容到 constraint_matrix.md
- [x] 已合并 01_operator.md 内容到 workflow/index.md
- [x] 已合并所有 skills/*.md 内容到各 SKILL.md
- [x] 已删除 prompts 整个目录

## 版本一致性

- [x] CHANGELOG.md 版本号为 v2.8.0
- [x] 02_skill_matrix/index.md 主/次版本与 CHANGELOG 一致
- [x] 05_constraints/state_dictionary.md 主/次版本与 CHANGELOG 一致
- [x] 05_constraints/command_dictionary.md 主/次版本与 CHANGELOG 一致
- [x] 05_constraints/constraint_matrix.md 主/次版本与 CHANGELOG 一致
- [x] 04_reference/index.md 主/次版本与 CHANGELOG 一致
- [x] 所有 Skill 合约（skills/*/SKILL.md）主/次版本与 CHANGELOG 一致
- [x] 所有参考文档主/次版本与 CHANGELOG 一致

## SSOT 一致性

- [x] 所有状态标记可在 state_dictionary.md 中找到定义
- [x] 所有命令引用可在 command_dictionary.md 中找到定义
- [x] 禁止项引用来自 constraint_matrix.md
- [x] Skill 清单以 02_skill_matrix/index.md 为唯一来源
- [x] 无漂移的状态/命令定义

## 链接可达性

- [x] 所有相对路径链接目标存在
- [x] 所有模板在 04_reference/index.md 中有入口
- [x] 所有交互格式在索引中可达
- [x] 无孤立文件（未被任何文档引用）

## 表达规范

- [x] 无含混词（建议/尽量/可能/一般/视情况/差不多）
- [x] 规则包含触发条件
- [x] 规则包含动作
- [x] 规则包含输出或落盘位置
- [x] 长内容已下沉到参考文档

## 流程闭环

- [x] 每个 Skill 有清晰输入定义
- [x] 每个 Skill 有清晰输出定义
- [x] 每个 Skill 有停止点定义
- [x] 每个 Skill 有落盘交付物定义
- [x] 停止点可被下游复用

## 相关引用更新

- [x] prompt_pack.standard.md 已删除或标记为废弃
- [x] 02_skill_matrix/index.md 已删除"默认 Prompt 模块"列

## 审查交付物

- [x] 创建 docs/参考/sop/reviews/2026-02-23_comprehensive/ 目录
- [x] 产出 00_scope.md
- [x] 产出 01_ssot_check.md
- [x] 产出 02_issue_list.md
- [x] 产出 03_link_check.md
- [x] 产出 04_version_check.md
- [x] 产出 05_prompts_deletion.md
- [x] 产出 06_review_report.md
