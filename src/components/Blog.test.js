import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content properly by default', () => {
  const blog = {
    title: 'Moby Dick',
    author: 'Hemingway',
    url: 'http://example.com',
    likes: 1,
    user: {
      id: '1',
      name: 'test',
      username: 'test'
    }
  }

  const component = render(
    <Blog blog={blog} handleDelete={() => {}} handleLike={() => {}}/>
  )

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(blog.likes)
})
