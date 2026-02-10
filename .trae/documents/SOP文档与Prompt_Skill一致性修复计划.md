## 修复计划

基于两份审查报告（SOP_REVIEW_REPORT.md 和 PROMPT_SKILL_CONSISTENCY_REPORT.md）的发现，制定以下修复计划：

### 一、SOP文档修复（来自SOP_REVIEW_REPORT.md）

#### 1. 版本号修复（已在上次审查后完成）
- ~~ROLE_CHEATSHEET.md: v6.0.0 → v1.4.0~~ ✅ 已完成
- ~~design_decision_rules.md: v1.0.0 → v1.4.0~~ ✅ 已完成

#### 2. 停止点补充（已在上次审查后完成）
- ~~02_role_matrix/index.md: 添加停止点列~~ ✅ 已完成
- ~~03_workflow/index.md: 添加"测试与监管停止点"小节~~ ✅ 已完成

#### 3. design.md规则表述统一（已在上次审查后完成）
- ~~AGENT_SOP.md: 统一低复杂度表述~~ ✅ 已完成

### 二、Prompt/Skill一致性修复（来自PROMPT_SKILL_CONSISTENCY_REPORT.md）

#### 1. Tester职责描述统一（中优先级）
**问题**: 不同文档中Tester职责描述重点不同
- AGENT_SOP.md: "设计分层验收测试"
- ROLE_CHEATSHEET.md: "CSV测试用例唯一维护者"
- 02_role_matrix/index.md: "分层验收测试设计者"

**修复方案**:
统一为："CSV测试用例唯一维护者，分层验收测试设计者"

**涉及文件**:
- AGENT_SOP.md 第43行
- ROLE_CHEATSHEET.md 第17行
- 02_role_matrix/index.md 第15行

#### 2. Worker Prompt添加CMD（中优先级）
**问题**: worker_prompt.md中未明确列出CMD命令

**修复方案**:
在 worker_prompt.md 的 Output 章节添加：
`CMD: IMPLEMENT(dir, design)`

**涉及文件**:
- prompts/worker_prompt.md

### 三、验证计划

1. 验证所有修改后的文件一致性
2. 验证版本号统一为 v1.4.0
3. 验证停止点定义完整
4. 验证Tester职责描述统一
5. 验证Worker CMD已添加

### 四、修改文件清单

| 序号 | 文件路径 | 修复内容 | 优先级 |
|------|----------|----------|--------|
| 1 | AGENT_SOP.md | 统一Tester职责描述 | 中 |
| 2 | ROLE_CHEATSHEET.md | 统一Tester职责描述 | 中 |
| 3 | 02_role_matrix/index.md | 统一Tester职责描述 | 中 |
| 4 | prompts/worker_prompt.md | 添加CMD命令 | 中 |

### 五、预期结果

修复完成后：
1. 所有文档版本号统一为 v1.4.0
2. 所有停止点定义完整且一致
3. Tester职责描述统一
4. Worker Prompt包含完整的CMD命令
5. 所有核心文档达到完全一致性