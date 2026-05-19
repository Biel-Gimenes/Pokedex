export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 border-b border-slate-800 shadow-sm">
      {/* Limitador de tamanho com Flexbox horizontal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Lado Esquerdo: Logo e Pokébola */}
        <div className="flex items-center gap-3 group cursor-pointer">
          {/* CONTAINER DA POKÉBOLA: Forçando tamanho estrito com w-8 h-8 e flex-shink-0 */}
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-red-500 border-2 border-slate-700 relative overflow-hidden flex flex-col justify-between group-hover:rotate-180 transition-transform duration-500">
            <div className="h-1/2 bg-red-500"></div>

            {/* Linha central usando h-0.5 (classe nativa estável do Tailwind) */}
            <div className="absolute w-full h-0.5 bg-slate-700 top-1/2 -translate-y-1/2 flex justify-center items-center">
              {/* Botão central da pokébola */}
              <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-700 absolute"></div>
            </div>

            <div className="h-1/2 bg-white"></div>
          </div>

          {/* Título */}
          <span className="text-2xl font-black tracking-tight text-white">
            Poké<span className="text-red-500">dex</span>
          </span>
        </div>

        {/* Lado Direito: Navegação */}
        <nav className="flex items-center gap-6">
          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            PokeAPI v2
          </span>
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-slate-400 hover:text-red-500 transition-colors no-underline"
          >
            Docs
          </a>
        </nav>
      </div>
    </header>
  );
};
