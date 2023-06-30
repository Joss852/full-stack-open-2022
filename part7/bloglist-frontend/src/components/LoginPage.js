import { useNavigate } from 'react-router-dom'
import { removeNotification, setNotification, useNotificationDispatch } from '../context/NotificationContext'
import { setUser, useUserDispatch } from '../context/UserContext'
import { setToken, userService } from '../services'
import LoginForm from './LoginForm'
import { Box, Paper, Typography } from '@mui/material'

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
      setNotificationWithTimeout(`Welcome back ${loggedUser.name}`, 'info', 2)
      navigate('/')
    } catch (error) {
      setNotificationWithTimeout('Wrong username or password', 'error', 2)
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2, backgroundColor: '#f0f2f5', padding: '3rem', textAlign: 'center' }}>
      <Paper sx={{ padding: '2rem', border: '1px solid #dddfe2',  }} elevation={8}>
        <Typography variant="h3" component="h1" gutterBottom>
          BlogApp
        </Typography>
        <Typography variant="h6" component="span" gutterBottom>
          Log into BlogApp
        </Typography>
        <LoginForm handleLogin={handleLogin}/>
      </Paper>
    </Box>
  )
}

export default LoginPage