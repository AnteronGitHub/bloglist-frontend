import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import Toggable from './components/Toggable'

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const displayError = message => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    let user
    try {
      user = await loginService.login({ username, password })
      setUsername('')
      setPassword('')
      handleLogin(user)
    } catch (exception) {
      displayError('invalid credentials')
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <ErrorNotification message={errorMessage} />
      <form onSubmit={handleSubmit}>
        <div>
          username:{' '}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{' '}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    const blog = await blogService.createNew({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
    handleCreateBlog(blog)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:{' '}
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('user'))
    if (!userData) {
      return
    }
    setUser(userData)
    blogService.setToken(userData.token)
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const displayNotification = message => {
    setMessage(message)
    setTimeout(() => setMessage(null), 5000)
  }

  const handleLogin = user => {
    setUser(user)
    blogService.setToken(user.token)
    window.localStorage.setItem('user', JSON.stringify(user))
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  const handleLogout = e => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('user')
  }

  const handleCreateBlog = blog => {
    blogFormRef.current.handleToggle()
    setBlogs(blogs.concat(blog))
    displayNotification(`new blog ${blog.title} by ${blog.author}`)
  }

  if (!user) {
    return <LoginForm handleLogin={handleLogin} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div>
        {user.username} logged in{' '}
        <button onClick={handleLogout}>logout</button>
      </div><br />
      <Toggable buttonLabel="create" ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Toggable>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
