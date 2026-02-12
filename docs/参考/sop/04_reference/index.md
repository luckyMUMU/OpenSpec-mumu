# 参考文档

## 渐进式披露层级 (L1-L4)

参见 [document_directory_mapping.md](file:///d:/Code/AI/OpenSpec-mumu/docs/%E5%8F%82%E8%80%83/sop/04_reference/document_directory_mapping.md)（逻辑目录 → 项目实际目录映射）。

| 层级 | 目录 | 内容 | 格式 | 创建者 |
|------|------|------|------|--------|
| L1 | `01_concept_overview.md` | 核心概念 | Markdown | - |
| L2 | `docs/02_logical_workflow/` | 逻辑工作流 | `.md` | Prometheus |
| L3 | `docs/03_technical_spec/` / `src/**/design.md` | 技术规格 | Markdown/YAML | Oracle |
| L4 | `docs/04_context_reference/` | 决策参考 | `adr_*.md` | Prometheus/Oracle |

---

## 文档放置规则

| 目录 | 用途 | 权限 |
|------|------|------|
| `/docs` | 项目设计文档 | 动态创建更新 |
| `/docs/参考/` | SOP参考文档 | **非指定不变更** |
| `/docs/01_requirements/` | **需求文档 (L1-L3)** | **Analyst创建** |
| `/docs/01_requirements/modules/` | **模块/功能需求 (L2-L3)** | **Analyst创建** |
| `/docs/01_requirements/prototypes/` | **原型设计 (L3)** | **Analyst创建** |
| `/docs/02_logical_workflow/` | 架构设计 (L2) | Prometheus创建 |
| `/docs/03_technical_spec/` | 技术规格 (L3) | Oracle创建 |
| `/docs/03_technical_spec/test_cases/` | **测试用例** | **Tester创建** |
| `/docs/04_context_reference/` | 决策参考 (L4) | Prometheus/Oracle创建 |
| `src/**/design.md` | 实现设计 (L3) | Oracle创建 |
| `tests/` | **测试代码** | **TestWorker创建** |

---

## L1-L3: 需求分层 (Analyst)

### 需求层级

| 层级 | 文档 | 位置 | 内容 | 创建者 |
|------|------|------|------|--------|
| L1 | **Project PRD** | `01_requirements/project_prd.md` | 项目愿景、模块清单 | Analyst |
| L2 | **Module MRD** | `01_requirements/modules/[module]_mrd.md` | 模块功能、边界 | Analyst |
| L3 | **Feature FRD** | `01_requirements/modules/[module]/[feature]_frd.md` | 功能详情、交互 | Analyst |
| L3 | **Prototype** | `01_requirements/prototypes/[module]/` | 界面原型 | Analyst |

### 需求文档结构

```
docs/01_requirements/
├── project_prd.md              # L1: 项目级
├── modules/
│   ├── [module]_mrd.md         # L2: 模块级
│   └── [module]/
│       └── [feature]_frd.md    # L3: 功能级
└── prototypes/                 # L3: 原型设计
    └── [module]/
        ├── [feature]_wireframe.drawio
        ├── [feature]_mockup.fig
        └── [feature]_interaction.md
```

### 原型文件格式

| 类型 | 格式 | 工具 | 用途 |
|------|------|------|------|
| 线框图 | `.drawio`, `.png` | Draw.io, Figma | 低保真，快速迭代 |
| 高保真 | `.fig`, `.sketch`, `.xd` | Figma, Sketch, Adobe XD | 最终设计稿 |
| 交互说明 | `.md` | Markdown | 补充交互细节 |

---

## L2: 逻辑工作流 (`.md`)

**创建者**: Prometheus  
**规范**: 技术无关逻辑设计（Markdown 文档，伪代码用 `pseudo` 代码块）

### 伪代码规范
- **原子操作**: `UPPER_SNAKE_CASE` (例: `VALIDATE_INPUT`)
- **函数**: `lower_snake_case` (例: `process_data`)
- **缩进**: 4空格
- **注释**: 说明"为什么"

---

## L3: 技术规格

**创建者**: Oracle  
**规范**: 将L2逻辑流程映射为具体技术实现

### design.md规则
| 复杂度 | 行数 | 要求 |
|--------|------|------|
| 低 | <100 | 省略，代码注释 |
| 中 | 100-500 | 简要+接口契约 |
| 高 | >500 | 完整+详细契约 |

---

## L4: 决策参考 (ADR)

**创建者**: Prometheus / Oracle  
**规范**: 记录关键决策的背景和理由

### ADR编号
```
ADR-[模块]-[序号]: [标题]
```

---

## 参考资料与知识沉淀

用户输入与外部知识沉淀规范请参考：[knowledge_management.md](knowledge_management.md)

---

## TDD测试文档

**创建者**: Tester / TestWorker  
**规范**: CSV格式测试用例，便于人工审核

### 测试用例位置
```
docs/03_technical_spec/test_cases/
├── [module]_test_cases.csv      # 测试用例 (Tester创建)
└── [module]_test_plan.md        # 测试计划 (可选)
```

---

## 模板

| 模板 | 层级 | 用途 | 角色 |
|------|------|------|------|
| **[项目PRD](document_templates/project_prd.md)** | **L1** | **项目级需求** | **Analyst** |
| **[模块MRD](document_templates/module_mrd.md)** | **L2** | **模块级需求** | **Analyst** |
| **[功能FRD](document_templates/feature_frd.md)** | **L3** | **功能级需求** | **Analyst** |
| **[原型规范](document_templates/prototype_guide.md)** | **L3** | **原型设计** | **Analyst** |
| [架构设计](document_templates/architecture_design.md) | L2 | 逻辑工作流 | Prometheus |
| [实现设计](document_templates/implementation_design.md) | L3 | 技术规格 | Oracle |
| [ADR](document_templates/adr.md) | L4 | 决策参考 | Prometheus/Oracle |
| [测试用例CSV](document_templates/test_cases.csv) | L3 | 测试用例 | Tester |

---

## 交互格式

| 格式 | 用途 | 角色 |
|------|------|------|
| [Supervisor报告](interaction_formats/supervisor_report.md) | 进度/熔断/决策 | Supervisor |

---

## 状态标记

- SSOT: 05_constraints/state_dictionary.md + 05_constraints/command_dictionary.md
- `[DIR_WORKING]` - 正在处理当前目录
- `[DIR_WAITING_DEP]` - 等待依赖目录完成
- `[DIR_COMPLETED]` - 当前目录处理完成
- `[DIR_FAILED]` - 当前目录处理失败
- `[USER_DECISION]` - 需要用户决策
- `[已完成]` - 全流程收尾完成（终态）
