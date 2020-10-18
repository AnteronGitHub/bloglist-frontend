import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleDelete, handleLike }) => {
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
              <button onClick={() => handleLike(blog)}>like</button>
            </div>
            <div>
              {blog.user.name}
            </div>
            <button onClick={() => handleDelete(blog)}>remove</button>
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
  }),
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired
}

export default Blog
