const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use(express.static('dist'))

morgan.token('person', function (req, res) {
  return JSON.stringify(req.body) 
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const generateId = () => {
  const maxId = 100000
    ? Math.max(...persons.map(person => person.id))
    : 0
  return maxId + 1
}

const filterName = (persons, personName) => {
  const person = persons.find(person => person.name === personName)
  if (person) {
    return true
  }else{
    return false
  }
}

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  },
  { 
    "id": 5,
    "name": "Oleg Bot", 
    "number": "12503434"
  }
]

app.get('/info', function(request, response) {
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date().toString()}</p>`)
})

app.get('/api/persons', function(request, response) {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', function(request, response) {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.put('/api/persons/:id', function(request, response) {
  const body = request.body
  const id = Number(request.params.id)
  const person = {
    id: id,
    name: body.name,
    number: body.number,
  }
  //persons = persons.filter(person => person.id !== id ? person : request.data)
  persons[persons.map((x, i) => [i, x]).filter(
    x => x[1].id === id)[0][0]] = person
  response.json(person)
})

app.use(express.json())
app.post('/api/persons', function(request, response) {
  const body = request.body
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  if(!filterName(persons, person.name) && person.name != ""){
    persons = persons.concat(person)
    response.json(persons)
  }else if(person.name == ""){
    return response.status(400).json({ 
      error: "name mustn't be empty"
    })
  }else{
    return response.status(400).json({ 
      error: "name must be unique"
    })
  }
})