import React, { useEffect, useState } from "react";

import { PokemonDetail } from "../../details";
import EvolutionComponent from "../Evolution/evolution.components";
import Modal from "../Modal/modal.components";
import PokemonTypes from "../Types/pokemon-types.components";

import "./card.styles.css";

type CardProps = {
  pokemon: PokemonDetail;
};

const Card = ({ pokemon }: CardProps) => {
  const [modalOption, setModalOption] = useState(false);

  function handleSubmit() {
    console.log(pokemon);
    setModalOption(true);
  }

  return (
    <>
      <div onClick={handleSubmit} className="card-container">
        <img alt="pokemon" src={pokemon.sprites.front_default} />
        <div>
          <h2>{pokemon.name.toLocaleUpperCase()} </h2>
          <p>Number: {pokemon.id}</p>
        </div>
      </div>

      <Modal parentState={modalOption}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: 'wrap',
            gap: "100px"
          }}
        >
          <div className="pokemon-data">
            <img
              src={pokemon.sprites.other?.dream_world.front_default}
              alt="pokemon-modal"
            />
            {
              pokemon.id < 10 ? `#00${pokemon.id}` : pokemon.id <= 99 ? `#0${pokemon.id}` : `#${pokemon.id}`
            }
            <span className="pokemon-name">
              {pokemon.name.toLocaleUpperCase()}
            </span>
            <span>
              Peso: {`${pokemon.weight / 10} Kg`} <br />
              Altura: {`${pokemon.height / 10} M`}
            </span>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              {pokemon.types.map((type) => (
                <PokemonTypes type={type.type.name} />
              ))}
            </div>
          </div>
          <div className="pokemon-stats" style={{color: "white"}}>
            <h3>Stats</h3>
            <ul>{pokemon.stats.map(({stat, base_stat}) => (<>
              <li>
                <span> {stat.name}: </span> <span> {base_stat} </span>
              </li>
            </>
            ))}</ul>
          </div>
          <EvolutionComponent
            pokemon={pokemon}
           />
        </div>

        <button onClick={() => setModalOption(false)}>SAIR</button>
      </Modal>
    </>
  );
};

export default Card;
