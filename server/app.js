import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { corsMiddlewares } from './Middlewares/cors.js'
import { RestaurantController } from './Controllers/restaurant.js'
import { UserController } from './Controllers/user.js'

// Default port
const PORT = process.env.PORT ?? 3000

// Create Server web Socket
const app = express()
app.use(express.json())
app.use(corsMiddlewares())
app.disable('x-powered-by')

const server = createServer(app)
const io = new Server(server, {
    cors:{
        origin: ["http://localhost:5173"]
    }
})


// Connection method
io.on('connection', socket => {
    //const { id, typeClient} = socket.handshake.query

    /*if(typeClient == 'restaurant'){
        // Hay que crear para que envie informacion del servidor, enviar restaurante

        // Add restaurant when it connects
        RestaurantController.addConnectedRestaurant({idRest :id, idSocket: socket.id})

        // Send Restaurant data to client
        RestaurantController.getRestaurant({ id }).then(data => io.emit('get restaurant', {restaurant: data}))

        // See All Restaurants Connected
        RestaurantController.getConnectedRestaurants().then(data => console.log("Opened ->", data, "\n\n"))
    }*/

    socket.on('get restaurant', ({query}) => {
        const { id } = query
        RestaurantController.addConnectedRestaurant({idRest: id, idSocket: socket.id})
        RestaurantController.getRestaurant({ id }).then(data => {io.emit('get restaurant', {restaurant:data})})
        // Manejar errores (todo)
    })

    socket.on('disconnect', () => {
        const {id, typeClient} = socket.handshake.query
        if(typeClient == 'restaurant'){
            RestaurantController.removeConnectedRestaurant({idRest: id})
        }
    })

    socket.on('update menu', (newMenu) => {
        const {id, typeClient} = socket.handshake.query
        if(typeClient == 'restaurant'){
            RestaurantController.updateMenu({ id, newMenu })
        }
    })

    socket.on('get all restaurants', async () => {
        UserController.getAllRestaurants().then(data => io.emit('get all restaurants', data))
    })

    socket.on('get client',  ({query}) =>{
        const { id } = query
        UserController.getUser({ id }).then(data=>{io.emit('get client', data)})
    })
    
    socket.on('get menu restaurant', ({ id }) => {
        UserController.getRestaurant({ id }).then(data => io.emit('get menu restaurant', data))
    })    

    })

server.listen(PORT, () => {
    console.log(`Sever running in ${PORT}`)
})