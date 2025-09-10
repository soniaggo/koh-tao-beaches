

import React from "react";
import Button from './Button'; 
import "../styles/Playas.scss";
import { FaShower, FaToilet, FaLifeRing, FaStar } from "react-icons/fa";

function Playas({ playas, onVolverClick, onSeleccionarPlaya, onVotar, filtro, onFiltroChange, orden, onOrdenChange }) {
  return (
    <section className="playas-container">
      <h2>Listado de playas en Koh Tao 🌴</h2>
      
      {/* Filtro */}
      <input 
        type="text" 
        placeholder="Filtrar playas..." 
        value={filtro} 
        onChange={onFiltroChange} 
        className="input-filtro"
      />

      {/* Ordenar */}
      <select value={orden} onChange={onOrdenChange} className="input-orden">
        <option value="asc">Nombre (A → Z)</option>
        <option value="desc">Nombre (Z → A)</option>
        <option value="votos">Votos (más → menos)</option>
      </select>

      {/* Grid de tarjetas */}
      <div className="playas-grid">
        {playas.map((playa) => (
          <div key={playa.id} className="playa-card fade-in">
            <img 
              src={playa.images[0]} 
              alt={playa.name} 
              className="playa-card-img"
              onClick={() => onSeleccionarPlaya(playa)}
            />
            <div className="playa-card-content">
              <h3 onClick={() => onSeleccionarPlaya(playa)}>{playa.name}</h3>
              
              {/* Votos */}
              <p className="playa-votos"><FaStar color="#FFD700" /> {playa.votes}</p>

              {/* Servicios tachados */}
              <div className="servicios">
                <div className="servicio disabled"><FaShower /> Duchas</div>
                <div className="servicio disabled"><FaToilet /> Baños</div>
                <div className="servicio disabled"><FaLifeRing /> Salvamento</div>
              </div>

              <button className="btn-votar" onClick={() => onVotar(playa.id)}>Votar 👍</button>
            </div>
          </div>
        ))}
      </div>

      <Button text="Volver" onClick={onVolverClick} />
    </section>
  );
}

export default Playas;






