import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ClientContext } from "../hooks/contexts"
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { FaShoppingBasket } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import Table from 'react-bootstrap/Table';

export const MenuView = () => {

    const { id, id_restaurant } = useParams()
    const socket = useContext(ClientContext)
    const [restaurant, setRestaurant] = useState(null)
    const [basket, setBasket] = useState([])
    const [itemToBasket, setItemToBasket] = useState(null)
    const [total, setTotal] = useState(0)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (socket) {
            socket.on('get restaurant', (restaurant) => {
                setRestaurant(restaurant.restaurant)
            })

            socket.emit('get restaurant', {
                query: {
                    id: id_restaurant
                }
            })
        }


    }, [socket])

    const updateBasket = (item) => {
        const indexItem = basket.findIndex(i => i.id == item.id)
        console.log(updateBasket)
        const updatedBasket = [...basket]
        updatedBasket.splice(indexItem, 1)
        setBasket(updatedBasket);

        const newt = total - (item.price * item.quantity);
        setTotal(newt);

    }

    const addToBasket = (item) => {
        const updatedBasket = [...basket];

        const existingDishIndex = updatedBasket.findIndex(i => i.id == item.id);

        if (existingDishIndex > -1) {
            const newTotal = total - (updatedBasket[existingDishIndex].price * updatedBasket[existingDishIndex].quantity) + (item.price * item.quantity)
            updatedBasket[existingDishIndex].quantity = item.quantity;

            setTotal(newTotal)

        } else {
            updatedBasket.push(item);
            const newTotal = total + (item.price * item.quantity)
            setTotal(newTotal)
        }

        setBasket(updatedBasket);
    };

    return (
        <div>


            {
                restaurant && (
                    <div>
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
                                                {basket.map((item, index) => (
                                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                        <div className="col">{item.food}</div>
                                                        <div className="col">{item.price} x{item.quantity}</div>
                                                        <div className="col-auto">
                                                            <Button variant='danger' onClick={() => {
                                                                updateBasket(item)
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
                        <><Table striped bordered hover variant="clear">
                            {<><thead>
                                <tr>
                                    <th>Dish</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    restaurant.menu.map((dish, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{dish.food}</td>
                                                <td>{dish.price}</td>
                                                <td>
                                                    <input type="number" id={`quantity_${index}`} placeholder="0" onChange={(e) => {
                                                        if (e.target.value > 0) {
                                                            setItemToBasket(
                                                                { ...dish, quantity: e.target.value, id: index }
                                                            )
                                                        }
                                                    }} />

                                                </td>
                                                <td>
                                                    <Button variant="success" onClick={() => {
                                                        addToBasket(itemToBasket);
                                                        setItemToBasket(null)

                                                    }}>
                                                        <MdAddShoppingCart />
                                                    </Button>{' '}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody></>}
                        </Table></>
                    </div>
                )
            }
        </div>
    )
}