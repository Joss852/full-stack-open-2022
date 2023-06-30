import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { blogService } from '../services'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Blog from './Blog'
import { removeNotification, setNotification, useNotificationDispatch } from '../context/NotificationContext'
import { Box, Typography } from '@mui/material'

const HomePage = () => {
  const blogFormRef = useRef()
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const result = useQuery('blogs', blogService.getAll, { refetchOnWindowFocus: false })
  const blogs = result.data

  const createBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const oldBlogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', oldBlogs.concat(newBlog))
    }
  })

  const setNotificationWithTimeout = (message, type, timeout) => {
    notificationDispatch(setNotification(message, type))
    setTimeout(() => notificationDispatch(removeNotification()), timeout * 1000)
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

  if (result.isLoading) return <Typography variant='h6' component='span'>Loading blogs...</Typography>

  if (result.isError) return <Typography variant='h6' component='span'>Error loading blogs</Typography>

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h4' component='h2'>Blogs</Typography>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm onSubmit={handleCreate} />
        </Togglable>
      </Box>

      <Box sx={{ padding: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </Box>

    </Box>
  )
}

export default HomePage