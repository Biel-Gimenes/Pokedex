import { usePokemon } from "../hooks/usePokemon";
import { PokemonCard } from "../components/PokemonCard";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";

export const Home = () => {
  const { pokemon, loading } = usePokemon();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl font-bold text-slate-400 animate-pulse">
              Carregando Pokédex...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPokemon.map((p) => (
              <PokemonCard
                key={p.id}
                id={p.id}
                name={p.name}
                image={p.sprites.other["official-artwork"].front_default}
                types={p.types}
              />
            ))}
          </div>
        )}
        {!loading && filteredPokemon.length === 0 && (
          <div className="text-center mt-20 text-slate-500">
            Nenhum Pokemon encontrado com o nome "{searchTerm}".
          </div>
        )}
      </main>
    </div>
  );
};
