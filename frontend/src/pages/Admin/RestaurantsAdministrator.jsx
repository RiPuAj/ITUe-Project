import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

export const RestaurantsAdministratorView = () =>{
    
    return(
        <div>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/admin">GlovoClone Admin</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav variant="tabs" className="me-auto">
                    <Nav.Link as={Link} to="/admin/Users">Users</Nav.Link>
                    <Nav.Link as={Link} to="/admin/Restaurants" disabled><strong className="nav-link-text">Restaurants</strong></Nav.Link>
                    <Nav.Link as={Link} to="/admin/Couriers">Couriers</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )
}