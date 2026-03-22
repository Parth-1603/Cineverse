import React, { useRef } from 'react';
import Result from './Result';

function Row({ title, movies, openPopup }) {
  const rowRef = useRef(null);

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="content-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        <div className="slider-arrow left" onClick={scrollLeft}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
        </div>
        <div className="row-posters" ref={rowRef}>
          {movies.map(movie => (
            <Result key={movie.id} result={movie} openPopup={openPopup} />
          ))}
        </div>
        <div className="slider-arrow right" onClick={scrollRight}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
        </div>
      </div>
    </div>
  );
}

export default Row;
