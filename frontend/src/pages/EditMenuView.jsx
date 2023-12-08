import { useContext, useEffect, useState } from "react"
import { ClientContext } from "../hooks/contexts"
import { useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import Navbar from 'react-bootstrap/Navbar'
import { TableEditMenu } from "../Components/TableEditMenu";





export const EditMenuView = () => {
    // Estado para el menú de comida
    const [restaurant, setRestaurant] = useState(null)
    const [menu, setMenu] = useState([])

    // Estado para la ventana modal de edición
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFood, setEditFood] = useState('');
    const [editPrice, setEditPrice] = useState();
    const [editItemId, setEditItemId] = useState(null);

    // Estado para la ventana modal de eliminación
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

    // Estado para la ventana modal de adición
    const [showAddModal, setShowAddModal] = useState(false);
    const [newFood, setNewFood] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const { id } = useParams()
    const socket = useContext(ClientContext)

    useEffect(() => {
        if (socket) {
            socket.on('get restaurant', (rest) => {
                setRestaurant(rest.restaurant)
                setMenu([...rest.restaurant.menu])
            })

            socket.emit('get restaurant', { query: { id: id } })
        }
    }, [socket, id])


    // Función para abrir la ventana modal de edición
    const handleEditModal = (id, food, price) => {
        setEditItemId(id);
        setEditFood(food);
        setEditPrice(price);
        setShowEditModal(true);
    };

    // Función para cerrar la ventana modal de edición
    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    // Función para guardar los cambios de edición
    const handleSaveChanges = () => {
        // Lógica para guardar los cambios
        // ...

        menu[editItemId] = {
            food: editFood,
            price: editPrice
        }

        socket.emit('edit menu', {
            id: id,
            newMenu: menu
        })

        setEditFood('')
        setEditPrice('')
        setShowEditModal(false);
    };

    // Función para abrir la ventana modal de eliminación
    const handleDeleteModal = (id) => {
        setDeleteItemId(id);
        setShowDeleteModal(true);
    };

    // Función para cerrar la ventana modal de eliminación
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    // Función para confirmar la eliminación
    const handleDeleteItem = () => {
        // Lógica para eliminar el elemento
        // ...
        menu.splice(deleteItemId, 1)

        socket.emit('edit menu', {
            id: id,
            newMenu: menu
        })

        setShowDeleteModal(false);
    };

    // Función para abrir la ventana modal de adición
    const handleAddModal = () => {
        setShowAddModal(true);
    };

    // Función para cerrar la ventana modal de adición
    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    // Función para agregar un nuevo plato de comida
    const handleAddItem = () => {
        // Lógica para agregar un nuevo plato
        // ...
        const newDish = {
            food: newFood,
            price: newPrice
        }
        setMenu([...menu, newDish])

        socket.emit('edit menu', {
            id: id,
            newMenu: menu
        })
        
        setShowAddModal(false);
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand >Edit Menu</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {restaurant && `Signed in as: ${restaurant.name}`}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <div className="d-flex justify-content-end m-2">
                <Button onClick={handleAddModal}>ADD</Button>
            </div>
            
            <TableEditMenu menu={menu} handleDeleteModal={handleDeleteModal} handleEditModal={handleEditModal} />

            {/* Ventana modal para editar */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Food</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFood">
                            <Form.Label>Food</Form.Label>
                            <Form.Control type="text" placeholder="Enter food" value={editFood} onChange={(e) => setEditFood(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" value={editPrice} onChange={(e) => setEditPrice(parseFloat(e.target.value))} min={0.01}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseEditModal}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Ventana modal para eliminar */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteItem}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Ventana modal para agregar */}
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Food</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNewFood">
                            <Form.Label>Food</Form.Label>
                            <Form.Control type="text" placeholder="Enter food" onChange={(e) => setNewFood(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formNewPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" onChange={(e) => setNewPrice(e.target.value)} min={0.01}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddItem}>
                        Add Food
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};