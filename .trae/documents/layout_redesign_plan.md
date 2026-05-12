# 网站布局重构计划

## 需求分析

用户希望重新设计网站布局，解决当前颜色和文本混在一起的问题，采用三栏布局：

1. **左侧侧边栏（窄）**：用于切换 Color 和 Typography 的编辑模式
2. **中间区域**：对应的编辑面板（颜色配置或排版配置）
3. **右侧区域（较宽）**：预览面板

## 当前结构分析

当前布局是两栏结构：
- 左侧 4 列：ConfigPanel（包含 Color 和 Typography）+ ExportPanel
- 右侧 8 列：PreviewPanel

## 重构方案

### 1. 创建新的侧边栏组件

新建 `/workspace/src/components/layout/Sidebar.tsx`，包含：
- Color 图标按钮（Palette）
- Typography 图标按钮（Type）
- 导出按钮（可选）

### 2. 修改 AppShell 布局

更新 `/workspace/src/components/layout/AppShell.tsx`：
- 三栏布局：side(2) | config(4) | preview(6)

### 3. 修改 ConfigPanel

更新 `/workspace/src/components/config/ConfigPanel.tsx`：
- 根据当前选中的编辑模式显示对应的面板内容

### 4. 状态管理

使用 Zustand store 管理当前编辑模式（color/typography）

## 文件修改清单

| 文件路径 | 修改类型 | 说明 |
|---------|---------|------|
| `/workspace/src/components/layout/Sidebar.tsx` | 新建 | 侧边栏导航组件 |
| `/workspace/src/components/layout/AppShell.tsx` | 修改 | 重构为三栏布局 |
| `/workspace/src/components/config/ConfigPanel.tsx` | 修改 | 支持切换编辑模式 |
| `/workspace/src/stores/tokenStore.ts` | 修改 | 添加编辑模式状态 |

## 布局比例

```
┌─────────────────────────────────────────────────────────────────┐
│  Header                                                        │
├──────┬────────────────────────┬─────────────────────────────────┤
│ Side │      Config Panel      │           Preview               │
│ Bar  │    (Color/Typography)  │         Panel (6 cols)          │
│ (2)  │        (4 cols)        │                                 │
└──────┴────────────────────────┴─────────────────────────────────┘
```

## 风险评估

- 低风险：布局重构不影响核心功能逻辑
- 需要确保导出功能仍然可访问（可以放在侧边栏或头部）

## 实施步骤

1. 添加编辑模式状态到 store
2. 创建 Sidebar 组件
3. 修改 AppShell 布局
4. 更新 ConfigPanel 组件
5. 测试布局切换和响应式效果
