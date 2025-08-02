import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import ScrollToTop from './Components/scroll/scrollToTop.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
