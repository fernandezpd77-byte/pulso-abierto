// src/components/Cryptocard.tsx
import { Link } from 'react-router-dom';
import type { CryptoItem, Moneda } from '../Types';

interface CryptoCardProps {
  crypto: CryptoItem;
  monedaActiva: Moneda;
}

export function CryptoCard({ crypto, monedaActiva }: CryptoCardProps) {
  const precioMostrar = monedaActiva === 'USD' ? crypto.priceUsd : crypto.priceEur;
  const simboloMoneda = monedaActiva === 'USD' ? '$' : '€';

  return (
    <div className="tarjeta" style={{ border: '1px solid #ccc', padding: '15px', margin: '10px', borderRadius: '8px', minWidth: '200px', background: '#1a1a1a', color: '#fff' }}>
      <h3>{crypto.name} ({crypto.symbol.toUpperCase()})</h3>
      <p>Precio ({monedaActiva}): {simboloMoneda}{precioMostrar.toLocaleString()}</p>
      
      {/* Enlace dinámico exigido por la consigna */}
      <Link 
        to={`/criptomonedas/${crypto.id}`}
        style={{ display: 'inline-block', marginTop: '10px', padding: '6px 12px', background: '#61dafb', color: '#000', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}
      >
        Ver detalle
      </Link>
    </div>
  );
}