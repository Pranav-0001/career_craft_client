import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SocketProvider } from './context/socketContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
        <SocketProvider>
        <App />
        </SocketProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

