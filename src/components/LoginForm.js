import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { login } from '../reducers/authReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = event => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    if (username !== '' && password !== '') {
      dispatch(login({ username, password }, history))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type='text' name='username' />
          <Form.Label>password:</Form.Label>
          <Form.Control type='password' name='password' />
          <Button variant='primary' type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
