import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';
import { enableAPIMocks } from './mocks';
import { activateColorTheme } from './utils/activateColorTheme.ts';

activateColorTheme();

(async () => {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MSW === 'true') {
    await enableAPIMocks();
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
})();
