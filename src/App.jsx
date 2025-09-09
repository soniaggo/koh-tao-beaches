import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Playas from "./components/Playas";
import TarjetaPlaya from "./components/TarjetaPlaya";
import ErrorBoundary from "./components/ErrorBoundary";
import { beaches as BASE_BEACHES } from "./data/beaches";


const LS_KEY_VOTES = "playasConVotos_v1";

export default function App() {
  const [mostrarPlayas, setMostrarPlayas] = useState(false);
  const [playaSeleccionada, setPlayaSeleccionada] = useState(null);

  const [filtro, setFiltro] = useState("");
  const [orden, setOrden] = useState("votosDesc"); 
  const [playasConVotos, setPlayasConVotos] = useState(BASE_BEACHES);

  // Cargar votos desde localStorage y fusionar con datos base
  useEffect(() => {
    const guardado = localStorage.getItem(LS_KEY_VOTES);
    if (guardado) {
      try {
        const votos = JSON.parse(guardado); 
       
        if (Array.isArray(votos) && votos.length && votos[0].name) {
          setPlayasConVotos(votos);
        } else {
        
          const fusion = BASE_BEACHES.map((p) => {
            const match = votos.find((v) => v.id === p.id);
            return match ? { ...p, votes: match.votes } : p;
          });
          setPlayasConVotos(fusion);
        }
      } catch {
        setPlayasConVotos(BASE_BEACHES);
      }
    } else {
      setPlayasConVotos(BASE_BEACHES);
    }
  }, []);

  // Guardar en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem(LS_KEY_VOTES, JSON.stringify(playasConVotos));
  }, [playasConVotos]);

  const handleVotar = (id) => {
    setPlayasConVotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, votes: (p.votes || 0) + 1 } : p))
    );
  };

  const handleVerListado = () => {
    setMostrarPlayas(true);
    setPlayaSeleccionada(null);
    setFiltro("");
  };

  const handleVolverAlListado = () => {
    setPlayaSeleccionada(null);
    setMostrarPlayas(true); // volvemos al listado
  };

  const handleVolverAlHeader = () => {
    setMostrarPlayas(false);
    setPlayaSeleccionada(null);
  };

  const handleSeleccionarPlaya = (playa) => {
    setPlayaSeleccionada(playa);
    setMostrarPlayas(false);
  };

  const playasFiltradasYOrdenadas = useMemo(() => {
    const filtradas = playasConVotos.filter((p) =>
      p.name.toLowerCase().includes(filtro.toLowerCase())
    );
    filtradas.sort((a, b) => {
      switch (orden) {
        case "votosAsc":
          return (a.votes || 0) - (b.votes || 0);
        case "votosDesc":
          return (b.votes || 0) - (a.votes || 0);
        case "nombreAsc":
          return a.name.localeCompare(b.name);
        case "nombreDesc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
    return filtradas;
  }, [playasConVotos, filtro, orden]);

  return (
    <div>
      {!mostrarPlayas && !playaSeleccionada && (
        <Header onButtonClick={handleVerListado} />
      )}

      {mostrarPlayas && !playaSeleccionada && (
        <Playas
          playas={playasFiltradasYOrdenadas}
          onVolverClick={handleVolverAlHeader}
          onSeleccionarPlaya={handleSeleccionarPlaya}
          filtro={filtro}
          onFiltroChange={(e) => setFiltro(e.target.value)}
          onVotar={handleVotar}
          orden={orden}
          onOrdenChange={(e) => setOrden(e.target.value)}
        />
      )}

      {playaSeleccionada && (
        <ErrorBoundary>
          <TarjetaPlaya
            playa={playaSeleccionada}
            onVolverClick={handleVolverAlListado}
          />
        </ErrorBoundary>
      )}
    </div>
  );
}

