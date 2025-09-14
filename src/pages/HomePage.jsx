import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiPlay, FiTrendingUp, FiAward } from 'react-icons/fi'
import { fetchFeaturedMovies, fetchTrendingMovies } from '../slices/movieSlice'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'

const HomePage = () => {
  const dispatch = useDispatch()
  const { featuredMovies, trendingMovies, isLoading } = useSelector((state) => state.movies)

  useEffect(() => {
    dispatch(fetchFeaturedMovies())
    dispatch(fetchTrendingMovies())
  }, [dispatch])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Your Next
              <span className="block text-yellow-300">Favorite Movie</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Join thousands of movie enthusiasts sharing reviews, ratings, and recommendations. 
              Find your perfect film from our extensive collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/movies"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <FiPlay className="mr-2" />
                Browse Movies
              </Link>
              <Link
                to="/register"
                className="border-2 border-white hover:bg-white hover:text-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Join Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <FiAward className="h-8 w-8 text-yellow-500 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Featured Movies
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked movies that have received exceptional ratings from our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {featuredMovies.map((movie, index) => (
              <motion.div
                key={movie._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/movies?sort=averageRating"
              className="btn-primary text-lg px-8 py-3"
            >
              View All Featured Movies
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Movies Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <FiTrendingUp className="h-8 w-8 text-green-500 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Trending Now
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Movies that are currently popular and generating buzz in our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {trendingMovies.map((movie, index) => (
              <motion.div
                key={movie._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/movies?sort=totalReviews"
              className="btn-primary text-lg px-8 py-3"
            >
              View All Trending Movies
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-blue-100">
              Discover what makes our platform special
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <FiStar className="h-10 w-10 text-yellow-300" />
              </div>
              <h3 className="text-3xl font-bold mb-2">10,000+</h3>
              <p className="text-blue-100">Movie Reviews</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <FiPlay className="h-10 w-10 text-yellow-300" />
              </div>
              <h3 className="text-3xl font-bold mb-2">5,000+</h3>
              <p className="text-blue-100">Movies Catalog</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <FiAward className="h-10 w-10 text-yellow-300" />
              </div>
              <h3 className="text-3xl font-bold mb-2">2,500+</h3>
              <p className="text-blue-100">Active Users</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage










