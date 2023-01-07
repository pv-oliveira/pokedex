import React from "react";

import { PokemonDetail } from "../../details";

import "./card.styles.css";

type CardProps = {
  pokemon: PokemonDetail
}

const Card = ({pokemon}: CardProps) => {
  return (
    <div className="card-container">
      <img alt="pokemon" src={pokemon.sprites.other?.dream_world.front_default} />
      <div>
        <h2>{pokemon.name} </h2>
        <p>Number: {pokemon.id}</p>
      </div>
    </div>
  );
};

export default Card;
