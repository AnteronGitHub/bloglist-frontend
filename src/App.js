import React, { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

  const displayError = message => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const displayNotification = message => {
    setMessage(message)
    setTimeout(() => setMessage(null), 5000)
  }

  const handleBlogLike = blog => async () => {
    try {
      await blogService.updateBlog({ ...blog, likes: blog.likes + 1 })
      setBlogs(blogs.map(b => b.id === blog.id ? { ...b, likes: b.likes + 1 }: b))
    } catch (exception) {
      if (exception.response.status === 401) {
        displayError('Need to be logged in in order to like')
      } else {
        displayError(exception.response.data.error)
      }
    }
  }

  const handleBlogDelete = blog => async () => {
    if (!window.confirm(`Removing ${blog.title} by ${blog.author}`)) {
      return
    }
    try {
      await blogService.deleteBlog(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      displayNotification(`Removed ${blog.title} by ${blog.author}`)
    } catch (exception) {
      if (exception.response.status === 401) {
        displayError('You are not authorized to remove this blog')
      } else {
        displayError(exception.response.data.error)
      }
    }
  }

  const handleLogin = async user => {
    try {
      const auth = await loginService.login(user)
      setUser(auth)
      blogService.setToken(auth.token)
      window.localStorage.setItem('user', JSON.stringify(auth))
      displayNotification(`${auth.username} logged in`)
    } catch (exception) {
      displayError(exception.response.data.error)
    }
  }

  const handleLogout = e => {
    e.preventDefault()
    const loggedOutUser = user
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('user')
    displayNotification(`${loggedOutUser.username} logged out`)
  }

  const handleCreateBlog = async blog => {
    try {
      const newBlog = await blogService.createNew(blog)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.handleToggle()
      displayNotification(`new blog ${newBlog.title} by ${newBlog.author}`)
    } catch (exception) {
      displayError(exception.response.data.error)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <ErrorNotification message={errorMessage} />
      <Notification message={message} />
      <LoginForm
        user={user}
        displayError={displayError}
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
