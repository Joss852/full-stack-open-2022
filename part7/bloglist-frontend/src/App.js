import { useEffect } from 'react'
import UsersPage from './components/UsersPage'
import BlogPage from './components/BlogPage'
import UserInfo from './components/UserInfo'
import LoginPage from './components/LoginPage'
import Navbar from './components/Navbar'
import Alert from './components/Alert'
import { useUser, useUserDispatch, setUser } from './context/UserContext'
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from 'react-router-dom'
import HomePage from './components/HomePage'
import { setToken } from './services'
import { useNotification } from './context/NotificationContext'

const App = () => {
  const userDispatch =  useUserDispatch()
  const alert = useNotification()
  const user = useUser()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
      userDispatch(setUser(user))
    }
  }, [])

  return (
    <Router>
      {user !== null && <Navbar />}
      <Alert alert={alert} />
      <h1>Blog app</h1>
      <Routes>
        <Route path="/blogs/:id" element={<BlogPage loggedUser={user}/>} />
        <Route path="/users/:id" element={<UserInfo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/" element={user ? <HomePage /> : <Navigate replace to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
