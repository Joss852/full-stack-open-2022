import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ onSubmit }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(blog)
  }

  const handleChange = target => {
    setBlog({ ...blog, [target.name]: target.value })
  }

  return (
    <div data-testid='create-form'>
      <h2>create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id='title'
            type='text'
            name='title'
            value={blog.title}
            onChange={({ target }) => handleChange(target)}
            placeholder='type title here'
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            name='author'
            value={blog.author}
            onChange={({ target }) => handleChange(target)}
            placeholder='type author here'
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            name='url'
            value={blog.url}
            onChange={({ target }) => handleChange(target)}
            placeholder='type url here'
          />
        </div>

        <button id='createBtn' type='submit'>
          save
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default BlogForm
