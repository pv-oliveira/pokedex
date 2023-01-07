import React from "react";
import Card from "../Card/card.components";

import { PokemonDetail } from "../../details";

import "./card-list.styles.css"

type CardListProps = {
  pokemon: PokemonDetail[];
}


const CardList = ({ pokemon }: CardListProps) => {
  return ( 
    <div className="card-list">
      {pokemon.map((user, i) => {
        return (
          <Card
            key={i + user.id}
            pokemon={user} 
          />
        );
      })}
    </div>
  );
};

export default CardList;
