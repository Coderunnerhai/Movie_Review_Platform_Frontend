import axios from 'axios'

const API_URL = 'http://localhost:5000/reviews'

// Helper to get token
const getAuthConfig = () => {
  const token = localStorage.getItem('token') // token saved after login
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

const submitReview = async (reviewData) => {
  const response = await axios.post(API_URL, reviewData, getAuthConfig())
  return response.data
}

const getMovieReviews = async (movieId, page = 1) => {
  const response = await axios.get(`${API_URL}/movie/${movieId}?page=${page}`)
  return response.data
}

const getUserReviews = async (userId, page = 1) => {
  const response = await axios.get(`${API_URL}/user/${userId}?page=${page}`)
  return response.data
}

const getMyReviews = async (page = 1) => {
  const response = await axios.get(`${API_URL}/me?page=${page}`, getAuthConfig())
  return response.data
}

const updateReview = async (reviewId, reviewData) => {
  const response = await axios.put(`${API_URL}/${reviewId}`, reviewData, getAuthConfig())
  return response.data
}

const deleteReview = async (reviewId) => {
  await axios.delete(`${API_URL}/${reviewId}`, getAuthConfig())
}

const markHelpful = async (reviewId) => {
  const response = await axios.post(`${API_URL}/${reviewId}/helpful`, {}, getAuthConfig())
  return response.data
}

export default {
  submitReview,
  getMovieReviews,
  getUserReviews,
  getMyReviews,
  updateReview,
  deleteReview,
  markHelpful,
}