import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ClientContext } from "../hooks/contexts.jsx";

export const ClientView = () => {

    const [restaurants, setRestaurants] = useState([])
    const [user, setUser] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const restaurantsPerPage = 5;
    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

    const { id } = useParams()
    const socket = useContext(ClientContext)

    useEffect(() => {
        if(socket){

            socket.on('get client',(client) => {
                setUser(client)
            })

            socket.on('get all restaurants', async (rests) => {
                setRestaurants(rests)
            })

            socket.emit('get all restaurants')
            socket.emit('get client',{
                query:{
                    id:id
                }
            })
        }
    }, [socket])

    const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);

const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};

return (
    <div>
        {user && <p>Welcome {user.name}</p>}
        <ul>
            {currentRestaurants.map((rest) => (
                <li key={rest.id} data-id={rest.id}>
                    <Link to={`/user/${id}/restaurant/${rest.id}`}>{rest.name}</Link>
                </li>
            ))}
        </ul>
        <div>
            {Array.from({ length: totalPages }, (_, index) => (
                <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                </button>
            ))}
        </div>
    </div>
);
  };
  
