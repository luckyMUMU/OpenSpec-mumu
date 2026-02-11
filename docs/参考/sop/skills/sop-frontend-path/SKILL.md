---
name: "sop-frontend-path"
description: "Frontend workflow adapter: enforce FE/BE separation for requirements, L2 workflows, design.md placement, and cross-boundary contracts. Invoke when tasks involve UI/frontend changes."
---

# 前端路径 Skill

> **版本**: v1.5.1

**位置**: `sop/skills/sop-frontend-path/SKILL.md`

## 触发条件

- 任务涉及 UI/前端改动（页面/组件/样式/交互/路由/状态管理/API Client/构建与发布）
- 需要判断是否拆分前端/后端需求与设计，并给出各自的文档与代码落点

## Inputs

- 用户任务描述（必须）
- 现有需求文档（可选：PRD/MRD/FRD/原型）
- 现有 L2 文档（可选）
- 现有 design.md（可选）
- 项目目录结构（可选）

## Output

- 路径决策：前端/后端各自的需求文档、L2 文档、L3 design.md、代码目录位置（引用映射表）
- 分流规则：是否需要拆分 FE/BE FRD 与 design.md 的判定依据
- 契约清单：跨端接口契约（API/DTO/错误码）与前端内部契约（路由/组件/状态边界）的最小清单

## 核心规则

### 1) 路径 SSOT

必须引用：`04_reference/document_directory_mapping.md`

### 2) 前后端分离（硬性）

- 需求：同一业务功能同时涉及前端与后端时，必须拆分为“前端 FRD + 后端 FRD”，并互相引用。
- 设计：前端与后端不得使用同一份 design.md 覆盖两端实现；各自落在各自的 module_dir。
- 代码：Worker/TestWorker 不跨越 design.md 边界修改他端实现；跨端改动通过对方 design.md 追加“待处理变更”请求并交由 Supervisor 协调。

### 3) 目录建议（逻辑路径）

- 前端需求与原型：`docs/01_requirements/frontend/`
- 后端需求：`docs/01_requirements/backend/`
- 前端 L2：`docs/02_logical_workflow/frontend/`
- 后端 L2：`docs/02_logical_workflow/backend/`
- 前端 L3：`src/frontend/**/design.md`（可映射到 `apps/web/**/design.md` / `packages/ui/**/design.md`）
- 后端 L3：`src/backend/**/design.md`（可映射到 `apps/api/**/design.md`）

### 4) 来源与依赖声明（强制）

所有产物必须按 `04_reference/interaction_formats/source_dependency.md` 填写“来源与依赖声明”，至少包含：
- 对应 FRD（前端/后端）与原型（如适用）
- 对应 L2 文档（如适用）
- 受影响的跨端契约与依赖项

## Stop Points

- `[USER_DECISION]`: 无法判定前后端边界、目录映射缺失、或跨端契约存在冲突且无法复核

## 相关文档

- [前端路径（工作流适配）](../../03_workflow/frontend_path.md)
- [目录映射表](../../04_reference/document_directory_mapping.md)
- [来源与依赖声明格式](../../04_reference/interaction_formats/source_dependency.md)
