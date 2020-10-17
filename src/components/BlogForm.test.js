import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('renders content properly by default', () => {
  const mockHandleCreateBlog = jest.fn()

  const component = render(
    <BlogForm handleCreateBlog={mockHandleCreateBlog} />
  )

  const newBlog = {
    title: 'Old Man and the sea',
    author: 'Hemingway',
    url: 'http://example.com'
  }

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  fireEvent.change(titleInput, { target: { value: newBlog.title } })
  fireEvent.change(authorInput, { target: { value: newBlog.author } })
  fireEvent.change(urlInput, { target: { value: newBlog.url } })

  const blogForm = component.container.querySelector('#blogForm')
  fireEvent.submit(blogForm)

  expect(mockHandleCreateBlog.mock.calls).toHaveLength(1)
  expect(mockHandleCreateBlog.mock.calls[0][0].title).toBe(newBlog.title)
  expect(mockHandleCreateBlog.mock.calls[0][0].author).toBe(newBlog.author)
  expect(mockHandleCreateBlog.mock.calls[0][0].url).toBe(newBlog.url)
})
