import { Link } from "react-router-dom";
import {
  typeColors,
  typeLabels,
  fallbackTypeColor,
  formatId,
} from "../data/pokemonData";

export const PokemonCard = ({ id, name, image, types }) => {
  return (
    <Link
      to={`/pokemon/${id}`}
      className="group bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col no-underline"
    >
      <div className="relative bg-slate-50 rounded-2xl p-6 mb-4 flex justify-center items-center">
        <span className="absolute top-3 left-3 text-slate-300 font-bold text-lg">
          {formatId(id)}
        </span>
        <img
          src={image}
          alt={name}
          width="128"
          height="128"
          loading="lazy"
          className="w-32 h-32 object-contain z-10 group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <h3 className="text-xl font-bold text-slate-800 capitalize text-center mb-3">
        {name}
      </h3>

      <div className="flex flex-wrap justify-center gap-2 mt-auto">
        {types.map((type) => (
          <span
            key={type}
            className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${typeColors[type] ?? fallbackTypeColor}`}
          >
            {typeLabels[type] ?? type}
          </span>
        ))}
      </div>
    </Link>
  );
};
