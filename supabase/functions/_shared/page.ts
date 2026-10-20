/**
 * Opening a web page inside Browse (the browse-page edge function): which addresses Browse may
 * fetch at all, and whether a site lets other sites show it in a frame. Plain TypeScript: runs in
 * the edge function (Deno) and in tests (vitest).
 */

export const MAX_URL = 2000;

/** Hosts that are never fetched: this machine, the cloud's own services, and private names. */
const BLOCKED_NAMES = /(^|\.)(localhost|local|internal|intranet|home|lan|corp|localdomain)$/i;

function privateIPv4(host: string): boolean {
  const m = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!m) return false;
  const [a, b] = [Number(m[1]), Number(m[2])];
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224
  );
}

/**
 * The page address, if Browse may fetch it: http or https on the usual ports, a public host name,
 * no user name or password. Addresses written as IP numbers are refused outright, so nothing on a
 * private network can be reached through Browse.
 */
export function safePageUrl(input: unknown): URL | null {
  if (typeof input !== 'string' || !input.trim() || input.length > MAX_URL) return null;
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  if (url.username || url.password) return null;
  if (url.port && url.port !== '80' && url.port !== '443') return null;
  const host = url.hostname.toLowerCase().replace(/\.$/, '');
  if (!host.includes('.') || BLOCKED_NAMES.test(host)) return null;
  if (host.startsWith('[') || privateIPv4(host) || /^\d+(\.\d+)*$/.test(host) || /^0x/i.test(host)) return null;
  url.hash = '';
  return url;
}

/**
 * Whether a page lets `embedder` (Browse's origin) show it in a frame. X-Frame-Options DENY or
 * SAMEORIGIN refuses; so does a Content-Security-Policy frame-ancestors list without a source that
 * matches Browse. A page with neither header may be framed.
 */
export function frameAllowed(headers: Headers, embedder: string): boolean {
  const xfo = (headers.get('x-frame-options') ?? '').trim().toLowerCase();
  if (xfo === 'deny' || xfo === 'sameorigin' || xfo.startsWith('allow-from')) return false;
  const csp = headers.get('content-security-policy') ?? '';
  for (const directive of csp.split(/[;,]/)) {
    const [name, ...sources] = directive.trim().split(/\s+/);
    if (name?.toLowerCase() !== 'frame-ancestors') continue;
    const origin = new URL(embedder);
    const ok = sources.some((raw) => {
      const s = raw.replace(/^'|'$/g, '').toLowerCase().replace(/\/+$/, '');
      if (s === '*') return true;
      if (s === 'none' || s === 'self') return false;
      if (s === origin.protocol.replace(':', '')) return true;
      if (s === `${origin.protocol}`) return true;
      const m = s.match(/^(?:(https?):\/\/)?(\*\.)?([^/:]+)(?::\d+)?$/);
      if (!m) return false;
      const [, scheme, wildcard, host] = m;
      if (scheme && `${scheme}:` !== origin.protocol) return false;
      return wildcard ? origin.hostname.endsWith(`.${host}`) : origin.hostname === host;
    });
    if (!ok) return false;
  }
  return true;
}

/** A link inside a page, made absolute; only http(s) links survive. */
export function absoluteLink(href: string | null, base: URL): string | null {
  if (!href) return null;
  try {
    const url = new URL(href, base);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}
