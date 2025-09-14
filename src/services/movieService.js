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

const movieService = {
  getMovies: async (params = {}) => {
    const response = await api.get('/movies', { params })
    return response.data
  },

  getMovieById: async (id) => {
    const response = await api.get(`/movies/${id}`)
    return response.data
  },

  getFeaturedMovies: async () => {
    const response = await api.get('/movies/featured')
    return response.data
  },

  getTrendingMovies: async () => {
    const response = await api.get('/movies/trending')
    return response.data
  },

  searchMovies: async (query) => {
    const response = await api.get('/movies', {
      params: { search: query }
    })
    return response.data
  },

  addMovie: async (movieData) => {
    const response = await api.post('/movies', movieData)
    return response.data
  },

  updateMovie: async (id, movieData) => {
    const response = await api.put(`/movies/${id}`, movieData)
    return response.data
  },

  deleteMovie: async (id) => {
    const response = await api.delete(`/movies/${id}`)
    return response.data
  },

  addMovieFromTMDB: async (tmdbId) => {
    const response = await api.post(`/movies/tmdb/${tmdbId}`)
    return response.data
  },
}

export default movieService










