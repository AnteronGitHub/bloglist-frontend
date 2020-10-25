import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blog" style={blogStyle}>
      <Link to={`blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
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
