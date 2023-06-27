import { useQuery, useQueryClient } from 'react-query'
import { userService } from '../services'

const UsersPage = () => {
  const queryClient = useQueryClient()

  const { data, error, isLoading } = useQuery('users', userService.getAll, { refetchOnWindowFocus: false })

  if (isLoading) return <h4>Loading users...</h4>

  if(error) return <h4>Error loading users: {error.message}</h4>

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
          {data.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
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