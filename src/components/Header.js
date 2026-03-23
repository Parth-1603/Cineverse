import React from 'react';
import Search from './Search';

function Header({ handleInput, search, view, setView, goHome, goToMyList, searchValue }) {
  return (
    <header className="site-header">
      <div className="header-left">
        <h1 className="logo" onClick={goHome || (() => setView('home'))} style={{cursor: 'pointer'}}>CINEVERSE</h1>
        <nav className="nav-links">
          <span className={`nav-link ${view === 'home' ? 'active' : ''}`} onClick={goHome || (() => setView('home'))}>Movies</span>
          <span className={`nav-link ${view === 'mylist' ? 'active' : ''}`} onClick={goToMyList || (() => setView('mylist'))}>My List</span>
        </nav>
      </div>
      <div className="header-right">
        <Search handleInput={handleInput} search={search} searchValue={searchValue} />
      </div>
    </header>
  );
}

export default Header;
