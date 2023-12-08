import { readJSON } from '../../utils.js'
import { randomUUID } from 'node:crypto'

const restaurantsInformation = readJSON('./models/local-file-sys/local-storage/MOCK_DATA.json')
const users = readJSON('./models/local-file-sys/local-storage/users.json')
var connectedCouriers = []
var connectedRestaurants = []
var connectedUsers = []

const findRestaurant = ({ id }) => {
    const restaurant = restaurantsInformation.find(rest => rest.id == id)
    return restaurant
    
}



export class AppModel {

    static getAllRestaurants(){
        const basicInfo = restaurantsInformation.map(rest => {
            return(
                {
                    id: rest.id,
                    name: rest.name,
                    rating: rest.rating
                }
            )
        })

        return basicInfo
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

    static updateMenu({ id, newMenu }){

        const restaurantIndex = restaurantsInformation.findIndex(res => res.id == id)

        if( restaurantIndex < 0) return false


        restaurantsInformation[restaurantIndex].menu = newMenu

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

    static getAllUsers(){
        return users
    }

    static getUser({ id }){
        const user = users.find(user => user.id == id)

        return user
    }

    static addConnectedRestaurant({idRest, idSocket}){
        const restaurant = {
            id_restaurant: idRest,
            id_socket: idSocket
        }

        const existConnected = connectedRestaurants.map((rest) => {
            return rest.id_restaurant == idRest
        })

        if(!existConnected.includes(true)){
            connectedRestaurants.push(restaurant)
            return true
        }

        return false
    }

    static removeConnectedRestaurant({ idRest }){
        const restIndex = connectedRestaurants.findIndex(info => info.id_restaurant == idRest)

        if (restIndex < 0) return false

        connectedRestaurants.splice(restIndex, 1)

        return true
    }

    static getSocketId({ idRest }){
        const socketId = connectedRestaurants.filter(infoSocket => {
            if(infoSocket.id_restaurant == idRest) return infoSocket.id_socket
        })

        return false
    }

    static getActiveCouriers(){
        return connectedCouriers
    }

    static getActiveRestaurants(){
        console.log(connectedRestaurants)
        return connectedRestaurants
    }

    static getActiveUsers(){
        return connectedUsers
    }
}