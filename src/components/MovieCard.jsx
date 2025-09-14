import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiClock, FiCalendar } from 'react-icons/fi'

const MovieCard = ({ movie }) => {
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FiStar key={i} className="h-4 w-4 text-yellow-400 fill-current" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <FiStar key="half" className="h-4 w-4 text-yellow-400 fill-current opacity-50" />
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FiStar key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      )
    }

    return stars
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="movie-card group"
    >
      <Link to={`/movies/${movie._id}`}>
        <div className="relative overflow-hidden">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-lg">No Image</span>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white bg-opacity-90 rounded-full p-3">
                <FiStar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              {renderStars(movie.averageRating || 0)}
              <span className="ml-1 text-sm text-gray-600">
                {movie.averageRating ? movie.averageRating.toFixed(1) : 'N/A'}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({movie.totalReviews || 0} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <div className="flex items-center">
              <FiCalendar className="h-4 w-4 mr-1" />
              {movie.releaseYear}
            </div>
            {movie.duration && (
              <div className="flex items-center">
                <FiClock className="h-4 w-4 mr-1" />
                {movie.duration}m
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {movie.genre?.slice(0, 3).map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {genre}
              </span>
            ))}
            {movie.genre?.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{movie.genre.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default MovieCard










