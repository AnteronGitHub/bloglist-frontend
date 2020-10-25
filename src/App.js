import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initBlogs } from './reducers/blogsReducer'
import { initAuth } from './reducers/authReducer'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initAuth())
  }, [dispatch])

  return (
    <div>
      <h2>blogs</h2>
      <ErrorNotification />
      <Notification />
      <LoginForm />
      {auth && <BlogForm />}
      <div>
        {blogs.slice().sort((b1, b2) => b2.likes - b1.likes).map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
