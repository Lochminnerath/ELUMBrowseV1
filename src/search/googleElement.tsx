import { useEffect, useId, useRef } from 'react';
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

interface Props {
  q: string;
  kind: SearchKind;
  safe: boolean;
  /** Called with how many results were left out for leading to AI products. */
  onHidden: (count: number) => void;
  onError: (message: string) => void;
}

/** One search, shown with Google's Programmable Search Element. */
export function GoogleElementResults({ q, kind, safe, onHidden, onError }: Props) {
  const id = `browse-google-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const box = useRef<HTMLDivElement>(null);
  const report = useRef(onHidden);
  report.current = onHidden;
  const fail = useRef(onError);
  fail.current = onError;

  useEffect(() => {
    let live = true;
    const root = box.current!;
    const observer = new MutationObserver(() => report.current(hideAiResults(root)));
    observer.observe(root, { childList: true, subtree: true });
    const gname = `${id}-${kind}`;
    loadGoogleElement().then(
      (google) => {
        if (!live) return;
        root.replaceChildren();
        const div = document.createElement('div');
        div.id = gname;
        root.append(div);
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
      },
      (e: Error) => live && fail.current(e.message),
    );
    return () => {
      live = false;
      observer.disconnect();
      root.replaceChildren();
    };
  }, [id, q, kind, safe]);

  return <div ref={box} className={`browse-google-element browse-google-element--${kind}`} />;
}
