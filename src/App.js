import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import blogService from './services/blogs'
import loginService from './services/login'

import { setNotificationMessage } from './reducers/notificationReducer'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    const userData = JSON.parse(window.localStorage.getItem('user'))
    if (!userData) {
      return
    }
    setUser(userData)
    blogService.setToken(userData.token)
  }, [])

  const handleBlogLike = blog => async () => {
    try {
      await blogService.updateBlog({ ...blog, likes: blog.likes + 1 })
      setBlogs(blogs.map(b => b.id === blog.id ? { ...b, likes: b.likes + 1 }: b))
    } catch (exception) {
      dispatch(setNotificationMessage(
        exception.response.status === 401
          ? 'Need to be logged in in order to like'
          : exception.response.data.error,
        'error'
      ))
    }
  }

  const handleBlogDelete = blog => async () => {
    if (!window.confirm(`Removing ${blog.title} by ${blog.author}`)) {
      return
    }
    try {
      await blogService.deleteBlog(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      dispatch(setNotificationMessage(`Removed ${blog.title} by ${blog.author}`))
    } catch (exception) {
        dispatch(setNotificationMessage(
          exception.response.status === 401
            ? 'You are not authorized to remove this blog'
            : exception.response.data.error,
          'error'
        ))
    }
  }

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

  const handleCreateBlog = async blog => {
    try {
      const newBlog = await blogService.createNew(blog)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.handleToggle()
      dispatch(setNotificationMessage(`new blog ${newBlog.title} by ${newBlog.author}`))
    } catch (exception) {
      dispatch(setNotificationMessage(exception.response.data.error, 'error'))
    }
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
      {user && (
        <Toggable buttonLabel="create" ref={blogFormRef}>
          <BlogForm handleCreateBlog={handleCreateBlog} />
        </Toggable>
      )}
      <div>
        {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleDelete={handleBlogDelete(blog)}
            handleLike={handleBlogLike(blog)}
          />
        )}
      </div>
    </div>
  )
}

export default App
