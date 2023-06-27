import React from 'react'
import { removeUser, useUser, useUserDispatch } from '../context/UserContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const user = useUser()
  const userDispatch = useUserDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch(removeUser())
  }

  const navbarStyle = {
    backgroundColor: 'lightgrey',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={navbarStyle}>
      <Link to="/" style={{ marginRight: 5 }}>blogs</Link>
      <Link to="/users" style={{ marginRight: 5 }}>users</Link>
      <span>
        {user.name} logged in <button onClick={handleLogout} id="logoutBtn">logout</button>
      </span>
    </div>
  )
}

export default Navbar