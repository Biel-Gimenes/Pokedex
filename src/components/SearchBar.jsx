import { Search } from "lucide-react";

export const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-6 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={20} className="text-slate-400" aria-hidden="true" />
      </div>
      <input
        type="search"
        aria-label="Buscar Pokémon por nome ou número"
        placeholder="Buscar por nome ou número..."
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-2xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
      />
    </div>
  );
};
