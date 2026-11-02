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

/** Something the ELUM team posted from the ELUM Console (elum.incidents). */
export interface Incident {
  id: string;
  service: string;
  severity: 'maintenance' | 'degraded' | 'outage';
  title: string;
  message: string;
  startedAt: string;
  endedAt: string | null;
}

export interface Status {
  checkedAt: string;
  overall: Health;
  checks: Check[];
  /** Open incidents first, then those that ended in the last 14 days. */
  incidents?: Incident[];
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

/**
 * The worst of the checks and the open incidents: one down (or an open outage) makes the whole
 * page say so; something slow, or an open degraded incident or maintenance, makes it slow.
 */
export function overall(checks: Check[], incidents: Incident[] = []): Health {
  const open = incidents.filter((i) => !i.endedAt);
  if (checks.some((c) => c.health === 'down') || open.some((i) => i.severity === 'outage')) return 'down';
  if (checks.some((c) => c.health === 'slow') || open.length) return 'slow';
  return 'up';
}

/**
 * A service the ELUM team put into a mode from the Console. Maintenance shows as down (people
 * cannot use it), read only as slow, each with the team's message.
 */
export function withMode(check: Check, mode: string | undefined, message: string | undefined): Check {
  if (mode === 'maintenance') return { ...check, health: 'down', note: message ? `Maintenance: ${message}` : 'Down for maintenance' };
  if (mode === 'read_only') return { ...check, health: check.health === 'down' ? 'down' : 'slow', note: message ? `Read only: ${message}` : 'Read only for now' };
  if (mode === 'notice' && message && check.health === 'up') return { ...check, note: message };
  return check;
}

export const DEFAULT_SITES: { id: string; name: string; url: string }[] = [
  { id: 'write', name: 'Write', url: 'https://writebyelum.netlify.app' },
  { id: 'type', name: 'Type', url: 'https://typebyelum.netlify.app' },
  { id: 'make', name: 'Make', url: 'https://makebyelum.netlify.app' },
  { id: 'account', name: 'Account', url: 'https://accountsbyelum.netlify.app' },
  { id: 'browse', name: 'Browse', url: 'https://browsebyelum.netlify.app' },
  { id: 'store', name: 'Store', url: 'https://storebyelum.netlify.app' },
  { id: 'inquire', name: 'Inquire', url: 'https://inquirebyelum.netlify.app' },
  { id: 'tune', name: 'Tune', url: 'https://tunebyelum.netlify.app' },
  { id: 'code', name: 'Code', url: 'https://codebyelum.netlify.app' },
  { id: 'capture', name: 'Capture', url: 'https://capturebyelum.netlify.app' },
  { id: 'home', name: 'ELUM site', url: 'https://elum.netlify.app' },
];

/**
 * ELUM_STATUS_SITES, as id=url pairs separated by commas, changes where a default site is checked
 * (by its id) or adds another. Every default app is always checked, so a new app is never missed.
 */
export function parseSites(value: string | undefined): { id: string; name: string; url: string }[] {
  const given = (value ?? '')
    .split(',')
    .map((pair) => pair.trim().split('='))
    .filter(([id, url]) => id && url && /^https:\/\//.test(url.trim()))
    .map(([id, url]) => ({ id: id.trim(), name: id.trim()[0].toUpperCase() + id.trim().slice(1), url: url.trim().replace(/\/+$/, '') }));
  const merged = DEFAULT_SITES.map((d) => {
    const over = given.find((g) => g.id === d.id);
    return over ? { ...d, url: over.url } : d;
  });
  return [...merged, ...given.filter((g) => !DEFAULT_SITES.some((d) => d.id === g.id))];
}
