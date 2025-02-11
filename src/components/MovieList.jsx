import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieList.scss'
const MovieList = ({ movies }) => {

    return (
        <div className='movies'>
            {movies
                .map((movie) => (
                <div key={movie.imdbID} className="movie">
                    <Link to={`/movie/${movie.imdbID}`}>
                        <h3>{movie.Title}</h3>
                        <img src={movie.Poster} alt={movie.Title} />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MovieList;