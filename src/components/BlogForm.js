import React, { useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { createBlog } from '../reducers/blogsReducer'
import { setNotificationMessage } from '../reducers/notificationReducer'

import Toggable from './Toggable'

const BlogForm = () => {
  const dispatch = useDispatch()

  const togglableRef = useRef()

  const handleSubmit = event => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    if (title !== '' && author !== '' && url !== '') {
      dispatch(createBlog({ title, author, url }))
      togglableRef.current.handleToggle()
    } else {
      dispatch(setNotificationMessage('fill in all the fields', 'error'))
    }
  }

  return (
    <Toggable buttonLabel="create" ref={togglableRef}>
      <h2>create new</h2>
      <Form id="blogForm" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control type='text' name='title' />
          <Form.Label>author:</Form.Label>
          <Form.Control type='text' name='author' />
          <Form.Label>url:</Form.Label>
          <Form.Control type='text' name='url' />
          <Button variant='primary' type="submit">create</Button>
        </Form.Group>
      </Form>
    </Toggable>
  )
}

export default BlogForm
