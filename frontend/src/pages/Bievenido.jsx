import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <--- Importamos useNavigate
import "../Styles/App.css";

function Bievenido() {
  const navigate = useNavigate();

  const jugar = async () => {
    navigate("/jugadores");
  }
  const historial = async () => {
    navigate("/historial");
  }

  return (
    <div className="app-container ">
      <h1>Batalla de numeros</h1>
      <button className="Button-Inicio" onClick={jugar}>Jugar</button>
      <br></br>
       <br></br>
      <button className="Button-Inicio" style={{ backgroundColor: "#af4c4c" }}  onClick={jugar}>Historial</button>
    </div>
    
  );
}

export default Bievenido;
