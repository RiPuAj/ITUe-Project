import express, { response } from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { corsMiddlewares } from './Middlewares/cors.js'
import { RestaurantController } from './Controllers/restaurant.js'
import { UserController } from './Controllers/user.js'
import { AdminController } from './Controllers/admin.js'
import { CourierController } from './Controllers/courier.js'
import { OrdersController } from './Controllers/orders.js'

// Default port
const PORT = process.env.PORT ?? 3000

// Create Server web Socket
const app = express()
app.use(express.json())
app.use(corsMiddlewares())
app.disable('x-powered-by')

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})


// Connection to server with WebSockets
io.on('connection', socket => {

    var { id, typeClient } = { id: null, typeClient: null }

    socket.on('connected', ({ query }) => {
        id = query.id
        typeClient = query.typeClient

        if (typeClient == 'restaurant') {
            RestaurantController.addConnectedRestaurant({ idRest: id, idSocket: socket.id }).then(data => {
                if (data) {
                    AdminController.getActiveRestaurants().then(
                        rests => io.emit('get active restaurants', rests)
                    )
                }
            })
        } else if (typeClient == 'user') {
            UserController.addConnectedUser({ idUser: id, idSocket: socket.id })
                .then((data) => {
                    if (data) {
                        AdminController.getActiveUsers()
                            .then(users => io.emit('get active users', users))
                    }
                })

        } else if (typeClient == 'courier') {
            CourierController.addConnectedCourier({ idCourier: id, idSocket: socket.id }).then(data => {
                if (data) {
                    AdminController.getActiveCouriers().then(
                        couriers => io.emit('get active couriers', couriers)
                    )
                }
            })
        }
    })

    //Done by Pablo Villegas
    socket.on('get restaurant', ({ query }) => {
        const { id } = query
        RestaurantController.getRestaurant({ id }).then(data => { io.to(socket.id).emit('get restaurant', { restaurant: data }) })
        // Manejar errores (todo)
    })

    socket.on('disconnect', () => {
        if (typeClient == 'restaurant') {
            RestaurantController.removeConnectedRestaurant({ idSocket: socket.id }).then(data => {
                if (data) {
                    AdminController.getActiveRestaurants().then(
                        rests => io.emit('get active restaurants', rests)
                    )
                }
            })
        } else if (typeClient == 'user') {
            UserController.removeConnectedUser({ idSocket: socket.id }).then(data => {
                if (data) {
                    AdminController.getActiveUsers().then(
                        users => io.emit('get active users', users)
                    )
                }
            })
        } else if (typeClient == 'courier') {
            CourierController.removeConnectedCourier({ idSocket: socket.id }).then(data => {
                if (data) {
                    AdminController.getActiveCouriers().then(
                        couriers => io.emit('get active couriers', couriers)
                    )
                }
            })
        }
    })

    socket.on('update menu', (newMenu) => {
        const { id, typeClient } = socket.handshake.query
        if (typeClient == 'restaurant') {
            RestaurantController.updateMenu({ id, newMenu })
        }
    })

    socket.on('get all restaurants', async () => {
        UserController.getAllRestaurants().then(data => io.emit('get all restaurants', data))
    })

    socket.on('get all users', () => {
        UserController.getAllUsers().then(data => io.emit('get all users', data))
    })

    socket.on('get all couriers', () => {
        CourierController.getAllCouriers().then(data => io.emit('get all couriers', data))
    })

    //Done by Pablo Villegas
    socket.on('get client', ({ query }) => {
        const { id } = query
        UserController.getUser({ id }).then(data => { io.to(socket.id).emit('get client', data) })
    })

    socket.on('get courier', () => {
        CourierController.getCourier({ idCourier: id }).then(data => io.to(socket.id).emit('get courier', data))
    })

    socket.on('edit menu', async ({ id, newMenu }) => {
        const updated = await RestaurantController.updateMenu({ id, newMenu })
        if (updated) {
            RestaurantController.getRestaurant({ id }).then(data =>
                io.to(socket.id).emit('update menu', { restaurant: data }
                ))
        }
    })

    socket.on('add order', async ({ query }) => {

        const { id_restaurant, id_user, order } = query
        const couriers = await CourierController.getActiveCouriers()

        if (couriers.length > 0) {
            const newOrder = await OrdersController.create({ id_user, id_restaurant, order })
            const restaurant_socket = await RestaurantController.getSocketId({ idRest: id_restaurant })

            if (restaurant_socket) {
                if (newOrder) {
                    io.to(restaurant_socket).emit('add order', newOrder)
                } else {
                    io.to(socket.id).emit('error order', "Error to create order")
                }

            } else {
                io.to(socket.id).emit('error order', "The restaurant is offline")
            }

        } else {
            io.to(socket.id).emit('error order', "There are not couriers aviable at this time")
        }
        // Primero mirar si hay curiers libres
        // Luego enviar al restaurante
        // Capturar respuesta del restaurante
        // Enviar Info al courier
        // Luego añadir la order a order activa
    })

    socket.on('restaurant response', async (data) => {
        const { id_order, response } = data
        if (response) {
            const order = await OrdersController.setCourier({ id_order })
            const socketIdCourier = await CourierController.getSocketId({ id_courier: order.courier.id })
            const userSocketId = await UserController.getSocketId({ id_user: order.user.id })

            if (socketIdCourier) {
                io.to(socketIdCourier).emit('new order', order)
            }
            if(userSocketId){
                io.to(userSocketId).emit('success order', {message:"Order placed correctly"})
            }
        } else {
            const orderDeleted = await OrdersController.delete({ id_order })
            const userSocketId = await UserController.getSocketId({ id_user: orderDeleted.user.id })
            io.to(userSocketId).emit('error order', "The restaurant has rejected your order")
        }

    })

    socket.on('get restaurant orders', async () => {
        const orders = await OrdersController.getOrders({ id_restaurant: id })
        console.log(orders)

        io.to(socket.id).emit('get restaurant orders', orders)
    })

    socket.on('delete order', async ({ id_order }) => {
        const res = await OrdersController.delete({ id_order })
    })

    socket.on('get active users', () => {
        AdminController.getActiveUsers().then(data => io.to(socket.id).emit('get active users', data))
    })

    socket.on('get active restaurants', () => {
        AdminController.getActiveRestaurants().then(data => io.emit('get active restaurants', data))
    })

    socket.on('get active couriers', () => {
        AdminController.getActiveCouriers().then(data => io.emit('get active couriers', data))
    })

    socket.on('delete user', async ({ id_user }) => {
        const res = await AdminController.deleteUser({ id_user })
        console.log(res)
    })

    socket.on('delete courier', async ({ id_courier }) => {
        const res = await AdminController.deleteCourier({ id_courier })
        console.log(res)
    })

    socket.on('delete restaurant', async ({ id_restaurant }) => {
        const res = await AdminController.deleteRestaurant({ id_restaurant })
        console.log(res)
    })

    socket.on('edit user', async (user) => {
        const res = await AdminController.editUser({ user })
        console.log(res)
    })

    socket.on('edit restaurant', async (restaurant) => {
        const res = await AdminController.editRestaurant({ restaurant })
        console.log(res)
    })

    socket.on('edit courier', async (courier) => {
        const res = await AdminController.editCourier({ courier })
        console.log(res)
    })

})

server.listen(PORT, () => {
    console.log(`Sever running in ${PORT}`)
})