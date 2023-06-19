import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    setAnecdotes: (state, action) => action.payload,
    newAnecdote: (state, action) => {
      const content = action.payload
      state.push(content)
    },
    vote: (state, action) => {
      const updatedAnecdote = action.payload

      return state
        .map(a => (a.id !== updatedAnecdote.id ? a : updatedAnecdote))
        .sort((a, b) => b.votes - a.votes)
    },
  },
})

export const { newAnecdote, vote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()

    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)

    dispatch(newAnecdote(anecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })

    dispatch(vote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
