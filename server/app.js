import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { restaurantsRouter } from './Routes/restaurant.js'
import { userRouter } from './Routes/user.js'
import { corsMiddlewares } from './Middlewares/cors.js'

// Default port
const PORT = process.env.PORT ?? 3000

// Create Server web Socket
const app = express()
app.use(express.json())
app.use(corsMiddlewares())
app.disable('x-powered-by')
app.use('/restaurants', restaurantsRouter)
app.use('/users', userRouter)
const server = createServer(app)
const io = new Server(server)

const activeOrders = []
/*
const openRestaurants = []
const activeDeliverys = []

// Connection method
io.on('connection', socket => {
    console.log(socket.handshake.query.typeClient)
    if (socket.handshake.query.typeClient == 'restaurant'){

        let res = {
            token: socket.handshake.query.token,
            socket: socket.id
        }
        
        openRestaurants.push(res)
        console.log(openRestaurants)

    } else if (socket.handshake.query.typeClient == 'deliver'){
        let res = {
            token: socket.handshake.query.token,
            socket: socket.id
        }
        
        activeDeliverys.push(res)
        console.log(activeDeliverys)

    }

    socket.on('disconnect', () => 
        console.log(socket.id)
        
    )
})

*/


server.listen(PORT, () => {
    console.log(`Sever running in ${PORT}`)
})