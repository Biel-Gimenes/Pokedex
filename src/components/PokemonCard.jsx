import { Link } from "react-router-dom"; // 1. Importe o Link

export const PokemonCard = ({ id, name, image, types }) => {
  const typeColors = {
    grass: "bg-emerald-100 text-emerald-700",
    fire: "bg-orange-100 text-orange-700",
    water: "bg-blue-100 text-blue-700",
    bug: "bg-lime-100 text-lime-700",
    normal: "bg-slate-100 text-slate-700",
    poison: "bg-purple-100 text-purple-700",
    fairy: "bg-pink-100 text-pink-700",
    electric: "bg-yellow-100 text-yellow-700",
    ground: "bg-yellow-200 text-yellow-800",
    fighting: "bg-red-100 text-red-700",
    psychic: "bg-violet-200 text-violet-800",
    rock: "bg-gray-200 text-gray-700",
    ghost: "bg-indigo-100 text-indigo-700",
    ice: "bg-cyan-100 text-cyan-700",
    dragon: "bg-purple-200 text-purple-800",
    dark: "bg-gray-800 text-gray-100",
    steel: "bg-gray-300 text-gray-800",
    flying: "bg-blue-200 text-blue-800",
  };

  return (
    <Link
      to={`/pokemon/${id}`}
      className="group bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col no-underline"
    >
      {/* Imagem de fundo do container */}
      <div className="relative bg-slate-50 rounded-2xl p-6 mb-4 flex justify-center items-center">
        {/* Numero do pokemon */}
        <span className="absolute top-3 left-3 text-slate-300 font-bold text-lg">
          #{id.toString().padStart(3, "0")}
        </span>
        {/* Imagem do pokemon */}
        <img
          src={image}
          alt={name}
          className="w-32 h-32 object-contain z-10 group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Nome do pokemon */}
      <h3 className="text-xl font-bold text-slate-800 capitalize text-center mb-3">
        {name}
      </h3>

      {/* Tipos do pokemon */}
      <div className="flex flex-wrap justify-center gap-2 mt-auto">
        {types.map((typeItem) => (
          <span
            key={typeItem.type.name}
            className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${typeColors[typeItem.type.name] || "bg-slate-100 text-slate-600"}`}
            style={{ marginRight: "8px", marginBottom: "8px" }}
          >
            {typeItem.type.name}
          </span>
        ))}
      </div>
    </Link>
  );
};
