import { useState } from "react";
import { usePokemon } from "./hooks/usePokemon";
//import {pageHome} from "./pages/home"

function App() {
  const { pokemon, loading } = usePokemon();
  console.log(pokemon);
  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div>
      {pokemon.map((pokemons) => (
        <p key={pokemons.id}>{pokemons.name}</p>
      ))}
    </div>
  );
}

export default App;
