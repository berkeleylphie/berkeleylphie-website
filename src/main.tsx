// Starts the app: loads the stylesheet and puts <App /> on the page.
// You should never need to change this file.
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './styles.css';

// basename matches Vite's `base` config (the GitHub Pages subpath today,
// '/' once berkeleylphie.net is live) so routing works under either.
createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>
);
