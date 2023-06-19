import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useNotificationDispatch, setNotification, clearNotification } from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const updateAnecdoteMudation = useMutation(voteAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const updatedAnecdotes = anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
      queryClient.setQueryData('anecdotes', updatedAnecdotes)
      dispatch(setNotification(`Anecdote '${updatedAnecdote.content}' voted!`))
      setTimeout(() => dispatch(clearNotification()), 5000)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMudation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const {isLoading, isError, data, error} = useQuery('anecdotes', getAnecdotes, {
    retry: 1,
    refetchOnWindowFocus: false
  })
  
  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>Anecdote service not available due probles in server. {error.message}</div>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
