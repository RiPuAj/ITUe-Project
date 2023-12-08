import { useContext, useEffect, useState } from "react"
import { ClientContext } from "../../hooks/contexts"
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';

export const ClientAdministratorView = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/admin">GlovoClone Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="tabs" className="me-auto" defaultActiveKey="/admin">
              <Nav.Item><Nav.Link as={Link} to="/admin/Users" disabled className="">Users</Nav.Link></Nav.Item>
              <Nav.Link as={Link} to="/admin/Restaurants">Restaurants</Nav.Link>
              <Nav.Link as={Link} to="/admin/Couriers">Couriers</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}