import { useContext, useEffect, useState } from "react"
import { ClientContext } from "../hooks/contexts"
import { useParams } from "react-router-dom"
import '../styles/menu.css'

export const EditMenu = () => {

    const [restaurant, setRestaurant] = useState(null)
    const { id } = useParams()
    const socket = useContext(ClientContext)

    useEffect(() => {
        if (socket) {
            socket.on('get restaurant', (restaurant) => {
                setRestaurant(restaurant.restaurant)
            })

            socket.emit('get restaurant', { query: { id: id } })
        }
    }, [socket, id])

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Dish
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                { restaurant && (
                        restaurant.menu.map((dish, index) => {
                            return(
                            <tr key={index}>
                                <td>
                                    {dish.food}
                                </td>
                                <td>
                                    {dish.price}
                                </td>
                                <td>
                                    <button data-id={index} className="editBtn">EDIT</button>
                                    <button data-id={index} className="deleteBtn">DELETE</button>
                                </td>
                            </tr>
                            )})
                    )
                }
            </tbody>
        </table>
    )
}