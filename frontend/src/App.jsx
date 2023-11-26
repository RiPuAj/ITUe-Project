import './App.css'
import { io } from 'socket.io-client'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const URL = 'http://localhost:3000'

/*
const handleClick = (e) => {

  let buttonId = e.target.id
  let clientId = document.getElementById('id-client').value
  
  window.location.href = `${window.location.href}/restaurant/${clientId}`

  /*
  if (buttonId == 'log-client'){
    console.log("Log Client")
    const socket = io(URL, {
      query: {
        typeClient : "client",
        token: "2"
      }
    })
  } else if (buttonId == 'log-restaurant'){
    
    console.log("Log Restaurant")
    const socket = io(URL, {
      query: {
        typeClient : "restaurant",
        token: {clientId}
      }
    })
  } else if (buttonId == 'log-deliver'){
    
    console.log("Log Deliver")
    const socket = io(URL, {
      query: {
        typeClient : "deliver",
        token: {clientId}
      }
    })
  }

}*/

function App() {
  const [id, setId] = useState()

  const handleClick = (e) => {
    const id = document.getElementById('id-client').target.value
    console.log(e.target.value)
    //setId()
  }

  return (
    <div>
      <input type="text" id="id-client" value = {id} placeholder='ID'/>
      


      <Link to={`/restaurant/${id}`} onClick={handleClick}>PULSA AQUI GILIPOLLAS</Link>
    </div>
  )
}

export default App
