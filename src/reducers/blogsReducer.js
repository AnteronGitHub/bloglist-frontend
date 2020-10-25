import blogService from '../services/blogs'

import { setNotificationMessage } from './notificationReducer'

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'SET_BLOGS', blogs })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.createNew(blog)
      dispatch({ type: 'ADD_BLOG', blog: createdBlog})
      dispatch(setNotificationMessage(
        `new blog ${createdBlog.title} by ${createdBlog.author}`
      ))
    } catch (exception) {
      dispatch(setNotificationMessage(exception.response.data.error, 'error'))
    }
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.updateBlog({
        ...blog,
        likes: blog.likes + 1
      })
      dispatch({ type: 'UPDATE_BLOG', blog: updatedBlog })
    } catch (error) {
      dispatch(setNotificationMessage(
        error.response.status === 401
          ? 'Need to be logged in in order to like'
          : error.response.data.error,
        'error'
      ))
    }
  }
}

export const commentBlog = (blog, content) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.commentBlog(blog, content)
      dispatch({ type: 'UPDATE_BLOG', blog: updatedBlog })
    } catch (error) {
      dispatch(setNotificationMessage(error.response.data.error, 'error'))
    }
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(blog)
      dispatch({ type: 'DELETE_BLOG', blog })
      dispatch(setNotificationMessage(`Removed ${blog.title} by ${blog.author}`))
    } catch (error) {
      dispatch(setNotificationMessage(
        error.response.status === 401
          ? 'You are not authorized to remove this blog'
          : error.response.data.error,
        'error'
      ))
    }
  }
}

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.blogs
    case 'ADD_BLOG':
      return state.concat(action.blog)
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id === action.blog.id
        ? action.blog
        : blog)
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.blog.id)
    default:
      return state
  }
}

export default blogsReducer
