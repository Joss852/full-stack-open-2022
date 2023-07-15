import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useState } from "react"
import Select from "react-select"

const BirtYearForm = ({ authors }) => {
  const [born, setBorn] = useState("")
  const [selectedOption, setSelectedOption] = useState(null)
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const options = authors.map(a => ({ value: a.name, label: a.name }))

  const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({ variables: { name: selectedOption.value, born: Number(born) } })

    setBorn("")
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          born
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <BirtYearForm authors={authors} />
    </div>
  )
}

export default Authors
