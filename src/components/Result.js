import React from 'react'

function Result({ result, openPopup }) {
	return (
		<div className="result" onClick={() => openPopup(result.imdbID)}>
			<img src={result.Poster !== "N/A" ? result.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} alt={result.Title} />
			<h3>{result.Title}</h3>
		</div>
	)
}

export default Result
