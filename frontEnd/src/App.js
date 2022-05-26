import './App.css';
import { Routes, Route } from "react-router-dom";
import { Home, AddReview } from './pages';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
      fetch('/api/data')
      .then((response) => response.json())
      .then(setMovies)
  }, []);

  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home movies={movies} setMovies={setMovies}/>}/>
        <Route path="/addReview" element={<AddReview movies={movies} setMovies={setMovies} />}/>
      </Routes>
    </div>
  );
}

export default App;
