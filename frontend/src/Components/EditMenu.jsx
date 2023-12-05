import { useContext, useEffect, useState } from "react"
import { ClientContext } from "../hooks/contexts"
import { useParams } from "react-router-dom"

export const EditMenu = () => {

    const [restaurant, setRestaurant] = useState(null)
    const { id } = useParams()
    const socket = useContext(ClientContext)

    useEffect(() => {
        if (socket){
          socket.on('get restaurant', (restaurant) => {
            setRestaurant(restaurant.restaurant)
          })
    
          socket.emit('get restaurant', {query:{id:id}})
        }
      }, [socket, id])

    return(
        <div>
            <ul>
                {restaurant && restaurant.menu.map((dish, index) => {
                    console.log(dish)
                    return(
                        <li key={index}>
                            {dish.food} ~ {dish.price}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}