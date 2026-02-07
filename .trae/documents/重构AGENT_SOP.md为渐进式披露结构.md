按照渐进式披露思想，将 `AGENT_SOP.md` 重构为四级文档结构：

## 📂 目标目录结构

```
docs/参考/sop/
├── 01_concept_overview.md      # L1: 核心概念与价值（极简）
├── 02_role_matrix/             # L2: 角色定义与职责
│   ├── index.md               # 角色矩阵总览
│   ├── prometheus.md          # 架构设计角色
│   ├── oracle.md              # 实现设计角色
│   ├── worker.md              # 编码实现角色
│   ├── supervisor.md          # 监管角色
│   └── librarian.md           # 文档管理角色
├── 03_workflow/                # L3: 工作流详细规范
│   ├── index.md               # 工作流总览
│   ├── fast_path.md           # 快速路径
│   ├── deep_path.md           # 深度路径
│   └── three_strike_rule.md   # 三错即停机制
├── 04_reference/               # L4: 参考文档与模板
│   ├── document_templates/    # 文档模板
│   │   ├── architecture_design.md
│   │   └── implementation_design.md
│   ├── interaction_formats/   # 交互格式
│   └── technical_standards/   # 技术规范
└── AGENT_SOP.md               # 入口文件（仅包含摘要和链接）
```

## 🎯 每层内容规划

### L1: 核心概念层
- 一句话定义：AI项目通用规约
- 核心原则：准度>速度、文档先行、渐进披露
- 快速导航：指向L2的链接

### L2: 角色矩阵层
- 每个角色的职责、权限、使用场景
- 角色间的协作关系
- 角色选择决策树

### L3: 工作流规范层
- 详细的标准作业程序
- 各路径的具体执行步骤
- 停止点和检查清单

### L4: 参考文档层
- 完整的文档模板
- 交互格式示例
- 技术规范细节

## 🔧 重构步骤

1. 创建目录结构
2. 提取L1内容到01_concept_overview.md
3. 提取角色信息到02_role_matrix/
4. 提取工作流到03_workflow/
5. 提取模板和参考到04_reference/
6. 重写AGENT_SOP.md为入口文件
7. 添加交叉引用链接

## ✅ 预期结果

- AGENT_SOP.md从400+行缩减到50行以内
- 每层文档独立可阅读
- 清晰的渐进式披露路径
- 易于维护和扩展