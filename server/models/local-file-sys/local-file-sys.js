import { readJSON } from '../../utils.js'
import { randomUUID } from 'node:crypto'

const restaurantsInformation = readJSON('./models/local-file-sys/local-storage/MOCK_DATA.json')
const users = readJSON('./models/local-file-sys/local-storage/users.json')
const couriers = readJSON('./models/local-file-sys/local-storage/couriers.json')

var connectedCouriers = []
var connectedRestaurants = []
var connectedUsers = []
var orders = []
var nonActiveCouriers = []

const OrderStatus = {
    PendingAcceptance: 'Pending Acceptance',
    AcceptedByRestaurant: 'Accepted by Restaurant',
    Preparing: 'Preparing',
    AcceptedByDriver: 'Accepted by Driver',
    OnTheWay: 'On the Way',
    Received: 'Received'
  }

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

    static removeConnectedRestaurant({ idSocket }){
        const restIndex = connectedRestaurants.findIndex(info => info.id_socket == idSocket)

        if (restIndex < 0) return false

        connectedRestaurants.splice(restIndex, 1)

        return true
    }

    static addConnectedUser({idUser, idSocket}){
        const user = {
            id_user:idUser,
            id_socket: idSocket
        }

        const existConnected = connectedUsers.map((user) => {
            return user.id_user == idUser
        })

        if(!existConnected.includes(true)){
            connectedUsers.push(user)
            return true
        }

        return false
    }

    static removeConnectedUser({ idSocket }){

        const userIndex = connectedUsers.findIndex(user => user.id_socket == idSocket)

        if (userIndex < 0) return false

        connectedUsers.splice(userIndex, 1)

        return true
    }

    static addConnectedCourier({ idCourier, idSocket }){
        const user = {
            id_courier:idCourier,
            id_socket: idSocket
        }

        const existConnected = connectedCouriers.map((courier) => {
            return courier.id_courier == idCourier
        })

        if(!existConnected.includes(true)){
            connectedCouriers.push(user)
            return true
        }

        return false
    }

    static removeConnectedCourier({ idSocket }){

        const courierIndex = connectedCouriers.findIndex(courier => courier.id_socket == idSocket)

        if (courierIndex < 0) return false

        connectedCouriers.splice(courierIndex, 1)

        return true
    }

    static getSocketId({ idRest }){

        const socketIdIndex = connectedRestaurants.findIndex(con => con.id_restaurant == idRest)
        
        if(socketIdIndex > -1){
            return connectedRestaurants[socketIdIndex].id_socket
        }

        return false
    }

    static getActiveCouriers(){
        return connectedCouriers
    }

    static getActiveRestaurants(){
        return connectedRestaurants
    }

    static getActiveUsers(){
        return connectedUsers
    }

    static addOrder({query}){
        const order = {id: randomUUID(), restaurant_id: query.restaurant, user_id: query.user, order: query.order, status: OrderStatus.PendingAcceptance}
        orders.push(order)
    }

    static getCourier({ idCourier }){
        const courier = couriers.find(c => c.id == idCourier)
        console.log(courier)
        return courier
    }

    static setNonActiveCourier({ id }){
        const indexCourier = connectedCouriers.findIndex(courier => courier.id = id)

        nonActiveCouriers.push(connectedCouriers[indexCourier])
        connectedCouriers.slice(indexCourier, 1)
    }
}