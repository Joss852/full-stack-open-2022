import { useState, useEffect, useRef } from 'react'
import Alert from './components/Alert'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSelector, useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blog)
  const [user, setUser] = useState(null)
  const alert = useSelector(state => state.notification)

  const blogFormRef = useRef()

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      dispatch(setNotificationWithTimeout(`Welcome ${user.name}`, 'success', 2))
    } catch (error) {
      dispatch(setNotificationWithTimeout('Wrong username or password', 'error', 2))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
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

  const handleLike = async (blog, likes) => {
    try {
      console.log({ blog, likes })
      // const updatedBlog = await blogService.update(blog.id, { likes })
      // setBlogs(
      //   blogs
      //     .map((b) =>
      //       b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b,
      //     )
      //     .sort((a, b) => b.likes - a.likes),
      // )
    } catch (error) {
      dispatch(setNotificationWithTimeout('Error updating blog, try again later', 'error', 2))
    }
  }

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id)
      // setBlogs(blogs.filter((blog) => blog.id !== id))
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
      setUser(user)
    }
  }, [])

  useEffect(() => {
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
