import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const URL = 'http://localhost:3000/restaurants'

const ClientView = () => {

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        fetch(URL, {
          method: 'GET'
        })
          .then(res => res.json())
          .then(data => setRestaurants(data))
        }
    ,[])
    
    return (
        <div>
            <ul>
                {
                restaurants.map((rest) =>{
                    return(
                        <li key={rest.id}>
                            <Link key={rest.id} to={`/restaurant/${rest.id}`}/>
                            {rest.name}
                        </li>
                    )
                })
                }
            </ul>
        </div>
    );
  };
  
export default ClientView;