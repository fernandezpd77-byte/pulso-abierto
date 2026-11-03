// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { DetailPage } from './pages/DetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta Principal */}
        <Route path="/" element={<App />} />
        
        {/* Ruta Dinámica para el Detalle */}
        <Route path="/criptomonedas/:id" element={<DetailPage />} />
        
        {/* Ruta 404 para direcciones inexistentes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);