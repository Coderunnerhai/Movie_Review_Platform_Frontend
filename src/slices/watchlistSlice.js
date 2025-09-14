import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import watchlistService from '../services/watchlistService'

// Async thunks
export const addToWatchlist = createAsyncThunk(
  'watchlist/addToWatchlist',
  async ({ movieId, status = 'want_to_watch' }, { rejectWithValue }) => {
    try {
      const response = await watchlistService.addToWatchlist(movieId, status)
      return response.watchlistItem
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to watchlist')
    }
  }
)

export const removeFromWatchlist = createAsyncThunk(
  'watchlist/removeFromWatchlist',
  async (movieId, { rejectWithValue }) => {
    try {
      await watchlistService.removeFromWatchlist(movieId)
      return movieId
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from watchlist')
    }
  }
)

export const updateWatchlistStatus = createAsyncThunk(
  'watchlist/updateWatchlistStatus',
  async ({ movieId, status }, { rejectWithValue }) => {
    try {
      const response = await watchlistService.updateStatus(movieId, status)
      return response.watchlistItem
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update watchlist status')
    }
  }
)

export const fetchWatchlist = createAsyncThunk(
  'watchlist/fetchWatchlist',
  async ({ page = 1, status }, { rejectWithValue }) => {
    try {
      const response = await watchlistService.getWatchlist(page, status)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch watchlist')
    }
  }
)

export const checkWatchlistStatus = createAsyncThunk(
  'watchlist/checkWatchlistStatus',
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await watchlistService.checkStatus(movieId)
      return { movieId, ...response }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to check watchlist status')
    }
  }
)

export const fetchWatchlistStats = createAsyncThunk(
  'watchlist/fetchWatchlistStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await watchlistService.getStats()
      return response.stats
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch watchlist stats')
    }
  }
)

const initialState = {
  items: [],
  status: {}, // movieId -> status mapping
  stats: {
    want_to_watch: 0,
    watching: 0,
    watched: 0,
    total: 0,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false,
  },
  isLoading: false,
  error: null,
}

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearWatchlist: (state) => {
      state.items = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to watchlist
      .addCase(addToWatchlist.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.isLoading = false
        state.items.unshift(action.payload)
        state.status[action.payload.movieId._id] = action.payload.status
        state.stats[action.payload.status] += 1
        state.stats.total += 1
        state.error = null
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Remove from watchlist
      .addCase(removeFromWatchlist.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.isLoading = false
        const item = state.items.find(item => item.movieId._id === action.payload)
        if (item) {
          state.stats[item.status] -= 1
          state.stats.total -= 1
        }
        state.items = state.items.filter(item => item.movieId._id !== action.payload)
        delete state.status[action.payload]
        state.error = null
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update watchlist status
      .addCase(updateWatchlistStatus.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateWatchlistStatus.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.items.findIndex(item => item._id === action.payload._id)
        if (index !== -1) {
          const oldStatus = state.items[index].status
          const newStatus = action.payload.status
          state.items[index] = action.payload
          state.stats[oldStatus] -= 1
          state.stats[newStatus] += 1
          state.status[action.payload.movieId._id] = newStatus
        }
        state.error = null
      })
      .addCase(updateWatchlistStatus.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch watchlist
      .addCase(fetchWatchlist.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.watchlist
        state.pagination = action.payload.pagination
        // Update status mapping
        action.payload.watchlist.forEach(item => {
          state.status[item.movieId._id] = item.status
        })
        state.error = null
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Check watchlist status
      .addCase(checkWatchlistStatus.fulfilled, (state, action) => {
        state.status[action.payload.movieId] = action.payload.status
      })
      // Fetch watchlist stats
      .addCase(fetchWatchlistStats.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWatchlistStats.fulfilled, (state, action) => {
        state.isLoading = false
        state.stats = action.payload
        state.error = null
      })
      .addCase(fetchWatchlistStats.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearWatchlist } = watchlistSlice.actions
export default watchlistSlice.reducer










