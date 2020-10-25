import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { deleteBlog, likeBlog } from '../reducers/blogsReducer'

const BlogPage = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()

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

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      <div>
        added by {blog.user.name}
      </div>
      <button onClick={handleDelete}>remove</button>
    </div>
  )
}

BlogPage.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      username: PropTypes.string
    })
  })
}

export default BlogPage
