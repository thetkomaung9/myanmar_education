/**
 * Design Token type definitions used across the EduSphere Myanmar design system.
 * These types mirror the Tailwind theme configuration and serve as the
 * contract between design and implementation.
 */

export interface ColorToken {
  /** Human-readable token name, e.g. "brand-600" */
  name: string;
  /** CSS color value, e.g. "hsl(234, 75%, 50%)" */
  value: string;
  /** Token category grouping */
  category: 'brand' | 'accent' | 'neutral' | 'semantic' | 'background';
}

export interface SpacingToken {
  /** Human-readable token name, e.g. "space-4" */
  name: string;
  /**
   * Pixel value of the spacing token.
   * Invariant: value % 4 === 0  (all spacing is on the 4px grid)
   */
  value: number;
}

// ── Concrete token values (mirroring tailwind.config.ts) ─────────────────────

export const brandColorTokens: ColorToken[] = [
  { name: 'brand-50', value: 'hsl(240, 100%, 97%)', category: 'brand' },
  { name: 'brand-100', value: 'hsl(240, 92%, 93%)', category: 'brand' },
  { name: 'brand-200', value: 'hsl(238, 90%, 85%)', category: 'brand' },
  { name: 'brand-400', value: 'hsl(236, 82%, 65%)', category: 'brand' },
  { name: 'brand-600', value: 'hsl(234, 75%, 50%)', category: 'brand' },
  { name: 'brand-800', value: 'hsl(232, 70%, 35%)', category: 'brand' },
  { name: 'brand-900', value: 'hsl(230, 65%, 22%)', category: 'brand' },
];

export const accentColorTokens: ColorToken[] = [
  { name: 'accent-400', value: 'hsl(270, 70%, 60%)', category: 'accent' },
  { name: 'accent-600', value: 'hsl(268, 65%, 45%)', category: 'accent' },
];

export const neutralColorTokens: ColorToken[] = [
  { name: 'neutral-50', value: '#F9FAFB', category: 'neutral' },
  { name: 'neutral-100', value: '#F3F4F6', category: 'neutral' },
  { name: 'neutral-200', value: '#E5E7EB', category: 'neutral' },
  { name: 'neutral-400', value: '#9CA3AF', category: 'neutral' },
  { name: 'neutral-600', value: '#4B5563', category: 'neutral' },
  { name: 'neutral-800', value: '#1F2937', category: 'neutral' },
  { name: 'neutral-900', value: '#111827', category: 'neutral' },
];

export const semanticColorTokens: ColorToken[] = [
  { name: 'semantic-success', value: 'hsl(142, 71%, 45%)', category: 'semantic' },
  { name: 'semantic-warning', value: 'hsl(38, 92%, 50%)', category: 'semantic' },
  { name: 'semantic-error', value: 'hsl(0, 84%, 55%)', category: 'semantic' },
  { name: 'semantic-info', value: 'hsl(217, 91%, 60%)', category: 'semantic' },
];

export const backgroundColorTokens: ColorToken[] = [
  { name: 'background-default', value: '#FFFFFF', category: 'background' },
  { name: 'background-dark', value: '#0F172A', category: 'background' },
];

export const allColorTokens: ColorToken[] = [
  ...brandColorTokens,
  ...accentColorTokens,
  ...neutralColorTokens,
  ...semanticColorTokens,
  ...backgroundColorTokens,
];

/**
 * Spacing tokens — all values satisfy `value % 4 === 0`.
 * Values are in pixels, matching Tailwind's default spacing scale
 * (1 unit = 4px) plus explicit extended tokens.
 */
export const spacingTokens: SpacingToken[] = [
  { name: 'space-0', value: 0 },
  { name: 'space-1', value: 4 },
  { name: 'space-2', value: 8 },
  { name: 'space-3', value: 12 },
  { name: 'space-4', value: 16 },
  { name: 'space-5', value: 20 },
  { name: 'space-6', value: 24 },
  { name: 'space-7', value: 28 },
  { name: 'space-8', value: 32 },
  { name: 'space-9', value: 36 },
  { name: 'space-10', value: 40 },
  { name: 'space-11', value: 44 }, // touch target minimum
  { name: 'space-12', value: 48 },
  { name: 'space-14', value: 56 },
  { name: 'space-16', value: 64 },
  { name: 'space-18', value: 72 },
  { name: 'space-20', value: 80 },
  { name: 'space-22', value: 88 }, // textarea min-height
  { name: 'space-24', value: 96 },
  { name: 'space-28', value: 112 },
  { name: 'space-32', value: 128 },
  { name: 'space-36', value: 144 },
  { name: 'space-40', value: 160 },
  { name: 'space-44', value: 176 },
  { name: 'space-48', value: 192 },
  { name: 'space-52', value: 208 },
  { name: 'space-56', value: 224 },
  { name: 'space-60', value: 240 },
  { name: 'space-64', value: 256 },
  { name: 'space-72', value: 288 },
  { name: 'space-80', value: 320 },
  { name: 'space-96', value: 384 },
];
