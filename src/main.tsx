// Starts the app: loads the stylesheet and puts <App /> on the page.
// You should never need to change this file.
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles.css';

createRoot(document.getElementById('root')!).render(<App />);
