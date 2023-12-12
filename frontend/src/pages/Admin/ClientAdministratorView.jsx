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



export const ClientAdministratorView = () => {

  const socket = useContext(ClientContext)

  const [totalPages, setTotalPages] = useState([])
  const [users, setUsers] = useState([])
  const [usersPerPage, setUsersPerPage] = useState(5)

  const [subset, setSubset] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);


  useEffect(() => {
    if (socket) {

      socket.emit('get all users')

      socket.on('get all users', (data) => {
        console.log(data)
        setUsers(data)
        setTotalPages(Math.ceil(data.length / usersPerPage))
        setSubset(data.slice(currentPage * usersPerPage, (currentPage * usersPerPage) + usersPerPage))
      })


    }

  }, [socket])

  const handlePrevClick = () => {
    const newPage = currentPage - 1
    setCurrentPage(newPage)
    setSubset(users.slice(newPage * usersPerPage, (newPage * usersPerPage) + usersPerPage))
  }

  const handleNextClick = () => {
    const newPage = currentPage + 1
    setCurrentPage(newPage)
    setSubset(users.slice(newPage * usersPerPage, (newPage * usersPerPage) + usersPerPage))
  }

  const handleDropdownClick = (newUsersPerPage) => {
    setTotalPages(Math.ceil(users.length / newUsersPerPage));
    setUsersPerPage(newUsersPerPage);
    setCurrentPage(1); // Restablecer la página actual a 1 cuando cambias la cantidad de usuarios por página
    setSubset(users.slice(0, newUsersPerPage));
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    // Realizar la búsqueda si se han escrito al menos tres letras
    if (value.length >= 3) {
      const filteredUsers = users.filter(user =>
        user.first_name.toLowerCase().includes(value.toLowerCase()) ||
        user.last_name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
      );
      setSubset(filteredUsers);
    } else {
      // Si el valor del buscador es menor a tres letras, muestra todos los usuarios
      setSubset(users.slice(currentPage * usersPerPage, (currentPage * usersPerPage) + usersPerPage));
    }
  };

  const handleDelete = (userId) => {
    // Filtrar los usuarios para obtener aquellos que no coincidan con el ID del usuario a eliminar
    const updatedUsers = users.filter(user => user.id !== userId);

    // Actualizar el estado de los usuarios con la nueva lista filtrada
    setUsers(updatedUsers);

    // Si el usuario eliminado está en la página actual, actualiza el subset mostrado
    const updatedSubset = updatedUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
    setSubset(updatedSubset);

    // Si el número total de usuarios después de la eliminación es menor que la página actual,
    // ajusta la página actual al último conjunto de usuarios
    if (updatedUsers.length < currentPage * usersPerPage) {
      setCurrentPage(Math.ceil(updatedUsers.length / usersPerPage));
    }
  };

  const handleEditUser = (userId) => {
    // Buscar el usuario correspondiente al ID
    const userToEdit = users.find(user => user.id === userId);
    console.log(userToEdit)
    // Establecer la información del usuario a editar en el estado
    setEditingUser(userToEdit);
    // Mostrar el modal de edición
    setShowModal(true);
  }

  const handleCloseModal = () => {
    // Cerrar el modal y limpiar la información del usuario en edición
    setShowModal(false);
    setEditingUser(null);
  }

  const handleSaveChanges = () => {
    // Aquí deberías implementar la lógica para guardar los cambios del usuario en tu backend
    // Después de guardar los cambios, actualiza el estado de los usuarios y cierra el modal
    // Por ejemplo, si tienes una función en tu socket para actualizar el usuario, puedes usarla aquí
    // socket.emit('update user', editingUser);

    // Una vez que se han guardado los cambios, actualiza el estado de los usuarios y cierra el modal
    const updatedUsers = users.map(user =>
      user.id === editingUser.id ? editingUser : user
    );
    setUsers(updatedUsers);
    setShowModal(false);
  }

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

      <Container className="mt-4">
        <Row>
          <Col>
            <h2>Users</h2>
          </Col>
          <Col xs="auto">
            <div className="d-flex">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search User"
                  aria-label="Search User"
                  aria-describedby="basic-addon2"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <Button variant="outline-secondary">Search</Button>
              </InputGroup>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Shown Users
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
                  <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Aquí colocarías los campos para editar la información del usuario */}
                  {editingUser && (
                    <div>
                      <label>First Name:</label>
                      <input
                        type="text"
                        value={editingUser.first_name}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            first_name: e.target.value
                          })
                        }
                      />
                      <label>Last Name:</label>
                      <input
                        type="text"
                        value={editingUser.last_name}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            last_name: e.target.value
                          })
                        }
                      />
                      <label>Email:</label>
                      <input
                        type="text"
                        value={editingUser.email}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            email: e.target.value
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
              {subset.map((user) => (
                <ListGroup.Item key={user.id}>
                  <div>
                    <h5>{user.first_name} {user.last_name}</h5>
                    <p>Email: {user.email}</p>
                    <Button variant="primary" onClick={() => handleEditUser(user.id)}><FaPencilAlt />
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(user.id)}><FaTrashAlt /></Button>
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