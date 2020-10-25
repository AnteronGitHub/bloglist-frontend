import React from 'react'
import { ListGroup } from 'react-bootstrap'

import Blog from './Blog'

const UserPage = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {user.blogs.map(blog =>
        <ListGroup.Item key={blog.id}><Blog blog={blog} /></ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}

export default UserPage
