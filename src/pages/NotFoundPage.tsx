// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div style={{ padding: '40px', color: '#747171', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>404 - Página no encontrada</h1>
      <img  src="/noencontrada.jpg" alt="Imagen de error 404" 
        style={{ 
          maxWidth: '100%',     
          height: 'auto',       
          width: '400px',       
          borderRadius: '8px',  
          margin: '20px 0'      
        }} 
      />
      <p>La dirección a la que intentas acceder no existe en Pulso Abierto.</p>
      <Link to="/" style={{ color: '#61dafb', textDecoration: 'underline' }}>
        Regresar a la página principal
      </Link>
    </div>
  );
}