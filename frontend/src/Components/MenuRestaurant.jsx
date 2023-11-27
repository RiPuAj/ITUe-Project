import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RESTAURANT_ENDPOINT = 'http://localhost:3000/restaurants'

export const MenuView = () => {

  const [restaurant, setRestaurant] = useState()

  const { id_restaurant } = useParams()

  const getRestaurant = async () =>{
    await fetch(`${RESTAURANT_ENDPOINT}/${id_restaurant}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(data => setRestaurant(data))
  }

  useEffect(() =>{
    console.log(id_restaurant)
    getRestaurant()

  }, [])

  const handleClick = (index) => {
    console.log(restaurant.menu[index])
  }

  return (
    <div>
      <ul>
        {
          restaurant && ((restaurant.menu).map((dish, index) => {
            return(
              <li key={index}>
                <h1>{dish.food}</h1>
                <h2>{dish.price}</h2>
                <button onClick={()=> handleClick(index)}>Pulsa</button>
              </li>
            )
          }))
        }
      </ul>
    </div>
  );
};