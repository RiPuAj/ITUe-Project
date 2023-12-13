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

    static async deleteUser({ id_user }){
        const res = AppModel.deleteUser({ id_user })

        return res
    }

    static async deleteCourier({ id_courier }){
        const res = AppModel.deleteCourier({ id_courier })

        return res
    }

    static async editUser( { user }){
        const res = AppModel.editUser({ user })

        return res
    }

    static async editCourier( { courier }){
        const res = AppModel.editCourier({ courier })

        return res
    }

    static async editRestaurant( { restaurant }){
        const res = AppModel.editRestaurant({ restaurant })

        return res
    }

    static async deleteRestaurant({ id_restaurant }){
        const res = AppModel.deleteRestaurant({ id_restaurant })

        return res
    }
}