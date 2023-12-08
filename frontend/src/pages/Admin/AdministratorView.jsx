import { useContext, useEffect, useState } from "react"
import { ClientContext } from "../../hooks/contexts"
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';


export const AdministratorView = () => {

  const socket = useContext(ClientContext)

  const [activeUsers, setActiveUsers] = useState([])
  const [activeRestaurants, setActiveRestaurants] = useState([])
  const [activeCouriers, setActiveCouriers] = useState([])


  useEffect(() => {
    if (socket) {
      
      socket.on('get active users', (data) => {
        console.log(data)
        setActiveUsers(data)
      })

      socket.on('get active restaurants', (data) => {
        console.log(data)
        setActiveRestaurants(data)
      })

      socket.on('get active couriers', (data) => {
        console.log(data)
        setActiveCouriers(data)
      })

      socket.emit('get active users')
      socket.emit('get active restaurants')
      socket.emit('get active couriers')
    }

  }, [socket])

  return (
    <div>
      {/* Barra de navegación */}
      <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>GlovoClone Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="tabs" className="me-auto">
              <Nav.Link as={Link} to="/admin/Users">Users</Nav.Link>
              <Nav.Link as={Link} to="/admin/Restaurants">Restaurants</Nav.Link>
              <Nav.Link as={Link} to="/admin/Couriers">Couriers</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      {/* Contenido principal */}
      <Container className="mt-4">
        <Row>
          <Col>
            <h2>Resumen del Administrador</h2>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Users</Card.Title>
                <Card.Text>Total active users: {activeUsers.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Couriers</Card.Title>
                <Card.Text>Total active couriers: {activeCouriers.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Restaurants</Card.Title>
                <Card.Text>Total active restaurants: {activeRestaurants.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};