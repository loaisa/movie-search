import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';

const MoviePage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const API_KEY = process.env.REACT_APP_API_KEY; // Замените на ваш API-ключ
    useEffect(() => {
        const fetchMovie = async () => {
            const response = await axios.get(
                `http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
            );
            setMovie(response.data);
        };
        fetchMovie();
    }, [id]);

    if (!movie) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Загрузка...</p>
            </div>
        );
    }

    return (
        <div>
            <MovieDetails movie={movie} />
        </div>
    );
};

export default MoviePage;