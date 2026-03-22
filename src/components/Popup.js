import React from 'react';

function Popup({ selected, closePopup, toggleMyList, myList }) {
  const posterUrl = selected.poster_path 
    ? `https://image.tmdb.org/t/p/w500${selected.poster_path}` 
    : "https://via.placeholder.com/300x450?text=No+Poster";
  const releaseYear = selected.release_date ? selected.release_date.substring(0, 4) : "N/A";

  const inList = myList && myList.find(m => m.id === selected.id);

  return (
    <section className="popup">
      <div className="content">
        <h2>{ selected.title } <span>({ releaseYear })</span></h2>
        <p className="rating">Rating: {selected.vote_average}</p>
        <div className="plot">
          <img src={posterUrl} alt={selected.title} />
          <p>{selected.overview ? selected.overview : "Plot description not available for this movie."}</p>
        </div>
        <div className="popup-buttons" style={{ display: 'flex', gap: '10px' }}>
            <button className="close" onClick={closePopup}>Close</button>
            <button 
              className="close" 
              style={{ backgroundColor: inList ? '#333' : '#E50914' }}
              onClick={() => toggleMyList(selected)}
            >
              {inList ? 'Remove from My List' : '+ Add to My List'}
            </button>
        </div>
      </div>
    </section>
  )
}

export default Popup;
