import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientContext } from "../../hooks/contexts.jsx";
import { NavBarRestaurant } from "../../Components/NavBarRestaurant.jsx";
import Container from "react-bootstrap/esm/Container.js";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button.js";

const RestaurantView = () => {

  const [restaurant, setRestaurant] = useState()
  const [orders, setOrders] = useState([])
  const [pendingAcceptOrder, setPendingAcceptOrder] = useState(null)
  const [showNewOrder, setShowNewOrder] = useState(false)



  // Take params from URL and context (Socket)
  const { id } = useParams()
  const socket = useContext(ClientContext)

  const handleAcceptOrder = () => {

    socket.emit('restaurant response', {
      id_order: pendingAcceptOrder.id_order,
      response: true
    })
  
    setOrders([...orders, pendingAcceptOrder])
    setPendingAcceptOrder(null)
    setShowNewOrder(false)
  }

  const handleRejectOrder = () => {
    setShowNewOrder(false)
    setPendingAcceptOrder(null)

    socket.emit('restaurant response', {
      id_order: pendingAcceptOrder.id_order,
      response: false
    })
  }

  const handlePreparedOrder = (index) => {
    console.log(index)
    const updatedOrders = [...orders]
    updatedOrders.splice(index, 1)
    setOrders(updatedOrders)
  }

  useEffect(() => {
    if (socket) {

      socket.on('get restaurant', (restaurant) => {
        setRestaurant(restaurant.restaurant)
      })

      socket.on('add order', (newOrder) => {
        setPendingAcceptOrder(newOrder)
        setShowNewOrder(true)
      })

      socket.on('get restaurant orders', (orders) => {
        setOrders(orders)
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

      socket.emit('get restaurant orders')
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
                {orders && orders.map((order, index) => (
                  <ListGroup.Item key={order.id}>
                    <h5>Order ID: {order.id_order}</h5>
                    <ListGroup>
                      {order.order.map((dish, index) => (
                        <ListGroup.Item key={index}>
                          <strong>Dish:</strong> {dish.food} - <strong>Quantity:</strong> {dish.quantity}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <Button variant="success" className="mt-2" onClick={() => handlePreparedOrder(index)}> Ready </Button>
                  </ListGroup.Item>  
                ))}
              </ListGroup>
            </Container>
          </Container>
        }

      </div>
      <Modal
        show={showNewOrder}
        onHide={() => setShowNewOrder(false)}
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
          <Modal.Title>¡New order!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A new order has been received:
          <ListGroup>
            {pendingAcceptOrder && pendingAcceptOrder.order.map((dish, index) => (
              <ListGroup.Item key={index}>
                <strong>Dish:</strong> {dish.food} - <strong>Quantity:</strong> {dish.quantity}
              </ListGroup.Item>
            ))}
          </ListGroup>
          Do you wish to accept it?
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

