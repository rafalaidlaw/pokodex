import { useState, useEffect } from "react";
import { PokemonCard } from "./PokemonCard";
import "./App.css";
const pokemonURL = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";
function App() {
  const [pokemon, setPokemon] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPokemon = async () => {
    try {
      const response = await fetch(pokemonURL);
      const pokemonData = await response.json();
      console.log(pokemonData);

      // Fetch detailed data for each Pokemon to get sprites
      const pokemonWithImages = await Promise.all(
        pokemonData.results.map(async (pokemon: any) => {
          const detailResponse = await fetch(pokemon.url);
          const detailData = await detailResponse.json();
          return {
            name: pokemon.name,
            image: detailData.sprites.front_shiny,
          };
        })
      );

      setAllPokemon(pokemonWithImages);
      setPokemon(pokemonWithImages);
    } catch (error) {
      console.log(error + "pokemon fetch failed!");
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <>
      <h2>Pokedex</h2>
      <input
        className="search-box"
        type="search"
        placeholder="Search Pokedex"
        onChange={(event) => {
          const searchValue = event.target.value.toLowerCase();
          setSearchTerm(searchValue);

          const filteredPokemon = allPokemon.filter((pokemon: any) =>
            pokemon.name.toLowerCase().includes(searchValue)
          );
          setPokemon(filteredPokemon);
        }}
      />
      {pokemon.map((pokemon: any) => {
        return (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            src={pokemon.image}
          />
        );
      })}
    </>
  );
}

export default App;
