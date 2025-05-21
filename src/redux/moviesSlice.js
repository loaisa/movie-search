import {createSlice} from '@reduxjs/toolkit';

const loadFavorites = () => {
    const favorites = localStorage.getItem('localStorageFav');
    return favorites ? JSON.parse(favorites) : [];
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        list: [],
        loading: false,
        error: null,
        favorites: loadFavorites(),
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
                localStorage.setItem('localStorageFav', JSON.stringify(state.favorites))
            }
        },
        removeFromFavorites: (state, action) => {
            const movieId = action.payload;
            state.favorites = state.favorites.filter((fav) => fav.imdbID !== movieId);
            localStorage.setItem('localStorageFav', JSON.stringify(state.favorites));
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