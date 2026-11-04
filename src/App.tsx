// src/App.tsx
import { useState, useEffect, type FormEvent } from 'react';
import { z } from 'zod'; // <-- Importamos Zod
import type { CryptoItem, UIState, Moneda } from './Types';
import { obtenerCotizaciones } from './Services/cryptoService';
import { CryptoCard } from './components/Cryptocard';

//  ESQUEMA DE VALIDACIÓN CON ZOD  ---
const busquedaSchema = z.object({
  textoBusqueda: z.string().trim().min(1, 'El campo de búsqueda no puede estar vacío.'),
 monedaSeleccionada: z.enum(['USD', 'EUR'], {
    message: 'Debe seleccionar una moneda válida (USD o EUR).',
  }),
});

export function App() {
  const [estado, setEstado] = useState<UIState>('carga');
  const [criptos, setCriptos] = useState<CryptoItem[]>([]);
  const [errorMensaje, setErrorMensaje] = useState<string>('');
  
  // ESTADOS DEL FORMULARIO CONTROLADO  ---
  const [textoBusqueda, setTextoBusqueda] = useState<string>('');
  const [moneda, setMoneda] = useState<Moneda>('USD');
  
  // Estado para guardar el mensaje de error de Zod en pantalla
  const [errorValidacion, setErrorValidacion] = useState<string | null>(null);

  const cargarDatos = async () => {
    setEstado('carga');
    try {
      const datos = await obtenerCotizaciones();
      if (datos.length === 0) {
        setEstado('vacio');
      } else {
        setCriptos(datos);
        setEstado('resultado');
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMensaje(error.message);
      } else {
        setErrorMensaje('Ocurrió un error desconocido');
      }
      setEstado('error');
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // MANEJADOR DEL FORMULARIO CON VALIDACIÓN ZOD ---
  const manejarBusqueda = (e: FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue sola
    

    // Validar los datos usando safeParse de Zod
    const resultadoValidacion = busquedaSchema.safeParse({
      textoBusqueda,
      monedaSeleccionada: moneda,
    });

    if (!resultadoValidacion.success) {
      // Si la validación falla, mostramos el mensaje usando .issues
      const mensajeError = resultadoValidacion.error.issues[0].message;
      setErrorValidacion(`⚠️ Error de validación: ${mensajeError}`);
      return;
    }

    // Si pasa la validación, limpiamos el error y podemos filtrar o procesar
    setErrorValidacion(null);
    alert(`Búsqueda validada.\n Buscando: "${textoBusqueda}" en moneda ${moneda}`);
  };

  // Filtrado de criptomonedas según el texto ingresado
  const criptosFiltradas = criptos.filter((crypto) => 
    crypto.name.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(textoBusqueda.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#878383' }}>
      <h1>Pulso Abierto (Versión React)</h1>
      <img src="/react.svg" alt="atomo de react" />
      <p>Cotizaciones de criptomonedas en tiempo real con formulario controlado y Zod.</p>
      <p> - Fernández Pablo - </p>
      {/* ---  FORMULARIO CONTROLADO - */}
      <form onSubmit={manejarBusqueda} style={{ margin: '20px 0', padding: '15px', background: '#222', borderRadius: '8px', display: 'inline-block' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="busquedaInput" style={{ display: 'block', marginBottom: '5px' }}>
            Filtrar Criptomoneda:
          </label>
          <input 
            id="busquedaInput"
            type="text" 
            value={textoBusqueda}
            onChange={(e) => setTextoBusqueda(e.target.value)}
            placeholder="Ej. Bitcoin..."
            style={{ padding: '6px', borderRadius: '4px', width: '200px' }}
          />
        </div>



        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="monedaSelect" style={{ display: 'block', marginBottom: '5px' }}>
            Seleccionar Moneda:
          </label>
          <select 
            id="monedaSelect"
            value={moneda} 
            onChange={(e) => setMoneda(e.target.value as Moneda)}
            style={{ padding: '6px', borderRadius: '4px', width: '214px' }}
          >
            <option value="USD">Dólares (USD)</option>
            <option value="EUR">Euros (EUR)</option>
          </select>
        </div>

        <button type="submit" style={{ padding: '8px 15px', background: '#61dafb', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Aplicar Filtro
        </button>

        {/* Mensaje de error de validación visible y claro */}
        {errorValidacion && (
          <div style={{ marginTop: '10px', color: '#ff6b6b', fontWeight: 'bold', fontSize: '0.9em' }}>
            <span>{errorValidacion}</span>
          </div>
        )}
      </form>

      {/* --- RENDERIZADO  --- */}
      {estado === 'carga' && <p>Cargando cotizaciones...</p>}

      {estado === 'error' && (
        <div style={{ color: '#ff6b6b' }}>
          <p>Error: {errorMensaje}</p>
          <button onClick={cargarDatos} style={{ padding: '8px 12px', cursor: 'pointer' }}>Reintentar consulta</button>
        </div>
      )}

      {estado === 'vacio' && <p>No se encontraron criptomonedas disponibles.</p>}

      {estado === 'resultado' && (
        <div className="tablero" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          {criptosFiltradas.length > 0 ? (
            criptosFiltradas.map((crypto) => (
              <CryptoCard 
                key={crypto.id} 
                crypto={crypto} 
                monedaActiva={moneda} 
              />
            ))
          ) : (
            <p>No hay coincidencias con tu búsqueda.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;