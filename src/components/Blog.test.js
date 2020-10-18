import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

test('renders content properly when view is clicked', () => {
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

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(blog.likes)
})

test('like handler is called twice when the button is clicked twice', () => {
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

  const mockHandleLike = jest.fn()

  const component = render(
    <Blog blog={blog} handleDelete={() => {}} handleLike={mockHandleLike}/>
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandleLike.mock.calls).toHaveLength(2)
})
