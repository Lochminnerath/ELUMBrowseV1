import { describe, expect, it } from 'vitest';
import { LIVE_PRODUCTS, PRODUCTS } from './content';
import { allTroubles, COMMON_TROUBLES, GUIDES, searchTroubles, TROUBLES } from './help';

describe('ELUM Docs help', () => {
  it('has guides and troubleshooting for every app', () => {
    for (const p of LIVE_PRODUCTS) {
      expect(GUIDES[p.id].length, p.id).toBeGreaterThanOrEqual(3);
      expect(TROUBLES[p.id].length, p.id).toBeGreaterThanOrEqual(5);
      for (const t of TROUBLES[p.id]) {
        expect(t.why, t.problem).not.toBe('');
        expect(t.fix.length, t.problem).toBeGreaterThan(0);
      }
    }
    expect(COMMON_TROUBLES.length).toBeGreaterThanOrEqual(40);
    expect(allTroubles().length).toBeGreaterThanOrEqual(186);
  });

  it('covers every app well', () => {
    for (const p of LIVE_PRODUCTS) expect(TROUBLES[p.id].length, p.id).toBeGreaterThanOrEqual(14);
  });

  it('never repeats a problem across every app', () => {
    const common = COMMON_TROUBLES.map((t) => t.problem);
    expect(new Set(common).size).toBe(common.length);
  });

  it('shows Tune as coming soon, with nothing it can’t do yet', () => {
    const tune = PRODUCTS.find((p) => p.id === 'tune');
    expect(tune?.soon).toBe(true);
    expect(tune?.color).toBe('#48bfe3');
    expect(tune?.steps).toEqual([]);
    expect(tune?.features).toEqual([]);
    expect(LIVE_PRODUCTS.some((p) => p.id === ('tune' as string))).toBe(false);
  });

  it('answers the questions people ask most', () => {
    for (const q of ['passkey', 'nearby', 'approval email', 'version history', 'brand kit', 'private browsing', 'delete my account', 'notifications', 'What’s new', 'offline'])
      expect(searchTroubles(q).length, q).toBeGreaterThan(0);
  });

  it('never repeats a problem within an app', () => {
    for (const p of LIVE_PRODUCTS) {
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
