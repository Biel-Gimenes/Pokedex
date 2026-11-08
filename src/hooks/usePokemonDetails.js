import { useState, useEffect } from "react";
import axios from "axios";

export const usePokemonDetails = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(false);
        setNotFound(false);

        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
          { signal: controller.signal },
        );
        setPokemon(response.data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setPokemon(null);
        // 404 = esse Pokémon não existe; qualquer outra falha = erro de rede.
        if (err.response?.status === 404) setNotFound(true);
        else setError(true);
        console.error("Erro ao buscar detalhes do Pokémon:", err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchDetails();
    return () => controller.abort();
  }, [id, attempt]);

  const retry = () => setAttempt((n) => n + 1);

  return { pokemon, loading, notFound, error, retry };
};
