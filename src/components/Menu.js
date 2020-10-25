import React from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
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

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <Link to='/'>blogs</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link to='/users'>users</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            {auth
            ? (
              <>
                {auth.name} logged in {' '}
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : <Link to='/login'>login</Link>}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
