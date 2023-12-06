import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ClientContext } from "../hooks/contexts"
import Button from 'react-bootstrap/Button';
import { NavBarClient } from '../Components/NavBarClient.jsx';
import Table from "react-bootstrap/esm/Table.js";

export const MenuView = () => {

    const { id, id_restaurant } = useParams()
    const socket = useContext(ClientContext)
    const [restaurant, setRestaurant] = useState(null)
    const [basket, setBasket] = useState([])


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
                        <NavBarClient name={`Restaurant: ${restaurant.name}`} text_btn={"VIEW BASKET"} basket={basket}/>
                        {/*<ul>

                        {
                            restaurant.menu.map((dish, index) => {
                                return(
                                    <li key= {index}>
                                        {dish.food} ~~ {dish.price}
                                        <input type="number" />
                                        <Button variant="success">Add Dish</Button>{' '}
                                    </li>
                                )
                            })
                        }
                        
                        </ul>*/}

                        <Table>
                            <tbody>
                                
                            </tbody>
                        </Table>
                    </div>
                )
            }
        </div>
    )
}