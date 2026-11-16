import type { ReactNode } from 'react';
import './steps.css';

/**
 * A small picture of the software for a troubleshooting step: the part of the screen the step is
 * about, drawn in ELUM's own style, with the thing to press ringed. The pictures are drawn here
 * (not screenshots), so they stay sharp, follow light and dark, and never go out of date with a
 * person's own data in them.
 */

export type StepScene =
  | 'reload'
  | 'signin'
  | 'passkey'
  | 'account'
  | 'share'
  | 'store'
  | 'settings'
  | 'connection'
  | 'search'
  | 'menu'
  | 'upload'
  | 'inbox'
  | 'password'
  | 'bell'
  | 'support'
  | 'player'
  | 'launcher';

/** Which picture fits a step, from its words. The first match wins, most specific first. */
const RULES: [RegExp, StepScene][] = [
  [/\bpasskey|fingerprint|face id|touch id|windows hello|security key\b/i, 'passkey'],
  [/\b(reload|refresh) (the|this|your)? ?(page|tab|app)|\breload\b|\brefresh\b|close the tab|open (it|the app) again/i, 'reload'],
  [/apps window|the dots at the top|nine dots|app launcher/i, 'launcher'],
  [/\bpassword\b/i, 'password'],
  [/\b(choose|press|click|tap|use) sign in\b|\bsign (in|out)\b|sign-in (page|window|screen)/i, 'signin'],
  [/\b(wi-?fi|connection|internet|offline|online|network|signal)\b/i, 'connection'],
  [/\bshar(e|ed|ing)\b|invite/i, 'share'],
  [/\bELUM Store\b|\bthe Store\b|\bGet\b/, 'store'],
  [/\bbell\b|notification/i, 'bell'],
  [/\bsupport\b|contact us|tell us/i, 'support'],
  [/\bELUM Account\b|\byour account\b|your picture|profile/i, 'account'],
  [/\bsettings?\b|turn (on|off)|switch\b/i, 'settings'],
  [/\b(upload|attach|drag|drop|choose a file|file is too)\b/i, 'upload'],
  [/\b(inbox|email|message|spam|sender)\b/i, 'inbox'],
  [/\bsearch\b|look for/i, 'search'],
  [/\b(play|pause|song|queue|volume|headphones|speaker)\b/i, 'player'],
  [/\bmenu\b|\bdelete\b|\brename\b|\bundo\b|\bexport\b|\bdownload\b/i, 'menu'],
];

export function sceneFor(step: string): StepScene | null {
  for (const [pattern, scene] of RULES) if (pattern.test(step)) return scene;
  return null;
}

const CAPTIONS: Record<StepScene, string> = {
  reload: 'The reload button, beside the address at the top of your browser.',
  signin: 'The sign-in window. Your ELUM account opens every app.',
  passkey: 'Your device asks for your fingerprint, face or PIN.',
  account: 'Your picture, top right, opens your account.',
  share: 'The Share window: add a person, then choose what they can do.',
  store: 'An app in ELUM Store, with its Get button.',
  settings: 'A switch in Settings.',
  connection: 'The connection symbol on your device.',
  search: 'The search box.',
  menu: 'The three dots open the menu for that item.',
  upload: 'Drop a file here, or choose one.',
  inbox: 'Your inbox in Type.',
  password: 'The password box. The eye shows what you typed.',
  bell: 'The bell, top right, holds your notifications.',
  support: 'The support form. A person reads every message.',
  player: 'The player, with play and pause in the middle.',
  launcher: 'The dots, top right, open the apps window.',
};

const Win = ({ children, bar = true }: { children: ReactNode; bar?: boolean }) => (
  <div className="sp-win">
    {bar && (
      <div className="sp-win__bar">
        <i />
        <i />
        <i />
      </div>
    )}
    <div className="sp-win__body">{children}</div>
  </div>
);
const Line = ({ w = 60, strong = false }: { w?: number; strong?: boolean }) => <span className="sp-line" data-strong={strong || undefined} style={{ width: `${w}%` }} />;
const Ring = ({ children }: { children: ReactNode }) => <span className="sp-ring">{children}</span>;
const Btn = ({ children, primary = false }: { children: ReactNode; primary?: boolean }) => (
  <span className="sp-btn" data-primary={primary || undefined}>
    {children}
  </span>
);
const Dot = ({ c }: { c?: string }) => <span className="sp-dot" style={c ? { background: c } : undefined} />;

function scene(kind: StepScene): ReactNode {
  switch (kind) {
    case 'reload':
      return (
        <div className="sp-browser">
          <span className="sp-browser__nav">‹ ›</span>
          <Ring>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5" />
            </svg>
          </Ring>
          <span className="sp-browser__address">
            <Dot c="var(--app, var(--browse))" /> elum.services
          </span>
        </div>
      );
    case 'signin':
      return (
        <Win>
          <span className="sp-mark" />
          <Line w={46} strong />
          <span className="sp-field">you@elum.services</span>
          <Ring>
            <Btn primary>Continue</Btn>
          </Ring>
        </Win>
      );
    case 'passkey':
      return (
        <Win bar={false}>
          <Ring>
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M7 11a5 5 0 0 1 10 0v2M9.5 11a2.5 2.5 0 0 1 5 0v4.5M12 11v6M5 14c0-2 .3-3 .8-4.2M17.5 19c.9-1.4 1.5-3.2 1.5-5.500" />
            </svg>
          </Ring>
          <Line w={62} strong />
          <Line w={44} />
          <span className="sp-row">
            <Btn>Cancel</Btn>
            <Btn primary>Continue</Btn>
          </span>
        </Win>
      );
    case 'account':
      return (
        <div className="sp-topbar">
          <Line w={30} strong />
          <span className="sp-topbar__right">
            <span className="sp-icon">⋮⋮</span>
            <Ring>
              <span className="sp-avatar">A</span>
            </Ring>
          </span>
          <div className="sp-pop">
            <span className="sp-pop__item">ELUM Account</span>
            <span className="sp-pop__item">Sign out</span>
          </div>
        </div>
      );
    case 'share':
      return (
        <Win>
          <Line w={30} strong />
          <Ring>
            <span className="sp-field">Add a name or email</span>
          </Ring>
          <span className="sp-row sp-row--between">
            <span className="sp-person">
              <span className="sp-avatar sp-avatar--sm">M</span> Maya
            </span>
            <span className="sp-pill">Can edit ▾</span>
          </span>
          <Btn primary>Share</Btn>
        </Win>
      );
    case 'store':
      return (
        <Win>
          <span className="sp-row sp-row--between">
            <span className="sp-person">
              <span className="sp-app" /> <Line w={70} strong />
            </span>
            <Ring>
              <Btn primary>Get</Btn>
            </Ring>
          </span>
          <Line w={88} />
          <Line w={64} />
        </Win>
      );
    case 'settings':
      return (
        <Win>
          <Line w={34} strong />
          <span className="sp-row sp-row--between">
            <Line w={52} />
            <Ring>
              <span className="sp-switch" data-on />
            </Ring>
          </span>
          <span className="sp-row sp-row--between">
            <Line w={44} />
            <span className="sp-switch" />
          </span>
        </Win>
      );
    case 'connection':
      return (
        <div className="sp-status">
          <span className="sp-status__time">9:41</span>
          <Ring>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M2.5 9a14 14 0 0 1 19 0M6 12.5a9 9 0 0 1 12 0M9.2 16a4.5 4.5 0 0 1 5.6 0" />
              <circle cx="12" cy="19" r="1" fill="currentColor" />
            </svg>
          </Ring>
          <span className="sp-battery" />
        </div>
      );
    case 'search':
      return (
        <div className="sp-topbar">
          <Ring>
            <span className="sp-field sp-field--search">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l4.500 4.500" />
              </svg>
              Search
            </span>
          </Ring>
        </div>
      );
    case 'menu':
      return (
        <Win>
          <span className="sp-row sp-row--between">
            <Line w={56} strong />
            <Ring>
              <span className="sp-icon">⋯</span>
            </Ring>
          </span>
          <div className="sp-pop sp-pop--inline">
            <span className="sp-pop__item">Rename</span>
            <span className="sp-pop__item">Make a copy</span>
            <span className="sp-pop__item" data-danger>
              Delete
            </span>
          </div>
        </Win>
      );
    case 'upload':
      return (
        <Win>
          <Ring>
            <span className="sp-drop">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M12 16V5M7.5 9.500 12 5l4.500 4.500M5 19h14" />
              </svg>
              Drop a file here
            </span>
          </Ring>
          <Btn>Choose a file</Btn>
        </Win>
      );
    case 'inbox':
      return (
        <Win>
          {[72, 58, 66].map((w, i) => (
            <span key={w} className="sp-mail" data-unread={i === 0 || undefined}>
              <span className="sp-avatar sp-avatar--sm">{'MJA'[i]}</span>
              <span className="sp-mail__text">
                <Line w={w} strong={i === 0} />
                <Line w={w - 20} />
              </span>
            </span>
          ))}
        </Win>
      );
    case 'password':
      return (
        <Win>
          <Line w={36} strong />
          <Ring>
            <span className="sp-field sp-field--password">
              ••••••••••
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M2 12s3.600-6.500 10-6.500S22 12 22 12s-3.600 6.500-10 6.500S2 12 2 12z" />
                <circle cx="12" cy="12" r="2.800" />
              </svg>
            </span>
          </Ring>
          <Btn primary>Sign in</Btn>
        </Win>
      );
    case 'bell':
      return (
        <div className="sp-topbar">
          <Line w={30} strong />
          <span className="sp-topbar__right">
            <Ring>
              <span className="sp-icon sp-icon--bell">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 16.500V11a6 6 0 0 1 12 0v5.500l1.500 1.500h-15zM10 20.500a2 2 0 0 0 4 0" />
                </svg>
                <b />
              </span>
            </Ring>
            <span className="sp-avatar">A</span>
          </span>
          <div className="sp-pop">
            <span className="sp-pop__item">
              <Dot c="var(--write, #f59a52)" /> Shared with you
            </span>
            <span className="sp-pop__item">
              <Dot c="var(--type, #3fc4a0)" /> New message
            </span>
          </div>
        </div>
      );
    case 'support':
      return (
        <Win>
          <Line w={48} strong />
          <span className="sp-field sp-field--area">What happened?</span>
          <Ring>
            <Btn primary>Send</Btn>
          </Ring>
        </Win>
      );
    case 'launcher':
      return (
        <div className="sp-topbar">
          <Line w={30} strong />
          <span className="sp-topbar__right">
            <Ring>
              <span className="sp-dots">
                {Array.from({ length: 9 }, (_, i) => (
                  <i key={i} />
                ))}
              </span>
            </Ring>
            <span className="sp-avatar">A</span>
          </span>
          <div className="sp-pop sp-pop--apps">
            {['write', 'type', 'make', 'tune', 'store', 'browse'].map((a) => (
              <span key={a} className="sp-app" style={{ background: `var(--${a}, var(--elum-blue))` }} />
            ))}
          </div>
        </div>
      );
    case 'player':
      return (
        <Win bar={false}>
          <span className="sp-row">
            <span className="sp-cover" />
            <span className="sp-mail__text">
              <Line w={70} strong />
              <Line w={44} />
            </span>
          </span>
          <span className="sp-progress">
            <i />
          </span>
          <span className="sp-row sp-row--centre">
            <span className="sp-icon">⏮</span>
            <Ring>
              <span className="sp-play">▶</span>
            </Ring>
            <span className="sp-icon">⏭</span>
          </span>
        </Win>
      );
  }
}

/** The picture for one step, or nothing when no picture fits. */
export function StepPicture({ step }: { step: string }) {
  const kind = sceneFor(step);
  if (!kind) return null;
  return (
    <figure className="sp" data-scene={kind}>
      <div className="sp__art" aria-hidden="true">
        {scene(kind)}
      </div>
      <figcaption>{CAPTIONS[kind]}</figcaption>
    </figure>
  );
}
