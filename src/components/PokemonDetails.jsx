import { useParams, Link } from "react-router-dom"; // 1. Importe o useParams e o Link
import { usePokemonDetails } from "../hooks/usePokemonDetails"; // 2. Importe o hook personalizado para buscar os detalhes do Pokémon

export const PokemonDetails = () => {
  // 2. CAPTURA O ID DA URL: Se a URL for /pokemon/4, a variável 'id' será "4"
  const { id } = useParams();

  // 3. Passa o ID dinâmico para o seu hook buscar os dados específicos do Axios
  const { pokemon, loading } = usePokemonDetails(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <p className="text-xl font-bold text-slate-400 animate-pulse">
          Carregando detalhes do Pokémon...
        </p>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <p className="text-xl font-bold text-red-500">
          Pokémon não encontrado!
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 flex justify-center items-center">
      {/* Card Central de Detalhes */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-4xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Lado Esquerdo: Imagem e Nome */}
        <div className="bg-slate-50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
          <span className="text-slate-300 font-black text-4xl mb-4">
            #{pokemon.id.toString().padStart(3, "0")}
          </span>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-64 h-64 object-contain drop-shadow-lg mb-6"
          />
          <h1 className="text-3xl font-black text-slate-800 capitalize mb-4">
            {pokemon.name}
          </h1>

          {/* Tipos */}
          <div className="flex flex-wrap gap-2 justify-center">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="px-4 py-1.5 bg-slate-200 text-slate-700 rounded-full text-sm font-bold uppercase tracking-wider"
                style={{ marginRight: "8px", marginBottom: "8px" }}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Lado Direito: Informações e Status */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2 border-slate-100">
              Informações Básicas
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
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

            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2 border-slate-100">
              Estatísticas (Stats)
            </h2>
            <div className="space-y-3">
              {pokemon.stats.map((s) => (
                <div key={s.stat.name} className="flex items-center">
                  <span className="w-24 text-sm font-semibold text-slate-500 capitalize">
                    {s.stat.name}
                  </span>
                  <span className="w-12 text-sm font-bold text-slate-700 text-right pr-3">
                    {s.base_stat}
                  </span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((s.base_stat / 150) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ALTERAÇÃO AQUI: O botão de voltar agora é um Link real para a Home '/' */}
          <Link
            to="/"
            className="mt-8 block text-center bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-2xl transition-colors shadow-md no-underline"
          >
            Voltar para a Pokédex
          </Link>
        </div>
      </div>
    </main>
  );
};
