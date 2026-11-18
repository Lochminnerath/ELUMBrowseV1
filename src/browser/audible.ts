import { useSyncExternalStore } from 'react';
import { ELUM_APPS } from '../lib/platform';

/**
 * Which tabs are playing sound. ELUM apps in a tab (Tune, for one) tell Browse when they start and
 * stop playing, with a message to this window; Browse shows a listening symbol on that tab, and
 * the symbol pauses or plays them. Messages are only believed from ELUM's own addresses.
 */
const frames = new Map<Window, string>();
const playing = new Map<string, { title: string | null }>();
const listeners = new Set<() => void>();
let snapshot: ReadonlyMap<string, { title: string | null }> = new Map();

const ELUM_ORIGINS = new Set(ELUM_APPS.map((a) => new URL(a.url).origin));
/** ELUM apps on ELUM's own hosts, preview builds of them included. */
export function isElumOrigin(origin: string): boolean {
  if (ELUM_ORIGINS.has(origin)) return true;
  try {
    const { protocol, hostname } = new URL(origin);
    return protocol === 'https:' && /^(?:[a-z0-9-]+--)?[a-z]+byelum\.netlify\.app$/.test(hostname);
  } catch {
    return false;
  }
}

function emit() {
  snapshot = new Map(playing);
  listeners.forEach((l) => l());
}

export function registerFrame(win: Window | null | undefined, tabId: string): () => void {
  if (!win) return () => undefined;
  frames.set(win, tabId);
  return () => {
    frames.delete(win);
    if (playing.delete(tabId)) emit();
  };
}

let listening = false;
function listen() {
  if (listening || typeof window === 'undefined') return;
  listening = true;
  window.addEventListener('message', (e: MessageEvent) => {
    const data = e.data as { type?: string; playing?: boolean; title?: string } | null;
    if (!data || data.type !== 'elum:audio' || !isElumOrigin(e.origin)) return;
    const tabId = e.source ? frames.get(e.source as Window) : undefined;
    if (!tabId) return;
    if (data.playing) playing.set(tabId, { title: typeof data.title === 'string' ? data.title.slice(0, 200) : null });
    else playing.delete(tabId);
    emit();
  });
}

export function useAudible(tabId: string): { title: string | null } | null {
  listen();
  const map = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => snapshot,
  );
  return map.get(tabId) ?? null;
}

/** Asks the app in a tab to pause or play. */
export function toggleTabAudio(tabId: string) {
  for (const [win, id] of frames) {
    if (id === tabId) win.postMessage({ type: 'elum:audio-toggle' }, '*');
  }
}
