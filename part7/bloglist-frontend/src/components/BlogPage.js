import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { blogService, commentService } from '../services'
import { useNotificationDispatch, setNotification, removeNotification } from '../context/NotificationContext'
import CommentsForm from './CommentsForm'

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

  const buttonStyle = {
    color: 'white',
    background: 'red',
    fontSize: 15,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <Link to={blog.url}>{blog.url}</Link>
      <div>{blog.likes} likes <button onClick={() => handleLike(blog)}>like</button></div>
      <div>added by {blog.author}</div>
      {loggedUser.username === blog.user.username && (
        <button
          id="removeBtn"
          onClick={() => handleDelete(blog.id)}
          style={buttonStyle}
        >
          remove
        </button>
      )}
      <h3>comments</h3>
      <CommentsForm blogId={blog.id}/>
      {query.isFetching && <div>Loading comments...</div>}
      {query.error && <div>Error trying to load comments. {query.error.message}</div>}
      <ul>
        {comments.map(c => <li key={c.id}>{c.content}</li>)}
      </ul>
    </div>
  )
}

export default BlogPage