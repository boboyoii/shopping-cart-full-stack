import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const renderApp = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

async function main() {
  if (import.meta.env.DEV) {
    try {
      const { worker } = await import('./mocks/browser');

      await worker.start({
        serviceWorker: {
          url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
        },
      });
    } catch (error) {
      console.error('MSW 시작에 실패했습니다.', error);
    }
  }

  renderApp();
}

main();
