[sop-mode]
SOP EXECUTION MODE. Follow Skill-first workflow:

SOP PATH: Get SOP files from sop/AGENT_SOP.md in project root.

CORE PRINCIPLES:
- 准度>速度 - 严禁跳步
- 文档先行 - 先标记 [DIR_WORKING] 再改代码
- 无出处不决断 - 用 ASK_USER_DECISION 询问

PATH SELECTION:
CMD: FAST_PATH_CHECK(change)
- [fast-path]: 单文件 + <30行 + 无逻辑变更
- [deep-path]: 其他情况
- [tdd-path]: 深度路径 + 核心业务/复杂逻辑

STATE MANAGEMENT:
- 执行前标记 [DIR_WORKING]
- 遇冲突进入 [USER_DECISION]

REFS (relative to sop/):
- SOP入口: AGENT_SOP.md
- 状态字典: 05_constraints/state_dictionary.md
- 命令字典: 05_constraints/command_dictionary.md

[USER_INPUT]
