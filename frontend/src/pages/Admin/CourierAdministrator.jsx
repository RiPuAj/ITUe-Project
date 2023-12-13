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






export const CourierAdministratorView = () =>{

  const socket = useContext(ClientContext)

  const [totalPages, setTotalPages] = useState([])
  const [couriers, setcouriers] = useState([])
  const [couriersPerPage, setcouriersPerPage] = useState(5)

  const [subset, setSubset] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')

  const [showModal, setShowModal] = useState(false);
  const [editingcourier, setEditingcourier] = useState(null);


  useEffect(() => {
    if (socket) {

      socket.emit('get all couriers')

      socket.on('get all couriers', (data) => {
        setcouriers(data)
        console.log(data)
        setTotalPages(Math.ceil(data.length / couriersPerPage))
        const newSubset = data.slice((currentPage - 1) * couriersPerPage, currentPage * couriersPerPage);
        setSubset(newSubset);
      })


    }

  }, [socket])


  useEffect(() => {
    if (socket) {


      setTotalPages(Math.ceil(couriers.length / couriersPerPage))
      const newSubset = couriers.slice((currentPage - 1) * couriersPerPage, currentPage * couriersPerPage);
      setSubset(newSubset);


    }
  }, [couriers])

  const handlePrevClick = () => {
    const newPage = currentPage - 1
    setCurrentPage(newPage)
    setSubset(couriers.slice(newPage * couriersPerPage, (newPage * couriersPerPage) + couriersPerPage))
  }

  const handleNextClick = () => {
    const newPage = currentPage + 1
    setCurrentPage(newPage)
    setSubset(couriers.slice(newPage * couriersPerPage, (newPage * couriersPerPage) + couriersPerPage))
  }

  const handleDropdownClick = (newcouriersPerPage) => {
    setTotalPages(Math.ceil(couriers.length / newcouriersPerPage));
    setcouriersPerPage(newcouriersPerPage);
    setCurrentPage(1); // Restablecer la página actual a 1 cuando cambias la cantidad de usuarios por página
    setSubset(couriers.slice(0, newcouriersPerPage));
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    // Realizar la búsqueda si se han escrito al menos tres letras
    if (value.length >= 3) {
      const filteredcouriers = couriers.filter(courier =>
        courier.first_name.toLowerCase().includes(value.toLowerCase()) ||
        courier.last_name.toLowerCase().includes(value.toLowerCase()) ||
        courier.email.toLowerCase().includes(value.toLowerCase())
      );
      setSubset(filteredcouriers);
    } else {
      // Si el valor del buscador es menor a tres letras, muestra todos los usuarios
      //setSubset(couriers.slice(currentPage * couriersPerPage, (currentPage * couriersPerPage) + couriersPerPage));
      setTotalPages(Math.ceil(couriers.length / couriersPerPage));
      setcouriersPerPage(couriersPerPage);
      setCurrentPage(1); // Restablecer la página actual a 1 cuando cambias la cantidad de usuarios por página
      setSubset(couriers.slice(0, couriersPerPage));
    }
  };

  const handleDelete = (courierId) => {
    // Filtrar los usuarios para obtener aquellos que no coincidan con el ID del usuario a eliminar
    const updatedcouriers = couriers.filter(courier => courier.id !== courierId);

    // Actualizar el estado de los usuarios con la nueva lista filtrada
    setcouriers(updatedcouriers);

    // Si el usuario eliminado está en la página actual, actualiza el subset mostrado
    const updatedSubset = updatedcouriers.slice((currentPage - 1) * couriersPerPage, currentPage * couriersPerPage);
    setSubset(updatedSubset);

    // Si el número total de usuarios después de la eliminación es menor que la página actual,
    // ajusta la página actual al último conjunto de usuarios
    if (updatedcouriers.length < currentPage * couriersPerPage) {
      setCurrentPage(Math.ceil(updatedcouriers.length / couriersPerPage));
    }

    socket.emit('delete courier', { id_courier: courierId })
  };

  const handleEditcourier = (courierId) => {
    // Buscar el usuario correspondiente al ID
    const courierToEdit = couriers.find(courier => courier.id === courierId);
    console.log(courierToEdit)
    // Establecer la información del usuario a editar en el estado
    setEditingcourier(courierToEdit);
    // Mostrar el modal de edición
    setShowModal(true);
  }

  const handleCloseModal = () => {
    // Cerrar el modal y limpiar la información del usuario en edición
    setShowModal(false);
    setEditingcourier(null);
  }

  const handleSaveChanges = () => {
    // Aquí deberías implementar la lógica para guardar los cambios del usuario en tu backend
    // Después de guardar los cambios, actualiza el estado de los usuarios y cierra el modal
    // Por ejemplo, si tienes una función en tu socket para actualizar el usuario, puedes usarla aquí
    // socket.emit('update courier', editingcourier);

    // Una vez que se han guardado los cambios, actualiza el estado de los usuarios y cierra el modal
    const updatedcouriers = couriers.map(courier =>
      courier.id === editingcourier.id ? editingcourier : courier
    );
    setcouriers(updatedcouriers);
    setShowModal(false);
    socket.emit('edit courier', editingcourier)
    console.log(editingcourier)
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
              <Nav.Link as={Link} to="/admin/Restaurants">Restaurants</Nav.Link>
              <Nav.Link as={Link} to="/admin/Couriers"disabled>Couriers</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row>
          <Col>
            <h2>Couriers</h2>
          </Col>
          <Col xs="auto">
            <div className="d-flex">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search courier"
                  aria-label="Search courier"
                  aria-describedby="basic-addon2"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <Button variant="outline-secondary">Search</Button>
              </InputGroup>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Shown couriers
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
                  <Modal.Title>Edit courier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Aquí colocarías los campos para editar la información del usuario */}
                  {editingcourier && (
                    <div className="form-group">
                      <label>First Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingcourier.first_name}
                        onChange={(e) =>
                          setEditingcourier({
                            ...editingcourier,
                            first_name: e.target.value,
                          })
                        }
                      />
                      <label>Last Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingcourier.last_name}
                        onChange={(e) =>
                          setEditingcourier({
                            ...editingcourier,
                            last_name: e.target.value,
                          })
                        }
                      />
                      <label>Email:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingcourier.email}
                        onChange={(e) =>
                          setEditingcourier({
                            ...editingcourier,
                            email: e.target.value,
                          })
                        }
                      />
                      <label>Phone:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editingcourier.phone}
                        onChange={(e) =>
                          setEditingcourier({
                            ...editingcourier,
                            phone: e.target.value,
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
              {subset.map((courier) => (
                <ListGroup.Item key={courier.id}>
                  <div>
                    <h5>{courier.first_name} {courier.last_name}</h5>
                    <p>Email: {courier.email}</p>
                    <Button variant="primary" onClick={() => handleEditcourier(courier.id)}><FaPencilAlt />
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(courier.id)}><FaTrashAlt /></Button>
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
