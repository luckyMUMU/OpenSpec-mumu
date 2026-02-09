## 目标
- 在不改变含义/约束/停止点/角色边界的前提下，把 `docs/参考/sop` 改成更“少 token”的形式。
- 将叙述性段落改为“命令序列/命令表”。
- 将文件内的长示例块替换为“通用模板引用”，模板集中维护。

## 现状分析（为何 token 高）
- **重复信息多**：同一套角色/路径/验收流程在 [AGENT_SOP.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/AGENT_SOP.md)、[03_workflow/deep_path.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/03_workflow/deep_path.md)、[03_workflow/index.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/03_workflow/index.md) 等多处出现。
- **示例块过长**：目录树/映射表/验收流程/Prompt 输出样例大量占 token（例如 deep_path 的“目录-Worker 映射表示例”、多 Prompt/Skill 的长 Output 代码块）。
- **描述性语言多于可执行规则**：很多“说明/原则/流程”可以等价压缩为“命令 + 参数 + 前置/后置状态”。

## 改造策略（不改变意思）
### 1) 引入统一“命令字典”（Command DSL）
- 新增 `05_constraints/command_dictionary.md`：定义 SOP 内的标准命令、参数、输入/输出、状态前后置。
- 命令示例（仅作为词表，不引入新语义）：
  - `ROUTE(task)`、`AUDIT(paths)`、`REQ_ANALYZE()`、`ARCH_DESIGN()`、`ARCH_REVIEW()`
  - `IMPL_DESIGN(dir)`、`SCHEDULE_DESIGN_DIRS()`、`RUN_DIR_BATCH(depth)`、`WAIT_DEP(dir, deps)`
  - `TEST_DESIGN(module|dir)`、`TEST_IMPLEMENT(module|dir)`、`RUN_ACCEPTANCE(level)`、`REQUEST_REVIEW(level)`
  - `DOC_SYNC()`、`FUSE(strike, reason)`、`ASK_USER_DECISION(topic, options)`
- 约束：所有流程文档只允许使用字典内命令表达步骤，避免自由文本发散。

### 2) 建立“输出模板库”，用引用替换示例
- 复用现有模板：
  - [interaction_formats/supervisor_report.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/interaction_formats/supervisor_report.md)
  - [interaction_formats/design_review.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/interaction_formats/design_review.md)
- 新增若干通用模板（覆盖 prompts/skills 的长 Output）：
  - `04_reference/interaction_formats/router_triage.md`
  - `04_reference/interaction_formats/code_audit_report.md`
  - `04_reference/interaction_formats/worker_execution_result.xml`（或 markdown 版）
  - `04_reference/interaction_formats/test_case_csv.md`（说明 CSV 字段/版本头）
- Prompts/Skills 中的 Output 大块示例改为：
  - “输出使用模板：<path>” + “必填字段/占位符列表（最小化）”。

### 3) 对核心文档做“去重 + 命令化”
- [AGENT_SOP.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/AGENT_SOP.md)
  - 删除目录树/处理顺序等“示例块”，改为命令序列：`SCAN_DESIGN_MD → SORT_DEPTH_DESC → RUN_DIR_BATCH`。
  - 将“分层验收流程”压缩为命令链：`RUN_ACCEPTANCE(L1) → REQUEST_REVIEW(L1) → ...`。
- [03_workflow/deep_path.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/03_workflow/deep_path.md)、[03_workflow/index.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/03_workflow/index.md)、[03_workflow/fast_path.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/03_workflow/fast_path.md)
  - 移除“映射表示例/长流程图”，改为引用模板 + 命令序列。
- [04_reference/design_directory_strategy.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/design_directory_strategy.md)
  - 将“策略说明/示例”改成参数化规则（命令 + 条件），示例改为模板引用。

### 4) Prompts/Skills 全量做“模板引用化”
- 对 `prompts/*.md`：
  - 保留角色目标/约束/停止点；把 Output 的长代码块替换为模板引用。
  - 把“步骤说明”改成命令序列（引用 command_dictionary）。
- 对 `skills/*/SKILL.md`：
  - 保留“触发/输入/输出/权限”语义；把“详细示例/大块输出”替换为模板引用。

## 具体改动清单（确认后执行）
- 新增：
  - `docs/参考/sop/05_constraints/command_dictionary.md`
  - `docs/参考/sop/04_reference/interaction_formats/router_triage.md`
  - `docs/参考/sop/04_reference/interaction_formats/code_audit_report.md`
  - `docs/参考/sop/04_reference/interaction_formats/worker_execution_result.md`（或 `.xml`）
  - `docs/参考/sop/04_reference/interaction_formats/test_case_csv.md`
- 修改（命令化/去示例化/去重）：
  - `AGENT_SOP.md`
  - `03_workflow/index.md`、`03_workflow/deep_path.md`、`03_workflow/fast_path.md`
  - `04_reference/design_directory_strategy.md`
  - `prompts/*.md`（全部）
  - `skills/*/SKILL.md`（全部）

## 验证方式
- 全仓检查：
  - `docs/参考/sop` 下 `示例/Example`、长三引号块数量显著下降（保留在 templates 目录）。
  - Prompts/Skills 的 Output 统一指向 `04_reference/interaction_formats/*`。
  - `command_dictionary.md` 中命令被引用且不出现未定义命令。
- 语义守恒检查：
  - 角色/停止点/状态标记与 [state_dictionary.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/05_constraints/state_dictionary.md) 一致。

如果你确认，我会按上述清单直接改文件，并在每个关键文件给出“压缩前后对照点 + 链接定位”。