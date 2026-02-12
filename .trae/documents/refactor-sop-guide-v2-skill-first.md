## 现状诊断（基于你刚打开的 sop_GUIDE.md）
- 该文档仍是 v1.5.1 时代的“角色/AGENT vs 人类版本”审查框架：包含角色矩阵、prompts/*.md、角色切换逻辑等内容。
- 但当前 `/docs/参考/sop` 已迁移到 v2.0.0 Skill-first：SSOT=Skill矩阵/约束字典，Prompt 以 Prompt Pack 组织，且引入“手动模式模板/续跑交接/上下文交接标准”。因此 sop_GUIDE.md 需要按新核心理念重写。

## 重构目标（新核心理念对齐）
- 以 Skill-first 为中心：以 `02_skill_matrix/index.md` 作为唯一真源（SSOT），不再出现“角色/特定 Agent”概念。
- 语言无关、实现无关、平台无关：不写 hook/自动注入等运行时机制，只定义流程规范、审查标准、可落盘交付物。
- 手动可执行：通过“可复制粘贴的示例模板”承载模式切换与续跑闭环（引用 interaction_formats）。
- 版本与一致性可审计：审查关注点从“角色一致”改为“SSOT/字典/模板/索引/引用一致”。

## 拟调整内容（文件结构级别）
### 1) 更新页眉与版本策略
- 将 `sop_GUIDE.md` 版本更新为 v2.0.0，并声明其适用范围：`docs/参考/sop/**`。
- 重写版本规则：
  - 主/次版本全局统一（以 `docs/参考/sop/CHANGELOG.md` 为准）。
  - 修订版本允许文档独立递增，但不得与 SSOT 语义冲突；若发布版本则建议统一。
  - Skill 合约（`skills/**/SKILL.md`）主/次版本必须与 SOP 主/次一致。

### 2) 替换“审查目标/维度”章节
- 删除/替换所有与“角色矩阵、角色指令 prompts/*.md、AGENT vs 人类版本对比”相关内容。
- 新的审查维度改为：
  - SSOT 一致性（Skill矩阵/状态字典/命令字典/红线）
  - Prompt Pack 合规性（不重复 SKILL 合约正文；只表达偏好）
  - 交付物可落盘（interaction_formats/document_templates）
  - 停止点与决策闭环（`[USER_DECISION]` 等）
  - 手动模板覆盖（manual_mode_templates、continuation_request）
  - 上下文压缩/交接合规（context_handoff.standard）
  - 链接/引用可达与正确性
  - 表达可执行性（条件→动作→输出）与简洁性

### 3) 重写“审查流程”章节
- 以 SSOT 为起点：先读 `02_skill_matrix/index.md`、`05_constraints/*`、`04_reference/index.md`。
- 增加“禁止项扫描”步骤：检查是否引入旧术语/平台特性/实现细节。
- 增加“索引可达性”步骤：确保新增标准/模板在 `04_reference/index.md` 可达。

### 4) 更新“交付物（Artifacts）规范”
- 统一审查产物目录到 SOP 目录内：`docs/参考/sop/reviews/YYYY-MM-DD_<topic>/`。
- 更新交付物清单：
  - `00_scope.md`（审查范围+版本基线）
  - `01_ssot_check.md`（Skill矩阵/字典/约束一致性）
  - `02_issue_list.md`（问题分级）
  - `03_link_check.md`（链接/引用检查）
  - `04_version_check.md`（版本核对）
  - `05_review_report.md`（结论与修复建议）
- 保留“差异矩阵”但改名/改字段：从“AGENT vs 人类”改为“SSOT vs 实际文档/模板/pack”。

### 5) 重写“常见问题及修复”
- 用新体系的典型问题替换旧问题：
  - Prompt Pack 重复 SKILL 合约正文
  - 状态/命令未引用字典（非 SSOT）
  - 新增模板未被索引引用
  - 引入特定实现/平台术语（如 hook/session）
  - 手动模式模板缺失导致不可操作

### 6) 重做检查表（Checklist）
- 核心文档清单改为 v2 Skill-first 体系：
  - `docs/参考/sop/01_concept_overview.md`
  - `docs/参考/sop/AGENT_SOP.md`
  - `docs/参考/sop/ROLE_CHEATSHEET.md`
  - `docs/参考/sop/02_skill_matrix/index.md`
  - `docs/参考/sop/03_workflow/*`
  - `docs/参考/sop/04_reference/*`（含新增模板/标准）
  - `docs/参考/sop/05_constraints/*`
  - `docs/参考/sop/prompts/packs/**`
  - `docs/参考/sop/skills/**/SKILL.md`
- 移除已废弃检查项：`02_role_matrix/index.md`、`prompts/*.md`。

## 实施步骤（你确认后我会执行）
1. 全量重写 `docs/参考/sop_GUIDE.md`：以 v2.0.0 Skill-first 结构替换旧章节，并保留原文有价值的“审查方法论”（简洁性/命令式表达/链接检查/版本核对）但改为 SSOT 视角。
2. 在文中新增“强引用清单”：链接到 Skill矩阵、字典、Prompt Pack规范、手动模板、context handoff 标准。
3. 做一次只读全局检索验证：确保新 sop_GUIDE.md 不再引用旧路径/旧术语。

## 验收标准
- sop_GUIDE.md 全文不出现“角色矩阵/角色指令 prompts/*.md/AGENT vs 人类版本”等旧体系术语与路径。
- 明确 SSOT：`02_skill_matrix` 与 `05_constraints/*`。
- 明确手动模板入口：`manual_mode_templates`、`continuation_request`、`context_handoff.standard`。
- 版本规则与 `docs/参考/sop/CHANGELOG.md` 对齐。