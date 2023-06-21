import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls the event handler with the right details when a new blog is created', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm onSubmit={createBlog} />)

  const titleInput = screen.getByPlaceholderText('type title here')
  const authorInput = screen.getByPlaceholderText('type author here')
  const urlInput = screen.getByPlaceholderText('type url here')
  const saveButton = screen.getByText('save')

  await user.type(titleInput, 'Test title')
  await user.type(authorInput, 'Test author')
  await user.type(urlInput, 'Test url')

  await user.click(saveButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
  })
})
