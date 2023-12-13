// Done by Javier Pulido, Pablo Villegas, Nicolás Marcelo and Manuel Burgos

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

const findRestaurant = ({ id }) => {
    const restaurant = restaurantsInformation.find(rest => rest.id == id)
    return restaurant

}



export class AppModel {

    static getAllRestaurants() {

        return restaurantsInformation
    }

    
    static getRestaurant({ id }) {
        const restaurant = findRestaurant({ id })
        return restaurant
    }

    static getMenu({ id }) {
        const restaurant = findRestaurant({ id })

        if (restaurant == undefined) return restaurant

        return restaurant.menu
    }

    static updateMenu({ id, newMenu }) {

        const restaurantIndex = restaurantsInformation.findIndex(res => res.id == id)

        if (restaurantIndex < 0) return false


        restaurantsInformation[restaurantIndex].menu = newMenu

        return true
    }

    static createRestaurant(object) {

        const newRestaurant = {
            id: randomUUID(),
            ...object.data
        }

        restaurantsInformation.push(newRestaurant)

        return newRestaurant
    }

    static getAllUsers() {
        return users
    }

    static getAllCouriers() {
        return couriers
    }

    //Done by Pablo Villegas
    static getUser({ id }) {
        const user = users.find(user => user.id == id)

        return user
    }

    static addConnectedRestaurant({ idRest, idSocket }) {
        const restaurant = {
            id_restaurant: idRest,
            id_socket: idSocket
        }

        const existConnected = connectedRestaurants.map((rest) => {
            return rest.id_restaurant == idRest
        })

        if (!existConnected.includes(true)) {
            connectedRestaurants.push(restaurant)
            return true
        }

        return false
    }

    static removeConnectedRestaurant({ idSocket }) {
        const restIndex = connectedRestaurants.findIndex(info => info.id_socket == idSocket)
        orders.filter(order => {
            console.log(order.restaurant.id, connectedRestaurants[restIndex].id_restaurant)
            return order.restaurant.id !== connectedRestaurants[restIndex].id_restaurant
        })
        console.log(orders)

        if (restIndex < 0) return false

        connectedRestaurants.splice(restIndex, 1)

        return true
    }

    static addConnectedUser({ idUser, idSocket }) {
        const user = {
            id_user: idUser,
            id_socket: idSocket
        }

        const existConnected = connectedUsers.map((user) => {
            return user.id_user == idUser
        })

        if (!existConnected.includes(true)) {
            connectedUsers.push(user)
            return true
        }

        return false
    }

    static removeConnectedUser({ idSocket }) {

        const userIndex = connectedUsers.findIndex(user => user.id_socket == idSocket)

        if (userIndex < 0) return false

        connectedUsers.splice(userIndex, 1)

        return true
    }

    static addConnectedCourier({ idCourier, idSocket }) {
        const user = {
            id_courier: idCourier,
            id_socket: idSocket
        }

        const existConnected = connectedCouriers.map((courier) => {
            return courier.id_courier == idCourier
        })

        if (!existConnected.includes(true)) {
            connectedCouriers.push(user)
            return true
        }

        return false
    }

    static removeConnectedCourier({ idSocket }) {

        const courierIndex = connectedCouriers.findIndex(courier => courier.id_socket == idSocket)

        if (courierIndex < 0) return false

        connectedCouriers.splice(courierIndex, 1)

        return true
    }

    static getSocketId({ idRest }) {

        const socketIdIndex = connectedRestaurants.findIndex(con => con.id_restaurant == idRest)

        if (socketIdIndex > -1) {
            return connectedRestaurants[socketIdIndex].id_socket
        }

        return false
    }

    static getActiveCouriers() {
        return connectedCouriers
    }

    static getActiveRestaurants() {
        return connectedRestaurants
    }

    static getActiveUsers() {
        return connectedUsers
    }

    static getCourier({ idCourier }) {
        const courier = couriers.find(c => c.id == idCourier)
        return courier
    }

    static getSocketIdCourier({ id_courier }) {
        const courierIndex = connectedCouriers.findIndex(courier => courier.id_courier == id_courier)

        if (courierIndex < 0) return false

        return connectedCouriers[courierIndex].id_socket
    }

    static setNonActiveCourier({ id }) {
        const indexCourier = connectedCouriers.findIndex(courier => courier.id = id)

        nonActiveCouriers.push(connectedCouriers[indexCourier])
        connectedCouriers.slice(indexCourier, 1)
    }

    static createOrder({ id_user, id_restaurant, order }) {
        const user = users.find(user => user.id == id_user)
        const restaurant = restaurantsInformation.find(rest => rest.id == id_restaurant)


        if (user && restaurant) {
            const newOrder = {
                id_order: randomUUID(),
                user: {
                    id: user.id,
                    address: user.address,
                    phone: user.phone
                },
                restaurant: {
                    id: restaurant.id,
                    address: restaurant.address,
                },
                order: order
            }

            orders.push(newOrder)
            return newOrder
        } else {
            return false
        }
    }

    static deleteOrder({ id_order }) {
        const orderIndex = orders.findIndex(order => order.id_order == id_order)

        if (orderIndex < 0) {
            return false
        }

        const orderDeleted = orders[orderIndex]
        orders.splice(orderIndex, 1)

        return orderDeleted
    }

    static setCourier({ id_order }) {
        const orderIndex = orders.findIndex(order => order.id_order == id_order)

        if (orderIndex < 0) return false

        const courier = couriers.find(courier => courier.id == connectedCouriers[0].id_courier)

        if (!courier) return false

        const updatedOrder = {
            ...orders[orderIndex],
            courier: {
                id: courier.id,
                phone: courier.phone
            }
        }

        orders[orderIndex] = updatedOrder

        return orders[orderIndex]
    }

    static getOrders({ id_restaurant }) {
        const restaurantOrders = orders.map(order => {
            if (order.restaurant.id == id_restaurant) {
                return order
            }
        })

        return restaurantOrders
    }

    static getSocketIdUser({ id_user }) {
        const userSocketId = connectedUsers.filter(user => user.id == id_user)

        if (!userSocketId) return false

        return userSocketId
    }

    static deleteUser({ id_user }) {
        const userIndex = users.findIndex(user => user.id == id_user)

        if (userIndex < 0) return false

        users.splice(userIndex, 1)
        return true
    }

    static editUser({ user }) {

        const userIndex = users.findIndex(userList => userList.id == user.id)

        if (userIndex < 0) return false

        users[userIndex] = user

        return true
    }

    static editRestaurant({ restaurant }) {

        const restaurantIndex = restaurantsInformation.findIndex(restaurantList => restaurantList.id == restaurant.id)

        if (restaurantIndex < 0) return false

        restaurantsInformation[restaurantIndex] = restaurant
        return true
    }

    static editCourier({ courier }) {

        const courierIndex = couriers.findIndex(courierList => courierList.id == courier.id)

        if (courierIndex < 0) return false

        couriers[courierIndex] = courier

        return true
    }

    static deleteRestaurant({ id_restaurant }) {
        const restaurantIndex = restaurantsInformation.findIndex(restaurant => restaurant.id == id_restaurant)

        if (restaurantIndex < 0) return false

        restaurantsInformation.splice(restaurantIndex, 1)
        return true
    }

    static deleteCourier({ id_courier }) {
        const courierIndex = couriers.findIndex(courier => courier.id == id_courier)

        if (courierIndex < 0) return false

        couriers.splice(courierIndex, 1)
        return true
    }
}