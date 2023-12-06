import './App.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button';

function App() {


  const [id, setId] = useState('');

  const handleInputChange = (e) => {
    setId(e.target.value);
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Form.Control
        type="number"
        placeholder="Enter ID"
        value={id}
        onChange={handleInputChange}
        min="1"

      />
      <div className="d-flex flex-row justify-content-between mt-3 gap-3">
        <Link to={id ? `/user/${id}` : '/'}><Button className="mb-2">User</Button></Link>
        <Link to={id ? `/restaurant/${id}` : '/'}><Button className="mb-2">Restaurant</Button></Link>
        <Link to={id ? `/courier/${id}` : '/'}><Button className="mb-2">Courier</Button></Link>
        <Link to="/admin"><Button className="mb-2">Admin</Button></Link>
      </div>
    </Container>
  );
}

export default App
