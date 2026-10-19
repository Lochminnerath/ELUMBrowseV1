// ELUM Browse search (see _shared/search.ts): Google results without AI Overviews or Gemini.
//
//   POST { q, kind?: "web" | "images", start?: 1, safe?: true }  →  { data: SearchPage }
//
// Secrets (Supabase > Edge Functions > Secrets):
//   GOOGLE_SEARCH_KEY  An API key with the Custom Search API enabled (Google Cloud console).
//   GOOGLE_SEARCH_CX   The Programmable Search Engine id, set to search the entire web.
//   BROWSE_BLOCKED_HOSTS  Optional, comma-separated: more AI sites to leave out.
// Without the key and id it answers { configured: false } and Browse offers Google's own
// web-only results page instead. Deploy with --no-verify-jwt: searching needs no account.

import { createClient } from 'npm:@supabase/supabase-js@2';
import { CORS, fail, ok } from '../_shared/http.ts';
import { BLOCKED_HOSTS, googleUrl, NOT_CONFIGURED, readRequest, toPage } from '../_shared/search.ts';

const HOURLY_LIMIT = 300;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return fail('invalid', 'Use POST.');
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail('invalid', 'Send the search as JSON.');
  }
  const search = readRequest(body);
  if (!search) return fail('invalid', 'Type something to search for.');

  const key = Deno.env.get('GOOGLE_SEARCH_KEY');
  const cx = Deno.env.get('GOOGLE_SEARCH_CX');
  if (!key || !cx) return ok(NOT_CONFIGURED);

  // Each search costs a Google query: limit how many one address can run.
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  try {
    const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
    const { data: allowed } = await db.rpc('elum_take_rate_limit', { p_key: `browse:${ip}`, p_limit: HOURLY_LIMIT, p_window_seconds: 3600 });
    if (allowed === false) return fail('rate_limited', 'That is a lot of searching. Try again in a little while.');
  } catch {
    // The limit is a courtesy; search still works without it.
  }

  const extra = (Deno.env.get('BROWSE_BLOCKED_HOSTS') ?? '').split(',').map((h) => h.trim().toLowerCase()).filter(Boolean);
  const res = await fetch(googleUrl(search, key, cx));
  if (res.status === 429) return fail('rate_limited', 'Google has had enough searches for today. Try again tomorrow, or search on Google directly.');
  if (!res.ok) return fail('server', 'Google did not answer. Try again in a moment.');
  return ok(toPage(search, await res.json(), [...BLOCKED_HOSTS, ...extra]));
});
