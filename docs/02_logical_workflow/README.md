# L2：逻辑工作流（Architecture / Logical Workflow）

本目录用于存放 **L2 架构设计**（技术无关的逻辑工作流），文件格式为 Markdown：

- 命名：`docs/02_logical_workflow/[module].md`
- 伪代码：在 Markdown 内使用 `pseudo` 代码块
- 必须包含：核心概念、逻辑流程（伪代码）、接口契约、错误码、ADR 摘要与链接

示例结构：

~~~markdown
# [模块] 逻辑设计

## 1. 核心概念

## 2. 逻辑流程 (伪代码)
```pseudo
FUNCTION main(input):
    VALIDATE_INPUT input
    RETURN result
END FUNCTION
```

## 3. 接口契约

## 4. 错误码

## 5. 设计决策 (ADR摘要)
~~~
