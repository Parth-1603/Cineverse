import React from 'react'

function Result({ result, openPopup }) {
	const posterUrl = result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : "https://via.placeholder.com/300x450?text=No+Poster";
	
	return (
		<div className="result" onClick={() => openPopup(result.id)}>
			<img src={posterUrl} alt={result.title} />
			<h3>{result.title}</h3>
		</div>
	)
}

export default Result
