import { FontConfig, GeneratedTokens, TokenValue } from '../../types/tokens';
import {
  generateColorScale,
  generateNeutralScale,
  generateSuccessScale,
  generateWarningScale,
  generateErrorScale,
} from './oklch';

const createTokenValue = (value: string, type: string): TokenValue => ({
  value,
  type,
});

export const generateTokens = (
  themeColor: string,
  scaleCount: number,
  fontConfig: FontConfig
): GeneratedTokens => {
  const brandScale = generateColorScale(themeColor, scaleCount);
  const neutralScale = generateNeutralScale(themeColor, scaleCount);
  const successScale = generateSuccessScale(themeColor, scaleCount);
  const warningScale = generateWarningScale(themeColor, scaleCount);
  const errorScale = generateErrorScale(themeColor, scaleCount);

  const colorScaleKeys = Object.keys(brandScale);

  const global: GeneratedTokens['global'] = {
    color: {
      brand: Object.fromEntries(
        colorScaleKeys.map((key) => [key, createTokenValue(brandScale[key], 'color')])
      ),
      neutral: Object.fromEntries(
        colorScaleKeys.map((key) => [key, createTokenValue(neutralScale[key], 'color')])
      ),
      success: Object.fromEntries(
        colorScaleKeys.map((key) => [key, createTokenValue(successScale[key], 'color')])
      ),
      warning: Object.fromEntries(
        colorScaleKeys.map((key) => [key, createTokenValue(warningScale[key], 'color')])
      ),
      error: Object.fromEntries(
        colorScaleKeys.map((key) => [key, createTokenValue(errorScale[key], 'color')])
      ),
    },
    typography: {
      fontSize: {
        xs: createTokenValue(`${fontConfig.baseFontSize * 0.75}px`, 'dimension'),
        sm: createTokenValue(`${fontConfig.baseFontSize * 0.875}px`, 'dimension'),
        base: createTokenValue(`${fontConfig.baseFontSize}px`, 'dimension'),
        lg: createTokenValue(`${fontConfig.baseFontSize * fontConfig.scaleRatio}px`, 'dimension'),
        xl: createTokenValue(
          `${fontConfig.baseFontSize * Math.pow(fontConfig.scaleRatio, 2)}px`,
          'dimension'
        ),
        '2xl': createTokenValue(
          `${fontConfig.baseFontSize * Math.pow(fontConfig.scaleRatio, 3)}px`,
          'dimension'
        ),
        '3xl': createTokenValue(
          `${fontConfig.baseFontSize * Math.pow(fontConfig.scaleRatio, 4)}px`,
          'dimension'
        ),
      },
      fontWeight: {
        normal: createTokenValue('400', 'fontWeight'),
        medium: createTokenValue('500', 'fontWeight'),
        semibold: createTokenValue('600', 'fontWeight'),
        bold: createTokenValue('700', 'fontWeight'),
      },
      lineHeight: {
        tight: createTokenValue('1.25', 'number'),
        normal: createTokenValue('1.5', 'number'),
        relaxed: createTokenValue('1.75', 'number'),
      },
    },
    spacing: {
      xs: createTokenValue('4px', 'dimension'),
      sm: createTokenValue('8px', 'dimension'),
      md: createTokenValue('16px', 'dimension'),
      lg: createTokenValue('24px', 'dimension'),
      xl: createTokenValue('32px', 'dimension'),
      '2xl': createTokenValue('48px', 'dimension'),
    },
    radius: {
      sm: createTokenValue('4px', 'dimension'),
      md: createTokenValue('8px', 'dimension'),
      lg: createTokenValue('12px', 'dimension'),
      full: createTokenValue('9999px', 'dimension'),
    },
  };

  const light: GeneratedTokens['light'] = {
    background: {
      primary: createTokenValue('{global.color.neutral.50}', 'color'),
      secondary: createTokenValue('{global.color.neutral.100}', 'color'),
      tertiary: createTokenValue('{global.color.neutral.200}', 'color'),
    },
    foreground: {
      primary: createTokenValue('{global.color.neutral.900}', 'color'),
      secondary: createTokenValue('{global.color.neutral.600}', 'color'),
      muted: createTokenValue('{global.color.neutral.500}', 'color'),
    },
    border: {
      default: createTokenValue('{global.color.neutral.200}', 'color'),
      hover: createTokenValue('{global.color.neutral.300}', 'color'),
      focus: createTokenValue('{global.color.brand.500}', 'color'),
    },
    accent: {
      default: createTokenValue('{global.color.brand.500}', 'color'),
      hover: createTokenValue('{global.color.brand.600}', 'color'),
      foreground: createTokenValue('#ffffff', 'color'),
    },
    status: {
      success: createTokenValue('{global.color.success.500}', 'color'),
      warning: createTokenValue('{global.color.warning.500}', 'color'),
      error: createTokenValue('{global.color.error.500}', 'color'),
    },
  };

  const dark: GeneratedTokens['dark'] = {
    background: {
      primary: createTokenValue('{global.color.neutral.900}', 'color'),
      secondary: createTokenValue('{global.color.neutral.800}', 'color'),
      tertiary: createTokenValue('{global.color.neutral.700}', 'color'),
    },
    foreground: {
      primary: createTokenValue('{global.color.neutral.50}', 'color'),
      secondary: createTokenValue('{global.color.neutral.400}', 'color'),
      muted: createTokenValue('{global.color.neutral.500}', 'color'),
    },
    border: {
      default: createTokenValue('{global.color.neutral.700}', 'color'),
      hover: createTokenValue('{global.color.neutral.600}', 'color'),
      focus: createTokenValue('{global.color.brand.400}', 'color'),
    },
    accent: {
      default: createTokenValue('{global.color.brand.400}', 'color'),
      hover: createTokenValue('{global.color.brand.300}', 'color'),
      foreground: createTokenValue('{global.color.neutral.900}', 'color'),
    },
    status: {
      success: createTokenValue('{global.color.success.400}', 'color'),
      warning: createTokenValue('{global.color.warning.400}', 'color'),
      error: createTokenValue('{global.color.error.400}', 'color'),
    },
  };

  const components: GeneratedTokens['components'] = {
    input: {
      background: createTokenValue('{light.background.primary}', 'color'),
      border: createTokenValue('{light.border.default}', 'color'),
      borderHover: createTokenValue('{light.border.hover}', 'color'),
      borderFocus: createTokenValue('{light.border.focus}', 'color'),
      placeholder: createTokenValue('{light.foreground.muted}', 'color'),
      foreground: createTokenValue('{light.foreground.primary}', 'color'),
      radius: createTokenValue('{global.radius.md}', 'borderRadius'),
      paddingX: createTokenValue('{global.spacing.md}', 'spacing'),
      paddingY: createTokenValue('{global.spacing.sm}', 'spacing'),
      fontSize: createTokenValue('{global.typography.fontSize.base}', 'fontSize'),
    },
    button: {
      primary: {
        background: createTokenValue('{light.accent.default}', 'color'),
        backgroundHover: createTokenValue('{light.accent.hover}', 'color'),
        foreground: createTokenValue('{light.accent.foreground}', 'color'),
        borderRadius: createTokenValue('{global.radius.md}', 'borderRadius'),
        paddingX: createTokenValue('{global.spacing.lg}', 'spacing'),
        paddingY: createTokenValue('{global.spacing.sm}', 'spacing'),
        fontSize: createTokenValue('{global.typography.fontSize.base}', 'fontSize'),
        fontWeight: createTokenValue('{global.typography.fontWeight.medium}', 'fontWeight'),
      },
      secondary: {
        background: createTokenValue('{light.background.secondary}', 'color'),
        backgroundHover: createTokenValue('{light.background.tertiary}', 'color'),
        foreground: createTokenValue('{light.foreground.primary}', 'color'),
        borderRadius: createTokenValue('{global.radius.md}', 'borderRadius'),
        paddingX: createTokenValue('{global.spacing.lg}', 'spacing'),
        paddingY: createTokenValue('{global.spacing.sm}', 'spacing'),
        fontSize: createTokenValue('{global.typography.fontSize.base}', 'fontSize'),
        fontWeight: createTokenValue('{global.typography.fontWeight.medium}', 'fontWeight'),
      },
      ghost: {
        background: createTokenValue('transparent', 'color'),
        backgroundHover: createTokenValue('{light.background.secondary}', 'color'),
        foreground: createTokenValue('{light.foreground.primary}', 'color'),
        borderRadius: createTokenValue('{global.radius.md}', 'borderRadius'),
        paddingX: createTokenValue('{global.spacing.lg}', 'spacing'),
        paddingY: createTokenValue('{global.spacing.sm}', 'spacing'),
        fontSize: createTokenValue('{global.typography.fontSize.base}', 'fontSize'),
        fontWeight: createTokenValue('{global.typography.fontWeight.medium}', 'fontWeight'),
      },
    },
  };

  return { global, light, dark, components };
};
