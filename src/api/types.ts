/**
 * Shared data shapes for ELUM Browse. The Supabase API and the in-browser preview API both speak
 * these, so the screens never know which one is behind them.
 */

/**
 * `type`: an ELUM Type address (handle@type.elum.services).
 * `external`: the person's own email provider.
 */
export type AccountType = 'type' | 'external';

export interface User {
  id: string;
  name: string;
  email: string;
  /** Avatar colour, one of the product colours. */
  color: string;
  accountType: AccountType;
  createdAt: string;
  /** Their profile picture (set in ELUM Account), as a link the browser can load. */
  pictureUrl?: string | null;
}

export type PublicUser = Pick<User, 'id' | 'name' | 'email' | 'color'>;

export interface Session {
  user: User;
}

export interface SignUpInput {
  name: string;
  /** Their own email, for `external` accounts. Unused for Type accounts. */
  email: string;
  password: string;
  /** Defaults to `external`. `type` creates an ELUM Type address (needs the ELUM platform). */
  accountType?: AccountType;
  /** Type accounts: the name before @<type domain>. */
  handle?: string;
  /** Type accounts: an outside address for getting back in after a forgotten password. */
  recoveryEmail?: string;
}

export interface SignInInput {
  /** An email, an ELUM Type address, or just the name before @<type domain>. */
  email: string;
  password: string;
}

// ------------------------------------------------------------------- search

export type SearchKind = 'web' | 'images';

export interface SearchInput {
  q: string;
  kind?: SearchKind;
  /** 1-based index of the first result (Google pages in steps of 10). */
  start?: number;
  safe?: boolean;
}

export interface SearchResult {
  title: string;
  url: string;
  /** The site, such as en.wikipedia.org. */
  site: string;
  snippet: string;
  /** A small picture (web), or the image itself (images). */
  image?: { src: string; width?: number; height?: number; context?: string } | null;
}

export interface SearchPage {
  /** False when the server has no Google key yet: Browse offers Google's own results instead. */
  configured: boolean;
  results: SearchResult[];
  /** About how many results Google has. */
  total: number;
  /** Where the next page starts, if there is one. */
  next: number | null;
  /** Google's spelling suggestion, if any. */
  suggestion: string | null;
  /** How many results were left out because they lead to AI products. */
  hidden: number;
}

/** How Browse shows a web page (the browse-page function, supabase/functions/browse-page). */
export interface PageInfo {
  /** Where the address led, after redirects. */
  url: string;
  status: number;
  /** The site lets Browse show it as itself, in a frame. */
  framable: boolean;
  title: string | null;
  /** For sites that refuse frames: the article, as HTML to clean before showing. */
  reader: { title: string; byline: string | null; siteName: string | null; excerpt: string | null; lang: string | null; html: string } | null;
}

/** What /status shows: the elum-status function's answer (supabase/functions/_shared/status.ts). */
export type Health = 'up' | 'slow' | 'down';
export interface StatusCheck {
  id: string;
  name: string;
  group: 'apps' | 'platform' | 'search';
  health: Health;
  ms: number;
  note: string;
}
export interface ElumStatus {
  checkedAt: string;
  overall: Health;
  checks: StatusCheck[];
}

export type ServiceId = 'write' | 'type' | 'browse' | 'make' | 'store';

export interface AppNotification {
  id: string;
  service: ServiceId | 'elum';
  type: string;
  title: string;
  body: string | null;
  /** A path inside the service, or a full URL. */
  link: string | null;
  createdAt: string;
  readAt: string | null;
  actor: Pick<PublicUser, 'id' | 'name' | 'color'> | null;
}
