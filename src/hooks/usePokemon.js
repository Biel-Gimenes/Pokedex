import { useState, useEffect } from "react";
import axios from "axios";
import { TOTAL_POKEMON } from "../data/pokemonData";

const CACHE_KEY = "pokedex:gen1:v1";

// O cache evita refazer 152 requisições a cada visita na mesma sessão.
const readCache = () => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeCache = (data) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage indisponível ou cheio: segue sem cache.
  }
};

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchPokemon = async () => {
      // Na primeira tentativa usa o cache; "tentar de novo" sempre busca na API.
      const cached = attempt === 0 ? readCache() : null;
      if (cached) {
        setPokemon(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMON}`,
          { signal },
        );

        const detailed = await Promise.all(
          response.data.results.map((item) => axios.get(item.url, { signal })),
        );

        // Guarda só o que a listagem usa (o payload completo é enorme).
        const slim = detailed.map(({ data }) => ({
          id: data.id,
          name: data.name,
          image:
            data.sprites.other["official-artwork"].front_default ??
            data.sprites.front_default,
          types: data.types.map((t) => t.type.name),
        }));

        setPokemon(slim);
        writeCache(slim);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Erro ao buscar dados da PokeAPI", err);
        setError(true);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchPokemon();
    return () => controller.abort();
  }, [attempt]);

  const retry = () => setAttempt((n) => n + 1);

  return { pokemon, loading, error, retry };
};
