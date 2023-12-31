import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { AuthConxtextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <AuthConxtextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthConxtextProvider>
  </React.StrictMode>
);

