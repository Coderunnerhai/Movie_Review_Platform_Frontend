import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitReview } from '../slices/reviewSlice'

const ReviewForm = ({ movieId }) => {
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const { isLoading, error } = useSelector((state) => state.reviews)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!reviewText.trim()) return

    dispatch(submitReview({ movieId, rating, reviewText }))
    setReviewText('')
    setRating(5)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Rating
        </label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border rounded p-2"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num > 1 && 's'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Your Review
        </label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          className="w-full border rounded p-2"
          placeholder="Write your thoughts about this movie..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}

export default ReviewForm