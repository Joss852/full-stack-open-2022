import { useNavigate } from 'react-router-dom'
import { removeNotification, setNotification, useNotificationDispatch } from '../context/NotificationContext'
import { setUser, useUserDispatch } from '../context/UserContext'
import { setToken, userService } from '../services'
import LoginForm from './LoginForm'

const LoginPage = () => {
  const notificationDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()
  const navigate = useNavigate()

  const setNotificationWithTimeout = (message, type, timeout) => {
    notificationDispatch(setNotification(message, type))
    setTimeout(() => notificationDispatch(removeNotification()), timeout * 1000)
  }

  const handleLogin = async credentials => {
    try {
      const loggedUser = await userService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
      setToken(loggedUser.token)
      userDispatch(setUser(loggedUser))
      setNotificationWithTimeout(`Welcome back ${loggedUser.name}`, 'success', 2)
      navigate('/')
    } catch (error) {
      setNotificationWithTimeout('Wrong username or password', 'error', 2)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <LoginForm handleLogin={handleLogin} />
    </div>
  )
}

export default LoginPage