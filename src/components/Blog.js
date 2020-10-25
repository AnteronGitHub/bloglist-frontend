import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { deleteBlog, likeBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [detailed, setDetailed] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetailed = () => {
    setDetailed(!detailed)
  }

  const handleLike = () => dispatch(likeBlog(blog))
  const handleDelete = () => {
    if (window.confirm(`Removing ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      {detailed
        ? (
          <>
            <div>
              {blog.title} {blog.author}{' '}
              <button onClick={toggleDetailed}>hide</button>
            </div>
            <div>
              {blog.url}
            </div>
            <div>
          likes: {blog.likes}{' '}
              <button onClick={handleLike}>like</button>
            </div>
            <div>
              {blog.user.name}
            </div>
            <button onClick={handleDelete}>remove</button>
          </>
        )
        : (
          <div>
            {blog.title} {blog.author}{' '}
            <button onClick={toggleDetailed}>view</button>
          </div>
        )}
    </div>
  )
}

Blog.propTypes = {
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

export default Blog
