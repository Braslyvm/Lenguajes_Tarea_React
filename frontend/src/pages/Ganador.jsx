import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Ganador.css";


function Ganador() {

    const navigate = useNavigate();
    const [ganador, setGanador] = useState("");
    const [perdedor, setPerdedor ] = useState("");
    const [ganadorintentos, setGanadorIntentos] = useState([]);
    const [perdedorintentos2, setPerdedorIntentos] = useState([]);

    useEffect(() => {
        const ganador = async () => {
            const res = await fetch("http://localhost:3000/api/jugando/ganador");
            const data = await res.json();
            setGanador(data.Ganador);
            setPerdedor(data.perdedor);
            setGanadorIntentos(data.ganadorintentos);
            setPerdedorIntentos(data.perdedorintentos2);
        };
    }, []);

    const handleSalir = () => {
        navigate("/"); 
    };
    return (
        <div className="contenedor-ganador">
            <div className="contenedor-Grande">
                <p> 🎉 Ganador {ganador} 🎉` </p>
            </div>
            <div className="juego" style={{backgroundColor: ganadorintentos[0] < perdedorintentos2[0] ? "green" : "red",}}>
                <p>{ganadorintentos[0]}</p>
                <p>
                {ganadorintentos[0] < perdedorintentos2 [0]
                    ? "Gano" 
                    : "Perdio"}
                </p>
                <p>{perdedorintentos2[0]}</p>
            </div>
            <div className="juego" style={{backgroundColor: ganadorintentos[1] < perdedorintentos2[1] ? "green" : "red",}}>
                <p>{ganadorintentos[1]}   </p>
                <p>
                {ganadorintentos[1] < perdedorintentos2 [1]
                    ? "Gano" 
                    : "Perdio"}
                </p>
                <p>{perdedorintentos2[1]} </p>
            </div>
            <div className="juego" style={{backgroundColor: ganadorintentos[2] < perdedorintentos2[2] ? "green" : "red",}}>
                <p>{ganadorintentos[2]} </p>
                <p>
                {ganadorintentos[2] < perdedorintentos2 [2]
                    ? "Gano" 
                    : "Perdio"}
                </p>
                <p>{perdedorintentos2[2]}</p>
            </div>

            <div className="contenedor-Grande">
                <p> Perdedor {perdedor} por malo </p>
            </div>
            <button className="boton-salir" onClick={handleSalir}>
                Salir
            </button>

        </div>

    );
}
export default Ganador;