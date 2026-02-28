# Tasks

- [x] Task 1: 更新 constraint_matrix.md，添加外部引用文档保护约束
  - [x] Task 1.1: 在 1.2 文件操作约束表格中新增外部文档识别约束
  - [x] Task 1.2: 在 4.1 按文件类型表格中新增 EXTERNAL_前缀文档行
  - [x] Task 1.3: 在 4.2 按目录位置表格中确认/d ocs/参考/目录约束
  - [x] Task 1.4: 在 7.1 Skill 权限速查表格中更新 sop-document-sync 权限说明
  - [x] Task 1.5: 在 1.2 文件操作约束表格中新增临时文件管理约束
  - [x] Task 1.6: 在 4.2 按目录位置表格中新增.temp/目录约束

- [x] Task 2: 更新 command_dictionary.md，添加外部文档保护命令
  - [x] Task 2.1: 新增 CHECK_EXTERNAL_DOC 命令定义
  - [x] Task 2.2: 新增 PROTECT_REFERENCE 命令定义
  - [x] Task 2.3: 在命令序列示例中添加外部文档检查流程
  - [x] Task 2.4: 新增临时文件管理相关命令定义

- [ ] Task 3: 更新 state_dictionary.md（如需要），添加相关状态标记
  - [ ] Task 3.1: 检查是否需要新增外部文档保护相关状态
  - [ ] Task 3.2: 如需要，添加状态定义和转移规则

- [ ] Task 4: 验证约束更新
  - [ ] Task 4.1: 验证所有相关文档已更新
  - [ ] Task 4.2: 验证约束表述一致性和完整性
  - [ ] Task 4.3: 验证命令定义与状态标记的配套性

# Task Dependencies

- [Task 2] depends on [Task 1] - 需要先明确约束再定义命令
- [Task 3] depends on [Task 1] - 需要先明确约束再定义状态
- [Task 4] depends on [Task 1, Task 2, Task 3] - 需要在所有更新完成后验证
