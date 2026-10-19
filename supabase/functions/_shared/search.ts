/**
 * ELUM Browse search: asks Google's Programmable Search (Custom Search JSON API) and shapes the
 * answer for Browse. That API returns the ten blue links: no AI Overviews, no Gemini answers. On
 * top of that, results that lead to AI products are left out (and counted, so Browse can say so).
 * Plain TypeScript: runs in the edge function (Deno) and in tests (vitest).
 */

export type SearchKind = 'web' | 'images';

export interface SearchRequest {
  q: string;
  kind: SearchKind;
  start: number;
  safe: boolean;
}

export interface SearchResult {
  title: string;
  url: string;
  site: string;
  snippet: string;
  image?: { src: string; width?: number; height?: number; context?: string } | null;
}

export interface SearchPage {
  configured: boolean;
  results: SearchResult[];
  total: number;
  next: number | null;
  suggestion: string | null;
  hidden: number;
}

/** AI chat and answer products. A result on one of these hosts (or a subdomain) is left out. */
export const BLOCKED_HOSTS = [
  'gemini.google.com',
  'gemini.google',
  'bard.google.com',
  'aistudio.google.com',
  'notebooklm.google.com',
  'notebooklm.google',
  'labs.google',
  'labs.google.com',
];

/** Google's longest allowed query is 2048 characters; anything beyond is noise. */
export const MAX_QUERY = 400;
/** The API pages through the first 100 results only. */
export const LAST_START = 91;

/** The request, cleaned: a trimmed query, a known kind, a start Google accepts. Null when there is nothing to search. */
export function readRequest(body: unknown): SearchRequest | null {
  const b = (body ?? {}) as Record<string, unknown>;
  const q = String(b.q ?? '').replace(/\s+/g, ' ').trim().slice(0, MAX_QUERY);
  if (!q) return null;
  const kind: SearchKind = b.kind === 'images' ? 'images' : 'web';
  const raw = Math.floor(Number(b.start) || 1);
  const start = Math.min(LAST_START, Math.max(1, raw));
  return { q, kind, start, safe: b.safe !== false };
}

/** The Google API address for a request. The key and engine id stay on the server. */
export function googleUrl(req: SearchRequest, key: string, cx: string): string {
  const params = new URLSearchParams({ key, cx, q: req.q, start: String(req.start), num: '10', safe: req.safe ? 'active' : 'off' });
  if (req.kind === 'images') params.set('searchType', 'image');
  return `https://customsearch.googleapis.com/customsearch/v1?${params.toString()}`;
}

/** Google's own results page for the same search, with only web links (udm=14: no AI Overview). */
export function googleWebUrl(q: string, kind: SearchKind = 'web'): string {
  const params = new URLSearchParams({ q, udm: kind === 'images' ? '2' : '14' });
  return `https://www.google.com/search?${params.toString()}`;
}

/** True when a link leads to an AI product: a blocked host, or Google's AI Mode (udm=50). */
export function isAiLink(link: string, blocked: string[] = BLOCKED_HOSTS): boolean {
  let url: URL;
  try {
    url = new URL(link);
  } catch {
    return true;
  }
  const host = url.hostname.toLowerCase().replace(/^www\./, '');
  if (blocked.some((b) => host === b || host.endsWith(`.${b}`))) return true;
  return /(^|\.)google\.[a-z.]+$/.test(host) && url.pathname === '/search' && url.searchParams.get('udm') === '50';
}

interface GoogleItem {
  title?: string;
  link?: string;
  displayLink?: string;
  snippet?: string;
  image?: { contextLink?: string; height?: number; width?: number; thumbnailLink?: string };
  pagemap?: { cse_thumbnail?: { src?: string; width?: string; height?: string }[] };
}

interface GoogleResponse {
  items?: GoogleItem[];
  searchInformation?: { totalResults?: string };
  queries?: { nextPage?: { startIndex?: number }[] };
  spelling?: { correctedQuery?: string };
}

/** Google's answer as a Browse page, with AI products left out. */
export function toPage(req: SearchRequest, g: GoogleResponse, blocked: string[] = BLOCKED_HOSTS): SearchPage {
  const results: SearchResult[] = [];
  let hidden = 0;
  for (const item of g.items ?? []) {
    if (!item.link || !/^https?:\/\//i.test(item.link)) continue;
    const page = req.kind === 'images' ? item.image?.contextLink ?? item.link : item.link;
    if (isAiLink(item.link, blocked) || isAiLink(page, blocked)) {
      hidden++;
      continue;
    }
    const thumb = item.pagemap?.cse_thumbnail?.[0];
    results.push({
      title: (item.title ?? item.displayLink ?? item.link).trim(),
      url: req.kind === 'images' ? page : item.link,
      site: (item.displayLink ?? new URL(item.link).hostname).replace(/^www\./, ''),
      snippet: (item.snippet ?? '').replace(/\s+/g, ' ').trim(),
      image:
        req.kind === 'images'
          ? { src: item.link, width: item.image?.width, height: item.image?.height, context: page }
          : thumb?.src
            ? { src: thumb.src, width: Number(thumb.width) || undefined, height: Number(thumb.height) || undefined }
            : null,
    });
  }
  const nextStart = g.queries?.nextPage?.[0]?.startIndex ?? null;
  return {
    configured: true,
    results,
    total: Number(g.searchInformation?.totalResults ?? 0) || 0,
    next: nextStart && nextStart <= LAST_START ? nextStart : null,
    suggestion: g.spelling?.correctedQuery?.trim() || null,
    hidden,
  };
}

export const NOT_CONFIGURED: SearchPage = { configured: false, results: [], total: 0, next: null, suggestion: null, hidden: 0 };
