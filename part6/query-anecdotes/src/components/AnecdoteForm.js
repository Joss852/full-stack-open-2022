import { useMutation, useQueryClient } from 'react-query'
import { newAnecdote } from '../requests'
import { useNotificationDispatch, setNotification, clearNotification } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation(newAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      dispatch(setNotification(`Anecdote ${newAnecdote.content} created!`))
      setTimeout(() => dispatch(clearNotification()), 5000)
    },
    onError: (error) => {
      dispatch(setNotification(`Error creating anecdote: ${error.response.data.error}`))
      setTimeout(() => dispatch(clearNotification()), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
