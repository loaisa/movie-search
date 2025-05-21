import axios from 'axios';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading, setMovies } from "../redux/moviesSlice";
import { useEffect } from "react";
import React from 'react';
import "../styles/App.scss"

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const popularQueries = [
    'Marvel',
    'Star Wars',
    'Lord of the Rings',
    'Harry Potter',
    'Batman',
    'Avengers',
    'Matrix',
    'Indiana Jones',
    'Jurassic Park',
    'Pirates of the Caribbean'
];

const Home = () => {
    const dispatch = useDispatch();
    const { list: movies, error, loading } = useSelector((state) => state.movies);
    const [scroll, setScroll] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [currentQuery, setCurrentQuery] = React.useState('');
    const [hasMore, setHasMore] = React.useState(true);

    // Функция для загрузки фильмов
    const fetchMovies = async (query, page, isNewSearch = false) => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(`${API_URL}&s=${query}&page=${page}`);
            
            if (response.data.Response === 'True') {
                const totalResults = parseInt(response.data.totalResults);
                setHasMore(page * 10 < totalResults); // Проверяем, есть ли еще страницы

                if (isNewSearch) {
                    dispatch(setMovies(response.data.Search)); // Новый поиск - заменяем список
                } else {
                    dispatch(setMovies([...movies, ...response.data.Search])); // Добавляем к существующему списку
                }
            } else {
                if (isNewSearch) {
                    dispatch(setMovies([]));
                }
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            dispatch(setError('Произошла ошибка при загрузке фильмов'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Первоначальная загрузка
    useEffect(() => {
        dispatch(setLoading(true));
        const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
        setCurrentQuery(randomQuery);
        fetchMovies(randomQuery, 1, true);
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
    }, []);

    // Отслеживание скролла и подгрузка новых фильмов
    useEffect(() => {
        const handleScroll = async () => {
            setScroll(window.scrollY);
            
            // Проверяем, долистали ли мы до конца страницы
            if (

                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500 &&
                !loading &&
                hasMore
            ) {
                dispatch(setLoading(true));
                const nextPage = currentPage + 1;
                setCurrentPage(nextPage);
                await fetchMovies(currentQuery, nextPage);
                setTimeout(() => {
                    dispatch(setLoading(false));
                }, 1000);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [currentPage, loading, hasMore, currentQuery]);

    // Обновленный обработчик поиска
    const handleSearch = async (query) => {
        if (!query) return;

        setCurrentQuery(query);
        setCurrentPage(1);
        setHasMore(true);
        dispatch(setError(''));
        
        try {
            await fetchMovies(query, 1, true);
        } catch (err) {
            dispatch(setError('Ошибка при получении данных'));
            dispatch(setMovies([]));
        }
    };

    return (
        <>
            <button
                className={scroll < 300 ? `main` : `main show`}
                onClick={() => window.scrollTo(0, 0, {behavior: 'smooth'})}
            >
                Go Up
            </button>
            <div className='App__wrapper'>
                <h1>Movie Search</h1>
                <SearchBar onSearch={handleSearch} />
                {loading && (
                    <div className="overlay">
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p className="loading-text">Загрузка...</p>
                        </div>
                    </div>
                )}
                {error && <p>Ошибка! Попробуй ввести наименование на английском языке :)</p>}
                <MovieList movies={movies} />
                {!hasMore && movies.length > 0 && (
                    <p className="no-more-results">Больше фильмов не найдено</p>
                )}
            </div>
        </>
    );
}

export default Home;
