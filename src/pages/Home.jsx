import axios from 'axios';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import {useDispatch, useSelector} from "react-redux";
import {setError, setLoading, setMovies} from "../redux/moviesSlice";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import React from 'react';
import "../styles/App.scss"

const Home = () => {
    const API_KEY = process.env.REACT_APP_API_KEY; // Замените на ваш API-ключ
    const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;
    const dispatch = useDispatch();
    const {list: movies, loading, error} = useSelector((state) => state.movies);
    const [scroll, setScroll] = React.useState(0);

    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    const handleUpButton = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {
         window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const handleSearch = async (query) => {
        if (!query) return;

        dispatch(setLoading(true));
        dispatch(setError(''));
        try {
            const response = await axios.get(`${API_URL}&s=${query}`);
            if (response.data.Response === 'True') {
                dispatch(setMovies(response.data.Search));
            } else {
                dispatch(setError(response.data.Error));
                dispatch(setMovies([]));
            }
        } catch (err) {
            dispatch(setError('Ошибка при получении данных'));
            dispatch(setMovies([]));
        } finally {
            dispatch(setLoading(false));
        }
    };
    return (
        <>

            <button
                className={scroll < 300 ? `main` : `main show`}
                onClick={handleUpButton}
            >
                Go Up
            </button>
            <div className='App__wrapper'>
                <h1>Movie Search</h1>
                <SearchBar onSearch={handleSearch}/>
                {loading && <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Загрузка...</p>
                </div>}
                {error && <p>Ошибка! Попробуй ввести наименование на английском языке :)</p>}
                <MovieList movies={movies}/>
            </div>

        </>);
}
export default Home
