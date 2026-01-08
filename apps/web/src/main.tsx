import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryProvider } from './app/providers/query-provider.tsx';

import { App } from './App.tsx';

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <QueryProvider>
        <App />
      </QueryProvider>
    </StrictMode>,
  );
}
