import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";


import { SocketProvider } from './context/wsContext';
import { AppRouter } from './router.jsx';
import store from './app/store.js';
import "./main.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SocketProvider>
          <AppRouter /> 
        </SocketProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);