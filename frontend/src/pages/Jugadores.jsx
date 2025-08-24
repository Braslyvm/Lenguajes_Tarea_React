import { useNavigate } from "react-router-dom";
import "../Styles/Jugadores.css";

function Jugadores() {
  const navigate = useNavigate();
const handleSubmit = (e) => {
    e.preventDefault(); 
    navigate("/jugar");
  };

  return (
    <form className="contenedor-principal"  onSubmit={handleSubmit}>
      <div className="contenedor-jugadores" >
        <div className="Carta-jugadores">
          <h1>Jugador 1</h1>
          <input type="text" name="nombre" required />
        </div>
        <div className="Carta-jugadores">
          <h1>Jugador 2</h1>
          <input type="text" name="nombre" required />
        </div>
      </div>
        <button className="button-jugadores" type="submit">
          🎮 Jugar
        </button>
    </form>
  );
}

export default Jugadores;
