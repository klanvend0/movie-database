import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  selectedMovie: null,
  isLoading: false,
  searchKey: "Pokemon",
  searchType: "",
  year: null,
  page: 1,
  totalResults: 0,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie =
        state.movies.find((movie) => movie.id === action.payload) || null;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalResults: (state, action) => {
      state.totalResults = action.payload;
    },
  },
});

export default moviesSlice;

export const {
  setTotalResults,
  setPage,
  setMovies,
  setSelectedMovie,
  setIsLoading,
  setSearchKey,
  setSearchType,
  setYear,
} = moviesSlice.actions;
