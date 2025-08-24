import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Historial.css";

function Historial() {      
  // contastes y estado ha utilizar

  const navigate = useNavigate();
  const [historial, setHistorial] = useState([]);


  // Efecto para obtener el historial al cargar el componente
  useEffect(() => {
    const fetchHistorial = async () => {
        console.log("Fetching historial...");
        const res = await fetch("http://localhost:3000/api/jugando/historial");
        const data = await res.json();
        setHistorial(data.partidas || []); 
    };
    fetchHistorial();
  }, []);

  //devuelve a la pantalla de inicio
  const handleSalir = () => {
        navigate("/"); 
  };

  return (
    <div className="historial-wrapper">
      <h2 className="titulo-historial">Historial de Partidas</h2>
      <div className="contenedor-historial">
        <div className="lista-historial">
          {historial.map((p, i) => (
            <div key={i} className="card-historial">
                <p>🏆 <strong>{p.ganador}</strong> venció a <strong>{p.perdedor}</strong></p>
                <div className="Resultados" >
                    <p>{p.intentosGanador[0]}</p>
                    <p>
                    {p.intentosGanador[0] < p.intentosPerdedor[0] 
                    ? "Gano" 
                    : "Perdio"}
                    </p>
                    <p>{p.intentosPerdedor[0]}</p>
                </div>
                <div className="Resultados" >
                    <p>{p.intentosGanador[1]}</p>
                    <p>
                    {p.intentosGanador[1] < p.intentosPerdedor[1] 
                    ? "Gano" 
                    : "Perdio"}
                    </p>
                    <p>{p.intentosPerdedor[1]}</p>
                </div>
                <div className="Resultados" >
                    <p>{p.intentosGanador[2]}</p>
                    <p>
                    {p.intentosGanador[2] < p.intentosPerdedor[2] 
                    ? "Gano" 
                    : "Perdio"}
                    </p>
                    <p>{p.intentosPerdedor[2]}</p>
                </div>
                <div className="Resultados" >
                    <p>Tiempo: {p.tiempoGanador}s  vs  Tiempo {p.tiempoPerdedor}s</p>
                </div>
            </div>
          ))}
        </div>
      </div>
      <button className="boton-salir" onClick={handleSalir}>
        Salir
      </button>

    </div>
  );
}

export default Historial;
