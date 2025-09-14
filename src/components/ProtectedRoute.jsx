import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../slices/authSlice'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && !user) {
      dispatch(getCurrentUser())
    } else if (!token) {
      navigate('/login')
    }
  }, [dispatch, navigate, user])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}

export default ProtectedRoute










