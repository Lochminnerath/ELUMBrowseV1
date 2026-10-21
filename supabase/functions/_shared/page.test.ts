import { describe, expect, it } from 'vitest';
import { absoluteLink, frameAllowed, safePageUrl } from './page';

const BROWSE = 'https://elumbrowse.netlify.app';
const headers = (h: Record<string, string>) => new Headers(h);

describe('safePageUrl', () => {
  it('takes ordinary web addresses', () => {
    expect(safePageUrl('https://en.wikipedia.org/wiki/Red_fox#Diet')?.toString()).toBe('https://en.wikipedia.org/wiki/Red_fox');
    expect(safePageUrl('http://example.com')?.hostname).toBe('example.com');
  });

  it('refuses anything that could reach a private network or a non-web scheme', () => {
    for (const bad of [
      'file:///etc/passwd',
      'javascript:alert(1)',
      'ftp://example.com',
      'http://localhost:3000',
      'http://127.0.0.1',
      'http://10.0.0.5/admin',
      'http://169.254.169.254/latest/meta-data',
      'http://[::1]/',
      'http://2130706433/',
      'http://0x7f000001/',
      'http://printer.local/',
      'http://db.internal/',
      'https://user:pass@example.com/',
      'https://example.com:8443/',
      'intranet',
      '',
      42,
    ]) {
      expect(safePageUrl(bad), String(bad)).toBeNull();
    }
  });
});

describe('frameAllowed', () => {
  it('allows pages that say nothing about framing', () => {
    expect(frameAllowed(headers({ 'content-security-policy': "script-src 'self'" }), BROWSE)).toBe(true);
  });

  it('refuses X-Frame-Options DENY and SAMEORIGIN', () => {
    expect(frameAllowed(headers({ 'x-frame-options': 'SAMEORIGIN' }), BROWSE)).toBe(false);
    expect(frameAllowed(headers({ 'x-frame-options': 'deny' }), BROWSE)).toBe(false);
  });

  it('reads frame-ancestors', () => {
    expect(frameAllowed(headers({ 'content-security-policy': "frame-ancestors 'self'" }), BROWSE)).toBe(false);
    expect(frameAllowed(headers({ 'content-security-policy': "frame-ancestors 'none'" }), BROWSE)).toBe(false);
    expect(frameAllowed(headers({ 'content-security-policy': 'frame-ancestors *' }), BROWSE)).toBe(true);
    expect(frameAllowed(headers({ 'content-security-policy': 'frame-ancestors https:' }), BROWSE)).toBe(true);
    expect(frameAllowed(headers({ 'content-security-policy': 'frame-ancestors https://*.netlify.app' }), BROWSE)).toBe(true);
    expect(frameAllowed(headers({ 'content-security-policy': 'frame-ancestors https://example.com' }), BROWSE)).toBe(false);
  });
});

describe('absoluteLink', () => {
  it('makes links absolute and drops non-web ones', () => {
    const base = new URL('https://en.wikipedia.org/wiki/Red_fox');
    expect(absoluteLink('/wiki/Fox', base)).toBe('https://en.wikipedia.org/wiki/Fox');
    expect(absoluteLink('javascript:alert(1)', base)).toBeNull();
    expect(absoluteLink(null, base)).toBeNull();
  });
});
