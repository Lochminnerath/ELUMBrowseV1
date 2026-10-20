/** Google's own results page for a search, with web links only (udm=14: no AI Overview, no AI Mode). */
export function googleWebUrl(q: string, kind: 'web' | 'images' = 'web'): string {
  const params = new URLSearchParams({ q, udm: kind === 'images' ? '2' : '14' });
  return `https://www.google.com/search?${params.toString()}`;
}

/** A colour for a site's disc, the same every time for the same site. */
export function siteHue(site: string): number {
  let h = 0;
  for (const ch of site) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
}
