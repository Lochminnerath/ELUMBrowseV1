import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react';
import type { DocsId } from './content';

/**
 * The moving parts of ELUM Docs: things that appear as you scroll, devices that drift apart, and
 * screens that change. Everything here is decoration over a page that already reads well standing
 * still: with reduced motion (or before the script runs) every section is simply shown.
 */

/** Whether motion is welcome: false when the device asks for reduced motion. */
export function useMotionOk(): boolean {
  const query = typeof window !== 'undefined' ? window.matchMedia?.('(prefers-reduced-motion: reduce)') : undefined;
  const [ok, setOk] = useState(() => !query?.matches);
  useEffect(() => {
    if (!query) return;
    const on = () => setOk(!query.matches);
    query.addEventListener('change', on);
    return () => query.removeEventListener('change', on);
  }, [query]);
  return ok;
}

/**
 * Watches a page for scroll effects. `[data-reveal]` elements get `data-shown` once they come into
 * view; `[data-progress]` elements get `--p`, from 0 as they enter the bottom of the screen to 1 as
 * they leave the top. `key` changes when the page does, so new elements are picked up.
 */
export function useScrollEffects(root: RefObject<HTMLElement | null>, on: boolean, key: string) {
  useEffect(() => {
    const el = root.current;
    if (!el || !on) return;
    const seen = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute('data-shown', '');
          seen.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );
    el.querySelectorAll('[data-reveal]:not([data-shown])').forEach((x) => seen.observe(x));

    const moving = [...el.querySelectorAll<HTMLElement>('[data-progress]')];
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const m of moving) {
        const r = m.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        m.style.setProperty('--p', p.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    // Docs can scroll inside a Browse tab rather than the window, so listen for any scroll.
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll);
    return () => {
      seen.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
    };
  }, [root, on, key]);
}

/** Which of a list of steps is in the middle of the screen. */
export function useActiveStep(count: number): [number, (i: number) => (el: HTMLElement | null) => void] {
  const [active, setActive] = useState(0);
  const els = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    els.current.slice(0, count).forEach((x) => x && io.observe(x));
    return () => io.disconnect();
  }, [count]);
  return [active, (i) => (el) => void (els.current[i] = el)];
}

/** Counts up to a number the first time it comes into view. Shows the number itself without motion. */
export function CountUp({ to, motion }: { to: number; motion: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || !motion) return;
    setN(0);
    let frame = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / 1400);
        setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, motion]);
  return (
    <span ref={ref} className="sc-count">
      {n}
    </span>
  );
}

/** Real screenshots of each app, taken from the apps themselves (public/docs/shots). */
export interface Shot {
  src: string;
  alt: string;
}

const shot = (name: string, alt: string): Shot => ({ src: `/docs/shots/${name}.webp`, alt });

export const SHOTS: Record<Exclude<DocsId, 'tune' | 'inquire' | 'home'>, { desktop: Shot[]; phone: Shot[] }> = {
  write: {
    desktop: [shot('write-desktop', 'ELUM Write showing all your documents'), shot('write-desktop-open', 'A document open in ELUM Write')],
    phone: [shot('write-phone', 'ELUM Write on a phone, with your documents'), shot('write-phone-open', 'A document open in ELUM Write on a phone')],
  },
  type: {
    desktop: [shot('type-desktop', 'The ELUM Type inbox'), shot('type-desktop-open', 'A conversation open in ELUM Type')],
    phone: [shot('type-phone', 'The ELUM Type inbox on a phone'), shot('type-phone-open', 'A conversation in ELUM Type on a phone')],
  },
  make: {
    desktop: [shot('make-desktop', 'ELUM Make’s sizes and templates'), shot('make-desktop-open', 'A slide being designed in ELUM Make')],
    phone: [shot('make-phone', 'ELUM Make on a phone'), shot('make-phone-open', 'A slide in ELUM Make on a phone')],
  },
  browse: {
    desktop: [shot('browse-desktop', 'ELUM Browse, ready to search the web')],
    phone: [shot('browse-phone', 'ELUM Browse on a phone')],
  },
  store: {
    desktop: [shot('store-desktop', 'ELUM Store, with every ELUM app')],
    phone: [shot('store-phone', 'ELUM Store on a phone')],
  },
  account: {
    desktop: [shot('account-desktop', 'The ELUM Account overview')],
    phone: [shot('account-phone', 'ELUM Account on a phone')],
  },
};

/** A close-up: part of a desktop screenshot, given as fractions of its width and height. */
export interface Crop {
  shot: Shot;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  text: string;
}

/** Screens that cross-fade: every shot is laid out at once, so nothing shifts as they change. */
function Screens({ shots, index, width, height, eager }: { shots: Shot[]; index: number; width: number; height: number; eager?: boolean }) {
  return (
    <>
      {shots.map((s, i) => (
        <img
          key={s.src}
          className="sc-screen"
          src={s.src}
          alt={i === index ? s.alt : ''}
          aria-hidden={i === index ? undefined : true}
          data-on={i === index || undefined}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      ))}
    </>
  );
}

/** A generic phone: dark frame, thin lighter edge, a pill at the top, a status bar, and a screen. */
export function Phone({ shots, index = 0, eager, tap }: { shots: Shot[]; index?: number; eager?: boolean; tap?: { x: number; y: number } }) {
  return (
    <div className="sc-phone">
      <div className="sc-phone__screen">
        <div className="sc-phone__status" aria-hidden="true">
          <span>9:41</span>
          <span className="sc-phone__icons">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="sc-phone__view">
          <Screens shots={shots} index={index} width={585} height={1196} eager={eager} />
          {tap && <span className="sc-tap" style={{ left: `${tap.x * 100}%`, top: `${tap.y * 100}%` }} aria-hidden="true" />}
        </div>
        <span className="sc-phone__island" aria-hidden="true" />
      </div>
    </div>
  );
}

/** A generic laptop: a thin-bezelled screen on a slim base. */
export function Laptop({ shots, index = 0, eager }: { shots: Shot[]; index?: number; eager?: boolean }) {
  return (
    <div className="sc-laptop">
      <div className="sc-laptop__lid">
        <span className="sc-laptop__cam" aria-hidden="true" />
        <div className="sc-laptop__screen">
          <Screens shots={shots} index={index} width={1440} height={900} eager={eager} />
        </div>
      </div>
      <div className="sc-laptop__base" aria-hidden="true" />
    </div>
  );
}

/** A laptop and a phone together. As you scroll past, they glide a little apart. */
export function DevicePair({ laptop, phone, index = 0, eager, children }: { laptop: Shot[]; phone: Shot[]; index?: number; eager?: boolean; children?: ReactNode }) {
  return (
    <div className="sc-pair" data-progress data-reveal="rise">
      <div className="sc-pair__laptop">
        <Laptop shots={laptop} index={index % laptop.length} eager={eager} />
      </div>
      <div className="sc-pair__phone">
        <Phone shots={phone} index={index % phone.length} eager={eager} />
      </div>
      {children}
    </div>
  );
}

/** A close-up of one part of a screen, that zooms out into place as it appears. */
export function CloseUp({ crop, color }: { crop: Crop; color: string }) {
  const ratio = (crop.w * 1440) / (crop.h * 900);
  return (
    <figure className="sc-closeup" data-reveal="zoom" style={{ '--app': color } as CSSProperties}>
      <div className="sc-closeup__frame" style={{ aspectRatio: String(ratio) }}>
        <img
          src={crop.shot.src}
          alt={crop.shot.alt}
          width={1440}
          height={900}
          loading="lazy"
          decoding="async"
          style={{ width: `${100 / crop.w}%`, left: `${(-crop.x / crop.w) * 100}%`, top: `${(-crop.y / crop.h) * 100}%` }}
        />
      </div>
    </figure>
  );
}
