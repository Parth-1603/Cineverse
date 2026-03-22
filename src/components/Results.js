import React from 'react';
import Result from './Result';

function Results({ results, openPopup }) {
  return (
    <section className="search-results-section">
      <h2 className="section-title">Search Results</h2>
      <div className="results-grid">
        {results.map(result => (
          <Result key={result.id} result={result} openPopup={openPopup} />
        ))}
      </div>
    </section>
  );
}

export default Results;
