import { useState, useEffect } from "react";
import axios from "axios";

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Busca os 151 pokémons
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151",
        );

        // Busca os detalhes de cada pokémon
        const detailedPromises = response.data.results.map((pokemons) =>
          axios.get(pokemons.url),
        );

        // Espera todas as requisições terminarem
        const detailedResponses = await Promise.all(detailedPromises);

        // Pega apenas os dados
        const finalData = detailedResponses.map((res) => res.data);

        setPokemon(finalData);
      } catch (error) {
        console.error("Erro ao buscar dados da PokeAPI", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return { pokemon, loading };
};
