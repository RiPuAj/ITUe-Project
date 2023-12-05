import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { MenuRestaurant } from "../Components/MenuRestaurant";
import { ClientContext } from "../hooks/contexts.jsx";

const ClientView = () => {

    const [restaurants, setRestaurants] = useState([])
    const [client, setClient] = useState()
    //const [socket, setSocket] = useState(null)
    const [currentRestaurant, setCurrentRestaurant] = useState(null)
    const [clickedRestaurant, setClickedRestaurant] = useState(false)

    const { id } = useParams()
    const socket = useContext(ClientContext)


/*const connectSocket =  ({ id }) => {
    
        // Connect Client to Server
        const newSocket = io('http://localhost:3000', {
          query: {
            typeClient: 'client',
            id: id
          }
          
        })

        newSocket.on('get client', async (client) => {
            setClient(client.data)
        })

        newSocket.on('get all restaurants', async (rests) => {
            setRestaurants(rests)
        })

        newSocket.emit('get all restaurants')
        newSocket.emit('get client')

        setSocket(newSocket)
    }

    useEffect(() => connectSocket({ id }),[])*/

    useEffect(() => {

    }, [])

    const socket = useContext(ClientContext)
    console.log(socket)
    
    const handleClick = (e) =>{
        const selectedId = e.currentTarget
        const restId = selectedId.getAttribute('data-id')

        socket.emit('get menu restaurant', {id: restId})
        socket.on('get menu restaurant', (newRest) =>{
            setCurrentRestaurant(newRest)
            setClickedRestaurant(true)
        })
       
    }
    return (
        /*<div>
            {client && <p>Welcome {client.name}</p>}
            <ul>
                {
                clickedRestaurant ? 
                (
                    currentRestaurant && <MenuRestaurant restaurant={currentRestaurant} socket={socket} setClickedRestaurant={setClickedRestaurant}/>
                )                
                :(restaurants && restaurants.map((rest) =>{
                    return(
                        <li key={rest.id} data-id={rest.id} onClick={handleClick}>
                            {rest.name}
                        </li>
                    )
                }))
                }
            </ul>
        </div>*/
        <div>

        <h1>HOLA</h1>
        <Link to={`/user/${id}/restaurant/2`}>Pulsa</Link>
        </div>
    );
  };
  
export default ClientView;