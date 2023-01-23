import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const person = {
      name: newName,
    }
    
    if (!persons.find(person => person.name === newName)) {
      setPersons(persons.concat(person))
      setNewName('')
      return
    }

    alert(`${newName} is already added to phonebook`)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.name}>{person.name}</p>
      ))}
      <div>debug: {newName}</div>
    </div>
  )
}

export default App
