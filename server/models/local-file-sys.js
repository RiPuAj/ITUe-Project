import { readJSON } from '../utils.js'
import { randomUUID } from 'node:crypto'
import { validateRestaurant, validatePartialRestaurant } from '../Schemas/restaurant-schemas.js'

const restaurantsInformation = readJSON('../example.json')

const findRestaurant = ({ id }) => {
    const restaurant = restaurantsInformation.find(rest => rest.id == id)
    
    if (restaurant == undefined){
        return {error: "NO SE ENCONTRO"}
    }

    return restaurant
    
}

export class AppModel {
    static async getAllRestaurants(){
        return restaurantsInformation
    }

    static getRestaurant({ id }){
        const restaurant = findRestaurant({ id })
        return restaurant
    }

    static getMenu({ id }){
        const restaurant = findRestaurant({ id })
        

        return restaurant.menu
    }

    static modifyMenu({ id, result }){

        const restaurantIndex = restaurantsInformation.findIndex(res => res.id == id)

        const updatedMenu = {
            ...restaurantsInformation[restaurantIndex].menu,
            ...result.data.menu
        }

        restaurantsInformation[restaurantIndex].menu = updatedMenu

        return restaurantsInformation[restaurantIndex]
    }

    static createRestaurant(object){
 
        const newRestaurant = {
            id: randomUUID(),
            ...object.data
        }
    
        restaurantsInformation.push(newRestaurant)

        return newRestaurant
    }
}