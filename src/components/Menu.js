import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../reducers/authReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const handleLogout = event => {
    event.preventDefault()
    dispatch(logout())
  }

  const menuStyle = {
    backgroundColor: 'gainsboro',
    padding: '4px'
  }

  const linkStyle = {
    margin: '4px'
  }

  return (
    <div style={menuStyle}>
      <Link style={linkStyle} to='/'>blogs</Link>
      <Link style={linkStyle} to='/users'>users</Link>
      {auth
      ? (
        <>
          {auth.name} logged in {' '}
          <button onClick={handleLogout}>Logout</button>
        </>
        )
        : <Link style={linkStyle} to='/login'>login</Link>}
    </div>
  )
}

export default Menu
