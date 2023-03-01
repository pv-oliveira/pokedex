import React from 'react'
import { pokemonTypes }  from '../../utils/pokemon-types';
import "./pokemon-types.styles.css";

type PokemonTypesProps = {
    type: string
}

const PokemonTypes = (props: PokemonTypesProps) => {
    const color = pokemonTypes.filter(element => element.name === props.type)[0].color;
    console.log(color)
    console.log(props.type)
  return (
    <>
        <div className='pokemon-type-container'>
            <button className={`pokemon-type-button ${props.type}`}>{props.type}</button>
        </div>
    </>

  )
}

export default PokemonTypes