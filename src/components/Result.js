import React from 'react';

function Result({ result, openPopup }) {
  const posterUrl = result.poster_path 
    ? `https://image.tmdb.org/t/p/w500${result.poster_path}` 
    : "https://via.placeholder.com/300x450?text=No+Poster";
  
  return (
    <div className="result-card" onClick={() => openPopup(result.id)}>
      <img src={posterUrl} alt={result.title} />
      <div className="result-meta">
        <span className="result-rating">★ {result.vote_average ? result.vote_average.toFixed(1) : 'NR'}</span>
        <span className="result-year">{result.release_date ? result.release_date.substring(0, 4) : ''}</span>
      </div>
    </div>
  );
}

export default Result;
