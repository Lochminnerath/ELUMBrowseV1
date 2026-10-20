import { describe, expect, it } from 'vitest';
import { PRODUCTS } from './content';
import { allTroubles, COMMON_TROUBLES, GUIDES, searchTroubles, TROUBLES } from './help';

describe('ELUM Docs help', () => {
  it('has guides and troubleshooting for every app', () => {
    for (const p of PRODUCTS) {
      expect(GUIDES[p.id].length, p.id).toBeGreaterThanOrEqual(3);
      expect(TROUBLES[p.id].length, p.id).toBeGreaterThanOrEqual(5);
      for (const t of TROUBLES[p.id]) {
        expect(t.why, t.problem).not.toBe('');
        expect(t.fix.length, t.problem).toBeGreaterThan(0);
      }
    }
    expect(COMMON_TROUBLES.length).toBeGreaterThanOrEqual(5);
  });

  it('never repeats a problem within an app', () => {
    for (const p of PRODUCTS) {
      const names = TROUBLES[p.id].map((t) => t.problem);
      expect(new Set(names).size, p.id).toBe(names.length);
    }
  });

  it('finds a problem by the message on screen', () => {
    const found = searchTroubles('That export did not work');
    expect(found.map((f) => f.product)).toEqual(['make']);
    expect(searchTroubles('session has ended')[0].product).toBeNull();
    expect(searchTroubles('')).toHaveLength(allTroubles().length);
    expect(searchTroubles('zzzz nothing')).toEqual([]);
  });
});
