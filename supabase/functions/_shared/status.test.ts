import { describe, expect, it } from 'vitest';
import { DEFAULT_SITES, overall, parseSites, siteHealth, withMode, type Check } from './status';

const check = (health: Check['health']): Check => ({ id: 'x', name: 'X', group: 'apps', health, ms: 10, note: '' });

describe('siteHealth', () => {
  it('counts a login wall as up, and server errors or silence as down', () => {
    expect(siteHealth(200, 120).health).toBe('up');
    expect(siteHealth(401, 120)).toEqual({ health: 'up', note: 'Up, behind a login' });
    expect(siteHealth(503, 120).health).toBe('down');
    expect(siteHealth(null, 8000).health).toBe('down');
  });

  it('calls a slow answer slow', () => {
    expect(siteHealth(200, 4200)).toEqual({ health: 'slow', note: 'Slow to answer (4.2 s)' });
  });
});

describe('overall', () => {
  it('is as bad as the worst check', () => {
    expect(overall([check('up'), check('up')])).toBe('up');
    expect(overall([check('up'), check('slow')])).toBe('slow');
    expect(overall([check('slow'), check('down')])).toBe('down');
  });
});

describe('incidents and modes', () => {
  const up: Check = { id: 'capture', name: 'Capture', group: 'apps', health: 'up', ms: 100, note: 'Working' };
  it('an open outage makes ELUM down, an ended one does not', () => {
    const inc = { id: '1', service: 'capture', severity: 'outage' as const, title: 't', message: '', startedAt: '2026-11-02T00:00:00Z', endedAt: null };
    expect(overall([up], [inc])).toBe('down');
    expect(overall([up], [{ ...inc, endedAt: '2026-11-02T01:00:00Z' }])).toBe('up');
    expect(overall([up], [{ ...inc, severity: 'maintenance' }])).toBe('slow');
  });
  it('maintenance and read only change the row', () => {
    expect(withMode(up, 'maintenance', 'Back at 3')).toMatchObject({ health: 'down', note: 'Maintenance: Back at 3' });
    expect(withMode(up, 'read_only', '')).toMatchObject({ health: 'slow', note: 'Read only for now' });
    expect(withMode(up, 'normal', '')).toBe(up);
  });
});

describe('parseSites', () => {
  it('moves default sites by id, adds others, and always checks every ELUM app', () => {
    const sites = parseSites('write=https://write.elum.space/, extra=https://extra.elum.space');
    expect(sites.find((s) => s.id === 'write')).toEqual({ id: 'write', name: 'Write', url: 'https://write.elum.space' });
    expect(sites.at(-1)).toEqual({ id: 'extra', name: 'Extra', url: 'https://extra.elum.space' });
    expect(sites.map((s) => s.id)).toEqual(expect.arrayContaining(['type', 'tune', 'code', 'capture', 'inquire']));
    expect(parseSites('nonsense, x=http://insecure.example')).toEqual(DEFAULT_SITES);
    expect(parseSites(undefined)).toEqual(DEFAULT_SITES);
  });
});
