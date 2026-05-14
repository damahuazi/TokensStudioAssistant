# 组件配置功能规划

## 需求分析

用户希望能够自定义导出的 JSON 中 Component set 里的组件数量和各个状态的 token 选择。具体需求包括：

1. 列出常用的原子组件（如按钮、输入框、复选框等）
2. 每种组件有不同的变体（primary、secondary、ghost 等）
3. 每种组件有不同的状态（default、hover、active、disabled 等）
4. 每个变体和状态需要配置填充颜色、边框颜色、文本颜色、间距、字体样式等
5. 用户可以自定义选择哪些组件、变体和状态

## 当前代码库分析

### 现有文件结构

| 文件路径 | 功能描述 |
|---------|---------|
| `src/utils/color/tokens.ts` | 生成 tokens JSON 的核心逻辑 |
| `src/types/tokens.ts` | 类型定义 |
| `src/stores/tokenStore.ts` | 状态管理 |
| `src/components/export/ExportPanel.tsx` | 导出面板 UI |
| `src/components/export/JsonPreview.tsx` | JSON 预览 |

### 当前组件支持

当前仅支持：
- **input** 组件：background、border、borderHover、borderFocus、placeholder、foreground
- **button** 组件：primary、secondary、ghost 三个变体

### 现有问题

1. 组件和变体数量固定，用户无法自定义
2. 缺少更多常用原子组件（checkbox、radio、switch、select 等）
3. 缺少状态管理（hover、active、disabled 等）

## 常用原子组件清单

根据设计系统最佳实践，常用原子组件包括：

### 1. 按钮 (Button)
- **变体**：primary、secondary、ghost、outline、danger、link
- **状态**：default、hover、active、disabled
- **属性**：background、foreground、borderColor、borderRadius、paddingX、paddingY、fontSize、fontWeight

### 2. 输入框 (Input)
- **变体**：default、outline、filled
- **状态**：default、hover、focus、disabled、error
- **属性**：background、border、borderHover、borderFocus、borderError、placeholder、foreground、radius、paddingX、paddingY、fontSize

### 3. 文本区域 (Textarea)
- **变体**：default、outline、filled
- **状态**：default、hover、focus、disabled、error
- **属性**：同 Input

### 4. 选择框 (Select)
- **变体**：default、outline、filled
- **状态**：default、hover、focus、disabled、open
- **属性**：同 Input + icon 相关

### 5. 复选框 (Checkbox)
- **变体**：default、checked、indeterminate
- **状态**：default、hover、active、disabled、checked-disabled
- **属性**：background、border、checkedBackground、checkedBorder、checkmarkColor、radius、size

### 6. 单选框 (Radio)
- **变体**：default、checked
- **状态**：default、hover、active、disabled、checked-disabled
- **属性**：同 Checkbox

### 7. 开关 (Switch)
- **变体**：default、checked
- **状态**：default、hover、active、disabled
- **属性**：background、thumbBackground、checkedBackground、checkedThumbBackground、borderColor、size

### 8. 标签 (Tag)
- **变体**：default、primary、success、warning、error、info
- **状态**：default、hover、close
- **属性**：background、foreground、border、radius、paddingX、paddingY、fontSize

### 9. 卡片 (Card)
- **变体**：default、elevated、outlined
- **状态**：default、hover
- **属性**：background、border、radius、padding、shadow

### 10. 徽章 (Badge)
- **变体**：default、primary、success、warning、error、info
- **状态**：default
- **属性**：background、foreground、radius、paddingX、paddingY、fontSize

### 11. 进度条 (Progress)
- **变体**：linear、circular
- **状态**：default、indeterminate
- **属性**：background、progressColor、height、radius

### 12. 滑块 (Slider)
- **变体**：default
- **状态**：default、hover、active、disabled
- **属性**：trackBackground、thumbBackground、thumbBorder、activeTrack、height、thumbSize

## 实现计划

### 阶段一：扩展类型定义

**文件**：`src/types/tokens.ts`

1. 添加组件配置类型定义
2. 添加变体和状态类型
3. 添加组件属性配置类型

### 阶段二：创建组件配置存储

**文件**：`src/stores/componentStore.ts`

1. 定义可配置的组件列表
2. 定义每个组件的可用变体和状态
3. 定义每个属性的 token 引用选项
4. 提供配置更新方法

### 阶段三：更新 Token 生成逻辑

**文件**：`src/utils/color/tokens.ts`

1. 修改 `generateTokens` 函数，支持动态组件配置
2. 根据用户配置生成相应的组件 tokens
3. 保持向后兼容性

### 阶段四：创建组件配置界面

**文件**：`src/components/config/ComponentConfig.tsx`

1. 组件列表选择器
2. 变体选择器
3. 状态选择器
4. 属性配置面板

### 阶段五：更新导出流程

**文件**：`src/components/export/ExportPanel.tsx`

1. 集成组件配置界面
2. 确保导出的 JSON 包含用户配置的组件

## 数据结构设计

```typescript
interface ComponentProperty {
  key: string;
  label: string;
  type: 'color' | 'spacing' | 'fontSize' | 'fontWeight' | 'borderRadius';
  defaultToken: string;
  availableTokens: string[];
}

interface ComponentState {
  key: string;
  label: string;
  properties: string[];
}

interface ComponentVariant {
  key: string;
  label: string;
  states: ComponentState[];
}

interface ComponentConfig {
  key: string;
  label: string;
  enabled: boolean;
  variants: ComponentVariant[];
  defaultProperties: ComponentProperty[];
}
```

## 风险与注意事项

1. **兼容性风险**：修改 tokens 结构可能影响现有用户。解决方案：保持向后兼容，提供迁移指南。

2. **复杂度增加**：过多的组件和配置选项可能让用户困惑。解决方案：提供预设配置，支持一键导入导出配置。

3. **性能考虑**：大量组件配置可能影响生成速度。解决方案：按需生成，只生成用户启用的组件。

4. **Token 引用验证**：用户可能配置无效的 token 引用。解决方案：添加验证逻辑，提示无效引用。

## 预期成果

1. 用户可以在 UI 中选择要包含的组件
2. 用户可以为每个组件选择启用的变体和状态
3. 用户可以自定义每个属性使用的 token
4. 导出的 JSON 只包含用户配置的内容
5. 支持配置的导入导出