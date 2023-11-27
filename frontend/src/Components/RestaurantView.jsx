import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Open, Closed } from './RestaurantState'

const RESTAURANT_ENDPOINT = 'http://localhost:3000/restaurants'

const RestaurantView = () => {

  const [restaurant, setRestaurant] = useState()

  const { id } = useParams()

  const getRestaurant = () =>{
    fetch(`${RESTAURANT_ENDPOINT}/${id}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(data => setRestaurant(data))
  }

  useEffect(() =>{
    
    getRestaurant()

  }, [])

  const setOpenState = () => {
    console.log('ABIERTO')
  }

  return (
    <div>
      {
      restaurant && (
        <nav>
          <h1>{restaurant.name}</h1>
          <button id="open-btn" onClick={setOpenState}>
          {
            restaurant.open ? 'CLOSED' : 'OPEN'
          }
          </button>
        </nav>
      )
      }
      <div>
        {
          restaurant && (restaurant.open ? <Open restaurant={restaurant}/> : <Closed/>)
        }
      </div>
    </div>
  );
};

export default RestaurantView;