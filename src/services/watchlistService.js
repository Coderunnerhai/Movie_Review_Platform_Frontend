import axios from 'axios'

const API_URL = '/api'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const watchlistService = {
  addToWatchlist: async (movieId, status = 'want_to_watch') => {
    const response = await api.post('/watchlist', { movieId, status })
    return response.data
  },

  removeFromWatchlist: async (movieId) => {
    const response = await api.delete(`/watchlist/${movieId}`)
    return response.data
  },

  updateStatus: async (movieId, status) => {
    const response = await api.put(`/watchlist/${movieId}`, { status })
    return response.data
  },

  getWatchlist: async (page = 1, status) => {
    const params = { page }
    if (status) params.status = status
    
    const response = await api.get('/watchlist', { params })
    return response.data
  },

  checkStatus: async (movieId) => {
    const response = await api.get(`/watchlist/check/${movieId}`)
    return response.data
  },

  getStats: async () => {
    const response = await api.get('/watchlist/stats')
    return response.data
  },
}

export default watchlistService










