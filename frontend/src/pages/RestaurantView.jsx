import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientContext } from "../hooks/contexts";
import { NavBarRestaurant } from "../Components/NavBarRestaurant.jsx";
import Container from "react-bootstrap/esm/Container.js";
import ListGroup from "react-bootstrap/ListGroup"

const RestaurantView = () => {

  //const [isConnected, setIsConnected] = useState(socket.connected)
  const [restaurant, setRestaurant] = useState()
  const [orders, setOrders] = useState([{ id: 1, description: "Orden 1" }, { id: 2, description: "Order 2" }])

  // Take params from URL
  const { id } = useParams()
  const socket = useContext(ClientContext)

  useEffect(() => {
    if (socket) {

      socket.on('get restaurant', (restaurant) => {
        setRestaurant(restaurant.restaurant)
      })

      socket.on('new order', (newOrder) => {
        setOrders([...orders, newOrder])
      })

      socket.emit('connected', {
        query: {
          id: id,
          typeClient: 'restaurant'
        }
      })

      socket.emit('get restaurant', {
        query: { id: id }
      })
    }
  }, [socket])


  return (
    <div>
      {
        restaurant && (
          <NavBarRestaurant name={restaurant.name} link={`/restaurant/${id}/edit_menu`} text_btn="EDIT MENU" />
        )
      }
      <div>
        {orders.length < 1 ?

          <div className="d-flex justify-content-center">
            <h1>No orders already</h1>
          </div>
          :
          <Container>
            <h2 className="me-auto">Orders</h2>
            <Container className="border rounded p-3">
              <ListGroup variant="flush">
                {orders.map((order) => (
                  <ListGroup.Item key={order.id}>
                    <h5>Order ID: {order.id}</h5>
                    <p>{order.description}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Container>
          </Container>
          }
      </div>
    </div>
  );
}
export default RestaurantView;

