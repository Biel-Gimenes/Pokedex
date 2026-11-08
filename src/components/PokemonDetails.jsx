import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import { Header } from "./Header";
import {
  TOTAL_POKEMON,
  typeColors,
  typeLabels,
  statLabels,
  fallbackTypeColor,
  formatId,
  prettify,
} from "../data/pokemonData";

const statBarColor = (value) => {
  if (value >= 100) return "bg-emerald-500";
  if (value >= 60) return "bg-blue-500";
  return "bg-amber-500";
};

const Page = ({ children }) => (
  <div className="min-h-screen bg-slate-50">
    <Header />
    {children}
  </div>
);

export const PokemonDetails = () => {
  // Se a URL for /pokemon/4, 'id' será "4"
  const { id } = useParams();
  const { pokemon, loading, notFound, error, retry } = usePokemonDetails(id);

  // Título da aba acompanha o Pokémon aberto.
  useEffect(() => {
    if (!pokemon) return;
    const defaultTitle = document.title;
    document.title = `${prettify(pokemon.name)} ${formatId(pokemon.id)} | Pokédex`;
    // Ao sair da tela (ou trocar de Pokémon), volta ao título anterior.
    return () => {
      document.title = defaultTitle;
    };
  }, [pokemon]);

  if (loading) {
    return (
      <Page>
        <main className="flex justify-center items-center py-32">
          <p
            role="status"
            className="text-xl font-bold text-slate-400 animate-pulse"
          >
            Carregando detalhes do Pokémon...
          </p>
        </main>
      </Page>
    );
  }

  if (!pokemon) {
    return (
      <Page>
        <main
          role="alert"
          className="flex flex-col items-center gap-6 py-32 px-6 text-center"
        >
          <p className="text-xl font-bold text-red-500">
            {notFound
              ? "Pokémon não encontrado!"
              : "Não foi possível carregar este Pokémon."}
          </p>
          <div className="flex gap-3">
            {error && (
              <button
                type="button"
                onClick={retry}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-6 rounded-2xl transition-colors"
              >
                Tentar de novo
              </button>
            )}
            <Link
              to="/"
              className="bg-white border border-slate-200 hover:border-slate-400 text-slate-700 font-bold py-2 px-6 rounded-2xl transition-colors no-underline"
            >
              Voltar para a Pokédex
            </Link>
          </div>
        </main>
      </Page>
    );
  }

  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  const prevId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon.id < TOTAL_POKEMON ? pokemon.id + 1 : null;

  return (
    <Page>
      <main className="p-4 md:p-8 flex justify-center">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-4xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Lado esquerdo: imagem, nome e tipos */}
          <div className="bg-slate-50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
            <span className="text-slate-300 font-black text-4xl mb-4">
              {formatId(pokemon.id)}
            </span>
            <img
              src={
                pokemon.sprites.other["official-artwork"].front_default ??
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className="w-64 h-64 object-contain drop-shadow-lg mb-6"
            />
            <h1 className="text-3xl font-black text-slate-800 capitalize mb-4">
              {pokemon.name}
            </h1>

            <div className="flex flex-wrap gap-2 justify-center">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${typeColors[t.type.name] ?? fallbackTypeColor}`}
                >
                  {typeLabels[t.type.name] ?? t.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Lado direito: informações e status */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2 border-slate-100">
                Informações Básicas
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 p-3 rounded-2xl text-center">
                  <span className="block text-xs text-slate-400 font-bold uppercase">
                    Altura
                  </span>
                  <span className="text-lg font-bold text-slate-700">
                    {pokemon.height / 10} m
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-center">
                  <span className="block text-xs text-slate-400 font-bold uppercase">
                    Peso
                  </span>
                  <span className="text-lg font-bold text-slate-700">
                    {pokemon.weight / 10} kg
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <span className="block text-xs text-slate-400 font-bold uppercase mb-2">
                  Habilidades
                </span>
                <ul className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((a) => (
                    <li
                      key={a.ability.name}
                      className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold"
                    >
                      {prettify(a.ability.name)}
                      {a.is_hidden && (
                        <span className="ml-1 text-xs font-normal text-slate-400">
                          (oculta)
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2 border-slate-100">
                Estatísticas
              </h2>
              <div className="space-y-3">
                {pokemon.stats.map((s) => (
                  <div key={s.stat.name} className="flex items-center">
                    <span className="w-28 text-sm font-semibold text-slate-500">
                      {statLabels[s.stat.name] ?? prettify(s.stat.name)}
                    </span>
                    <span className="w-12 text-sm font-bold text-slate-700 text-right pr-3">
                      {s.base_stat}
                    </span>
                    <div
                      className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-label={statLabels[s.stat.name] ?? s.stat.name}
                      aria-valuenow={s.base_stat}
                      aria-valuemin={0}
                      aria-valuemax={255}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${statBarColor(s.base_stat)}`}
                        style={{
                          width: `${Math.min((s.base_stat / 150) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center pt-2 border-t border-slate-100">
                  <span className="w-28 text-sm font-bold text-slate-700">
                    Total
                  </span>
                  <span className="w-12 text-sm font-black text-slate-800 text-right pr-3">
                    {totalStats}
                  </span>
                </div>
              </div>
            </div>

            {/* Navegação entre Pokémon + voltar */}
            <div className="mt-8">
              <div className="flex justify-between gap-3 mb-3">
                {prevId ? (
                  <Link
                    to={`/pokemon/${prevId}`}
                    className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-3 rounded-2xl transition-colors no-underline"
                  >
                    ← {formatId(prevId)}
                  </Link>
                ) : (
                  <span className="flex-1" />
                )}
                {nextId ? (
                  <Link
                    to={`/pokemon/${nextId}`}
                    className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-3 rounded-2xl transition-colors no-underline"
                  >
                    {formatId(nextId)} →
                  </Link>
                ) : (
                  <span className="flex-1" />
                )}
              </div>
              <Link
                to="/"
                className="block text-center bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-2xl transition-colors shadow-md no-underline"
              >
                Voltar para a Pokédex
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
};
