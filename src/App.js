import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import Favorites from "./components/Favorites";

const App = () => {

  return (
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/movie/:id" element={<MoviePage/>}/>
              <Route path="/favorites" element={<Favorites />} />
          </Routes>
  );
};

export default App;