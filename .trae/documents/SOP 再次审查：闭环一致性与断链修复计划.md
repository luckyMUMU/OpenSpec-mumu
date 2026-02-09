# 再次审查结论（docs/参考/sop）

本次审查聚焦“能否靠 Workflow + Prompts + Skills 稳定完成 SOP”，结论是：**整体框架成熟，但存在多处“单一来源被破坏 / 路径断链 / 权限约束自相矛盾 / 流程定义不一致”**，会在真实执行中造成卡死或误导。

## 关键问题（按严重度）

### P0 阻断级：状态字典 SSOT 被破坏（流程无法靠状态推进）
- [state_dictionary.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/05_constraints/state_dictionary.md#L8-L15) 明确“状态标记唯一来源”，但 prompts/skills/workflow 多处使用未入字典的状态。
- 影响：Supervisor/Router/Worker 依赖状态推动的“停止点/熔断/等待人工决策”会出现不可识别状态，执行闭环被破坏。
- 例（来自全文检索交叉核对，需在后续修复中逐项统一）：`[USER_DECISION]`、`[USER_DECISION_REQUIRED]`、以及 `completed/已完成` 混用。

### P0 阻断级：大量文档位置硬编码与仓库实际结构不匹配（断链）
- Prompts/Skills 中反复引用 `docs/01_requirements/`、`docs/03_technical_spec/`、`docs/04_context_reference/` 等路径，但当前仓库并未保证这些目录存在。
- 影响：按 SOP 产出的“文档位置/链接/索引更新”会大面积失效，Router 输出不可落地。

### P1 高风险：约束矩阵对 Librarian 的权限定义自相矛盾
- [constraint_matrix.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/05_constraints/constraint_matrix.md#L130-L136) 写 Librarian 白名单“更新文档索引”，黑名单却是“修改文档内容”。
- 影响：Librarian 实际工作就是改索引/摘要/链接（必然改内容），会产生“只有 Librarian 能改 SOP，但 Librarian 又禁止改”的逻辑死锁。

### P1 高风险：TDD 路径在 workflow 与 skill 中链路不一致
- workflow 版本：`... Oracle → Tester → Worker + TestWorker → Librarian`（无 Supervisor）见 [03_workflow/index.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/03_workflow/index.md#L92-L113)
- skill 版本：`... Oracle → Tester → Supervisor → Worker + TestWorker → Librarian` 见 [sop-tdd-workflow/SKILL.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/skills/sop-tdd-workflow/SKILL.md#L31-L36)
- 影响：在启用并行/目录调度的项目中，是否有 Supervisor 直接决定可执行性与依赖治理方式。

### P2 中风险：Worker “不创建测试”与自身示例冲突
- Worker 约束强调不创建/修改测试，但输出示例包含 `Add tests` 任务：见 [worker_prompt.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/prompts/worker_prompt.md#L295-L299)
- 影响：会误导执行者越权或在审查时产生争议。

### P2 中风险：design.md 作为调度锚点 vs 允许跳过 design.md 存在潜在冲突
- 目录维度调度依赖“扫描 design.md 作为边界/分工锚点”，但部分技能文档允许低复杂度跳过 design.md。
- 影响：一旦跳过，需要替代锚点，否则 Supervisor 的目录枚举/依赖图会失真。

### P2 中风险：Prompts 中“工具偏好”存在环境依赖（工具幻觉）
- 多个 Prompt 把具体工具名当作稳定能力列出（如 Task/RunCommand 等），但 SOP 目录未定义工具适配层与降级策略。
- 影响：换运行环境时会出现“按 Prompt 行动但工具不可用”的执行断裂。

## 建议的修复方向（原则）
- **单一来源**：状态以 [state_dictionary.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/05_constraints/state_dictionary.md) 为唯一来源；路径以“目录映射表”为唯一来源。
- **闭环落地**：凡是要求“记录/沉淀/持久化”的步骤必须落到仓库可写位置（建议 `.temp/`）并有模板。
- **权限可执行**：约束矩阵要能让角色“做得到且不越权”，避免死锁式约束。

# 拟执行的修复计划（确认后开始改文档）

## 1) 统一状态标记（P0）
- 以 [state_dictionary.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/05_constraints/state_dictionary.md) 为准：
  - 补齐 `USER_DECISION*` 类状态，或删除全仓引用改用已有状态（如统一用 `[WAITING_FOR_*]` / `[FUSION_TRIGGERED]`）。
  - 统一“完成态”命名（例如统一 `[已完成]` vs `completed`），并更新所有引用方。

## 2) 建立“文档目录映射表”并替换硬编码路径（P0）
- 新增一份映射表（建议放在 `05_constraints/` 或 `04_reference/`）：
  - 逻辑目录：`docs/01_requirements/...`、`docs/03_technical_spec/...` 等
  - 实际目录：以本仓库真实结构为准
- Router/Prometheus/Analyst/Tester 等的“文档位置输出”统一引用该映射表。

## 3) 修复 Librarian 权限死锁（P1）
- 调整 [constraint_matrix.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/05_constraints/constraint_matrix.md#L130-L136) 的黑名单描述：
  - 改为“禁止修改规范性正文/流程定义”，允许“索引/摘要/链接/格式修订”。
  - 或明确“仅可改动索引区块/指定章节”。

## 4) 对齐 TDD 路径链路与测试资产布局（P1）
- 选定权威链路：是否包含 Supervisor；并同步到：
  - [03_workflow/index.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/03_workflow/index.md)
  - [sop-tdd-workflow/SKILL.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/skills/sop-tdd-workflow/SKILL.md)
- 统一 CSV 用例目录与验收测试目录的关系（只保留一种，或明确两者边界与转换规则）。

## 5) 修正 Worker 输出示例与权限边界（P2）
- 将 [worker_prompt.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/prompts/worker_prompt.md#L295-L299) 示例中的 `Add tests` 改为“请求 TestWorker/Tester 补测试”或删除。

## 6) 明确 design.md 作为调度锚点的最低要求（P2）
- 若允许“跳过 design.md”，需提供替代锚点（如极简 design.md 模板）；并让 Explorer/Supervisor 的扫描规则同步。

## 7) 工具偏好改为“能力偏好 + 降级策略”（P2）
- 在 prompts 中将“具体工具名”改为“能力描述”，并补充：工具不可用时输出可复制命令 + 标记等待人工执行的状态。

---

确认后我将按以上顺序逐项修改文档，并在每一项完成后给出对应的 Code Reference 变更点与前后对照。