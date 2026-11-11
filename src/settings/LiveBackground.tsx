import type { CSSProperties } from 'react';

/**
 * A live background: soft circles of colour drifting slowly, each on its own path and pace, behind
 * whatever sits on top. Pure CSS movement (settings.css); it stands still with less motion or when
 * the device asks for reduced motion, and pauses while the tab is hidden.
 */
export function LiveBackground({ colors, base, className }: { colors: string[]; base?: string; className?: string }) {
  return (
    <span className={`live-bg${className ? ` ${className}` : ''}`} style={base ? ({ background: base } as CSSProperties) : undefined} aria-hidden="true">
      {colors.map((c, i) => {
        // Spread the circles over the page, each with its own size, path and timing.
        const x = (i * 37) % 100;
        const y = (i * 61 + 13) % 100;
        const style = {
          '--c': c,
          '--x': `${x - 15}%`,
          '--y': `${y - 15}%`,
          '--s': `${26 + ((i * 17) % 22)}vmax`,
          '--dx': `${((i % 3) - 1) * 18 + 8}vmax`,
          '--dy': `${(((i + 1) % 3) - 1) * 14 - 6}vmax`,
          '--t': `${22 + ((i * 7) % 18)}s`,
          '--d': `${-((i * 5) % 20)}s`,
        } as CSSProperties;
        return <i key={i} style={style} />;
      })}
    </span>
  );
}
