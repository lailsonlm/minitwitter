import React from 'react'
import ReactDOM from 'react-dom/client'
import { CookiesProvider } from 'react-cookie';
import App from './App'
import './global.css'
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </AuthProvider>
  </React.StrictMode>
)
