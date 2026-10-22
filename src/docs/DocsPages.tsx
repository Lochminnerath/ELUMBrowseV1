import { useEffect, useMemo, useRef, useState, type ComponentType, type CSSProperties, type ReactNode } from 'react';
import { Link, Navigate, NavLink, useLocation, useParams, useSearchParams } from 'react-router';
import { ElumLockup } from '../components/Brand';
import { ElumLauncher } from '../components/ElumLauncher';
import * as Icons from '../components/icons/ElumIcons';
import type { IconProps } from '../components/icons/ElumIcons';
import { ACCOUNT_HOME, MAKE_URL, openElsewhere, STORE_URL, TYPE_URL, WRITE_URL } from '../lib/elum';
import { ThemeToggle } from '../theme/ThemeToggle';
import { BASICS, LIVE_PRODUCTS, PRODUCTS, type DocsId, type Feature, type LiveProduct, type ProductId, type Symbol } from './content';
import { allTroubles, COMMON_TROUBLES, GUIDES, searchTroubles, TROUBLES, type Trouble } from './help';
import { CloseUp, CountUp, DevicePair, Phone, SHOTS, useActiveStep, useMotionOk, useScrollEffects, type Crop, type Shot } from './motion';
import './docs.css';
import './showcase.css';

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
function AppMark({ id, size }: { id: DocsId; size: number }) {
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
  const motion = useMotionOk();
  const root = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  useScrollEffects(root, motion, pathname);
  return (
    <div className="docs" ref={root} data-motion={motion || undefined}>
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
              {p.soon && <span className="docs-soon docs-soon--small">Soon</span>}
            </NavLink>
          ))}
        </nav>
        <main className="docs-main">{children}</main>
      </div>
      <footer className="docs-foot">
        <span>Made by you. Runs without AI.</span>
        <span className="muted">ELUM Write, Type, Make, Browse, Store and Account. Tune is coming soon.</span>
      </footer>
    </div>
  );
}

function FeatureCard({ feature, color, i = 0 }: { feature: Feature; color?: string; i?: number }) {
  const Icon = SYMBOLS[feature.symbol];
  return (
    <li className="docs-card" data-reveal="rise" style={{ '--d': i, ...(color ? { '--app': color } : {}) } as CSSProperties}>
      <span className="docs-card__icon">
        <Icon size={26} />
      </span>
      <h3>{feature.title}</h3>
      <p>{feature.text}</p>
    </li>
  );
}

/** A close-up of one feature in each app, from its own screenshots. */
const CROPS: Record<ProductId, Crop> = {
  write: { shot: SHOTS.write.desktop[1], x: 0.6, y: 0, w: 0.4, h: 0.3, title: 'Share it, talk it over', text: 'Share sits at the top of every document, and comments open right beside the text.' },
  type: { shot: SHOTS.type.desktop[1], x: 0.66, y: 0, w: 0.34, h: 0.3, title: 'Know who it’s from', text: 'Messages from other ELUM accounts carry the verified symbol, right next to the name.' },
  make: { shot: SHOTS.make.desktop[1], x: 0.3, y: 0.1, w: 0.5, h: 0.55, title: 'A real canvas', text: 'Your slide sits on a canvas with guides, layers and pages around it.' },
  browse: { shot: SHOTS.browse.desktop[0], x: 0.27, y: 0.18, w: 0.46, h: 0.3, title: 'Just the web', text: 'One box, Google’s results, and no AI answers on top.' },
  store: { shot: SHOTS.store.desktop[0], x: 0.08, y: 0.44, w: 0.8, h: 0.52, title: 'Every app, one tap away', text: 'Each app has a card with Get, so adding one to your account takes a second.' },
  account: { shot: SHOTS.account.desktop[0], x: 0.32, y: 0.06, w: 0.52, h: 0.52, title: 'You, everywhere', text: 'Your name, picture, people and privacy, in one place for every app.' },
};

/** Which screen each first step shows: its index in that app's shots. */
const STEP_SCREENS: Record<ProductId, number[]> = {
  write: [0, 1, 1],
  type: [0, 1, 0],
  make: [0, 1, 1],
  browse: [0, 0, 0],
  store: [0, 0, 0],
  account: [0, 0, 0],
};

/** Where a tap lands on each step's phone screen, to point out the button the step is about. */
const STEP_TAPS: Partial<Record<ProductId, ({ x: number; y: number } | undefined)[]>> = {
  write: [{ x: 0.5, y: 0.05 }, { x: 0.3, y: 0.3 }, { x: 0.86, y: -0.02 }],
  type: [{ x: 0.5, y: 0.1 }, { x: 0.5, y: 0.9 }, { x: 0.5, y: 0.35 }],
  make: [{ x: 0.3, y: 0.18 }, { x: 0.5, y: 0.45 }, { x: 0.82, y: -0.02 }],
  browse: [{ x: 0.5, y: 0.37 }, undefined, { x: 0.32, y: 0.5 }],
};

/** Steps that scroll past a device that stays put, changing its screen to match. */
function Story({
  eyebrow,
  title,
  steps,
  phone,
  laptop,
  screens,
  taps,
  color,
}: {
  eyebrow: string;
  title: string;
  steps: { title: string; text: string; mark?: DocsId; color?: string }[];
  phone: Shot[];
  laptop?: Shot[];
  screens: number[];
  taps?: ({ x: number; y: number } | undefined)[];
  color: string;
}) {
  const [active, step] = useActiveStep(steps.length);
  const at = screens[active] ?? 0;
  const tint = steps[active]?.color ?? color;
  return (
    <section className="sc-story" style={{ '--app': tint } as CSSProperties} aria-label={title}>
      <header className="sc-story__head" data-reveal="rise">
        <p className="docs-eyebrow">{eyebrow}</p>
        <h2 className="sc-big">{title}</h2>
      </header>
      <div className="sc-story__body">
        <div className="sc-story__stage">
          <div className="sc-story__device" data-laptop={laptop ? '' : undefined}>
            {laptop ? (
              <DevicePair laptop={laptop} phone={phone} index={at} />
            ) : (
              <div className="sc-story__phone">
                <Phone shots={phone} index={at} tap={taps?.[active]} key={active} />
              </div>
            )}
          </div>
        </div>
        <ol className="sc-story__steps">
          {steps.map((s, i) => (
            <li key={s.title} ref={step(i)} data-step={i} data-active={i === active || undefined} className="sc-story__step" style={s.color ? ({ '--app': s.color } as CSSProperties) : undefined}>
              <span className="sc-story__num" aria-hidden="true">
                {s.mark ? <AppMark id={s.mark} size={40} /> : String(i + 1).padStart(2, '0')}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** How signing in once works: ELUM Account in the middle, handing your sign-in to every app. */
function SignInDiagram() {
  const apps = LIVE_PRODUCTS.filter((p) => p.id !== 'account');
  return (
    <section className="sc-split" aria-labelledby="sc-once">
      <div className="sc-split__text" data-reveal="rise">
        <p className="docs-eyebrow">Sign in once</p>
        <h2 id="sc-once" className="sc-big">
          One account.
          <br />
          Every app.
        </h2>
        <p className="docs-lede">Sign in to one ELUM app and ELUM Account passes your sign-in along to the rest. Open any app from the apps window and you’re already in.</p>
      </div>
      <div className="sc-diagram" data-reveal="zoom" aria-hidden="true">
        <span className="sc-diagram__hub" style={{ '--app': '#94c858' } as CSSProperties}>
          <AppMark id="account" size={84} />
        </span>
        {apps.map((p, i) => {
          const angle = (i / apps.length) * Math.PI * 2 - Math.PI / 2;
          const dx = Math.cos(angle) * 39;
          const dy = Math.sin(angle) * 39;
          return (
            <span key={p.id} className="sc-diagram__spoke" style={{ '--x': `${dx}%`, '--y': `${dy}%`, '--a': `${(angle * 180) / Math.PI}deg`, '--app': p.color, '--i': i } as CSSProperties}>
              <span className="sc-diagram__line">
                <span className="sc-diagram__dot" />
              </span>
              <span className="sc-diagram__node">
                <AppMark id={p.id} size={46} />
              </span>
            </span>
          );
        })}
      </div>
    </section>
  );
}

/** A sign-in approval, close up: the new device shows a number, and you pick it on one you trust. */
function ApprovalCloseUp() {
  return (
    <section className="sc-split sc-split--flip" aria-labelledby="sc-approve">
      <div className="sc-split__text" data-reveal="rise">
        <p className="docs-eyebrow">Approve new sign-ins</p>
        <h2 id="sc-approve" className="sc-big">Pick the number. You’re in.</h2>
        <p className="docs-lede">
          With approvals on, a new device waits until you pick its number on a device you already use. Devices on the same Wi-Fi get the question first, and an email link works when no other device is near.
        </p>
        <Link to="/docs/troubleshooting?q=approval" className="docs-more">
          Help with approvals
        </Link>
      </div>
      <div className="sc-approve" data-reveal="zoom" aria-hidden="true">
        <div className="sc-approve__card sc-approve__card--new">
          <span className="sc-approve__label">New laptop</span>
          <span className="sc-approve__big">17</span>
          <span className="sc-approve__hint">Pick this number on a device you trust</span>
        </div>
        <span className="sc-approve__link">
          <span />
          <em>Same Wi-Fi</em>
        </span>
        <div className="sc-approve__card">
          <span className="sc-approve__label">Your phone</span>
          <strong>Is this you signing in?</strong>
          <span className="sc-approve__nums">
            <span>42</span>
            <span className="sc-approve__pick">
              17
              <span className="sc-tap sc-tap--here" />
            </span>
            <span>86</span>
          </span>
          <span className="sc-approve__no">No, it’s not me</span>
        </div>
      </div>
    </section>
  );
}

/** Big numbers, counting up. */
function Numbers({ items, motion }: { items: { n: number; label: string; color: string }[]; motion: boolean }) {
  return (
    <ul className="sc-numbers">
      {items.map((x, i) => (
        <li key={x.label} data-reveal="rise" style={{ '--d': i, '--app': x.color } as CSSProperties}>
          <CountUp to={x.n} motion={motion} />
          <span>{x.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** The hero devices, cycling through every app. */
function HeroDevices({ motion }: { motion: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!motion) return;
    const t = window.setInterval(() => document.visibilityState === 'visible' && setI((x) => (x + 1) % LIVE_PRODUCTS.length), 3200);
    return () => window.clearInterval(t);
  }, [motion]);
  const now = LIVE_PRODUCTS[i];
  return (
    <div className="sc-hero__devices" style={{ '--app': now.color } as CSSProperties}>
      <DevicePair laptop={LIVE_PRODUCTS.map((p) => SHOTS[p.id].desktop[0])} phone={LIVE_PRODUCTS.map((p) => SHOTS[p.id].phone[0])} index={i} eager>
        <span className="sc-hero__chip" key={now.id}>
          <AppMark id={now.id} size={20} />
          ELUM {now.name}
        </span>
      </DevicePair>
    </div>
  );
}

/** /docs: ELUM as a whole, and a way into each app's starting page. */
export function DocsHome() {
  useTitle('ELUM Docs');
  const motion = useMotionOk();
  return (
    <DocsShell>
      <section className="sc-hero" data-progress>
        <div className="sc-hero__glow" aria-hidden="true">
          {LIVE_PRODUCTS.map((p, i) => (
            <span key={p.id} style={{ '--app': p.color, '--i': i } as CSSProperties} />
          ))}
        </div>
        <p className="docs-eyebrow sc-hero__eyebrow">ELUM Docs</p>
        <h1 className="sc-hero__title">
          <span>One account.</span> <span>Six apps.</span> <span className="sc-hero__accent">No AI.</span>
        </h1>
        <p className="docs-lede sc-hero__lede">Everything you need to get going with ELUM, on your phone and your computer, and answers for when something goes wrong.</p>
        <p className="sc-hero__links">
          <a href="#sc-apps" className="elum-btn elum-btn--primary">
            Start here
          </a>
          <Link to="/docs/troubleshooting" className="docs-more">
            Troubleshooting
          </Link>
        </p>
        <HeroDevices motion={motion} />
      </section>

      <Story
        eyebrow="The apps"
        title="Made to work together."
        color="#9b84ee"
        phone={LIVE_PRODUCTS.map((p) => SHOTS[p.id].phone[0])}
        laptop={LIVE_PRODUCTS.map((p) => SHOTS[p.id].desktop[0])}
        screens={LIVE_PRODUCTS.map((_, i) => i)}
        steps={LIVE_PRODUCTS.map((p) => ({ title: `${p.name}. ${p.kind}.`, text: p.intro, mark: p.id, color: p.color }))}
      />

      <SignInDiagram />

      <Numbers
        motion={motion}
        items={[
          { n: LIVE_PRODUCTS.length, label: 'apps, free with your account', color: '#9b84ee' },
          { n: 1, label: 'account for all of them', color: '#94c858' },
          { n: 0, label: 'AI, anywhere', color: '#ec7fa9' },
          { n: allTroubles().length, label: 'answers when something goes wrong', color: '#3fc4a0' },
        ]}
      />

      <ApprovalCloseUp />

      <section aria-labelledby="sc-apps" id="sc-apps" className="sc-section">
        <h2 id="sc-apps-title" className="sc-big" data-reveal="rise">
          Pick an app to get started.
        </h2>
        <ul className="docs-apps">
          {PRODUCTS.map((p, i) => (
            <li key={p.id} data-reveal="rise" style={{ '--app': p.color, '--mist': p.mist, '--d': i } as CSSProperties}>
              <Link to={`/docs/${p.id}`} className="docs-app">
                <AppMark id={p.id} size={52} />
                <span className="docs-app__name">{p.name}</span>
                <span className="docs-app__kind">{p.kind}</span>
                {p.soon ? <span className="docs-soon">Coming soon</span> : <span className="docs-app__go">Get started</span>}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="docs-basics" className="sc-section">
        <h2 id="docs-basics" className="sc-big" data-reveal="rise">
          The basics.
        </h2>
        <ul className="docs-cards">
          {BASICS.map((f, i) => (
            <FeatureCard key={f.title} feature={f} i={i} />
          ))}
        </ul>
      </section>

      <section aria-labelledby="docs-common" className="sc-section">
        <div className="docs-h2-row" data-reveal="rise">
          <h2 id="docs-common" className="sc-big">
            If something goes wrong.
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

/** A page for an app that isn't open yet: its mark, its colour, and a promise. */
function SoonDoc({ p }: { p: (typeof PRODUCTS)[number] }) {
  return (
    <div className="docs-product sc-soon" style={{ '--app': p.color, '--mist': p.mist } as CSSProperties}>
      <section className="sc-hero sc-hero--app" data-progress>
        <div className="sc-hero__glow" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
        <div className="sc-soon__mark" aria-hidden="true">
          <span className="docs-hero__ring" />
          <span className="docs-hero__ring docs-hero__ring--late" />
          <AppMark id={p.id} size={150} />
        </div>
        <p className="docs-eyebrow sc-hero__eyebrow">
          ELUM {p.name} · {p.kind}
        </p>
        <h1 className="sc-hero__title">{p.headline}</h1>
        <span className="docs-soon docs-soon--big">Coming soon</span>
        <p className="docs-lede sc-hero__lede">{p.intro}</p>
      </section>
      <section className="docs-tips sc-section" aria-labelledby="docs-tips">
        <h2 id="docs-tips" className="sc-big" data-reveal="rise">
          In the meantime.
        </h2>
        <ul>
          {p.tips.map((t) => (
            <li key={t} data-reveal="rise">
              {t}
            </li>
          ))}
        </ul>
      </section>
      <MoreOfElum id={p.id} />
    </div>
  );
}

function MoreOfElum({ id }: { id: DocsId }) {
  return (
    <section aria-labelledby="docs-next" className="sc-section">
      <h2 id="docs-next" className="sc-big" data-reveal="rise">
        More of ELUM.
      </h2>
      <ul className="docs-next">
        {PRODUCTS.filter((o) => o.id !== id).map((o, i) => (
          <li key={o.id} data-reveal="rise" style={{ '--app': o.color, '--mist': o.mist, '--d': i } as CSSProperties}>
            <Link to={`/docs/${o.id}`} className="docs-next__link">
              <AppMark id={o.id} size={32} />
              <span>
                <strong>{o.name}</strong>
                <span className="muted">{o.soon ? 'Coming soon' : o.kind}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
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
    else window.scrollTo(0, 0);
  }, [product, hash]);
  if (!p) return <Navigate to="/docs" replace />;
  if (p.soon) {
    return (
      <DocsShell>
        <SoonDoc p={p} />
      </DocsShell>
    );
  }
  return (
    <DocsShell>
      <LiveDoc p={p as LiveProduct} />
    </DocsShell>
  );
}

function LiveDoc({ p }: { p: LiveProduct }) {
  const motion = useMotionOk();
  const shots = SHOTS[p.id];
  const crop = CROPS[p.id];
  return (
    <div className="docs-product" style={{ '--app': p.color, '--mist': p.mist } as CSSProperties}>
      <section className="sc-hero sc-hero--app" data-progress>
        <div className="sc-hero__glow" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
        <span className="sc-hero__mark" aria-hidden="true">
          <span className="docs-hero__ring" />
          <AppMark id={p.id} size={76} />
        </span>
        <p className="docs-eyebrow sc-hero__eyebrow">
          ELUM {p.name} · {p.kind}
        </p>
        <h1 className="sc-hero__title">{p.headline}</h1>
        <p className="docs-lede sc-hero__lede">{p.intro}</p>
        <p className="sc-hero__links">
          <OpenApp id={p.id} className="elum-btn elum-btn--primary docs-open">
            Open {p.name}
          </OpenApp>
          <a href="#guides" className="docs-more">
            How to use {p.name}
          </a>
          <a href="#troubleshooting" className="docs-more">
            Troubleshooting
          </a>
        </p>
        <div className="sc-hero__devices">
          <DevicePair laptop={shots.desktop} phone={shots.phone} eager />
        </div>
      </section>

      <Story
        eyebrow="First steps"
        title={`${p.name}, in three steps.`}
        color={p.color}
        phone={shots.phone}
        screens={STEP_SCREENS[p.id]}
        taps={STEP_TAPS[p.id]}
        steps={p.steps}
      />

      <section className="sc-split" aria-labelledby="sc-close">
        <div className="sc-split__text" data-reveal="rise">
          <p className="docs-eyebrow">A closer look</p>
          <h2 id="sc-close" className="sc-big">
            {crop.title}.
          </h2>
          <p className="docs-lede">{crop.text}</p>
        </div>
        <CloseUp crop={crop} color={p.color} />
      </section>

      <section aria-labelledby="docs-features" className="sc-section">
        <h2 id="docs-features" className="sc-big" data-reveal="rise">
          Good to know.
        </h2>
        <ul className="docs-cards">
          {p.features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} color={p.color} i={i} />
          ))}
        </ul>
      </section>

      <Numbers
        motion={motion}
        items={[
          { n: GUIDES[p.id].length, label: `guides to ${p.name}`, color: p.color },
          { n: TROUBLES[p.id].length, label: `answers for ${p.name}`, color: p.color },
          { n: COMMON_TROUBLES.length, label: 'answers for every app', color: p.color },
        ]}
      />

      <section aria-labelledby="docs-tips" className="docs-tips sc-section">
        <h2 id="docs-tips" className="sc-big" data-reveal="rise">
          Tips.
        </h2>
        <ul>
          {p.tips.map((t) => (
            <li key={t} data-reveal="rise">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="docs-guides" id="guides" className="sc-section">
        <h2 id="docs-guides" className="sc-big" data-reveal="rise">
          How to use {p.name}.
        </h2>
        <div className="docs-guides">
          {GUIDES[p.id].map((g, i) => (
            <section key={g.title} className="docs-guide" data-reveal="rise" style={{ '--d': i % 2 } as CSSProperties}>
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

      <section aria-labelledby="docs-trouble" id="troubleshooting" className="sc-section">
        <h2 id="docs-trouble" className="sc-big" data-reveal="rise">
          Troubleshooting {p.name}.
        </h2>
        <p className="docs-trouble-intro muted">
          Look for your problem below, or for the message on your screen. For problems that can happen in any app, like signing in, see{' '}
          <Link to="/docs/troubleshooting">Troubleshooting</Link>.
        </p>
        <TroubleList troubles={TROUBLES[p.id]} />
      </section>

      <MoreOfElum id={p.id} />
    </div>
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
          {[{ id: 'all', name: 'All' }, { id: 'every', name: 'Every app' }, ...LIVE_PRODUCTS.map((p) => ({ id: p.id, name: p.name }))].map((x) => (
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
