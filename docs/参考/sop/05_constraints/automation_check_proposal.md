---
version: v2.9.0
updated: 2026-02-23
---

# SOP 自动化检查方案

---

## 目的

本方案定义 SOP 自动化检查的技术需求与实施路径，减少人工审查成本，提高审查效率。

---

## 背景

当前 SOP 审查完全依赖人工执行，存在以下问题：
1. **效率低**：每次审查需要人工扫描 70+ 文件
2. **易遗漏**：人工检查容易遗漏状态/命令/约束引用
3. **成本高**：每次全面审查需要数小时
4. **不持续**：缺乏持续监控机制，问题积累后才发现

---

## 自动化检查目标

| 目标 | 当前状态 | 目标状态 |
|------|----------|----------|
| 版本一致性 | 人工核对 | 自动检测并报告 |
| SSOT 漂移 | 人工扫描 | 自动扫描并标记 |
| 链接可达性 | 人工验证 | 自动验证并修复 |
| 表达规范 | 人工检查 | 自动检测含混词 |

---

## 技术方案

### 方案 A：脚本检查（推荐）

**适用场景**：快速实施，低技术门槛

#### 实施路径

```
步骤1: 选择脚本语言
  → 推荐：Python（跨平台、生态丰富）

步骤2: 实现检查模块
  → 版本一致性检查模块
  → SSOT 漂移检测模块
  → 链接可达性检查模块
  → 表达规范检查模块

步骤3: 集成到工作流
  → 创建检查脚本（check_sop.py）
  → 输出检查报告（Markdown 格式）

步骤4: 定期执行
  → 版本更新前执行
  → CI/CD 集成（可选）
```

#### 检查模块设计

**版本一致性模块**：
```python
def check_version_consistency():
    """检查所有文件版本号是否与 CHANGELOG 一致"""
    changelog_version = parse_changelog_version()
    files = list_all_sop_files()
    inconsistent = []
    for file in files:
        version = parse_file_version(file)
        if not version_match(changelog_version, version):
            inconsistent.append((file, version))
    return inconsistent
```

**SSOT 漂移检测模块**：
```python
def check_ssot_drift():
    """检测状态/命令/约束引用漂移"""
    states = load_state_dictionary()
    commands = load_command_dictionary()
    constraints = load_constraint_matrix()
    
    drift_issues = []
    for file in scan_sop_files():
        state_refs = extract_state_references(file)
        cmd_refs = extract_command_references(file)
        constraint_refs = extract_constraint_references(file)
        
        for ref in state_refs:
            if ref not in states:
                drift_issues.append((file, 'state', ref))
        for ref in cmd_refs:
            if ref not in commands:
                drift_issues.append((file, 'command', ref))
        for ref in constraint_refs:
            if ref not in constraints:
                drift_issues.append((file, 'constraint', ref))
    
    return drift_issues
```

**链接可达性检查模块**：
```python
def check_link_reachability():
    """验证所有链接目标存在"""
    links = extract_all_links()
    broken = []
    for (source, target) in links:
        if not file_exists(target):
            broken.append((source, target))
    return broken
```

**表达规范检查模块**：
```python
def check_expression_style():
    """检测含混词使用"""
    vague_words = ['建议', '尽量', '可能', '一般', '视情况', '差不多']
    issues = []
    for file in scan_sop_files():
        content = read_file(file)
        for word in vague_words:
            if word in content:
                issues.append((file, word, line_number))
    return issues
```

#### 输出格式

```markdown
# SOP 自动化检查报告

## 检查时间
- 执行时间: YYYY-MM-DD HH:MM:SS
- 检查人: [AI Agent / 自动化脚本]

## 版本一致性检查

| 文件 | 当前版本 | 目标版本 | 状态 |
|------|----------|----------|------|
| [path] | vX.Y.Z | vX.Y.Z | ✅/❌ |

## SSOT 漂移检测

| 文件 | 引用类型 | 引用内容 | 状态 |
|------|----------|----------|------|
| [path] | state/command/constraint | [ref] | ✅/❌ |

## 链接可达性检查

| 来源文件 | 链接文本 | 目标 | 状态 |
|------|----------|------|------|
| [path] | [text] | [target] | ✅/❌ |

## 表达规范检查

| 文件 | 含混词 | 行号 | 状态 |
|------|--------|------|------|
| [path] | [word] | N | ✅/❌ |

## 统计
- 检查文件数: N
- 版本不一致数: N
- SSOT 漂移数: N
- 失效链接数: N
- 表达规范问题数: N

## 结论
- [ ] 全部通过
- [ ] 存在问题，需人工审查
```

---

### 方案 B：CI/CD 集成

**适用场景**：持续监控，高技术门槛

#### 实施路径

```
步骤1: 选择 CI 平台
  → GitHub Actions（推荐）
  → GitLab CI
  → Jenkins

步骤2: 创建检查工作流
  → .github/workflows/sop-check.yml
  → 定义触发条件（push/PR/定时）

步骤3: 配置检查步骤
  → 拉取代码
  → 安装依赖
  → 执行检查脚本
  → 上传报告

步骤4: 设置通知
  → 失败时通知维护者
  → 生成检查结果链接
```

#### GitHub Actions 示例

```yaml
name: SOP Consistency Check

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0'  # 每周日执行

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install -r scripts/requirements.txt
      
      - name: Run SOP checks
        run: |
          python scripts/check_sop.py --output reports/check-result.md
      
      - name: Upload report
        uses: actions/upload-artifact@v3
        with:
          name: sop-check-report
          path: reports/
      
      - name: Comment on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('reports/check-result.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: report
            });
```

---

## 实施优先级

| 阶段 | 任务 | 优先级 | 预期工作量 |
|------|------|--------|----------|
| 阶段 1 | 脚本基础框架 | P0 | 1-2 天 |
| 阶段 2 | 版本一致性检查 | P0 | 1 天 |
| 阶段 3 | SSOT 漂移检测 | P1 | 2-3 天 |
| 阶段 4 | 链接可达性检查 | P1 | 1 天 |
| 阶段 5 | 表达规范检查 | P2 | 1 天 |
| 阶段 6 | CI/CD 集成 | P3 | 2-3 天 |

**总工作量估计**: 8-12 天

---

## 成本效益分析

### 成本

| 项目 | 工作量 | 备注 |
|------|--------|------|
| 脚本开发 | 8-12 天 | 一次性投入 |
| 维护成本 | 0.5 天/月 | 适配新检查项 |
| 学习成本 | 1 天 | 团队培训 |

### 收益

| 项目 | 当前成本 | 自动化后 | 节省 |
|------|----------|------------|------|
| 全面审查 | 4 小时/次 | 5 分钟/次 | 95% |
| 版本核对 | 1 小时/次 | 1 分钟/次 | 98% |
| SSOT 漂移检测 | 2 小时/次 | 2 分钟/次 | 97% |
| 链接检查 | 1 小时/次 | 1 分钟/次 | 98% |

**年化节省**: 约 50-60 小时

---

## 风险与缓解

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 误报 | 浪费时间 | 设置阈值，人工复核 |
| 漏报 | 问题未发现 | 定期人工抽查 |
| 维护成本 | 长期投入 | 建立维护流程 |
| 技术门槛 | 实施困难 | 提供详细文档和示例 |

---

## 实施建议

### 短期（1-2 个月）

1. **实施方案 A**：开发基础检查脚本
2. **验证效果**：在现有 SOP 上测试
3. **收集反馈**：优化检查逻辑

### 中期（3-6 个月）

1. **扩展检查项**：增加更多检查维度
2. **CI/CD 集成**：实现持续监控
3. **建立流程**：定义检查结果处理流程

### 长期（6+ 个月）

1. **持续优化**：根据使用反馈改进
2. **社区贡献**：开源检查脚本
3. **生态建设**：建立 SOP 检查工具生态

---

## 相关文档

- [版本同步检查清单](../05_constraints/version_sync_checklist.md) - 版本同步流程
- [SSOT 漂移检测报告](../04_reference/interaction_formats/ssot_drift_detection_report.md) - 漂移检测模板
- [审查指南](../sop_GUIDE.md) - 完整审查流程
