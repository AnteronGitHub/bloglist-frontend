import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { createBlog } from '../reducers/blogsReducer'

import Toggable from './Toggable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const togglableRef = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(createBlog({ title, author, url }))
    togglableRef.current.handleToggle()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Toggable buttonLabel="create" ref={togglableRef}>
      <h2>create new</h2>
      <form id="blogForm" onSubmit={handleSubmit}>
        <div>
          title:{' '}
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submit" type="submit">create</button>
      </form>
    </Toggable>
  )
}

export default BlogForm
