import { useEffect, useRef } from 'react';
import { isAiLink } from '../../supabase/functions/_shared/search';
import type { SearchKind } from '../api';

/**
 * Google's results through the Programmable Search Element (cse.google.com/cse.js), drawn inside
 * Browse and styled the ELUM way (browse.css). It needs no API key: the engine ID is public and is
 * in every page that uses it. Set VITE_GOOGLE_CSE_ID to use another engine, or set it empty to use
 * the browse-search edge function (Custom Search JSON API) instead.
 */
const configured = import.meta.env.VITE_GOOGLE_CSE_ID;
export const GOOGLE_CSE_ID = configured === undefined ? '61de32450a25e4731' : configured.trim();

interface CseElement {
  execute(query: string): void;
  clearAllResults(): void;
}
interface CseApi {
  search: {
    cse: {
      element: {
        render(options: { div: string; tag: string; gname: string; attributes?: Record<string, unknown> }): void;
        getElement(gname: string): CseElement | undefined;
      };
    };
  };
}
declare global {
  interface Window {
    __gcse?: { parsetags: 'explicit' | 'onload'; initializationCallback?: () => void };
    google?: CseApi;
  }
}

let loading: Promise<CseApi> | null = null;
// Google keeps every element it renders by name and refuses a name twice: each search gets its own.
let rendered = 0;
/** No answer from Google in this long counts as failed, and Browse offers Google's own page. */
const ANSWER_MS = 10_000;

/** Loads Google's script once, for every search on the page. */
export function loadGoogleElement(cx = GOOGLE_CSE_ID): Promise<CseApi> {
  if (window.google?.search?.cse) return Promise.resolve(window.google);
  loading ??= new Promise<CseApi>((resolve, reject) => {
    window.__gcse = { parsetags: 'explicit', initializationCallback: () => resolve(window.google!) };
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://cse.google.com/cse.js?cx=${encodeURIComponent(cx)}`;
    script.onerror = () => {
      loading = null;
      script.remove();
      reject(new Error('Google search could not be reached.'));
    };
    document.head.append(script);
  });
  return loading;
}

const TITLE_LINK = 'a.gs-title';
const RESULT = '.gsc-webResult.gsc-result, .gsc-imageResult';

/** Leaves out results that lead to AI chat products, and says how many went. */
export function hideAiResults(root: HTMLElement): number {
  let hidden = 0;
  for (const result of root.querySelectorAll<HTMLElement>(RESULT)) {
    const link = result.querySelector<HTMLAnchorElement>(TITLE_LINK)?.href;
    if (link && isAiLink(link)) {
      if (!result.hidden) result.hidden = true;
      hidden++;
    }
  }
  return hidden;
}

/** What Google did with a search: drew results, found nothing, or did not answer. */
export type Outcome = 'results' | 'empty' | 'failed';

/** Reads what Google drew into `root`, or null while it is still working. */
export function readOutcome(root: HTMLElement): Outcome | null {
  if (root.querySelector('.gsc-webResult.gsc-result .gs-title a, .gsc-imageResult a')) return 'results';
  if (root.querySelector('.gs-no-results-result')) return 'empty';
  if (root.querySelector('.gs-error-result')) return 'failed';
  return null;
}

const GOOGLE = /(^|\.)(google\.[a-z.]+|googleadservices\.com|doubleclick\.net)$/;

/**
 * Where a result link leads, for opening it inside Browse. Google's click-tracking address
 * (google.com/url?q=…) is unwrapped to the page itself. Links into Google (its own search page,
 * ads) are `external`: Google does not let other sites show it, so they open in a new window.
 */
export function resultTarget(a: HTMLAnchorElement): { url: string; external: boolean } | null {
  const raw = a.getAttribute('data-ctorig') || a.getAttribute('href') || '';
  let url: URL;
  try {
    url = new URL(raw, location.href);
  } catch {
    return null;
  }
  if (GOOGLE.test(url.hostname) && url.pathname === '/url') {
    const target = url.searchParams.get('q') || url.searchParams.get('url');
    if (target && /^https?:\/\//i.test(target)) return resultTarget(Object.assign(document.createElement('a'), { href: target }));
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
  return { url: url.toString(), external: GOOGLE.test(url.hostname) };
}

interface Props {
  q: string;
  kind: SearchKind;
  safe: boolean;
  /** Called with how many results were left out for leading to AI products. */
  onHidden: (count: number) => void;
  onError: (message: string) => void;
  /** Called once Google has answered, or failed to. */
  onOutcome: (outcome: Outcome) => void;
  /** Opens a result's page inside Browse. */
  onOpen: (url: string) => void;
}

/** One search, shown with Google's Programmable Search Element. */
export function GoogleElementResults({ q, kind, safe, onHidden, onError, onOutcome, onOpen }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const report = useRef(onHidden);
  report.current = onHidden;
  const fail = useRef(onError);
  fail.current = onError;
  const answered = useRef(onOutcome);
  answered.current = onOutcome;
  const open = useRef(onOpen);
  open.current = onOpen;

  // Clicking a result opens it in Browse, not in place of Browse. Caught on the way down, before
  // Google's own link handling; a click with a modifier key (new tab) is left to the browser.
  useEffect(() => {
    const root = box.current!;
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || !root.contains(a)) return;
      const target = resultTarget(a);
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      if (target.external) window.open(target.url, '_blank', 'noopener,noreferrer');
      else open.current(target.url);
    };
    root.addEventListener('click', onClick, true);
    return () => root.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    let live = true;
    let settled = false;
    const root = box.current!;
    const settle = (outcome: Outcome) => {
      if (settled || !live) return;
      settled = true;
      answered.current(outcome);
    };
    const observer = new MutationObserver(() => {
      report.current(hideAiResults(root));
      const outcome = readOutcome(root);
      if (outcome) settle(outcome);
    });
    observer.observe(root, { childList: true, subtree: true });
    const timer = window.setTimeout(() => settle(readOutcome(root) ?? 'failed'), ANSWER_MS);
    const gname = `browse-google-${++rendered}`;
    loadGoogleElement().then(
      (google) => {
        if (!live) return;
        root.replaceChildren();
        const div = document.createElement('div');
        div.id = gname;
        root.append(div);
        try {
          google.search.cse.element.render({
            div: gname,
            tag: 'searchresults-only',
            gname,
            attributes: {
              linkTarget: '_self',
              overlayResults: false,
              enableHistory: false,
              enableOrderBy: false,
              enableImageSearch: kind === 'images',
              defaultToImageSearch: kind === 'images',
              disableWebSearch: kind === 'images',
              safeSearch: safe ? 'active' : 'off',
              imageSearchLayout: 'popup',
            },
          });
          google.search.cse.element.getElement(gname)?.execute(q);
        } catch {
          settle('failed');
        }
      },
      (e: Error) => {
        if (live) fail.current(e.message);
      },
    );
    return () => {
      live = false;
      window.clearTimeout(timer);
      observer.disconnect();
      root.replaceChildren();
    };
  }, [q, kind, safe]);

  return <div ref={box} className={`browse-google-element browse-google-element--${kind}`} />;
}
