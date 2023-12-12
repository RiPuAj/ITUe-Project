//Done by Pablo Villegas
import { AppModel } from "../models/local-file-sys/local-file-sys.js";

export class UserController{

    static async getAllUsers(){
        const users = AppModel.getAllUsers()

        return users
    }

    static async getUser({ id }){
        const user = await AppModel.getUser({ id })

        
        return user
    }

    static async addOrder({ query }){
        const response = await AppModel.addOrder({query})
    }

    static async getAllRestaurants(){
        const restaurants = await AppModel.getAllRestaurants()

        return restaurants
    }

    static async getRestaurant({ id }){
        const restInfo = await AppModel.getRestaurant({ id })
        return restInfo
    }

    static async addConnectedUser({ idUser, idSocket}){
        const response = await AppModel.addConnectedUser({ idUser, idSocket })

        return response
    }

    static async removeConnectedUser({ idSocket }){
        const response = await AppModel.removeConnectedUser({ idSocket })

        return response
    }

}