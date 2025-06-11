import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PayoutProvider } from './context/PayoutContext';

// BrowserRouter
// React
createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <StrictMode>
    <PayoutProvider>
    <App />
    </PayoutProvider>
  </StrictMode>,
  </BrowserRouter>
)
