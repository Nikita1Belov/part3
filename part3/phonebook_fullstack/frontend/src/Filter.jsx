const Filter = ({searchName, handleNameWrite}) => {

  return (
    <div>
      <form>
        <div>
            filter:
                <input 
                    value={searchName}
                    onChange={handleNameWrite}
                />
        </div>
      </form>
    </div>
  )
}

export default Filter