import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";

function App() {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchField] = useState("");
  const [count, setCount] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [load, setLoad] = useState(false)
  
	const pokemonLista = []

	const getAllPokemons = async (initial, final) => {
		const getPokemonUrls = i => `https://pokeapi.co/api/v2/pokemon/${i}`
		const pokemonPromises = []
	  for (initial; initial <= final; initial++) {
		  pokemonPromises.push(fetch(getPokemonUrls(initial)).then(response => response.json()))
	  }
	  console.log(pokemonPromises)
  
	  return await Promise.all(pokemonPromises)
					 
	  // pokemonLista.map(res => fetch(res).then(qqq => console.log(qqq)))
	}
  useEffect(() => {
	async function fetchData() {
		const pokemon = await getAllPokemons(1, 151)
		setPokemonList(pokemon)
		console.log(pokemonList)
		console.log(pokemon)

		setLoad(true)
	}
	fetchData()
  }, [count]);
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };
  const filteredPokemon = pokemonList.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  return !pokemonList.length ? (
    <h1 className="tc">Loading</h1>
  ) : (
    <div className="tc">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <button onClick={() => setCount(count + 1)}>Click Me!</button>
      <SearchBox searchChange={onSearchChange} />
      {/* <Scroll> */}
      <CardList robots={filteredPokemon} />
      {/* </Scroll> */}
    </div>
  );
}

export default App;
