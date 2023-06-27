import { useEffect, useRef } from 'react'
import Alert from './components/Alert'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import UsersPage from './components/UsersPage'
import BlogPage from './components/BlogPage'
import UserInfo from './components/UserInfo'
import { blogService, userService, setToken } from './services'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { useUser, useUserDispatch, setUser, removeUser } from './context/UserContext'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { removeNotification, setNotification, useNotification, useNotificationDispatch } from './context/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const createBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const oldBlogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', oldBlogs.concat(newBlog))
    }
  })

  const userDispatch =  useUserDispatch()
  const notificationDispatch = useNotificationDispatch()

  const setNotificationWithTimeout = (message, type, timeout) => {
    notificationDispatch(setNotification(message, type))
    setTimeout(() => notificationDispatch(removeNotification()), timeout * 1000)
  }

  const result = useQuery('blogs', blogService.getAll, { refetchOnWindowFocus: false })
  const blogs = result.data

  const user = useUser()
  const alert = useNotification()

  const blogFormRef = useRef()

  const handleLogin = async credentials => {
    try {
      const loggedUser = await userService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
      setToken(loggedUser.token)
      userDispatch(setUser(loggedUser))
      setNotificationWithTimeout(`Welcome back ${loggedUser.name}`, 'success', 2)
    } catch (error) {
      setNotificationWithTimeout('Wrong username or password', 'error', 2)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch(removeUser())
  }

  const handleCreate = formContent => {
    try {
      createBlogMutation.mutate(formContent)
      blogFormRef.current.toggleVisibility()
      setNotificationWithTimeout(`A new blog ${formContent.title} by ${formContent.author} added`, 'success', 2)
    } catch (error) {
      setNotificationWithTimeout('Error adding new blog, try again later', 'error', 2)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
      userDispatch(setUser(user))
    }
  }, [])

  useEffect(() => {
    queryClient.invalidateQueries('blogs')
  }, [user])

  if (result.isLoading) return <div>Loading...</div>

  return (
    <Router>
      {user !== null && (
        <div>
          <h2>blogs</h2>
          <Alert alert={alert} />
          <p>{user.name} logged in</p>
          <button onClick={handleLogout} id="logoutBtn">logout</button>
        </div>
      )}
      <Routes>
        <Route path="/blogs/:id" element={<BlogPage loggedUser={user}/>} />
        <Route path="/users/:id" element={<UserInfo />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/" element={(
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
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlogForm onSubmit={handleCreate} />
                </Togglable>

                {blogs.map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                  />
                ))}
              </div>
            )}
          </div>
        )} />
      </Routes>

    </Router>
  )
}

export default App
