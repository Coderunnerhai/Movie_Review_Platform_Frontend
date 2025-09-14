import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieService from '../services/movieService'

// Async thunks
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await movieService.getMovies(params)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch movies')
    }
  }
)

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await movieService.getMovieById(id)
      return response.movie
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch movie')
    }
  }
)

export const fetchFeaturedMovies = createAsyncThunk(
  'movies/fetchFeaturedMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await movieService.getFeaturedMovies()
      return response.movies
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch featured movies')
    }
  }
)

export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrendingMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await movieService.getTrendingMovies()
      return response.movies
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch trending movies')
    }
  }
)

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (query, { rejectWithValue }) => {
    try {
      const response = await movieService.searchMovies(query)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search movies')
    }
  }
)

const initialState = {
  movies: [],
  featuredMovies: [],
  trendingMovies: [],
  currentMovie: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalMovies: 0,
    hasNext: false,
    hasPrev: false,
  },
  searchResults: [],
  isLoading: false,
  isSearching: false,
  error: null,
}

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setFilters: (state, action) => {
    state.filters = { ...state.filters, ...action.payload };
  },
    clearError: (state) => {
      state.error = null
    },
    clearSearchResults: (state) => {
      state.searchResults = []
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.movies = action.payload.movies
        state.pagination = action.payload.pagination
        state.error = null
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch movie by ID
      .addCase(fetchMovieById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentMovie = action.payload
        state.error = null
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch featured movies
      .addCase(fetchFeaturedMovies.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchFeaturedMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.featuredMovies = action.payload
        state.error = null
      })
      .addCase(fetchFeaturedMovies.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch trending movies
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.trendingMovies = action.payload
        state.error = null
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.isSearching = true
        state.error = null
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.isSearching = false
        state.searchResults = action.payload.movies
        state.error = null
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.isSearching = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearSearchResults, clearCurrentMovie, setFilters } = movieSlice.actions
export default movieSlice.reducer










