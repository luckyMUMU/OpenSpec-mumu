## 目标与边界
- 目标：将 [document_llm_GUIDE.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/document_llm_GUIDE.md) 重写为“仅包含文档规范”的总则，并与 [docs/参考/sop](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop) 的 v1.5.0 约定一致。
- 边界：不写工作流执行细节（Fast/Deep/TDD 的步骤、角色协作流程等），只保留对文档位置、结构、命名、引用、SSOT 的规范性要求与引用。

## 拟更新内容结构（替换/重排原文）
1) **渐进式披露分层（L1-L4）与目录结构**
- 用 SOP 的“L1-L4 + 需求分层（PRD/MRD/FRD）”作为主结构，引用 [04_reference/index.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/index.md) 中的目录/创建者/职责划分。
- 明确“docs/参考/ 为 SOP 参考文档，默认不修改；项目实际文档放 /docs 对应目录”。

2) **逻辑目录 ↔ 仓库落地目录映射（避免断链）**
- 增加一节“目录映射”作为规范：文档/Prompt/Skill 输出路径以逻辑目录为准，若仓库目录不同，必须维护映射表，并在产出中引用。
- 直接对齐 [document_directory_mapping.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/document_directory_mapping.md) 的表格与规则。
- 将临时产物目录在本仓库规范为 `.temp/`（与 SOP 的 `temp/` 做“仓库覆盖”说明），用于放置临时文件与报告。

3) **各层文档“应写什么/禁止写什么”**
- L1（概念层）：只写一句话定义/痛点/术语，禁止代码与路径。
- L1-L3（需求分层）：补充 PRD/MRD/FRD 的文件位置与命名约定（引用 [04_reference/index.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/index.md)）。
- L2（逻辑工作流）：采用 `pseudo` 代码块；原子操作 `UPPER_SNAKE_CASE`、函数 `lower_snake_case`、4 空格缩进、注释写“为什么”；禁止出现具体实现（如 db.connect/logger/import）。参考 [architecture_design.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/document_templates/architecture_design.md)。
- L3（技术规格/实现设计）：明确落地位置 `src/**/design.md` 与 `docs/03_technical_spec/`；要求提供 L2→L3 映射表、接口契约、数据模型、测试策略等（引用 [implementation_design.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/document_templates/implementation_design.md)）；禁止重复叙述 L2 逻辑。
- L4（决策参考）：ADR 命名与放置规范（`adr_[module]_[topic].md`），仅记录 Why/约束/历史，避免写业务流程。

4) **来源与依赖声明（强制合规）**
- 增加“所有分析/设计/审查类文档必须包含 来源与依赖声明”一节。
- 固化引用格式与必填项（产物头/Inputs/External Sources/Dependencies/Gaps/User Decision），引用 [source_dependency.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/interaction_formats/source_dependency.md)。
- 规定当出现缺口/冲突/不可复核来源时，文档必须标记 `[USER_DECISION]` 并落盘决策记录（仅写规范，不展开流程）。

5) **RAG 与知识沉淀（文档侧规范）**
- 增加“参考资料归档与引用”规范：RAG 目录结构、命名格式、引用表格格式、冲突处理的触发条件（仅写文档要求）。
- 引用 [knowledge_management.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/knowledge_management.md) 作为 SSOT。

6) **SSOT（唯一来源）与一致性约束**
- 明确：状态标记以 [state_dictionary.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/05_constraints/state_dictionary.md) 为准；命令字典以 [command_dictionary.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/05_constraints/command_dictionary.md) 为准。
- 在 document_llm_GUIDE 中只保留“引用规则/禁止自造状态与命令”的规范，不复制全量字典内容以减少重复与漂移。

## 具体落地改动（文件级）
- 仅修改一个文件：`d:/Code/AI/OpenSpec-mumu/docs/参考/document_llm_GUIDE.md`。
- 调整现有内容：
  - 保留“L1-L4 分层 + 伪代码准则”的核心，但补齐 SOP 的需求分层、目录映射、文档放置规则、来源与依赖、RAG/ADR 规范。
  - 删除或重写当前“技术栈描述规范”中不成体系/空白的段落，改为“L3 技术选型信息应写入 design.md 的技术选型表，并引用模板”。

## 自检标准（完成定义）
- document_llm_GUIDE 只包含“文档规范/放置/命名/引用/SSOT”内容，无流程性执行步骤。
- 所有出现的目录/文件命名与 SOP 的映射表一致，并对 `.temp/` 做仓库覆盖说明。
- 明确指向 SOP 的 SSOT 文件（command/state/knowledge_management/目录映射），避免重复粘贴造成漂移。