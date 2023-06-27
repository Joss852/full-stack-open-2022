import { useQuery } from 'react-query'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { userService } from '../services'

const UsersPage = () => {
  const userQuery = useQuery('users', userService.getAll, { refetchOnWindowFocus: false })

  if (userQuery.isLoading) return <h4>Loading users...</h4>

  if(userQuery.error) return <h4>Error loading users: {userQuery.error.message}</h4>

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th><b>blogs created</b></th>
          </tr>
        </thead>
        <tbody>
          {userQuery.data.map(user => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage