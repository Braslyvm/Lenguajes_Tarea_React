import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Jugadores.css";

function Jugadores() {
  const navigate = useNavigate();
  const [jugador1, setJugador1] = useState("");
  const [jugador2, setJugador2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
      await fetch("http://localhost:3000/api/jugando/jugando", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jugador1, jugador2 })
    });
      navigate("/jugando");
  }
  return (
    <form className="contenedor-principal"  onSubmit={handleSubmit}>
      <div className="contenedor-jugadores" >
        <div className="Carta-jugadores">
          <img src="https://imgs.search.brave.com/04F-etvd2UhDgzm4zFWyW-601msc1cSwvecLYy_UwwU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvdXN1/YXJpby01Mzk2MjAz/LTQ1MTE1ODkucG5n"
              style={{ width: "100%", borderRadius: "90%" }}
            />
          <h1>Jugador 1</h1>
          <input 
            type="text" 
            name="jugador1" 
            required 
            value={jugador1}
            onChange={(e) => setJugador1(e.target.value)} 
          />
        </div>
        <div className="Carta-jugadores">
          <img src="https://imgs.search.brave.com/04F-etvd2UhDgzm4zFWyW-601msc1cSwvecLYy_UwwU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvdXN1/YXJpby01Mzk2MjAz/LTQ1MTE1ODkucG5n"
              alt="Usuario"              style={{ width: "100%", borderRadius: "90%" }}
            />
          <h1>Jugador 2</h1>
          <input 
            type="text" 
            name="jugador2" 
            required 
            value={jugador2}
            onChange={(e) => setJugador2(e.target.value)} 
          />
        </div>
      </div>
        <button className="button-jugadores" type="submit">
          🎮 Jugar
        </button>
    </form>
  );
}

export default Jugadores;



