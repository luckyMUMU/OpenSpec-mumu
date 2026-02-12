---
version: v2.0.0
updated: 2026-02-12
---

# 架构设计模板 (L2: 逻辑工作流)

**层级**: L2 - 逻辑工作流  
**位置**: `docs/02_logical_workflow/[module].md`  
**创建者**: sop-architecture-design  
**规范**: 技术无关，只描述逻辑，不写实现

---

## 文件结构

~~~markdown
# [模块] 逻辑设计

## 1. 核心概念

### 0. 来源与依赖声明
> 必须引用 [Source and Dependency](../04_reference/interaction_formats/source_dependency.md) 标准格式

- 定义: [一句话定义]
- 痛点: [解决什么问题]
- 术语: [关键术语定义]

## 2. 逻辑流程 (伪代码)
```pseudo
// 主流程
FUNCTION main(input):
    VALIDATE_INPUT input
    
    IF input.type == "A":
        result = PROCESS_TYPE_A(input)
    ELSE IF input.type == "B":
        result = PROCESS_TYPE_B(input)
    ELSE:
        RAISE_ERROR "Invalid type"
    
    RETURN result
END FUNCTION

// 子流程A
FUNCTION PROCESS_TYPE_A(data):
    // 为什么需要预处理：确保数据格式统一
    normalized = PREPROCESS_DATA(data)
    
    FOR EACH item IN normalized.items:
        TRANSFORM_ITEM item
    END FOR
    
    RETURN BUILD_RESULT(normalized)
END FUNCTION
```

## 3. 接口契约
### 输入
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| field | String | 是 | [说明] |

### 输出
| 字段 | 类型 | 说明 |
|------|------|------|
| result | Object | [说明] |

### 错误码
| 码 | 说明 | 处理 |
|----|------|------|
| E001 | [说明] | [处理] |

## 4. 选型调研（候选方案对比）
| 决策点 | 候选方案 | 适用场景 | 约束/风险 | 运维复杂度 | 结论 |
|--------|----------|----------|-----------|------------|------|
| [主题] | A / B | [场景] | [风险] | [高/中/低] | [结论/待决策] |

## 5. 参考资料（RAG）
| 来源 | 类型 | 内容摘要 | 链接 |
|------|------|----------|------|
| [20260211_xxx] | 外部知识/用户输入 | [摘要] | [rag/external/... 或 rag/user_input/...] |

## 6. 设计决策 (ADR摘要)
| 决策 | 选项 | 选择 | 理由 | 证据 |
|------|------|------|------|------|
| [主题] | A/B | [选择] | [一句话理由] | [RAG/ADR链接] |

👉 ADR 位置：`docs/04_context_reference/adr_[module]_[decision].md`（参见 04_reference/document_directory_mapping.md）
~~~

---

## 伪代码规范 (L2层)

### 命名规范
| 类型 | 格式 | 示例 |
|------|------|------|
| 原子操作 | `UPPER_SNAKE_CASE` | `VALIDATE_INPUT` |
| 函数 | `lower_snake_case` | `process_data` |
| 常量 | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT` |

### 控制结构
```pseudo
// 条件
IF condition:
    action
ELSE IF other_condition:
    other_action
ELSE:
    default_action
END IF

// 循环
FOR EACH item IN collection:
    process(item)
END FOR

WHILE condition:
    action
END WHILE

// 异常处理
TRY:
    operation
CATCH error:
    handle_error
END TRY
```

### 注释规范
- 注释说明"为什么"，而非"是什么"
- 复杂逻辑前添加意图说明

```pseudo
// 好：说明为什么需要过滤
// 过滤已删除项目，避免处理无效数据
FOR EACH item IN items:
    IF item.status == "deleted":
        CONTINUE
    END IF
END FOR

// 不好：描述做了什么
// 遍历items，如果status是deleted就跳过
```

---

## L2层约束

✅ **必须**:
- 使用 Markdown 文档描述逻辑，伪代码用代码块
- 技术无关（不写具体语言/框架）
- 原子操作用 `UPPER_SNAKE_CASE`
- 4空格缩进

❌ **禁止**:
- 具体编程语言语法
- 技术栈相关代码（如 `db.connect()`, `redis.get()`）
- 实现细节（如 `import`, `logger.info`）

---

## 与L3/L4的关系

| 层级 | 文件 | 内容 | 产出 Skill |
|------|------|------|--------|
| L2 | `.md` | 逻辑工作流 | sop-architecture-design |
| L3 | `design.md` / `03_technical_spec/` | 技术规格 | sop-implementation-designer |
| L4 | `04_context_reference/adr_*.md` | 决策背景 | sop-architecture-design / sop-implementation-designer |

👉 L3 将 L2 的伪代码映射为具体技术实现  
👉 L4 记录 L2/L3 的关键决策理由
