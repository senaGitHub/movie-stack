import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovies } from "../services/movieGateway";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  currentPage: 1,
};

//Async thunk
export const loadMovies = createAsyncThunk("movie/loadMovies", async ({ query, page }: { query: string; page: number }) => {
  const data = await fetchMovies(query, page);
  return data.Search || [];
});

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(loadMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load movies";
      });
  },
});
export const { setPage } = movieSlice.actions;
export default movieSlice.reducer;
