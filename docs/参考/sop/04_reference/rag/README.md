---
version: v2.0.0
updated: 2026-02-12
---

# RAG 参考资料目录

> **RAG** = Retrieval Augmented Generation (检索增强生成)

本目录用于存储 AI 辅助开发过程中使用的参考资料，包括用户输入和外部获取的知识。

---

## 目录结构

```
rag/
├── README.md              # 本文件
├── user_input/            # 用户提供的资料
│   ├── requirements/      # 需求文档
│   ├── designs/           # 设计稿/原型
│   └── references/        # 其他参考资料
├── external/              # 外部获取的知识
│   ├── tech_docs/         # 技术文档
│   ├── api_specs/         # API规范
│   └── best_practices/    # 最佳实践
└── project/               # 项目沉淀知识
    ├── patterns.md        # 设计模式
    ├── lessons.md         # 经验教训
    └── decisions.md       # 决策记录摘要
```

---

## 使用指南

### 1. 保存用户输入

当用户提供参考资料时：

1. **判断类型**: 需求文档 / 设计稿 / 参考资料
2. **选择目录**: 
   - 需求 → `user_input/requirements/`
   - 设计稿 → `user_input/designs/`
   - 其他 → `user_input/references/`
3. **命名文件**: `[YYYYMMDD]_[source]_[brief].md`
4. **更新索引**: 在相关文档中引用

**示例**:
```bash
# 用户提供了支付模块需求v2
保存到: user_input/requirements/20260208_user_payment_requirements_v2.md
```

### 2. 保存外部知识

当从外部获取知识时：

1. **判断类型**: 技术文档 / API规范 / 最佳实践
2. **选择目录**:
   - 技术文档 → `external/tech_docs/`
   - API规范 → `external/api_specs/`
   - 最佳实践 → `external/best_practices/`
3. **命名文件**: `[YYYYMMDD]_[source]_[topic].md`
4. **记录来源**: 在文件中注明 URL 或来源

**示例**:
```bash
# 搜索到 PostgreSQL 连接池最佳实践
保存到: external/tech_docs/20260208_ref_postgresql_connection_pool.md
```

### 3. 在设计中引用

在 `design.md` 或 ADR 中添加"参考资料"章节：

```markdown
## 参考资料

### 用户输入
| 来源 | 类型 | 内容摘要 | 链接 |
|------|------|----------|------|
| [20260208_user_req] | 需求 | 支付模块需求v2 | [rag/user_input/requirements/...] |

### 外部知识
| 来源 | 类型 | 内容摘要 | 链接 |
|------|------|----------|------|
| [20260208_postgres_doc] | 技术文档 | 连接池配置 | [rag/external/tech_docs/...] |
```

---

## 命名规范

### 文件命名格式

```
[YYYYMMDD]_[source]_[brief].[ext]
```

**组成部分**:
- `YYYYMMDD`: 日期（接收/获取日期）
- `source`: 来源标识
  - `user`: 用户输入
  - `ref`: 外部参考
  - `[tool]`: 工具名称（如 `web_search`, `github`）
- `brief`: 简短描述（使用下划线连接）
- `ext`: 文件扩展名

**示例**:
- `20260208_user_payment_requirements_v2.md`
- `20260208_ref_postgresql_best_practices.md`
- `20260208_web_search_microservices_patterns.md`

---

## 冲突处理

当参考资料与现有设计冲突时：

1. **标记冲突**: 在文档中标注冲突点
2. **生成报告**: 对比冲突双方的内容和理由
3. **标记状态**: `[USER_DECISION]`
4. **等待决策**: 等待用户选择解决方案
5. **执行更新**: 根据决策更新设计或参考资料

详见 [knowledge_management.md](../knowledge_management.md)

---

## 维护规则

### 定期审查

| 频率 | 内容 | 执行 Skill |
|------|------|--------|
| 每周 | 检查新增文件 | sop-document-sync |
| 每月 | 审查文件有效性 | sop-document-sync |
| 每季度 | 更新项目知识 | sop-document-sync |

### 文件状态

在文件头部标注状态：

```markdown
---
status: active | deprecated | outdated
created: 2026-02-08
updated: 2026-02-08
---
```

---

## 相关文档

- [参考资料管理规范](../knowledge_management.md)
- [ADR 模板](../document_templates/adr.md)
- [架构设计 Skill](../../skills/sop-architecture-design/SKILL.md)
- [实现设计 Skill](../../skills/sop-implementation-designer/SKILL.md)
