import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router';
import { BrowseHeader } from '../search/BrowseHeader';
import { clearSearches, historyPaused, recentSearches, safeSearch, setHistoryPaused, setSafeSearch } from '../search/local';
import { useTheme, type ThemePreference } from '../theme/ThemeProvider';
import { ACCOUNT_HOME } from '../lib/elum';
import { LiveBackground } from './LiveBackground';
import { PolicyLinks } from '../components/Disclosure';
import { ACCENTS, BACKGROUNDS, NIGHT_BASE, readPicture, removePicture, savePicture, useSettings, writeSetting } from './settings';
import '../search/browse.css';
import './settings.css';

/** A setting with its words on the left and its switch or choice on the right. */
function Row({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <div className="setting">
      <div className="setting__words">
        <span className="setting__title">{title}</span>
        <span className="setting__text">{text}</span>
      </div>
      <div className="setting__control">{children}</div>
    </div>
  );
}

function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange(v: boolean): void }) {
  return <input type="checkbox" className="switch" role="switch" aria-label={label} checked={checked} onChange={(e) => onChange(e.target.checked)} />;
}

function Choice<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange(v: T): void }) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Section({ title, symbol, children }: { title: string; symbol: string; children: ReactNode }) {
  return (
    <section className="settings__section" aria-label={title}>
      <h2 className="settings__heading">
        <span className={`settings__symbol settings__symbol--${symbol}`} aria-hidden="true" />
        {title}
      </h2>
      <div className="settings__card">{children}</div>
    </section>
  );
}

/** /settings: everything Browse lets you choose, kept on this device. */
export function SettingsPage() {
  const s = useSettings();
  const { preference, setPreference } = useTheme();
  const [safe, setSafe] = useState(safeSearch);
  const [remember, setRemember] = useState(() => !historyPaused());
  const [count, setCount] = useState(() => recentSearches().length);
  const [picture, setPicture] = useState(readPicture);
  const [pictureError, setPictureError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const customAccent = s.accent && !ACCENTS.includes(s.accent) ? s.accent : null;
  const customStrip = s.strip !== 'tint' && s.strip !== 'plain' ? s.strip : null;

  useEffect(() => {
    document.title = 'Settings · ELUM Browse';
  }, []);

  return (
    <div className="browse">
      <BrowseHeader compact />
      <main className="settings">
        <header className="settings__intro">
          <p className="settings__eyebrow">Browse</p>
          <h1>Settings</h1>
          <p className="muted">These choices stay on this device. Nothing here is sent to ELUM.</p>
        </header>

        <Section title="Search" symbol="search">
          <Row title="SafeSearch" text="Leave out explicit results, such as pornography, from web and image searches.">
            <Switch
              label="SafeSearch"
              checked={safe}
              onChange={(v) => {
                setSafeSearch(v);
                setSafe(v);
              }}
            />
          </Row>
          <Row title="Pictures beside results" text="Show a small picture next to a result when the page has one.">
            <Switch label="Pictures beside results" checked={s.pictures} onChange={(v) => writeSetting('pictures', v)} />
          </Row>
          <Row title="Press / to search" text="Jump to the search box from anywhere in Browse with the / key.">
            <Switch label="Press / to search" checked={s.slash} onChange={(v) => writeSetting('slash', v)} />
          </Row>
        </Section>

        <Section title="Pages and apps" symbol="pages">
          <Row title="Open results in" text="A Browse tab keeps everything in one place. A new window opens the site on its own.">
            <Choice
              label="Open results in"
              value={s.openResults}
              options={[
                { value: 'tab', label: 'Browse tab' },
                { value: 'window', label: 'New window' },
              ]}
              onChange={(v) => writeSetting('openResults', v)}
            />
          </Row>
          <Row title="Address bar over pages" text="Tuck it away for a cleaner page. A small button brings it back whenever you need it.">
            <Choice
              label="Address bar over pages"
              value={s.addressBar}
              options={[
                { value: 'shown', label: 'Shown' },
                { value: 'tucked', label: 'Tucked away' },
              ]}
              onChange={(v) => writeSetting('addressBar', v)}
            />
          </Row>
        </Section>

        <Section title="Privacy" symbol="privacy">
          <Row title="Remember searches on this device" text="Recent searches show as you type. They never leave this browser.">
            <Switch
              label="Remember searches on this device"
              checked={remember}
              onChange={(v) => {
                setHistoryPaused(!v);
                setRemember(v);
                if (!v) setCount(0);
              }}
            />
          </Row>
          <Row title="Recent searches" text={count ? `${count} ${count === 1 ? 'search is' : 'searches are'} remembered on this device.` : 'Nothing is remembered right now.'}>
            <button
              type="button"
              className="elum-btn elum-btn--secondary elum-btn--sm"
              disabled={!count}
              onClick={() => {
                clearSearches();
                setCount(0);
              }}
            >
              Clear
            </button>
          </Row>
        </Section>

        <Section title="Your information" symbol="privacy">
          <div className="setting setting--wide">
            <div className="setting__words">
              <span className="setting__title">Searches and ads</span>
              <span className="setting__text">
                Results come from Google, which processes your searches and the details your browser sends, and may use and share them under its own policies. Ads may be shown by
                Google and other services. ELUM never sells or shares your personal information.
              </span>
            </div>
            <PolicyLinks />
          </div>
          <div className="setting setting--wide">
            <div className="setting__words">
              <span className="setting__title">Websites that are not ELUM sites</span>
              <span className="setting__text">
                What you enter on other websites, such as forms or sign-ins, goes to those websites and is not managed by ELUM. Only ELUM sites, like the apps at elum.space, handle your
                information under ELUM’s privacy policy.
              </span>
            </div>
          </div>
        </Section>

        <Section title="Look" symbol="look">
          <Row title="Theme" text="Follow your device, or keep Browse light or dark.">
            <Choice<ThemePreference>
              label="Theme"
              value={preference}
              options={[
                { value: 'system', label: 'Device' },
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
              ]}
              onChange={setPreference}
            />
          </Row>
          <div className="setting setting--wide">
            <div className="setting__words">
              <span className="setting__title">Home page background</span>
              <span className="setting__text">Live ones drift slowly in every ELUM colour. Or pick a soft colour, a gradient, or a picture of your own, which stays in this browser.</span>
            </div>
            <div className="look-grid" role="radiogroup" aria-label="Home page background">
              {BACKGROUNDS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  role="radio"
                  aria-checked={s.background === b.id}
                  className="look-grid__item"
                  onClick={() => writeSetting('background', b.id)}
                >
                  <span className="look-grid__swatch" style={{ background: b.css }}>
                    {b.live && (
                      <>
                        <LiveBackground colors={b.live} base={b.dark ? NIGHT_BASE : undefined} />
                        <span className="look-grid__live">Live</span>
                      </>
                    )}
                  </span>
                  {b.label}
                </button>
              ))}
              <button
                type="button"
                role="radio"
                aria-checked={s.background === 'picture'}
                className="look-grid__item"
                onClick={() => (picture ? writeSetting('background', 'picture') : fileRef.current?.click())}
              >
                <span className="look-grid__swatch look-grid__swatch--picture" style={picture ? ({ backgroundImage: `url("${picture}")` } as CSSProperties) : undefined}>
                  {!picture && <span aria-hidden="true">+</span>}
                </span>
                Your picture
              </button>
            </div>
            <div className="look-actions">
              <button type="button" className="elum-btn elum-btn--secondary elum-btn--sm" onClick={() => fileRef.current?.click()}>
                {picture ? 'Choose another picture' : 'Choose a picture'}
              </button>
              {picture && (
                <button
                  type="button"
                  className="elum-btn elum-btn--quiet elum-btn--sm"
                  onClick={() => {
                    removePicture();
                    setPicture(null);
                  }}
                >
                  Remove picture
                </button>
              )}
              {pictureError && <span className="look-error" role="alert">{pictureError}</span>}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/avif"
              hidden
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = '';
                if (!file) return;
                setPictureError('');
                try {
                  await savePicture(file);
                  setPicture(readPicture());
                } catch {
                  setPictureError('That picture could not be used. Try a smaller PNG or JPEG.');
                }
              }}
            />
          </div>
          <div className="setting setting--wide">
            <div className="setting__words">
              <span className="setting__title">Accent colour</span>
              <span className="setting__text">The colour of the search box, buttons and highlights.</span>
            </div>
            <div className="swatches" role="radiogroup" aria-label="Accent colour">
              {ACCENTS.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={i === 0 ? !s.accent : s.accent === c}
                  aria-label={i === 0 ? 'Browse violet' : c}
                  className="swatches__item"
                  style={{ background: c }}
                  onClick={() => writeSetting('accent', i === 0 ? null : c)}
                />
              ))}
              <label className="swatches__item swatches__item--custom" data-checked={customAccent ? '' : undefined} style={customAccent ? { background: customAccent } : undefined} aria-label="A colour of your own">
                <input type="color" value={customAccent ?? '#9b84ee'} onChange={(e) => writeSetting('accent', e.target.value)} />
              </label>
            </div>
          </div>
          <div className="setting setting--wide">
            <div className="setting__words">
              <span className="setting__title">Tab strip</span>
              <span className="setting__text">The colour behind your tabs at the top of Browse.</span>
            </div>
            <div className="swatches" role="radiogroup" aria-label="Tab strip colour">
              <button type="button" role="radio" aria-checked={s.strip === 'tint'} className="swatches__item swatches__item--labelled" style={{ background: 'var(--browse-mist)' }} onClick={() => writeSetting('strip', 'tint')}>
                Tint
              </button>
              <button type="button" role="radio" aria-checked={s.strip === 'plain'} className="swatches__item swatches__item--labelled" style={{ background: 'var(--surface)' }} onClick={() => writeSetting('strip', 'plain')}>
                Plain
              </button>
              {['#e9ecf5', '#fde4cf', '#d4f1e8', '#fadbe7', '#d6eef7', '#141a2e', '#3b2f7a'].map((c) => (
                <button key={c} type="button" role="radio" aria-checked={s.strip === c} aria-label={c} className="swatches__item" style={{ background: c }} onClick={() => writeSetting('strip', c)} />
              ))}
              <label className="swatches__item swatches__item--custom" data-checked={customStrip && !['#e9ecf5', '#fde4cf', '#d4f1e8', '#fadbe7', '#d6eef7', '#141a2e', '#3b2f7a'].includes(customStrip) ? '' : undefined} aria-label="A colour of your own">
                <input type="color" value={customStrip ?? '#e9ecf5'} onChange={(e) => writeSetting('strip', e.target.value)} />
              </label>
            </div>
          </div>
          <Row title="Motion" text="Less motion stops Browse's own animations, even if your device allows them.">
            <Choice
              label="Motion"
              value={s.motion}
              options={[
                { value: 'device', label: 'Follow device' },
                { value: 'less', label: 'Less motion' },
              ]}
              onChange={(v) => writeSetting('motion', v)}
            />
          </Row>
        </Section>

        <p className="settings__more muted">
          Your name, picture, password and sign-in are in <a href={ACCOUNT_HOME}>ELUM Account</a>. Questions? Read the <Link to="/docs/browse">Browse guide</Link>.
        </p>
      </main>
    </div>
  );
}
