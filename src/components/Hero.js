import React from 'react';

function Hero({ featured, openPopup, toggleMyList, myList }) {
  if (!featured) return null;

  const backdropUrl = featured.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${featured.backdrop_path}` 
    : "https://via.placeholder.com/1920x1080?text=No+Backdrop";
  
  const releaseYear = featured.release_date ? featured.release_date.substring(0, 4) : "N/A";

  const inList = myList && myList.find(m => m.id === featured.id);

  return (
    <div className="hero" style={{ backgroundImage: `url(${backdropUrl})` }}>
      <div className="hero-vignette"></div>
      <div className="hero-content">
        <span className="badge">FEATURED.</span>
        <h1 className="hero-title">{featured.title}</h1>
        <div className="hero-meta">
          <span className="rating">
            <svg viewBox="0 0 24 24" fill="#E50914" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/></svg>
            {featured.vote_average.toFixed(1)}
          </span>
          <span className="year">{releaseYear}</span>
        </div>
        <p className="hero-overview">
          {featured.overview && featured.overview.length > 200 ? featured.overview.substring(0, 200) + '...' : featured.overview}
        </p>
        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => openPopup(featured.id)}>
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 5V19L19 12L8 5Z"/></svg>
            Watch Trailer
          </button>
          <button className="secondary-btn" onClick={() => toggleMyList(featured)}>
            {inList ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z"/></svg>
                In My List
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/></svg>
                My List
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
