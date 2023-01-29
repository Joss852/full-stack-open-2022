import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </div>
  )
}

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(person => (
        <Person key={person.id} person={person} handleDelete={handleDelete} />
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const fetchPersons = () => {
    console.log('fetching persons...')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('persons fetched')
        setPersons(initialPersons)
      })
      .catch(error => {
        alert('Error fetching persons', error.message)
      })
  }

  useEffect(fetchPersons, [])

  const handleSubmit = e => {
    e.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
    }

    if (!persons.find(person => person.name === newName)) {
      personService.create(person).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

      return
    }

    alert(`${newName} is already added to phonebook`)
  }

  const handleChange = e => {
    setFilter(e.target.value)
    const filtered = persons.filter(person => person.name.includes(filter))

    setPersons(filtered)
  }

  const handleDelete = id => {
    const { name } = persons.find(person => person.id === id)
    const confirm = window.confirm(`delete ${name}? `)

    if (confirm) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
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
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
