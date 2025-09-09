import React from "react";
import "../styles/Button.scss";

export default function Button({ text, onClick, type = "button" }) {
  return (
    <button type={type} className="btn" onClick={onClick}>
      {text}
    </button>
  );
}
