import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button, TextField, Box } from '@mui/material'

const BlogForm = ({ onSubmit }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(blog)
    setBlog({ title: '', author: '', url: '' })
  }

  const handleChange = (target) => {
    setBlog({ ...blog, [target.name]: target.value })
  }

  return (
    <Box data-testid="create-form">
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            id="title"
            type="text"
            name="title"
            value={blog.title}
            onChange={({ target }) => handleChange(target)}
            label="Title"
            variant='standard'
          />
          <TextField
            id="author"
            type="text"
            name="author"
            value={blog.author}
            onChange={({ target }) => handleChange(target)}
            label="Author"
            variant='standard'
          />
          <TextField
            id="url"
            type="text"
            name="url"
            value={blog.url}
            onChange={({ target }) => handleChange(target)}
            label="URL"
            variant='standard'
          />

          <Button id="createBtn" type="submit" variant='contained'>
            save
          </Button>
        </Box>
      </form>
    </Box>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default BlogForm
