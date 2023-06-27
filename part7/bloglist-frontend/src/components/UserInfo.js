import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

const UserInfo = () => {
  const queryClient = useQueryClient()
  const { id } = useParams()
  const users = queryClient.getQueryData('users')
  const oldBlogs = queryClient.getQueryData('blogs')

  console.log({ users, oldBlogs })

  const user = users.find(u => u.id === id)

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default UserInfo