import { create } from 'zustand';
import { ComponentConfig, GeneratedTokens, FontConfig, ThemeMode } from '../types/tokens';
import { generateTokens } from '../utils/color/tokens';

export type EditMode = 'color' | 'typography';

interface TokenState {
  themeColor: string;
  scaleCount: number;
  fontConfig: FontConfig;
  tokens: GeneratedTokens;
  mode: 'light' | 'dark';
  editMode: EditMode;
  showJsonPreview: boolean;
  componentConfigs: ComponentConfig[];
  setThemeColor: (color: string) => void;
  setFontConfig: (config: Partial<FontConfig>) => void;
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
  setEditMode: (mode: EditMode) => void;
  setShowJsonPreview: (show: boolean) => void;
  setComponentConfigs: (configs: ComponentConfig[]) => void;
  refreshTokens: () => void;
}

const defaultFontConfig: FontConfig = {
  primaryFont: 'Inter, system-ui, sans-serif',
  monoFont: 'JetBrains Mono, monospace',
  baseFontSize: 16,
  scaleRatio: 1.25,
};

const SCALE_COUNT = 10;

export const useTokenStore = create<TokenState>((set, get) => ({
  themeColor: '#3b82f6',
  scaleCount: SCALE_COUNT,
  fontConfig: defaultFontConfig,
  tokens: generateTokens('#3b82f6', defaultFontConfig),
  mode: 'light',
  editMode: 'color',
  showJsonPreview: false,
  componentConfigs: [],
  
  setThemeColor: (color: string) =>
    set((state) => ({
      themeColor: color,
      tokens: generateTokens(color, state.fontConfig, state.componentConfigs),
    })),

  setFontConfig: (config: Partial<FontConfig>) =>
    set((state) => {
      const newConfig = { ...state.fontConfig, ...config };
      return {
        fontConfig: newConfig,
        tokens: generateTokens(state.themeColor, newConfig, state.componentConfigs),
      };
    }),

  setMode: (mode: 'light' | 'dark') => set({ mode }),

  toggleMode: () =>
    set((state) => ({
      mode: state.mode === 'light' ? 'dark' : 'light',
    })),

  setEditMode: (editMode: EditMode) => set({ editMode }),

  setShowJsonPreview: (showJsonPreview: boolean) => set({ showJsonPreview }),

  setComponentConfigs: (configs: ComponentConfig[]) =>
    set((state) => ({
      componentConfigs: configs,
      tokens: generateTokens(state.themeColor, state.fontConfig, configs),
    })),

  refreshTokens: () => {
    const state = get();
    set({
      tokens: generateTokens(state.themeColor, state.fontConfig, state.componentConfigs),
    });
  },
}));