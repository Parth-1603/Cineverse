import React from 'react';

const TMDB_GENRES = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
  99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
  27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
  10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
};

function Result({ result, openPopup, type }) {
  const posterUrl = result.poster_path 
    ? `https://image.tmdb.org/t/p/w500${result.poster_path}` 
    : "https://via.placeholder.com/300x450?text=No+Poster";
  
  const rating = result.vote_average ? result.vote_average.toFixed(1) : 'NR';
  const year = result.release_date ? result.release_date.substring(0, 4) : '';
  const firstGenre = result.genre_ids && result.genre_ids.length > 0 ? (TMDB_GENRES[result.genre_ids[0]] || 'Drama') : 'Drama';

  if (type === 'trending') {
    return (
      <div className="result-card trending-card" onClick={() => openPopup(result.id)}>
        <div className="poster-wrapper">
          <img src={posterUrl} alt={result.title} />
          <span className="badge-rating">★ {rating}</span>
        </div>
      </div>
    );
  }

  // Popular or generic view
  return (
    <div className="result-card popular-card" onClick={() => openPopup(result.id)}>
      <img src={posterUrl} alt={result.title} className="popular-poster" />
      <div className="popular-info">
        <div className="popular-title-row">
          <h3 className="popular-title">{result.title}</h3>
          {year && <span className="popular-year">{year}</span>}
        </div>
        <div className="popular-meta">
          <span className="popular-rating" style={{ color: '#E50914' }}>★ {rating}</span>
          <span className="popular-dot"> • </span>
          <span className="popular-genre">{firstGenre}</span>
        </div>
      </div>
    </div>
  );
}

export default Result;
