## 目标
调整 SOP 支持需求分层（项目/模块/功能级）和原型设计（UI项目）。

## 需求分层结构

### 文档层级

| 层级 | 文档类型 | 位置 | 内容 | 创建者 |
|------|----------|------|------|--------|
| L1 | Project PRD | `01_requirements/project_prd.md` | 项目愿景、目标、范围 | Analyst |
| L2 | Module MRD | `01_requirements/modules/[module]_mrd.md` | 模块功能、边界、接口 | Analyst |
| L3 | Feature FRD | `01_requirements/modules/[module]/[feature]_frd.md` | 功能详情、交互、验收 | Analyst |
| L3 | Prototype | `01_requirements/prototypes/[module]/` | 界面原型、交互说明 | Analyst |

### 目录结构

```
docs/01_requirements/
├── project_prd.md              # 项目级需求 (L1)
├── modules/
│   ├── [module]_mrd.md         # 模块级需求 (L2)
│   └── [module]/
│       └── [feature]_frd.md    # 功能级需求 (L3)
└── prototypes/                 # 原型设计 (UI项目)
    ├── [module]/
    │   ├── [feature]_wireframe.[ext]   # 线框图
    │   ├── [feature]_mockup.[ext]      # 高保真原型
    │   └── [feature]_interaction.md    # 交互说明
    └── assets/                 # 原型资源
```

## 具体修改

### 1. 新增需求文档模板

| 文件 | 说明 |
|------|------|
| `document_templates/project_prd.md` | 项目级PRD模板 (L1) |
| `document_templates/module_mrd.md` | 模块级MRD模板 (L2) |
| `document_templates/feature_frd.md` | 功能级FRD模板 (L3) |
| `document_templates/prototype_guide.md` | 原型设计规范 |

### 2. 更新 Analyst Prompt

- 扩展职责：支持多级需求分析
- 添加原型设计流程
- 明确各层级需求的输入输出关系

### 3. 更新参考文档索引

- 添加需求分层说明
- 添加原型设计规范
- 添加文档层级关系图

### 4. 更新 AGENT_SOP.md

- 添加需求分层路径
- 添加原型设计流程
- 更新文档位置说明

### 5. 更新 Router Prompt

- 添加UI项目判断逻辑
- 添加原型设计路径选项

## 关键约束

1. **渐进式披露**: 父级文档只保留摘要+链接
2. **可追溯**: L3功能需求必须链接到L2模块需求
3. **原型可选**: 仅UI项目需要原型设计
4. **单一来源**: 同一信息不在多个层级重复