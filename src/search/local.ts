/**
 * What Browse keeps in this browser only: recent searches and the SafeSearch choice. Nothing here
 * reaches ELUM's servers; searches go to Google through the browse-search function and are not stored.
 */

const HISTORY_KEY = 'elum.browse.recent';
const SAFE_KEY = 'elum.browse.safe';
const PAUSED_KEY = 'elum.browse.history-paused';
export const HISTORY_LIMIT = 12;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private browsing or a full disk: Browse still works, it just forgets.
  }
}

export function recentSearches(): string[] {
  const list = read<unknown>(HISTORY_KEY, []);
  return Array.isArray(list) ? list.filter((q): q is string => typeof q === 'string').slice(0, HISTORY_LIMIT) : [];
}

/** Remembers a search at the top of the list, once. Does nothing while history is paused. */
export function rememberSearch(q: string): string[] {
  const clean = q.replace(/\s+/g, ' ').trim();
  if (!clean || historyPaused()) return recentSearches();
  const next = [clean, ...recentSearches().filter((x) => x.toLowerCase() !== clean.toLowerCase())].slice(0, HISTORY_LIMIT);
  write(HISTORY_KEY, next);
  return next;
}

export function forgetSearch(q: string): string[] {
  const next = recentSearches().filter((x) => x !== q);
  write(HISTORY_KEY, next);
  return next;
}

export function clearSearches() {
  write(HISTORY_KEY, []);
}

export function historyPaused(): boolean {
  return read<boolean>(PAUSED_KEY, false) === true;
}

export function setHistoryPaused(paused: boolean) {
  write(PAUSED_KEY, paused);
  if (paused) clearSearches();
}

/** SafeSearch is on unless someone turns it off. */
export function safeSearch(): boolean {
  return read<boolean>(SAFE_KEY, true) !== false;
}

export function setSafeSearch(on: boolean) {
  write(SAFE_KEY, on);
}
