import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { api, errorMessage, type SearchKind, type SearchPage as Page, type SearchResult } from '../api';
import { Loader } from '../components/Loader';
import { BrowseHeader } from './BrowseHeader';
import { googleWebUrl, siteHue } from './google';
import { rememberSearch, safeSearch } from './local';
import { SearchBox } from './SearchBox';
import './browse.css';

type State = { status: 'loading' } | { status: 'error'; message: string } | { status: 'done'; page: Page; results: SearchResult[] };

/** /search?q=…&kind=images: Google's results, shown the ELUM way, without AI. */
export function SearchPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = (params.get('q') ?? '').trim();
  const kind: SearchKind = params.get('kind') === 'images' ? 'images' : 'web';
  const [state, setState] = useState<State>({ status: 'loading' });
  const [more, setMore] = useState(false);
  const run = useRef(0);

  useEffect(() => {
    if (!q) {
      navigate('/', { replace: true });
      return;
    }
    document.title = `${q} · ELUM Browse`;
    rememberSearch(q);
    const id = ++run.current;
    setState({ status: 'loading' });
    api.search({ q, kind, start: 1, safe: safeSearch() }).then(
      (page) => id === run.current && setState({ status: 'done', page, results: page.results }),
      (e) => id === run.current && setState({ status: 'error', message: errorMessage(e) }),
    );
  }, [q, kind, navigate]);

  const loadMore = async () => {
    if (state.status !== 'done' || !state.page.next) return;
    setMore(true);
    try {
      const page = await api.search({ q, kind, start: state.page.next, safe: safeSearch() });
      setState({ status: 'done', page: { ...page, hidden: state.page.hidden + page.hidden }, results: [...state.results, ...page.results] });
    } catch (e) {
      setState({ status: 'error', message: errorMessage(e) });
    } finally {
      setMore(false);
    }
  };

  const tab = (k: SearchKind, label: string) => (
    <Link to={`/search?q=${encodeURIComponent(q)}${k === 'images' ? '&kind=images' : ''}`} className="browse-tab" aria-current={kind === k ? 'page' : undefined}>
      {label}
    </Link>
  );

  return (
    <div className="browse">
      <BrowseHeader compact>
        <SearchBox initial={q} size="compact" onSearch={(next) => navigate(`/search?q=${encodeURIComponent(next)}${kind === 'images' ? '&kind=images' : ''}`)} />
      </BrowseHeader>
      <nav className="browse-tabs" aria-label="Kinds of results">
        {tab('web', 'All')}
        {tab('images', 'Images')}
      </nav>

      <main className="browse-results" aria-busy={state.status === 'loading'}>
        {state.status === 'loading' && (
          <div className="browse-results__loading">
            <Loader size={40} label="Searching" />
          </div>
        )}

        {state.status === 'error' && (
          <div className="browse-note browse-note--error" role="alert">
            <p>{state.message}</p>
            <a className="elum-btn elum-btn--secondary" href={googleWebUrl(q, kind)} rel="noreferrer">
              Search on Google instead
            </a>
          </div>
        )}

        {state.status === 'done' && !state.page.configured && <NotConnected q={q} kind={kind} />}

        {state.status === 'done' && state.page.configured && (
          <>
            {state.page.suggestion && (
              <p className="browse-suggest">
                Did you mean{' '}
                <Link to={`/search?q=${encodeURIComponent(state.page.suggestion)}${kind === 'images' ? '&kind=images' : ''}`}>{state.page.suggestion}</Link>?
              </p>
            )}
            {state.results.length === 0 ? (
              <div className="browse-note">
                <p>
                  Nothing found for <strong>{q}</strong>. Try fewer or different words.
                </p>
              </div>
            ) : kind === 'images' ? (
              <ImageGrid results={state.results} />
            ) : (
              <>
                <p className="browse-count muted">About {state.page.total.toLocaleString()} results</p>
                <ol className="browse-list">
                  {state.results.map((r, i) => (
                    <WebResult key={`${r.url}-${i}`} result={r} index={i} />
                  ))}
                </ol>
              </>
            )}
            {state.page.hidden > 0 && (
              <p className="browse-hidden">
                <span className="browse-hidden__dot" aria-hidden="true" />
                {state.page.hidden === 1 ? 'One result was' : `${state.page.hidden} results were`} left out because {state.page.hidden === 1 ? 'it leads' : 'they lead'} to AI chat
                products.
              </p>
            )}
            {state.page.next && (
              <div className="browse-more">
                <button type="button" className="elum-btn elum-btn--secondary" onClick={() => void loadMore()} disabled={more}>
                  {more ? <Loader size={18} label="Loading more" /> : 'More results'}
                </button>
              </div>
            )}
          </>
        )}

        {state.status !== 'loading' && q && (
          <p className="browse-google">
            Results from Google.{' '}
            <a href={googleWebUrl(q, kind)} rel="noreferrer">
              See this search on Google
            </a>{' '}
            (web results only, no AI Overview).
          </p>
        )}
      </main>
    </div>
  );
}

/** One web result: the site in its own coloured disc, the title, the link and the snippet. */
function WebResult({ result: r, index }: { result: SearchResult; index: number }) {
  const hue = siteHue(r.site);
  return (
    <li className="browse-result" style={{ animationDelay: `${Math.min(index, 10) * 30}ms` }}>
      <a className="browse-result__link" href={r.url} rel="noreferrer">
        <span className="browse-result__site">
          <span className="browse-result__disc" style={{ background: `hsl(${hue} 70% 92%)`, color: `hsl(${hue} 55% 32%)` }} aria-hidden="true">
            {r.site.replace(/^www\./, '').charAt(0).toUpperCase()}
          </span>
          <span className="browse-result__host">{r.site}</span>
        </span>
        <span className="browse-result__title">{r.title}</span>
      </a>
      <div className="browse-result__body">
        {r.snippet && <p className="browse-result__snippet">{r.snippet}</p>}
        {r.image?.src && <img className="browse-result__thumb" src={r.image.src} alt="" loading="lazy" referrerPolicy="no-referrer" onError={hideBroken} />}
      </div>
    </li>
  );
}

function ImageGrid({ results }: { results: SearchResult[] }) {
  return (
    <ul className="browse-images">
      {results.map((r, i) => (
        <li key={`${r.image?.src}-${i}`} className="browse-image">
          <a href={r.url} rel="noreferrer" title={r.title}>
            <img src={r.image?.src} alt={r.title} loading="lazy" referrerPolicy="no-referrer" onError={hideBroken} />
            <span className="browse-image__site">{r.site}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Before the Google key is set: say so plainly and offer Google's web-only results page. */
function NotConnected({ q, kind }: { q: string; kind: SearchKind }) {
  return (
    <div className="browse-note browse-note--setup">
      <span className="browse-note__discs" aria-hidden="true">
        <span />
        <span />
      </span>
      <h2>Browse is not connected to Google search yet</h2>
      <p>Until it is, open this search on Google with web results only: no AI Overview and no AI Mode.</p>
      <a className="elum-btn elum-btn--primary" href={googleWebUrl(q, kind)} rel="noreferrer">
        Search “{q}” on Google
      </a>
    </div>
  );
}

/** A picture that will not load is left out rather than shown broken. */
function hideBroken(e: SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = 'none';
}
