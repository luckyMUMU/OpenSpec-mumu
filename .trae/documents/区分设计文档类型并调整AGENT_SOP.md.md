1. **角色调整**：新增 Prometheus 角色专门负责架构设计文档（基于 document\_llm\_GUIDE.md 标准），Oracle 角色专注于实现设计文档（design.md），Worker 角色不再负责文档编写
2. **文档类型区分**：

   * **架构设计文档**（Prometheus）：抽象设计、伪代码、接口规范

   * **实现设计文档**（Oracle）：具体实现方案、任务分解、技术决策
3. **工作流更新**：

   * Prometheus 先完成架构设计

   * Oracle 基于架构设计编写实现方案

   * Worker 仅负责代码实现
4. **权限调整**：

   * Prometheus：架构文档读写权限

   * Oracle：实现文档读写权限

   * Worker：仅代码读写权限

