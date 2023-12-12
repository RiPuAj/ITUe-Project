import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientContext } from "../hooks/contexts";
import { NavBarRestaurant } from "../Components/NavBarRestaurant.jsx";
import Container from "react-bootstrap/esm/Container.js";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button.js";
import { set } from "zod";

const RestaurantView = () => {

  //const [isConnected, setIsConnected] = useState(socket.connected)
  const [restaurant, setRestaurant] = useState()
  const [orders, setOrders] = useState([])
  const [pendingAcceptOrder, setPendingAcceptOrder] = useState(null)
  const [showNewOrder, setShowNewOrder] = useState(false)


  // Take params from URL
  const { id } = useParams()
  const socket = useContext(ClientContext)

  const handleAcceptOrder = () => {
    console.log(pendingAcceptOrder)
    setOrders([...orders, pendingAcceptOrder])
    setShowNewOrder(false)
  }

  const handleRejectOrder = () => {
    setShowNewOrder(false)
  }

  useEffect(() => {
    if (socket) {

      socket.on('get restaurant', (restaurant) => {
        setRestaurant(restaurant.restaurant)
      })

      socket.on('new order', (newOrder) => {
        setPendingAcceptOrder(newOrder)
        setShowNewOrder(true)
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
                {orders && orders.map((order) => (
                  <ListGroup.Item key={order.id}>
                    <h5>Order ID: {order.id}</h5>
                    <ListGroup>
                      {order.order.map((dish, index) => (
                        <ListGroup.Item key={index}>
                          <strong>Plato:</strong> {dish.food} - <strong>Cantidad:</strong> {dish.quantity}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Container>
          </Container>
        }

      </div>
      <Modal show={showNewOrder} onHide={() => setShowNewOrder(false)}>
        <Modal.Header closeButton>
          <Modal.Title>¡New order!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Se ha recibido un nuevo pedido.
          ¿Desea aceptarlo?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRejectOrder}>
            Reject
          </Button>
          <Button variant="primary" onClick={handleAcceptOrder}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default RestaurantView;

