import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { commentService } from '../services'
import { removeNotification, setNotification, useNotificationDispatch } from '../context/NotificationContext'
import { Input, IconButton, Box, Tooltip, InputAdornment } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const CommentsForm = ({ blogId }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const [comment, setComment] = useState('')

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
    commentMutation.mutate({ id: blogId, content: comment })
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <Input
          variant='filled'
          name='content'
          placeholder='Write a comment...'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title='Comment'>
                <IconButton color="primary" aria-label="comment" onClick={handleSubmit}>
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          }
          fullWidth
        />
      </Box>
    </form>
  )
}

export default CommentsForm