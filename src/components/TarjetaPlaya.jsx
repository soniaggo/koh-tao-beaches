import React, { useEffect, useState } from "react";
import Button from "./Button";
import "../styles/TarjetaPlaya.scss";
import { FaShower, FaToilet, FaLifeRing, FaStar } from "react-icons/fa";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TarjetaPlaya({ playa, onVolverClick }) {
  // Reseñas
  const [comentarios, setComentarios] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [puntuacion, setPuntuacion] = useState(0);

  // Cargar comentarios guardados para esta playa
  useEffect(() => {
    const guardados = localStorage.getItem(`comentarios_${playa.id}`);
    if (guardados) setComentarios(JSON.parse(guardados));
  }, [playa.id]);

  useEffect(() => {
    localStorage.setItem(`comentarios_${playa.id}`, JSON.stringify(comentarios));
  }, [comentarios, playa.id]);

  const handleAgregarComentario = (e) => {
    e.preventDefault();
    if (!nombreUsuario.trim() || !nuevoComentario.trim() || puntuacion === 0) return;

    const nuevo = {
      id: Date.now(),
      nombre: nombreUsuario.trim(),
      texto: nuevoComentario.trim(),
      estrellas: puntuacion,
      fecha: new Date().toLocaleString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setComentarios((prev) => [...prev, nuevo]);
    setNombreUsuario("");
    setNuevoComentario("");
    setPuntuacion(0);
  };

  return (
    <div className="card-container">
      <h2>{playa.name}</h2>

      {/* Galería */}
      {Array.isArray(playa.images) && playa.images.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="card-swiper"
        >
          {playa.images.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} alt={`${playa.name} ${i + 1}`} className="card-image" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="no-images">No hay imágenes disponibles</div>
      )}

      <p className="card-description">{playa.description}</p>

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

      {/* Reseñas */}
      <div className="comentarios-section">
        <h3>Reseñas de viajeros ✍️</h3>

        <ul className="lista-comentarios">
          {comentarios.length === 0 && <p>No hay reseñas todavía. ¡Sé la primera!</p>}
          {comentarios.map((c) => (
            <li key={c.id}>
              <div className="comentario-header">
                <strong>{c.nombre}</strong>
                <span className="fecha">{c.fecha}</span>
                <div className="estrellas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} color={i < c.estrellas ? "#FFD700" : "#ccc"} />
                  ))}
                </div>
              </div>
              <p>{c.texto}</p>
            </li>
          ))}
        </ul>

        <form onSubmit={handleAgregarComentario} className="form-comentario">
          <input
            type="text"
            placeholder="Tu nombre..."
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />

          <div className="selector-estrellas">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                size={22}
                color={i < puntuacion ? "#FFD700" : "#ccc"}
                onClick={() => setPuntuacion(i + 1)}
                style={{ cursor: "pointer" }}
                title={`${i + 1} estrellas`}
              />
            ))}
          </div>

          <textarea
            placeholder="Escribe tu reseña..."
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
          />

          <button type="submit" className="btn-comentario">
            Añadir reseña
          </button>
        </form>
      </div>

      <Button text="Volver" onClick={onVolverClick} />
    </div>
  );
}







