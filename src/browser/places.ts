import { ACCOUNT_HOME, HOME_URL, INQUIRE_URL, MAKE_URL, STORE_URL, TYPE_URL, WRITE_URL } from '../lib/elum';

/**
 * The places Browse knows: ELUM apps it opens inside its own tabs, and its own pages. Each ELUM
 * app is shown under its elum.services address (write.elum.services), whatever site serves it.
 */

/** The support form, served by Inquire, as a Browse path. */
export const SUPPORT_PATH = '/app/inquire/f/support';

export type ElumApp = 'write' | 'type' | 'make' | 'account' | 'store' | 'inquire' | 'home';

export interface AppInfo {
  id: ElumApp;
  name: string;
  color: string;
  /** Where it is served from. */
  url: string;
  /** Its name on elum.services. */
  host: string;
  /** Whether it can take a sign-in handed over by ELUM Account. The ELUM home has none. */
  signIn: boolean;
}

export const ELUM_APPS: Record<ElumApp, AppInfo> = {
  write: { id: 'write', name: 'Write', color: '#f59a52', url: WRITE_URL, host: 'write.elum.services', signIn: true },
  type: { id: 'type', name: 'Type', color: '#3fc4a0', url: TYPE_URL, host: 'type.elum.services', signIn: true },
  make: { id: 'make', name: 'Make', color: '#ec7fa9', url: MAKE_URL, host: 'make.elum.services', signIn: true },
  account: { id: 'account', name: 'Account', color: '#94c858', url: ACCOUNT_HOME, host: 'account.elum.services', signIn: true },
  store: { id: 'store', name: 'Store', color: '#e9b949', url: STORE_URL, host: 'store.elum.services', signIn: true },
  inquire: { id: 'inquire', name: 'Inquire', color: '#f06a5f', url: INQUIRE_URL, host: 'inquire.elum.services', signIn: true },
  home: { id: 'home', name: 'Home', color: '#7093f8', url: HOME_URL, host: 'elum.services', signIn: false },
};

const isApp = (v: string): v is ElumApp => v in ELUM_APPS;

/** Words that name an ELUM place, after an optional "elum": "write", "elum make", "ELUMType". */
const NAMES: Record<string, string> = {
  write: '/app/write',
  type: '/app/type',
  make: '/app/make',
  account: '/app/account',
  accounts: '/app/account',
  store: '/app/store',
  inquire: '/app/inquire',
  forms: '/app/inquire',
  browse: '/',
  search: '/',
  docs: '/docs',
  help: '/docs',
  status: '/status',
};

/** Words that name an ELUM place only after "elum": a bare "home" or "support" is just a search. */
const ELUM_ONLY: Record<string, string> = { home: '/app/home', support: SUPPORT_PATH };

/** Hosts on elum.services that are Browse's own pages rather than apps. */
const OWN_HOSTS: Record<string, string> = { browse: '', search: '', docs: '/docs', status: '/status' };

/** A path inside an app: "/d/123", never "//evil.example". */
function safeRest(rest: string | undefined): string {
  if (!rest || rest === '/') return '';
  if (!rest.startsWith('/') || rest.startsWith('//') || rest.includes('\\')) return '';
  return rest.slice(0, 2000);
}

/**
 * Where a search should go when it names ELUM instead of asking the web: a Browse path such as
 * "/app/write/d/123" or "/docs", or null to search. Takes "write", "elum write", "elumwrite",
 * "write.elum.services/d/123", "https://make.elum.services" and "elum.services".
 */
export function resolveElum(query: string): string | null {
  const q = query.trim().toLowerCase();
  if (!q || q.length > 300) return null;

  const url = q.match(/^(?:https?:\/\/)?(?:([a-z]+)\.)?elum\.services(\/\S*)?$/);
  if (url) {
    const [, sub, rest] = url;
    if (!sub || sub === 'www') return safeRest(rest) ? `/app/home${safeRest(rest)}` : '/app/home';
    const host = sub === 'accounts' ? 'account' : sub;
    if (isApp(host)) return `/app/${host}${safeRest(rest)}`;
    if (host in OWN_HOSTS) return OWN_HOSTS[host] || '/';
    return null;
  }

  const name = q.replace(/^elum[\s.-]*/, '').trim();
  if (name === '' && q.startsWith('elum')) return '/app/home';
  if (/\s/.test(name)) return null;
  if (q.startsWith('elum') && ELUM_ONLY[name]) return ELUM_ONLY[name];
  return NAMES[name] ?? null;
}

/** A web page opened inside Browse: /web?url=… */
export function webPath(url: string): string {
  return `/web?url=${encodeURIComponent(url)}`;
}

/**
 * The address a search means, when it is one: "wikipedia.org", "en.wikipedia.org/wiki/Fox" or
 * "https://example.com". Words with spaces, or without a dot and a plausible ending, are searches.
 */
export function asWebAddress(query: string): string | null {
  const q = query.trim();
  if (!q || /\s/.test(q) || q.length > 2000) return null;
  const withScheme = /^https?:\/\//i.test(q) ? q : /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,24}(:\d+)?([/?#].*)?$/i.test(q) ? `https://${q}` : null;
  if (!withScheme) return null;
  try {
    const url = new URL(withScheme);
    return url.hostname.includes('.') ? url.toString() : null;
  } catch {
    return null;
  }
}

export type PlaceKind = 'home' | 'search' | 'app' | 'web' | 'docs' | 'status' | 'page';

export interface Place {
  kind: PlaceKind;
  title: string;
  /** For app tabs: how the app is named in words, "ELUM Inquire", "ELUM Support", "ELUM home". */
  label?: string;
  app?: AppInfo;
  /** For app tabs: the path inside the app. */
  appPath?: string;
  /** For web tabs: the page. */
  webUrl?: string;
}

/** What a Browse path shows, for its tab. */
export function describe(path: string): Place {
  const url = new URL(path, 'https://browse.invalid');
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts[0] === 'app' && parts[1] && isApp(parts[1])) {
    const app = ELUM_APPS[parts[1]];
    const rest = '/' + parts.slice(2).join('/');
    // The support form is a tab of its own, named for what it is.
    const title = app.id === 'inquire' && rest === '/f/support' ? 'Support' : app.id === 'home' ? 'ELUM home' : app.name;
    const label = app.id === 'home' ? 'ELUM home' : `ELUM ${title}`;
    return { kind: 'app', title, label, app, appPath: (rest === '/' ? '' : rest) + url.search };
  }
  if (url.pathname === '/web') {
    const target = url.searchParams.get('url') ?? '';
    let host = 'Web page';
    try {
      host = new URL(target).hostname.replace(/^www\./, '');
    } catch {
      // Not an address: the tab says so.
    }
    return { kind: 'web', title: host, webUrl: target };
  }
  if (url.pathname === '/search') {
    const q = url.searchParams.get('q')?.trim();
    return { kind: 'search', title: q || 'Search' };
  }
  if (parts[0] === 'docs') {
    const product = parts[1];
    return { kind: 'docs', title: product ? `${product[0].toUpperCase()}${product.slice(1)} · Docs` : 'ELUM Docs' };
  }
  if (parts[0] === 'status') return { kind: 'status', title: 'ELUM status' };
  if (parts.length === 0) return { kind: 'home', title: 'New tab' };
  return { kind: 'page', title: 'Browse' };
}

/** The address Browse shows for a place: write.elum.services/d/123, or browse.elum.services/… */
export function coverAddress(path: string): string {
  const place = describe(path);
  if (place.kind === 'app' && place.app) {
    // Support shows its plain address; what it was filled in with stays in the tab.
    if (place.title === 'Support') return `${place.app.host}/f/support`;
    return `${place.app.host}${place.appPath ?? ''}`;
  }
  if (place.kind === 'web') return (place.webUrl ?? '').replace(/^https?:\/\//, '');
  const url = new URL(path, 'https://browse.invalid');
  return `browse.elum.services${url.pathname === '/' ? '' : url.pathname}${url.search}`;
}

/** The real address an app tab loads. */
export function frameUrl(path: string): string | null {
  const place = describe(path);
  if (place.kind !== 'app' || !place.app) return null;
  return `${place.app.url.replace(/\/+$/, '')}${place.appPath ?? ''}`;
}
