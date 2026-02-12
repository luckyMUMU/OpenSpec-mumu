## 目标
- 在 `docs/参考/sop` 增加“基础编码原则”：创建代码时必须遵守“设计原则六大原则”。
- 在代码审查规则中明确“方法逻辑层级一致性”：同一方法内调用应处于统一抽象层级；涉及数据表操作时，业务方法优先复用既有 CRUD/Repository 能力，而不是混写底层 CRUD 细节。

## 现状
- SOP 体系中尚无专门章节覆盖 SOLID/六大原则与“抽象层级一致性/CRUD 分层”。
- 当前审查标准 [code_diff.standard.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/review_standards/code_diff.standard.md) 与审查格式 [code_review.md](file:///d:/code/AI/openspec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/interaction_formats/code_review.md) 有“可维护性”笼统项，但缺少可执行硬门槛。

## 方案（你确认后我会执行）
### 1) 新增一份可审计的“编码原则”约束文档（SSOT 风格）
- 新增：`docs/参考/sop/05_constraints/coding_principles.md`
- 内容结构（命令式、可审查）：
  - 六大原则：SRP / OCP / LSP / ISP / DIP / LoD（迪米特法则）
  - 方法抽象层级一致性（Single Level of Abstraction）：
    - ✅ 推荐：高层方法只编排业务步骤；底层方法封装 CRUD/SQL/ORM 细节
    - ❌ 禁止：业务方法内混杂 CRUD 细节与业务决策
  - CRUD 分层落地（面向“对表操作”场景）：
    - 约定 Repository/DAO/CRUD 层为最低层
    - “创建或更新”类业务方法优先调用既有 CRUD（或聚合后的 Repository API），避免重复写入逻辑
  - 审查要点清单（与严重级别对应：🔴/🟡/🟢）
- 同步加入 YAML `version/updated`（与当前 SOP v2.0.0 体系一致）。

### 2) 将原则纳入索引与约束入口，保证“可发现/可审计”
- 更新 `docs/参考/sop/05_constraints/index.md`：把 `coding_principles.md` 纳入“文档列表/核心约束速查”。
- 更新 `docs/参考/sop/04_reference/index.md`：在“规范与策略”增加入口（让审查者能从参考索引直达）。

### 3) 将“方法层级一致性/CRUD 分层”固化为审查硬门槛
- 更新审查标准：`04_reference/review_standards/code_diff.standard.md`
  - 在“必检项”新增一条：抽象层级一致性（同一方法内调用层级统一）
  - 明确：业务逻辑不直接落 CRUD；CRUD/Repository 为低层，统一封装并复用
- 更新审查格式：`04_reference/interaction_formats/code_review.md`
  - 在“复核清单（摘要）”追加勾选项：抽象层级一致性/复用 CRUD

### 4) 复核与验证
- 全局检索确认：新增文档被索引、被审查标准引用，且链接可达。
- 复查 YAML 头部一致性：新增/改动文件仍满足 `version/updated`。

## 验收标准
- 能从 `04_reference/index.md` 与 `05_constraints/index.md` 快速找到编码原则文档。
- `code_diff.standard.md` 与 `code_review.md` 明确包含“方法抽象层级一致性/CRUD 分层复用”规则。
- 新增文档内容为命令式、可审查、可在 code review 中直接引用。