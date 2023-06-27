import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { blogService } from '../services'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Blog from './Blog'
import { removeNotification, setNotification, useNotificationDispatch } from '../context/NotificationContext'

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

  if (result.isLoading) return <div>Loading blogs...</div>

  return (
    <div>
      <h2>blog app</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm onSubmit={handleCreate} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default HomePage