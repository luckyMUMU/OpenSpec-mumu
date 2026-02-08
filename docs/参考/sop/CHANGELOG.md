# SOP 版本变更历史

> **当前版本**: v1.0.0  
> **更新日期**: 2026-02-08

---

## 版本号规则

```
v[主版本].[次版本].[修订版本]
```

| 版本位 | 变更类型 | 示例 |
|--------|----------|------|
| **主版本** | 架构重大变更、角色体系重构 | v1→v2 |
| **次版本** | 新增角色、新增工作流、新增文档类型 | v1.0→v1.1 |
| **修订版本** | 文档修正、错误修复、格式统一 | v1.0.0→v1.0.1 |

---

## 版本历史

### v1.0.0 (2026-02-08)

**首个稳定版本** - SOP 正式版发布

#### 版本说明
SOP 进入稳定版本阶段，提供完整的 AI 辅助开发工作流规范。

#### 包含内容
- **11 个 AI 角色**: Router, Explorer, Analyst, Prometheus, Skeptic, Oracle, Tester, Worker, TestWorker, Librarian, Supervisor
- **3 种工作路径**: 快速路径、深度路径、TDD深度路径
- **文档层级体系**: L1 PRD / L2 MRD / L3 FRD / L3 Prototype / L4 Implementation
- **14 个 Skill 模块**: 覆盖完整开发流程
- **11 个 Prompt 指令**: 角色行为定义
- **完整模板库**: PRD、MRD、FRD、原型、测试用例等

#### 核心特性
- **测试独立性**: Tester/TestWorker 权限隔离，CSV测试用例人工审核
- **需求分层**: 三级需求文档（项目/模块/功能）+ 原型设计
- **渐进披露**: 按需获取信息，避免信息过载
- **三错即停**: Worker 连续失败 3 次触发熔断机制
- **版本管理**: 完整的版本号体系和变更记录

#### 文档清单
| 类别 | 文件 |
|------|------|
| 核心 | AGENT_SOP.md, 01_concept_overview.md, ROLE_CHEATSHEET.md |
| 工作流 | 03_workflow/index.md, fast_path.md, deep_path.md, three_strike_rule.md |
| 角色 | 02_role_matrix/index.md |
| 参考 | 04_reference/index.md, document_templates/ |
| Skill | skills/* (14个) |
| Prompt | prompts/* (11个) |

---

## 未来计划

### v1.1.0 (计划中)
- 优化 TDD 工作流性能
- 添加更多测试模板
- 完善原型设计工具链

### v2.0.0 (规划中)
- 引入自动化测试执行
- 添加性能测试支持
- 重构角色体系

---

## 贡献者

- Librarian: 文档维护
- Router: 流程优化

---

**注意**: 本文档记录 SOP 的版本变更历史。如需查看详细规范，请参考各版本对应的文档。
