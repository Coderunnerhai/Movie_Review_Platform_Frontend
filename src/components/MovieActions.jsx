import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiStar, FiHeart, FiPlay, FiPlus, FiCheck } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { addToWatchlist, removeFromWatchlist, checkWatchlistStatus } from '../slices/watchlistSlice'
import toast from 'react-hot-toast'

const MovieActions = ({ movie }) => {
  const [isAddingToWatchlist, setIsAddingToWatchlist] = useState(false)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { status } = useSelector((state) => state.watchlist)
  const dispatch = useDispatch()

  const isInWatchlist = status[movie._id] !== undefined
  const watchlistStatus = status[movie._id]

  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add movies to your watchlist')
      return
    }

    setIsAddingToWatchlist(true)
    try {
      if (isInWatchlist) {
        await dispatch(removeFromWatchlist(movie._id)).unwrap()
        toast.success('Removed from watchlist')
      } else {
        await dispatch(addToWatchlist({ movieId: movie._id })).unwrap()
        toast.success('Added to watchlist')
      }
    } catch (error) {
      toast.error(error || 'Failed to update watchlist')
    } finally {
      setIsAddingToWatchlist(false)
    }
  }

  const getWatchlistButtonText = () => {
    if (isAddingToWatchlist) return 'Updating...'
    if (isInWatchlist) return 'In Watchlist'
    return 'Add to Watchlist'
  }

  const getWatchlistButtonIcon = () => {
    if (isAddingToWatchlist) return <FiPlus className="animate-spin" />
    if (isInWatchlist) return <FiCheck />
    return <FiPlus />
  }

  return (
    <div className="flex flex-wrap gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleWatchlistToggle}
        disabled={isAddingToWatchlist}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
          isInWatchlist
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {getWatchlistButtonIcon()}
        <span>{getWatchlistButtonText()}</span>
      </motion.button>

      {movie.trailerUrl && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200"
        >
          <FiPlay />
          <span>Watch Trailer</span>
        </motion.button>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
      >
        <FiHeart />
        <span>Share</span>
      </motion.button>
    </div>
  )
}

export default MovieActions










