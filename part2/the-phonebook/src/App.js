import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>
      {person.name}
      {person.number}
    </p>
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  )
}

const PersonForm = ({ handleSubmit, ...props }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{' '}
        <input
          value={props.newName}
          onChange={e => props.setNewName(e.target.value)}
        />
      </div>
      <div>
        number:{' '}
        <input
          value={props.newNumber}
          onChange={e => props.setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={e => handleChange(e)} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (!persons.find(person => person.name === newName)) {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
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
      <Filter filter={filter} handleChange={handleChange} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App
