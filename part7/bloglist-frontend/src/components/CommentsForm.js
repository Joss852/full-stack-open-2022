import { useMutation, useQueryClient } from 'react-query'
import { commentService } from '../services'
import { removeNotification, setNotification, useNotificationDispatch } from '../context/NotificationContext'

const CommentsForm = ({ blogId }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const setNotificationWithTimeout = (message, type, timeout) => {
    notificationDispatch(setNotification(message, type))
    setTimeout(() => notificationDispatch(removeNotification()), timeout * 1000)
  }

  const commentMutation = useMutation(commentService.create, {
    onSuccess: (newComment) => {
      const oldComments = queryClient.getQueryData('comments')
      queryClient.setQueryData('comments', oldComments.concat(newComment))
      setNotificationWithTimeout('Comment added successfully', 'success', 2)
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.content.value
    event.target.content.value = ''
    const newComment = { blogId, content: comment }
    commentMutation.mutate(newComment)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name='content'/>
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentsForm