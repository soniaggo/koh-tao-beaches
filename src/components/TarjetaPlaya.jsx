


import React, { useState } from "react";
import Button from "./Button";
import "../styles/TarjetaPlaya.scss";
import { FaShower, FaToilet, FaLifeRing } from "react-icons/fa";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function TarjetaPlaya({ playa, onVolverClick }) {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");

  if (!playa) {
    return <p>No se encontró la playa seleccionada.</p>;
  }

  const handleComentarioChange = (e) => {
    setNuevoComentario(e.target.value);
  };

  const handleAgregarComentario = () => {
    if (nuevoComentario.trim() === "") return;
    setComentarios([...comentarios, nuevoComentario]);
    setNuevoComentario("");
  };

  return (
    <div className="card-container">
      <h2>{playa.name}</h2>

      {/* Galería de imágenes */}
      {Array.isArray(playa.images) && playa.images.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="card-swiper"
        >
          {playa.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`${playa.name} ${index + 1}`}
                className="card-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No hay imágenes disponibles</p>
      )}

      <p>{playa.description}</p>

      {/* Servicios */}
      <div className="servicios">
        <div className="servicio disabled">
          <FaShower /> Duchas
        </div>
        <div className="servicio disabled">
          <FaToilet /> Baños
        </div>
        <div className="servicio disabled">
          <FaLifeRing /> Salvamento
        </div>
      </div>

      {/* Comentarios */}
      <div className="comentarios">
        <h3>Deja tu comentario</h3>
        <textarea
          value={nuevoComentario}
          onChange={handleComentarioChange}
          placeholder="Escribe aquí tu experiencia..."
        />
        <button onClick={handleAgregarComentario} className="btn-comentario">
          Agregar comentario
        </button>

        <ul>
          {comentarios.map((comentario, index) => (
            <li key={index}>{comentario}</li>
          ))}
        </ul>
      </div>

      <Button text="Volver" onClick={onVolverClick} />
    </div>
  );
}

export default TarjetaPlaya;







