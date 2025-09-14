import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { FiUser, FiStar, FiCalendar, FiHeart, FiTrendingUp } from 'react-icons/fi'
import { fetchUserReviews } from '../slices/reviewSlice'
import { fetchWatchlist } from '../slices/watchlistSlice'
import ReviewCard from '../components/ReviewCard'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'

const UserProfilePage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { user: currentUser } = useSelector((state) => state.auth)
  const { userReviews, isLoading: reviewsLoading } = useSelector((state) => state.reviews)
  const { items: watchlistItems, isLoading: watchlistLoading } = useSelector((state) => state.watchlist)

  const isOwnProfile = !id || id === currentUser?.id

  useEffect(() => {
    const userId = id || currentUser?.id
    if (userId) {
      dispatch(fetchUserReviews({ userId }))
      if (isOwnProfile) {
        dispatch(fetchWatchlist())
      }
    }
  }, [dispatch, id, currentUser?.id, isOwnProfile])

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (reviewsLoading) {
    return <LoadingSpinner text="Loading profile..." />
  }

  const user = currentUser // In a real app, you'd fetch the user by ID

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Profile Picture */}
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <FiUser className="h-12 w-12 text-blue-600" />
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user?.username}
              </h1>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-6 text-gray-600">
                <div className="flex items-center">
                  <FiCalendar className="h-4 w-4 mr-2" />
                  Joined {formatDate(user?.joinDate)}
                </div>
                <div className="flex items-center">
                  <FiStar className="h-4 w-4 mr-2" />
                  {userReviews.length} reviews
                </div>
                {isOwnProfile && (
                  <div className="flex items-center">
                    <FiHeart className="h-4 w-4 mr-2" />
                    {watchlistItems.length} movies in watchlist
                  </div>
                )}
              </div>
            </div>

            {/* Edit Profile Button */}
            {isOwnProfile && (
              <button className="btn-primary">
                Edit Profile
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FiStar className="h-6 w-6 mr-2 text-yellow-500" />
                  Reviews
                </h2>
                <span className="text-gray-500">{userReviews.length} reviews</span>
              </div>

              {userReviews.length > 0 ? (
                <div className="space-y-6">
                  {userReviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiStar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600">
                    {isOwnProfile ? "Start reviewing movies to see them here!" : "This user hasn't written any reviews yet."}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Watchlist Section (Own Profile Only) */}
            {isOwnProfile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <FiHeart className="h-6 w-6 mr-2 text-red-500" />
                    Watchlist
                  </h2>
                  <span className="text-gray-500">{watchlistItems.length} movies</span>
                </div>

                {watchlistLoading ? (
                  <LoadingSpinner text="Loading watchlist..." />
                ) : watchlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {watchlistItems.slice(0, 6).map((item) => (
                      <MovieCard key={item._id} movie={item.movieId} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiHeart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No movies in watchlist</h3>
                    <p className="text-gray-600">Start adding movies to your watchlist!</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Activity Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Reviews</span>
                  <span className="font-semibold">{userReviews.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Rating Given</span>
                  <span className="font-semibold">
                    {userReviews.length > 0 
                      ? (userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length).toFixed(1)
                      : 'N/A'
                    }
                  </span>
                </div>
                {isOwnProfile && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Watchlist Items</span>
                      <span className="font-semibold">{watchlistItems.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Member Since</span>
                      <span className="font-semibold">
                        {user?.joinDate ? new Date(user.joinDate).getFullYear() : 'N/A'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-md p-6 mt-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FiTrendingUp className="h-5 w-5 mr-2 text-green-500" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {userReviews.slice(0, 3).map((review) => (
                  <div key={review._id} className="text-sm">
                    <p className="text-gray-900 font-medium">
                      Reviewed "{review.movieId?.title}"
                    </p>
                    <p className="text-gray-500">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                ))}
                {userReviews.length === 0 && (
                  <p className="text-gray-500 text-sm">No recent activity</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage










