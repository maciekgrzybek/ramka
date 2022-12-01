import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './index.css';
import { StoreProvider } from './store/store.context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
