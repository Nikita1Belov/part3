import './styles/person.css'

const Person= ({person, text, deleteButton}) => {
  return (
    <div>
        <div className='container'>
        <div className='text'>{person.name} {person.number}</div>
        <div>
            <button onClick={deleteButton} type="delete">{text}</button>
        </div>
    </div>
    </div>
  )
}

export default Person