import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useGo } from '../browser/BrowserShell';
import { BrowseMark } from '../components/Brand';
import { DeleteIcon } from '../components/icons/ElumIcons';
import { BrowseHeader } from './BrowseHeader';
import { clearSearches, forgetSearch, historyPaused, recentSearches, safeSearch, setHistoryPaused, setSafeSearch } from './local';
import { SearchBox } from './SearchBox';
import './browse.css';
import { SupportLink } from '../components/SupportLink';

/** Browse's front page: the mark, the box, and your recent searches from this browser. */
export function HomePage() {
  const go = useGo();
  const [recent, setRecent] = useState(recentSearches);
  const [safe, setSafe] = useState(safeSearch);
  const [paused, setPaused] = useState(historyPaused);

  useEffect(() => {
    document.title = 'ELUM Browse';
  }, []);

  const search = (q: string, web?: boolean) => go(q, { web });

  return (
    <div className="browse">
      <BrowseHeader />
      <main className="browse-home">
        <div className="browse-home__mark" aria-hidden="true">
          <span className="browse-home__ring" />
          <span className="browse-home__ring browse-home__ring--late" />
          <BrowseMark size={112} />
        </div>
        <h1 className="browse-home__title">Search the web. Just the web.</h1>
        <p className="browse-home__lede">Results from Google, without AI answers, AI Overviews or Gemini. Made by you.</p>
        <SearchBox onSearch={search} autoFocus />

        {recent.length > 0 && (
          <section className="browse-recent" aria-label="Recent searches">
            <ul className="browse-recent__list">
              {recent.map((q) => (
                <li key={q} className="browse-recent__chip">
                  <button type="button" className="browse-recent__go" onClick={() => search(q)}>
                    <span className="browse-recent__dot" aria-hidden="true" />
                    {q}
                  </button>
                  <button type="button" className="browse-recent__x" aria-label={`Forget “${q}”`} onClick={() => setRecent(forgetSearch(q))}>
                    <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                      <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="browse-recent__clear"
              onClick={() => {
                clearSearches();
                setRecent([]);
              }}
            >
              <DeleteIcon size={15} /> Clear recent searches
            </button>
          </section>
        )}

        <div className="browse-home__options">
          <label className="browse-option">
            <input
              type="checkbox"
              className="switch"
              role="switch"
              checked={safe}
              onChange={(e) => {
                setSafeSearch(e.target.checked);
                setSafe(e.target.checked);
              }}
            />
            SafeSearch
          </label>
          <label className="browse-option">
            <input
              type="checkbox"
              className="switch"
              role="switch"
              checked={!paused}
              onChange={(e) => {
                setHistoryPaused(!e.target.checked);
                setPaused(!e.target.checked);
                if (!e.target.checked) setRecent([]);
              }}
            />
            Remember searches on this device
          </label>
        </div>
      </main>
      <footer className="browse-foot">
        <span>
          Made by you. Runs without AI. <Link to="/docs">ELUM Docs</Link> · <Link to="/status">Status</Link> · <SupportLink>Support</SupportLink>
        </span>
        <span className="muted">Searches go to Google to find results. ELUM does not keep them.</span>
      </footer>
    </div>
  );
}
