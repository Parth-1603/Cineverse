import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './components/Header';
import Hero from './components/Hero';
import Row from './components/Row';
import Results from './components/Results';
import Popup from './components/Popup';
import Result from './components/Result';
import Landing from './components/Landing';

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
    error: ""
  });
  
  const [featured, setFeatured] = useState(null);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  
  const [view, setView] = useState('landing');
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem('myList');
    return saved ? JSON.parse(saved) : [];
  });

  const apiurl = "https://api.themoviedb.org/3";
  const apiKey = "6ffcfc7894fe5e50980c21748c6d5456";

  useEffect(() => {
    // Connect to Backend Node / Express built with JSON
    axios.get('http://localhost:5000/api/system-status')
      .then(res => console.log('Node Server Connected successfully:', res.data))
      .catch(err => console.log('Waiting for Node Server on port 5000...'));

    // Fetch featured movie specifically (Dune: Part Two)
    axios(`${apiurl}/search/movie?api_key=${apiKey}&query=dune+part+two`).then(({ data }) => {
      let results = data.results || [];
      if (results.length > 0) {
        // Fetch full details to get runtime and genres
        axios(`${apiurl}/movie/${results[0].id}?api_key=${apiKey}`).then(fullResp => {
            setFeatured(fullResp.data);
        });
      }
    });

    axios(`${apiurl}/trending/movie/week?api_key=${apiKey}`).then(({ data }) => {
      let results = data.results || [];
      if (results.length > 0) {
        setTrending(results);
      }
    });

    axios(`${apiurl}/movie/top_rated?api_key=${apiKey}`).then(({ data }) => {
      let results = data.results || [];
      if (results.length > 0) {
        setTopRated(results);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  const toggleMyList = (movie) => {
    setMyList(prev => {
      const isPresent = prev.find(m => m.id === movie.id);
      if (isPresent) {
        return prev.filter(m => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const search = (e) => {
    if (e.key === "Enter") {
      setView('home'); 
      if (state.s.trim() === "") {
        setState(prevState => ({ ...prevState, results: [], error: "" }));
        return;
      }
      axios(`${apiurl}/search/movie?api_key=${apiKey}&query=${state.s}`).then(({ data }) => {
        let results = data.results || [];
        let error = "";
        if (results.length === 0) {
            error = "Movie not found!";
        }

        setState(prevState => {
          return { ...prevState, results: results, error: error }
        })
      }).catch(err => {
        setState(prevState => {
          return { ...prevState, results: [], error: "Movie not found!" }
        })
      });
    }
  }
  
  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
  }

  const goHome = () => {
    setView('home');
    setState(prevState => ({ ...prevState, s: "", results: [], error: "" }));
  };

  const goToMyList = () => {
    setView('mylist');
    setState(prevState => ({ ...prevState, s: "", results: [], error: "" }));
  };

  const openPopup = id => {
    axios(`${apiurl}/movie/${id}?api_key=${apiKey}`).then(({ data }) => {
      let result = data;
      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  const getGenreBg = (genreId, fallbackUrl) => {
    const movie = [...trending, ...topRated].find(m => m.genre_ids && m.genre_ids.includes(genreId) && m.backdrop_path);
    if (movie) {
      return `url('https://image.tmdb.org/t/p/w780${movie.backdrop_path}')`;
    }
    return `url('${fallbackUrl}')`;
  };

  const searchByGenre = (genreId) => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top to see the first movie
    axios(`${apiurl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`).then(({ data }) => {
      let results = data.results || [];
      setState(prevState => {
        return { ...prevState, results: results, s: "Genre Search", error: "" }
      });
    }).catch(err => {
      setState(prevState => {
        return { ...prevState, results: [], error: "No movies found." }
      });
    });
  };

  return (
    <div className="App">
      {view !== 'landing' && <Header handleInput={handleInput} search={search} view={view} setView={setView} goHome={goHome} goToMyList={goToMyList} searchValue={state.s} />}
      
      <main>
        {view === 'landing' ? (
          <Landing setView={setView} />
        ) : state.s && state.results.length > 0 ? (
           <Results results={state.results} openPopup={openPopup} />
        ) : state.error ? (
          <div className="error-message">Oops! {state.error === "Movie not found!" ? "Movie not found" : state.error}</div>
        ) : view === 'mylist' ? (
          <div className="search-results-section" style={{ paddingTop: '100px', paddingLeft: '4%', paddingRight: '4%'}}>
             <h2 className="section-title" style={{ borderBottom: '2px solid var(--accent-color)', display: 'inline-block', paddingBottom: '5px' }}>Watchlist</h2>
             {myList.length > 0 ? (
               <div className="results-grid">
                 {myList.map(movie => <Result key={movie.id} result={movie} openPopup={openPopup} />)}
               </div>
             ) : (
               <p style={{color: '#aaa', fontSize: '18px'}}>Your list is empty. Add movies you want to watch!</p>
             )}
          </div>
        ) : (
          <>
            <Hero featured={featured} openPopup={openPopup} toggleMyList={toggleMyList} myList={myList} />
            <Row title="Trending Now" movies={trending} openPopup={openPopup} type="trending" />
            <Row title="Popular Movies" movies={topRated} openPopup={openPopup} type="popular" />
            
            {/* Discover by Genre Section */}
            <div className="content-row genre-section">
              <h2 className="row-title">Discover by Genre</h2>
              <div className="genre-grid">
                <div className="genre-tile large" onClick={() => searchByGenre(878)} style={{ backgroundImage: getGenreBg(878, 'https://images.unsplash.com/photo-1549449852-5950d2bb2d63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8cGxhbmV0fGVufDB8fHx8MTcxMTcxOTg3Nw&ixlib=rb-4.0.3&q=80&w=1080') }}>
                  <h3>SCI-FI</h3>
                </div>
                <div className="genre-tile" onClick={() => searchByGenre(28)} style={{ backgroundImage: getGenreBg(28, 'https://images.unsplash.com/photo-1533282246738-9cb5f38e213b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGFjdGlvbnxlbnwwfHx8fDE3MTE3MjAwMTg&ixlib=rb-4.0.3&q=80&w=400') }}>
                  <h3>ACTION</h3>
                </div>
                <div className="genre-tile" onClick={() => searchByGenre(18)} style={{ backgroundImage: getGenreBg(18, 'https://images.unsplash.com/photo-1485846234645-a62644f84728?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGRyYW1hfGVnJvbg&ixlib=rb-4.0.3&q=80&w=400') }}>
                  <h3>DRAMA</h3>
                </div>
                <div className="genre-tile" onClick={() => searchByGenre(27)} style={{ backgroundImage: getGenreBg(27, 'https://images.unsplash.com/photo-1596515284381-817ab46430db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTd8fHNjYXJ5fGVufDB8fHx8MTcxMTcyMDA1Nw&ixlib=rb-4.0.3&q=80&w=400') }}>
                  <h3>HORROR</h3>
                </div>
                <div className="genre-tile" onClick={() => searchByGenre(10749)} style={{ backgroundImage: getGenreBg(10749, 'https://images.unsplash.com/photo-1518199266791-5375a83164ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8cm9tYW5jZXxlbnwwfHx8fDE3MTE3MjAxMDI&ixlib=rb-4.0.3&q=80&w=400') }}>
                  <h3>ROMANCE</h3>
                </div>
              </div>
            </div>
            
            <footer className="site-footer">
              <div className="footer-content">
                <h1 className="footer-logo">CINEVERSE</h1>
                <div className="footer-links">
                  <span>Privacy Policy</span>
                  <span>Terms of Service</span>
                  <span>Contact Us</span>
                  <span>API Documentation</span>
                </div>
                <div className="footer-right">
                  <span className="footer-tmdb">TMDb</span>
                </div>
              </div>
              <div className="footer-copyright">
                © 2026 Cineverse. Powered by TMDb.
              </div>
            </footer>
          </>
        )}

        {view !== 'landing' && (typeof state.selected.title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} toggleMyList={toggleMyList} myList={myList} /> : false}
      </main>
    </div>
  );
}

export default App;
