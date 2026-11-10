import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ServiceBanner } from './components/ServiceBanner';
import { App } from './App';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import { applyLook, applyMotion } from './settings/settings';

// Less motion, if chosen in Settings, applies before the first paint.
applyMotion();
applyLook();
// Live backgrounds rest while the tab is out of sight.
document.addEventListener('visibilitychange', () => document.documentElement.toggleAttribute('data-tab-hidden', document.hidden));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Notices, incidents and maintenance from the ELUM Console, outside the app so they show on every page.
const banner = document.createElement('div');
document.body.appendChild(banner);
createRoot(banner).render(<ServiceBanner service="browse" />);
