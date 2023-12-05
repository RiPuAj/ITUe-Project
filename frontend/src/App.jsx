import './App.css'

function App() {

  const handleClick = (e) => {
    e.preventDefault()
    const id = document.getElementById('id-client').value
    const idBtn = e.target.id
    const location = window.location.href
    
    if(id == ''){
      return

    } else if(idBtn == 'clientBtn'){

      window.location.href = `${location}user/${id}`

    } else if(idBtn == 'restaurantBtn'){

      window.location.href = `${location}restaurant/${id}`
    
    } else {
     
      window.location.href = `${location}courier/${id}`
    
    }
  }

  return (
    <div>
      <input type="number" id="id-client" placeholder='ID'/>
      <button id="clientBtn" onClick={handleClick}>Client</button>
      <button id="restaurantBtn" onClick={handleClick}>Restaurant</button>
      <button id="courierBtn" onClick={handleClick}>Courier</button>
    </div>
  )
}

export default App
