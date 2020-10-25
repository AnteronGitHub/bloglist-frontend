import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { login, logout } from '../reducers/authReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
  }

  const handleLogout = e => {
    e.preventDefault()
    dispatch(logout())
  }

  if (auth) {
    return (
      <div>
        {auth.username} logged in{' '}
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

export default LoginForm
