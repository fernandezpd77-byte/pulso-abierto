// src/services/cryptoService.ts
import type { CryptoItem } from '../Types';

// Función asincrónica para consultar la API pública de CoinGecko que ya usábamos en la Actividad 1
export async function obtenerCotizaciones(): Promise<CryptoItem[]> {
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd,eur';
  
  const response = await fetch(url);

  // Si la respuesta no es exitosa, lanzamos un error para que lo capture la interfaz
  if (!response.ok) {
    throw new Error('No se pudo conectar con el servidor de CoinGecko');
  }

  const data = await response.json();

  // Transformamos los datos crudos de la API al formato tipado que definimos en Types.ts
  const items: CryptoItem[] = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      priceUsd: data.bitcoin?.usd || 0,
      priceEur: data.bitcoin?.eur || 0,
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      priceUsd: data.ethereum?.usd || 0,
      priceEur: data.ethereum?.eur || 0,
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      priceUsd: data.solana?.usd || 0,
      priceEur: data.solana?.eur || 0,
    },
  ];

  return items;
}