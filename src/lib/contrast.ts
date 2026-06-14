/**
 * WCAG contrast ratio utilities.
 * Used to verify Design System color token pairs meet accessibility requirements.
 * Validates: Requirements 1.5, 17.4
 */

/**
 * Parse a CSS color string to RGB components [r, g, b] in the 0–255 range.
 * Supports: hex (#RGB, #RRGGBB) and hsl(h, s%, l%) formats.
 */
export function parseColorToRgb(color: string): [number, number, number] | null {
  color = color.trim();

  // Hex
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return [r, g, b];
    }
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return [r, g, b];
    }
  }

  // hsl(h, s%, l%) or hsl(h s% l%)
  const hslMatch = color.match(
    /hsl\(\s*([\d.]+)\s*,?\s*([\d.]+)%\s*,?\s*([\d.]+)%\s*\)/i
  );
  if (hslMatch) {
    const h = parseFloat(hslMatch[1]) / 360;
    const s = parseFloat(hslMatch[2]) / 100;
    const l = parseFloat(hslMatch[3]) / 100;
    return hslToRgb(h, s, l);
  }

  return null;
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

/**
 * Calculate the relative luminance of an sRGB color.
 * Per WCAG 2.1 definition: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function relativeLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number): number => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Calculate the WCAG 2.1 contrast ratio between two colors.
 * Returns a value between 1 (no contrast) and 21 (maximum contrast).
 */
export function contrastRatio(color1: string, color2: string): number {
  const rgb1 = parseColorToRgb(color1);
  const rgb2 = parseColorToRgb(color2);

  if (!rgb1 || !rgb2) {
    throw new Error(
      `Unable to parse colors for contrast calculation: "${color1}", "${color2}"`
    );
  }

  const l1 = relativeLuminance(...rgb1);
  const l2 = relativeLuminance(...rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if a color pair meets WCAG 2.1 AA normal text contrast (≥ 4.5:1).
 */
export function meetsNormalTextContrast(fg: string, bg: string): boolean {
  return contrastRatio(fg, bg) >= 4.5;
}

/**
 * Check if a color pair meets WCAG 2.1 AA large text / UI component contrast (≥ 3:1).
 */
export function meetsLargeTextContrast(fg: string, bg: string): boolean {
  return contrastRatio(fg, bg) >= 3.0;
}
