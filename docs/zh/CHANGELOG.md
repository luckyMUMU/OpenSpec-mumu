# @fission-ai/openspec

## 0.18.0

### 次要变更

- 8dfd824: 添加OPSX实验性工作流命令和增强的构件系统

  **新命令：**

  - `/opsx:ff` - 快速转发通过构件创建，一次性生成所有需要的构件
  - `/opsx:sync` - 将增量规范从变更同步到主规范
  - `/opsx:archive` - 使用智能同步检查归档已完成的变更

  **构件工作流增强：**

  - 带有内联指导和XML输出的模式感知应用指令
  - 实验性构件工作流的代理模式选择
  - 通过`.openspec.yaml`文件实现每个变更的模式元数据
  - 实验性构件工作流的代理技能
  - 用于模板加载和变更上下文的指令加载器
  - 将模式重新构建为带模板的目录

  **改进：**

  - 增强的列表命令，带有最后修改时间戳和排序
  - 用于更好工作流支持的变更创建工具

  **修复：**

  - 规范化路径以实现跨平台glob兼容性
  - 创建新规范文件时允许移除要求

## 0.17.2

### 补丁变更

- 455c65f: 修复validate命令中的`--no-interactive`标志，以正确禁用旋转器，防止在预提交钩子和CI环境中挂起

## 0.17.1

### 补丁变更

- a2757e7: 通过使用@inquirer/prompts的动态导入修复config命令中的预提交钩子挂起问题

  config命令由于在模块加载时注册stdin事件监听器而导致预提交钩子无限期挂起。此修复将静态导入转换为动态导入，仅在交互式使用`config reset`命令时加载inquirer。

  还添加了ESLint规则以防止静态@inquirer导入，避免未来的回归。

## 0.17.0

### 次要变更

- 2e71835: ### 新功能

  - 添加`openspec config`命令用于管理全局配置设置
  - 使用XDG基础目录规范支持实现全局配置目录
  - 为增强CLI体验添加Oh-my-zsh shell补全支持

  ### 错误修复

  - 通过使用动态导入修复预提交钩子中的挂起
  - 在所有平台上尊重XDG_CONFIG_HOME环境变量
  - 解决zsh安装程序测试中的Windows兼容性问题
  - 使cli-completion规范与实现保持一致
  - 从斜杠命令中移除硬编码代理字段

  ### 文档

  - 在README中按字母顺序排列AI工具列表并使其可折叠

## 0.16.0

### 次要变更

- c08fbc1: 添加新的AI工具集成和增强：

  - **feat(iflow-cli)**: 添加带有斜杠命令支持和文档的iFlow-cli集成
  - **feat(init)**: 在初始化后添加IDE重启指令，告知用户斜杠命令可用性
    **feat(antigravity)**: 添加Antigravity斜杠命令支持
  - **fix**: 为Qwen Code生成TOML命令（修复#293）
  - 澄清搭建提案文档并增强提案指南
  - 更新提案指南以强调在实现前采用设计优先方法

## 未发布

### 次要变更

- 添加Antigravity斜杠命令支持，以便`openspec init`可以生成带有仅描述性前言的`.agent/workflows/openspec-*.md`文件，`openspec update`刷新现有工作流以及Windsurf。

## 0.15.0

### 次要变更

- 4758c5c: 添加对新的AI助手的支持，具有原生斜杠命令集成

  - **Gemini CLI**: 为Gemini CLI添加带有`.gemini/commands/openspec/`集成的原生TOML基础斜杠命令支持
  - **RooCode**: 添加带有配置器、斜杠命令和模板的RooCode集成
  - **Cline**: 修复Cline使用工作流而不是规则进行斜杠命令（`.clinerules/workflows/`路径）
  - **文档**: 更新文档以反映新集成和工作流变更

## 0.14.0

### 次要变更

- 8386b91: 添加对新的AI助手的支持并改进配置

  - feat: 添加带有斜杠命令集成的Qwen Code支持
  - feat: 向应用斜杠命令添加$ARGUMENTS支持以传递动态变量
  - feat: 向配置和文档添加Qoder CLI支持
  - feat: 添加CoStrict AI助手支持
  - fix: 在扩展模式下重新创建缺失的openspec模板文件
  - fix: 防止工具的"已配置"错误检测
  - fix: 使用变更ID作为回退标题而不是"无标题变更"
  - docs: 添加填充项目级上下文的指导
  - docs: 在README中添加Crush到支持的AI工具

## 0.13.0

### 次要变更

- 668a125: 添加对多个AI助手的支持并改进验证

  此版本添加了对几个新的AI编码助手的支持：

  - CodeBuddy Code - AI驱动的编码助手
  - CodeRabbit - AI代码审查助手
  - Cline - Claude驱动的CLI助手
  - Crush AI - AI助手平台
  - Auggie (Augment CLI) - 代码增强工具

  新功能：

  - 归档斜杠命令现在支持参数以实现更灵活的工作流

  错误修复：

  - 增量规范验证现在处理不区分大小写的标题并正确检测空部分
  - 归档验证现在正确尊重--no-validate标志并忽略元数据

  文档改进：

  - 添加了VS Code开发容器配置以简化开发设置
  - 使用显式变更ID符号更新AGENTS.md
  - 使用重启说明增强斜杠命令文档

## 0.12.0

### 次要变更

- 082abb4: 为斜杠命令添加工厂函数支持和非交互式init选项

  此版本包含两个新功能：

  - **斜杠命令的工厂函数支持**：斜杠命令现在可以定义为返回命令对象的函数，实现动态命令配置
  - **非交互式init选项**：向`openspec init`添加了`--tools`、`--all-tools`和`--skip-tools` CLI标志，用于CI/CD管道中的自动化初始化，同时保持与交互模式的向后兼容性

## 0.11.0

### 次要变更

- 312e1d6: 添加Amazon Q Developer CLI集成。OpenSpec现在支持Amazon Q Developer，在`.amazonq/prompts/`目录中自动生成提示，允许您使用Amazon Q的@-语法使用OpenSpec斜杠命令。

## 0.10.0

### 次要变更

- d7e0ce8: 改进入口向导Enter键行为，允许更自然地继续提示

## 0.9.2

### 补丁变更

- 2ae0484: 修复跨平台路径处理问题。此版本包括joinPath行为和斜杠命令路径解析的修复，以确保OpenSpec在所有平台上正确工作。

## 0.9.1

### 补丁变更

- 8210970: 修复选择Codex集成时Windows上的OpenSpec无法工作问题。此版本包括跨平台路径处理和规范化的修复，以确保OpenSpec在Windows系统上正确工作。

## 0.9.0

### 次要变更

- efbbf3b: 添加对Codex和GitHub Copilot斜杠命令的支持，带有YAML前言和$ARGUMENTS

## 未发布

### 次要变更

- 添加GitHub Copilot斜杠命令支持。OpenSpec现在将提示写入`.github/prompts/openspec-{proposal,apply,archive}.prompt.md`，带有YAML前言和`$ARGUMENTS`占位符，并在`openspec update`时刷新它们。

## 0.8.1

### 补丁变更

- d070d08: 修复CLI版本不匹配并添加发布保护，通过`openspec --version`验证打包的tarball打印与package.json相同的版本。

## 0.8.0

### 次要变更

- c29b06d: 添加Windsurf支持。
- 添加Codex斜杠命令支持。OpenSpec现在将提示直接写入Codex的全局目录（`~/.codex/prompts`或`$CODEX_HOME/prompts`），并在`openspec update`时刷新它们。

## 0.7.0

### 次要变更

- 添加原生Kilo Code工作流集成，以便`openspec init`和`openspec update`管理`.kilocode/workflows/openspec-*.md`文件。
- 始终搭建托管的根`AGENTS.md`交接存根，并在初始化/更新期间重新组合AI工具提示，以保持指令一致。

## 0.6.0

### 次要变更

- 将生成的根代理指令精简为托管的交接存根，并更新初始化/更新流程以安全地刷新它。

## 0.5.0

### 次要变更

- feat: 实现第一阶段E2E测试，带有跨平台CI矩阵

  - 在test/helpers/run-cli.ts中添加共享runCLI助手以进行生成测试
  - 创建test/cli-e2e/basic.test.ts，涵盖帮助、版本、验证流程
  - 将现有CLI exec测试迁移到使用runCLI助手
  - 将CI矩阵扩展到bash（Linux/macOS）和pwsh（Windows）
  - 拆分PR和主工作流以优化反馈

### 补丁变更

- 使应用指令更具体

  使用更具体和可操作的指令改进代理模板和斜杠命令模板。

- docs: 改进文档和清理

  - 记录归档命令的non-interactive标志
  - 在README中替换discord徽章
  - 为了更好地组织而归档已完成的变更

## 0.4.0

### 次要变更

- 为CLI改进和增强的用户体验添加OpenSpec变更提案
- 为AI驱动开发工作流添加Opencode斜杠命令支持

### 补丁变更

- 添加文档改进，包括归档命令模板的--yes标志和Discord徽章
- 修复markdown解析器中的规范化行结尾，以正确处理CRLF文件

## 0.3.0

### 次要变更

- 使用扩展模式、多工具选择和交互式`AGENTS.md`配置器增强`openspec init`。

## 0.2.0

### 次要变更

- ce5cead: - 添加一个`openspec view`仪表板，一目了然地汇总规范计数和变更进度
  - 生成并更新AI斜杠命令以及重命名的`openspec/AGENTS.md`指令文件
  - 移除已弃用的`openspec diff`命令并引导用户到`openspec show`

## 0.1.0

### 次要变更

- 24b4866: 初始版本