import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientContext } from "../hooks/contexts";
import { NavBarRestaurant } from "../Components/NavBarRestaurant.jsx";


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
          <NavBarRestaurant name={restaurant.name} link={`/restaurant/${id}/edit_menu`} text_btn="EDIT MENU"/>
        )
      }
      <div>
        <h1>ORDERS</h1>
        {/*orders.map((order)=>(
           <Link to={`/restaurant/${id}/order/${order.id}`} key={order.id}>
                <h2 className="order-id">{order.id}</h2>
            </Link>
        ))

        */}
      </div>
    </div>
  );
}
export default RestaurantView;

