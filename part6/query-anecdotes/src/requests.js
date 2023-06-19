import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const newAnecdote = content =>
  axios.post(baseUrl, {content, votes: 0}).then(res => res.data)

export const voteAnecdote = updatedAnecdote =>
  axios.patch(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)