//Done by Pablo Villegas
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ClientContext } from "../../hooks/contexts.jsx";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/esm/Container.js";

export const ClientView = () => {

    const [restaurants, setRestaurants] = useState([])
    const [user, setUser] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const restaurantsPerPage = 7;
    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

    const { id } = useParams()
    const socket = useContext(ClientContext)

    useEffect(() => {
        if (socket) {

            socket.on('get client', (client) => {
                setUser(client)
            })

            socket.on('get all restaurants', async (rests) => {
                setRestaurants(rests)
            })

            socket.emit('connected', {
                query: {
                    id: id,
                    typeClient: 'user'
                }
            })

            socket.emit('get all restaurants')
            socket.emit('get client', {
                query: {
                    id: id
                }
            })
        }
    }, [socket])

    const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand >{user && (`Welcome ${user.first_name} ${user.last_name}!`)}</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {user && `Signed in as ID: ${user.id}`}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="col">
                {currentRestaurants.map((rest, index) => (
                    <div key={index} className="col-lg-4 mb-3">
                        <Card as={Link} to={`/user/${id}/restaurant/${rest.id}`}>
                            <Card.Body>
                                <Card.Title>{rest.name}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Rating: {rest.rating}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button variant="primary" key={index + 1} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Button>
                ))}
            </div>
        </div>
    );
};

