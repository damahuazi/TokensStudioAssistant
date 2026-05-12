import { create } from 'zustand';
import { GeneratedTokens, FontConfig, ThemeMode } from '../types/tokens';
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
  setThemeColor: (color: string) => void;
  setScaleCount: (count: number) => void;
  setFontConfig: (config: Partial<FontConfig>) => void;
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
  setEditMode: (mode: EditMode) => void;
  setShowJsonPreview: (show: boolean) => void;
}

const defaultFontConfig: FontConfig = {
  primaryFont: 'Inter, system-ui, sans-serif',
  monoFont: 'JetBrains Mono, monospace',
  baseFontSize: 16,
  scaleRatio: 1.25,
};

export const useTokenStore = create<TokenState>((set) => ({
  themeColor: '#3b82f6',
  scaleCount: 10,
  fontConfig: defaultFontConfig,
  tokens: generateTokens('#3b82f6', 10, defaultFontConfig),
  mode: 'light',
  editMode: 'color',
  showJsonPreview: false,
  
  setThemeColor: (color: string) =>
    set((state) => ({
      themeColor: color,
      tokens: generateTokens(color, state.scaleCount, state.fontConfig),
    })),

  setScaleCount: (count: number) =>
    set((state) => ({
      scaleCount: count,
      tokens: generateTokens(state.themeColor, count, state.fontConfig),
    })),

  setFontConfig: (config: Partial<FontConfig>) =>
    set((state) => {
      const newConfig = { ...state.fontConfig, ...config };
      return {
        fontConfig: newConfig,
        tokens: generateTokens(state.themeColor, state.scaleCount, newConfig),
      };
    }),

  setMode: (mode: 'light' | 'dark') => set({ mode }),

  toggleMode: () =>
    set((state) => ({
      mode: state.mode === 'light' ? 'dark' : 'light',
    })),

  setEditMode: (editMode: EditMode) => set({ editMode }),

  setShowJsonPreview: (showJsonPreview: boolean) => set({ showJsonPreview }),
}));
