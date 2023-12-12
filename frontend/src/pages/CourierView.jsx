import { useState, useEffect, useContext } from "react";
import { ClientContext } from '../hooks/contexts.jsx';
import { useParams } from "react-router-dom";
import Navbar from "react-bootstrap/esm/Navbar.js";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"
import Card from "react-bootstrap/Card"

const CourierView = () => {

  const [orderDetails, setOrderDetails] = useState([ {id: 2,
    items: ['Producto C', 'Producto D'],
    restaurantAddress: '321 Calle del Restaurante, Ciudad D',
    deliveryAddress: '456 Calle Secundaria, Ciudad B'}]);
  const [courier, setCourier] = useState(null)
  const [showModal, setShowModal] = useState(true)

  const { id } = useParams()
  const socket = useContext(ClientContext)

  const handleShow = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000); // Cierra la notificación después de 2 segundos
  };

  useEffect(() => {
    if (socket) {

      socket.on('get courier', (courier) => {
        setCourier(courier)
      })

      socket.on('add order', (order) => {
        setOrderDetails(order)
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
          A new order has been added to the list
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowModal(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>

      <Container>
      <h1>Pedidos para Entregar</h1>
      {orderDetails.map((order) => (
        <Card key={order.id} style={{ marginBottom: '20px' }}>
          <Card.Body>
            <Card.Title>order #{order.id}</Card.Title>
            <Card.Text>
              <strong>Dirección del Restaurante:</strong> {order.restaurantAddress}
              <br />
              <strong>Dirección de Entrega:</strong> {order.deliveryAddress}
              <br />
              <strong>Products:</strong>
              <ListGroup>
                {order.items.map((item, index) => (
                  <ListGroup.Item key={index}>{item}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Text>
            {!order.delivered && (
              <Button variant="success" onClick={() => handleDelivery(order.id)}>
                Delivered
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </Container>     
    </div>
  )
};
 
export default CourierView;
