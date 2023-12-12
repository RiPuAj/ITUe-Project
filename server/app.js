import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { corsMiddlewares } from './Middlewares/cors.js'
import { RestaurantController } from './Controllers/restaurant.js'
import { UserController } from './Controllers/user.js'
import { AdminController } from './Controllers/admin.js'
import { CourierController } from './Controllers/courier.js'

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


// Connection method
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
            CourierController.addConnectedCourier({ idCourier: id,idSocket: socket.id }).then(data => {
                if (data) {
                    AdminController.getActiveCouriers().then(
                        couriers => io.emit('get active couriers', couriers)
                    )
                }
            })
        }
    })

    socket.on('get restaurant', ({ query }) => {
        const { id } = query
        RestaurantController.getRestaurant({ id }).then(data => { io.emit('get restaurant', { restaurant: data }) })
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

    socket.on('get client', ({ query }) => {
        const { id } = query
        UserController.getUser({ id }).then(data => { io.emit('get client', data) })
    })

    socket.on('get menu restaurant', ({ id }) => {
        UserController.getRestaurant({ id }).then(data => io.emit('get menu restaurant', data))
    })

    socket.on('get courier', () =>  {
        CourierController.getCourier({ idCourier: id }).then(data => io.emit('get courier', data))
    })

    socket.on('edit menu', async ({ id, newMenu }) => {
        const updated = await RestaurantController.updateMenu({ id, newMenu })
        if (updated) {
            RestaurantController.getRestaurant({ id }).then(data =>
                io.emit('update menu', { restaurant: data }
                ))
        }
    })

    socket.on('add order', async ({ query }) => {
        const  {id_restaurant, id_user, order } =  query
        const user = await UserController.getUser({ id:id_user })
        const restaurant = await RestaurantController.getRestaurant({ id: id_restaurant})
        const restaurant_socket = await RestaurantController.getSocketId({ idRest:id_restaurant })
        const couriers = await CourierController.getActiveCouriers()

        if(couriers.length > 0){
            io.to(restaurant_socket).emit('add order', {
                    
                order:order
            })
        }
        if(order){
            // Primero mirar si hay curiers libres
            // Luego enviar al restaurante
            // Capturar respuesta del restaurante
            // Enviar Info al courier
            // Luego añadir la order a order activa
            //UserController.addOrder({query})
            //RestaurantController.getSocketId({idRest:idRestaurant}).then(data => console.log(data))
        }
    })

    socket.on('get active users', () => {
        AdminController.getActiveUsers().then(data => io.emit('get active users', data))
    })

    socket.on('get active restaurants', () => {
        AdminController.getActiveRestaurants().then(data => io.emit('get active restaurants', data))
    })

    socket.on('get active couriers', () => {
        AdminController.getActiveCouriers().then(data => io.emit('get active couriers', data))
    })

})

server.listen(PORT, () => {
    console.log(`Sever running in ${PORT}`)
})