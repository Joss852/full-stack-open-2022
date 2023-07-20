import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Categories = ({ books, setGenre }) => {
  const genres = books.reduce((acc, book) => {
    book.genres.forEach((genre) => {
      if (!acc.includes(genre)) {
        acc.push(genre)
      }
    })
    return acc
  }, [])

  return (
    <div>
      {genres.map(genre => (
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      ))}
        <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS, {
    variables: { genre }
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      {genre && (
        <span>in genre: 
          <strong>{genre}</strong>
        </span>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Categories books={books} setGenre={setGenre} />
    </div>
  )
}

export default Books
