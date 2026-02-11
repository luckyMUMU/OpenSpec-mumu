# 前端路径（工作流适配）

> **版本**: v1.5.1

本文件用于将“前端工作”纳入既有 SOP 路径（快速/深度/TDD），并强制前后端在需求、设计与代码位置上分离。

---

## 适用范围

前端任务定义（满足任一即视为前端任务）：
- 修改或新增 UI 页面、组件库、样式系统、交互逻辑
- 修改或新增前端路由、状态管理、API Client、表单校验
- 引入前端构建/运行/测试/发布相关改动

---

## 目录与产物位置（前后端分离）

路径以“逻辑目录”为准；若项目实际结构不同，必须以 `04_reference/document_directory_mapping.md` 提供映射，并要求 Router 输出引用该表。

### 需求文档（Analyst）

- 通用：`docs/01_requirements/project_prd.md`、`docs/01_requirements/modules/[module]_mrd.md`
- 前端 FRD：`docs/01_requirements/frontend/modules/[module]/[feature]_frd.md`
- 前端原型：`docs/01_requirements/frontend/prototypes/[module]/`
- 后端 FRD：`docs/01_requirements/backend/modules/[module]/[feature]_frd.md`

规则：
- 同一业务功能同时涉及前端与后端时，必须拆分为“前端 FRD + 后端 FRD”，并在两者的“来源与依赖声明”中互相引用对应条目。

### 设计文档（Prometheus / Oracle）

- 前端 L2：`docs/02_logical_workflow/frontend/*.md`
- 后端 L2：`docs/02_logical_workflow/backend/*.md`
- 前端 L3（实现设计）：`src/frontend/**/design.md`（可映射到 `apps/web/**/design.md` 或 `packages/ui/**/design.md`）
- 后端 L3（实现设计）：`src/backend/**/design.md`（可映射到 `apps/api/**/design.md`）

规则：
- L2 仅表达逻辑，不绑定框架；前端 L2 用 `pseudo` 表达交互/状态流转/边界条件，不写实现调用。
- L3 必须包含 L2→L3 映射、接口契约与任务清单；前端与后端不得落在同一 `module_dir` 下的同一份 design.md。

---

## 路径映射（不新增流程）

### 快速路径（前端）

适用：单文件 + <30 行 + 无逻辑变更（例如样式微调、文案调整、非行为性的 refactor）。

```
Explorer → Worker → CodeReviewer → Librarian
```

升级红线（任一满足即升级为深度路径）：
- 影响交互/控制流/数据模型/安全边界/并发语义/依赖行为
- 触及前后端契约（API/DTO/错误码）或跨目录改动

### 深度路径（前端）

适用：新增页面/组件、交互逻辑变更、引入新依赖、跨文件/跨目录改动、或任何不确定是否有行为变化的场景。

```
Analyst → (Prometheus ↔ Skeptic) → Oracle → Supervisor → [多 Worker 并行] → CodeReviewer → Librarian
```

前端任务的关键要求：
- Oracle 为 `src/frontend/**`（或映射目录）产出 design.md，并在“接口契约”中显式声明：路由契约/组件契约/API Client 契约/状态边界（按需要选取）。
- 当变更影响后端契约时，禁止直接修改后端实现；只能对后端目标目录的 design.md 追加“待处理变更”，并通知 Supervisor 协调（参见 `04_reference/design_directory_strategy.md`）。

### TDD 深度路径（前端，可选）

适用：关键交互/复杂状态机/高风险页面/组件库变更，或要求更高覆盖。

Tester 的测试用例资产建议按前后端拆分：
- 前端：`docs/03_technical_spec/frontend/test_cases/*.csv`
- 后端：`docs/03_technical_spec/backend/test_cases/*.csv`

测试目录与验收层级仍按 `05_constraints/acceptance_criteria.md` 执行。

---

## 来源与依赖声明（强制）

前端相关产物必须包含 `## 来源与依赖声明` 并按 `04_reference/interaction_formats/source_dependency.md` 填写，至少覆盖：
- 对应 FRD（以及原型/交互说明）引用
- 对应 L2 引用（如有）
- 受影响的跨端接口契约引用（API/错误码/数据模型）

---

## 相关文档

- [目录映射表](../04_reference/document_directory_mapping.md)
- [目录维度工作策略](../04_reference/design_directory_strategy.md)
- [快速路径](fast_path.md)
- [深度路径](deep_path.md)
