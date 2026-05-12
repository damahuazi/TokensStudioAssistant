# 色阶数量问题修复计划

## 问题分析

当前系统存在以下问题：
1. 色阶数量可以从 5-10 动态调整
2. 但语义主题（light/dark）中的颜色引用是硬编码的，如 `{global.color.neutral.50}`, `{global.color.brand.500}`, `{global.color.neutral.900}` 等
3. 当用户减少色阶数量时，部分引用的色阶可能不存在，导致引用失效

## 解决方案

固定色阶数量为 10 个，确保所有语义引用都能找到对应的色阶：

1. **修改 ScaleSlider 组件**：移除动态调整功能，显示固定的 10 个色阶
2. **修改 tokenStore**：移除 scaleCount 状态和相关方法
3. **修改 generateTokens**：移除 scaleCount 参数，硬编码为 10

## 文件修改清单

| 文件路径 | 修改类型 | 说明 |
|---------|---------|------|
| `/workspace/src/components/config/ScaleSlider.tsx` | 修改 | 改为显示固定 10 个色阶，移除调整功能 |
| `/workspace/src/stores/tokenStore.ts` | 修改 | 移除 scaleCount 状态和 setScaleCount 方法 |
| `/workspace/src/utils/color/tokens.ts` | 修改 | 移除 scaleCount 参数，固定生成 10 个色阶 |

## 实施步骤

1. 更新 ScaleSlider，改为纯展示组件
2. 更新 tokenStore，移除 scaleCount
3. 更新 generateTokens，移除 scaleCount 参数
4. 测试验证

## 风险评估

- 低风险：修改仅涉及色阶数量的固定化，不影响其他功能
- 需要确保所有语义引用都能找到对应的色阶（已验证：50-900 都在 10 色阶范围内）
