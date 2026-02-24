[fast-path]
FAST PATH MODE. Single file, <30 lines, no logic change.

SOP PATH: Get SOP files from sop/AGENT_SOP.md in project root.

CONDITIONS (all required):
- 单文件
- <30行
- 无逻辑变更

SKILL CHAIN:
sop-code-explorer → sop-code-implementation → sop-code-review → sop-document-sync

UPGRADE TRIGGERS:
跨文件/接口变更/控制流变更/需要用户决策 → 升级 [deep-path]

REFS (relative to sop/):
- Skill: skills/sop-fast-path/SKILL.md
- Spec: 03_workflow/fast_path.md

[USER_INPUT]
