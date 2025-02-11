import {createSlice} from '@reduxjs/toolkit';

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        list: [],
        loading: false,
        error: null,
        favorites: [],
        trailerKey:null,
    },
    reducers: {
        setMovies: (state, action) => {
            state.list = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        addToFavorites: (state, action) => {
            const movie = action.payload
            if (!state.favorites.some((fav) => fav.imdbID === movie.imdbID)) {
                state.favorites.push(movie)
            }
        },
        removeFromFavorites: (state, action) => {
            const movieId = action.payload;
            state.favorites = state.favorites.filter((fav) => fav.imdbID !== movieId);
        },
        setTrailer:(state, action)=>{
            state.loading = false;
            state.trailerKey = action.payload;
        }
    },
});

export const {
    setMovies,
    setLoading,
    setError,
    addToFavorites,
    removeFromFavorites,
    setTrailer
} = moviesSlice.actions;
export default moviesSlice.reducer;