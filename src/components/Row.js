import React, { useRef } from 'react';
import Result from './Result';

function Row({ title, movies, openPopup, type }) {
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
    <div className={`content-row ${type ? type + '-row' : ''}`}>
      <div className="row-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 className="row-title" style={{ borderBottom: '2px solid var(--accent-color)', display: 'inline-block', paddingBottom: '4px', marginBottom: 0 }}>{title}</h2>
        {type === 'trending' && <span style={{ color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '14px', marginRight: '4%'}}>View all</span>}
      </div>
      <div className="row-container">
        <div className="slider-arrow left" onClick={scrollLeft}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
        </div>
        <div className="row-posters" ref={rowRef}>
          {movies.map(movie => (
            <Result key={movie.id} result={movie} openPopup={openPopup} type={type} />
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
