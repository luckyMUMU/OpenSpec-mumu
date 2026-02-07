## 目标
为 SOP 添加 TDD (测试驱动开发) 机制作为可选项。

## 核心设计

### 1. 新增角色

| 角色 | 职责 | 输入 | 输出 | 层级 |
|------|------|------|------|------|
| **Tester** | 基于设计文档生成测试用例 | L3设计文档 | 测试用例CSV | L3 |
| **TestWorker** | 基于测试用例编写测试代码 | 测试用例CSV+代码实现 | 测试代码 | L3 |

### 2. 测试用例位置

```
docs/03_technical_spec/test_cases/
├── [module]_test_cases.csv      # 测试用例 (Tester创建)
└── [module]_test_plan.md        # 测试计划 (可选)
```

### 3. CSV 格式规范

```csv
ID,模块,功能点,测试场景,前置条件,输入数据,预期输出,优先级,类型,状态,关联L2原子操作
TC001,订单,创建,正常流程,用户登录,"{product:A,qty:1}","{status:success}",P0,正向,待实现,PROCESS_ORDER
TC002,订单,创建,库存不足,用户登录,"{product:B,qty:100}","{error:OUT_OF_STOCK}",P1,异常,待实现,VALIDATE_INVENTORY
```

### 4. TDD 工作流（可选项）

**标准深度路径**:
```
Analyst → Prometheus ↔ Skeptic → Oracle → Worker → Librarian
```

**TDD深度路径**（启用时）:
```
Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Worker + TestWorker → Librarian
                                    ↓
                              生成CSV测试用例
```

### 5. 需要创建的文件

| 文件 | 类型 | 说明 |
|------|------|------|
| `prompts/tester_prompt.md` | Prompt | Tester角色指令 |
| `prompts/test_worker_prompt.md` | Prompt | TestWorker角色指令 |
| `skills/sop-tdd-workflow/SKILL.md` | Skill | TDD工作流定义 |
| `04_reference/document_templates/test_cases.csv` | 模板 | 测试用例CSV模板 |
| `04_reference/document_templates/test_plan.md` | 模板 | 测试计划模板 |

### 6. 需要更新的文件

| 文件 | 更新内容 |
|------|----------|
| `AGENT_SOP.md` | 添加TDD路径和角色说明 |
| `ROLE_CHEATSHEET.md` | 添加Tester和TestWorker速查 |
| `02_role_matrix/index.md` | 添加新角色到权限矩阵 |
| `03_workflow/index.md` | 添加TDD工作流说明 |
| `04_reference/index.md` | 添加测试文档模板链接 |
| `prompts/router_prompt.md` | 添加TDD路径选项 |

### 7. 关键约束

- **测试用例来源**: 仅基于 L2/L3 设计文档，不跟随代码实现变更
- **测试代码来源**: 主要基于测试用例CSV，参考代码实现
- **CSV格式**: 便于人工审核，包含完整测试场景
- **可选项**: 通过 Router 判断是否启用 TDD 路径

### 8. 测试用例与设计的追溯

CSV 包含 `关联L2原子操作` 字段，建立测试用例与 L2 伪代码的映射关系，确保测试覆盖所有逻辑分支。