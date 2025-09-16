import { useState, useEffect } from "react";
import { PokemonCard } from "./PokemonCard";
import "./App.css";
const pokemonURL = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";

interface Pokemon {
  name: string;
  image: string;
  types: string[];
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [searchByType, setSearchByType] = useState(false);

  const fetchPokemon = async () => {
    try {
      const response = await fetch(pokemonURL);
      const pokemonData = await response.json();
      //console.log(pokemonData.results);

      // Fetch detailed data for each Pokemon to get sprites
      const pokemonWithImages = await Promise.all(
        pokemonData.results.map(async (pokemon: any) => {
          const detailResponse = await fetch(pokemon.url);
          const detailData = await detailResponse.json();

          return {
            name: detailData.name,
            image: detailData.sprites.other.showdown.front_shiny,
            types: detailData.types.map((type: any) => type.type.name),
          };
        })
      );

      setAllPokemon(pokemonWithImages);
      setPokemon(pokemonWithImages);
      console.log(pokemon);
    } catch (error) {
      console.log(error + "pokemon fetch failed!");
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const onSearchChange = (event: any) => {
    const searchValue = event.target.value.toLowerCase();

    if (searchValue === "") {
      setPokemon(allPokemon);
    } else {
      const filteredPokemon = allPokemon.filter((pokemon: any) => {
        if (searchByType) {
          return pokemon.types.some((type: string) =>
            type.toLowerCase().includes(searchValue)
          );
        } else {
          return pokemon.name.toLowerCase().includes(searchValue);
        }
      });
      setPokemon(filteredPokemon);
    }
  };

  return (
    <>
      <h2>Pokedex</h2>
      <div className="search-container">
        <input
          className="search-box"
          type="search"
          placeholder={searchByType ? "Search by Type" : "Search by Name"}
          onChange={onSearchChange}
        />
        <div className="toggle-container">
          <span className="toggle-label">Names</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={searchByType}
              onChange={() => setSearchByType(!searchByType)}
            />
            <span className="slider"></span>
          </label>
          <span className="toggle-label">Types</span>
        </div>
      </div>
      <div className="pokemon-grid">
        {pokemon.map((pokemon: any) => {
          return (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              src={pokemon.image}
              types={pokemon.types}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
