// Dados e helpers compartilhados entre as telas.

export const TOTAL_POKEMON = 151;

// Cores dos "badges" de tipo (classes do Tailwind).
export const typeColors = {
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

export const fallbackTypeColor = "bg-slate-100 text-slate-600";

export const typeLabels = {
  grass: "Planta",
  fire: "Fogo",
  water: "Água",
  bug: "Inseto",
  normal: "Normal",
  poison: "Veneno",
  fairy: "Fada",
  electric: "Elétrico",
  ground: "Terra",
  fighting: "Lutador",
  psychic: "Psíquico",
  rock: "Pedra",
  ghost: "Fantasma",
  ice: "Gelo",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Aço",
  flying: "Voador",
};

export const statLabels = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Ataque Esp.",
  "special-defense": "Defesa Esp.",
  speed: "Velocidade",
};

export const formatId = (id) => `#${String(id).padStart(3, "0")}`;

// "special-attack" -> "Special attack" (para habilidades, por ex.)
export const prettify = (text) =>
  text.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
