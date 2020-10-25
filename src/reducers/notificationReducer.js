let notificationTimeoutID = null
let errorTimeoutID = null

export const setNotificationMessage = (
  message,
  message_type = 'notification',
  seconds = 5
) => {
  const type = message_type === 'notification'
    ? 'SET_NOTIFICATION_MESSAGE'
    : 'SET_ERROR_MESSAGE'
  let timeoutID = message_type === 'notification'
    ? notificationTimeoutID
    : errorTimeoutID

  return async dispatch => {
    dispatch({ type, message })
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch({ type, message: '' })
    }, seconds * 1000)
  }
}
const reducer = (state = { notification: '', error: '' }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION_MESSAGE':
      return { ...state, notification: action.message }
    case 'SET_ERROR_MESSAGE':
      return { ...state, error: action.message }
    default:
      return state
  }
}

export default reducer
