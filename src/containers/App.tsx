import React, { useState, useEffect } from "react";
import CardList from "../components/CardList/card-list.components";
import SearchBox from "../components/SearchBox/search-box.components";

import { getData } from "../utils/data.utils";
import { PokemonDetail } from "../details";

import "./App.css";

function App() {
  const [searchfield, setSearchField] = useState("");
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [load, setLoad] = useState(false);

  const getPokemon = async (initial: number, final: number) => {

    const getPokemonUrl = (i: number) => `https://pokeapi.co/api/v2/pokemon/${i}`;

    const pokemonPromises = [];
    for (initial; initial <= final; initial++) {
      pokemonPromises.push(getData<PokemonDetail>(getPokemonUrl(initial)));
    }

    return await Promise.all(pokemonPromises);
  };

  useEffect(() => {
    async function fetchData() {
      const pokemon = await getPokemon(1, 80);
      setPokemonList(pokemon);

      setLoad(true);
    }

    fetchData();
  }, []);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchField(event.target.value);
  };
  const filteredPokemon = pokemonList.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  if (!load) return <h2>loading</h2>;
  return (
    <div className="tc">
      <h1 className="app-title">Pokedex</h1>
      <SearchBox
        className="pokedex-search-box"
        searchChange={onSearchChange}
        placeholder="search pokemon"
      />
      <CardList pokemon={filteredPokemon} />
    </div>
  );
}

export default App;
