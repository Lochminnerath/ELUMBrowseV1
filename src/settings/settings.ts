import { useEffect, useState } from 'react';

/**
 * Browse's settings, kept in this browser only. SafeSearch and remembering searches live in
 * search/local.ts (their keys predate this file); everything else lives here. Changing a
 * setting tells every open Browse page at once, so a change in Settings shows straight away.
 */

export interface BrowseSettings {
  /** Where a search result opens: in a Browse tab, or in a new browser window. */
  openResults: 'tab' | 'window';
  /** Small pictures beside web results. */
  pictures: boolean;
  /** The address bar over web pages and ELUM apps: shown, or tucked away behind a small button. */
  addressBar: 'shown' | 'tucked';
  /** "/" jumps to the search box from anywhere. */
  slash: boolean;
  /** Less motion: Browse's own animations stop, whatever the device says. */
  motion: 'device' | 'less';
  /** The home page's background: a ready-made one, or your own picture. */
  background: BackgroundId;
  /** Browse's colour for buttons, the search box and highlights. Null keeps Browse violet. */
  accent: string | null;
  /** The colour of the tab strip: plain, a tint of the accent, or a colour of your own. */
  strip: 'tint' | 'plain' | string;
}

export type BackgroundId = 'plain' | 'mist' | 'aurora' | 'sunrise' | 'ocean' | 'meadow' | 'night' | 'picture';

/** The home page backgrounds, light to dark. `dark` ones show the words in white. */
export const BACKGROUNDS: { id: BackgroundId; label: string; css: string; dark?: boolean }[] = [
  { id: 'plain', label: 'Plain', css: 'var(--surface)' },
  { id: 'mist', label: 'Mist', css: 'linear-gradient(180deg, var(--browse-mist), var(--surface) 70%)' },
  { id: 'aurora', label: 'Aurora', css: 'radial-gradient(60% 50% at 20% 20%, #c9bdf7 0, transparent 70%), radial-gradient(50% 50% at 85% 30%, #ffd1e3 0, transparent 70%), radial-gradient(60% 60% at 60% 90%, #c7f0e3 0, transparent 70%), #fbfaff' },
  { id: 'sunrise', label: 'Sunrise', css: 'linear-gradient(160deg, #fff1e6 0%, #ffd9cf 45%, #f3d1f4 100%)' },
  { id: 'ocean', label: 'Ocean', css: 'linear-gradient(160deg, #e6f6ff 0%, #c9e8f7 50%, #d9defc 100%)' },
  { id: 'meadow', label: 'Meadow', css: 'linear-gradient(160deg, #f1fbe9 0%, #d3f1dd 55%, #e8f6d3 100%)' },
  { id: 'night', label: 'Night', css: 'radial-gradient(70% 60% at 70% 20%, #3b2f7a 0, transparent 70%), linear-gradient(180deg, #141a2e, #0b0f1c)', dark: true },
];

/** Accent colours: Browse violet first, then the other ELUM colours. */
export const ACCENTS = ['#9b84ee', '#7093f8', '#3fc4a0', '#48bfe3', '#5ec46f', '#e9b949', '#f59a52', '#f06a5f', '#ec7fa9', '#d27fe0'];

export const DEFAULT_SETTINGS: BrowseSettings = { openResults: 'tab', pictures: true, addressBar: 'shown', slash: true, motion: 'device', background: 'plain', accent: null, strip: 'tint' };

const HEX = /^#[0-9a-f]{6}$/i;

const KEY = 'elum.browse.settings';
const EVENT = 'elum-browse-settings';

export function readSettings(): BrowseSettings {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<BrowseSettings>;
    return {
      openResults: raw.openResults === 'window' ? 'window' : 'tab',
      pictures: raw.pictures !== false,
      addressBar: raw.addressBar === 'tucked' ? 'tucked' : 'shown',
      slash: raw.slash !== false,
      motion: raw.motion === 'less' ? 'less' : 'device',
      background: ([...BACKGROUNDS.map((b) => b.id), 'picture'] as string[]).includes(raw.background as string) ? (raw.background as BackgroundId) : 'plain',
      accent: typeof raw.accent === 'string' && HEX.test(raw.accent) ? raw.accent : null,
      strip: raw.strip === 'plain' || (typeof raw.strip === 'string' && HEX.test(raw.strip)) ? raw.strip : 'tint',
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function writeSetting<K extends keyof BrowseSettings>(key: K, value: BrowseSettings[K]) {
  const next = { ...readSettings(), [key]: value };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private browsing: the choice lasts for this page only.
  }
  applyMotion(next);
  applyLook(next);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
}

/** The settings, kept up to date when they change here or in another tab. */
export function useSettings(): BrowseSettings {
  const [settings, setSettings] = useState(readSettings);
  useEffect(() => {
    const update = () => setSettings(readSettings());
    const onStorage = (e: StorageEvent) => e.key === KEY && update();
    window.addEventListener(EVENT, update);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, update);
      window.removeEventListener('storage', onStorage);
    };
  }, []);
  return settings;
}

/** Less motion is a mark on the page that the styles read (styles/base.css). */
export function applyMotion(s: BrowseSettings = readSettings()) {
  if (typeof document === 'undefined') return;
  document.documentElement.toggleAttribute('data-less-motion', s.motion === 'less');
}

/**
 * The accent and the tab strip, as colours on the page that the styles read: --browse (and its
 * pale and line shades, worked out in styles/base.css) and --strip-custom for the tab strip.
 */
export function applyLook(s: BrowseSettings = readSettings()) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (s.accent) {
    root.style.setProperty('--browse', s.accent);
    root.setAttribute('data-accent', '');
  } else {
    root.style.removeProperty('--browse');
    root.removeAttribute('data-accent');
  }
  if (s.strip === 'tint') root.style.removeProperty('--strip-custom');
  else if (s.strip === 'plain') root.style.setProperty('--strip-custom', 'var(--surface)');
  else root.style.setProperty('--strip-custom', s.strip);
  root.toggleAttribute('data-strip-dark', HEX.test(s.strip) && luminance(s.strip) < 0.5);
}

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
}

// ---------------------------------------------------------------- your own picture

const PICTURE_KEY = 'elum.browse.background-picture';

/** Your own background picture, kept in this browser only. */
export function readPicture(): string | null {
  try {
    const v = localStorage.getItem(PICTURE_KEY);
    return v && v.startsWith('data:image/') ? v : null;
  } catch {
    return null;
  }
}

/**
 * Keeps a picture as the home page background: made no larger than 1920 pixels across and saved
 * as a JPEG, so it fits in the browser's storage. Throws when the picture cannot be read or kept.
 */
export async function savePicture(file: File): Promise<void> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1920 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const data = canvas.toDataURL('image/jpeg', 0.82);
  localStorage.setItem(PICTURE_KEY, data);
  writeSetting('background', 'picture');
}

export function removePicture() {
  try {
    localStorage.removeItem(PICTURE_KEY);
  } catch {
    // Nothing kept.
  }
  if (readSettings().background === 'picture') writeSetting('background', 'plain');
}
