基于本轮对 `docs/参考/sop/prompts/*.md` 与 `docs/参考/sop/skills/*/SKILL.md` 的审查结果（对照 `sop_GUIDE.md` v1.5.0），当前结论为 **不通过**，需要做一次“合规性修复”迭代。

## 主要问题归类
1. **来源与依赖合规缺失**
   - 多个 Prompt/Skill 未明确要求：`TRACE_SOURCES(inputs)` 固化来源与依赖声明；缺口时进入 `[USER_DECISION]` 并 `RECORD_DECISION(topic, decision)`。
2. **SSOT 不一致（阻塞）**
   - 个别 Skill 使用了 `state_dictionary.md` 未定义的状态（如 `[进行中]`、`[待审批]`、`[已归档]`、`[in_progress]`）。
3. **SSOT 引用不显式（不符合审查指南）**
   - 一些文档使用状态/命令，但未在 Output/约束区显式声明“以 SSOT 为准”。
4. **轻微一致性/简洁性问题**
   - 例如 Skill 内字段重复。

## 修复方案（将直接改文件）
### 1) 修复所有 Prompts 的来源/依赖合规
- **目标**：12 个 Prompt 全部满足：
  - 存在“来源与依赖准则”小节（或等效表述）。
  - 明确：`TRACE_SOURCES(inputs)` + 缺口 `[USER_DECISION]` + `RECORD_DECISION`。
  - Output/约束区显式声明：状态/命令引用以 SSOT 为准（`05_constraints/state_dictionary.md`、`05_constraints/command_dictionary.md`）。
- **涉及文件**（按审查报告优先）：
  - `analyst_prompt.md`、`prometheus_prompt.md`、`oracle_prompt.md`、`test_worker_prompt.md`、`explorer_prompt.md`、`skeptic_prompt.md`、`router_prompt.md`、`supervisor_prompt.md`、`librarian_prompt.md`。

### 2) 修复所有 Skills 的来源/依赖合规
- **目标**：15 个 Skill 全部满足 `sop_GUIDE.md` 的 Skill 合规检查：
  - Skill 若要求产出设计/审查/测试资产，必须：
    - A) 明确要求产物包含“来源与依赖声明”（并推荐 `TRACE_SOURCES`），或
    - B) 显式引用 `04_reference/review_standards/source_dependency.standard.md` 并声明必须遵循。
- **操作**：统一插入一段最小合规文本（不增加冗余，保持最少 token）。

### 3) 解决 Skills 中 SSOT 未定义状态（阻塞项）
- **目标**：所有 Skill 的状态流转仅使用 `state_dictionary.md` 已定义状态。
- **处理策略（二选一，默认选更小改动）**：
  - **方案B（默认，最小改动）**：删除/替换 Skill 中未定义状态，改为 SSOT 已有状态（例如目录执行类使用 `[DIR_WORKING]` / `[DIR_COMPLETED]`，或直接用“无状态 + 交付物”）。
  - **方案A（扩展 SSOT）**：将这些状态补入 `state_dictionary.md` 并同步全局引用（变更面更大）。
- **将修复的典型文件**：
  - `skills/sop-document-sync/SKILL.md`（`[进行中]`/`[待审批]`/`[已归档]`）
  - `skills/sop-code-implementation/SKILL.md`（`[in_progress]`）

### 4) 清理轻微一致性问题
- 删除重复字段、统一措辞与路径引用，确保符合简洁性与一致性。

## 验证方式
- 全局搜索校验：
  - Prompts/Skills 中均能检索到 `TRACE_SOURCES` 与 `RECORD_DECISION`（或明确引用 `source_dependency.standard.md`）。
  - 不再出现未定义状态（与 `state_dictionary.md` 对齐）。
- 产出一份审查-修复后的报告：列出修复点与剩余风险（若有）。

## 交付物
- 修改后的 Prompt/Skill 文件。
- 一份“Prompt/Skill 合规性审查报告（Pass 2）”落盘到 `docs/参考/sop/reviews/` 新子目录。
