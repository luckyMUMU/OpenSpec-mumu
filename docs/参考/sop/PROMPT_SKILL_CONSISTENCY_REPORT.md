# 角色提示词与Skill一致性审查报告

> ⚠️ **历史快照**：本文件记录 2026-02-10 的一次性审查结果，不作为 SSOT。  
> 最新审查报告请见：`sop/reviews/2026-02-11/05_review_report.md`

> **版本**: v1.5.0  
> **审查日期**: 2026-02-10  
> **审查人**: AI Agent  
> **审查范围**: prompts/*.md + skills/*/SKILL.md  
> **审查依据**: AGENT_SOP.md, sop_GUIDE.md

---

## 1. 审查摘要

### 1.1 一致性总体评估

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 角色职责一致性 | ⚠️ 部分问题 | 发现1处不一致 |
| 停止点定义一致性 | ✅ 通过 | 所有文档一致 |
| 工作流描述一致性 | ✅ 通过 | 所有文档一致 |
| 工具偏好一致性 | ✅ 通过 | 所有文档一致 |
| CMD命令一致性 | ⚠️ 部分问题 | 发现格式差异 |
| 约束定义一致性 | ✅ 通过 | 所有文档一致 |

### 1.2 问题统计

| 优先级 | 问题数量 | 类型 |
|--------|----------|------|
| 🔴 高 | 0 | - |
| 🟠 中 | 2 | 职责描述差异、CMD格式差异 |
| 🟡 低 | 1 | 文档格式差异 |

---

## 2. 中优先级问题

### 问题 #1: Tester 职责描述差异

**位置对比**:

| 文档 | 职责描述 | 差异 |
|------|----------|------|
| AGENT_SOP.md | "设计分层验收测试" | 简洁 |
| ROLE_CHEATSHEET.md | "CSV测试用例唯一维护者" | 强调CSV |
| 02_role_matrix/index.md | "分层验收测试设计者" | 强调设计 |
| **tester_prompt.md** | "唯一维护者: 测试用例CSV的唯一创建者和维护者" + "分层验收测试设计" | **最详细** |
| **sop-tdd-workflow/SKILL.md** | （未直接定义Tester职责） | - |

**问题分析**:
- 核心文档（AGENT_SOP.md）描述较简洁
- 提示词文件描述最详细，包含CSV维护职责
- 角色矩阵强调"设计"职责
- 差异不大，但表述重点不同

**建议**:
建议统一为："CSV测试用例唯一维护者，分层验收测试设计者"

---

### 问题 #2: CMD命令格式差异

**发现位置**: 多个Prompt和Skill文件

**差异对比**:

| 角色 | Prompt中的CMD | Skill中的CMD | 一致性 |
|------|---------------|--------------|--------|
| Router | `ROUTE(task)` | （无对应Skill） | - |
| Explorer | `AUDIT(scope)` / `LIST_DESIGN_MD(root)` | `AUDIT(scope)` / `LIST_DESIGN_MD(root)` | ✅ |
| Analyst | `REQ_ANALYZE(input)` | `REQ_ANALYZE(input)` | ✅ |
| Prometheus | `ARCH_DESIGN(prd)` | （无对应Skill） | - |
| Oracle | `IMPL_DESIGN(l2, dir)` | `IMPL_DESIGN(l2, dir)` | ✅ |
| Tester | `TEST_DESIGN(design)` | （无对应Skill） | - |
| Worker | （未明确列出CMD） | `IMPLEMENT(dir, design)` | ⚠️ |
| Supervisor | `SCHEDULE_DIRS(design_list)` / `RUN_DIR_BATCH(depth)` / `STRIKE(record)` / `FUSE(reason)` | （无对应Skill） | - |

**问题分析**:
- 大部分CMD命令一致
- Worker Prompt中未明确列出CMD，但Skill中有`IMPLEMENT(dir, design)`

**建议**:
在 worker_prompt.md 中添加 CMD: `IMPLEMENT(dir, design)`

---

## 3. 低优先级问题

### 问题 #3: 文档格式差异

**发现位置**: 所有Skill文件

**差异描述**:
- **Prompt文件**: 使用标准Markdown格式（# 标题）
- **Skill文件**: 使用YAML Frontmatter格式（--- name/description ---）

**示例对比**:

```markdown
<!-- Prompt文件格式 -->
# Worker Prompt

你现在是 **Worker** 角色。

## 职责
...
```

```markdown
<!-- Skill文件格式 -->
---
name: "sop-code-implementation"
description: "Code implementation workflow..."
---

# Code Implementation Workflow

> **版本**: v1.5.0
...
```

**问题分析**:
- 这是设计差异，不是错误
- Skill文件需要YAML Frontmatter用于技能注册
- 但标题层级不一致（Prompt用"# 角色 Prompt"，Skill用"# 角色 Workflow"）

**建议**:
保持现状，但建议在 sop_GUIDE.md 中说明这种差异的合理性

---

## 4. 一致性详细对比

### 4.1 角色职责一致性矩阵

| 角色 | AGENT_SOP.md | Prompt | Skill | 一致性 |
|------|--------------|--------|-------|--------|
| Router | 任务分诊 | ✅ 一致 | （无） | - |
| Explorer | 代码审计 | ✅ 一致 | ✅ 一致 | ✅ |
| Analyst | 需求分析 | ✅ 一致 | ✅ 一致 | ✅ |
| Prometheus | 架构设计 | ✅ 一致 | （无） | - |
| Skeptic | 架构审查 | ✅ 一致 | （无） | - |
| Oracle | 实现设计 | ✅ 一致 | ✅ 一致 | ✅ |
| Tester | 测试设计 | ⚠️ 详细度不同 | （无） | ⚠️ |
| Worker | 编码实现 | ✅ 一致 | ✅ 一致 | ✅ |
| TestWorker | 测试实现 | ✅ 一致 | （无） | - |
| Supervisor | 进度监管 | ✅ 一致 | （无） | - |
| Librarian | 文档维护 | ✅ 一致 | （无） | - |

### 4.2 停止点一致性矩阵

| 停止点 | AGENT_SOP.md | Prompt | 一致性 |
|--------|--------------|--------|--------|
| `[WAITING_FOR_REQUIREMENTS]` | ✅ | Analyst ✅ | ✅ |
| `[WAITING_FOR_ARCHITECTURE]` | ✅ | Prometheus ✅ | ✅ |
| `[ARCHITECTURE_PASSED]` | ✅ | Skeptic ✅ | ✅ |
| `[WAITING_FOR_DESIGN]` | ✅ | Oracle ✅ | ✅ |
| `[WAITING_FOR_TEST_DESIGN]` | ✅ | Tester ✅ | ✅ |
| `[WAITING_FOR_TEST_IMPLEMENTATION]` | ✅ | TestWorker ✅ | ✅ |
| `[FUSION_TRIGGERED]` | ✅ | Supervisor ✅ | ✅ |
| `[已完成]` | ✅ | Librarian ✅ | ✅ |

**结论**: 所有停止点定义一致 ✅

### 4.3 工作流一致性矩阵

| 工作流 | AGENT_SOP.md | Prompt | Skill | 一致性 |
|--------|--------------|--------|-------|--------|
| 快速路径 | Explorer→Worker→Librarian | ✅ 一致 | ✅ 一致 | ✅ |
| 深度路径 | Analyst→Prometheus↔Skeptic→Oracle→Worker | ✅ 一致 | ✅ 一致 | ✅ |
| TDD路径 | 包含Tester | ✅ 一致 | ✅ 一致 | ✅ |

**结论**: 所有工作流定义一致 ✅

### 4.4 约束一致性矩阵

| 约束 | AGENT_SOP.md | Prompt | Skill | 一致性 |
|------|--------------|--------|-------|--------|
| Explorer只读 | ✅ | ✅ | ✅ | ✅ |
| Tester不看代码 | ✅ | ✅ | （无） | ✅ |
| TestWorker只读CSV | ✅ | ✅ | （无） | ✅ |
| Worker按目录工作 | ✅ | ✅ | ✅ | ✅ |
| 三错即停 | ✅ | ✅ | ✅ | ✅ |

**结论**: 所有约束定义一致 ✅

---

## 5. 版本号一致性

| 文件类型 | 版本号 | 状态 |
|----------|--------|------|
| Prompt文件 | （无版本声明） | - |
| Skill文件 | v1.4.0 | ✅ |
| AGENT_SOP.md | v1.4.0 | ✅ |

**注意**: Prompt文件没有版本声明，这是设计选择（Prompt是角色指令，不单独版本化）

---

## 6. 修复建议

### 6.1 中优先级修复

- [ ] **问题 #1**: 统一 Tester 职责描述
  - 建议统一为："CSV测试用例唯一维护者，分层验收测试设计者"
  - 涉及文件：AGENT_SOP.md, ROLE_CHEATSHEET.md, 02_role_matrix/index.md

- [ ] **问题 #2**: 在 worker_prompt.md 中添加 CMD
  - 添加：`CMD: IMPLEMENT(dir, design)`

### 6.2 低优先级修复

- [ ] **问题 #3**: 在 sop_GUIDE.md 中说明Prompt与Skill格式差异
  - 添加说明：Skill文件使用YAML Frontmatter格式用于技能注册

---

## 7. 审查结论

| 检查项 | 结果 | 说明 |
|--------|------|------|
| 角色职责一致性 | ⚠️ 有条件通过 | 1处描述差异 |
| 停止点一致性 | ✅ 通过 | 完全一致 |
| 工作流一致性 | ✅ 通过 | 完全一致 |
| 约束一致性 | ✅ 通过 | 完全一致 |
| CMD命令一致性 | ⚠️ 有条件通过 | 1处缺失 |
| 版本号一致性 | ✅ 通过 | Skill文件一致 |

### 总体评估

- [ ] 通过 - 无重大问题
- [x] 有条件通过 - 需修复中优先级问题
- [ ] 不通过 - 需修复高优先级问题

**建议**: 修复中优先级问题后，Prompt和Skill将达到完全一致性。

---

## 8. 附录：文件清单

### 审查的Prompt文件（11个）
1. prompts/router_prompt.md
2. prompts/explorer_prompt.md
3. prompts/analyst_prompt.md
4. prompts/prometheus_prompt.md
5. prompts/skeptic_prompt.md
6. prompts/oracle_prompt.md
7. prompts/tester_prompt.md
8. prompts/worker_prompt.md
9. prompts/test_worker_prompt.md
10. prompts/supervisor_prompt.md
11. prompts/librarian_prompt.md

### 审查的Skill文件（14个）
1. skills/sop-code-explorer/SKILL.md
2. skills/sop-requirement-analyst/SKILL.md
3. skills/sop-implementation-designer/SKILL.md
4. skills/sop-code-implementation/SKILL.md
5. skills/sop-architecture-design/SKILL.md
6. skills/sop-architecture-reviewer/SKILL.md
7. skills/sop-capability-reuse/SKILL.md
8. skills/sop-deep-path/SKILL.md
9. skills/sop-design-placement/SKILL.md
10. skills/sop-document-sync/SKILL.md
11. skills/sop-fast-path/SKILL.md
12. skills/sop-progress-supervisor/SKILL.md
13. skills/sop-tdd-workflow/SKILL.md
14. skills/sop-workflow-orchestrator/SKILL.md

---

**报告生成时间**: 2026-02-10  
**审查完成**
