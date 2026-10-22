/**
 * Contacting ELUM Support. Support is a form served by Inquire (inquire.elum.services/f/support),
 * and Browse opens it in a tab of its own. Every link carries what was going on, so people do not
 * have to explain it twice: the app, an error code, the page, and what the screen said.
 */

/** Where Support opens, whatever the app is running on: Browse on elum.services, even in development. */
const BROWSE_ORIGIN = 'https://elumbrowse.netlify.app';
const SUPPORT_ROUTE = '/app/inquire/f/support';

export interface SupportDetails {
  /** An error code, or a few words. */
  code?: string;
  /** What the screen said. Kept to 300 characters. */
  message?: string;
  /** The page it happened on, such as /docs/troubleshooting. */
  from?: string;
}

const MAX_MESSAGE = 300;
const MAX_SHORT = 120;

function query(app: string, details: SupportDetails): string {
  const params = new URLSearchParams({ app: app.trim() });
  const code = details.code?.trim().slice(0, MAX_SHORT);
  const from = details.from?.trim().slice(0, 500);
  const message = details.message?.trim().slice(0, MAX_MESSAGE);
  if (code) params.set('code', code);
  if (message) params.set('message', message);
  if (from) params.set('from', from);
  // URLSearchParams writes spaces as "+"; use %20 so every reader decodes them the same way.
  return params.toString().replace(/\+/g, '%20');
}

/** The support form inside Browse, as a Browse path: /app/inquire/f/support?app=browse&… */
export function supportPath(app: string, details: SupportDetails = {}): string {
  return `${SUPPORT_ROUTE}?${query(app, details)}`;
}

/** The full address, which works from any ELUM app: https://elumbrowse.netlify.app/app/inquire/f/support?app=… */
export function supportUrl(app: string, details: SupportDetails = {}): string {
  return `${BROWSE_ORIGIN}${supportPath(app, details)}`;
}

/** Where the troubleshooting answers are. */
export const TROUBLESHOOTING_URL = `${BROWSE_ORIGIN}/docs/troubleshooting`;
