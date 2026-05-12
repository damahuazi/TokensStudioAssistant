# Tokens Studio Assistant

一个用于自动化生成设计系统的 Web 工具，严格遵循 Figma Tokens Studio 插件规范。

## 功能特性

### 🎨 核心功能

- **OKLCH 颜色算法**：使用 OKLCH 颜色空间自动生成感知亮度一致的色阶
- **三层 Tokens 架构**：
  - **Global Set**：原子数值（颜色、字体、间距、圆角等）
  - **Semantic Sets**：Light/Dark 主题语义化配置
  - **Component Set**：组件级别 tokens
- **实时预览**：支持深浅主题切换，所有元素实时响应

### 🎯 语义色彩

完整的语义色彩系统，包括：
- **Brand**：品牌主色，基于用户输入的主题色生成
- **Neutral**：中性色，用于背景和文本
- **Success**：成功状态色（绿色）
- **Warning**：警告状态色（橙色）
- **Error**：错误状态色（红色）
- **Info**：信息状态色（蓝色）

### 📝 Typography System

独立的排版系统，支持：
- **Display**：展示文本（大标题）
- **Heading**：标题文本（H1-H4）
- **Body**：正文文本
- **Label**：标签文本

### 🧩 组件沙箱

实时预览组件在实际场景中的表现：
- 按钮（Primary、Secondary、Ghost）
- 输入框（默认、带有标签、带有辅助文本）
- 支持禁用状态展示

### 📐 布局特性

- **三栏布局**：侧边栏（可折叠）+ 配置面板 + 预览区域
- **可调节分割器**：JSON 预览面板可拖动调整高度
- **响应式设计**：适配不同屏幕尺寸
- **主题色适配**：所有 UI 元素与用户设置的主题色保持一致

## 技术栈

- **React 18**：现代化的 UI 框架
- **TypeScript**：类型安全
- **Vite**：快速的开发服务器和构建工具
- **Tailwind CSS**：原子化 CSS 框架
- **Zustand**：轻量级状态管理
- **OKLCH**：现代颜色空间算法

## 项目结构

```
src/
├── components/
│   ├── config/          # 配置面板组件
│   │   ├── ColorPicker.tsx
│   │   ├── ConfigPanel.tsx
│   │   └── FontConfig.tsx
│   ├── export/           # 导出相关组件
│   │   └── JsonPreview.tsx
│   ├── layout/           # 布局组件
│   │   ├── AppShell.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── SplitPanel.tsx
│   ├── preview/          # 预览组件
│   │   ├── ColorPalette.tsx
│   │   ├── ColorSwatch.tsx
│   │   ├── ThemePreview.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── TypographyList.tsx
│   │   └── PreviewPanel.tsx
│   └── sandbox/          # 组件沙箱
│       ├── ButtonDemo.tsx
│       ├── ComponentSandbox.tsx
│       └── InputDemo.tsx
├── stores/
│   └── tokenStore.ts     # 全局状态管理
├── types/
│   └── tokens.ts        # 类型定义
└── utils/
    └── color/           # 颜色工具
        ├── oklch.ts     # OKLCH 颜色算法
        └── tokens.ts    # Tokens 生成逻辑
```

## Tokens 格式

导出的 JSON 遵循 Tokens Studio 规范：

```json
{
  "global": {
    "color": {
      "brand": {
        "50": { "value": "#f0f5ff", "type": "color" },
        "100": { "value": "#e0edff", "type": "color" },
        ...
        "900": { "value": "#1a3a8c", "type": "color" }
      },
      "neutral": { ... },
      "success": { ... },
      "warning": { ... },
      "error": { ... },
      "info": { ... }
    },
    "fontSize": { ... },
    "fontWeight": { ... },
    "lineHeight": { ... },
    "spacing": { ... },
    "radius": { ... }
  },
  "typography": {
    "display": { ... },
    "heading": { ... },
    "body": { ... },
    "label": { ... }
  },
  "light": {
    "surface": { ... },
    "border": { ... },
    "text": { ... },
    "status": { ... }
  },
  "dark": {
    "surface": { ... },
    "border": { ... },
    "text": { ... },
    "status": { ... }
  },
  "components": {
    "input": { ... },
    "button": { ... }
  }
}
```

## 设计决策

### 为什么使用 OKLCH？

OKLCH 是一种 perceptually uniform（感知均匀）的颜色空间，相比传统的 HSL 或 RGB：
- 在视觉上相邻的颜色在数值上也相邻
- 更适合生成感知一致的颜色渐变
- 避免了 HSL 中 "blue + lightness" 导致的饱和度变化问题

### 色阶数量

固定为 10 个色阶（50-900），确保：
- 所有语义引用都能找到对应的色阶
- 避免引用不存在的颜色导致的问题
- 保持色阶的实用性和可维护性

### 三层 Tokens 架构优势

1. **Global**：原子化设计，提供最大灵活性
2. **Semantic**：语义化抽象，便于主题切换
3. **Component**：组件级别封装，支持复用

## 后续规划

- [ ] 支持自定义色阶数量（10-16）
- [ ] 导出格式选项（JSON、CSS Variables、SCSS）
- [ ] 暗色主题的智能颜色选择算法
- [ ] 预设主题模板
- [ ] 历史记录和撤销功能
