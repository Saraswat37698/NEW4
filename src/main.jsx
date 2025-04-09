import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <HashRouter basename="/FinalMCT4">
      <App />
    </HashRouter>
  </StrictMode>
);
