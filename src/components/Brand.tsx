/** Logos from the ELUM brand kit, swapped for the reversed set on dark grounds. */

export function BrowseLockup({ height = 28 }: { height?: number }) {
  // The lockup's viewBox is 442 x 104.
  const width = Math.round((height * 442) / 104);
  return (
    <span className="brand-lockup" style={{ height }}>
      <img className="theme-light-only" src="/brand/browse/elum-browse-lockup.svg" width={width} height={height} alt="ELUM Browse" />
      <img className="theme-dark-only" src="/brand/browse/elum-browse-lockup-reversed.svg" width={width} height={height} alt="ELUM Browse" />
    </span>
  );
}

export function BrowseMark({ size = 32 }: { size?: number }) {
  return (
    <span className="brand-mark" style={{ height: size }}>
      <img className="theme-light-only" src="/brand/browse/elum-browse-mark.svg" width={size} height={size} alt="" />
      <img className="theme-dark-only" src="/brand/browse/elum-browse-mark-reversed.svg" width={size} height={size} alt="" />
    </span>
  );
}

export function ElumLockup({ height = 20 }: { height?: number }) {
  return (
    <span className="brand-lockup" style={{ height }}>
      <img className="theme-light-only" src="/brand/logos/elum-lockup-horizontal.svg" height={height} alt="ELUM" />
      <img className="theme-dark-only" src="/brand/logos/elum-lockup-horizontal-reversed.svg" height={height} alt="ELUM" />
    </span>
  );
}
