import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogsReducer'

const BlogPage = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [comment, setComment] = useState('')

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

  const handleComment = event => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment))
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
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={comment}
          name="Comment"
          onChange={event => setComment(event.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((content, i) => <li key={i}>{content}</li>)}
      </ul>
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
