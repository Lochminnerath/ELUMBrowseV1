import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../auth/AuthProvider';
import { BrowseLockup, BrowseMark } from '../components/Brand';
import { ElumLauncher } from '../components/ElumLauncher';
import { NotificationBell } from '../components/NotificationBell';
import { UserMenu } from '../components/UserMenu';
import { accountsSignIn, signInThroughAccount } from '../lib/elum';
import { ThemeToggle } from '../theme/ThemeToggle';

/** The bar on every Browse page. Searching needs no account; signing in adds the bell and menu. */
export function BrowseHeader({ children, compact }: { children?: ReactNode; compact?: boolean }) {
  const { status } = useAuth();
  const location = useLocation();
  const next = location.pathname + location.search;
  return (
    <header className={`browse-bar${compact ? ' browse-bar--compact' : ''}`}>
      <Link to="/" className="brand-link browse-bar__brand" aria-label="ELUM Browse home">
        {compact ? <BrowseMark size={34} /> : <BrowseLockup height={30} />}
      </Link>
      <div className="browse-bar__middle">{children}</div>
      <div className="browse-bar__end">
        <Link to="/settings" className="icon-btn icon-btn--round browse-bar__settings" aria-label="Settings" data-tip="Settings" aria-current={location.pathname === '/settings' ? 'page' : undefined}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
            <circle cx="15" cy="7" r="2.4" />
            <circle cx="9" cy="17" r="2.4" />
          </svg>
        </Link>
        <ThemeToggle />
        <ElumLauncher />
        {status === 'signed-in' ? (
          <>
            <NotificationBell />
            <UserMenu />
          </>
        ) : status === 'signed-out' ? (
          <Link
            to={`/signin?next=${encodeURIComponent(next)}`}
            className="elum-btn elum-btn--secondary elum-btn--sm"
            onClick={(e) => {
              if (accountsSignIn && signInThroughAccount(next)) e.preventDefault();
            }}
          >
            Sign in
          </Link>
        ) : null}
      </div>
    </header>
  );
}
