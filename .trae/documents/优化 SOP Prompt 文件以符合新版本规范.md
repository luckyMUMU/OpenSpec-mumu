## 优化目标
根据新版本的 `sop_GUIDE.md` 规范，对所有 9 个 Prompt 文件进行标准化优化。

## 具体修改内容

### 每个 Prompt 文件需要添加/完善：

1. **新增 `## 性格与语气` 章节**
   - 性格特征
   - 语气风格
   - 沟通方式

2. **新增 `## 工具偏好` 章节**
   - 首选工具类型
   - 次选工具类型
   - 避免使用工具

3. **检查并完善 `## Thinking Process`**
   - 确保步骤清晰
   - 使用英文（按现有惯例）

4. **检查并完善 `## Output`**
   - 确保输出格式规范
   - 包含明确的输出锚点

5. **调整章节顺序** 为规范顺序：
   - 职责 → 性格与语气 → Thinking Process → 工作流程 → 约束 → 工具偏好 → Output → 当前任务

## 文件清单（9个）
1. `prompts/router_prompt.md`
2. `prompts/explorer_prompt.md`
3. `prompts/analyst_prompt.md`
4. `prompts/prometheus_prompt.md`
5. `prompts/skeptic_prompt.md`
6. `prompts/oracle_prompt.md`
7. `prompts/worker_prompt.md`
8. `prompts/librarian_prompt.md`
9. `prompts/supervisor_prompt.md`

## 修改原则
- 保持现有有效内容不变
- 仅添加缺失的规范章节
- 遵循渐进式披露原则
- 使用表格提高信息密度