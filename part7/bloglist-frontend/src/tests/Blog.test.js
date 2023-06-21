import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

describe('Blog', () => {
  test('should render blog title and author', () => {
    const blog = {
      title: 'Test title',
      author: 'Test author',
    }

    render(<Blog blog={blog} />)

    const element = screen.getByTestId('blog')
    expect(element).toBeDefined()
  })

  test('render URL and likes when view button is clicked', async () => {
    const blog = {
      title: 'Test title',
      author: 'Test author',
      url: 'http://test.com',
      likes: 10,
      user: {
        name: 'Test user',
        username: 'testuser',
      },
    }

    const loggedUser = {
      name: 'Test user',
      username: 'testuser',
    }

    render(<Blog blog={blog} loggedUser={loggedUser} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const details = screen.getByTestId('blog-details')
    expect(details).toBeDefined()
  })

  test('like button is clicked twice', async () => {
    const blog = {
      title: 'Test title',
      author: 'Test author',
      url: 'http://test.com',
      likes: 10,
      user: {
        name: 'Test user',
        username: 'testuser',
      },
    }

    const loggedUser = {
      name: 'Test user',
      username: 'testuser',
    }

    const mockHandler = jest.fn()

    render(
      <Blog blog={blog} loggedUser={loggedUser} handleLike={mockHandler} />,
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
