import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ClientContext } from "../hooks/contexts.jsx";

const ClientView = () => {

    const [restaurants, setRestaurants] = useState([])
    const [client, setClient] = useState()

    const { id } = useParams()
    const socket = useContext(ClientContext)

    useEffect(() => {
        socket.on('get client',(client) => {
            setClient(client.client)
        })

        socket.on('get all restaurants', async (rests) => {
            setRestaurants(rests)
        })

        socket.emit('get all restaurants')
        socket.emit('get client',{query:{id:id}})

    }, [])

    return (
        <div>
            {client && <p>Welcome {client.name}</p>}
            <ul>
                {
                (restaurants && restaurants.map((rest) =>{
                    return(
                        <li key={rest.id} data-id={rest.id}>
                             <Link to={`/user/${id}/restaurant/${rest.id}`}>{rest.name}----{rest.rating}</Link>
                        </li>
                    )
                }))
                }
            </ul>
        </div>
    );
  };
  
export default ClientView;