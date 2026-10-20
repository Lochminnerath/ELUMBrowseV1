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
