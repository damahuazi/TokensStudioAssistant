export interface TokenValue {
  value: string;
  type: string;
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

export interface GlobalTokens {
  color: ColorPrimitives;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
}

export interface SemanticTokens {
  [theme: string]: {
    background?: {
      [key: string]: TokenValue;
    };
    foreground?: {
      [key: string]: TokenValue;
    };
    border?: {
      [key: string]: TokenValue;
    };
    accent?: {
      [key: string]: TokenValue;
    };
    status?: {
      [key: string]: TokenValue;
    };
  };
}

export interface ComponentTokens {
  input: {
    [key: string]: TokenValue;
  };
  button: {
    [variant: string]: {
      [key: string]: TokenValue;
    };
  };
}

export interface GeneratedTokens {
  global: GlobalTokens;
  semantic: SemanticTokens;
  components: ComponentTokens;
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
