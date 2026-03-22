import React, { useState } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
    error: ""
  });
  const apiurl = "https://api.themoviedb.org/3";
  const apiKey = "6ffcfc7894fe5e50980c21748c6d5456";

  const search = (e) => {
    if (e.key === "Enter") {
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

  const openPopup = id => {
    axios(`${apiurl}/movie/${id}?api_key=${apiKey}`).then(({ data }) => {
      let result = data;

      console.log(result);

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
      <header>
        <h1>Cineverse</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />

        {state.error ? (
          <div className="error-message">Oops! {state.error === "Movie not found!" ? "Movie not found" : state.error}</div>
        ) : (
          <Results results={state.results} openPopup={openPopup} />
        )}

        {(typeof state.selected.title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App
