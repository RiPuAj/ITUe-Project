import { io } from "socket.io-client";

const URL = 'http://localhost:3000'


export class RestaurantSocket{

    static createConnection({ id }){
        const socket = io(URL,{
            query:{
                typeClient: 'restaurant',
                id: id
            }
        })
        this.socket = socket
        return socket
    }

    static getRestaurant(){
        let restaurantData = {}
        this.socket.on('send restaurant', (data) =>{
            restaurantData = data
        })

        return restaurantData
    }
}