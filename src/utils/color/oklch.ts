import { parse, format, oklch, converter, rgb } from 'culori';

export const hexToOklch = (hex: string): { l: number; c: number; h: number } => {
  const color = parse(hex);
  if (!color) return { l: 0.5, c: 0, h: 0 };
  
  const oklchColor = oklch(color);
  return {
    l: oklchColor.l ?? 0,
    c: oklchColor.c ?? 0,
    h: oklchColor.h ?? 0,
  };
};

export const oklchToHex = (l: number, c: number, h: number): string => {
  try {
    const color = { mode: 'oklch' as const, l, c, h };
    const toRgb = converter('rgb');
    const rgbColor = toRgb(color);
    
    if (!rgbColor) return '#000000';
    
    const clamp = (val: number) => Math.max(0, Math.min(1, val));
    const r = Math.round(clamp(rgbColor.r ?? 0) * 255);
    const g = Math.round(clamp(rgbColor.g ?? 0) * 255);
    const b = Math.round(clamp(rgbColor.b ?? 0) * 255);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } catch {
    return '#000000';
  }
};

export const generateColorScale = (
  baseHex: string,
  count: number = 11
): { [key: string]: string } => {
  const { l: baseL, c: baseC, h: baseH } = hexToOklch(baseHex);
  const scale: { [key: string]: string } = {};
  
  const lightnessSteps = [
    0.97, 0.93, 0.86, 0.76, 0.65, 0.54, 0.44, 0.35, 0.26, 0.18, 0.10
  ];
  
  const scaleKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
  
  // 找到与输入颜色最接近的色阶位置
  let closestIndex = 5; // 默认 500
  let minDiff = Math.abs(lightnessSteps[5] - baseL);
  for (let i = 0; i < lightnessSteps.length; i++) {
    const diff = Math.abs(lightnessSteps[i] - baseL);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }
  
  for (let i = 0; i < Math.min(count, 11); i++) {
    if (i === closestIndex) {
      // 在最接近的位置直接使用输入的颜色
      scale[scaleKeys[i]] = baseHex;
    } else {
      const targetL = lightnessSteps[i];
      const diffL = targetL - baseL;
      const newC = Math.max(0, baseC * (1 - Math.abs(diffL) * 0.3));
      scale[scaleKeys[i]] = oklchToHex(targetL, newC, baseH);
    }
  }
  
  return scale;
};

export const generateNeutralScale = (
  baseHex: string,
  count: number = 11
): { [key: string]: string } => {
  const scale: { [key: string]: string } = {};
  
  const lightnessSteps = [
    0.98, 0.96, 0.92, 0.82, 0.70, 0.58, 0.46, 0.36, 0.26, 0.16, 0.10
  ];
  
  const scaleKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
  
  for (let i = 0; i < Math.min(count, 11); i++) {
    const l = lightnessSteps[i];
    const grayHex = oklchToHex(l, 0, 0);
    scale[scaleKeys[i]] = grayHex;
  }
  
  return scale;
};

export const generateFixedColorScale = (
  baseHue: number,
  baseChroma: number,
  count: number = 11
): { [key: string]: string } => {
  const scale: { [key: string]: string } = {};
  
  const lightnessSteps = [
    0.97, 0.93, 0.86, 0.76, 0.65, 0.54, 0.44, 0.35, 0.26, 0.18, 0.10
  ];
  
  const scaleKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
  
  for (let i = 0; i < Math.min(count, 11); i++) {
    const l = lightnessSteps[i];
    const c = Math.max(0, baseChroma * (1 - Math.abs(l - 0.5) * 0.4));
    scale[scaleKeys[i]] = oklchToHex(l, c, baseHue);
  }
  
  return scale;
};

export const generateSuccessScale = (baseHex: string, count: number = 11) => {
  return generateFixedColorScale(145, 0.25, count);
};

export const generateWarningScale = (baseHex: string, count: number = 11) => {
  return generateFixedColorScale(70, 0.26, count);
};

export const generateErrorScale = (baseHex: string, count: number = 11) => {
  return generateFixedColorScale(25, 0.28, count);
};

export const generateInfoScale = (baseHex: string, count: number = 11) => {
  return generateFixedColorScale(220, 0.22, count);
};
