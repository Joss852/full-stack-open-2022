import { Button, TextField, Box } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: '16px' }}>
        <TextField
          id="username-label"
          label="Username"
          variant="outlined"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          id="password-label"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <Button id="loginBtn" type="submit" variant="contained">Login</Button>
      </Box>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
