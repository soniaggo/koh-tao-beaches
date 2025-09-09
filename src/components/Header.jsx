
import React from "react";
import "../styles/Header.scss";
import Button from "./Button";
import playaImage from "../images/Playa.jpg"; 

export default function Header({ onButtonClick }) {
 
  const style = {
    backgroundImage: `url(${playaImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <header className="header" style={style}>
      <div className="header-overlay">
        <h1>Ranking de playas de Koh Tao</h1>
        <p className="subtitulo">Descubre y vota tus playas favoritas</p>
        <Button text="Ver listado" onClick={onButtonClick} />
      </div>
    </header>
  );
}
