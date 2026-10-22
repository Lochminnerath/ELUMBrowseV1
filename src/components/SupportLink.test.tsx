import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { SupportLink } from './SupportLink';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function hrefOf(node: React.ReactNode): string {
  const host = document.createElement('div');
  const root = createRoot(host);
  act(() => root.render(<MemoryRouter initialEntries={['/docs/make']}>{node}</MemoryRouter>));
  const href = host.querySelector('a')!.getAttribute('href')!;
  act(() => root.unmount());
  return href;
}

describe('SupportLink', () => {
  it('opens the support form with the app and what happened', () => {
    const href = hrefOf(<SupportLink app="make" code="403" />);
    expect(href.startsWith('/app/inquire/f/support?app=make')).toBe(true);
    expect(href).toContain('code=403');
    expect(href).toContain('from=%2Fdocs%2Fmake');
  });

  it('uses the full address where Browse’s tabs are gone', () => {
    expect(hrefOf(<SupportLink hard app="browse" from="/" />)).toBe('https://browse.elum.services/app/inquire/f/support?app=browse&from=%2F');
  });
});
