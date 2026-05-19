import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PokemonDetails } from "./components/PokemonDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota da Página Inicial */}
        <Route path="/" element={<Home />} />

        {/* Rota de Detalhes: o ':id' é um parâmetro dinâmico na URL */}
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
