import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientContext } from "../hooks/contexts";
import { NavBarRestaurant } from "../Components/NavBarRestaurant.jsx";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/esm/Button.js";


const RestaurantView = () => {

  //const [isConnected, setIsConnected] = useState(socket.connected)
  const [restaurant, setRestaurant] = useState()
  const [orders, setOrders] = useState([])

  // Take params from URL
  const { id } = useParams()
  const socket = useContext(ClientContext)

  useEffect(() => {
    if (socket) {

      socket.on('get restaurant', (restaurant) => {
        setRestaurant(restaurant.restaurant)
      })

      socket.on('new order', (newOrder) => {
        setOrders([...orders, newOrder])
      })

      socket.emit('connected', {
        query:{
          id: id,
          typeClient: 'restaurant'
        }
      })

      socket.emit('get restaurant', {
        query: { id: id }
      })
    }

    return() => socket.disconnect()
  }, [socket])


  return (
    <div>
      {
        restaurant && (
          <NavBarRestaurant name={restaurant.name} link={`/restaurant/${id}/edit_menu`} text_btn="EDIT MENU" />
        )
      }
      <div>
        <h1>ORDERS</h1>
        {orders.length < 1 ?

          <div className="d-flex justify-content-center">
            <h1>No orders already</h1>
          </div>

          : <h1>SI order</h1>}

        {/*<Modal show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Nueva Orden</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="danger" onClick={handleReject}>
              Reject
            </Button>
            <Button variant="" onClick={handleAccept}>
              Accept
            </Button>
          </Modal.Footer>
        </Modal>*/}
      </div>
    </div>
  );
}
export default RestaurantView;

