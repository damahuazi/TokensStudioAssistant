import { create } from 'zustand';
import { ComponentConfig } from '../types/tokens';

const availableTokens = {
  color: [
    '{surface.default}',
    '{surface.subtle}',
    '{surface.brand}',
    '{surface.brandSubtle}',
    '{border.default}',
    '{border.strong}',
    '{border.brand}',
    '{border.error}',
    '{text.primary}',
    '{text.secondary}',
    '{text.placeholder}',
    '{text.onBrand}',
    '{global.color.brand.base}',
    '{global.color.brand.50}',
    '{global.color.brand.100}',
    '{global.color.brand.200}',
    '{global.color.brand.300}',
    '{global.color.brand.400}',
    '{global.color.brand.500}',
    '{global.color.brand.600}',
    '{global.color.brand.700}',
    '{global.color.brand.800}',
    '{global.color.brand.900}',
    '{global.color.neutral.50}',
    '{global.color.neutral.100}',
    '{global.color.neutral.200}',
    '{global.color.neutral.300}',
    '{global.color.neutral.400}',
    '{global.color.neutral.500}',
    '{global.color.neutral.600}',
    '{global.color.neutral.700}',
    '{global.color.neutral.800}',
    '{global.color.neutral.900}',
    '{global.color.neutral.950}',
    '{global.color.success.500}',
    '{global.color.success.400}',
    '{global.color.warning.500}',
    '{global.color.warning.400}',
    '{global.color.error.500}',
    '{global.color.error.400}',
    '{global.color.info.500}',
    '{global.color.info.400}',
    'transparent',
    '#ffffff',
  ],
  spacing: [
    '{global.spacing.xs}',
    '{global.spacing.sm}',
    '{global.spacing.md}',
    '{global.spacing.lg}',
    '{global.spacing.xl}',
    '{global.spacing.2xl}',
  ],
  fontSize: [
    '{global.fontSize.12}',
    '{global.fontSize.14}',
    '{global.fontSize.16}',
    '{global.fontSize.18}',
    '{global.fontSize.20}',
  ],
  fontWeight: [
    '{global.fontWeight.normal}',
    '{global.fontWeight.medium}',
    '{global.fontWeight.semibold}',
    '{global.fontWeight.bold}',
  ],
  borderRadius: [
    '{global.radius.sm}',
    '{global.radius.md}',
    '{global.radius.lg}',
    '{global.radius.full}',
  ],
};

export const defaultComponentConfigs: ComponentConfig[] = [
  {
    key: 'button',
    label: 'Button',
    enabled: true,
    properties: [
      { key: 'background', label: 'Background', type: 'color', defaultToken: '{surface.default}', availableTokens: availableTokens.color },
      { key: 'backgroundHover', label: 'Background Hover', type: 'color', defaultToken: '{surface.subtle}', availableTokens: availableTokens.color },
      { key: 'backgroundActive', label: 'Background Active', type: 'color', defaultToken: '{global.color.neutral.300}', availableTokens: availableTokens.color },
      { key: 'foreground', label: 'Foreground', type: 'color', defaultToken: '{text.primary}', availableTokens: availableTokens.color },
      { key: 'border', label: 'Border', type: 'color', defaultToken: '{border.default}', availableTokens: availableTokens.color },
      { key: 'borderHover', label: 'Border Hover', type: 'color', defaultToken: '{border.strong}', availableTokens: availableTokens.color },
      { key: 'borderRadius', label: 'Border Radius', type: 'borderRadius', defaultToken: '{global.radius.md}', availableTokens: availableTokens.borderRadius },
      { key: 'paddingX', label: 'Padding X', type: 'spacing', defaultToken: '{global.spacing.lg}', availableTokens: availableTokens.spacing },
      { key: 'paddingY', label: 'Padding Y', type: 'spacing', defaultToken: '{global.spacing.sm}', availableTokens: availableTokens.spacing },
      { key: 'fontSize', label: 'Font Size', type: 'fontSize', defaultToken: '{global.fontSize.16}', availableTokens: availableTokens.fontSize },
      { key: 'fontWeight', label: 'Font Weight', type: 'fontWeight', defaultToken: '{global.fontWeight.medium}', availableTokens: availableTokens.fontWeight },
    ],
    variants: [
      {
        key: 'primary',
        label: 'Primary',
        enabled: true,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'borderRadius', 'paddingX', 'paddingY', 'fontSize', 'fontWeight'] },
          { key: 'hover', label: 'Hover', properties: ['backgroundHover', 'borderHover'] },
          { key: 'active', label: 'Active', properties: ['backgroundActive'] },
          { key: 'disabled', label: 'Disabled', properties: ['background', 'foreground'] },
        ],
      },
      {
        key: 'secondary',
        label: 'Secondary',
        enabled: true,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'border', 'borderRadius', 'paddingX', 'paddingY', 'fontSize', 'fontWeight'] },
          { key: 'hover', label: 'Hover', properties: ['backgroundHover', 'borderHover'] },
          { key: 'active', label: 'Active', properties: ['backgroundActive'] },
          { key: 'disabled', label: 'Disabled', properties: ['background', 'foreground', 'border'] },
        ],
      },
      {
        key: 'ghost',
        label: 'Ghost',
        enabled: true,
        states: [
          { key: 'default', label: 'Default', properties: ['foreground', 'borderRadius', 'paddingX', 'paddingY', 'fontSize', 'fontWeight'] },
          { key: 'hover', label: 'Hover', properties: ['backgroundHover'] },
          { key: 'active', label: 'Active', properties: ['backgroundActive'] },
          { key: 'disabled', label: 'Disabled', properties: ['foreground'] },
        ],
      },
      {
        key: 'outline',
        label: 'Outline',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'border', 'borderRadius', 'paddingX', 'paddingY', 'fontSize', 'fontWeight'] },
          { key: 'hover', label: 'Hover', properties: ['backgroundHover', 'borderHover'] },
          { key: 'active', label: 'Active', properties: ['backgroundActive'] },
          { key: 'disabled', label: 'Disabled', properties: ['background', 'foreground', 'border'] },
        ],
      },
      {
        key: 'danger',
        label: 'Danger',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'borderRadius', 'paddingX', 'paddingY', 'fontSize', 'fontWeight'] },
          { key: 'hover', label: 'Hover', properties: ['backgroundHover'] },
          { key: 'active', label: 'Active', properties: ['backgroundActive'] },
          { key: 'disabled', label: 'Disabled', properties: ['background', 'foreground'] },
        ],
      },
      {
        key: 'link',
        label: 'Link',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['foreground', 'fontSize', 'fontWeight'] },
          { key: 'hover', label: 'Hover', properties: ['foreground'] },
          { key: 'disabled', label: 'Disabled', properties: ['foreground'] },
        ],
      },
    ],
  },
  {
    key: 'input',
    label: 'Input',
    enabled: true,
    properties: [
      { key: 'background', label: 'Background', type: 'color', defaultToken: '{surface.default}', availableTokens: availableTokens.color },
      { key: 'border', label: 'Border', type: 'color', defaultToken: '{border.default}', availableTokens: availableTokens.color },
      { key: 'borderHover', label: 'Border Hover', type: 'color', defaultToken: '{border.strong}', availableTokens: availableTokens.color },
      { key: 'borderFocus', label: 'Border Focus', type: 'color', defaultToken: '{border.brand}', availableTokens: availableTokens.color },
      { key: 'borderError', label: 'Border Error', type: 'color', defaultToken: '{border.error}', availableTokens: availableTokens.color },
      { key: 'placeholder', label: 'Placeholder', type: 'color', defaultToken: '{text.placeholder}', availableTokens: availableTokens.color },
      { key: 'foreground', label: 'Foreground', type: 'color', defaultToken: '{text.primary}', availableTokens: availableTokens.color },
      { key: 'radius', label: 'Radius', type: 'borderRadius', defaultToken: '{global.radius.md}', availableTokens: availableTokens.borderRadius },
      { key: 'paddingX', label: 'Padding X', type: 'spacing', defaultToken: '{global.spacing.md}', availableTokens: availableTokens.spacing },
      { key: 'paddingY', label: 'Padding Y', type: 'spacing', defaultToken: '{global.spacing.sm}', availableTokens: availableTokens.spacing },
      { key: 'fontSize', label: 'Font Size', type: 'fontSize', defaultToken: '{global.fontSize.16}', availableTokens: availableTokens.fontSize },
    ],
    variants: [
      {
        key: 'default',
        label: 'Default',
        enabled: true,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'border', 'placeholder', 'foreground', 'radius', 'paddingX', 'paddingY', 'fontSize'] },
          { key: 'hover', label: 'Hover', properties: ['borderHover'] },
          { key: 'focus', label: 'Focus', properties: ['borderFocus'] },
          { key: 'disabled', label: 'Disabled', properties: ['background', 'border', 'foreground', 'placeholder'] },
          { key: 'error', label: 'Error', properties: ['borderError'] },
        ],
      },
      {
        key: 'outline',
        label: 'Outline',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'border', 'placeholder', 'foreground', 'radius', 'paddingX', 'paddingY', 'fontSize'] },
          { key: 'hover', label: 'Hover', properties: ['borderHover'] },
          { key: 'focus', label: 'Focus', properties: ['borderFocus'] },
          { key: 'disabled', label: 'Disabled', properties: ['background', 'border', 'foreground', 'placeholder'] },
          { key: 'error', label: 'Error', properties: ['borderError'] },
        ],
      },
      {
        key: 'filled',
        label: 'Filled',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'border', 'placeholder', 'foreground', 'radius', 'paddingX', 'paddingY', 'fontSize'] },
          { key: 'hover', label: 'Hover', properties: ['borderHover'] },
          { key: 'focus', label: 'Focus', properties: ['borderFocus'] },
          { key: 'disabled', label: 'Disabled', properties: ['background', 'border', 'foreground', 'placeholder'] },
          { key: 'error', label: 'Error', properties: ['borderError'] },
        ],
      },
    ],
  },
  {
    key: 'textarea',
    label: 'Textarea',
    enabled: false,
    properties: [
      { key: 'background', label: 'Background', type: 'color', defaultToken: '{surface.default}', availableTokens: availableTokens.color },
      { key: 'border', label: 'Border', type: 'color', defaultToken: '{border.default}', availableTokens: availableTokens.color },
      { key: 'borderHover', label: 'Border Hover', type: 'color', defaultToken: '{border.strong}', availableTokens: availableTokens.color },
      { key: 'borderFocus', label: 'Border Focus', type: 'color', defaultToken: '{border.brand}', availableTokens: availableTokens.color },
      { key: 'borderError', label: 'Border Error', type: 'color', defaultToken: '{border.error}', availableTokens: availableTokens.color },
      { key: 'placeholder', label: 'Placeholder', type: 'color', defaultToken: '{text.placeholder}', availableTokens: availableTokens.color },
      { key: 'foreground', label: 'Foreground', type: 'color', defaultToken: '{text.primary}', availableTokens: availableTokens.color },
      { key: 'radius', label: 'Radius', type: 'borderRadius', defaultToken: '{global.radius.md}', availableTokens: availableTokens.borderRadius },
      { key: 'paddingX', label: 'Padding X', type: 'spacing', defaultToken: '{global.spacing.md}', availableTokens: availableTokens.spacing },
      { key: 'paddingY', label: 'Padding Y', type: 'spacing', defaultToken: '{global.spacing.sm}', availableTokens: availableTokens.spacing },
      { key: 'fontSize', label: 'Font Size', type: 'fontSize', defaultToken: '{global.fontSize.16}', availableTokens: availableTokens.fontSize },
    ],
    variants: [
      {
        key: 'default',
        label: 'Default',
        enabled: true,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'border', 'placeholder', 'foreground', 'radius', 'paddingX', 'paddingY', 'fontSize'] },
          { key: 'hover', label: 'Hover', properties: ['borderHover'] },
          { key: 'focus', label: 'Focus', properties: ['borderFocus'] },
          { key: 'disabled', label: 'Disabled', properties: ['background', 'border', 'foreground', 'placeholder'] },
          { key: 'error', label: 'Error', properties: ['borderError'] },
        ],
      },
    ],
  },
  {
    key: 'select',
    label: 'Select',
    enabled: false,
    properties: [
      { key: 'background', label: 'Background', type: 'color', defaultToken: '{surface.default}', availableTokens: availableTokens.color },
      { key: 'border', label: 'Border', type: 'color', defaultToken: '{border.default}', availableTokens: availableTokens.color },
      { key: 'borderHover', label: 'Border Hover', type: 'color', defaultToken: '{border.strong}', availableTokens: availableTokens.color },
      { key: 'borderFocus', label: 'Border Focus', type: 'color', defaultToken: '{border.brand}', availableTokens: availableTokens.color },
      { key: 'placeholder', label: 'Placeholder', type: 'color', defaultToken: '{text.placeholder}', availableTokens: availableTokens.color },
      { key: 'foreground', label: 'Foreground', type: 'color', defaultToken: '{text.primary}', availableTokens: availableTokens.color },
      { key: 'radius', label: 'Radius', type: 'borderRadius', defaultToken: '{global.radius.md}', availableTokens: availableTokens.borderRadius },
      { key: 'paddingX', label: 'Padding X', type: 'spacing', defaultToken: '{global.spacing.md}', availableTokens: availableTokens.spacing },
      { key: 'paddingY', label: 'Padding Y', type: 'spacing', defaultToken: '{global.spacing.sm}', availableTokens: availableTokens.spacing },
      { key: 'fontSize', label: 'Font Size', type: 'fontSize', defaultToken: '{global.fontSize.16}', availableTokens: availableTokens.fontSize },
      { key: 'icon', label: 'Icon Color', type: 'color', defaultToken: '{text.secondary}', availableTokens: availableTokens.color },
    ],
    variants: [
      {
        key: 'default',
        label: 'Default',
        enabled: true,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'border', 'placeholder', 'foreground', 'radius', 'paddingX', 'paddingY', 'fontSize', 'icon'] },
          { key: 'hover', label: 'Hover', properties: ['borderHover'] },
          { key: 'focus', label: 'Focus', properties: ['borderFocus'] },
          { key: 'disabled', label: 'Disabled', properties: ['background', 'border', 'foreground', 'placeholder', 'icon'] },
          { key: 'open', label: 'Open', properties: ['borderFocus'] },
        ],
      },
    ],
  },
  {
    key: 'checkbox',
    label: 'Checkbox',
    enabled: false,
    properties: [
      { key: 'background', label: 'Background', type: 'color', defaultToken: '{surface.default}', availableTokens: availableTokens.color },
      { key: 'border', label: 'Border', type: 'color', defaultToken: '{border.default}', availableTokens: availableTokens.color },
      { key: 'borderHover', label: 'Border Hover', type: 'color', defaultToken: '{border.strong}', availableTokens: availableTokens.color },
      { key: 'checkedBackground', label: 'Checked Background', type: 'color', defaultToken: '{global.color.brand.base}', availableTokens: availableTokens.color },
      { key: 'checkedBorder', label: 'Checked Border', type: 'color', defaultToken: '{global.color.brand.base}', availableTokens: availableTokens.color },
      { key: 'checkmarkColor', label: 'Checkmark Color', type: 'color', defaultToken: '{text.onBrand}', availableTokens: availableTokens.color },
      { key: 'indeterminateBackground', label: 'Indeterminate Background', type: 'color', defaultToken: '{global.color.brand.base}', availableTokens: availableTokens.color },
      { key: 'indeterminateBorder', label: 'Indeterminate Border', type: 'color', defaultToken: '{global.color.brand.base}', availableTokens: availableTokens.color },
      { key: 'radius', label: 'Radius', type: 'borderRadius', defaultToken: '{global.radius.sm}', availableTokens: availableTokens.borderRadius },
      { key: 'size', label: 'Size', type: 'spacing', defaultToken: '{global.spacing.md}', availableTokens: availableTokens.spacing },
    ],
    variants: [
      {
        key: 'default',
        label: 'Default',
        enabled: true,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'border', 'radius', 'size'] },
          { key: 'hover', label: 'Hover', properties: ['borderHover'] },
          { key: 'active', label: 'Active', properties: ['border'] },
          { key: 'disabled', label: 'Disabled', properties: ['background', 'border'] },
          { key: 'checked', label: 'Checked', properties: ['checkedBackground', 'checkedBorder', 'checkmarkColor', 'radius', 'size'] },
          { key: 'checkedHover', label: 'Checked Hover', properties: ['checkedBackground'] },
          { key: 'checkedDisabled', label: 'Checked Disabled', properties: ['checkedBackground', 'checkedBorder', 'checkmarkColor'] },
          { key: 'indeterminate', label: 'Indeterminate', properties: ['indeterminateBackground', 'indeterminateBorder', 'checkmarkColor', 'radius', 'size'] },
        ],
      },
    ],
  },
  {
    key: 'radio',
    label: 'Radio',
    enabled: false,
    properties: [
      { key: 'background', label: 'Background', type: 'color', defaultToken: '{surface.default}', availableTokens: availableTokens.color },
      { key: 'border', label: 'Border', type: 'color', defaultToken: '{border.default}', availableTokens: availableTokens.color },
      { key: 'borderHover', label: 'Border Hover', type: 'color', defaultToken: '{border.strong}', availableTokens: availableTokens.color },
      { key: 'checkedBackground', label: 'Checked Background', type: 'color', defaultToken: '{global.color.brand.base}', availableTokens: availableTokens.color },
      { key: 'checkedBorder', label: 'Checked Border', type: 'color', defaultToken: '{global.color.brand.base}', availableTokens: availableTokens.color },
      { key: 'dotColor', label: 'Dot Color', type: 'color', defaultToken: '{text.onBrand}', availableTokens: availableTokens.color },
      { key: 'radius', label: 'Radius', type: 'borderRadius', defaultToken: '{global.radius.full}', availableTokens: availableTokens.borderRadius },
      { key: 'size', label: 'Size', type: 'spacing', defaultToken: '{global.spacing.md}', availableTokens: availableTokens.spacing },
    ],
    variants: [
      {
        key: 'default',
        label: 'Default',
        enabled: true,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'border', 'radius', 'size'] },
          { key: 'hover', label: 'Hover', properties: ['borderHover'] },
          { key: 'active', label: 'Active', properties: ['border'] },
          { key: 'disabled', label: 'Disabled', properties: ['background', 'border'] },
          { key: 'checked', label: 'Checked', properties: ['checkedBackground', 'checkedBorder', 'dotColor', 'radius', 'size'] },
          { key: 'checkedHover', label: 'Checked Hover', properties: ['checkedBackground'] },
          { key: 'checkedDisabled', label: 'Checked Disabled', properties: ['checkedBackground', 'checkedBorder', 'dotColor'] },
        ],
      },
    ],
  },
  {
    key: 'switch',
    label: 'Switch',
    enabled: false,
    properties: [
      { key: 'background', label: 'Background', type: 'color', defaultToken: '{border.default}', availableTokens: availableTokens.color },
      { key: 'thumbBackground', label: 'Thumb Background', type: 'color', defaultToken: '{surface.default}', availableTokens: availableTokens.color },
      { key: 'checkedBackground', label: 'Checked Background', type: 'color', defaultToken: '{global.color.brand.base}', availableTokens: availableTokens.color },
      { key: 'checkedThumbBackground', label: 'Checked Thumb Background', type: 'color', defaultToken: '#ffffff', availableTokens: availableTokens.color },
      { key: 'borderColor', label: 'Border Color', type: 'color', defaultToken: 'transparent', availableTokens: availableTokens.color },
      { key: 'width', label: 'Width', type: 'spacing', defaultToken: '{global.spacing.xl}', availableTokens: availableTokens.spacing },
      { key: 'height', label: 'Height', type: 'spacing', defaultToken: '{global.spacing.md}', availableTokens: availableTokens.spacing },
      { key: 'thumbSize', label: 'Thumb Size', type: 'spacing', defaultToken: '{global.spacing.sm}', availableTokens: availableTokens.spacing },
    ],
    variants: [
      {
        key: 'default',
        label: 'Default',
        enabled: true,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'thumbBackground', 'borderColor', 'width', 'height', 'thumbSize'] },
          { key: 'hover', label: 'Hover', properties: ['background'] },
          { key: 'active', label: 'Active', properties: ['background'] },
          { key: 'disabled', label: 'Disabled', properties: ['background', 'thumbBackground'] },
          { key: 'checked', label: 'Checked', properties: ['checkedBackground', 'checkedThumbBackground', 'borderColor', 'width', 'height', 'thumbSize'] },
          { key: 'checkedHover', label: 'Checked Hover', properties: ['checkedBackground'] },
          { key: 'checkedDisabled', label: 'Checked Disabled', properties: ['checkedBackground', 'checkedThumbBackground'] },
        ],
      },
    ],
  },
  {
    key: 'tag',
    label: 'Tag',
    enabled: false,
    properties: [
      { key: 'background', label: 'Background', type: 'color', defaultToken: '{surface.subtle}', availableTokens: availableTokens.color },
      { key: 'foreground', label: 'Foreground', type: 'color', defaultToken: '{text.primary}', availableTokens: availableTokens.color },
      { key: 'border', label: 'Border', type: 'color', defaultToken: '{border.default}', availableTokens: availableTokens.color },
      { key: 'radius', label: 'Radius', type: 'borderRadius', defaultToken: '{global.radius.md}', availableTokens: availableTokens.borderRadius },
      { key: 'paddingX', label: 'Padding X', type: 'spacing', defaultToken: '{global.spacing.sm}', availableTokens: availableTokens.spacing },
      { key: 'paddingY', label: 'Padding Y', type: 'spacing', defaultToken: '{global.spacing.xs}', availableTokens: availableTokens.spacing },
      { key: 'fontSize', label: 'Font Size', type: 'fontSize', defaultToken: '{global.fontSize.14}', availableTokens: availableTokens.fontSize },
      { key: 'closeColor', label: 'Close Color', type: 'color', defaultToken: '{text.secondary}', availableTokens: availableTokens.color },
      { key: 'closeHoverColor', label: 'Close Hover Color', type: 'color', defaultToken: '{text.primary}', availableTokens: availableTokens.color },
    ],
    variants: [
      {
        key: 'default',
        label: 'Default',
        enabled: true,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'border', 'radius', 'paddingX', 'paddingY', 'fontSize', 'closeColor'] },
          { key: 'hover', label: 'Hover', properties: ['closeHoverColor'] },
        ],
      },
      {
        key: 'primary',
        label: 'Primary',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'border', 'radius', 'paddingX', 'paddingY', 'fontSize', 'closeColor'] },
          { key: 'hover', label: 'Hover', properties: ['closeHoverColor'] },
        ],
      },
      {
        key: 'success',
        label: 'Success',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'border', 'radius', 'paddingX', 'paddingY', 'fontSize', 'closeColor'] },
          { key: 'hover', label: 'Hover', properties: ['closeHoverColor'] },
        ],
      },
      {
        key: 'warning',
        label: 'Warning',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'border', 'radius', 'paddingX', 'paddingY', 'fontSize', 'closeColor'] },
          { key: 'hover', label: 'Hover', properties: ['closeHoverColor'] },
        ],
      },
      {
        key: 'error',
        label: 'Error',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'border', 'radius', 'paddingX', 'paddingY', 'fontSize', 'closeColor'] },
          { key: 'hover', label: 'Hover', properties: ['closeHoverColor'] },
        ],
      },
      {
        key: 'info',
        label: 'Info',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'border', 'radius', 'paddingX', 'paddingY', 'fontSize', 'closeColor'] },
          { key: 'hover', label: 'Hover', properties: ['closeHoverColor'] },
        ],
      },
    ],
  },
  {
    key: 'card',
    label: 'Card',
    enabled: false,
    properties: [
      { key: 'background', label: 'Background', type: 'color', defaultToken: '{surface.default}', availableTokens: availableTokens.color },
      { key: 'border', label: 'Border', type: 'color', defaultToken: '{border.default}', availableTokens: availableTokens.color },
      { key: 'radius', label: 'Radius', type: 'borderRadius', defaultToken: '{global.radius.lg}', availableTokens: availableTokens.borderRadius },
      { key: 'padding', label: 'Padding', type: 'spacing', defaultToken: '{global.spacing.lg}', availableTokens: availableTokens.spacing },
    ],
    variants: [
      {
        key: 'default',
        label: 'Default',
        enabled: true,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'border', 'radius', 'padding'] },
          { key: 'hover', label: 'Hover', properties: ['border'] },
        ],
      },
      {
        key: 'elevated',
        label: 'Elevated',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'border', 'radius', 'padding'] },
          { key: 'hover', label: 'Hover', properties: [] },
        ],
      },
      {
        key: 'outlined',
        label: 'Outlined',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'border', 'radius', 'padding'] },
          { key: 'hover', label: 'Hover', properties: ['border'] },
        ],
      },
    ],
  },
  {
    key: 'badge',
    label: 'Badge',
    enabled: false,
    properties: [
      { key: 'background', label: 'Background', type: 'color', defaultToken: '{surface.subtle}', availableTokens: availableTokens.color },
      { key: 'foreground', label: 'Foreground', type: 'color', defaultToken: '{text.primary}', availableTokens: availableTokens.color },
      { key: 'radius', label: 'Radius', type: 'borderRadius', defaultToken: '{global.radius.full}', availableTokens: availableTokens.borderRadius },
      { key: 'paddingX', label: 'Padding X', type: 'spacing', defaultToken: '{global.spacing.sm}', availableTokens: availableTokens.spacing },
      { key: 'paddingY', label: 'Padding Y', type: 'spacing', defaultToken: '{global.spacing.xs}', availableTokens: availableTokens.spacing },
      { key: 'fontSize', label: 'Font Size', type: 'fontSize', defaultToken: '{global.fontSize.12}', availableTokens: availableTokens.fontSize },
    ],
    variants: [
      {
        key: 'default',
        label: 'Default',
        enabled: true,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'radius', 'paddingX', 'paddingY', 'fontSize'] },
        ],
      },
      {
        key: 'primary',
        label: 'Primary',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'radius', 'paddingX', 'paddingY', 'fontSize'] },
        ],
      },
      {
        key: 'success',
        label: 'Success',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'radius', 'paddingX', 'paddingY', 'fontSize'] },
        ],
      },
      {
        key: 'warning',
        label: 'Warning',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'radius', 'paddingX', 'paddingY', 'fontSize'] },
        ],
      },
      {
        key: 'error',
        label: 'Error',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'radius', 'paddingX', 'paddingY', 'fontSize'] },
        ],
      },
      {
        key: 'info',
        label: 'Info',
        enabled: false,
        states: [
          { key: 'default', label: 'Default', properties: ['background', 'foreground', 'radius', 'paddingX', 'paddingY', 'fontSize'] },
        ],
      },
    ],
  },
];

interface ComponentStoreState {
  configs: ComponentConfig[];
  setComponentEnabled: (componentKey: string, enabled: boolean) => void;
  setVariantEnabled: (componentKey: string, variantKey: string, enabled: boolean) => void;
  resetConfigs: () => void;
  getEnabledComponents: () => ComponentConfig[];
}

export const useComponentStore = create<ComponentStoreState>((set, get) => ({
  configs: JSON.parse(JSON.stringify(defaultComponentConfigs)),

  setComponentEnabled: (componentKey: string, enabled: boolean) =>
    set((state) => ({
      configs: state.configs.map((config) =>
        config.key === componentKey ? { ...config, enabled } : config
      ),
    })),

  setVariantEnabled: (componentKey: string, variantKey: string, enabled: boolean) =>
    set((state) => ({
      configs: state.configs.map((config) =>
        config.key === componentKey
          ? {
              ...config,
              variants: config.variants.map((variant) =>
                variant.key === variantKey ? { ...variant, enabled } : variant
              ),
            }
          : config
      ),
    })),

  resetConfigs: () => set({ configs: JSON.parse(JSON.stringify(defaultComponentConfigs)) }),

  getEnabledComponents: () =>
    get().configs.filter((config) => config.enabled).map((config) => ({
      ...config,
      variants: config.variants.filter((variant) => variant.enabled),
    })),
}));