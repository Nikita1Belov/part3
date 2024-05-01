import { useState, useEffect } from 'react'
import Person from './Person.jsx'
import Service from './Service.jsx'
import PersonForm from './PersonForm.jsx'
import Filter from './Filter.jsx'
import Notification from './Notification.jsx'
import Error from './Error.jsx'

function check_name(name, persons){
  const person = persons.find(element => element.name === name)
  if(person){
    return person
  }else{
    return false
  }
}

function find_by_id(key, persons){
  const result = persons.find(element => element.id === key)
  if(result){
    return result
  }else{
    return ""
  }
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newNumber, setNewNumber] = useState('') 
  const [newName, setNewName] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showPersons, setShowPersons] = useState(true)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    Service
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const Id = persons.length + 1
    const newPerson = {
      name: newName,
      number: newNumber,
      id: Id
    }
    if(check_name(newName, persons)){
      if(window.confirm(`${newName} is already added, to replace this phone number?`)) {
        const searchID = check_name(newName, persons).id
        newPerson.id = searchID
        Service
        .update(searchID, newPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== searchID ? person : response.data))
          setNewName('')
          setNewNumber('')
          setNotification(
            `${newPerson.name} changed`
          )
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(error => {
          setError(
            `Info of ${newPerson.name} has already been removed`
          )
          setTimeout(() => {
            setError(null)
          }, 3000)
          Service
          .getAll()
          .then(response => {
            setPersons(response.data)
            setNewName('')
            setNewNumber('')
          })
        })
      }
    }else{
      Service
      .create(newPerson)
      .then(response => {
        setPersons(response.data)
        setNewName('')
        setNewNumber('')
        setNotification(
          `${newPerson.name} added`
        )
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })

    }
  }

  const deletePerson = (Id) => {
    const newPersons = persons.filter((person) => person.id !== Id)
    const findResult = find_by_id(Id, persons)
    if(window.confirm(`Delete ${findResult.name} ?`)) {
      Service
      .deleteOne(Id)
      .then(() => {
        setPersons(newPersons)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const filterPersons = showPersons ? persons : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()) === true)

  const handleNameWrite = (event) => {
    setSearchName(event.target.value)
    if(showPersons){
      setShowPersons(!showPersons)
    }
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notification}/>
      <Error error={error}/>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleNameWrite={handleNameWrite} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {filterPersons.map(person =>
      <Person key={person.id} person={person} deleteButton={() => deletePerson(person.id)} text="delete"/>
      )}
    </div>
  )
}

export default App