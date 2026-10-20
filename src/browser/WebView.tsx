import DOMPurify from 'dompurify';
import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { api, errorMessage, type PageInfo } from '../api';
import { Loader } from '../components/Loader';
import './webview.css';

/**
 * A web page inside a Browse tab. Sites that let other sites frame them are shown as themselves,
 * in a sandboxed frame that cannot take over Browse. Sites that refuse are shown as a reading
 * view: the article Browse's browse-page function picked out, cleaned again here before it is
 * shown. Either way, the page stays in Browse; "Open in new window" is always there.
 */

type State = { status: 'loading' } | { status: 'error'; message: string } | { status: 'done'; page: PageInfo | null };

/** Pages already looked at in this window, so switching tabs does not ask again. */
const looked = new Map<string, PageInfo | null>();

/** The reading view's HTML, made safe to show: no scripts, styles, frames or forms. */
export function cleanArticle(html: string): string {
  const clean = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'form', 'input', 'button', 'textarea', 'select', 'iframe', 'object', 'embed', 'video', 'audio', 'svg', 'math'],
    FORBID_ATTR: ['style', 'class', 'id', 'srcset'],
    ALLOWED_URI_REGEXP: /^https?:/i,
  });
  return clean;
}

/** A link inside the reading view, if it leads to a web page (not the same page's anchors). */
function linkTarget(e: MouseEvent): string | null {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const a = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null;
  if (!a || !/^https?:/i.test(a.href)) return null;
  return a.href;
}

export function WebView({ url, nonce, onNavigate }: { url: string; nonce: number; onNavigate(url: string): void }) {
  const [state, setState] = useState<State>(() => (looked.has(url) ? { status: 'done', page: looked.get(url) ?? null } : { status: 'loading' }));
  const lastNonce = useRef(nonce);

  useEffect(() => {
    // Reload asks the site again; anything else may use what this window already found out.
    const reload = nonce !== lastNonce.current;
    lastNonce.current = nonce;
    if (looked.has(url) && !reload) {
      setState({ status: 'done', page: looked.get(url) ?? null });
      return;
    }
    let live = true;
    setState({ status: 'loading' });
    api.page(url).then(
      (page) => {
        looked.set(url, page);
        if (live) setState({ status: 'done', page });
      },
      (e) => live && setState({ status: 'error', message: errorMessage(e) }),
    );
    return () => {
      live = false;
    };
  }, [url, nonce]);

  // A picture in the reading view that will not load is left out rather than shown broken.
  const body = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = body.current;
    if (!el) return;
    const onError = (e: Event) => {
      if (e.target instanceof HTMLImageElement) e.target.style.display = 'none';
    };
    el.addEventListener('error', onError, true);
    return () => el.removeEventListener('error', onError, true);
  });

  const article = useMemo(() => (state.status === 'done' && state.page?.reader ? cleanArticle(state.page.reader.html) : null), [state]);

  if (state.status === 'loading') {
    return (
      <div className="webview webview--center">
        <Loader size={40} label="Opening the page" />
      </div>
    );
  }

  if (state.status === 'error') return <Unavailable url={url} title="That page did not open" text={state.message} />;

  const page = state.page;
  // Without the ELUM platform (or when the site allows it), the page is shown as itself.
  if (!page || page.framable) {
    return (
      <iframe
        key={nonce}
        className="webview webview__frame"
        src={page?.url ?? url}
        title={page?.title ?? 'Web page'}
        // Scripts and forms run as on the site itself, but it cannot take Browse's place.
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads"
        referrerPolicy="strict-origin"
        allow="fullscreen; clipboard-write"
        allowFullScreen
      />
    );
  }

  if (page.reader && article) {
    const r = page.reader;
    return (
      <div className="webview webview--reader">
        <p className="reader-note">
          <span className="reader-note__dot" aria-hidden="true" />
          {new URL(page.url).hostname.replace(/^www\./, '')} does not let other sites show it, so Browse shows the article itself.{' '}
          <a href={page.url} target="_blank" rel="noreferrer">
            Open the original in a new window
          </a>
        </p>
        <article className="reader" lang={r.lang ?? undefined}>
          <header className="reader__head">
            {r.siteName && <p className="reader__site">{r.siteName}</p>}
            <h1>{r.title}</h1>
            {r.byline && <p className="reader__byline">{r.byline}</p>}
          </header>
          <div
            ref={body}
            className="reader__body"
            onClick={(e) => {
              const next = linkTarget(e);
              if (!next) return;
              e.preventDefault();
              onNavigate(next);
            }}
            dangerouslySetInnerHTML={{ __html: article }}
          />
        </article>
      </div>
    );
  }

  return (
    <Unavailable
      url={page.url}
      title={page.title ? `${page.title} cannot be shown here` : 'This page cannot be shown here'}
      text={
        page.status >= 400
          ? `The site answered with an error (${page.status}). It may need you to sign in, or to prove you are a person, on the site itself.`
          : 'The site does not let other sites show it, and it is not an article Browse can read out.'
      }
    />
  );
}

function Unavailable({ url, title, text }: { url: string; title: string; text: string }) {
  return (
    <div className="webview webview--center">
      <div className="browse-note browse-note--setup webview__panel">
        <span className="browse-note__discs" aria-hidden="true">
          <span />
          <span />
        </span>
        <h2>{title}</h2>
        <p>{text}</p>
        <a className="elum-btn elum-btn--primary" href={url} target="_blank" rel="noreferrer">
          Open in new window
        </a>
      </div>
    </div>
  );
}
