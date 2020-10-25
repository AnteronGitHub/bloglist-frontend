import React from 'react'
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogsReducer'

const BlogPage = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const auth = useSelector(state => state.auth)

  if (!blog) {
    return null
  }

  const handleLike = () => dispatch(likeBlog(blog))

  const handleDelete = () => {
    if (window.confirm(`Removing ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      history.push('/')
    }
  }

  const submitComment = event => {
    event.preventDefault()
    const comment = event.target.comment.value
    if (comment !== '') {
      dispatch(commentBlog(blog, comment))
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <Container fluid>
        <Row>
          <Col><a href={blog.url}>{blog.url}</a></Col>
        </Row>
        <Row>
          <Col>{blog.likes} likes</Col>
          <Col><Button onClick={handleLike}>like</Button></Col>
        </Row>
        <Row>
          <Col>added by {blog.user.name}</Col>
          {blog.user.username === auth.username &&
            <Col>
              <Button variant='danger' onClick={handleDelete}>remove</Button>
            </Col>
          }
        </Row>
      </Container>
      <h3>comments</h3>
      <Form inline onSubmit={submitComment}>
        <Form.Group>
          <Form.Control type='text' name='comment' />
          <Button variant='primary' type="submit">add comment</Button>
        </Form.Group>
      </Form>
      <ListGroup>
        {blog.comments.map((content, i) =>
          <ListGroup.Item key={i}>{content}</ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}

BlogPage.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    comments: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      username: PropTypes.string
    })
  })
}

export default BlogPage
