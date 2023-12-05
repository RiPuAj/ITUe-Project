import { useState } from "react"

export const NewDishPopUp = (updateMenu, setShowPopUp) => {

    const [newDish, setNewDish] = useState({food: null, price: null})

    const handleClick = (e) =>{
        e.preventDefault()

        if(!(newDish.food == null || newDish.price == null)){
            updateMenu(newDish)
            return true
        }

        return false

    }

    const handleChange = (e) =>{
        const {name, value} = e.target
        newDish[name] = value
        console.log(newDish)
    }

    return(
        <form action="submit" onSubmit={handleClick}>
            <input id="dishName" name="food" type="text" placeholder="Dish name" onChange={(e) => handleChange(e)}/>
            <input id="dishPrice" name="price" type="number" placeholder="Dish price" onChange={(e) => handleChange(e)}/>
            <button>Add Dish</button>
        </form>
    )
}