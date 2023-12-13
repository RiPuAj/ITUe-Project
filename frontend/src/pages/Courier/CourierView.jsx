import { useState, useEffect, useContext } from "react";
import { ClientContext } from '../../hooks/contexts.jsx';
import { useParams } from "react-router-dom";
import Navbar from "react-bootstrap/esm/Navbar.js";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"
import Card from "react-bootstrap/Card"

export const CourierView = () => {

  const [orderDetails, setOrderDetails] = useState([]);
  const [courier, setCourier] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const { id } = useParams()
  const socket = useContext(ClientContext)

  // Cierra la notificación después de 2 segundos
  // Close the alert after 2 secs
  const handleShow = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const handleDelivery = (id_order) => {
    setOrderDetails([])
    socket.emit('delete order', {id_order:id_order})
  }

  useEffect(() => {
    if (socket) {

      socket.on('get courier', (courier) => {
        setCourier(courier)
      })

      socket.on('new order', (order) => {
        setOrderDetails([...orderDetails, order])
        handleShow()
        console.log(order)
      })

      socket.emit('connected', {
        query: {
          id: id,
          typeClient: 'courier'
        }
      })

      socket.emit('get courier')
    }
  }, [socket]);


  return (
    <div>

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >{courier && (`Welcome ${courier.first_name} ${courier.last_name}!`)}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {courier && `Signed in as ID: ${courier.id}`}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Alert show={showModal} variant="success">
        <Alert.Heading>New order!</Alert.Heading>
        <p>
          A new order has been added to the list.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowModal(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>


      {

        <Container>
          <h1>Orders to deliver</h1>
          {orderDetails.length > 0 ? orderDetails.map((order) => (
            <Card key={order.id_order} style={{ marginBottom: '20px' }}>
              <Card.Body>
                <Card.Title>Order #{order.id_order}</Card.Title>
                <Card.Text>
                  <strong>Restaurant address:</strong> {order.restaurant.address}
                  <br />
                  <strong>Delivery address:</strong> {order.user.address}
                  <br />
                  <strong>Products:</strong>
                  <ListGroup>
                    {order.order.map((item, index) => (
                      <ListGroup.Item key={index}>{item.food}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Text>
                <Button variant="success" onClick={() => handleDelivery(order.id_order)}>
                  Delivered
                </Button>
                      
              </Card.Body>
            </Card>
          ))
            :
            <div className="d-flex justify-content-center align-items-center">
              <h1>No orders to deliver</h1>
            </div>}
        </Container>
      }
    </div>
  )
};
