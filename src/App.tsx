import { BrowserRouter, Link, Route, Routes } from 'react-router';
import { AuthProvider } from './auth/AuthProvider';
import { QuietSignIn } from './auth/QuietSignIn';
import { BrowserShell } from './browser/BrowserShell';
import { RedirectIfSignedIn } from './auth/guards';
import { BrowseMark } from './components/Brand';
import { ErrorBoundary } from './components/ErrorBoundary';
import { DocsHome, ProductDoc, TroubleshootingPage } from './docs/DocsPages';
import { ToastProvider } from './components/Toast';
import { TooltipLayer } from './components/TooltipLayer';
import { AuthPage } from './pages/AuthPage';
import { HandoffPage } from './pages/HandoffPage';
import { HomePage } from './search/HomePage';
import { SearchPage } from './search/SearchPage';
import { StatusPage } from './status/StatusPage';
import { SecurityLayer } from './security/SecurityLayer';
import { ThemeProvider } from './theme/ThemeProvider';
import { WhatsNew } from './whatsnew/WhatsNew';
import { SupportLink } from './components/SupportLink';

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <QuietSignIn />
          <BrowserRouter>
            <ErrorBoundary>
              <BrowserShell>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/docs" element={<DocsHome />} />
                <Route path="/docs/troubleshooting" element={<TroubleshootingPage />} />
                <Route path="/docs/:product" element={<ProductDoc />} />
                <Route
                  path="/signin"
                  element={
                    <RedirectIfSignedIn>
                      <AuthPage mode="signin" />
                    </RedirectIfSignedIn>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <RedirectIfSignedIn>
                      <AuthPage mode="signup" />
                    </RedirectIfSignedIn>
                  }
                />
                <Route path="/auth/handoff" element={<HandoffPage />} />
                {/* ELUM apps show in the shell's frames. */}
                <Route path="/app/*" element={null} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </BrowserShell>
            </ErrorBoundary>
          </BrowserRouter>
          <TooltipLayer />
          <WhatsNew />
          <SecurityLayer />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

function NotFound() {
  return (
    <div className="empty-state" style={{ minHeight: '100%', justifyContent: 'center' }}>
      <BrowseMark size={72} />
      <h2>We could not find that page</h2>
      <p>The link may be wrong, or the page may have moved.</p>
      <Link to="/" className="elum-btn elum-btn--primary">
        Go to Browse
      </Link>
      <SupportLink button code="404" message="We could not find that page" troubleshooting />
    </div>
  );
}
