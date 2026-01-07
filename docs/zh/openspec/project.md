# OpenSpec项目概述

一个最小的CLI工具，帮助开发者设置OpenSpec文件结构并保持AI指令更新。AI工具本身通过直接处理markdown文件来处理所有变更管理复杂性。

## 技术栈
- 语言：TypeScript
- 运行时：Node.js（≥20.19.0，ESM模块）
- 包管理器：pnpm
- CLI框架：Commander.js
- 用户交互：@inquirer/prompts
- 分发：npm包

## 项目结构
```
src/
├── cli/        # CLI命令实现
├── core/       # 核心OpenSpec逻辑（模板、结构）
└── utils/      # 共享工具（文件操作、回滚）

dist/           # 编译输出（git忽略）
```

## 约定
- 启用TypeScript严格模式
- 所有异步操作使用Async/await
- 最小依赖原则
- CLI、核心逻辑和工具之间的清晰分离
- 具有描述性名称的AI友好代码

## 错误处理
- 让错误冒泡到CLI级别以保持一致的用户消息
- 使用带有描述性消息的原生Error类型
- 使用适当的代码退出：0（成功）、1（一般错误）、2（误用）
- 工具函数中没有try-catch，在命令级别处理

## 日志记录
- 直接使用控制台方法（无日志库）
- console.log()用于正常输出
- console.error()用于错误（输出到stderr）
- 最初没有详细/调试模式（保持简单）

## 测试策略
- 开发期间通过`pnpm link`进行手动测试
- 仅对关键路径进行冒烟测试（初始化、帮助命令）
- 最初没有单元测试 - 复杂性增长时添加
- 测试命令：`pnpm test:smoke`（添加时）

## 开发工作流
- 对所有包管理使用pnpm
- 运行`pnpm run build`编译TypeScript
- 运行`pnpm run dev`进行开发模式
- 使用`pnpm link`进行本地测试
- 遵循OpenSpec自己的变更驱动开发流程