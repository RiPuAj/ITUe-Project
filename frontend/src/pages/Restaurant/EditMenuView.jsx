// Done by Javier Pulido

import { useContext, useEffect, useState } from "react"
import { ClientContext } from "../../hooks/contexts"
import { useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import Navbar from 'react-bootstrap/Navbar'
import { TableEditMenu } from "../../Components/TableEditMenu";

export const EditMenuView = () => {

    // Estado para el menú de comida
    // States for dish menu
    const [restaurant, setRestaurant] = useState(null)
    const [menu, setMenu] = useState([])

    // Estado para la ventana modal de edición
    // States for edition window modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFood, setEditFood] = useState('');
    const [editPrice, setEditPrice] = useState();
    const [editItemId, setEditItemId] = useState(null);

    // Estado para la ventana modal de eliminación
    // States for elimination window modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

    // Estado para la ventana modal de adición
    // States for edition window modal
    const [showAddModal, setShowAddModal] = useState(false);
    const [newFood, setNewFood] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const { id } = useParams()
    const socket = useContext(ClientContext)

    // Hook when render the component at the first time
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
    // Function to close edition window modal
    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    // Función para guardar los cambios de edición
    // Function to save changes when edit
    const handleSaveChanges = () => {

        if(!(editFood)|| !(editPrice)) return
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
    // Function to open the delete window modal
    const handleDeleteModal = (id) => {
        setDeleteItemId(id);
        setShowDeleteModal(true);
    };

    // Función para cerrar la ventana modal de eliminación
    // Function to close the delete window modal
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    // Función para confirmar la eliminación
    // Function to confirm the elimination
    const handleDeleteItem = () => {

        menu.splice(deleteItemId, 1)

        socket.emit('edit menu', {
            id: id,
            newMenu: menu
        })

        setShowDeleteModal(false);
    };

    // Función para abrir la ventana modal de adición
    // Function to open edit window modal
    const handleAddModal = () => {
        setShowAddModal(true);
    };

    // Función para cerrar la ventana modal de adición
    // Function to close add window modal
    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    // Función para agregar un nuevo plato de comida
    // Function to add new dish
    const handleAddItem = () => {
        // Lógica para agregar un nuevo plato
        // Logic to add new dish

        if (!(newFood) || !(newPrice)) return

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
            {/*
                Barra de navegacioón
                Navigation bar
            */}
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

            {/* 
                Botón para añadir comida
                Button to add dish
            */}
            <div className="d-flex justify-content-end m-2">
                <Button onClick={handleAddModal}>ADD</Button>
            </div>

            <TableEditMenu menu={menu} handleDeleteModal={handleDeleteModal} handleEditModal={handleEditModal} />

            {/* 
                Ventana modal para editar 
                Window modal to edit
            */}
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
                            <Form.Control type="number" placeholder="Enter price" value={editPrice} onChange={(e) => setEditPrice(parseFloat(e.target.value))} min={0.01} />
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

            {/* 
                Ventana modal para eliminar 
                Window modal to confirm the elimination of dish
            */}
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

            {/* 
                Ventana modal para agregar 
                Window modal to add new dish
            */}
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
                            <Form.Control type="number" placeholder="Enter price" onChange={(e) => setNewPrice(e.target.value)} min={0.01} />
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