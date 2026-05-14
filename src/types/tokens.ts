export interface TokenValue {
  value: string;
  type: string;
}

export interface PropertyValue {
  key: string;
  token: string;
}

export interface ComponentProperty {
  key: string;
  label: string;
  type: 'color' | 'spacing' | 'fontSize' | 'fontWeight' | 'borderRadius';
  defaultToken: string;
  availableTokens: string[];
}

export interface ComponentState {
  key: string;
  label: string;
  properties: (string | PropertyValue)[];
}

export interface ComponentVariant {
  key: string;
  label: string;
  enabled: boolean;
  states: ComponentState[];
}

export interface ComponentConfig {
  key: string;
  label: string;
  enabled: boolean;
  variants: ComponentVariant[];
  properties: ComponentProperty[];
}

export interface ColorPrimitives {
  [key: string]: {
    [scale: string]: TokenValue;
  };
}

export interface TypographyTokens {
  fontSize: {
    [key: string]: TokenValue;
  };
  fontWeight: {
    [key: string]: TokenValue;
  };
  lineHeight: {
    [key: string]: TokenValue;
  };
}

export interface SpacingTokens {
  [key: string]: TokenValue;
}

export interface RadiusTokens {
  [key: string]: TokenValue;
}

export interface ThemeSet {
  surface?: {
    canvas?: TokenValue;
    default?: TokenValue;
    subtle?: TokenValue;
    brand?: TokenValue;
    brandSubtle?: TokenValue;
    [key: string]: TokenValue | undefined;
  };
  border?: {
    default?: TokenValue;
    strong?: TokenValue;
    brand?: TokenValue;
    error?: TokenValue;
    disabled?: TokenValue;
    [key: string]: TokenValue | undefined;
  };
  text?: {
    primary?: TokenValue;
    secondary?: TokenValue;
    placeholder?: TokenValue;
    onBrand?: TokenValue;
    error?: TokenValue;
    [key: string]: TokenValue | undefined;
  };
  status?: {
    success?: TokenValue;
    warning?: TokenValue;
    error?: TokenValue;
    info?: TokenValue;
    [key: string]: TokenValue | undefined;
  };
}

export interface TypographySet {
  display: {
    large: TokenValue;
    medium: TokenValue;
    small: TokenValue;
  };
  heading: {
    xlarge: TokenValue;
    large: TokenValue;
    medium: TokenValue;
    small: TokenValue;
  };
  body: {
    large: TokenValue;
    medium: TokenValue;
    small: TokenValue;
  };
  label: {
    large: TokenValue;
    medium: TokenValue;
  };
}

export interface ComponentTokens {
  [key: string]: TokenValue | { [key: string]: TokenValue };
}

export interface GeneratedTokens {
  global: {
    fontSize: {
      [key: string]: TokenValue;
    };
    fontWeight: {
      [key: string]: TokenValue;
    };
    lineHeight: {
      [key: string]: TokenValue;
    };
    color: ColorPrimitives;
    spacing: SpacingTokens;
    radius: RadiusTokens;
  };
  typography: TypographySet;
  light: ThemeSet;
  dark: ThemeSet;
  components: {
    button?: ComponentTokens;
    input?: ComponentTokens;
    textarea?: ComponentTokens;
    select?: ComponentTokens;
    checkbox?: ComponentTokens;
    radio?: ComponentTokens;
    switch?: ComponentTokens;
    tag?: ComponentTokens;
    card?: ComponentTokens;
    badge?: ComponentTokens;
    progress?: ComponentTokens;
    slider?: ComponentTokens;
    [key: string]: ComponentTokens | undefined;
  };
}

export interface FontConfig {
  primaryFont: string;
  monoFont: string;
  baseFontSize: number;
  scaleRatio: number;
}

export interface ThemeMode {
  mode: 'light' | 'dark';
}

export type ColorScale = {
  [scale: string]: string;
};
