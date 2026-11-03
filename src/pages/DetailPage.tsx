// src/pages/DetailPage.tsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { CryptoItem } from '../Types';
import { obtenerCotizaciones } from '../Services/cryptoService';

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [crypto, setCrypto] = useState<CryptoItem | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Buscamos los datos para verificar si el registro existe en la API
    obtenerCotizaciones()
      .then((datos) => {
        const encontrada = datos.find((c) => c.id === id);
        if (encontrada) {
          setCrypto(encontrada);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <div style={{ padding: '20px', color: '#fff' }}>Cargando detalle...</div>;

  if (error || !crypto) {
    return (
      <div style={{ padding: '20px', color: '#fff' }}>
        <h2>❌ Error: La criptomoneda "{id}" no existe o no es válida.</h2>
        <Link to="/" style={{ color: '#61dafb' }}>← Volver al inicio</Link>
      </div>
    );
  }

  const fechaHoraActual = new Date().toLocaleString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div style={{ padding: '20px', color: '#fff', fontFamily: 'Arial' }}>
      <h1>Detalle de: {crypto.name} ({crypto.symbol.toUpperCase()})</h1>
      <p>Moneda digital oficial registrada en el sistema.</p>
      <div style={{ background: '#222', padding: '20px', borderRadius: '8px', maxWidth: '400px', margin: '40px auto' }}>
        <p><strong>Precio en USD2S:</strong> ${crypto.priceUsd.toLocaleString()}</p>
        <p><strong>Precio en EUR:</strong> €{crypto.priceEur.toLocaleString()}</p>
        <hr style={{ borderColor: '#444', margin: '15px 0' }} />
        <p style={{ fontSize: '0.9em', color: '#aaa' }}>Cotización al: {fechaHoraActual}</p>
      </div>
      {/* Usamos Link para navegar limpiamente hacia atrás */}
      <Link to="/" style={{ background: '#61dafb', color: '#000', padding: '10px 15px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
        Volver al listado
      </Link>
    </div>
  );
}