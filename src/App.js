import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { initBlogs } from './reducers/blogsReducer'
import { initAuth } from './reducers/authReducer'
import { initUsers } from './reducers/usersReducer'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersPage from './components/UsersPage'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initAuth())
    dispatch(initUsers())
  }, [dispatch])

  return (
    <div>
      <h2>blogs</h2>
      <ErrorNotification />
      <Notification />
      <LoginForm />
      <Switch>
        <Route path='/users'>
          <UsersPage />
        </Route>
        <Route path='/'>
          {auth && <BlogForm />}
          <div>
            {blogs.slice().sort((b1, b2) => b2.likes - b1.likes).map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default App
