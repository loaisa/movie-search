import React from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import Favorites from "./components/Favorites";

const App = () => {

  return (
      <div className='App'>
          <header className='header'>
              <nav>
                  <ul>
                      <Link to="/">Главная</Link>
                  </ul>
                  <ul>
                      <Link to="/favorites">Избранные фильмы</Link>
                  </ul>

              </nav>
          </header>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/movie/:id" element={<MoviePage/>}/>
              <Route path="/favorites" element={<Favorites/>}/>
          </Routes>
      </div>
  );
};

export default App;