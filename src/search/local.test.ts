import { beforeEach, describe, expect, it } from 'vitest';
import { clearSearches, forgetSearch, HISTORY_LIMIT, recentSearches, rememberSearch, safeSearch, setHistoryPaused, setSafeSearch } from './local';

beforeEach(() => localStorage.clear());

describe('recent searches', () => {
  it('keeps the newest first, once each, up to a limit', () => {
    rememberSearch('cats');
    rememberSearch('dogs');
    rememberSearch('  Cats ');
    expect(recentSearches()).toEqual(['Cats', 'dogs']);
    for (let i = 0; i < 20; i++) rememberSearch(`q${i}`);
    expect(recentSearches()).toHaveLength(HISTORY_LIMIT);
  });

  it('forgets one or all', () => {
    rememberSearch('a');
    rememberSearch('b');
    expect(forgetSearch('a')).toEqual(['b']);
    clearSearches();
    expect(recentSearches()).toEqual([]);
  });

  it('remembers nothing while paused, and pausing clears it', () => {
    rememberSearch('a');
    setHistoryPaused(true);
    expect(recentSearches()).toEqual([]);
    rememberSearch('b');
    expect(recentSearches()).toEqual([]);
  });

  it('survives junk in storage', () => {
    localStorage.setItem('elum.browse.recent', '{not json');
    expect(recentSearches()).toEqual([]);
  });
});

describe('SafeSearch', () => {
  it('is on until turned off', () => {
    expect(safeSearch()).toBe(true);
    setSafeSearch(false);
    expect(safeSearch()).toBe(false);
  });
});
