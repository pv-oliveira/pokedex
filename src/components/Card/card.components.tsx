import React, { useEffect, useState } from "react";

import { PokemonDetail } from "../../details";
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
          <h2>{pokemon.name} </h2>
          <p>Number: {pokemon.id}</p>
        </div>
      </div>

      <Modal parentState={modalOption}>
        <h2>{`Pagina do pokemon: ${pokemon.name}`}</h2>
        <div style={{background: 'red'}}>

        <div style={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: 'center', margin: '25px' }}>
          <div >
            <table >
              <tbody>
                <tr>
                  <td>Nome:</td>
                  <td>{pokemon.name.toLocaleUpperCase()}</td>
                </tr>
                <tr>
                  <td>Peso:</td>
                  <td>{`${pokemon.weight/10} Kg`}</td>
                </tr>
                <tr>
                  <td>Altura:</td>
                  <td>{`${pokemon.height/10} M`}</td>
                </tr>
                <tr>
                  <td>Tipos</td>
                  {pokemon.types.map((type) => (
                    <PokemonTypes 
                      type={type.type.name}
                      
                    />
                  ))}
                </tr>
              </tbody>
            </table>
        </div>
          <div style={{background: 'white', margin: '25px'}}>
            <img
              src={pokemon.sprites.other?.dream_world.front_default}
              alt="pokemon-modal"
            />
          </div>
        </div>
        </div>

        <button onClick={() => setModalOption(false)}>SAIR</button>
      </Modal>
    </>
  );
};

export default Card;
