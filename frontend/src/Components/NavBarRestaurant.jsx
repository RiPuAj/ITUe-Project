import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export const NavBarRestaurant = ({name, link, text_btn}) => {


    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>{name}</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Link to={link}>
                        <Button variant="light">{text_btn}</Button>
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}