import React, {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {useParams} from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';
import {useDispatch, useSelector} from "react-redux";
import {setTrailer} from "../redux/moviesSlice";

const MoviePage = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const API_KEY = process.env.REACT_APP_API_KEY; // Замените на ваш API-ключ
    const API_KEY_YOUTUBE = process.env.REACT_APP_API_KEY_YOUTUBE
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
            const response = await axios.get(
                `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
            );
            const Title = response.data.Title
            const responseYoutube = await axios.get(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${Title}+trailer&key=${API_KEY_YOUTUBE}`
            )
            dispatch(setTrailer(responseYoutube.data.items[0]?.id.videoId))
            setMovie(response.data);}
            catch (e){
                console.log(e)
            }

        };
        fetchMovie();
    }, [id]);
    //
    if (!movie) {
        return (
 
                <div className="overlay">
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Загрузка...</p>
                    </div>
                </div>
        
        );
    }


    return (
        <MovieDetails movie={movie}/>
    );
};

export default MoviePage;