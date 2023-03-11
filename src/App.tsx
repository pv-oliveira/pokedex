import React, { useState, useEffect } from "react";
import CardList from "./components/CardList/card-list.components";
import SearchBox from "./components/SearchBox/search-box.components";

import { getData } from "./utils/data.utils";
import { PokemonDetail } from "./details";

import { getPokemonUrl } from "./api/fetchPokemon";

import pokeLogo from "./assets/dex.png"
import pk from "./assets/pk.png"

import "./App.scss";

function App() {
  const [searchfield, setSearchField] = useState("");
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [load, setLoad] = useState(false);

  
  const getPokemon = async (initial: number, final: number) => {
    const pokemonPromises = [];
    for (initial; initial <= final; initial++) {
      pokemonPromises.push(getData<PokemonDetail>(getPokemonUrl(initial)));
    }
    return await Promise.all(pokemonPromises);
  };

  useEffect(() => {
    async function fetchData() {
      const pokemon = await getPokemon(1, 151);
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

  if (!load) return <p>loading...</p>;
  return (
    <div className="app-container">
      <div className="poke-logo">
        {/* <img className="logo-1" src={pk} alt="" /> */}
        <img className="logo-2" src={pokeLogo} alt="pokedex-name" />
      </div>
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
