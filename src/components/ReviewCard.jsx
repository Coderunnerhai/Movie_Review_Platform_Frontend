import React from 'react'
import { motion } from 'framer-motion'
import { FiStar, FiClock, FiCalendar, FiUser, FiThumbsUp } from 'react-icons/fi'

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      )
    }
    return stars
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            {review.userId?.profilePicture ? (
              <img
                src={review.userId.profilePicture}
                alt={review.userId.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <FiUser className="h-5 w-5 text-blue-600" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{review.userId?.username}</h4>
            <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {renderStars(review.rating)}
        </div>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{review.reviewText}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <FiClock className="h-4 w-4 mr-1" />
            {formatDate(review.createdAt)}
          </span>
        </div>
        
        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-200">
          <FiThumbsUp className="h-4 w-4" />
          <span>{review.helpfulVotes || 0}</span>
        </button>
      </div>
    </motion.div>
  )
}

export default ReviewCard










