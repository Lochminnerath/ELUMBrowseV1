import { describe as group, expect, it } from 'vitest';
import { coverAddress, describe, frameUrl, resolveElum } from './places';

group('resolveElum', () => {
  it('opens ELUM apps named in a search', () => {
    expect(resolveElum('write')).toBe('/app/write');
    expect(resolveElum('  Make ')).toBe('/app/make');
    expect(resolveElum('elum type')).toBe('/app/type');
    expect(resolveElum('ELUMAccount')).toBe('/app/account');
    expect(resolveElum('elum accounts')).toBe('/app/account');
    expect(resolveElum('elum docs')).toBe('/docs');
    expect(resolveElum('elum')).toBe('/docs');
    expect(resolveElum('status')).toBe('/status');
  });

  it('opens elum.services addresses, keeping the path inside the app', () => {
    expect(resolveElum('write.elum.services/d/123')).toBe('/app/write/d/123');
    expect(resolveElum('https://make.elum.services')).toBe('/app/make');
    expect(resolveElum('elum.services')).toBe('/docs');
    expect(resolveElum('browse.elum.services')).toBe('/');
    expect(resolveElum('docs.elum.services')).toBe('/docs');
  });

  it('leaves everything else to the web', () => {
    expect(resolveElum('make bread')).toBeNull();
    expect(resolveElum('how to type faster')).toBeNull();
    expect(resolveElum('elum write review')).toBeNull();
    expect(resolveElum('evil.elum.services')).toBeNull();
    expect(resolveElum('write.elum.services.evil.example')).toBeNull();
    expect(resolveElum('')).toBeNull();
  });

  it('never lets a path leave the app', () => {
    expect(resolveElum('write.elum.services//evil.example')).toBe('/app/write');
  });
});

group('describe, cover and frame', () => {
  it('names each kind of tab', () => {
    expect(describe('/').kind).toBe('home');
    expect(describe('/search?q=red%20fox').title).toBe('red fox');
    expect(describe('/app/make/m/abc').title).toBe('Make');
    expect(describe('/docs/type').title).toBe('Type · Docs');
  });

  it('shows apps under elum.services and loads them from where they live', () => {
    expect(coverAddress('/app/write/d/123')).toBe('write.elum.services/d/123');
    expect(coverAddress('/search?q=fox')).toBe('browse.elum.services/search?q=fox');
    expect(frameUrl('/app/write/d/123')).toBe('https://elumwrite.netlify.app/d/123');
    expect(frameUrl('/search?q=fox')).toBeNull();
  });
});
