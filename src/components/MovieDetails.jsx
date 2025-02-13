import React from 'react';
import {useNavigate} from "react-router-dom";

import "../styles/MovieDetails.scss";

import {useDispatch, useSelector} from "react-redux";
import {addToFavorites, removeFromFavorites, setLoading, setTrailer} from "../redux/moviesSlice";

const MovieDetails = ({movie}) => {
    const navigate = useNavigate(); // Для возврата на главную страницу

    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.movies.favorites);
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

    const {trailerKey} = useSelector((state) => state.movies);
    const handleFavoriteClick = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(movie.imdbID)); // Удалить из избранного
        } else {
            dispatch(addToFavorites(movie)); // Добавить в избранное
        }
    };
    return (

        <div className="movie-details">
            <button className='back' onClick={() => navigate('/')}>
                Назад
            </button>
            <div className="movie-content">
                <img src={movie.Poster} alt={movie.Title}/>
                <div className="movie-info">
                    <h1>{movie.Title}</h1>
                    <p><strong>Год:</strong> {movie.Year}</p>
                    <p><strong>Рейтинг:</strong> {movie.imdbRating}</p>
                    <p><strong>Жанр:</strong> {movie.Genre}</p>
                    <p><strong>Режиссер:</strong> {movie.Director}</p>
                    <p><strong>Актеры:</strong> {movie.Actors}</p>
                    <p><strong>Описание:</strong> {movie.Plot}</p>
                </div>
            </div>
            <div className="trailer">
                {trailerKey ?(

                    <iframe
                        width="100%"
                        height="300"
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title="YouTube video player"

                        allowFullScreen
                    ></iframe>

                ):''}
            </div>
            <button onClick={handleFavoriteClick}>
                {isFavorite ? 'Убраить из избранного' : 'Добавить в избранное'}
            </button>
        </div>
    );
};

export default MovieDetails;