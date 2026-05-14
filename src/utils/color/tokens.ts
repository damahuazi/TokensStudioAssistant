import { ComponentConfig, FontConfig, GeneratedTokens, TokenValue } from '../../types/tokens';
import {
  generateColorScale,
  generateNeutralScale,
  generateSuccessScale,
  generateWarningScale,
  generateErrorScale,
  generateInfoScale,
} from './oklch';

const createTokenValue = (value: string, type: string): TokenValue => ({
  value,
  type,
});

const SCALE_COUNT = 10;

export const generateTokens = (
  themeColor: string,
  fontConfig: FontConfig,
  componentConfigs?: ComponentConfig[]
): GeneratedTokens => {
  const brandScale = generateColorScale(themeColor, SCALE_COUNT);
  const neutralScale = generateNeutralScale(themeColor, SCALE_COUNT);
  const successScale = generateSuccessScale(themeColor, SCALE_COUNT);
  const warningScale = generateWarningScale(themeColor, SCALE_COUNT);
  const errorScale = generateErrorScale(themeColor, SCALE_COUNT);
  const infoScale = generateInfoScale(themeColor, SCALE_COUNT);

  const colorScaleKeys = Object.keys(brandScale);

  const global: GeneratedTokens['global'] = {
    fontSize: {
      '12': createTokenValue('12px', 'fontSizes'),
      '14': createTokenValue('14px', 'fontSizes'),
      '16': createTokenValue('16px', 'fontSizes'),
      '18': createTokenValue('18px', 'fontSizes'),
      '20': createTokenValue('20px', 'fontSizes'),
      '24': createTokenValue('24px', 'fontSizes'),
      '28': createTokenValue('28px', 'fontSizes'),
      '32': createTokenValue('32px', 'fontSizes'),
      '40': createTokenValue('40px', 'fontSizes'),
      '48': createTokenValue('48px', 'fontSizes'),
      '64': createTokenValue('64px', 'fontSizes'),
    },
    fontWeight: {
      normal: createTokenValue('400', 'fontWeight'),
      medium: createTokenValue('500', 'fontWeight'),
      semibold: createTokenValue('600', 'fontWeight'),
      bold: createTokenValue('700', 'fontWeight'),
    },
    lineHeight: {
      tight: createTokenValue('1.25', 'lineHeights'),
      snug: createTokenValue('1.375', 'lineHeights'),
      normal: createTokenValue('1.5', 'lineHeights'),
      relaxed: createTokenValue('1.625', 'lineHeights'),
      loose: createTokenValue('1.75', 'lineHeights'),
    },
    color: {
      brand: {
        ...Object.fromEntries(
          colorScaleKeys.map((key) => [key, createTokenValue(brandScale[key], 'color')])
        ),
        base: createTokenValue(themeColor, 'color'),
      },
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
      info: Object.fromEntries(
        colorScaleKeys.map((key) => [key, createTokenValue(infoScale[key], 'color')])
      ),
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

  const typography: GeneratedTokens['typography'] = {
    display: {
      large: createTokenValue(
        '{global.fontSize.64} {global.fontWeight.bold} {global.lineHeight.tight}',
        'typography'
      ),
      medium: createTokenValue(
        '{global.fontSize.48} {global.fontWeight.bold} {global.lineHeight.tight}',
        'typography'
      ),
      small: createTokenValue(
        '{global.fontSize.40} {global.fontWeight.bold} {global.lineHeight.snug}',
        'typography'
      ),
    },
    heading: {
      xlarge: createTokenValue(
        '{global.fontSize.32} {global.fontWeight.bold} {global.lineHeight.snug}',
        'typography'
      ),
      large: createTokenValue(
        '{global.fontSize.28} {global.fontWeight.semibold} {global.lineHeight.snug}',
        'typography'
      ),
      medium: createTokenValue(
        '{global.fontSize.24} {global.fontWeight.semibold} {global.lineHeight.normal}',
        'typography'
      ),
      small: createTokenValue(
        '{global.fontSize.20} {global.fontWeight.semibold} {global.lineHeight.normal}',
        'typography'
      ),
    },
    body: {
      large: createTokenValue(
        '{global.fontSize.18} {global.fontWeight.normal} {global.lineHeight.relaxed}',
        'typography'
      ),
      medium: createTokenValue(
        '{global.fontSize.16} {global.fontWeight.normal} {global.lineHeight.relaxed}',
        'typography'
      ),
      small: createTokenValue(
        '{global.fontSize.14} {global.fontWeight.normal} {global.lineHeight.relaxed}',
        'typography'
      ),
    },
    label: {
      large: createTokenValue(
        '{global.fontSize.14} {global.fontWeight.semibold} {global.lineHeight.snug}',
        'typography'
      ),
      medium: createTokenValue(
        '{global.fontSize.12} {global.fontWeight.medium} {global.lineHeight.normal}',
        'typography'
      ),
    },
  };

  const light: GeneratedTokens['light'] = {
    surface: {
      canvas: createTokenValue('{global.color.neutral.50}', 'color'),
      default: createTokenValue('{global.color.neutral.50}', 'color'),
      subtle: createTokenValue('{global.color.neutral.100}', 'color'),
      brand: createTokenValue('{global.color.brand.base}', 'color'),
      brandSubtle: createTokenValue('{global.color.brand.50}', 'color'),
    },
    border: {
      default: createTokenValue('{global.color.neutral.200}', 'color'),
      strong: createTokenValue('{global.color.neutral.300}', 'color'),
      brand: createTokenValue('{global.color.brand.base}', 'color'),
      error: createTokenValue('{global.color.error.500}', 'color'),
      disabled: createTokenValue('{global.color.neutral.200}', 'color'),
    },
    text: {
      primary: createTokenValue('{global.color.neutral.900}', 'color'),
      secondary: createTokenValue('{global.color.neutral.600}', 'color'),
      placeholder: createTokenValue('{global.color.neutral.400}', 'color'),
      onBrand: createTokenValue('#ffffff', 'color'),
      error: createTokenValue('{global.color.error.500}', 'color'),
    },
    status: {
      success: createTokenValue('{global.color.success.500}', 'color'),
      warning: createTokenValue('{global.color.warning.500}', 'color'),
      error: createTokenValue('{global.color.error.500}', 'color'),
      info: createTokenValue('{global.color.info.500}', 'color'),
    },
  };

  const dark: GeneratedTokens['dark'] = {
    surface: {
      canvas: createTokenValue('{global.color.neutral.950}', 'color'),
      default: createTokenValue('{global.color.neutral.900}', 'color'),
      subtle: createTokenValue('{global.color.neutral.800}', 'color'),
      brand: createTokenValue('{global.color.brand.base}', 'color'),
      brandSubtle: createTokenValue('{global.color.brand.900}', 'color'),
    },
    border: {
      default: createTokenValue('{global.color.neutral.700}', 'color'),
      strong: createTokenValue('{global.color.neutral.600}', 'color'),
      brand: createTokenValue('{global.color.brand.base}', 'color'),
      error: createTokenValue('{global.color.error.400}', 'color'),
      disabled: createTokenValue('{global.color.neutral.700}', 'color'),
    },
    text: {
      primary: createTokenValue('{global.color.neutral.50}', 'color'),
      secondary: createTokenValue('{global.color.neutral.400}', 'color'),
      placeholder: createTokenValue('{global.color.neutral.500}', 'color'),
      onBrand: createTokenValue('{global.color.neutral.900}', 'color'),
      error: createTokenValue('{global.color.error.400}', 'color'),
    },
    status: {
      success: createTokenValue('{global.color.success.400}', 'color'),
      warning: createTokenValue('{global.color.warning.400}', 'color'),
      error: createTokenValue('{global.color.error.400}', 'color'),
      info: createTokenValue('{global.color.info.400}', 'color'),
    },
  };

  const generateComponents = (configs?: ComponentConfig[]): GeneratedTokens['components'] => {
    if (!configs || configs.length === 0) {
      return {
        input: {
          background: createTokenValue('{surface.default}', 'color'),
          border: createTokenValue('{border.default}', 'color'),
          borderHover: createTokenValue('{border.strong}', 'color'),
          borderFocus: createTokenValue('{border.brand}', 'color'),
          placeholder: createTokenValue('{text.placeholder}', 'color'),
          foreground: createTokenValue('{text.primary}', 'color'),
          radius: createTokenValue('{global.radius.md}', 'borderRadius'),
          paddingX: createTokenValue('{global.spacing.md}', 'spacing'),
          paddingY: createTokenValue('{global.spacing.sm}', 'spacing'),
          fontSize: createTokenValue('{global.fontSize.16}', 'fontSize'),
        },
        button: {
          primary: {
            background: createTokenValue('{surface.brand}', 'color'),
            backgroundHover: createTokenValue('{global.color.brand.600}', 'color'),
            foreground: createTokenValue('{text.onBrand}', 'color'),
            borderRadius: createTokenValue('{global.radius.md}', 'borderRadius'),
            paddingX: createTokenValue('{global.spacing.lg}', 'spacing'),
            paddingY: createTokenValue('{global.spacing.sm}', 'spacing'),
            fontSize: createTokenValue('{global.fontSize.16}', 'fontSize'),
            fontWeight: createTokenValue('{global.fontWeight.medium}', 'fontWeight'),
          },
          secondary: {
            background: createTokenValue('{surface.default}', 'color'),
            backgroundHover: createTokenValue('{surface.subtle}', 'color'),
            foreground: createTokenValue('{text.primary}', 'color'),
            borderRadius: createTokenValue('{global.radius.md}', 'borderRadius'),
            paddingX: createTokenValue('{global.spacing.lg}', 'spacing'),
            paddingY: createTokenValue('{global.spacing.sm}', 'spacing'),
            fontSize: createTokenValue('{global.fontSize.16}', 'fontSize'),
            fontWeight: createTokenValue('{global.fontWeight.medium}', 'fontWeight'),
          },
          ghost: {
            background: createTokenValue('transparent', 'color'),
            backgroundHover: createTokenValue('{surface.subtle}', 'color'),
            foreground: createTokenValue('{text.primary}', 'color'),
            borderRadius: createTokenValue('{global.radius.md}', 'borderRadius'),
            paddingX: createTokenValue('{global.spacing.lg}', 'spacing'),
            paddingY: createTokenValue('{global.spacing.sm}', 'spacing'),
            fontSize: createTokenValue('{global.fontSize.16}', 'fontSize'),
            fontWeight: createTokenValue('{global.fontWeight.medium}', 'fontWeight'),
          },
        },
      };
    }

    const components: GeneratedTokens['components'] = {};

    configs.forEach((config) => {
      if (!config.enabled) return;

      const component: { [key: string]: TokenValue | { [key: string]: TokenValue } } = {};

      const hasVariants = config.variants.length > 0;

      if (hasVariants) {
        config.variants.forEach((variant) => {
          if (!variant.enabled) return;

          const variantTokens: { [key: string]: TokenValue } = {};

          variant.states.forEach((state) => {
            state.properties.forEach((propertyKey) => {
              const property = config.properties.find((p) => p.key === propertyKey);
              if (!property) return;

              const tokenKey = state.key === 'default' ? propertyKey : `${propertyKey}${state.key.charAt(0).toUpperCase() + state.key.slice(1)}`;
              variantTokens[tokenKey] = createTokenValue(property.defaultToken, property.type);
            });
          });

          component[variant.key] = variantTokens;
        });
      } else {
        config.properties.forEach((property) => {
          component[property.key] = createTokenValue(property.defaultToken, property.type);
        });
      }

      components[config.key] = component;
    });

    return components;
  };

  const components = generateComponents(componentConfigs);

  return { global, typography, light, dark, components };
};