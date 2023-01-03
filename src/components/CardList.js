import React from 'react';
import Card from './Card'

const CardList = ({robots}) =>{
	return(
	<div>
      {
	    robots.map((user, i) => {
	return (
				<Card 
					key={i} 
					id={user.id} 
					name={user.name} 
					email={user.email}
					image={user["sprites"].front_default}
				/>
			);
		})	
      }
    </div>
	);
}

export default CardList;
