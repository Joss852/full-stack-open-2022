import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()
    dispatch(setNotification('New anecdote created!'))
    const content = event.target.title.value
    setTimeout(() => dispatch(clearNotification()), 5000)
    event.target.title.value = ''

    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='title' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
