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

    // Fetch featured movie specifically
    axios(`${apiurl}/search/movie?api_key=${apiKey}&query=dhurandhar`).then(({ data }) => {
      let results = data.results || [];
      if (results.length > 0) {
        const dhurandhar = results.find(m => m.release_date && m.release_date.includes('2026')) || results[0];
        setFeatured(dhurandhar);
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
             <h2 className="section-title">My List</h2>
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
            <Row title="Trending Now" movies={trending} openPopup={openPopup} />
            <Row title="Top Rated" movies={topRated} openPopup={openPopup} />
          </>
        )}

        {view !== 'landing' && (typeof state.selected.title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} toggleMyList={toggleMyList} myList={myList} /> : false}
      </main>
    </div>
  );
}

export default App;
