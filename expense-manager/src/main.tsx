// index.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App.tsx';
import { store } from './Redux/store'; // Import your Redux store
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap in Provider */}
      <BrowserRouter> {/* Wrap in BrowserRouter */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
