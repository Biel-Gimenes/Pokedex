import { useMemo, useState } from "react";
import { usePokemon } from "../hooks/usePokemon";
import { PokemonCard } from "../components/PokemonCard";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { TypeFilter } from "../components/TypeFilter";
import { Loading } from "../components/Loading";

export const Home = () => {
  const { pokemon, loading, error, retry } = usePokemon();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Tipos que existem na lista carregada, em ordem alfabética.
  const availableTypes = useMemo(
    () => [...new Set(pokemon.flatMap((p) => p.types))].sort(),
    [pokemon],
  );

  const filteredPokemon = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    // "25" ou "#025" busca o número exato; qualquer outro texto busca no nome.
    const numberTerm = /^#?\d+$/.test(term) ? Number(term.replace("#", "")) : null;
    return pokemon.filter((p) => {
      const matchesSearch =
        !term ||
        (numberTerm !== null
          ? p.id === numberTerm
          : p.name.toLowerCase().includes(term));
      const matchesType = !selectedType || p.types.includes(selectedType);
      return matchesSearch && matchesType;
    });
  }, [pokemon, searchTerm, selectedType]);

  const hasFilters = searchTerm !== "" || selectedType !== "";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {!loading && !error && (
          <TypeFilter
            types={availableTypes}
            selected={selectedType}
            onSelect={setSelectedType}
          />
        )}

        {loading && <Loading />}

        {error && !loading && (
          <div
            role="alert"
            className="text-center mt-16 max-w-md mx-auto bg-white border border-red-100 rounded-3xl p-8 shadow-sm"
          >
            <p className="text-lg font-bold text-slate-800 mb-2">
              Não foi possível carregar os Pokémon.
            </p>
            <p className="text-slate-500 mb-6">
              Verifique sua conexão e tente novamente.
            </p>
            <button
              type="button"
              onClick={retry}
              className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-6 rounded-2xl transition-colors"
            >
              Tentar de novo
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <p
              className="text-center text-sm text-slate-500 mb-6"
              aria-live="polite"
            >
              {filteredPokemon.length} de {pokemon.length} Pokémon
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPokemon.map((p) => (
                <PokemonCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  image={p.image}
                  types={p.types}
                />
              ))}
            </div>

            {filteredPokemon.length === 0 && (
              <div className="text-center mt-16 text-slate-500">
                <p className="mb-4">
                  Nenhum Pokémon encontrado com esses filtros.
                </p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-800 font-semibold underline"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};
