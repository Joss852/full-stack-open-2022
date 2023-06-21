import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, loggedUser }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const buttonLabel = visible ? 'hide' : 'view'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const buttonStyle = {
    color: 'white',
    background: 'red',
    fontSize: 15,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleClick = () => {
    setLikes(likes + 1)
    handleLike(blog, likes + 1)
  }

  const handleRemove = ({ id, author, title }) => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      handleDelete(id)
    }
  }

  return (
    <div style={blogStyle} data-testid='blog' className='blog'>
      <div>
        <span>
          {blog.title} - {blog.author}
        </span>
        <button id='viewBtn' onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      {visible && (
        <div data-testid='blog-details' id='blog-details'>
          <div>{blog.url}</div>
          <div>
            <span>likes {blog.likes}</span>
            <button id='likeBtn' onClick={handleClick}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {loggedUser.username === blog.user.username && (
            <button
              id='removeBtn'
              onClick={() => handleRemove(blog)}
              style={buttonStyle}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
