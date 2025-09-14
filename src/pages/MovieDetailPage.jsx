import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { FiStar, FiClock, FiCalendar, FiUser, FiPlay, FiHeart } from 'react-icons/fi'
import { fetchMovieById } from '../slices/movieSlice'
import { fetchMovieReviews } from '../slices/reviewSlice'
import MovieActions from '../components/MovieActions'
import ReviewCard from '../components/ReviewCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ReviewForm from '../components/ReviewForm'

const MovieDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentMovie, isLoading } = useSelector((state) => state.movies)
  const { movieReviews, isLoading: reviewsLoading } = useSelector((state) => state.reviews)

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id))
      dispatch(fetchMovieReviews({ movieId: id }))
    }
  }, [dispatch, id])

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`h-5 w-5 ${
            i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      )
    }
    return stars
  }

  if (isLoading) {
    return <LoadingSpinner text="Loading movie details..." />
  }

  if (!currentMovie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Movie not found</h2>
          <p className="text-gray-600">The movie you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700">
        {currentMovie.backdropUrl && (
          <img
            src={currentMovie.backdropUrl}
            alt={currentMovie.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
            {/* Movie Poster */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {currentMovie.posterUrl ? (
                  <img
                    src={currentMovie.posterUrl}
                    alt={currentMovie.title}
                    className="w-full max-w-sm mx-auto rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="w-full max-w-sm mx-auto h-96 bg-gray-200 rounded-lg shadow-2xl flex items-center justify-center">
                    <span className="text-gray-500 text-lg">No Image</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Movie Info */}
            <div className="lg:col-span-2 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {currentMovie.title}
                </h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(Math.floor(currentMovie.averageRating || 0))}
                    <span className="ml-2 text-xl font-semibold">
                      {currentMovie.averageRating ? currentMovie.averageRating.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                  <span className="text-lg">
                    ({currentMovie.totalReviews || 0} reviews)
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-lg">
                  <div className="flex items-center">
                    <FiCalendar className="h-5 w-5 mr-2" />
                    {currentMovie.releaseYear}
                  </div>
                  {currentMovie.duration && (
                    <div className="flex items-center">
                      <FiClock className="h-5 w-5 mr-2" />
                      {currentMovie.duration} minutes
                    </div>
                  )}
                  <div className="flex items-center">
                    <FiUser className="h-5 w-5 mr-2" />
                    {currentMovie.director}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {currentMovie.genre?.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <MovieActions movie={currentMovie} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Synopsis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Synopsis</h2>
              <p className="text-gray-700 leading-relaxed">{currentMovie.synopsis}</p>
            </motion.div>

            {/* Cast */}
            {currentMovie.cast && currentMovie.cast.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cast</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentMovie.cast.map((actor, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <FiUser className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{actor.name}</p>
                        {actor.character && (
                          <p className="text-sm text-gray-600">{actor.character}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Reviews */}
            <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="bg-white rounded-lg shadow-md p-6"
>
  <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>

  {/* Review Form */}
  <div className="mb-8">
    <ReviewForm movieId={currentMovie._id} />
  </div>

  {reviewsLoading ? (
    <LoadingSpinner text="Loading reviews..." />
  ) : movieReviews.length > 0 ? (
    <div className="space-y-6">
      {movieReviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  ) : (
    <div className="text-center py-8">
      <FiHeart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
      <p className="text-gray-600">Be the first to review this movie!</p>
    </div>
  )}
</motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Movie Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-semibold">
                    {currentMovie.averageRating ? currentMovie.averageRating.toFixed(1) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Reviews</span>
                  <span className="font-semibold">{currentMovie.totalReviews || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Release Year</span>
                  <span className="font-semibold">{currentMovie.releaseYear}</span>
                </div>
                {currentMovie.duration && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{currentMovie.duration} min</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage










