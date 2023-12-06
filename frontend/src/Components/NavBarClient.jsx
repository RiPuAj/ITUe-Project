import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import '../styles/clientView.css'
import { FaShoppingBasket } from "react-icons/fa";


export const NavBarClient = ({ name, text_btn, basket }) => {

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
                        <Button variant="light" onClick={handleShow}><FaShoppingBasket/></Button>
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
                            <ul>
                                {basket.map((item, index) => (
                                    <li key={index}>
                                        {item.name} - {item.price}
                                    </li>
                                ))}
                            </ul>
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