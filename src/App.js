import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { initBlogs } from './reducers/blogsReducer'
import { initAuth } from './reducers/authReducer'
import { initUsers } from './reducers/usersReducer'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogPage from './components/BlogPage'
import ErrorNotification from './components/ErrorNotification'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserPage from './components/UserPage'
import UsersPage from './components/UsersPage'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const auth = useSelector(state => state.auth)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initAuth())
    dispatch(initUsers())
  }, [dispatch])

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch ? users.find(u => u.id === userMatch.params.id) : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null

  return (
    <div>
      <Menu />
      <h2>blog app</h2>
      <ErrorNotification />
      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <UserPage user={user} />
        </Route>
        <Route path='/users'>
          <UsersPage />
        </Route>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route path='/blogs/:id'>
          <BlogPage blog={blog} />
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
