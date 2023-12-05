import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

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
  const [socket, setSocket] = useState(null)
  const [orders, setOrders] = useState([])
  const [editMenu, setEditMenu] = useState(false)
  const [menu, setMenu] = useState()

  // Take params from URL
  const { id } = useParams()

  const connectSocket = ({ id }) => {

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
  }, [])

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
            <button onClick={handleClickMenu}>
              {
                editMenu ? 'Close Edit Menu' : 'Open Edit Menu'
              }
            </button>
          </nav>
        )
      }
      <div>
        {

          editMenu ?
            (
              <div>
                <ul>
                  {
                    menu && menu.map((dish, index) => {
                      return (<li key={index}>
                        <input name="food" type="text" value={dish.food} onChange={(e) => handleOnChange(e, index)} />
                        <input name="price" type="number" value={dish.price} onChange={(e) => handleOnChange(e, index)} />
                        <button>Delete</button>
                      </li>)
                    })
                  }
                  <button>Add New Dish</button>
                  <button onClick={handleSave}>Save Menu</button>
                </ul>
              </div>
            )
            : (<div>
              <h1>OPEN</h1>
              <h2>ORDERS</h2>
            </div>
            )

        }
      </div>
    </div>
  );
};

export default RestaurantView;

