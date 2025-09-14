import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reviewService from '../services/reviewService'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  }
}

// Async thunks
export const submitReview = createAsyncThunk(
  'reviews/submitReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await reviewService.submitReview(reviewData)
      return response.review
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit review')
    }
  }
)

export const fetchMovieReviews = createAsyncThunk(
  'reviews/fetchMovieReviews',
  async ({ movieId, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await reviewService.getMovieReviews(movieId, page)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews')
    }
  }
)

export const fetchUserReviews = createAsyncThunk(
  'reviews/fetchUserReviews',
  async ({ userId, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await reviewService.getUserReviews(userId, page)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user reviews')
    }
  }
)

export const fetchMyReviews = createAsyncThunk(
  'reviews/fetchMyReviews',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await reviewService.getMyReviews(page)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your reviews')
    }
  }
)

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ reviewId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await reviewService.updateReview(reviewId, reviewData)
      return response.review
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update review')
    }
  }
)

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId, { rejectWithValue }) => {
    try {
      await reviewService.deleteReview(reviewId)
      return reviewId
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete review')
    }
  }
)

export const markReviewHelpful = createAsyncThunk(
  'reviews/markReviewHelpful',
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await reviewService.markHelpful(reviewId)
      return { reviewId, helpfulVotes: response.helpfulVotes }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to mark review as helpful')
    }
  }
)

const initialState = {
  movieReviews: [],
  userReviews: [],
  myReviews: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalReviews: 0,
    hasNext: false,
    hasPrev: false,
  },
  isLoading: false,
  error: null,
}

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearMovieReviews: (state) => {
      state.movieReviews = []
    },
    clearUserReviews: (state) => {
      state.userReviews = []
    },
    clearMyReviews: (state) => {
      state.myReviews = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit review
      .addCase(submitReview.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.movieReviews.unshift(action.payload)
        state.error = null
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch movie reviews
      .addCase(fetchMovieReviews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMovieReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.movieReviews = action.payload.reviews
        state.pagination = action.payload.pagination
        state.error = null
      })
      .addCase(fetchMovieReviews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch user reviews
      .addCase(fetchUserReviews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.userReviews = action.payload.reviews
        state.pagination = action.payload.pagination
        state.error = null
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch my reviews
      .addCase(fetchMyReviews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMyReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.myReviews = action.payload.reviews
        state.pagination = action.payload.pagination
        state.error = null
      })
      .addCase(fetchMyReviews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update review
      .addCase(updateReview.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.movieReviews.findIndex(review => review._id === action.payload._id)
        if (index !== -1) {
          state.movieReviews[index] = action.payload
        }
        state.error = null
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Delete review
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.movieReviews = state.movieReviews.filter(review => review._id !== action.payload)
        state.error = null
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Mark review helpful
      .addCase(markReviewHelpful.pending, (state) => {
        state.error = null
      })
      .addCase(markReviewHelpful.fulfilled, (state, action) => {
        const index = state.movieReviews.findIndex(review => review._id === action.payload.reviewId)
        if (index !== -1) {
          state.movieReviews[index].helpfulVotes = action.payload.helpfulVotes
        }
        state.error = null
      })
      .addCase(markReviewHelpful.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { clearError, clearMovieReviews, clearUserReviews, clearMyReviews } = reviewSlice.actions
export default reviewSlice.reducer










