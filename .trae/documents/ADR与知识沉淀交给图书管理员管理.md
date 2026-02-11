## 现状确认（按 SOP 现有定义）
- ADR：以“关键决策 Why + 备选对比 + 影响/迁移/回滚”为核心，禁止展开实现细节；遵循模板与审查标准（[adr.md](file:///d:/Code/AI/OpenSpec-mumu/docs/参考/sop/04_reference/document_templates/adr.md)、[adr.standard.md](file:///d:/Code/AI/OpenSpec-mumu/docs/参考/sop/04_reference/review_standards/adr.standard.md)）。
- 知识沉淀（RAG）：以“可追溯来源 + 可更新索引 + 冲突拉闸”为核心；用户输入/外部资料/项目知识分层落地并表格化引用；冲突必须进入 `[USER_DECISION]`（[knowledge_management.md](file:///d:/Code/AI/OpenSpec-mumu/docs/参考/sop/04_reference/knowledge_management.md)）。
- Librarian：当前已被定义为“文档维护者”，并有统一命令 `DOC_SYNC(scope)`（[command_dictionary.md](file:///d:/Code/AI/OpenSpec-mumu/docs/参考/sop/05_constraints/command_dictionary.md)）与同步技能（[sop-document-sync/SKILL.md](file:///d:/Code/AI/OpenSpec-mumu/docs/参考/sop/skills/sop-document-sync/SKILL.md)）。

## 要做的变更（把 ADR + 知识沉淀的管理权明确交给 Librarian）
- 在角色矩阵与速查中，把 Librarian 的职责从“文档维护”细化为：
  - ADR 索引/状态维护（Accepted/Deprecated/Superseded）、交叉引用与断链修复。
  - RAG 资料入库（分类、命名、来源记录）、索引维护、去重与过期标记。
  - 冲突发现与“拉闸”：生成冲突报告并标记 `[USER_DECISION]`，决策后回写 ADR/RAG/索引。
- 在 Librarian 提示词中补齐“ADR/RAG 的例行维护清单”和“遇到冲突的标准输出格式”，并明确其边界：只改文档/索引，不替业务做技术决策。
- （可选，但更清晰）在命令字典的“文档维护”下补充 ADR/RAG 维护的子命令别名（例如 `ADR_MAINTAIN(scope)`、`RAG_UPSERT(scope)`），或将其明确为 `DOC_SYNC` 的 scope 变体，避免新增 DSL 造成复杂度。
- 在“文档类型/位置”章节补齐 ADR 与 RAG 的类型与默认落地位置，并与目录映射保持一致（[document_directory_mapping.md](file:///d:/Code/AI/OpenSpec-mumu/docs/参考/sop/04_reference/document_directory_mapping.md)）。

## 具体将修改的文件
- [02_role_matrix/index.md](file:///d:/Code/AI/OpenSpec-mumu/docs/参考/sop/02_role_matrix/index.md)：补充 Librarian 对 ADR/RAG 的职责与停止点/产出。
- [ROLE_CHEATSHEET.md](file:///d:/Code/AI/OpenSpec-mumu/docs/参考/sop/ROLE_CHEATSHEET.md)：在“文档类型”与“禁止项”旁明确 ADR/RAG 的管理者为 Librarian。
- [librarian_prompt.md](file:///d:/Code/AI/OpenSpec-mumu/docs/参考/sop/prompts/librarian_prompt.md)：新增 ADR/RAG 维护与冲突处理的标准段落。
- [knowledge_management.md](file:///d:/Code/AI/OpenSpec-mumu/docs/参考/sop/04_reference/knowledge_management.md)：在流程与维护频率处把执行角色显式标注为 Librarian（含 RAG 清理策略）。
- （可选）[command_dictionary.md](file:///d:/Code/AI/OpenSpec-mumu/docs/参考/sop/05_constraints/command_dictionary.md)：补充 ADR/RAG 的 scope 约定或子命令别名。

## 验证方式
- 进行一次全量链接自检（特别是 ADR/RAG 与设计文档的交叉引用）。
- 检查“角色权限/职责”表述是否与“禁止项（非 Librarian 修改 /docs/参考/）”一致，避免自相矛盾。
- 抽样验证：任选 1 个 ADR 与 1 条外部知识 RAG，确认能被索引并被设计文档正确引用。