import { describe, expect, it } from 'vitest';
import { DEFAULT_SITES, overall, parseSites, siteHealth, type Check } from './status';

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

describe('parseSites', () => {
  it('reads id=url pairs and falls back to the ELUM sites', () => {
    expect(parseSites('write=https://write.elum.services/, type=https://type.elum.services')).toEqual([
      { id: 'write', name: 'Write', url: 'https://write.elum.services' },
      { id: 'type', name: 'Type', url: 'https://type.elum.services' },
    ]);
    expect(parseSites('nonsense, x=http://insecure.example')).toEqual(DEFAULT_SITES);
    expect(parseSites(undefined)).toEqual(DEFAULT_SITES);
  });
});
