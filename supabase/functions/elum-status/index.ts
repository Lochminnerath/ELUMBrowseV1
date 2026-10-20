// ELUM status (see _shared/status.ts): is each ELUM app and the platform under it working?
//
//   GET or POST  →  { data: Status }
//
// Checks, all at once, each with a time limit: every ELUM site, sign-in (Supabase Auth), the
// database, file storage, ELUM's server functions, and Google search for Browse. The answer is
// kept for 30 seconds, so a busy status page does not hammer the services it watches.
//
// Secrets: ELUM_STATUS_SITES (optional, "write=https://...,type=https://..."), GOOGLE_CSE_ID
// (optional, the Programmable Search engine Browse uses). SUPABASE_URL, SUPABASE_ANON_KEY and
// SUPABASE_SERVICE_ROLE_KEY are provided by Supabase. Deploy with --no-verify-jwt: anyone may
// look at the status page.

import { createClient } from 'npm:@supabase/supabase-js@2';
import { CORS, ok } from '../_shared/http.ts';
import { overall, parseSites, siteHealth, TIMEOUT_MS, type Check, type Status } from '../_shared/status.ts';

const CACHE_MS = 30_000;
let cached: { at: number; status: Status } | null = null;

async function timed(run: (signal: AbortSignal) => Promise<number | null>): Promise<{ status: number | null; ms: number }> {
  const start = performance.now();
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    const status = await run(ctl.signal);
    return { status, ms: Math.round(performance.now() - start) };
  } catch {
    return { status: null, ms: Math.round(performance.now() - start) };
  } finally {
    clearTimeout(timer);
  }
}

async function http(url: string, init: RequestInit = {}) {
  return timed(async (signal) => {
    const res = await fetch(url, { redirect: 'manual', ...init, signal });
    await res.body?.cancel();
    return res.status;
  });
}

async function checkAll(): Promise<Status> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const anon = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
  const db = createClient(supabaseUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
  const cx = Deno.env.get('GOOGLE_CSE_ID') ?? '61de32450a25e4731';

  const site = async (s: { id: string; name: string; url: string }): Promise<Check> => {
    const r = await http(s.url, { method: 'GET' });
    return { id: s.id, name: s.name, group: 'apps', ...siteHealth(r.status, r.ms), ms: r.ms };
  };

  const probe = async (id: string, name: string, group: Check['group'], run: (signal: AbortSignal) => Promise<number | null>, working = 'Working'): Promise<Check> => {
    const r = await timed(run);
    const h = siteHealth(r.status, r.ms);
    return { id, name, group, health: h.health, ms: r.ms, note: h.health === 'up' ? working : h.note };
  };

  // Supabase client calls report failure in their result, not by throwing: 500 stands for it.
  const viaClient = (call: () => PromiseLike<{ error: unknown }>) => async () => ((await call()).error ? 500 : 200);

  const checks = await Promise.all([
    ...parseSites(Deno.env.get('ELUM_STATUS_SITES')).map(site),
    probe('auth', 'Sign-in', 'platform', async (signal) => {
      const res = await fetch(`${supabaseUrl}/auth/v1/health`, { headers: { apikey: anon }, signal });
      await res.body?.cancel();
      return res.status;
    }, 'Signing in to every ELUM app'),
    probe('database', 'Database', 'platform', viaClient(() => db.from('profiles').select('id', { head: true }).limit(1)), 'Documents, designs, mail and accounts'),
    probe('storage', 'File storage', 'platform', viaClient(() => db.storage.listBuckets()), 'Pictures and attachments'),
    probe('functions', 'Server functions', 'platform', async (signal) => {
      const res = await fetch(`${supabaseUrl}/functions/v1/browse-search`, { method: 'OPTIONS', signal });
      await res.body?.cancel();
      return res.status;
    }, 'Search, sign-in between apps and mail'),
    probe('google', 'Google search', 'search', async (signal) => {
      const res = await fetch(`https://cse.google.com/cse.js?cx=${encodeURIComponent(cx)}`, { signal });
      await res.body?.cancel();
      return res.status;
    }, 'Web results for Browse'),
  ]);

  return { checkedAt: new Date().toISOString(), overall: overall(checks), checks };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (!cached || Date.now() - cached.at > CACHE_MS) cached = { at: Date.now(), status: await checkAll() };
  return ok(cached.status);
});
