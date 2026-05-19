import { useState, useEffect } from "react";
import axios from "axios";

export const usePokemonDetails = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Se não houver ID válido, não faz nada
    if (!id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        // Busca os dados específicos daquele Pokémon pelo ID ou nome
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
        );
        setPokemon(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]); // Executa novamente se o ID mudar

  return { pokemon, loading };
};
