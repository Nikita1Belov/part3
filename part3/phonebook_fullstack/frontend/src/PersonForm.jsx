import Button from './Button.jsx'

const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
            name:
                <input 
                    value={newName}
                    onChange={handleNameChange}
                />
        </div>
        <div>
            number:
                <input 
                    value={newNumber}
                    onChange={handleNumberChange}
                />
        </div>
        <Button text={"add"} />
      </form>
    </div>
  )
}

export default PersonForm