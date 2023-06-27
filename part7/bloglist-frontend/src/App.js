import { useEffect, useRef } from 'react'
import Alert from './components/Alert'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, like, remove } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/userReducer'

import { useNotification, useNotificationDispatch, setNotification, removeNotification } from './context/NotificationContext'

const App = () => {
  const dispatch = useDispatch()
  const notificationDispatch = useNotificationDispatch()

  const setNotificationWithTimeout = (message, type, timeout) => {
    notificationDispatch(setNotification(message, type))
    setTimeout(() => notificationDispatch(removeNotification()), timeout * 1000)
  }

  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const alert = useNotification()

  const blogFormRef = useRef()

  const handleLogin = credentials => {
    try {
      dispatch(login(credentials))
      setNotificationWithTimeout('Logged in successfully', 'success', 2)
    } catch (error) {
      setNotificationWithTimeout('Wrong username or password', 'error', 2)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleCreate = formContent => {
    try {
      dispatch(createBlog(formContent))
      blogFormRef.current.toggleVisibility()
      setNotificationWithTimeout(`A new blog ${formContent.title} by ${formContent.author} added`, 'success', 2)
    } catch (error) {
      setNotificationWithTimeout('Error adding new blog, try again later', 'error', 2)
    }
  }

  const handleLike = blog => {
    try {
      dispatch(like(blog))
      setNotificationWithTimeout(`You liked ${blog.title} by ${blog.author}`, 'success', 2)
    } catch (error) {
      setNotificationWithTimeout('Error updating blog, try again later', 'error', 2)
    }
  }

  const handleDelete = id => {
    try {
      dispatch(remove(id))
      setNotificationWithTimeout('Blog deleted successfully', 'success', 2)
    } catch (error) {
      setNotificationWithTimeout('Error deleting blog, try again later', 'error', 2)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])

  useEffect(() => {
    if (!user) return

    dispatch(initializeBlogs())
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
