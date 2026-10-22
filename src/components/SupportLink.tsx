import { Link, useInRouterContext, useLocation } from 'react-router';
import { openTab, updateTabs } from '../browser/tabs';
import { supportPath, supportUrl, type SupportDetails } from '../lib/support';

interface Props extends SupportDetails {
  /** The product the problem is in, such as "browse". */
  app?: string;
  /** Looks like a button instead of a link. */
  button?: boolean;
  /** Also shows a Troubleshooting link beside it. */
  troubleshooting?: boolean;
  /** Loads the page itself instead of opening a tab, for a screen where Browse's own tabs are gone. */
  hard?: boolean;
  children?: string;
  className?: string;
}

/**
 * "Contact support": opens the support form in a Browse tab, filled in with where you were. Used
 * wherever something went wrong.
 */
export function SupportLink({ app = 'browse', code, message, from, button, troubleshooting, hard, children = 'Contact support', className }: Props) {
  const inRouter = useInRouterContext();
  if (!inRouter) return <Anchor {...{ app, code, message, from, button, hard: true, children, className }} />;
  return <Routed {...{ app, code, message, from, button, troubleshooting, hard, children, className }} />;
}

function Routed(props: Props) {
  const { pathname, search } = useLocation();
  const { troubleshooting, ...rest } = props;
  return (
    <>
      <Anchor {...rest} from={props.from ?? pathname + search} />
      {troubleshooting && (
        <Link className="support-link support-link--quiet" to="/docs/troubleshooting">
          Troubleshooting
        </Link>
      )}
    </>
  );
}

function Anchor({ app = 'browse', code, message, from, button, hard, children, className }: Props) {
  const details = { code, message, from };
  const path = supportPath(app, details);
  return (
    <a
      className={className ?? (button ? 'elum-btn elum-btn--secondary support-link' : 'support-link')}
      href={hard ? supportUrl(app, details) : path}
      onClick={(e) => {
        if (hard || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        updateTabs((st) => openTab(st, path));
      }}
    >
      {children}
    </a>
  );
}
