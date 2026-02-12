## 现状审查结论（skills / prompts / workflow）
- 状态 SSOT 已明确：所有状态标记以 [state_dictionary.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/05_constraints/state_dictionary.md) 为唯一来源；命令/转移以 [command_dictionary.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/05_constraints/command_dictionary.md) 的 DSL 表达为主。
- 三条主链路清晰且可映射成状态机：
  - Fast Path：`sop-code-explorer → sop-code-implementation → sop-code-review → sop-document-sync`
  - Deep Path（目录并行）：`… → sop-progress-supervisor → sop-code-implementation(按目录) → sop-code-review → sop-document-sync`
  - TDD 叠加：在 deep path 上插入 `sop-test-design-csv → sop-test-implementation → sop-code-implementation(运行验收+修正)`
- Prompt Pack(default) 的角色是“偏好层/输出风格层”，不应重复 SKILL 合约正文；其 system/operator 文件给出了多 Skill 串联的启用条件（`ultrawork`）与路径选择规则。
- 全局停止点一致：输入不足/冲突/依赖缺口 → `[USER_DECISION]`，并要求 `ASK_USER_DECISION` + `RECORD_DECISION`。

## sop_state_machine.md 应包含的核心信息（你要的“状态机描述文件”）
- **状态分类**（按 SSOT 分组）：全局停止点、代码审查停止点、测试停止点、L1-L4 分层验收点、目录执行状态、调度协调状态、人工确认点、熔断态。
- **转移表**（From → Trigger/CMD → To）：以 `command_dictionary.md` 为主，补足 workflow 与各 Skill 的 Stop Points。
- **状态机图**（建议 Mermaid）：
  1) “任务级总状态机”（从 ROUTE/路径选择开始，到 `[已完成]` 结束，包含 `[USER_DECISION]` 与 `[FUSION_TRIGGERED]` 旁路）
  2) “目录级子状态机”（`[DIR_WORKING] → [WAITING_FOR_CODE_REVIEW] → Diff展示 → [DIR_COMPLETED]`，含 `[DIR_WAITING_DEP]` 依赖等待分支）
  3) “调度/监督视角子状态机”（`[SCHEDULING] → [PARALLEL_EXECUTING] ↔ [WAITING_DEPENDENCY] → [ALL_COMPLETED] → [已完成]`，含三错熔断到 `[FUSION_TRIGGERED]`）
  4) “TDD/验收子状态机”（`[WAITING_FOR_TEST_DESIGN] → [WAITING_FOR_TEST_IMPLEMENTATION] → [WAITING_FOR_Lx_REVIEW]` 循环返工到 `[DIR_WORKING]`）
- **渐进式披露说明**：读者/LLM 只需先看“状态分类+如何判定下一步”，需要细节时再下钻到 SSOT 文档。

## 将要执行的改动（你确认后我会直接落盘）
### 1) 创建状态机描述文件
- 新建并填充：`d:/code/AI/openspec-mumu/docs/参考/sop_state_machine.md`（当前为空文件）。
- 内容结构：YAML 头（version/updated）→ 目的与使用方式 → 状态分类 → 转移表 → Mermaid 状态机代码（4 张子图）→ 关键引用（SSOT 链接）。

### 2) 让状态机文档可发现（轻量接入）
- 在 [LLM_INDEX.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/LLM_INDEX.md) 增加一条“状态机速查”链接，避免该文件成为孤岛。

## 验收口径
- `sop_state_machine.md` 中的所有状态名称与含义与 `05_constraints/state_dictionary.md` 一致。
- 所有转移触发（CMD/事件）能在 `05_constraints/command_dictionary.md` 或 `03_workflow/*` 或相关 `skills/*/SKILL.md` 找到依据。
- Mermaid 图可直接渲染且与转移表一致（不要求表达并行的全部细节，但必须明确“监督视角”和“目录视角”的差异）。