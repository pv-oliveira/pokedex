import React, { useEffect, useState, useCallback } from "react";
import { getData } from "../../utils/data.utils";

import { PokemonDetail } from "../../details";
import { getPokemonSpeciesURL } from "../../api/fetchPokemonSpecies";
import { getPokemonUrl } from "../../api/fetchPokemon";

import "./evolution.styles.scss";
// import PokemonText from "../PokemonText/pokemon-text.components";

type PokemonProps = {
  pokemon: PokemonDetail;
};

type PokemonSpecies = {
  id?: number;
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: [
    {flavor_text: string;}
  ]
  name: string;
};

type PokemonEvolutionChainSpecies = {
  name: string;
  url: string;
};

type PokemonEvolutionDetails = {
  min_level: number;
  held_item?: {
    name: string;
  };
  item?: {
    name: string;
    url: string;
  };
  trigger?: {
    name?: string;
    url: string;
  };
};

type PokemonEvolution = {
  evolution_details: PokemonEvolutionDetails[];
  species: PokemonEvolutionChainSpecies;
  evolves_to: PokemonEvolution[] | [];
};

type PokemonEvolutionChain = {
  chain: PokemonEvolution;
};

type PokemonList = {
  name: string;
  level: number;
  item?: string;
  held_item?: string;
  trigger?: string;
};

const EvolutionComponent = (pokemon: PokemonProps) => {
  const [pokemonChain, setPokemonChain] = useState<PokemonList[]>([]);
  // const [pokemonSpecie, setPokemonSpecie] = useState<PokemonSpecies>({} as PokemonSpecies);

  const [pokemonData, setPokemonData] = useState<PokemonDetail[]>([]);

  const getPokemonSpecies = async (pokemon: PokemonProps) => {
    return await getData<PokemonSpecies>(
      getPokemonSpeciesURL(pokemon.pokemon?.id || 0)
    );
  };

  const getPokemonEvolutionLine = async (pokemon: PokemonSpecies) => {
    return await getData<PokemonEvolutionChain>(
      pokemon.evolution_chain.url || ""
    );
  };

  const getPokemonChain = useCallback(
    ({ species, evolution_details, evolves_to }: PokemonEvolution) => {
      let pokemonList = [
        {
          name: species.name,
          level: 0,
          item: evolution_details[0]?.item?.name,
          // min_level: evolution_details.min_level
          held_item: evolution_details[0]?.held_item?.name,
          trigger: evolution_details[0]?.trigger?.name,
          //   id: species.url.slice(-5).replace(/\D/g, "").replaceAll("/", ""),
        },
      ];
      if (evolution_details.length) {
        pokemonList[0].level = evolution_details[0].min_level;
      }

      evolves_to.forEach((evolves) => {
        pokemonList = pokemonList.concat(getPokemonChain(evolves));
      });

      return pokemonList;
    },
    []
  );

  const getPokemonData = async (pokemonCh: PokemonList[]) => {
    const pokemonList: PokemonDetail[] = await Promise.all(
      pokemonCh.map(async (pokemon) => {
        const data = await getData<PokemonDetail>(getPokemonUrl(pokemon.name));
        return data;
      })
    );
    return pokemonList;
  };

  useEffect(() => {
    async function fetchData() {
      const pokemonSpeciez = await getPokemonSpecies(pokemon);
      // setPokemonSpecie(pokemonSpeciez)
      const pokemonEvolutionLine = await getPokemonEvolutionLine(pokemonSpeciez);
      const pokemonChain = getPokemonChain(pokemonEvolutionLine.chain);

      setPokemonChain(pokemonChain);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getPokemonData(pokemonChain);
      setPokemonData(data);
    }
    fetchData();
  }, [pokemonChain]);

  if (!pokemonChain.length) return <h2>""</h2>
  return (<>
    {/* <PokemonText 
      PokemonText={pokemonSpecie?.flavor_text_entries[0]?.flavor_text}
    /> */}
    <div className="main-evolution-container">
      {
        pokemonChain.slice(0, 9).map((pokemon, index) => (
          <React.Fragment key={pokemon.level}>
            {index !== 0 && (
              <div className="evolve-data">
                {"=>"}
                {pokemon.level && <p>(Level {pokemon.level})</p>}
                {pokemon.item && (
                  <img
                    alt={pokemon.item}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${pokemon.item}.png`}
                  />
                )}
                {pokemon.held_item && (
                  <img
                    alt={pokemon.held_item}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${pokemon.held_item}.png`}
                  />
                )}
                {!pokemon.level &&
                  !pokemon.item &&
                  !pokemon.held_item &&
                  pokemon.trigger === "level-up" && <p>(High Friendship)</p>}
                {pokemon.trigger && <p>(Evolves from {pokemon.trigger})</p>}
              </div>
            )}
            <div className="pokemon-data-dt">
              <img
                src={
                  pokemonData.filter((data) => pokemon.name === data.name)[0]
                    ?.sprites.front_default
                }
                alt={`pokemon ${pokemon.name}`}
              />
              <p>
                #
                {pokemonData.filter((data) => pokemon.name === data.name)[0]?.id}
              </p>
              <h4>{pokemon.name.toLocaleUpperCase()}</h4>
            </div>
          </React.Fragment>
        ))
      }
    </div>
    </> );
};

export default EvolutionComponent;
