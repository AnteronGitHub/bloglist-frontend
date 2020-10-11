import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUsername('')
      setPassword('')
      handleLogin(user)
    } catch (exception) {
      console.error(exception)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('user')))
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = user => {
    setUser(user)
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  const handleLogout = e => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('user')
  }

  if (!user) {
    return <LoginForm handleLogin={handleLogin} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.username} logged in{' '}
        <button onClick={handleLogout}>logout</button>
      </div><br />
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
