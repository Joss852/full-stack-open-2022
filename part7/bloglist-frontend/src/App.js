import { useEffect, useRef } from 'react'
import Alert from './components/Alert'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, like, remove } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const alert = useSelector(state => state.notification)

  const blogFormRef = useRef()

  const handleLogin = async (credentials) => {
    try {
      dispatch(login(credentials))
      dispatch(setNotificationWithTimeout('Welcome again', 'success', 2))
    } catch (error) {
      dispatch(setNotificationWithTimeout('Wrong username or password', 'error', 2))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleCreate = async (formContent) => {
    try {
      dispatch(createBlog(formContent))
      blogFormRef.current.toggleVisibility()
      dispatch(setNotificationWithTimeout(`A new blog ${formContent.title} by ${formContent.author} added`, 'success', 2))
    } catch (error) {
      dispatch(setNotificationWithTimeout('Error adding new blog, try again later', 'error', 2))
    }
  }

  const handleLike = async blog => {
    try {
      dispatch(like(blog))
      dispatch(setNotificationWithTimeout(`You liked ${blog.title} by ${blog.author}`, 'success', 2))
    } catch (error) {
      dispatch(setNotificationWithTimeout('Error updating blog, try again later', 'error', 2))
    }
  }

  const handleDelete = async id => {
    try {
      dispatch(remove(id))
      dispatch(setNotificationWithTimeout('Blog deleted successfully', 'success', 2))
    } catch (error) {
      dispatch(setNotificationWithTimeout('Error deleting blog, try again later', 'error', 2))
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
