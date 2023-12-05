export const ListDishes = ({ restaurant }) => {

    return(
        <ul>
            {
              (restaurant.menu).map((dish, index) => {
                    return(<li key={index}>
                      <h1>{dish.food}</h1>
                      <h2>{dish.price}</h2>
                      <button onClick={}>Edit</button>
                      <button>Delete</button>
                    </li>)
                 })
            }
        </ul>)
}