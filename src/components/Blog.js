import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailed, setDetailed] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetailed = e => {
    setDetailed(!detailed)
  }

  return (
    <div style={blogStyle}>
      {detailed
      ? (
        <>
        <div>
          {blog.title}{' '}
          <button onClick={toggleDetailed}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes: {blog.likes}
        </div>
        <div>
          {blog.user.name}
        </div>
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

export default Blog
