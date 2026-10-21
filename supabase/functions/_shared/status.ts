/**
 * ELUM status: what each check found, in words people read on browse's /status page.
 * Plain TypeScript: runs in the elum-status edge function (Deno) and in tests (vitest).
 */

export type Health = 'up' | 'slow' | 'down';

export interface Check {
  id: string;
  name: string;
  group: 'apps' | 'platform' | 'search';
  health: Health;
  /** How long the check took, in milliseconds. */
  ms: number;
  note: string;
}

export interface Status {
  checkedAt: string;
  overall: Health;
  checks: Check[];
}

/** Slower than this is "slow" even when it answers. */
export const SLOW_MS = 2500;
/** A check that takes longer than this has failed. */
export const TIMEOUT_MS = 8000;

/**
 * A website's answer. Sites behind a Netlify login answer 401 to strangers; that still means the
 * site is up. Only server errors and no answer at all mean it is down.
 */
export function siteHealth(httpStatus: number | null, ms: number): { health: Health; note: string } {
  if (httpStatus === null) return { health: 'down', note: 'No answer' };
  if (httpStatus >= 500) return { health: 'down', note: `Server error ${httpStatus}` };
  const note = httpStatus === 401 || httpStatus === 403 ? 'Up, behind a login' : 'Working';
  return ms > SLOW_MS ? { health: 'slow', note: `Slow to answer (${(ms / 1000).toFixed(1)} s)` } : { health: 'up', note };
}

/** The worst of the checks: one down makes the whole page say so. */
export function overall(checks: Check[]): Health {
  if (checks.some((c) => c.health === 'down')) return 'down';
  if (checks.some((c) => c.health === 'slow')) return 'slow';
  return 'up';
}

export const DEFAULT_SITES: { id: string; name: string; url: string }[] = [
  { id: 'write', name: 'Write', url: 'https://elumwrite.netlify.app' },
  { id: 'type', name: 'Type', url: 'https://elumtype.netlify.app' },
  { id: 'make', name: 'Make', url: 'https://elummake.netlify.app' },
  { id: 'account', name: 'Account', url: 'https://elumaccounts.netlify.app' },
  { id: 'browse', name: 'Browse', url: 'https://elumbrowse.netlify.app' },
  { id: 'store', name: 'Store', url: 'https://elumstore.netlify.app' },
];

/** ELUM_STATUS_SITES, as id=url pairs separated by commas, replaces the default sites. */
export function parseSites(value: string | undefined): { id: string; name: string; url: string }[] {
  const list = (value ?? '')
    .split(',')
    .map((pair) => pair.trim().split('='))
    .filter(([id, url]) => id && url && /^https:\/\//.test(url.trim()))
    .map(([id, url]) => ({ id: id.trim(), name: id.trim()[0].toUpperCase() + id.trim().slice(1), url: url.trim().replace(/\/+$/, '') }));
  return list.length ? list : DEFAULT_SITES;
}
