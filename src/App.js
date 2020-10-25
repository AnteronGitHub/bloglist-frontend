import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'
import loginService from './services/login'

import { setNotificationMessage } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogsReducer'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initBlogs())
    const userData = JSON.parse(window.localStorage.getItem('user'))
    if (!userData) {
      return
    }
    setUser(userData)
    blogService.setToken(userData.token)
  }, [dispatch])

  const handleLogin = async user => {
    try {
      const auth = await loginService.login(user)
      setUser(auth)
      blogService.setToken(auth.token)
      window.localStorage.setItem('user', JSON.stringify(auth))
      dispatch(setNotificationMessage(`${auth.username} logged in`))
    } catch (exception) {
      dispatch(setNotificationMessage(exception.response.data.error, 'error'))
    }
  }

  const handleLogout = e => {
    e.preventDefault()
    const loggedOutUser = user
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('user')
    dispatch(setNotificationMessage(`${loggedOutUser.username} logged out`))
  }

  return (
    <div>
      <h2>blogs</h2>
      <ErrorNotification />
      <Notification />
      <LoginForm
        user={user}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
      {user && <BlogForm />}
      <div>
        {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
