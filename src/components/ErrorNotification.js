import React from 'react'
import { useSelector } from 'react-redux'

const ErrorNotification = () => {
  const error = useSelector(state => state.notification.error)
  if (error === '') {
    return null
  }

  return (
    <div className="error">
      {error}
    </div>
  )
}

export default ErrorNotification
