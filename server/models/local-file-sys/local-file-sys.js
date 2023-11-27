import { readJSON } from '../../utils.js'
import { randomUUID } from 'node:crypto'

const restaurantsInformation = readJSON('./models/local-file-sys/local-storage/restaurants.json')

const users = readJSON('./models/local-file-sys/local-storage/users.json')

const findRestaurant = ({ id }) => {
    const restaurant = restaurantsInformation.find(rest => rest.id == id)

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
        
        if(restaurant == undefined) return restaurant

        return restaurant.menu
    }

    static updateMenu({ id, result }){

        const restaurantIndex = restaurantsInformation.findIndex(res => res.id == id)

        if( restaurantIndex < 0) return false

        const updatedMenu = {
            ...restaurantsInformation[restaurantIndex].menu,
            ...result.data.menu
        }

        restaurantsInformation[restaurantIndex].menu = updatedMenu

        return true
    }

    static createRestaurant(object){
 
        const newRestaurant = {
            id: randomUUID(),
            ...object.data
        }
    
        restaurantsInformation.push(newRestaurant)

        return newRestaurant
    }

    static getOpenRestaurants(){
        const openRestaurants = restaurantsInformation.filter(rest =>{
            return rest.open == true
        })

        return openRestaurants
    }

    static setOpen({ id }){
        const restaurant = findRestaurant({ id })
        
        console.log(restaurant.open)
        restaurant.open = restaurant.open ? false : true

        return restaurant.open

    }

    static getAllUsers(){
        return users
    }

    static getUser({ id }){
        const user = users.find(user => user.id == id)

        return user
    }
}