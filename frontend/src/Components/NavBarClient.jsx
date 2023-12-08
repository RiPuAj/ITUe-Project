import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import '../styles/clientView.css'
import { FaShoppingBasket } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";


export const NavBarClient = ({ name, basket, total }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>{name}</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="light" onClick={handleShow}><FaShoppingBasket /></Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Basket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {basket && basket.length > 0 ? (
                        <div>
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
                                    <div className="col"><strong>Food</strong></div>
                                    <div className="col"><strong>Quantity</strong></div>
                                    <div className="col-auto"><strong>Actions</strong></div>
                                </li>
                                {basket.map((item, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div className="col">{item.food}</div>
                                        <div className="col">{item.quantity}</div>
                                        <div className="col-auto">
                                            <Button variant='danger' onClick={()=>{
                                                updateBasket
                                            }}><FaRegTrashAlt /></Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-3">
                                <h5>Total: {total.toFixed(2)}€</h5>
                            </div>
                        </div>
                    ) : (
                        <p>No items in the basket</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Make Order</Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}