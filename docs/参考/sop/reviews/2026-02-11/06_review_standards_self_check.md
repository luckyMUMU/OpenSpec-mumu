---
date: 2026-02-11
baseline: v1.5.0
scope: sop
---

# 06 审查规范引入自检

## 检查项

### 1) 文件存在性

- review_standards 目录存在：`sop/04_reference/review_standards/`
- 标准文件存在：`*.standard.md` + `index.md`
- Profile 模板存在：`_project_profile.md`

### 2) 引用可解析（关键入口）

- `prompts/skeptic_prompt.md` 引用架构审查标准
- `skills/sop-architecture-reviewer/SKILL.md` 引用架构审查标准
- `prompts/code_reviewer_prompt.md` 引用代码/测试审查标准
- `skills/sop-code-review/SKILL.md` 引用代码/测试审查标准
- `prompts/tester_prompt.md` 引用测试设计审查标准
- `prompts/test_worker_prompt.md` 引用测试代码审查标准

### 3) 版本主/次一致性

- 本次新增标准文档与模板均声明 `v1.5.0`（与 SOP 主/次版本一致）

## 结论

- 通过：审查规范文件齐全，关键入口引用已接入，未发现明显断链。
