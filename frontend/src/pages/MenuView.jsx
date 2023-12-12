//Done by Pablo Villegas
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ClientContext } from "../hooks/contexts"
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { MdAddShoppingCart } from "react-icons/md";
import Table from 'react-bootstrap/Table';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import ListGroup from 'react-bootstrap/ListGroup';

export const MenuView = () => {

    const { id, id_restaurant } = useParams()
    const socket = useContext(ClientContext)
    const [restaurant, setRestaurant] = useState(null)
    const [basket, setBasket] = useState([])
    const [itemToBasket, setItemToBasket] = useState(null)
    const [total, setTotal] = useState(0)
    const [user, setUser] = useState()

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

            socket.on('get client', (user) => {
                setUser(user)
            })

            socket.emit('get client', {
                query: {
                    id: id
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

    const makeOrder = () => {
        socket.emit('add order', {
            query: {
                id_restaurant: restaurant.id,
                id_user: user.id,
                order: basket
            }
        })
        setBasket([])
        setTotal(0)
    }

    return (
        <div>


            {
                restaurant && (
                    <div>
                        <>
                            <Navbar bg="dark" variant="dark">
                                <Container>
                                    <Navbar.Brand>{restaurant.name}</Navbar.Brand>
                                    <Navbar.Toggle />
                                </Container>
                            </Navbar>

                        </>
                        <Row style={{ height: '100vh' }}>

                            <Col xs={9} style={{height:'100%', borderRight: 'solid 2px'}}>
                                <Table striped bordered hover variant="clear">
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
                                </Table>
                            </Col>
                            <Col xs={3}>
                                <div className="sidebar-header">
                                    <h3>Basket</h3>
                                </div>

                                <div className="sidebar-body">
                                    {basket && basket.length > 0 ? (
                                        <div>
                                            <ListGroup>
                                                {basket.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <div className="col">{item.food}</div>
                                                        <div className="col">{item.price} x{item.quantity}</div>
                                                        <div className="col-auto">
                                                            <Button variant="danger" onClick={() => updateBasket(item)}>
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                            <div className="mt-3">
                                                <h5>Total: {total.toFixed(2)}€</h5>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>No items in the basket</p>
                                    )}
                                </div>

                                <Row>
                                    <Col xs={12} className="border-top" style={{ position: 'fixed', bottom: 5, width: '25%' }}>
                                        <Button variant="success" onClick={() => makeOrder()}>Make order</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                )
            }
        </div>
    )
}