import { AppModel } from "../models/local-file-sys/local-file-sys.js";

export class AdminController{

    static async getActiveUsers(){
        const users = await AppModel.getActiveUsers()
        return users
    }
    
    static async getActiveCouriers(){
        const couriers = await AppModel.getActiveCouriers()
        return couriers
    }

    static async getActiveRestaurants(){
        const restaurants = await AppModel.getActiveRestaurants()
        return restaurants
    }
}