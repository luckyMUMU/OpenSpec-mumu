## 目标（按你的约束）
- 不照抄 oh-my-opencode 的“运行时自动注入/格式化 prompt”机制，只吸收其**可迁移的流程思想**（模式开关、能力选择协议、任务闭环）。
- `docs/参考/sop` 继续定位为：**语言无关、实现无关、特定 Agent 无关**的工作流程与规范（指导任何实现型 Agent/Skill 按同一规则交付）。
- 通过**新增示例模板（手动粘贴/手动选择）**实现“模式切换/并行探索/续跑闭环”，而不是依赖自动 hook。

## 对比后提炼出的“可迁移抽象”
1) **模式开关（Mode Switch）**：把“我希望你更强并行、更强验证、更强闭环”表达为一段可复用的手动模板块（而非自动注入）。
2) **能力选择协议（Capability Selection Protocol）**：在编排输出中显式写清“为什么选这些 Skill/为什么不选其他 Skill”，避免遗漏与跳步。
3) **任务闭环（Continuation Discipline）**：当出现“未完成/缺上下文/测试失败/依赖等待”时，用标准化的“续跑请求块”承接上下文（而非运行时强制继续）。
4) **会话压缩/交接（Compaction/Handoff）**：定义一个与平台无关的“压缩前快照格式”，确保 TODO/停止点/证据在上下文缩短后仍可恢复。

## 拟优化内容（文件级别，待确认后执行）
### A. 新增：手动模式模板（核心交付）
- 新增 [建议路径] `docs/参考/sop/04_reference/interaction_formats/manual_mode_templates.md`
  - 内容：
    - “强闭环模式（ultrawork 风格）”手动模板块（仅定义目标/验收/禁止项/可并行探索）
    - “快速路径请求模板”（单文件<30行、无逻辑变更的声明格式）
    - “深度路径请求模板”（需求→设计→实现→审查→同步的手动编排请求）
    - “并行探索请求模板”（如何手动要求先检索再实现；强调输出证据与定位）

### B. 新增：续跑/恢复模板（替代 continuation hooks）
- 新增 `docs/参考/sop/04_reference/interaction_formats/continuation_request.md`
  - 内容：
    - “未完成续跑块”：列出未完成 TODO、阻塞原因、下一步 Skill 建议
    - “依赖等待续跑块”：与 `[DIR_WAITING_DEP]` 对齐，描述等待对象与唤醒条件
    - “验证失败续跑块”：要求提供失败证据、最小修复范围、回归验证清单

### C. 新增：平台无关的会话压缩/交接标准
- 新增 `docs/参考/sop/04_reference/review_standards/context_handoff.standard.md`
  - 内容：
    - “压缩前必须产出”：范围/关键决定/已完成/未完成 TODO/关键证据链接/当前停止点
    - “压缩后恢复步骤”：先复述快照→补缺口→继续执行
  - 注意：不提任何特定实现（如 session.compacting/hook），只定义标准格式。

### D. 现有文档的小幅增补（让模板可被发现/可被执行）
- 更新 `docs/参考/sop/04_reference/index.md`
  - 增加上述 3 个新增模板/标准的索引入口。
- 更新 `docs/参考/sop/04_reference/prompt_pack.standard.md`
  - 增加“手动模式模板的定位与使用方式”：Prompt Pack 不做自动注入，但允许 operator 引导用户/编排者**引用模板**。
- 更新 `docs/参考/sop/prompts/packs/default/01_operator.md`
  - 增加“能力选择协议（手动版）”段落：输出中必须包含 Skill 选择与排除理由（不改变任何 SKILL 合约）。

## 验证方式（文档一致性验证）
- 全库搜索确认：新增模板被 `04_reference/index.md` 可达引用；且不引入任何特定平台/特定 Agent/特定语言词汇。
- 检查 SSOT 不被破坏：`02_skill_matrix/index.md`、`05_constraints/*` 不改语义，仅补充“如何手动触发/如何手动续跑”的交互格式。

## 执行边界
- 不引入任何自动化注入、hook、实现细节描述；只写流程规范与可复制粘贴的示例模板。
- 不绑定特定模型/供应商/工具；仅使用“Skill/停止点/交付物/证据”这些 SOP 内部抽象。