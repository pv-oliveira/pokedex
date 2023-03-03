import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/data.utils';

import { PokemonDetail } from '../../details';

type PokemonProps = {
    pokemon: PokemonDetail
}

type PokemonSpecies = {
    id?: number;
    evolution_chain: {
        url: string;
    }
}

type PokemonEvolutionChainSpecies = {
    name: string;
    url: string;
}

type PokemonEvolutionChain = {
    chain: {
        species: PokemonEvolutionChainSpecies
        evolves_to: [
            {
                species: PokemonEvolutionChainSpecies
                evolves_to: [
                    {
                        species: PokemonEvolutionChainSpecies
                    }
                ]
            }
        ]
    }
}

const EvolutionComponent = (pokemon: PokemonProps) => {

    const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>({
        evolution_chain: {
            url: ''
        }
    });


    const [evolution, setEvolution] = useState(new Map())
    // const [load, setLoad] = useState(false);

    const getPokemonSpecies = async (pokemon: PokemonProps) => {
        const getPokemonURL = (id: number) => `https://pokeapi.co/api/v2/pokemon-species/${id}`

        return await getData<PokemonSpecies>(getPokemonURL(pokemon.pokemon?.id || 0))
    }

    const getPokemonSpecies2 = async (pokemon: any) => {
        const getPokemonURL = (id: number) => `https://pokeapi.co/api/v2/pokemon-species/${id}`
        return await getData(getPokemonURL(pokemon.chain.species.name))
    }
    useEffect(() => {
        async function fetchData() {
            const pokemons = await getPokemonSpecies(pokemon);
            console.log(pokemons)
            setPokemonSpecies(pokemons)
        }
        fetchData()
    }, [pokemon]);

    useEffect(() => {
        async function fetchData() {
            const data = await getData<PokemonEvolutionChain>(pokemonSpecies.evolution_chain.url)
            const evolutionChain = new Map();

            const teste = await getPokemonSpecies2(data)
            console.log(teste)
            evolutionChain.set('first', data.chain.species.url)
            evolutionChain.set('second', data.chain.evolves_to[0].species.name)
            evolutionChain.set('third', data.chain.evolves_to[0].evolves_to[0].species.name)
            setEvolution(evolutionChain)
        }
        fetchData()
    }, [pokemonSpecies])

    console.log(evolution.values().next().value)


    return (
        <div>EvolutionComponent</div>
    )
}

export default EvolutionComponent