import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotificationWithTimeout
} from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') return anecdotes

    return anecdotes.filter(a => a.content.includes(filter))
  })

  const vote = anecdote => {
    const votedAnecdote = anecdotes.find(a => a.id === anecdote.id)
    dispatch(setNotificationWithTimeout(`You voted ${votedAnecdote.content}`, 5))
    dispatch(voteAnecdote(anecdote))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={vote}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
