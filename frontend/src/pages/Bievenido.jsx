import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <--- Importamos useNavigate
import "../Styles/App.css";

function Bievenido() {
  const navigate = useNavigate();

  const jugar = async () => {
    navigate("/jugadores");
  }

  return (
    <div className="app-container">
      <h1>⚔️ Batalla de Números</h1>
      <button onClick={jugar}>🎮 Jugar</button>
    </div>
  );
}

export default Bievenido;
