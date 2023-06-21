import { useState, useEffect, useRef } from 'react'
import Alert from './components/Alert'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState({ message: null, type: null })

  const blogFormRef = useRef()

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setAlert({ message: `Welcome ${user.name}`, type: 'success' })
      setTimeout(() => {
        setAlert({ message: null, type: null })
      }, 2000)
    } catch (error) {
      setAlert({
        message: 'Wrong username or password',
        type: 'error',
      })
      setTimeout(() => {
        setAlert({ message: null, type: null })
      }, 2000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const handleCreate = async (formContent) => {
    try {
      const newBlog = await blogService.create(formContent)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      setAlert({
        message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        type: 'success',
      })
      setTimeout(() => {
        setAlert({ message: null, type: null })
      }, 2000)
    } catch (error) {
      setAlert({
        message: 'Error adding new blog, try again later',
        type: 'error',
      })
      setTimeout(() => {
        setAlert({ message: null, type: null })
      }, 2000)
    }
  }

  const handleLike = async (blog, likes) => {
    try {
      const updatedBlog = await blogService.update(blog.id, { likes })
      setBlogs(
        blogs
          .map((b) =>
            b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b,
          )
          .sort((a, b) => b.likes - a.likes),
      )
    } catch (error) {
      setAlert({
        message: 'Error updating blog, try again later',
        type: 'error',
      })
      setTimeout(() => {
        setAlert({ message: null, type: null })
      }, 2000)
    }
  }

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      setAlert({
        message: 'Blog deleted successfully',
        type: 'success',
      })
      setTimeout(() => {
        setAlert({ message: null, type: null })
      }, 2000)
    } catch (error) {
      setAlert({
        message: 'Error updating blog, try again later',
        type: 'error',
      })
      setTimeout(() => {
        setAlert({ message: null, type: null })
      }, 2000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [user])

  return (
    <div>
      {user === null && (
        <div>
          <h2>Log in to application</h2>
          <Alert alert={alert} />
          <LoginForm handleLogin={handleLogin} />
        </div>
      )}
      {user !== null && (
        <div>
          <h2>blogs</h2>
          <Alert alert={alert} />
          <p>
            {user.name} logged in{' '}
            <button onClick={handleLogout} id="logoutBtn">
              logout
            </button>
          </p>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm onSubmit={handleCreate} />
          </Togglable>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              loggedUser={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
