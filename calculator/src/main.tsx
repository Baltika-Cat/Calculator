import './index.css';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

const root = document.getElementById('root');

createRoot(root as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
