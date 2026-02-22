# Tasks

- [x] Task 1: 在 AGENT_SOP.md 中添加 SOP 文件夹路径说明
  - [x] SubTask 1.1: 在文档头部添加 SOP 文件夹路径声明
  - [x] SubTask 1.2: 添加路径使用说明（供 Skill 引用）

- [x] Task 2: 审查 sop 目录下核心文件的引用路径
  - [x] SubTask 2.1: 审查 AGENT_SOP.md 的引用路径
  - [x] SubTask 2.2: 审查 01_concept_overview.md 的引用路径
  - [x] SubTask 2.3: 审查 02_skill_matrix/index.md 的引用路径
  - [x] SubTask 2.4: 审查 03_workflow/index.md 的引用路径
  - [x] SubTask 2.5: 审查 04_reference/index.md 的引用路径
  - [x] SubTask 2.6: 审查 05_constraints/index.md 的引用路径

- [x] Task 3: 审查 sop/04_reference 目录下文件的引用路径
  - [x] SubTask 3.1: 审查 document_templates 目录下文件
  - [x] SubTask 3.2: 审查 interaction_formats 目录下文件
  - [x] SubTask 3.3: 审查 review_standards 目录下文件

- [x] Task 4: 审查 sop/05_constraints 目录下文件的引用路径
  - [x] SubTask 4.1: 审查各约束文件的引用路径

- [x] Task 5: 审查 sop/skills 目录下 SKILL.md 文件的引用路径
  - [x] SubTask 5.1: 确保 Skill 引用优先读取 AGENT_SOP.md 获取路径
  - [x] SubTask 5.2: 审查所有 SKILL.md 的引用路径

- [x] Task 6: 审查 sop/prompts 目录下文件的引用路径
  - [x] SubTask 6.1: 审查 prompts/packs/default 目录下文件

- [x] Task 7: 验证所有引用路径的可访问性
  - [x] SubTask 7.1: 检查修正后的路径是否可访问
  - [x] SubTask 7.2: 确认无死链接

# Task Dependencies

- [Task 2, Task 3, Task 4, Task 5, Task 6] depends on [Task 1]
- [Task 7] depends on [Task 1, Task 2, Task 3, Task 4, Task 5, Task 6]
