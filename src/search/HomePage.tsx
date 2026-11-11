import { useEffect, useState, type CSSProperties } from 'react';
import { BACKGROUNDS, NIGHT_BASE, readPicture, useSettings } from '../settings/settings';
import { LiveBackground } from '../settings/LiveBackground';
import { Link } from 'react-router';
import { useGo } from '../browser/BrowserShell';
import { BrowseMark } from '../components/Brand';
import { DeleteIcon } from '../components/icons/ElumIcons';
import { BrowseHeader } from './BrowseHeader';
import { clearSearches, forgetSearch, recentSearches } from './local';
import { SearchBox } from './SearchBox';
import './browse.css';
import { SupportLink } from '../components/SupportLink';
import { SearchDisclosure, TrademarkNotice } from '../components/Disclosure';

/** Browse's front page: the mark, the box, and your recent searches from this browser. */
export function HomePage() {
  const go = useGo();
  const [recent, setRecent] = useState(recentSearches);
  const settings = useSettings();

  useEffect(() => {
    document.title = 'ELUM Browse';
  }, []);

  const search = (q: string, web?: boolean) => go(q, { web });

  const look = BACKGROUNDS.find((b) => b.id === settings.background);
  const picture = settings.background === 'picture' ? readPicture() : null;
  const style = (picture ? { '--home-picture': `url("${picture}")` } : look ? { '--home-bg': look.css } : {}) as CSSProperties;
  return (
    <div className="browse browse--home" data-bg={picture ? 'picture' : (look?.id ?? 'plain')} data-bg-dark={picture || look?.dark ? '' : undefined} style={style}>
      {look?.live && !picture && <LiveBackground colors={look.live} base={look.dark ? NIGHT_BASE : undefined} className="live-bg--page" />}
      <BrowseHeader />
      <main className="browse-home">
        <div className="browse-home__mark" aria-hidden="true">
          <BrowseMark size={112} />
        </div>
        <h1 className="browse-home__title">Search the web. Just the web.</h1>
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

      </main>
      <footer className="browse-foot">
        <span>
          Made by you. Runs without AI. <Link to="/settings">Settings</Link> · <Link to="/docs">ELUM Docs</Link> · <Link to="/status">Status</Link> · <SupportLink>Support</SupportLink>
        </span>
        <SearchDisclosure short />
        <TrademarkNotice />
      </footer>
    </div>
  );
}
