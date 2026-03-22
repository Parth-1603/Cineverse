import React from 'react';
import Search from './Search';

function Header({ handleInput, search, view, setView }) {
  return (
    <header className="site-header">
      <div className="header-left">
        <h1 className="logo" onClick={() => setView('home')}>CINEVERSE</h1>
        <nav className="nav-links">
          <span className={`nav-link ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>Movies</span>
          <span className={`nav-link ${view === 'mylist' ? 'active' : ''}`} onClick={() => setView('mylist')}>My List</span>
        </nav>
      </div>
      <div className="header-right">
        <Search handleInput={handleInput} search={search} />
      </div>
    </header>
  );
}

export default Header;
