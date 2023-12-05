import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ClientContext } from "../hooks/contexts"


export const MenuView = () => {

    const { id, id_restaurant } = useParams()
    const socket = useContext(ClientContext)
    const [restaurant, setRestaurant] = useState(null)

    useEffect(() => {
        if (socket) {
            socket.on('get restaurant', (restaurant) => {
                console.log(restaurant)
                setRestaurant(restaurant.restaurant)
            })

            socket.emit('get restaurant', {
                query: { 
                    id: id_restaurant 
                }
            })
        }


    }, [socket])

    return (
        <div>
            {
                restaurant && (
                    <div>
                        <h1>{restaurant.name}</h1>
                        <ul>

                        {
                            restaurant.menu.map((dish, index) => {
                                return(
                                    <li key= {index}>
                                        {dish.food} ~~ {dish.price}
                                        <input type="number" />
                                        <button>Add</button>
                                    </li>
                                )
                            })
                        }
                        
                        </ul>
                    </div>
                )
            }
        </div>
    )
}