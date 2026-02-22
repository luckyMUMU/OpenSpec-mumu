# SOP 文件引用路径统一检查清单

## AGENT_SOP.md 路径声明

- [x] 文档头部已添加 SOP 文件夹路径声明
- [x] 已添加路径使用说明（供 Skill 引用）

## sop 目录核心文件引用路径检查

- [x] AGENT_SOP.md 引用路径正确（基于 sop 目录）
- [x] 01_concept_overview.md 引用路径正确
- [x] 02_skill_matrix/index.md 引用路径正确
- [x] 03_workflow/index.md 引用路径正确
- [x] 04_reference/index.md 引用路径正确
- [x] 05_constraints/index.md 引用路径正确

## sop/04_reference 目录文件引用路径检查

- [x] document_templates 目录下文件引用路径正确
- [x] interaction_formats 目录下文件引用路径正确
- [x] review_standards 目录下文件引用路径正确

## sop/05_constraints 目录文件引用路径检查

- [x] 各约束文件引用路径正确

## sop/skills 目录文件引用路径检查

- [x] Skill 引用优先读取 AGENT_SOP.md 获取路径
- [x] 所有 SKILL.md 文件引用路径正确

## sop/prompts 目录文件引用路径检查

- [x] prompts/packs/default 目录下文件引用路径正确

## 最终验证

- [x] 所有引用路径统一使用基于 sop 目录的相对路径
- [x] 所有引用的文件实际存在且可访问
- [x] 无死链接或错误引用
