import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { ClientContext } from "../hooks/contexts";

/*const useSocket = ({ id }) =>{
  // Connect Client to Server
  const [socket, setSocket] = useState(null)

  const newSocket = io('http://localhost:3000', {
    query: {
      typeClient: 'restaurant',
      id: id
    }
    
    return(
      socket
    )
  })
}*/

const RestaurantView = () => {

  //const [isConnected, setIsConnected] = useState(socket.connected)
  const [restaurant, setRestaurant] = useState()
  const [orders, setOrders] = useState([])
  const [editMenu, setEditMenu] = useState(false)
  const [menu, setMenu] = useState()

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

      socket.emit('get restaurant', {
        query: { id: id }
      })
    }
  }, [socket])

  /*const connectSocket = ({ id }) => {

    // Connect Client to Server
    const newSocket = io('http://localhost:3000', {
      query: {
        typeClient: 'restaurant',
        id: id
      }

    })

    newSocket.on('get restaurant', async (rest) => {
      setRestaurant(rest.restaurant)
      setMenu(JSON.parse(JSON.stringify(rest.restaurant.menu)))
      console.log(rest.restaurant.menu)
    })

    newSocket.on('new order', (order) => {
      setOrders([...orders, order])
    })

    newSocket.emit('get restaurant')

    setSocket(newSocket)
  }


  useEffect(() => {

    // Connect with the server
    if (!socket) {
      connectSocket({ id })
    }
  }, [])*/

  const handleClickMenu = () => {

    // Menu not saved
    if (!(JSON.stringify(restaurant.menu) == JSON.stringify(menu))) {
      setMenu(JSON.parse(JSON.stringify(restaurant.menu)))
    }
    console.log(menu)

    setEditMenu(editMenu ? false : true)
  }

  const handleOnChange = (e, index) => {
    const { name, value } = e.target
    const updatedMenu = [...menu]
    updatedMenu[index][name] = value
    setMenu(updatedMenu)
  }

  const handleSave = () => {
    if (!(JSON.stringify(restaurant.menu) == JSON.stringify(menu))) {
      const updatedRestaurant = JSON.parse(JSON.stringify(restaurant))
      updatedRestaurant.menu = menu
      console.log([...menu, ...menu])
      //socket.emit('update menu', )
    }
  }

  return (
    <div>
      {
        restaurant && (
          <nav>
            <h1>{restaurant.name}</h1>
            <button>
              {
                <Link to={`/restaurant/${id}/edit_menu`}>Edit Menu</Link>
              }
            </button>
          </nav>
        )
      }
      <div>
        <h1>Edit</h1>
      </div>
    </div>
  );
};

export default RestaurantView;

