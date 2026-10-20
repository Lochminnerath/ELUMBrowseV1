import { useEffect, useMemo, type ComponentType, type CSSProperties, type ReactNode } from 'react';
import { Link, Navigate, NavLink, useLocation, useParams, useSearchParams } from 'react-router';
import { ElumLockup } from '../components/Brand';
import { ElumLauncher } from '../components/ElumLauncher';
import * as Icons from '../components/icons/ElumIcons';
import type { IconProps } from '../components/icons/ElumIcons';
import { ACCOUNT_HOME, MAKE_URL, openElsewhere, STORE_URL, TYPE_URL, WRITE_URL } from '../lib/elum';
import { ThemeToggle } from '../theme/ThemeToggle';
import { BASICS, PRODUCTS, type Feature, type ProductId, type Symbol } from './content';
import { COMMON_TROUBLES, GUIDES, searchTroubles, TROUBLES, type Trouble } from './help';
import './docs.css';

const URLS: Record<ProductId, string> = { write: WRITE_URL, type: TYPE_URL, make: MAKE_URL, browse: '/', store: STORE_URL, account: ACCOUNT_HOME };

const SYMBOLS: Record<Symbol, ComponentType<IconProps>> = {
  new: Icons.NewIcon,
  share: Icons.ShareIcon,
  download: Icons.DownloadIcon,
  rename: Icons.RenameIcon,
  duplicate: Icons.DuplicateIcon,
  archive: Icons.ArchiveIcon,
  spam: Icons.SpamIcon,
  unread: Icons.UnreadIcon,
  reply: Icons.ReplyIcon,
  attach: Icons.AttachIcon,
  send: Icons.SendIcon,
  present: Icons.PresentIcon,
  visible: Icons.VisibleIcon,
  private: Icons.PrivateIcon,
  verified: Icons.VerifiedIcon,
  saved: Icons.SavedIcon,
  invite: Icons.InviteIcon,
  star: Icons.StarIcon,
  link: Icons.LinkIcon,
  compose: Icons.ComposeIcon,
  warning: Icons.WarningIcon,
  open: Icons.OpenIcon,
};

function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

/** An ELUM app's mark, in light or dark. */
function AppMark({ id, size }: { id: ProductId; size: number }) {
  return (
    <span className="docs-mark" style={{ width: size, height: size }} aria-hidden="true">
      <img className="theme-light-only" src={`/brand/apps/${id}.svg`} width={size} height={size} alt="" />
      <img className="theme-dark-only" src={`/brand/apps/${id}-reversed.svg`} width={size} height={size} alt="" />
    </span>
  );
}

/** Opens an app: Browse in place, the others signed in through ELUM Account where they can be. */
function OpenApp({ id, children, className }: { id: ProductId; children: ReactNode; className: string }) {
  if (id === 'browse') {
    return (
      <Link to="/" className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={URLS[id]}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        void openElsewhere(URLS[id]);
      }}
    >
      {children}
    </a>
  );
}

function DocsShell({ children }: { children: ReactNode }) {
  return (
    <div className="docs">
      <header className="docs-bar">
        <Link to="/docs" className="docs-bar__brand" aria-label="ELUM Docs home">
          <ElumLockup height={22} />
          <span className="docs-bar__label">Docs</span>
        </Link>
        <div className="docs-bar__end">
          <Link to="/" className="docs-bar__search">
            Search the web
          </Link>
          <ThemeToggle />
          <ElumLauncher />
        </div>
      </header>
      <div className="docs-body">
        <nav className="docs-nav" aria-label="ELUM apps">
          <NavLink to="/docs" end className="docs-nav__link">
            <span className="docs-nav__disc docs-nav__disc--home" aria-hidden="true" />
            Start here
          </NavLink>
          <NavLink to="/docs/troubleshooting" className="docs-nav__link">
            <span className="docs-nav__disc docs-nav__disc--help" aria-hidden="true" />
            Troubleshooting
          </NavLink>
          {PRODUCTS.map((p) => (
            <NavLink key={p.id} to={`/docs/${p.id}`} className="docs-nav__link" style={{ '--app': p.color } as CSSProperties}>
              <AppMark id={p.id} size={22} />
              {p.name}
            </NavLink>
          ))}
        </nav>
        <main className="docs-main">{children}</main>
      </div>
      <footer className="docs-foot">
        <span>Made by you. Runs without AI.</span>
        <span className="muted">ELUM Write, Type, Make, Browse, Store and Account.</span>
      </footer>
    </div>
  );
}

function FeatureCard({ feature, color }: { feature: Feature; color?: string }) {
  const Icon = SYMBOLS[feature.symbol];
  return (
    <li className="docs-card" style={color ? ({ '--app': color } as CSSProperties) : undefined}>
      <span className="docs-card__icon">
        <Icon size={26} />
      </span>
      <h3>{feature.title}</h3>
      <p>{feature.text}</p>
    </li>
  );
}

/** /docs: ELUM as a whole, and a way into each app's starting page. */
export function DocsHome() {
  useTitle('ELUM Docs');
  return (
    <DocsShell>
      <section className="docs-hero docs-hero--home">
        <div className="docs-hero__art" aria-hidden="true">
          <span className="docs-orbit">
            {PRODUCTS.map((p, i) => (
              <span key={p.id} className="docs-orbit__disc" style={{ '--i': i, '--app': p.color } as CSSProperties}>
                <AppMark id={p.id} size={44} />
              </span>
            ))}
          </span>
        </div>
        <div className="docs-hero__text">
          <p className="docs-eyebrow">ELUM Docs</p>
          <h1>Start here</h1>
          <p className="docs-lede">Everything you need to get started with ELUM: one account, six apps, and how they all work together.</p>
        </div>
      </section>

      <section aria-labelledby="docs-apps">
        <h2 id="docs-apps" className="docs-h2">
          The apps
        </h2>
        <ul className="docs-apps">
          {PRODUCTS.map((p, i) => (
            <li key={p.id} style={{ '--app': p.color, '--mist': p.mist, '--i': i } as CSSProperties}>
              <Link to={`/docs/${p.id}`} className="docs-app">
                <AppMark id={p.id} size={52} />
                <span className="docs-app__name">{p.name}</span>
                <span className="docs-app__kind">{p.kind}</span>
                <span className="docs-app__go">Get started</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="docs-basics">
        <h2 id="docs-basics" className="docs-h2">
          The basics
        </h2>
        <ul className="docs-cards">
          {BASICS.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </ul>
      </section>

      <section aria-labelledby="docs-common">
        <div className="docs-h2-row">
          <h2 id="docs-common" className="docs-h2">
            If something goes wrong
          </h2>
          <Link to="/docs/troubleshooting" className="docs-more">
            See all answers
          </Link>
        </div>
        <TroubleList troubles={COMMON_TROUBLES.slice(0, 5)} />
      </section>
    </DocsShell>
  );
}

/** /docs/:product: getting started with one ELUM app. */
export function ProductDoc() {
  const { product } = useParams();
  const p = PRODUCTS.find((x) => x.id === product);
  useTitle(p ? `${p.name} · ELUM Docs` : 'ELUM Docs');
  const { hash } = useLocation();
  // A link to a section (/docs/make#troubleshooting) opens at that section.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [product, hash]);
  if (!p) return <Navigate to="/docs" replace />;
  const others = PRODUCTS.filter((x) => x.id !== p.id);
  return (
    <DocsShell>
      <div className="docs-product" style={{ '--app': p.color, '--mist': p.mist } as CSSProperties}>
        <section className="docs-hero">
          <div className="docs-hero__art" aria-hidden="true">
            <span className="docs-hero__ring" />
            <span className="docs-hero__ring docs-hero__ring--late" />
            <AppMark id={p.id} size={112} />
          </div>
          <div className="docs-hero__text">
            <p className="docs-eyebrow">
              ELUM {p.name} · {p.kind}
            </p>
            <h1>{p.headline}</h1>
            <p className="docs-lede">{p.intro}</p>
            <p className="docs-jump">
              <a href="#guides">How to use {p.name}</a>
              <a href="#troubleshooting">Troubleshooting</a>
            </p>
            <OpenApp id={p.id} className="elum-btn elum-btn--primary docs-open">
              Open {p.name}
            </OpenApp>
          </div>
        </section>

        <section aria-labelledby="docs-steps">
          <h2 id="docs-steps" className="docs-h2">
            First steps
          </h2>
          <ol className="docs-steps">
            {p.steps.map((s, i) => (
              <li key={s.title} className="docs-step" style={{ '--i': i } as CSSProperties}>
                <span className="docs-step__disc" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="docs-features">
          <h2 id="docs-features" className="docs-h2">
            Good to know
          </h2>
          <ul className="docs-cards">
            {p.features.map((f) => (
              <FeatureCard key={f.title} feature={f} color={p.color} />
            ))}
          </ul>
        </section>

        <section aria-labelledby="docs-tips" className="docs-tips">
          <h2 id="docs-tips" className="docs-h2">
            Tips
          </h2>
          <ul>
            {p.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="docs-guides" id="guides">
          <h2 id="docs-guides" className="docs-h2">
            How to use {p.name}
          </h2>
          <div className="docs-guides">
            {GUIDES[p.id].map((g) => (
              <section key={g.title} className="docs-guide">
                <h3>{g.title}</h3>
                <ul>
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section aria-labelledby="docs-trouble" id="troubleshooting">
          <h2 id="docs-trouble" className="docs-h2">
            Troubleshooting {p.name}
          </h2>
          <p className="docs-trouble-intro muted">
            Look for your problem below, or for the message on your screen. For problems that can happen in any app, like signing in, see{' '}
            <Link to="/docs/troubleshooting">Troubleshooting</Link>.
          </p>
          <TroubleList troubles={TROUBLES[p.id]} />
        </section>

        <section aria-labelledby="docs-next">
          <h2 id="docs-next" className="docs-h2">
            More of ELUM
          </h2>
          <ul className="docs-next">
            {others.map((o) => (
              <li key={o.id} style={{ '--app': o.color, '--mist': o.mist } as CSSProperties}>
                <Link to={`/docs/${o.id}`} className="docs-next__link">
                  <AppMark id={o.id} size={32} />
                  <span>
                    <strong>{o.name}</strong>
                    <span className="muted">{o.kind}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </DocsShell>
  );
}

/** Problems as an accordion: the problem, the message, why, and what to do. */
function TroubleList({ troubles, apps }: { troubles: Trouble[]; apps?: (ProductId | null)[] }) {
  return (
    <ul className="docs-troubles">
      {troubles.map((t, i) => {
        const app = apps?.[i] ? PRODUCTS.find((p) => p.id === apps[i]) : null;
        return (
          <li key={`${apps?.[i] ?? ''}${t.problem}`} style={app ? ({ '--app': app.color } as CSSProperties) : undefined}>
            <details className="docs-trouble">
              <summary>
                {app && <AppMark id={app.id} size={20} />}
                <span className="docs-trouble__problem">{t.problem}</span>
              </summary>
              <div className="docs-trouble__body">
                {t.says && (
                  <p className="docs-trouble__says">
                    <span className="docs-trouble__label">What you’ll see</span>“{t.says}”
                  </p>
                )}
                <p>
                  <span className="docs-trouble__label">Why this happens</span>
                  {t.why}
                </p>
                <div>
                  <span className="docs-trouble__label">How to fix it</span>
                  <ol>
                    {t.fix.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </details>
          </li>
        );
      })}
    </ul>
  );
}

/** /docs/troubleshooting: every problem in every app, searchable, by app. */
export function TroubleshootingPage() {
  useTitle('Troubleshooting · ELUM Docs');
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const app = (params.get('app') ?? 'all') as ProductId | 'all' | 'every';
  const found = useMemo(() => searchTroubles(q).filter((x) => app === 'all' || (app === 'every' ? x.product === null : x.product === app)), [q, app]);
  const set = (next: { q?: string; app?: string }) => {
    const merged = { q, app, ...next };
    const out: Record<string, string> = {};
    if (merged.q) out.q = merged.q;
    if (merged.app && merged.app !== 'all') out.app = merged.app;
    setParams(out, { replace: true });
  };
  return (
    <DocsShell>
      <section className="docs-hero docs-hero--help">
        <div className="docs-hero__text">
          <p className="docs-eyebrow">ELUM Docs</p>
          <h1>Troubleshooting</h1>
          <p className="docs-lede">Describe your problem, or type the message you’re seeing. Each answer explains why it happens and how to fix it.</p>
        </div>
      </section>
      <div className="docs-help-tools">
        <input
          className="docs-help-search"
          type="search"
          value={q}
          onChange={(e) => set({ q: e.target.value })}
          placeholder="What’s going wrong?"
          aria-label="Search troubleshooting"
        />
        <div className="segmented docs-help-apps" role="group" aria-label="Which app">
          {[{ id: 'all', name: 'All' }, { id: 'every', name: 'Every app' }, ...PRODUCTS.map((p) => ({ id: p.id, name: p.name }))].map((x) => (
            <button key={x.id} type="button" aria-pressed={app === x.id} onClick={() => set({ app: x.id })}>
              {x.name}
            </button>
          ))}
        </div>
      </div>
      <p className="docs-help-count muted" aria-live="polite">
        {found.length === 1 ? '1 answer' : `${found.length} answers`}
      </p>
      {found.length ? (
        <TroubleList troubles={found.map((x) => x.trouble)} apps={found.map((x) => x.product)} />
      ) : (
        <div className="docs-help-none">
          <h2>We couldn’t find an answer for that</h2>
          <p>Try fewer words, or check the Status page to see whether something is down.</p>
          <Link to="/status" className="elum-btn elum-btn--primary">
            ELUM Status
          </Link>
        </div>
      )}
    </DocsShell>
  );
}
