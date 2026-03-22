import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:shortCode" element={<App />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
