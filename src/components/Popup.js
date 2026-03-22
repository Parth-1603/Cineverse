import React from 'react'

function Popup({ selected, closePopup }) {
	const posterUrl = selected.poster_path ? `https://image.tmdb.org/t/p/w500${selected.poster_path}` : "https://via.placeholder.com/300x450?text=No+Poster";
	const releaseYear = selected.release_date ? selected.release_date.substring(0, 4) : "N/A";

	return (
		<section className="popup">
			<div className="content">
				<h2>{ selected.title } <span>({ releaseYear })</span></h2>
				<p className="rating">Rating: {selected.vote_average}</p>
				<div className="plot">
					<img src={posterUrl} alt={selected.title} />
					<p>{selected.overview ? selected.overview : "Plot description not available for this movie."}</p>
				</div>
				<button className="close" onClick={closePopup}>Close</button>
			</div>
		</section>
	)
}

export default Popup
