import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'large', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xlarge: 'h-16 w-16'
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-600 text-sm"
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

export default LoadingSpinner










