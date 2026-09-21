import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { initGSAP } from '@/motion/gsap';
import './styles/index.css';

initGSAP();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
