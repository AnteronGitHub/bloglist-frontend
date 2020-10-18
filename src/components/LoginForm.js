import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ user, handleLogin, handleLogout }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    await handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  if (user) {
    return (
      <div>
        {user.username} logged in{' '}
        <button onClick={handleLogout}>logout</button>
      </div>
    )
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

LoginForm.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string
  }),
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default LoginForm
