import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../Styles/App.css";

function Bievenido() {
  const navigate = useNavigate();
  // redirije a la interfaz de jugadores
  const jugar = async () => {
    navigate("/jugadores");
  }
  // redirije a la interfaz de historial
  const historial = async () => {
    navigate("/historial");
  }

  return (
    <div className="app-container ">
      <h1>Batalla de numeros</h1>
      <button className="Button-Inicio" onClick={jugar}>Jugar</button>
      <br></br>
       <br></br>
      <button className="Button-Inicio" style={{ backgroundColor: "#af4c4c" }}  onClick={historial}>Historial</button>
    </div>
    
  );
}

export default Bievenido;
