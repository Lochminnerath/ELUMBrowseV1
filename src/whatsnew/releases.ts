import type { Art } from './scenes';

/**
 * What changed in Browse, newest first. Add a release at the top whenever an update ships: people
 * get a short animated tour of it the next time they open Browse, and can replay every release
 * from the account menu (What's new). Give each release a new id; the date is shown as written.
 *
 * Each feature is one step of the tour. `art` picks its animated picture (see scenes.tsx):
 * mark, share, devices, layers, check or spark.
 */

export interface Feature {
  title: string;
  text: string;
  art: Art;
}

export interface Release {
  /** Unique and never reused, such as 2026-10-18. */
  id: string;
  date: string;
  title: string;
  /** One or two sentences under the title on the opening step. */
  intro: string;
  features: Feature[];
}

export const APP_NAME = 'Browse';

export const RELEASES: Release[] = [
  {
    id: '2026-10-20-store',
    date: '20 October 2026',
    title: 'ELUM Store, in Browse',
    intro: 'Every ELUM app in one place. Type store to open it in a Browse tab.',
    features: [
      { title: 'Store in a tab', text: 'Type store, or store.elum.services, and ELUM Store opens in a Browse tab, signed in.', art: 'spark' },
      { title: 'Open apps in Browse', text: 'In Store, the arrow beside Open opens any ELUM app in a Browse tab.', art: 'devices' },
    ],
  },
  {
    id: '2026-10-20-pages',
    date: '20 October 2026',
    title: 'Pages stay in Browse',
    intro: 'Results and the addresses you type now open in Browse tabs.',
    features: [
      { title: 'Pages stay in Browse', text: 'A result opens in a Browse tab, never in place of Browse. Sites that refuse to be shown inside other sites open as a clean reading view, and Open in new window is always there.', art: 'devices' },
      { title: 'Type an address', text: 'Type wikipedia.org, or any web address, into the search box and it opens in the tab.', art: 'spark' },
    ],
  },
  {
    id: '2026-10-20',
    date: '20 October 2026',
    title: 'Browse, with tabs',
    intro: 'Keep searches and ELUM apps open side by side, and see how ELUM is doing.',
    features: [
      { title: 'ELUM apps in Browse', text: 'Type write, type, make or account and the app opens in a Browse tab, under its elum.services address. Open in new window gives it a window of its own.', art: 'spark' },
      { title: 'Tab groups', text: 'Right-click a tab to group it, and give the group a name, a colour and an ELUM symbol. Click the group to fold it away.', art: 'layers' },
      { title: 'ELUM status', text: 'Status, linked under the search box, checks every ELUM app and what they run on, each minute.', art: 'check' },
      { title: 'ELUM Docs', text: 'A starting page for every ELUM app, on your phone or your computer.', art: 'mark' },
    ],
  },
  {
    id: '2026-10-19',
    date: '19 October 2026',
    title: "ELUM Browse is here",
    intro: "Search the web with ELUM: Google results, without AI answers.",
    features: [
      {
        title: "Just the web",
        text: "Results come from Google, the ten blue links. No AI Overviews, no Gemini, and results that lead to AI chat products are left out.",
        art: 'check',
      },
      {
        title: "Private by default",
        text: "ELUM does not keep your searches. Recent searches stay on this device, and you can pause or clear them.",
        art: 'share',
      },
      {
        title: "Images too",
        text: "Switch to Images for pictures from across the web, with SafeSearch on unless you turn it off.",
        art: 'layers',
      },
      {
        title: "One ELUM account",
        text: "Sign in once for Browse, Write, Type, Make and your account, and move between them from the apps window.",
        art: 'devices',
      },
    ],
  },
];

/** The releases someone has not seen yet, given the last one they saw. New visitors see the latest. */
export function unseenReleases(releases: Release[], lastSeen: string | null): Release[] {
  if (!releases.length) return [];
  const at = lastSeen ? releases.findIndex((r) => r.id === lastSeen) : -1;
  return at === -1 ? releases.slice(0, 1) : releases.slice(0, at);
}

export interface Step {
  key: string;
  eyebrow: string;
  title: string;
  text: string;
  art: Art;
}

/** The tour for some releases: each opens with its title, then one step per feature. */
export function tourSteps(releases: Release[]): Step[] {
  return releases.flatMap((r) => [
    { key: `${r.id}:intro`, eyebrow: `New in ${APP_NAME} · ${r.date}`, title: r.title, text: r.intro, art: 'mark' as const },
    ...r.features.map((f, i) => ({ key: `${r.id}:${i}`, eyebrow: r.title, title: f.title, text: f.text, art: f.art })),
  ]);
}
