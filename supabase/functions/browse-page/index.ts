// Opening a web page inside Browse (see _shared/page.ts).
//
//   POST { url }  →  { data: { url, framable, title, reader } }
//
// Browse shows a page in its own tab. A site that lets other sites frame it is shown as itself
// (framable: true). A site that refuses (X-Frame-Options, CSP frame-ancestors) is shown as a
// reading view: the article itself, picked out with Mozilla Readability, without the site's
// scripts. Browse cleans that HTML again before showing it.
//
// Only public web addresses are fetched, with every redirect checked the same way, a size and a
// time limit, and a limit per address on how many pages an hour. Deploy with --no-verify-jwt:
// browsing needs no account.
//
// Secrets: BROWSE_ORIGIN (optional): Browse's own origin, for the framing check.

import { Readability } from 'npm:@mozilla/readability@0.5.0';
import { parseHTML } from 'npm:linkedom@0.18.5';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { CORS, fail, ok } from '../_shared/http.ts';
import { absoluteLink, frameAllowed, safePageUrl } from '../_shared/page.ts';

const EMBEDDER = Deno.env.get('BROWSE_ORIGIN') ?? 'https://browsebyelum.netlify.app';
const MAX_BYTES = 3_000_000;
const TIMEOUT_MS = 9000;
const MAX_REDIRECTS = 5;
const HOURLY_LIMIT = 600;
const USER_AGENT = 'Mozilla/5.0 (compatible; ELUM Browse; +https://browsebyelum.netlify.app/docs/browse)';

interface Reader {
  title: string;
  byline: string | null;
  siteName: string | null;
  excerpt: string | null;
  lang: string | null;
  html: string;
}

/** Follows redirects by hand, so every hop is checked like the first. */
async function fetchPage(start: URL, signal: AbortSignal): Promise<{ res: Response; url: URL }> {
  let url = start;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const res = await fetch(url, { redirect: 'manual', signal, headers: { 'user-agent': USER_AGENT, accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.5' } });
    const location = res.headers.get('location');
    if (res.status >= 300 && res.status < 400 && location) {
      await res.body?.cancel();
      const next = safePageUrl(absoluteLink(location, url) ?? '');
      if (!next) throw new Error('redirect');
      url = next;
      continue;
    }
    return { res, url };
  }
  throw new Error('redirects');
}

/** The body as text, up to MAX_BYTES. */
async function readText(res: Response): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) return '';
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > MAX_BYTES) {
      await reader.cancel();
      break;
    }
    chunks.push(value);
  }
  const charset = /charset=([\w-]+)/i.exec(res.headers.get('content-type') ?? '')?.[1] ?? 'utf-8';
  const all = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
  let at = 0;
  for (const c of chunks) {
    all.set(c, at);
    at += c.length;
  }
  try {
    return new TextDecoder(charset).decode(all);
  } catch {
    return new TextDecoder().decode(all);
  }
}

// Deno has no DOM types: the part of linkedom's document this uses.
interface Node {
  textContent: string | null;
  getAttribute(name: string): string | null;
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
  remove(): void;
}
interface Doc {
  querySelector(selector: string): Node | null;
  querySelectorAll(selector: string): Iterable<Node>;
}

function readerView(html: string, url: URL): { title: string; reader: Reader | null } {
  const { document } = parseHTML(html) as unknown as { document: Doc };
  const title = (document.querySelector('title')?.textContent ?? '').trim().slice(0, 300);
  // Links and pictures point at the real site; lazy pictures get their real source.
  for (const a of document.querySelectorAll('a[href]')) {
    const href = absoluteLink(a.getAttribute('href'), url);
    if (href) a.setAttribute('href', href);
    else a.removeAttribute('href');
  }
  for (const img of document.querySelectorAll('img')) {
    const src = absoluteLink(img.getAttribute('src') || img.getAttribute('data-src') || img.getAttribute('data-original'), url);
    if (src) img.setAttribute('src', src);
    else img.remove();
    img.removeAttribute('srcset');
  }
  try {
    const article = new Readability(document as unknown as ConstructorParameters<typeof Readability>[0], { charThreshold: 300 }).parse();
    if (!article?.content) return { title, reader: null };
    return {
      title,
      reader: {
        title: (article.title || title).slice(0, 300),
        byline: article.byline?.slice(0, 200) ?? null,
        siteName: article.siteName?.slice(0, 120) ?? null,
        excerpt: article.excerpt?.slice(0, 400) ?? null,
        lang: article.lang ?? null,
        html: article.content.slice(0, 1_500_000),
      },
    };
  } catch {
    return { title, reader: null };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return fail('invalid', 'Use POST.');
  let body: { url?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail('invalid', 'Send the address as JSON.');
  }
  const url = safePageUrl(body.url);
  if (!url) return fail('invalid', 'Browse can only open public web addresses.');

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  try {
    const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
    const { data: allowed } = await db.rpc('elum_take_rate_limit', { p_key: `browse-page:${ip}`, p_limit: HOURLY_LIMIT, p_window_seconds: 3600 });
    if (allowed === false) return fail('rate_limited', 'That is a lot of pages. Try again in a little while.');
  } catch {
    // The limit is a courtesy to the sites Browse opens; a hiccup here does not stop browsing.
  }

  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    const { res, url: final } = await fetchPage(url, ctl.signal);
    const framable = res.ok && frameAllowed(res.headers, EMBEDDER);
    const type = res.headers.get('content-type') ?? '';
    if (!/html/i.test(type)) {
      await res.body?.cancel();
      return ok({ url: final.toString(), status: res.status, framable, title: null, reader: null });
    }
    const html = await readText(res);
    // A page that may be framed is shown as itself; the reading view is only for the rest.
    const { title, reader } = framable ? { title: /<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1]?.trim().slice(0, 300) ?? null, reader: null } : readerView(html, final);
    return ok({ url: final.toString(), status: res.status, framable, title, reader });
  } catch {
    return fail('server', 'That page did not answer. Try again, or open it in a new window.');
  } finally {
    clearTimeout(timer);
  }
});
