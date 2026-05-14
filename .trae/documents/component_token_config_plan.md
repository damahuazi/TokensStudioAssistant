# 组件 Token 配置功能规划

## 需求分析

用户希望在 Demo Tab 中实现组件 Token 配置功能：
1. 用户可以查看每种组件的每种变体的每种状态
2. 用户可以自定义配置每个状态的 token（如背景色、边框色、文字颜色等）
3. 系统提供默认配置，用户可以修改
4. 配置界面放在 Demo Tab 中

## 当前代码库分析

### 现有文件结构

| 文件路径 | 功能描述 |
|---------|---------|
| `src/components/sandbox/ComponentSandbox.tsx` | Demo Tab 主界面 |
| `src/components/sandbox/ButtonDemo.tsx` | Button 组件预览 |
| `src/components/sandbox/InputDemo.tsx` | Input 组件预览 |
| `src/stores/componentStore.ts` | 组件配置存储 |
| `src/utils/color/tokens.ts` | Token 生成逻辑 |

### 当前问题

1. 缺少属性级别的 token 配置功能
2. 配置界面在左侧面板，用户希望放在 Demo Tab
3. 没有实时预览配置效果的功能

## 实现计划

### 阶段一：扩展状态管理

**文件**：`src/stores/componentStore.ts`

1. 添加属性级别的 token 配置功能
2. 支持用户自定义每个属性的 token 值
3. 添加批量更新方法

### 阶段二：创建组件属性配置界面

**文件**：`src/components/sandbox/ComponentConfigEditor.tsx`

1. 组件选择器（选择要配置的组件）
2. 变体选择器（选择组件变体）
3. 状态选择器（选择状态）
4. 属性配置面板（配置每个属性的 token）
5. Token 下拉选择器（列出所有可用的 token）

### 阶段三：更新 ComponentSandbox

**文件**：`src/components/sandbox/ComponentSandbox.tsx`

1. 添加 "Config" Tab
2. 集成 ComponentConfigEditor 组件
3. 实现配置与预览的联动

### 阶段四：更新 Token 生成逻辑

**文件**：`src/utils/color/tokens.ts`

1. 使用用户自定义的属性配置生成 tokens
2. 保持向后兼容性

### 阶段五：更新 tokenStore

**文件**：`src/stores/tokenStore.ts`

1. 同步组件配置到 token 生成
2. 实现配置变更时自动刷新 tokens

## 数据结构设计

```typescript
interface PropertyValue {
  key: string;
  token: string;
}

interface StateConfig {
  key: string;
  label: string;
  properties: PropertyValue[];
}

interface VariantConfig {
  key: string;
  label: string;
  enabled: boolean;
  states: StateConfig[];
}

interface ComponentConfig {
  key: string;
  label: string;
  enabled: boolean;
  properties: ComponentProperty[];
  variants: VariantConfig[];
}
```

## 界面设计

### 配置面板布局

```
┌─────────────────────────────────────────────────────────────┐
│  Component: [Button ▼]  Variant: [Primary ▼]  State: [Default ▼]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┬─────────────────────────────────────┐  │
│  │ Property        │ Token                               │  │
│  ├─────────────────┼─────────────────────────────────────┤  │
│  │ Background      │ [ {surface.default} ▼ ]             │  │
│  │ Foreground      │ [ {text.primary} ▼ ]                │  │
│  │ Border Radius   │ [ {global.radius.md} ▼ ]            │  │
│  │ Padding X       │ [ {global.spacing.lg} ▼ ]           │  │
│  │ Padding Y       │ [ {global.spacing.sm} ▼ ]           │  │
│  │ Font Size       │ [ {global.fontSize.16} ▼ ]          │  │
│  │ Font Weight     │ [ {global.fontWeight.medium} ▼ ]    │  │
│  └─────────────────┴─────────────────────────────────────┘  │
│                                                             │
│  [ Reset to Default ]  [ Apply Changes ]                    │
└─────────────────────────────────────────────────────────────┘
```

## 风险与注意事项

1. **性能考虑**：频繁配置变更可能影响性能。解决方案：使用防抖延迟更新 tokens。

2. **Token 引用验证**：用户可能配置无效的 token 引用。解决方案：添加验证逻辑，标记无效引用。

3. **复杂度过高**：过多的配置选项可能让用户困惑。解决方案：分步骤展示，先选择组件/变体/状态，再配置属性。

## 预期成果

1. 用户可以在 Demo Tab 中配置组件的 token
2. 支持组件、变体、状态的三级选择
3. 每个属性可以选择预定义的 token 或输入自定义值
4. 配置变更实时反映到 JSON 预览中