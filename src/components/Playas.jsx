import React from "react";
import Button from "./Button";
import "../styles/Playas.scss";

export default function Playas({
  playas,
  onVolverClick,
  onSeleccionarPlaya,
  onVotar,
  filtro,
  onFiltroChange,
  orden,
  onOrdenChange,
}) {
  return (
    <section className="playas-container">
      <h2>Listado de playas en Koh Tao 🌴</h2>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Filtrar playas..."
          value={filtro}
          onChange={onFiltroChange}
          className="input-filtro"
        />

        <select value={orden} onChange={onOrdenChange} className="input-orden">
          <option value="votosDesc">Votos (más → menos)</option>
          <option value="votosAsc">Votos (menos → más)</option>
          <option value="nombreAsc">Nombre (A → Z)</option>
          <option value="nombreDesc">Nombre (Z → A)</option>
        </select>
      </div>

      <ul className="playas-list">
        {playas.map((playa) => (
          <li key={playa.id} className="playa-item">
            <span
              className="playa-nombre"
              onClick={() => onSeleccionarPlaya(playa)}
              title="Ver detalles"
            >
              {playa.name}
            </span>

            <div className="playa-actions">
              <span className="playa-votos">⭐ {playa.votes || 0}</span>
              <button className="btn-votar" onClick={() => onVotar(playa.id)}>
                Votar 👍
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Button text="Volver" onClick={onVolverClick} />
    </section>
  );
}






