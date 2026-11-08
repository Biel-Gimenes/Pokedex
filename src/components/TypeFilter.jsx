import { typeColors, typeLabels, fallbackTypeColor } from "../data/pokemonData";

export const TypeFilter = ({ types, selected, onSelect }) => {
  const base =
    "px-3 py-1 rounded-full text-sm font-semibold border transition-colors";

  return (
    <div
      role="group"
      aria-label="Filtrar por tipo"
      className="flex flex-wrap justify-center gap-2 mb-8"
    >
      <button
        type="button"
        aria-pressed={selected === ""}
        onClick={() => onSelect("")}
        className={`${base} ${
          selected === ""
            ? "bg-slate-900 text-white border-slate-900"
            : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
        }`}
      >
        Todos
      </button>
      {types.map((type) => (
        <button
          key={type}
          type="button"
          aria-pressed={selected === type}
          onClick={() => onSelect(selected === type ? "" : type)}
          className={`${base} ${typeColors[type] ?? fallbackTypeColor} ${
            selected === type
              ? "border-slate-900 ring-2 ring-slate-900/30"
              : "border-transparent hover:border-slate-400"
          }`}
        >
          {typeLabels[type] ?? type}
        </button>
      ))}
    </div>
  );
};
