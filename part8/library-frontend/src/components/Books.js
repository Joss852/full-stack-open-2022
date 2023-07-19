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
        <button onClick={() => setGenre('all genres')}>all genres</button>
    </div>
  )
}

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const filteredBooks = books.filter(book => genre === 'all genres' || book.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>

      <span>in genre: <strong>{genre}</strong></span>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
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
