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

    static async getAllRestaurants(){
        const restaurants = await AppModel.getAllRestaurants()

        return restaurants
    }

    static async getRestaurant({ id }){
        const restInfo = await AppModel.getRestaurant({ id })
        return restInfo
    }

}