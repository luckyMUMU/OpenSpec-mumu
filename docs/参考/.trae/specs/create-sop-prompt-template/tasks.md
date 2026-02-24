# Tasks

- [x] Task 1: 创建主prompt模板文件 `sop-prompt-wrapper.md`
  - [x] SubTask 1.1: 定义模板头部（SOP核心原则摘要）
  - [x] SubTask 1.2: 定义路径选择引导模块
  - [x] SubTask 1.3: 定义状态管理引导模块
  - [x] SubTask 1.4: 定义约束检查引导模块
  - [x] SubTask 1.5: 定义命令式指令引导模块
  - [x] SubTask 1.6: 定义来源与依赖声明模块

- [x] Task 2: 创建快速路径专用模板 `fast-path-prompt.md`
  - [x] SubTask 2.1: 定义快速路径判定条件
  - [x] SubTask 2.2: 定义快速路径Skill调用链
  - [x] SubTask 2.3: 定义快速路径升级红线

- [x] Task 3: 创建深度路径专用模板 `deep-path-prompt.md`
  - [x] SubTask 3.1: 定义深度路径判定条件
  - [x] SubTask 3.2: 定义深度路径Skill调用链（新项目/功能迭代）
  - [x] SubTask 3.3: 定义目录并行执行引导

- [x] Task 4: 创建TDD路径专用模板 `tdd-path-prompt.md`
  - [x] SubTask 4.1: 定义TDD启用条件
  - [x] SubTask 4.2: 定义TDD Skill调用链
  - [x] SubTask 4.3: 定义分层验收引导

- [x] Task 5: 创建索引文件 `index.md`
  - [x] SubTask 5.1: 列出所有模板及其用途
  - [x] SubTask 5.2: 提供使用指南

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 1]
- [Task 5] depends on [Task 2, Task 3, Task 4]
