import React, { useState } from "react";

import { PokemonDetail } from "../../details";
import EvolutionComponent from "../Evolution/evolution.components";
import Modal from "../Modal/modal.components";
import PokemonTypes from "../Types/pokemon-types.components";
import { pokemonTypes } from "../../utils/pokemon-types";

import "./card.styles.scss";
import Header from "../Header/header.component";

type CardProps = {
  pokemon: PokemonDetail;
};

const Card = ({ pokemon }: CardProps) => {
  const [modalOption, setModalOption] = useState(false);
  function handleSubmit() {
    setModalOption(true);
  }
  const gif =
    pokemon.sprites.versions?.["generation-v"]["black-white"].animated
      ?.front_default;

  const [{ color }] = pokemonTypes.filter(
    (type) => type?.name === pokemon?.types[0]?.type?.name
  );

  return (
    <>
      <div
        onClick={handleSubmit}
        className="card-container"
        style={{ backgroundColor: `${color}` }}
      >
        <img alt="pokemon" src={pokemon.sprites.front_default} />
        <h2>{pokemon.name.toLocaleUpperCase()} </h2>
      </div>

      <Modal parentState={modalOption}>
        <Header buttonClose={() => setModalOption(false)}>
          <div className="pokemon-modal-container">
            <div className="pokemon-container">
              <div className="pokemon-data">
                
                <img src={gif} alt="pokemon-modal" />
                {pokemon.id < 10
                  ? `#00${pokemon.id}`
                  : pokemon.id <= 99
                  ? `#0${pokemon.id}`
                  : `#${pokemon.id}`}
                <p className="pokemon-name">
                  {pokemon.name.toLocaleUpperCase()}
                </p>
                <span>
                  Weight: {`${pokemon.weight / 10} Kg`} <br />
                  Height: {`${pokemon.height / 10} M`}
                </span>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "10px" }}
                >
                  {pokemon.types.map((type) => (
                    <PokemonTypes type={type.type.name} />
                  ))}
                </div>
              </div>
              <div className="pokemon-stats" >
                <h3>Stats</h3>
                <ul>
                  {pokemon.stats.map(({ stat, base_stat }) => (
                    <>
                      <li key={base_stat++}>
                        <span> {stat.name.toLocaleUpperCase()}: </span>{" "}
                        <span> {base_stat} </span>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </div>
            <EvolutionComponent pokemon={pokemon} />
          </div>
        </Header>
      </Modal>
    </>
  );
};

export default Card;
