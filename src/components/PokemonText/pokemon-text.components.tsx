import React from 'react'

import "./pokemon-text.styles.scss"

type PokemonTextProps = {
    PokemonText: string;
}
const PokemonText = ({PokemonText}: PokemonTextProps) => {
    return (<div className='text-container'>
        <h2>Details</h2>
        <p>{PokemonText}</p>
    </div>
  )
}

export default PokemonText