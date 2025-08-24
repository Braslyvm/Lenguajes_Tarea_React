import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Bievenido.jsx";
import Jugadores from "./pages/Jugadores.jsx";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/jugadores" element={<Jugadores />} />
      </Routes>
    </Router>
  );
}

export default App;
