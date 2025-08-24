import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Bievenido.jsx";
import Jugadores from "./pages/Jugadores.jsx";
import Jugando from "./pages/Jugando.jsx";
import Ganador from "./pages/Ganador.jsx";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/jugando" element={<Jugando />} />
        <Route path="/ganador" element={<Ganador />} />
      </Routes>
    </Router>
  );
}

export default App;
