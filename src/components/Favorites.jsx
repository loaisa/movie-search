
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/App.scss'
import { useNavigate } from "react-router-dom";
import {removeFromFavorites} from "../redux/moviesSlice";
function Favorites() {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.movies.favorites);
    const navigate = useNavigate();

    const RemoveFavoriteClick = (favorites) => {
        dispatch(removeFromFavorites(favorites.imdbID))
    };
    return (
        <div className="favorites movie-details">
            <button onClick={() => navigate('/')}>
                Назад
            </button>
            <h2>Избранные</h2>
            {favorites.length > 0 ? (
                favorites.map((movie) =>
                    <div key={movie.imdbID} className="movie-list">
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
                        <button onClick={()=>RemoveFavoriteClick(movie)}>
                            Убраить из избранного
                        </button>
                    </div>)
            ) : (
                <p>В избранном ничего нет</p>
            )}
        </div>
    );
}

export default Favorites;