import { describe, it, expect } from 'vitest';
import { spacingTokens, allColorTokens } from '@/lib/designTokens';
import { cn } from '@/lib/utils';
import { contrastRatio } from '@/lib/contrast';

describe('Project structure smoke tests', () => {
  it('cn utility merges Tailwind classes correctly', () => {
    expect(cn('px-4 py-2', 'px-6')).toBe('py-2 px-6');
  });

  it('spacingTokens are all defined', () => {
    expect(spacingTokens.length).toBeGreaterThan(0);
  });

  it('all spacing tokens are multiples of 4', () => {
    for (const token of spacingTokens) {
      expect(token.value % 4).toBe(0);
    }
  });

  it('allColorTokens are all defined', () => {
    expect(allColorTokens.length).toBeGreaterThan(0);
  });

  it('contrastRatio returns a number >= 1', () => {
    const ratio = contrastRatio('#FFFFFF', '#000000');
    expect(ratio).toBeCloseTo(21, 0);
  });
});
