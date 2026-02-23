# Tasks

## 阶段一：prompts 目录删除与内容合并

- [x] Task 1: 合并 00_system.md 内容到 constraint_matrix.md
  - [x] 提取全局不变量（表达规范、SSOT 引用、来源与依赖、停止点、落盘要求）
  - [x] 提取禁止项（旧术语禁止、重复禁止）
  - [x] 合并到 `05_constraints/constraint_matrix.md` 的新章节
  
- [x] Task 2: 合并 01_operator.md 内容到 workflow/index.md
  - [x] 提取启用条件（ultrawork 标记说明）
  - [x] 提取能力选择协议（选择清单、排除清单）
  - [x] 提取停止点与升级规则
  - [x] 合并到 `03_workflow/index.md`
  
- [x] Task 3: 合并 skills/*.md 内容到各 SKILL.md
  - [x] 合并 sop-workflow-orchestrator 侧重点
  - [x] 合并 sop-code-explorer 侧重点
  - [x] 合并 sop-requirement-analyst 侧重点
  - [x] 合并 sop-architecture-design 侧重点
  - [x] 合并 sop-architecture-reviewer 侧重点
  - [x] 合并 sop-implementation-designer 侧重点
  - [x] 合并 sop-design-placement 侧重点
  - [x] 合并 sop-progress-supervisor 侧重点
  - [x] 合并 sop-code-implementation 侧重点
  - [x] 合并 sop-code-review 侧重点
  - [x] 合并 sop-document-sync 侧重点
  - [x] 合并 sop-capability-reuse 侧重点
  - [x] 合并 sop-fast-path 侧重点
  - [x] 合并 sop-deep-path 侧重点
  - [x] 合并 sop-tdd-workflow 侧重点
  - [x] 合并 sop-test-design-csv 侧重点
  - [x] 合并 sop-test-implementation 侧重点
  
- [x] Task 4: 删除 prompts 目录
  - [x] 删除 `prompts/packs/default/skills/` 下所有文件
  - [x] 删除 `prompts/packs/default/00_system.md`
  - [x] 删除 `prompts/packs/default/01_operator.md`
  - [x] 删除 `prompts/packs/default/index.md`
  - [x] 删除 `prompts/` 整个目录

## 阶段二：版本一致性核对

- [x] Task 5: 确认版本基线
  - [x] 读取 `sop/CHANGELOG.md` 确认目标版本（v2.8.0）
  - [x] 记录主版本号（2）和次版本号（8）
  
- [x] Task 6: 核对核心文档版本
  - [x] 检查 `02_skill_matrix/index.md` 版本号
  - [x] 检查 `05_constraints/state_dictionary.md` 版本号
  - [x] 检查 `05_constraints/command_dictionary.md` 版本号
  - [x] 检查 `05_constraints/constraint_matrix.md` 版本号
  - [x] 检查 `04_reference/index.md` 版本号
  
- [x] Task 7: 核对 Skill 合约版本
  - [x] 检查所有 `skills/*/SKILL.md` 文件版本号
  - [x] 记录版本不一致的文件
  
- [x] Task 8: 核对参考文档版本
  - [x] 检查 `04_reference/interaction_formats/*` 版本号
  - [x] 检查 `04_reference/review_standards/*` 版本号
  - [x] 检查 `04_reference/document_templates/*` 版本号

## 阶段三：SSOT 一致性核对

- [x] Task 9: 状态字典引用检查
  - [x] 扫描所有文档中的状态标记
  - [x] 验证状态是否在 `state_dictionary.md` 中定义
  - [x] 记录未定义的状态引用
  
- [x] Task 10: 命令字典引用检查
  - [x] 扫描所有文档中的命令引用
  - [x] 验证命令是否在 `command_dictionary.md` 中定义
  - [x] 记录未定义的命令引用
  
- [x] Task 11: 约束矩阵引用检查
  - [x] 检查禁止项引用是否正确
  - [x] 检查后果等级引用是否正确

## 阶段四：链接可达性检查

- [x] Task 12: 内部链接检查
  - [x] 扫描所有文档中的相对路径链接
  - [x] 验证链接目标是否存在
  - [x] 记录失效链接
  
- [x] Task 13: 索引可达性检查
  - [x] 验证所有模板在 `04_reference/index.md` 中有入口
  - [x] 验证所有交互格式在索引中可达

## 阶段五：表达规范检查

- [x] Task 14: 含混词检查
  - [x] 扫描文档中的含混词（建议/尽量/可能/一般/视情况/差不多）
  - [x] 记录违规位置
  
- [x] Task 15: 规则完整性检查
  - [x] 检查规则是否包含触发条件
  - [x] 检查规则是否包含动作
  - [x] 检查规则是否包含输出或落盘位置

## 阶段六：更新相关引用

- [x] Task 16: 更新 prompt_pack.standard.md
  - [x] 删除或标记为废弃
  - [x] 或更新为引用新的 SSOT 位置
  
- [x] Task 17: 更新 02_skill_matrix/index.md
  - [x] 删除"默认 Prompt 模块"列
  - [x] 更新引用说明

## 阶段七：版本号更新（剩余任务）

- [x] Task 18: 更新 state_dictionary.md 版本号
  - [x] 将版本号从 v2.7.0 更新为 v2.8.0
  - [x] 更新 updated 日期为 2026-02-23
  
- [x] Task 19: 更新 command_dictionary.md 版本号
  - [x] 将版本号从 v2.7.0 更新为 v2.8.0
  - [x] 更新 updated 日期为 2026-02-23

## 阶段八：产出审查报告

- [x] Task 20: 创建审查目录结构
  - [x] 创建 `docs/参考/sop/reviews/2026-02-23_comprehensive/` 目录
  
- [x] Task 21: 编写审查交付物
  - [x] 编写 `00_scope.md`
  - [x] 编写 `01_ssot_check.md`
  - [x] 编写 `02_issue_list.md`
  - [x] 编写 `03_link_check.md`
  - [x] 编写 `04_version_check.md`
  - [x] 编写 `05_prompts_deletion.md`
  - [x] 编写 `06_review_report.md`

# Task Dependencies

- Task 1-3 可并行执行（内容合并）
- Task 4 依赖 Task 1-3 完成
- Task 5-8 可并行执行（版本核对）
- Task 9-11 可并行执行（SSOT 核对）
- Task 12-13 可并行执行（链接检查）
- Task 14-15 可并行执行（表达规范）
- Task 16-17 依赖 Task 4 完成
- Task 18-19 可并行执行（版本号更新）
- Task 20-21 依赖 Task 1-19 全部完成
