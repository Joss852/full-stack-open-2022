import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const person = {
      name: newName,
      phone: newPhone,
    }

    if (!persons.find(person => person.name === newName)) {
      setPersons(persons.concat(person))
      setNewName('')
      setNewPhone('')
      return
    }

    alert(`${newName} is already added to phonebook`)
  }

  const handleChange = e => {
    setFilter(e.target.value)
    const filtered = persons.filter(person => person.name.includes(filter))

    setPersons(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filter} onChange={e => handleChange(e)} />
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          phone:{' '}
          <input value={newPhone} onChange={e => setNewPhone(e.target.value)} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.id}>
          {person.name}
          {person.phone}
        </p>
      ))}
    </div>
  )
}

export default App
