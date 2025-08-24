import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Jugando.css";


function jugando() {
  // contastes y estado ha utilizar
  const navigate = useNavigate();
  const [jugador1, setJugador1] = useState("");
  const [jugador2, setJugador2] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [oculatar, setOcultar] = useState([]);
  const [ronda, setRonda] = useState(0);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [turno,setTurno]= useState(0);
  const numeros = Array.from({ length: 100 }, (_, i) => i + 1);

  // Efecto para obtener los nombres de los jugadores 
  useEffect(() => {
    const obtenerJugadores = async () => {
      const res = await fetch("http://localhost:3000/api/jugando/jugando");
      const data = await res.json();
      setJugador1(data.jugadores[0]);
      setJugador2(data.jugadores[1]);
    };
    const valorAleatorio = async () => {
      await fetch("http://localhost:3000/api/jugando/numero", {
        method: "POST"
      });
    };
    valorAleatorio();
    obtenerJugadores();

  }, []);




  // Cunado preciona un numero consulata con el backend si es el correcto
  // si es el correcto muestra un popup , cambia el turno y enciende los botones presionados
  // si no es el correcto muestra que tan cerca esta
  const Click = async (num) => {
    const leer = await fetch(`http://localhost:3000/api/jugando/Validar?numero=${num}`);
    const valor = await leer.json();
    if (valor.valido) {
      activarTodos(); 
      const leer = await fetch("http://localhost:3000/api/jugando/Fin");
      const valor = await leer.json();
      if (valor.valido) {
        navigate("/ganador");
      }
      const resTurno = await fetch("http://localhost:3000/api/jugando/turno");
      const dataTurno = await resTurno.json();
      setTurno(dataTurno.turno);
      setPopupOpen(true);
      setMensaje("Encontrado! 🎉");
    }
    else {
    setOcultar([...oculatar, num]);
    const res = await fetch(`http://localhost:3000/api/jugando/cercania?numero=${num}`);
    const data = await res.json();
    setMensaje(data.mensaje);
    }
    const resRonda = await fetch("http://localhost:3000/api/jugando/rondas");
    const dataRonda = await resRonda.json();
    setRonda(dataRonda.rondas);

    
  // Desbloquea todos los botones
  }
  const activarTodos = () => {
    setOcultar([]); 
  };
  // Cierra el popup
  const closePopup = () => {
    setPopupOpen(false);
  };
  
  const handleSalir = () => {
        navigate("/"); 
    };
  return (
    <div className="Contenedor-Juego-Principal" >
      <div className="contenedor-Nombres">
        <div className = "Carta-jugador"  style={{ backgroundColor: turno === 0 ? "blue" : "gray" }}>
          <p>{jugador1}</p>
        </div>
       
        <p className="ronda">Ronda: {ronda}</p>
        <div className = "Carta-jugador" style={{ backgroundColor: turno === 1 ? "red" : "gray" }}>
          <p>{jugador2}</p>
        </div>
      </div>
      <div className="display-Juego">
        <h1>{mensaje || "Haz clic en un número"}</h1>
      </div>
      <div className="Tablero-Juego">
        <div className="grid-numeros">
          {numeros.map((num) => (
            <button
              key={num}
              className="numero-boton"
              onClick={() => Click(num)}
              disabled={oculatar.includes(num)} 
              style={{
                backgroundColor: oculatar.includes(num) ? "grey" : "#f0f0f0",
                cursor: oculatar.includes(num) ? "not-allowed" : "pointer"
              }}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      {isPopupOpen && (
        <div id="contenedor-popup">
          <div className="ventana-popup">
            <div className="contenido-popup">
              <h1>¡Felicidades!</h1>
              <p>
                  {turno === 0
                    ? `${jugador2} encontró el número 🎉`
                    : `${jugador1} encontró el número 🎉`}
                </p>
              <p>
                Ahora es el turno de {turno === 0 ? jugador1 : jugador2}
              </p>
              <button className="contenido-button" onClick={closePopup}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
       <button className="boton-salir" onClick={handleSalir}>
        Salir
      </button>
      
    </div>
  );
}

export default jugando;