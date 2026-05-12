# Tokens Studio Assistant 设计方案

## 一、产品概述

**项目名称**: Tokens Studio Assistant
**项目类型**: Web 设计系统工具
**核心功能**: 输入主题色自动生成符合 Figma Tokens Studio 规范的完整设计令牌系统
**目标用户**: UI/UX 设计师、设计系统工程师、前端开发者

---

## 二、核心功能模块

### 2.1 功能架构

| 模块 | 功能描述 |
|------|----------|
| **配置区** | 颜色选择器、色阶数量滑块、字体配置 |
| **预览区** | 实时色板、排版样式列表、Input 组件沙盒、深浅模式切换 |
| **导出区** | 一键导出完整 JSON 文件 |

### 2.2 三层 Token 架构

```
┌─────────────────────────────────────────────────────────────────┐
│                        Component Set                             │
│  ┌──────────────────┐  ┌──────────────────┐                     │
│  │   Input Tokens   │  │  Button Tokens   │                     │
│  └────────┬─────────┘  └────────┬─────────┘                     │
└───────────│──────────────────────│────────────────────────────────┘
            │ 引用                  │ 引用
┌───────────▼──────────────────────▼────────────────────────────────┐
│                      Semantic Sets                                 │
│  ┌────────────────────────┐  ┌────────────────────────┐           │
│  │   Light Mode Tokens   │  │   Dark Mode Tokens     │           │
│  │   background.primary   │  │   background.primary   │           │
│  │   text.primary         │  │   text.primary         │           │
│  │   border.default       │  │   border.default       │           │
│  └───────────┬────────────┘  └───────────┬────────────┘           │
└──────────────│───────────────────────────│────────────────────────┘
               │ 引用                       │ 引用
┌──────────────▼───────────────────────────▼────────────────────────┐
│                         Global Set                                 │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Color Primitives    │  Typography    │  Spacing    │ ...  │  │
│  │  brand.50 ~ brand.900 │  fontSize.*    │  space.*    │      │  │
│  │  neutral.50 ~ neutral │  fontWeight.*  │             │      │  │
│  │  success.50 ~ error   │  lineHeight.* │             │      │  │
│  └─────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

---

## 三、JSON 引用结构设计（符合 Tokens Studio 规范）

### 3.1 完整 JSON 输出结构

```json
{
  "global": {
    "color": {
      "brand": {
        "50": { "value": "#fef7ed", "type": "color" },
        "100": { "value": "#fdecd7", "type": "color" },
        "200": { "value": "#fad5a6", "type": "color" },
        "300": { "value": "#f7b86e", "type": "color" },
        "400": { "value": "#f3903f", "type": "color" },
        "500": { "value": "{color.brand.600}", "type": "color" },
        "600": { "value": "#ed6812", "type": "color" },
        "700": { "value": "#c4530d", "type": "color" },
        "800": { "value": "#9a410d", "type": "color" },
        "900": { "value": "#7a380d", "type": "color" }
      },
      "neutral": {
        "50": { "value": "#fafafa", "type": "color" },
        "100": { "value": "#f4f4f5", "type": "color" },
        "200": { "value": "#e4e4e7", "type": "color" },
        "300": { "value": "#d4d4d8", "type": "color" },
        "400": { "value": "#a1a1aa", "type": "color" },
        "500": { "value": "#71717a", "type": "color" },
        "600": { "value": "#52525b", "type": "color" },
        "700": { "value": "#3f3f46", "type": "color" },
        "800": { "value": "#27272a", "type": "color" },
        "900": { "value": "#18181b", "type": "color" }
      },
      "success": { "50": { "value": "#f0fdf4", "type": "color" }, ... },
      "warning": { "50": { "value": "#fffbeb", "type": "color" }, ... },
      "error": { "50": { "value": "#fef2f2", "type": "color" }, ... }
    },
    "typography": {
      "fontSize": {
        "xs": { "value": "12px", "type": "dimension" },
        "sm": { "value": "14px", "type": "dimension" },
        "base": { "value": "16px", "type": "dimension" },
        "lg": { "value": "18px", "type": "dimension" },
        "xl": { "value": "20px", "type": "dimension" },
        "2xl": { "value": "24px", "type": "dimension" },
        "3xl": { "value": "30px", "type": "dimension" }
      },
      "fontWeight": {
        "normal": { "value": "400", "type": "fontWeight" },
        "medium": { "value": "500", "type": "fontWeight" },
        "semibold": { "value": "600", "type": "fontWeight" },
        "bold": { "value": "700", "type": "fontWeight" }
      },
      "lineHeight": {
        "tight": { "value": "1.25", "type": "number" },
        "normal": { "value": "1.5", "type": "number" },
        "relaxed": { "value": "1.75", "type": "number" }
      }
    },
    "spacing": {
      "xs": { "value": "4px", "type": "dimension" },
      "sm": { "value": "8px", "type": "dimension" },
      "md": { "value": "16px", "type": "dimension" },
      "lg": { "value": "24px", "type": "dimension" },
      "xl": { "value": "32px", "type": "dimension" },
      "2xl": { "value": "48px", "type": "dimension" }
    },
    "radius": {
      "sm": { "value": "4px", "type": "dimension" },
      "md": { "value": "8px", "type": "dimension" },
      "lg": { "value": "12px", "type": "dimension" },
      "full": { "value": "9999px", "type": "dimension" }
    }
  },
  "semantic": {
    "light": {
      "background": {
        "primary": { "value": "{global.color.neutral.50}", "type": "color" },
        "secondary": { "value": "{global.color.neutral.100}", "type": "color" },
        "tertiary": { "value": "{global.color.neutral.200}", "type": "color" }
      },
      "foreground": {
        "primary": { "value": "{global.color.neutral.900}", "type": "color" },
        "secondary": { "value": "{global.color.neutral.600}", "type": "color" },
        "muted": { "value": "{global.color.neutral.500}", "type": "color" }
      },
      "border": {
        "default": { "value": "{global.color.neutral.200}", "type": "color" },
        "hover": { "value": "{global.color.neutral.300}", "type": "color" },
        "focus": { "value": "{global.color.brand.500}", "type": "color" }
      },
      "accent": {
        "default": { "value": "{global.color.brand.500}", "type": "color" },
        "hover": { "value": "{global.color.brand.600}", "type": "color" },
        "foreground": { "value": "#ffffff", "type": "color" }
      },
      "status": {
        "success": { "value": "{global.color.success.500}", "type": "color" },
        "warning": { "value": "{global.color.warning.500}", "type": "color" },
        "error": { "value": "{global.color.error.500}", "type": "color" }
      }
    },
    "dark": {
      "background": {
        "primary": { "value": "{global.color.neutral.900}", "type": "color" },
        "secondary": { "value": "{global.color.neutral.800}", "type": "color" },
        "tertiary": { "value": "{global.color.neutral.700}", "type": "color" }
      },
      "foreground": {
        "primary": { "value": "{global.color.neutral.50}", "type": "color" },
        "secondary": { "value": "{global.color.neutral.400}", "type": "color" },
        "muted": { "value": "{global.color.neutral.500}", "type": "color" }
      },
      "border": {
        "default": { "value": "{global.color.neutral.700}", "type": "color" },
        "hover": { "value": "{global.color.neutral.600}", "type": "color" },
        "focus": { "value": "{global.color.brand.400}", "type": "color" }
      },
      "accent": {
        "default": { "value": "{global.color.brand.400}", "type": "color" },
        "hover": { "value": "{global.color.brand.300}", "type": "color" },
        "foreground": { "value": "{global.color.neutral.900}", "type": "color" }
      },
      "status": {
        "success": { "value": "{global.color.success.400}", "type": "color" },
        "warning": { "value": "{global.color.warning.400}", "type": "color" },
        "error": { "value": "{global.color.error.400}", "type": "color" }
      }
    }
  },
  "components": {
    "input": {
      "background": { "value": "{semantic.background.primary}", "type": "color" },
      "border": { "value": "{semantic.border.default}", "type": "color" },
      "borderHover": { "value": "{semantic.border.hover}", "type": "color" },
      "borderFocus": { "value": "{semantic.border.focus}", "type": "color" },
      "placeholder": { "value": "{semantic.foreground.muted}", "type": "color" },
      "foreground": { "value": "{semantic.foreground.primary}", "type": "color" },
      "radius": { "value": "{global.radius.md}", "type": "borderRadius" },
      "paddingX": { "value": "{global.spacing.md}", "type": "spacing" },
      "paddingY": { "value": "{global.spacing.sm}", "type": "spacing" },
      "fontSize": { "value": "{global.typography.fontSize.base}", "type": "fontSize" }
    },
    "button": {
      "primary": {
        "background": { "value": "{semantic.accent.default}", "type": "color" },
        "backgroundHover": { "value": "{semantic.accent.hover}", "type": "color" },
        "foreground": { "value": "{semantic.accent.foreground}", "type": "color" },
        "borderRadius": { "value": "{global.radius.md}", "type": "borderRadius" },
        "paddingX": { "value": "{global.spacing.lg}", "type": "spacing" },
        "paddingY": { "value": "{global.spacing.sm}", "type": "spacing" },
        "fontSize": { "value": "{global.typography.fontSize.base}", "type": "fontSize" },
        "fontWeight": { "value": "{global.typography.fontWeight.medium}", "type": "fontWeight" }
      },
      "secondary": {
        "background": { "value": "{semantic.background.secondary}", "type": "color" },
        "backgroundHover": { "value": "{semantic.background.tertiary}", "type": "color" },
        "foreground": { "value": "{semantic.foreground.primary}", "type": "color" },
        "borderRadius": { "value": "{global.radius.md}", "type": "borderRadius" },
        "paddingX": { "value": "{global.spacing.lg}", "type": "spacing" },
        "paddingY": { "value": "{global.spacing.sm}", "type": "spacing" },
        "fontSize": { "value": "{global.typography.fontSize.base}", "type": "fontSize" },
        "fontWeight": { "value": "{global.typography.fontWeight.medium}", "type": "fontWeight" }
      },
      "ghost": {
        "background": { "value": "transparent", "type": "color" },
        "backgroundHover": { "value": "{semantic.background.secondary}", "type": "color" },
        "foreground": { "value": "{semantic.foreground.primary}", "type": "color" },
        "borderRadius": { "value": "{global.radius.md}", "type": "borderRadius" },
        "paddingX": { "value": "{global.spacing.lg}", "type": "spacing" },
        "paddingY": { "value": "{global.spacing.sm}", "type": "spacing" },
        "fontSize": { "value": "{global.typography.fontSize.base}", "type": "fontSize" },
        "fontWeight": { "value": "{global.typography.fontWeight.medium}", "type": "fontWeight" }
      }
    }
  }
}
```

### 3.2 Token 引用语法规则

| 语法格式 | 示例 | 说明 |
|---------|------|------|
| **绝对引用** | `{ "value": "#ff0000", "type": "color" }` | 直接使用颜色值 |
| **相对引用** | `{ "value": "{global.color.brand.500}", "type": "color" }` | 引用其他 Token |
| **复合引用** | `{ "value": "{semantic.background.primary}", "type": "color" }` | 语义层引用 |

### 3.3 Type 类型定义

| Type 值 | 用途 | 示例 |
|---------|------|------|
| `color` | 颜色值 | `#ffffff`, `{global.color.brand.500}` |
| `dimension` | 尺寸/间距 | `16px`, `1rem` |
| `fontWeight` | 字重 | `400`, `600` |
| `fontSize` | 字号 | `16px` |
| `borderRadius` | 圆角 | `8px` |
| `spacing` | 间距 | `16px` |
| `number` | 纯数字 | `1.5` (用于 lineHeight 等) |

---

## 四、OKLCH 颜色算法设计

### 4.1 算法原理

使用 OKLCH (OKLAB Lightness-Chroma-Hue) 色彩空间生成感知均匀的色阶：

- **L (Lightness)**: 感知亮度，范围 0-1
- **C (Chroma)**: 色度/饱和度
- **H (Hue)**: 色相角度，范围 0-360

### 4.2 色阶生成策略

```
输入主题色 → 转换为 OKLCH → 提取 H、C 值
                                    ↓
生成 0-9 级色阶 (共 10 级):
  50  (L ≈ 0.97) - 最浅
  100 (L ≈ 0.93)
  200 (L ≈ 0.86)
  300 (L ≈ 0.76)
  400 (L ≈ 0.65) - 接近输入色的亮度
  500 (L ≈ 0.54)
  600 (L ≈ 0.44)
  700 (L ≈ 0.35)
  800 (L ≈ 0.26)
  900 (L ≈ 0.18) - 最深
```

### 4.3 各语义色的生成规则

| 语义色 | Hue 偏移 | 策略说明 |
|--------|---------|----------|
| **Brand** | 0° | 直接使用输入主题色的 H、C 值 |
| **Neutral** | 用户配置 | 基于输入色相，可调整为灰色倾向 |
| **Success** | +120° | HSL 60° → OKLCH，保持相似的 C 值 |
| **Warning** | +60° | HSL 45° → OKLCH，暖黄色调 |
| **Error** | +30° | HSL 0° → OKLCH，红色调 |

### 4.4 感知一致性保证

使用 OKLCH 而非传统 HSL 的原因：
1. **感知均匀性**: OKLCH 的亮度变化在人眼看来是均匀的
2. **色相恒定**: 同一色相在不同亮度下保持色相一致
3. **跨设备一致**: OKLCH 在不同显示器上表现更一致

---

## 五、React 组件架构设计

### 5.1 整体项目结构

```
src/
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx           # 主布局容器
│   │   ├── Header.tsx             # 顶部导航栏
│   │   └── Panel.tsx              # 可折叠面板
│   │
│   ├── config/
│   │   ├── ConfigPanel.tsx        # 配置面板容器
│   │   ├── ColorPicker.tsx        # 颜色选择器
│   │   ├── ScaleSlider.tsx        # 色阶数量滑块
│   │   └── FontConfig.tsx         # 字体配置组件
│   │
│   ├── preview/
│   │   ├── PreviewPanel.tsx       # 预览面板容器
│   │   ├── ColorPalette.tsx       # 色板预览组件
│   │   ├── ColorSwatch.tsx        # 单个色块组件
│   │   ├── TypographyList.tsx      # 排版样式列表
│   │   ├── ThemeToggle.tsx         # 深浅模式切换
│   │   └── ComponentSandbox.tsx   # 组件沙盒容器
│   │
│   ├── sandbox/
│   │   ├── InputDemo.tsx          # Input 组件演示
│   │   ├── ButtonDemo.tsx         # Button 组件演示
│   │   └── SandboxControls.tsx    # 沙盒控制选项
│   │
│   └── export/
│       ├── ExportPanel.tsx        # 导出面板容器
│       ├── JsonPreview.tsx        # JSON 预览组件
│       └── ExportButton.tsx       # 导出按钮
│
├── hooks/
│   ├── useTokenGenerator.ts      # Token 生成逻辑
│   ├── useColorConversion.ts      # 颜色转换（HEX ↔ OKLCH）
│   ├── useColorScale.ts           # 色阶生成算法
│   ├── useThemeMode.ts            # 主题模式状态
│   └── useExport.ts               # 导出功能
│
├── stores/
│   └── tokenStore.ts              # Zustand 状态管理
│
├── utils/
│   ├── color/
│   │   ├── oklch.ts               # OKLCH 颜色工具函数
│   │   ├── hex.ts                 # HEX 颜色工具函数
│   │   └── tokens.ts              # Token 结构化工具
│   ├── export/
│   │   └── generateJson.ts         # JSON 生成器
│   └── download.ts                # 文件下载工具
│
├── types/
│   └── tokens.ts                  # TypeScript 类型定义
│
├── App.tsx                        # 根组件
└── main.tsx                       # 入口文件
```

### 5.2 组件层次结构图

```
App
└── AppShell
    ├── Header
    │   └── ThemeToggle
    │
    ├── ConfigPanel (可折叠)
    │   ├── ColorPicker
    │   │   └── ColorInput (HEX 输入)
    │   ├── ScaleSlider
    │   └── FontConfig
    │
    ├── PreviewPanel
    │   ├── ThemeToggle (深浅切换)
    │   │
    │   ├── ColorPalette
    │   │   └── ColorSwatch × N (每个语义色)
    │   │
    │   ├── TypographyList
    │   │   └── TypographyItem × N
    │   │
    │   └── ComponentSandbox
    │       ├── SandboxControls
    │       ├── InputDemo
    │       │   ├── Input (原生)
    │       │   └── Input (聚焦态)
    │       │   └── Input (禁用态)
    │       │
    │       └── ButtonDemo
    │           ├── Button (Primary)
    │           ├── Button (Secondary)
    │           └── Button (Ghost)
    │
    └── ExportPanel
        ├── JsonPreview
        └── ExportButton
```

### 5.3 核心组件职责

| 组件 | 职责 | 状态依赖 |
|------|------|----------|
| **AppShell** | 整体布局，协调各面板 | - |
| **ConfigPanel** | 收集用户配置输入 | `themeColor`, `scaleCount`, `fontConfig` |
| **PreviewPanel** | 实时预览 Token 效果 | `tokens`, `mode: 'light'/'dark'` |
| **ComponentSandbox** | 交互式组件演示 | `tokens`, `mode` |
| **ExportPanel** | JSON 预览和导出 | `tokens` |

### 5.4 数据流向图

```
┌──────────────┐
│  用户输入     │
│  • 主题色     │
│  • 色阶数量   │
│  • 字体配置   │
└──────┬───────┘
       │ 配置更新
       ▼
┌──────────────────────────────────────────┐
│           TokenStore (Zustand)            │
│  • themeColor: string                     │
│  • scaleCount: number                     │
│  • fontConfig: FontConfig                 │
│  • tokens: GeneratedTokens                │
│  • mode: 'light' | 'dark'                 │
└──────────────────┬─────────────────────────┘
                 │ tokens 计算
                 ▼
┌──────────────────────────────────────────┐
│           TokenGenerator (Hook)           │
│  输入: themeColor, scaleCount, fontConfig │
│  输出: { global, semantic, components }  │
└──────────────────┬─────────────────────────┘
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Preview  │ │ Sandbox  │ │ Export   │
│  Panel   │ │          │ │  Panel   │
└──────────┘ └──────────┘ └──────────┘
```

---

## 六、技术栈选型

| 技术 | 选择 | 理由 |
|------|------|------|
| **框架** | React 18 + TypeScript | 组件化、类型安全 |
| **构建** | Vite | 快速热更新 |
| **样式** | Tailwind CSS | 原子化 CSS，方便主题切换 |
| **状态** | Zustand | 轻量级状态管理 |
| **颜色库** | culori | 专业颜色转换，支持 OKLCH |
| **图标** | Lucide React | 统一图标风格 |
| **UI组件** | Radix UI (可选) | 无障碍支持 |

---

## 七、设计风格定位

### 7.1 美学方向

**风格**: 极简工具美学 + 几何精确感
- 深色背景突出色板预览效果
- 精确的网格系统
- 清晰的层次对比
- 微妙的玻璃态效果

### 7.2 配色方案（工具本身）

| 用途 | 颜色 |
|------|------|
| 背景 (深色) | `#09090b` (zinc-950) |
| 表面 | `#18181b` (zinc-900) |
| 边框 | `#27272a` (zinc-800) |
| 文字主色 | `#fafafa` (zinc-50) |
| 文字次要 | `#a1a1aa` (zinc-400) |
| 强调色 | `#3b82f6` (blue-500) |

### 7.3 字体选择

- **标题**: JetBrains Mono (等宽，代码感)
- **正文**: IBM Plex Sans (现代、清晰)
- **预览字体**: 用户配置的字体

---

## 八、实现计划

### 阶段 1: 基础架构
1. 初始化 React + Vite + Tailwind 项目
2. 配置 Zustand 状态管理
3. 创建基础布局组件
4. 实现 OKLCH 颜色转换工具

### 阶段 2: 配置功能
1. 颜色选择器组件
2. 色阶滑块组件
3. 字体配置组件
4. Token 生成逻辑

### 阶段 3: 预览功能
1. 色板预览组件
2. 排版预览组件
3. 深浅模式切换
4. Input 组件沙盒

### 阶段 4: 导出功能
1. JSON 预览组件
2. 文件下载功能
3. 复制到剪贴板

### 阶段 5: 完善与优化
1. 添加动画效果
2. 响应式适配
3. 错误处理
4. 性能优化

---

## 九、验证标准

1. ✅ 输入主题色后，0-9 级色阶实时生成
2. ✅ Global Set 包含原子数值（色阶、字号、字重）
3. ✅ Semantic Sets (Light & Dark) 正确引用 Global
4. ✅ Component Set (Input, Button) 正确引用 Semantic
5. ✅ 深浅模式切换正常工作
6. ✅ 导出的 JSON 符合 Tokens Studio 规范
7. ✅ JSON 引用使用 `{path.to.token}` 语法
8. ✅ 组件沙盒实时渲染 Token 效果
