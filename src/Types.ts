

// 1. Definimos los IDs permitidos para las criptomonedas de nuestra app
export type CryptoId = 'bitcoin' | 'ethereum' | 'solana';

// 2. Definimos la estructura de los datos que procesaremos de cada criptomoneda
export interface CryptoItem {
  id: CryptoId;
  name: string;
  symbol: string;
  priceUsd: number;
  priceEur: number;
}

// 3. Definimos los estados posibles que tendrá nuestra interfaz (tal como los vistes en el módulo)
export type UIState = 'inicial' | 'carga' | 'resultado' | 'vacio' | 'error';

// Nuevo tipo para la moneda activa
export type Moneda = 'USD' | 'EUR';