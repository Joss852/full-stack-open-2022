import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { blogService, commentService } from '../services'
import { useNotificationDispatch, setNotification, removeNotification } from '../context/NotificationContext'
import { Box, Card, CardActions, CardContent, Button, Typography, Link, Paper } from '@mui/material'
import CommentsForm from './CommentsForm'
import LikeIcon from '@mui/icons-material/ThumbUpOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'

const BlogPage = ({ loggedUser }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()

  const blogs = queryClient.getQueryData('blogs')
  const blog = blogs.find(b => b.id === id)

  if (!blog) return null

  const query = useQuery('comments', () => commentService.getComments(id), {
    refetchOnWindowFocus: false
  })
  const comments = query.data || []

  const notificationDispatch = useNotificationDispatch()

  const setNotificationWithTimeout = (message, type, timeout) => {
    notificationDispatch(setNotification(message, type))
    setTimeout(() => notificationDispatch(removeNotification()), timeout * 1000)
  }

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (newBlog) => {
      const oldBlogs = queryClient.getQueryData('blogs')
      const newBlogs = oldBlogs.map((b) =>
        b.id === newBlog.id ? { ...b, likes: newBlog.likes } : b,
      )
        .sort((a, b) => b.likes - a.likes)

      queryClient.setQueryData('blogs', newBlogs)
    },
  })

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const handleLike = blog => {
    try {
      updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
      setNotificationWithTimeout(`You liked ${blog.title} by ${blog.author}`, 'success', 2)
    } catch (error) {
      setNotificationWithTimeout('Error updating blog, try again later', 'error', 2)
    }
  }

  const handleDelete = id => {
    try {
      const remove = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
      if (!remove) return
      removeBlogMutation.mutate(id)
      setNotificationWithTimeout('Blog deleted successfully', 'success', 2)
      navigate('/')
    } catch (error) {
      setNotificationWithTimeout('Error deleting blog, try again later', 'error', 2)
    }
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {blog.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {blog.author}
          </Typography>
          <Typography variant="body2" component={Link} href={blog.url} underline="hover">
            Read blog
          </Typography>
          <Typography variant="body2" component="div">
            {blog.likes} likes
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            onClick={() => handleLike(blog)}
            startIcon={<LikeIcon />}
          >
            Like
          </Button>
          {loggedUser.username === blog.user.username && (
            <Button
              id="removeBtn"
              onClick={() => handleDelete(blog.id)}
              size='small'
              variant='contained'
              color='error'
              startIcon={<DeleteIcon />}
            >
              Remove
            </Button>
          )}
        </CardActions>
      </Card>

      <Typography variant="h5" component="div" sx={{ mt: 2 }}>
        Comments
      </Typography>
      <CommentsForm blogId={blog.id}/>
      {query.isFetching && (
        <Typography variant="subtitle2" component="div">
          Loading comments...
        </Typography>
      )}

      {query.error && (
        <Typography variant="subtitle2" component="div">
          Error loading comments
        </Typography>
      )}

      {!query.isFetching && comments.length === 0 && (
        <Typography variant="subtitle2" component="div">
          No comments yet
        </Typography>
      )}

      {!query.isFetching && comments.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {comments.map(c => (
            <Paper
              key={c.id}
              elevation={0}
              sx={{ padding: 2, mb: 1, backgroundColor: '#f0f2f5', borderRadius: 4 }}
            >
              {c.content}
            </Paper>
          ))}
        </Box>
      )}

    </Box>
  )
}

export default BlogPage