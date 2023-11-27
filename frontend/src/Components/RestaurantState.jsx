const handleClick = (index) =>{
    console.log(index)
}

export const Open = ({ restaurant })  => {
    <ul>
        {
            (restaurant.menu).map((dish, index) => {
                return(
                  <li key={index}>
                    <h1>{dish.food}</h1>
                    <h2>{dish.price}</h2>
                    <button onClick={()=> handleClick(index)}>Edit</button>
                    <button>Delete</button>
                  </li>
                )
              })
        }
    </ul>
}

export const Closed = () =>{
    return(
        <h1>CLOSED</h1>
    )
}