import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { SessionProvider } from './hooks/NebulaHook.jsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wrap your entire app so any child can call useSession() */}
    <SessionProvider>
      <App />
    </SessionProvider>
  </StrictMode>
);
