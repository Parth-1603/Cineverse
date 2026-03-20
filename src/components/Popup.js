import React from 'react'

function Popup({ selected, closePopup }) {
	return (
		<section className="popup">
			<div className="content">
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>
				<p className="rating">Rating: {selected.imdbRating}</p>
				<div className="plot">
					<img src={selected.Poster !== "N/A" ? selected.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} alt={selected.Title} />
					<p>{selected.Plot !== "N/A" ? selected.Plot : "Plot description not available for this movie."}</p>
				</div>
				<button className="close" onClick={closePopup}>Close</button>
			</div>
		</section>
	)
}

export default Popup
