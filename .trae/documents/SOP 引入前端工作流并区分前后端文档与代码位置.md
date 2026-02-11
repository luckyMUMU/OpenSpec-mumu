## 目标
- 在 `docs/参考/sop`（v1.5.0）内补齐“前端工作流程”与“前后端分离”的文档/代码放置规范。
- 同步更新“角色矩阵/角色速查/技能”相关内容，使 Router/Analyst/Oracle/Worker 等在前端场景下的职责边界与产物位置清晰。

## 现状结论（基于本次检索）
- SOP 已覆盖 UI 原型与 FRD 原型章节（`prototype_guide.md`、`feature_frd.md`），但未定义前端源码目录与 `design.md` 的约定（仅有 `src/**/design.md` 的泛化）。
- 目录映射 SSOT 为 `04_reference/document_directory_mapping.md`，当前不区分 FE/BE。
- 角色矩阵与速查未描述前端产物与目录边界（`02_role_matrix/index.md`、`ROLE_CHEATSHEET.md`）。

## 设计原则（保持与 SOP 一致）
- 不新增角色与状态字典条目：复用既有角色与状态（前端仅是“目录与产物类型”的分流）。
- 通过“逻辑目录 → 项目落地目录映射”实现可定制：SOP 增加 FE/BE 的逻辑路径与默认建议，具体仓库可以映射为 `src/frontend`/`src/backend` 或 `apps/web`/`apps/api` 等。
- 需求/设计/代码三者分离：需求文档只写需求与验收；L2 写逻辑；L3 design.md 写技术实现与任务；代码目录与文档目录不混放。

## 需要修改/新增的文档（只改文档）
### 1) 扩展目录映射 SSOT：区分 FE/BE
- 更新 [document_directory_mapping.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/document_directory_mapping.md)
  - 在“目录映射”表新增 FE/BE 的逻辑目录条目：
    - 需求：`docs/01_requirements/frontend/`、`docs/01_requirements/backend/`（并给出与现有 `modules/` 共存的规则：同一业务模块可拆 FE/BE FRD）
    - L2：`docs/02_logical_workflow/frontend/`、`docs/02_logical_workflow/backend/`
    - L3：`docs/03_technical_spec/frontend/`、`docs/03_technical_spec/backend/`
    - design.md：`src/frontend/**/design.md`、`src/backend/**/design.md`（允许通过映射落地为 `apps/web/**/design.md`、`apps/api/**/design.md`、`packages/ui/**/design.md`）
  - 同步“关键文件约定（逻辑路径）”章节：补充 FE/BE 的 `test_cases` 组织建议与引用方式（引用链不变）。

### 2) 在 SOP 总入口补齐 FE/BE 放置口径
- 更新 [AGENT_SOP.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/AGENT_SOP.md)
  - “文档位置”章节：将需求/设计/测试表格按 FE/BE 分流（或提供两个表），并声明以映射表为准。
- 更新 [04_reference/index.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/index.md)
  - “文档放置规则”“需求分层”“设计文档”段落增加 FE/BE 示例目录与引用规范。

### 3) 引入前端工作流程（新增工作流文档 + 导航）
- 新增 `docs/参考/sop/03_workflow/frontend_path.md`
  - 内容：把前端场景映射到既有 Fast/Deep/TDD（不发明新流程），说明：
    - 输入：FRD + Prototype（UI 项目），必要时拆分 FE/BE FRD；
    - L2：前端交互逻辑/状态流转以 pseudo 表达；
    - L3：前端实现设计落在 `src/frontend/**/design.md`（或映射目录），后端落在 `src/backend/**/design.md`；
    - 跨端协作通过“接口契约 + 目录依赖 + 待处理变更追加”保持边界。
- 更新 [03_workflow/index.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/03_workflow/index.md)
  - 增加“前端路径”入口与适用条件。

### 4) 角色文档：明确前端职责与产物边界
- 更新 [02_role_matrix/index.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/02_role_matrix/index.md)
  - 在“角色总览/权限矩阵/示例”中补充 FE/BE 目录边界示例（例如 `src/frontend/*` 与 `src/backend/*` 各自一个 design.md）。
  - 为 Analyst/Prometheus/Oracle/Tester/Worker/TestWorker/CodeReviewer 添加“前端产物关注点”要点（如：原型引用、前端 design.md 的接口契约类型、前端验收资产位置）。
- 更新 [ROLE_CHEATSHEET.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/ROLE_CHEATSHEET.md)
  - “文档类型”表拆分 FE/BE 路径；补齐版本号与 v1.5.0 对齐；新增“前端路径”链接入口。

### 5) Skill：补齐前端目录示例与新增前端工作流 Skill
- 更新 [sop-design-placement/SKILL.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/skills/sop-design-placement/SKILL.md)
  - 在路径示例中加入 `src/frontend/...`、`src/backend/...`、`apps/web/...`、`apps/api/...`、`packages/ui/...`。
  - 明确：前端与后端不得落在同一 module_dir；跨端改动用“请求追加到对方 design.md”。
- 更新 [sop-implementation-designer/SKILL.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/skills/sop-implementation-designer/SKILL.md)
  - 增补“前端实现设计”需要覆盖的契约类型示例（如：路由契约、UI 组件契约、API Client 契约、状态管理边界），不绑定具体框架。
- 新增 `docs/参考/sop/skills/sop-frontend-path/SKILL.md`
  - 目的：当任务涉及 UI/前端改动时，指导 Router/Oracle/Worker 如何：
    - 判定是否需要拆分 FE/BE 需求与设计文档；
    - 选择落地目录（通过映射表）；
    - 输出前端专用的“来源与依赖声明”与“接口契约清单”。

### 6) 同步总则文档（可选但推荐）：document_llm_GUIDE
- 更新 [document_llm_GUIDE.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/document_llm_GUIDE.md)
  - 在“目录映射/L1-L4 示例”处加入 FE/BE 分流示例与引用规则（仍以 SOP 映射表为准）。

## 一致性自检（完成定义）
- SOP 中出现的 FE/BE 路径均能在 `document_directory_mapping.md` 找到对应条目。
- “前端路径”不引入新状态/新角色，仅补充对 Fast/Deep/TDD 的前端适配说明。
- 角色矩阵与角色速查对 FE/BE 的目录边界、产物位置、权限隔离表述一致。
- 新增 Skill 与既有 Skill 的引用链不自相矛盾，并引用映射表与来源/依赖 SSOT。