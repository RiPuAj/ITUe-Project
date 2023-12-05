export const MenuRestaurant = () => {

    return (
        <div>
            <button onClick={() => setClickedRestaurant(false)}>ATRAS</button>
            <h1>{restaurant.name}</h1>
            <ul>
                {
                    restaurant.menu.map((dish, index) => {
                        return (<li key={index}>
                            {dish.food}
                            <input type="number" />
                            <button>ADD TO CART</button>
                        </li>)
                    })
                }
            </ul>
        </div>
    )

}