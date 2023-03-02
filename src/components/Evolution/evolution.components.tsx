import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/data.utils';

import { PokemonDetail } from '../../details';

type PokemonProps = {
    pokemon: PokemonDetail
}

type PokemonSpecies = {
    id: number;
    evolution_chain: {
        url: string;
    }    
}

const EvolutionComponent = (pokemon : PokemonProps) => {

    const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | unknown>();

    const getPokemonSpecies = async (pokemon: PokemonProps) => {
        const getPokemonURL = (id: number) => `https://pokeapi.co/api/v2/pokemon-species/${id}`
        console.log(pokemon.pokemon.id)

        return await getData<PokemonSpecies>(getPokemonURL(pokemon.pokemon.id))
    }
    useEffect(() => {
        async function fetchData() {
            const pokemons = await getPokemonSpecies(pokemon)
            setPokemonSpecies(pokemons.evolution_chain)
            console.log(pokemonSpecies)
        }
        fetchData()
    }, [pokemon])
  return (
    <div>EvolutionComponent</div>
  )
}

export default EvolutionComponent