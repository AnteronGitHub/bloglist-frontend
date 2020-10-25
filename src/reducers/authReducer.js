import blogService from '../services/blogs'
import loginService from '../services/login'

import { setNotificationMessage } from './notificationReducer'

export const initAuth = () => {
  return async dispatch => {
    const auth = JSON.parse(window.localStorage.getItem('auth'))
    if (auth) {
      dispatch({ type: 'SET_AUTH', auth })
      blogService.setToken(auth.token)
    }
  }
}

export const login = (credentials, history) => {
  return async dispatch => {
    try {
      const auth = await loginService.login(credentials)
      dispatch({ type: 'SET_AUTH', auth })
      blogService.setToken(auth.token)
      window.localStorage.setItem('auth', JSON.stringify(auth))
      dispatch(setNotificationMessage(`${auth.username} logged in`))
      history.push('/')
    } catch (error) {
      dispatch(setNotificationMessage(error.response.data.error, 'error'))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({ type: 'SET_AUTH', auth: null })
    blogService.setToken(null)
    window.localStorage.removeItem('auth')
    dispatch(setNotificationMessage('Logged out'))
  }
}

const authReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return action.auth
    default:
      return state
  }
}

export default authReducer
