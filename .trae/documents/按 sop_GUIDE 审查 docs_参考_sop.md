## 目标
- 在 [sop_GUIDE.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop_GUIDE.md) 的检查表体系中，新增并固化“来源与依赖合规”准则，使其成为审查必检项。
- 该准则与现有 SSOT 对齐：状态/命令以 `05_constraints/*` 为准；模板与审查标准以 `04_reference/*` 为准。

## 变更点设计（写入 sop_GUIDE 的具体位置）

### 1) 术语一致性检查清单（3.1）
- 新增一条：
  - `[ ] 来源与依赖合规：产物包含来源与依赖声明（source_dependency.md），缺口触发用户决策并可追溯`

### 2) 逻辑正确性检查清单（3.3）
- 新增一条（命令式）：
  - `[ ] 找不到来源或依赖时必须中断：进入 [USER_DECISION]，并落盘决策记录（RECORD_DECISION），后续产物引用该记录`

### 3) Skill 合规性审查检查清单（3.6 / 6.4）
- 在“Skill引用的状态/停止点/命令与SSOT一致”旁新增一条：
  - `[ ] Skill/Prompt 若要求落盘审查/设计产物：必须要求附带来源与依赖声明或引用 source_dependency.standard.md`

### 4) 交付物（Artifacts）规范（4.2 或 7 模板库）
- 补充一个“决策记录（Decision Record）”的固定模板条目：
  - 触发条件：topic=SOURCE_MISSING/DEPENDENCY_MISSING/CONFLICT
  - 必填字段：选项、用户选择、落盘路径、后续引用
  - 推荐路径：`docs/04_context_reference/decisions/YYYY-MM-DD_<topic>.md`

### 5) 6.4 表达与Skill审查检查表（强制门槛化）
- 在“表达可执行性（命令式）”部分新增要求：
  - 规则必须包含“来源/依赖声明”或“缺口→用户决策→决策落盘”的可验证输出路径

## 引用与链接（确保 sop_GUIDE 写入后可复核）
- 模板引用：`04_reference/interaction_formats/source_dependency.md`
- 审查标准引用：`04_reference/review_standards/source_dependency.standard.md`
- 命令引用：`05_constraints/command_dictionary.md` 中的 `TRACE_SOURCES`/`RECORD_DECISION`
- 状态引用：`05_constraints/state_dictionary.md` 中关于 `[USER_DECISION]` 的“决策记录要求”

## 回归验证（改完后执行）
- 扫描 sop_GUIDE 是否出现以上 4 类引用且路径可解析（文件存在）。
- 扫描 SOP 内是否存在“来源/依赖缺口继续推进”的反例表述（如发现则列为审查问题）。