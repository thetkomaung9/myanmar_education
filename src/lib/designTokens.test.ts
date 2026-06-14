/**
 * Unit tests for designTokens.ts
 *
 * Validates that:
 *  - ColorToken and SpacingToken shapes are correctly formed
 *  - Every spacing token satisfies `value % 4 === 0` (Requirements 1.3)
 *  - All custom Tailwind spacing values are multiples of 4px
 *  - allColorTokens contains tokens from every category
 */
import { describe, it, expect } from 'vitest';
import {
  allColorTokens,
  brandColorTokens,
  accentColorTokens,
  neutralColorTokens,
  semanticColorTokens,
  backgroundColorTokens,
  spacingTokens,
  type ColorToken,
  type SpacingToken,
} from './designTokens';

// ── ColorToken tests ─────────────────────────────────────────────────────────

describe('ColorToken types and values', () => {
  it('allColorTokens is non-empty', () => {
    expect(allColorTokens.length).toBeGreaterThan(0);
  });

  it('allColorTokens covers every required category', () => {
    const categories = new Set(allColorTokens.map((t) => t.category));
    expect(categories).toContain('brand');
    expect(categories).toContain('accent');
    expect(categories).toContain('neutral');
    expect(categories).toContain('semantic');
    expect(categories).toContain('background');
  });

  it('every ColorToken has a non-empty name', () => {
    for (const token of allColorTokens) {
      expect(token.name.length).toBeGreaterThan(0);
    }
  });

  it('every ColorToken has a non-empty value', () => {
    for (const token of allColorTokens) {
      expect(token.value.length).toBeGreaterThan(0);
    }
  });

  it('every ColorToken category is one of the allowed literals', () => {
    const allowed = new Set<string>(['brand', 'accent', 'neutral', 'semantic', 'background']);
    for (const token of allColorTokens) {
      expect(allowed.has(token.category)).toBe(true);
    }
  });

  it('brandColorTokens has all required shade steps (50–900)', () => {
    const shades = brandColorTokens.map((t) => t.name);
    expect(shades).toContain('brand-50');
    expect(shades).toContain('brand-100');
    expect(shades).toContain('brand-200');
    expect(shades).toContain('brand-400');
    expect(shades).toContain('brand-600');
    expect(shades).toContain('brand-800');
    expect(shades).toContain('brand-900');
  });

  it('accentColorTokens has 400 and 600 shades', () => {
    const names = accentColorTokens.map((t) => t.name);
    expect(names).toContain('accent-400');
    expect(names).toContain('accent-600');
  });

  it('neutralColorTokens has all required shade steps', () => {
    const names = neutralColorTokens.map((t) => t.name);
    expect(names).toContain('neutral-50');
    expect(names).toContain('neutral-100');
    expect(names).toContain('neutral-200');
    expect(names).toContain('neutral-400');
    expect(names).toContain('neutral-600');
    expect(names).toContain('neutral-800');
    expect(names).toContain('neutral-900');
  });

  it('semanticColorTokens has success, warning, error, info', () => {
    const names = semanticColorTokens.map((t) => t.name);
    expect(names).toContain('semantic-success');
    expect(names).toContain('semantic-warning');
    expect(names).toContain('semantic-error');
    expect(names).toContain('semantic-info');
  });

  it('backgroundColorTokens has DEFAULT and dark', () => {
    const names = backgroundColorTokens.map((t) => t.name);
    expect(names).toContain('background-default');
    expect(names).toContain('background-dark');
  });

  it('allColorTokens equals the union of all category arrays', () => {
    const expected = [
      ...brandColorTokens,
      ...accentColorTokens,
      ...neutralColorTokens,
      ...semanticColorTokens,
      ...backgroundColorTokens,
    ];
    expect(allColorTokens).toHaveLength(expected.length);
    expect(allColorTokens).toEqual(expect.arrayContaining(expected));
  });

  it('token names are unique across allColorTokens', () => {
    const names = allColorTokens.map((t) => t.name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });
});

// ── SpacingToken tests ───────────────────────────────────────────────────────

describe('SpacingToken — 4px grid constraint (Requirements 1.3)', () => {
  it('spacingTokens is non-empty', () => {
    expect(spacingTokens.length).toBeGreaterThan(0);
  });

  it('every spacing token value is a non-negative integer', () => {
    for (const token of spacingTokens) {
      expect(Number.isInteger(token.value)).toBe(true);
      expect(token.value).toBeGreaterThanOrEqual(0);
    }
  });

  it('EVERY spacing token value satisfies value % 4 === 0', () => {
    // Core invariant from Requirements 1.3 and design doc Property 1
    for (const token of spacingTokens) {
      expect(token.value % 4, `${token.name} (${token.value}px) is not a multiple of 4`).toBe(0);
    }
  });

  it('every SpacingToken has a non-empty name', () => {
    for (const token of spacingTokens) {
      expect(token.name.length).toBeGreaterThan(0);
    }
  });

  it('token names are unique across spacingTokens', () => {
    const names = spacingTokens.map((t) => t.name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });

  it('includes the touch-target minimum (44px)', () => {
    const t = spacingTokens.find((s) => s.value === 44);
    expect(t).toBeDefined();
    expect(t!.name).toBe('space-11');
  });

  it('includes the textarea min-height token (88px)', () => {
    const t = spacingTokens.find((s) => s.value === 88);
    expect(t).toBeDefined();
    expect(t!.name).toBe('space-22');
  });

  it('includes the extended 72px token', () => {
    const t = spacingTokens.find((s) => s.value === 72);
    expect(t).toBeDefined();
    expect(t!.name).toBe('space-18');
  });
});

// ── Custom Tailwind spacing values compliance ────────────────────────────────

describe('Custom Tailwind spacing values — multiples of 4px', () => {
  /**
   * These are the explicit spacing overrides in tailwind.config.ts.
   * Each rem value is converted to px using 1rem = 16px.
   */
  const customTailwindSpacing: Array<{ key: string; rem: number; expectedPx: number }> = [
    { key: '11', rem: 2.75, expectedPx: 44 },
    { key: '18', rem: 4.5, expectedPx: 72 },
    { key: '22', rem: 5.5, expectedPx: 88 },
  ];

  it('all custom Tailwind spacing entries are multiples of 4px', () => {
    for (const { key, rem, expectedPx } of customTailwindSpacing) {
      const px = rem * 16;
      expect(px, `spacing[${key}]: ${rem}rem = ${px}px is not a multiple of 4`).toBe(expectedPx);
      expect(px % 4, `spacing[${key}]: ${px}px is not a multiple of 4`).toBe(0);
    }
  });

  it('custom Tailwind spacing entries are reflected in spacingTokens array', () => {
    for (const { expectedPx } of customTailwindSpacing) {
      const match = spacingTokens.find((t) => t.value === expectedPx);
      expect(
        match,
        `No SpacingToken found for ${expectedPx}px (a custom Tailwind spacing value)`,
      ).toBeDefined();
    }
  });
});
