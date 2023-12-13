import { useContext, useEffect, useState } from "react"
import { ClientContext } from "../../hooks/contexts"
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination'
import { FaTrashAlt } from "react-icons/fa"
import { FaPencilAlt } from "react-icons/fa"
import Modal from 'react-bootstrap/Modal'

export const RestaurantsAdministratorView = () =>{
  const socket = useContext(ClientContext)

  const [totalPages, setTotalPages] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [restaurantsPerPage, setrestaurantsPerPage] = useState(5)

  const [subset, setSubset] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')

  const [showModal, setShowModal] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);


  useEffect(() => {
    if (socket) {

      socket.emit('get all restaurants')

      socket.on('get all restaurants', (data) => {
        setRestaurants(data)
        setTotalPages(Math.ceil(data.length / restaurantsPerPage))
        const newSubset = data.slice((currentPage - 1) * restaurantsPerPage, currentPage * restaurantsPerPage);
        setSubset(newSubset);
      })


    }

  }, [socket])


  useEffect(() => {
    if (socket) {


      setTotalPages(Math.ceil(restaurants.length / restaurantsPerPage))
      const newSubset = restaurants.slice((currentPage - 1) * restaurantsPerPage, currentPage * restaurantsPerPage);
      setSubset(newSubset);


    }
  }, [restaurants])

  const handlePrevClick = () => {
    const newPage = currentPage - 1
    setCurrentPage(newPage)
    setSubset(restaurants.slice(newPage * restaurantsPerPage, (newPage * restaurantsPerPage) + restaurantsPerPage))
  }

  const handleNextClick = () => {
    const newPage = currentPage + 1
    setCurrentPage(newPage)
    setSubset(restaurants.slice(newPage * restaurantsPerPage, (newPage * restaurantsPerPage) + restaurantsPerPage))
  }

  const handleDropdownClick = (newrestaurantsPerPage) => {
    setTotalPages(Math.ceil(restaurants.length / newrestaurantsPerPage));
    setrestaurantsPerPage(newrestaurantsPerPage);
    setCurrentPage(1); // Restablecer la página actual a 1 cuando cambias la cantidad de usuarios por página
    setSubset(restaurants.slice(0, newrestaurantsPerPage));
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    // Realizar la búsqueda si se han escrito al menos tres letras
    if (value.length >= 3) {
      const filteredrestaurants = restaurants.filter(restaurant =>
        restaurant.first_name.toLowerCase().includes(value.toLowerCase()) ||
        restaurant.last_name.toLowerCase().includes(value.toLowerCase()) ||
        restaurant.email.toLowerCase().includes(value.toLowerCase())
      );
      setSubset(filteredrestaurants);
    } else {
      // Si el valor del buscador es menor a tres letras, muestra todos los usuarios
      //setSubset(restaurants.slice(currentPage * restaurantsPerPage, (currentPage * restaurantsPerPage) + restaurantsPerPage));
      setTotalPages(Math.ceil(restaurants.length / restaurantsPerPage));
      setrestaurantsPerPage(restaurantsPerPage);
      setCurrentPage(1); // Restablecer la página actual a 1 cuando cambias la cantidad de usuarios por página
      setSubset(restaurants.slice(0, restaurantsPerPage));
    }
  };

  const handleDelete = (restaurantId) => {
    // Filtrar los usuarios para obtener aquellos que no coincidan con el ID del usuario a eliminar
    const updatedrestaurants = restaurants.filter(restaurant => restaurant.id !== restaurantId);

    // Actualizar el estado de los usuarios con la nueva lista filtrada
    setRestaurants(updatedrestaurants);

    // Si el usuario eliminado está en la página actual, actualiza el subset mostrado
    const updatedSubset = updatedrestaurants.slice((currentPage - 1) * restaurantsPerPage, currentPage * restaurantsPerPage);
    setSubset(updatedSubset);

    // Si el número total de usuarios después de la eliminación es menor que la página actual,
    // ajusta la página actual al último conjunto de usuarios
    if (updatedrestaurants.length < currentPage * restaurantsPerPage) {
      setCurrentPage(Math.ceil(updatedrestaurants.length / restaurantsPerPage));
    }

    socket.emit('delete restaurant', { id_restaurant: restaurantId })
  };

  const handleEditrestaurant = (restaurantId) => {
    // Buscar el usuario correspondiente al ID
    const restaurantToEdit = restaurants.find(restaurant => restaurant.id === restaurantId);
    console.log(restaurantToEdit)
    // Establecer la información del usuario a editar en el estado
    setEditingRestaurant(restaurantToEdit);
    // Mostrar el modal de edición
    setShowModal(true);
  }

  const handleCloseModal = () => {
    // Cerrar el modal y limpiar la información del usuario en edición
    setShowModal(false);
    setEditingRestaurant(null);
  }

  const handleSaveChanges = () => {
    // Aquí deberías implementar la lógica para guardar los cambios del usuario en tu backend
    // Después de guardar los cambios, actualiza el estado de los usuarios y cierra el modal
    // Por ejemplo, si tienes una función en tu socket para actualizar el usuario, puedes usarla aquí
    // socket.emit('update restaurant', setEditingRestaurant);

    // Una vez que se han guardado los cambios, actualiza el estado de los usuarios y cierra el modal
    const updatedrestaurants = restaurants.map(restaurant =>
      restaurant.id === editingRestaurant.id ? editingRestaurant : restaurant
    );
    setRestaurants(updatedrestaurants);
    setShowModal(false);
    socket.emit('edit restaurant', editingRestaurant)
    console.log(editingRestaurant)
  }


  return(
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/admin">GlovoClone Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="tabs" className="me-auto" defaultActiveKey="/admin">
              <Nav.Item><Nav.Link as={Link} to="/admin/Users" className="">Users</Nav.Link></Nav.Item>
              <Nav.Link as={Link} to="/admin/Restaurants" disabled>Restaurants</Nav.Link>
              <Nav.Link as={Link} to="/admin/Couriers">Couriers</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row>
          <Col>
            <h2>Restaurants</h2>
          </Col>
          <Col xs="auto">
            <div className="d-flex">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search restaurant"
                  aria-label="Search restaurant"
                  aria-describedby="basic-addon2"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <Button variant="outline-secondary">Search</Button>
              </InputGroup>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Shown restaurants
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleDropdownClick(5)}>5</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDropdownClick(10)}>10</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDropdownClick(20)}>20</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDropdownClick(50)}>50</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDropdownClick(100)}>100</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit restaurant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Aquí colocarías los campos para editar la información del usuario */}
                  {editingRestaurant && (
                    <div className="form-group">
                      <label>Restaurant Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingRestaurant.name}
                        onChange={(e) =>
                          setEditingRestaurant({
                            ...editingRestaurant,
                            name: e.target.value,
                          })
                        }
                      />
                      <label>Address:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingRestaurant.address}
                        onChange={(e) =>
                          setEditingRestaurant({
                            ...editingRestaurant,
                            address: e.target.value,
                          })
                        }
                      />
                      {/* Otros campos para editar */}
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {subset.map((restaurant) => (
                <ListGroup.Item key={restaurant.id}>
                  <div>
                    <h5>{restaurant.name}</h5>
                    <p>Address: {restaurant.address}</p>
                    <Button variant="primary" onClick={() => handleEditrestaurant(restaurant.id)}><FaPencilAlt />
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(restaurant.id)}><FaTrashAlt /></Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
          </Col>
        </Row>
      </Container>

      <Container fluid className="d-flex justify-content-center mt-4">


        <Pagination>
          {currentPage != 1 && (
            <Pagination.Prev onClick={handlePrevClick} />
          )}


          <Pagination.Item active>{currentPage}</Pagination.Item>

          {currentPage != totalPages && (
            <Pagination.Next onClick={handleNextClick} />
          )}

        </Pagination>
      </Container>
    </div>
  )
}