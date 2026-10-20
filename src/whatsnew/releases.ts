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
