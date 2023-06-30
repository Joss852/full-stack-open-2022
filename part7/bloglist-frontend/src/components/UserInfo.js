import { Box, Typography } from '@mui/material'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import Blog from './Blog'

const UserInfo = () => {
  const queryClient = useQueryClient()
  const { id } = useParams()
  const users = queryClient.getQueryData('users')
  const user = users.find(u => u.id === id)

  if (!user) return null

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant='h4' component='h2'>User: {user.name}</Typography>

      <Box sx={{ padding: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {user.blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </Box>
    </Box>
  )
}

export default UserInfo