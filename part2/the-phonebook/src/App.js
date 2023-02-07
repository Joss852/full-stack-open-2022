import { useState, useEffect } from 'react'
import personService from './services/persons'

const Alert = ({ alert }) => {
  let alertStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (alert.message === null) {
    return null
  }

  if (alert.type === 'error') {
    alertStyle = { ...alertStyle, color: 'red' }
  }

  return <div style={alertStyle}>{alert.message}</div>
}

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
  const [alert, setAlert] = useState({ message: null, type: null })

  const fetchPersons = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setAlert({ message: 'Error fetching persons', type: 'error' })
      })
  }

  useEffect(fetchPersons, [])

  const handleSubmit = e => {
    e.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
    }

    const oldPerson = persons.find(person => person.name === newName)

    if (oldPerson && oldPerson.number !== newNumber) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirm) {
        personService
          .update(oldPerson.id, person)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== oldPerson.id ? person : returnedPerson
              )
            )
            setAlert({
              message: `Updated ${returnedPerson.name}`,
              type: 'success',
            })
          })
          .catch(error => {
            setAlert({
              message: `Information of' ${newName}' has already been removed from server`,
              type: 'error',
            })
            setPersons(persons.filter(person => person.id !== oldPerson.id))
          })
      }
    } else {
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setAlert({ message: `Added ${returnedPerson.name}`, type: 'success' })
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setAlert({
            message: error.response.data.error,
            type: 'error',
          })
        })
    }

    setTimeout(() => {
      setAlert({ message: null, type: null })
    }, 5000)
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
      <Alert alert={alert} />
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
