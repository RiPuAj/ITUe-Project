import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Open = (restaurant, socket)  => {

    const [orders, setOrders] = useState([])    

    useEffect(() => {

        socket.on('new order', (order) => {
            setOrders([...orders, order])
          })
    
    }, [])

  

  return(
    <div>
        <section>
            ORDERS
            <ul>

            {
                orders && (
                    orders.map((dish, index) => {
                        return(<li key={index}>{dish.name}
                            <button>READY</button>
                        </li>)
                        
                    })
                    )
            }         
            
            </ul>
        </section>
        <section>
            <Link to={{pathname: `/restaurant/${3}/menu`, state: {}}}>Edit Menu</Link>
        </section>
    </div>)
}

export const Closed = () =>{
    return(
        <h1>CLOSED</h1>
    )
}