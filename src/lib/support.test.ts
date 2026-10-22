import { describe, expect, it } from 'vitest';
import { supportPath, supportUrl } from './support';

describe('the support link', () => {
  it('points at the support form in Browse, with the app', () => {
    expect(supportUrl('write')).toBe('https://elumbrowse.netlify.app/app/inquire/f/support?app=write');
    expect(supportPath('browse')).toBe('/app/inquire/f/support?app=browse');
  });

  it('carries what went wrong, trimmed and encoded', () => {
    const url = new URL(supportUrl('make', { code: ' 403 ', message: 'We could not save', from: '/d/1?x=a b' }));
    expect(url.searchParams.get('app')).toBe('make');
    expect(url.searchParams.get('code')).toBe('403');
    expect(url.searchParams.get('message')).toBe('We could not save');
    expect(url.searchParams.get('from')).toBe('/d/1?x=a b');
    expect(url.search).not.toContain('+');
  });

  it('keeps the message to 300 characters and leaves out what is empty', () => {
    const url = new URL(supportUrl('type', { message: 'x'.repeat(500), code: '  ' }));
    expect(url.searchParams.get('message')).toHaveLength(300);
    expect(url.searchParams.has('code')).toBe(false);
    expect(url.searchParams.has('from')).toBe(false);
  });
});
