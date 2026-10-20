import { useCallback, useEffect, useState, type ComponentType, type CSSProperties } from 'react';
import { api, errorMessage, type ElumStatus, type Health, type StatusCheck } from '../api';
import type { IconProps } from '../components/icons/ElumIcons';
import { AttachIcon, PrivateIcon, SavedIcon, SendIcon, VisibleIcon } from '../components/icons/ElumIcons';
import { Loader } from '../components/Loader';
import { BrowseHeader } from '../search/BrowseHeader';
import './status.css';

const REFRESH_MS = 60_000;

const formatTime = (iso: string) => new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', second: '2-digit' });

const WORDS: Record<Health, { title: string; short: string }> = {
  up: { title: 'Everything is working', short: 'Working' },
  slow: { title: 'Some of ELUM is slow', short: 'Slow' },
  down: { title: 'Part of ELUM is down', short: 'Down' },
};

const GROUPS: { id: StatusCheck['group']; title: string }[] = [
  { id: 'apps', title: 'ELUM apps' },
  { id: 'platform', title: 'Under the apps' },
  { id: 'search', title: 'Search' },
];

/** Symbols for the parts under the apps. Apps show their own marks. */
const SYMBOLS: Record<string, ComponentType<IconProps>> = {
  auth: PrivateIcon,
  database: SavedIcon,
  storage: AttachIcon,
  functions: SendIcon,
  google: VisibleIcon,
};

const APP_MARKS = new Set(['write', 'type', 'make', 'account', 'browse']);

type State = { status: 'loading' } | { status: 'error'; message: string } | { status: 'none' } | { status: 'done'; data: ElumStatus };

/** /status: is every ELUM app, and what they run on, working right now? Checks again each minute. */
export function StatusPage() {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [checking, setChecking] = useState(false);

  const check = useCallback(async () => {
    setChecking(true);
    try {
      const data = await api.status();
      setState(data ? { status: 'done', data } : { status: 'none' });
    } catch (e) {
      setState({ status: 'error', message: errorMessage(e) });
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    document.title = 'ELUM status';
    void check();
    const timer = window.setInterval(() => document.visibilityState === 'visible' && void check(), REFRESH_MS);
    return () => window.clearInterval(timer);
  }, [check]);

  const health: Health | null = state.status === 'done' ? state.data.overall : state.status === 'error' ? 'down' : null;

  return (
    <div className="browse status">
      <BrowseHeader />
      <main className="status-main" aria-busy={state.status === 'loading'}>
        <section className="status-hero" data-health={health ?? undefined}>
          <span className="status-hero__disc" aria-hidden="true">
            <span />
          </span>
          <div>
            <p className="status-eyebrow">ELUM status</p>
            <h1>{state.status === 'done' ? WORDS[state.data.overall].title : state.status === 'error' ? 'We could not check' : state.status === 'none' ? 'Status needs the ELUM platform' : 'Checking ELUM…'}</h1>
            <p className="status-lede">
              {state.status === 'done' && <>Checked at {formatTime(state.data.checkedAt)}. This page checks again every minute.</>}
              {state.status === 'error' && state.message}
              {state.status === 'none' && 'This copy of Browse runs on its own, without the services the status page checks.'}
              {state.status === 'loading' && 'Asking every ELUM service how it is.'}
            </p>
          </div>
          <button type="button" className="elum-btn elum-btn--secondary status-again" onClick={() => void check()} disabled={checking}>
            {checking ? <Loader size={18} label="Checking" /> : 'Check again'}
          </button>
        </section>

        {state.status === 'done' &&
          GROUPS.map((g) => {
            const checks = state.data.checks.filter((c) => c.group === g.id);
            if (!checks.length) return null;
            return (
              <section key={g.id} className="status-group" aria-labelledby={`status-${g.id}`}>
                <h2 id={`status-${g.id}`}>{g.title}</h2>
                <ul>
                  {checks.map((c, i) => (
                    <CheckRow key={c.id} check={c} index={i} />
                  ))}
                </ul>
              </section>
            );
          })}
      </main>
      <footer className="browse-foot">
        <span>Made by you. Runs without AI.</span>
        <span className="muted">Times are how long each service took to answer this check.</span>
      </footer>
    </div>
  );
}

function CheckRow({ check: c, index }: { check: StatusCheck; index: number }) {
  const Symbol = SYMBOLS[c.id];
  return (
    <li className="status-row" data-health={c.health} style={{ '--i': index } as CSSProperties}>
      <span className="status-row__mark" aria-hidden="true">
        {APP_MARKS.has(c.id) ? (
          <>
            <img className="theme-light-only" src={`/brand/apps/${c.id}.svg`} alt="" />
            <img className="theme-dark-only" src={`/brand/apps/${c.id}-reversed.svg`} alt="" />
          </>
        ) : Symbol ? (
          <Symbol size={22} />
        ) : null}
      </span>
      <span className="status-row__name">
        <strong>{c.name}</strong>
        <span className="muted">{c.note}</span>
      </span>
      <span className="status-row__ms">{c.ms} ms</span>
      <span className="status-pill" data-health={c.health}>
        <span className="status-pill__dot" aria-hidden="true" />
        {WORDS[c.health].short}
      </span>
    </li>
  );
}
