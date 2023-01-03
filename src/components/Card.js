import React from 'react';

const Card = ({name, email, id, image}) => {
	return (
		<div className = 'bg-light-green dib br3 pad3 ma2 grow bw2 shadow-5 tc'>
			<img alt="robots" src ={image} />
			<div>
				<h2>{name} </h2>
				<p>{email}</p>
			</div>
		</div>
	);
}

export default Card;